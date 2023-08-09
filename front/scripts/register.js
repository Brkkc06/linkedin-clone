class User {
    constructor(email, password, firstName, lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

function register(e) {
    try {
        e.preventDefault()
        registerForm = document.getElementById('registerForm')
    
        inputPassword = registerForm.elements.password.value
        inputcontrolPassword = registerForm.elements.controlPassword.value
    
        if (inputcontrolPassword === inputPassword) {
            inputEmail = registerForm.elements.email.value;
            inputfirstName = registerForm.elements.firstName.value
            inputlastName = registerForm.elements.lastName.value
            newUser = new User(inputEmail = registerForm.elements.email.value, inputPassword = registerForm.elements.password.value, inputfirstName = registerForm.elements.firstName.value, inputlastName = registerForm.elements.lastName.value);
            console.log(newUser);
        }
        else {
            alert("girdiğiniz  şifreler yanlış");
        }
    } catch(err) {
        console.log(err)
    }

}