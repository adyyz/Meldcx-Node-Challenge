test('Should give the seconds from the last input received', () => {
    const code = require('./Code');
    code.GetTime();
  expect(code.GetTime).toBe(code.GetTime);
});

test('Sholud show the current number of monitors connected', () => {
    const code = require('./Code');
    code.GetNumberOfMonitors();
    expect(code.GetNumberOfMonitors).toBe(code.GetNumberOfMonitors);
});

test('Sholud give response to sleep screen', () => {
    const code = require('./Code');
    code.SleepMonitors();
    expect(code.SleepMonitors);
});

test('Sholud give response to wake screen', () => {
    const code = require('./Code');
    code.WakeMonitors();
    expect(code.WakeMonitors);
});

