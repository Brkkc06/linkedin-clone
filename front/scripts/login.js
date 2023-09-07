function showPassword() {
    var a =document.getElementById("password");
    if(a.type ==="password"){
        a.type="text"
    }
    else{
        a.type="password"
    }
}
function login(e) {
    e.preventDefault()
    loginform = document.getElementById('loginform')
    inputEmail = loginform.elements.email.value
    inputPassword = loginform.elements.password.value
    fetch("http://127.0.0.1:3000/login", {
        method: "POST",
        headers : {
            "Content-type":"application/json"
        },
        body:JSON.stringify({
           email :inputEmail ,
           password :inputPassword
        })
    }).then(response => {
        response.json().then(async json=> {
            alert(json.message)
            sessionStorage.setItem("userId", json.id)
            window.history.pushState({},"", "/feed");
            const html = await fetch("/public/feed.html").then((response) => response.text());
            document.getElementById("content").innerHTML = html;
            getPosts();
        })
    })
}
function getButtonBrk(e) {
    const accessKey = event.target.accessKey;
    const loginUserId = sessionStorage.getItem("userId");
    fetch("http://127.0.0.1:3000/addFollower",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
           follower: loginUserId,
           followed: accessKey,
         })
    }).then((res) => res.text()).then(async (res) =>{
        alert(res);
    })
}