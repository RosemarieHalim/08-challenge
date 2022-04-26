const Manager = require('../lib/Manager.js');

test('creates an Manager object', () => {
    const manager = new Manager('Jane', 1, 'Jane@gmail', 2);
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

// gets role from getRole()
test('gets role of employee', () => {
    const manager = new Manager('Jane', 1, 'Jane@gmail.com', 2);
    expect(manager.getRole()).toEqual("Manager");
}); 