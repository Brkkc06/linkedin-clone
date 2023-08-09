 function showPassword() {
    var a =document.getElementById("password");
    if(a.type ==="password"){
        a.type="text"
    }
    else{
        a.type="password"
    }
}
// class User{
//    constructor(email,password,firstname,lastname){
//     this.email=email;
//     this.password=password;
//     this.firstname= firstname;
//     this.lastname = lastname
//    }
// }

// newUser1 = new User('asd', 'asd', 'asd', 'asd')

// console.log(newUser1)

// class User{
//     email;
//     password;
//     firstname;
//     lastname;
// }

// newUser2 = new User()
// newUser2.email =

// var user1 = new User();
// user1.email="brkkc06";
// user1.password= 1234;
// console.log(user1);

// function oneriAlerti(form){
//     var inputValue=form.inputbox.value;
//     alert ("you typed" + inputValue);
// }

function login(e) {
    e.preventDefault()

    loginform = document.getElementById('loginform')

    inputEmail = loginform.elements.email.value
    inputPassword = loginform.elements.password.value

    // dbPass = db.getPasswordByEmail(inputEmail)
    dbPass = '123'

    if (dbPass === inputPassword) {
        alert('dogru şifre ve eposta')
    } else {
        alert('yanlıs şifre veya eposta')
    }
}

