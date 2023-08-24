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
function getPosts() {
    fetch("http://127.0.0.1:3000/getAll", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },

    }).then(res => {
        res.json().then(async json => {
            const posts = json.posts;
            const postsDiv = document.getElementById("posts");
            for (let index =  posts.length; index > 0; index--) {
                const post = posts[index - 1];
                const postDiv = document.createElement('div');
                const postHtml = await fetch("/public/post.html").then((response) => response.text());
                postDiv.innerHTML = postHtml;

                if (post.createdBy) {
                    const result = await fetch(`http://127.0.0.1:3000/getUserById/${post.createdBy}`, {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json"
                        },
                    });
                    const json = await result.json();
                    const userName = json.user.firstName.charAt(0).toUpperCase() + json.user.firstName.slice(1) + '\xa0' + json.user.lastName.charAt(0).toUpperCase() + json.user.lastName.slice(1);
                    const userProfilePhoto = json.user.profilePhoto;
                    const followedByUser = json.user.followedBy + '\xa0' + "Takipçi";
                    const postMedia = post.media;
                    const postText = post.text;   
                    Array.from(postDiv.getElementsByClassName("zgl"))[0].innerHTML = userName;     
                    Array.from(postDiv.getElementsByClassName("golf"))[0].innerHTML = postText;

                    if(post.likedBy){
                        const likedByResult = await fetch(`http://127.0.0.1:3000/getUserById/${post.likedBy}`,{
                            method:"GET",
                            headers:{
                                "Content-type":"application/json"
                            },
                        });
                        const jsonLikedBy = await likedByResult.json();
                        const userPhoto = jsonLikedBy.user.profilePhoto
                        const likedByPost = jsonLikedBy.user.firstName.charAt(0).toUpperCase() + jsonLikedBy.user.firstName.slice(1) + '\xa0' + jsonLikedBy.user.lastName.charAt(0).toUpperCase() + jsonLikedBy.user.lastName.slice(1);                       
                        Array.from(postDiv.getElementsByClassName("evttuctvm"))[0].innerHTML = likedByPost;
                        Array.from(postDiv.getElementsByClassName("ivm-view-attr"))[0].src = userPhoto;  
                    }
                    else 
                       for(const likethisDiv of postDiv.getElementsByClassName("likethis"))
                        likethisDiv.style.display = "none";
                    if (postMedia) {
                        Array.from(postDiv.getElementsByClassName("post-image"))[0].src = postMedia;
                    }
                    if(userProfilePhoto){
                        Array.from(postDiv.getElementsByClassName("img-anka "))[0].src = userProfilePhoto;
                    }
                    Array.from(postDiv.getElementsByClassName("tfn "))[0].innerHTML = followedByUser;
                    Array.from(postDiv.getElementsByClassName("mre "))[0].innerHTML = moment(new Date(post.createdDate)).fromNow(); ;
                    postsDiv.appendChild(postDiv);
                }
            }

            // alert(json.text)
        }).catch(err => {
            console.log(err);
        })
    })
}