module.exports = class ValidationService {
    constructor() {}

    isValidRegister(user) {
        var errors = [];
        //if first and last name are null then it's false automatically
        // if (!user.firstName || !user.lastName) {
        //     console.log("bad first/last name");
        //     errors.push({ message: "Invalid Name"});
        //     return false;
        // }
        // if (!this.isValidEmailAddress(user.email)) {
        //     console.log("bad email");
        //     errors.push({ message: "Invalid Email"});
        //     return false;
        // }
        // if (!this.isValidPassword(user.password)) {
        //     errors.push({ message: "Invalid Password"});
        //     return false;
        // }
        return true;
    }

    isValidEmailAddress(email) {
        const regex = new RegExp( 
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return regex.test(email.toLowerCase());
    }

    isValidPassword(password) {
        const regex = new RegExp(/^(?=.*[A-Za-z])[A-Za-z\d@$!%*#?&]{8,}$/);
        return regex.test(password);
    }
};