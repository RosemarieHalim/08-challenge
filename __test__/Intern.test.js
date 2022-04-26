const Intern = require('../lib/Intern.js');

test('creates an Intern object', () => {
    const intern = new Intern('Jane', 1, 'Jane@gmail', 'Carleton');
    expect(intern.school) .toEqual(expect.any(String));
});

test('gets employee school', () => {
    const intern = new Intern('Jane', 1, 'Jane@gmail', 'Carleton');
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

test('gets role of employee', () => {
    const intern = new Intern('Jane', 1, 'Jane@gmail.com', 'Carleton');
    expect(intern.getRole()).toEqual("Intern");
}); 