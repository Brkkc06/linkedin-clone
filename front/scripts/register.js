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
        inputControlPassword = registerForm.elements.controlPassword.value
    
        if (inputControlPassword === inputPassword) {
            inputEmail = registerForm.elements.email.value;
            inputfirstName = registerForm.elements.firstName.value
            inputlastName = registerForm.elements.lastName.value
            newUser = new User(inputEmail = registerForm.elements.email.value, inputPassword = registerForm.elements.password.value, inputfirstName = registerForm.elements.firstName.value, inputlastName = registerForm.elements.lastName.value);
            fetch("http://127.0.0.1:3000/addUser", {
                method: "POST",

                headers : {
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    newUser: newUser,
                })
            })
                .then((response) => response.text())
                .then(async (res) => {
                    window.history.pushState({},"", "/login");
                    const html = await fetch("/public/login.html").then((response) => response.text());
                    document.getElementById("content").innerHTML = html;
                    alert(res)
                    
                })
        }
        else {
            alert("girdiğiniz  şifreler yanlış");
        }
    } catch(err) {
        // console.log(err)
    }

}
