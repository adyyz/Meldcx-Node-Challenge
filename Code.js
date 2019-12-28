const ffi = require('ffi');
const ref = require('ref');
var int = ref.types.int;
const refStruct = require('ref-struct');

LASTINPUTINFO = refStruct({
    cbSize: ref.types.int32,
    dwTime: ref.types.uint32,
  });

  pLASTINPUTINFO = ref.refType(LASTINPUTINFO);

  const user32 = ffi.Library('user32', {
    'GetLastInputInfo': [ 'int', [ pLASTINPUTINFO ] ]
  });

// the class which holds the functions 
class User32 {
    constructor() {
        this.SM_CMONITORS = 80;
        this.HWND_BROADCAST = 0xffff;
	    this.WM_SYSCOMMAND = 0x0112;
	    this.SC_MONITORPOWER = 0xf170;
        this.POWER_OFF = 2;
        this.POWER_ON = -1;
        this.LASTINPUTINFO = null;
        LASTINPUTINFO = LASTINPUTINFO || refStruct({
            cbSize: ref.types.int32,
            dwTime: ref.types.uint32,
        });
        var pLASTINPUTINFO = ref.refType(LASTINPUTINFO);

        const user32Methods = ffi.Library('user32.dll', {
            'GetSystemMetrics': [int, [int]],
            SendMessageW: [int, ["ulong", "uint", "long", "long"]],
            'GetLastInputInfo': [ 'int', [ pLASTINPUTINFO ] ]});

        Object.assign(this, user32Methods);
        
    }
    //Add a function that can Enumerate the attached displays
    countMonitors() {
        return this.GetSystemMetrics(this.SM_CMONITORS);
    }
    //Add a function that can Request the displays to sleep
    Sleep(){
        this.SendMessageW(this.HWND_BROADCAST, this.WM_SYSCOMMAND, this.SC_MONITORPOWER, this.POWER_OFF);
        }
    //Add a function that can Request the displays to wake 
    Wake(){
        this.SendMessageW(this.HWND_BROADCAST, this.WM_SYSCOMMAND, this.SC_MONITORPOWER, this.POWER_ON);
    }
    
}
function GetNumberOfMonitors(){
    const u32 = new User32();
    console.log("The number of monitors are:",u32.countMonitors());
}

function SleepMonitors(){
    const u32 = new User32();
    u32.Sleep();
}
function WakeMonitors(){
    const u32 = new User32();
    u32.Wake();
}
function GetTime() {
    var result = new LASTINPUTINFO();
    result.cbSize = LASTINPUTINFO.size;

    var failed = (user32.GetLastInputInfo(result.ref()));
    console.log("Time in seconds: ", result.dwTime/10000,"s");
}
module.exports = {
    GetTime,
    WakeMonitors,
    SleepMonitors,
    GetNumberOfMonitors
};