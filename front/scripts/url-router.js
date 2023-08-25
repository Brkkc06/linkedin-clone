
const urlPageTitle = "JS SPA  Routing";

const urlRoutes = {
    404: {
        template: "/public/404.html",
        title: "404 | " + urlPageTitle,
        description: "Page not found",
    },
    "/homepage": {
        template: "/public/feed.html",
        title: "404 | " + urlPageTitle,
        description: "This is the feedpage",
    },
    "/feed": {
        template: "/public/feed.html",
        title: "404 | " + urlPageTitle,
        description: "This is the feedpage",
    },
    "/login": {
        template: "/public/login.html",
        title: "404 | " + urlPageTitle,
        description: "This is the loginpage",
    },
    "/register": {
        template: "/public/register.html",
        title: "404 | " + urlPageTitle,
        description: "This is the registerpage",
    },
    "/login": {
        template: "/public/login.html",
        title: "404 |" + urlPageTitle,
        description: "You are redirected to the login page"
    },

}

const urlRoute = (event) => {
    // event = event || window.event;
    event.preventDefault();
  
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();

}

const urlLocationHandler = async () => {
    let location = window.location.pathname;
    if (location === "/") {
        location = "/feed";
    }
    
    const route = urlRoutes[location] || urlRoutes[404];
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("content").innerHTML = html;
    
    if (route.template === "/public/feed.html") {
        getPosts()
    }

    document.title = route.title;
    document.querySelector('meta[name="description"]').setAttribute("content", route.description);
}

urlLocationHandler();


function getPosts() {
const loginUserId= sessionStorage.getItem("userId");

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
                    const postFollowedByUser = json.user.followed;
                    const postFollowersOfUser = json.user.followers;
                    if(postFollowedByUser.includes(loginUserId)){
                        for(const btnBrk of postDiv.getElementsByClassName("btn-brk"))
                        btnBrk.style.display = "none";
                    }
                    else{
                        // // console.log("takip et.")
                    }
                  
                    
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
                    const accessKey = post.createdBy
                    Array.from(postDiv.getElementsByClassName("tfn "))[0].innerHTML = followedByUser;
                    Array.from(postDiv.getElementsByClassName("btn-brk"))[0].accessKey = accessKey;                
                    Array.from(postDiv.getElementsByClassName("mre "))[0].innerHTML = moment(new Date(post.createdDate)).fromNow(); ;
                    postsDiv.appendChild(postDiv);
                }
            }

            // alert(json.text)
        }).catch(err => {
            // console.log(err);
        })
    })
}

function getButtonBrk(e) {
    const accessKey = event.target.accessKey;
    console.log(accessKey)
    console.log(e)
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
    })
}

