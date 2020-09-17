// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName(){
     return this.name;   
    }

    getID() {
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole() {
        return 'Employee';
    }
}

// const employee = new Employee("James", 43, "james@company.com");
// console.log(employee);

module.exports = Employee;