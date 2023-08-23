
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
    console.log(event)
    console.log(event.target)
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();

}

const urlLocationHandler = async () => {
    let location = window.location.pathname;
    if (location === "/") {
        location = "/feed";
    }
    console.log(location)
    const route = urlRoutes[location] || urlRoutes[404];
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("content").innerHTML = html;
    console.log(route.template)
    if (route.template === "/public/feed.html") {
        getPosts()
    }

    document.title = route.title;
    document.querySelector('meta[name="description"]').setAttribute("content", route.description);
}

urlLocationHandler();


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
                    const likedByPostPhoto = post.likedByPostPhoto;
                    const likedByPostUserName = post.likedByPostUserName + '\xa0' + "bunu beğendi";
                    Array.from(postDiv.getElementsByClassName("zgl"))[0].innerHTML = userName;
                    if(likedByPostUserName && likedByPostPhoto){
                        Array.from(postDiv.getElementsByClassName("evttuctvm"))[0].innerHTML = likedByPostUserName;
                        Array.from(postDiv.getElementsByClassName("ivm-view-attr"))[0].src = likedByPostPhoto;
                        
                    }
                    else 
                       for(const likethisDiv of postDiv.getElementsByClassName("likethis"))
                        likethisDiv.style.display = "none"
                    
                    Array.from(postDiv.getElementsByClassName("golf"))[0].innerHTML = postText;
                    if (postMedia) {
                        Array.from(postDiv.getElementsByClassName("post-image"))[0].src = postMedia;
                    }
                    Array.from(postDiv.getElementsByClassName("img-anka "))[0].src = userProfilePhoto;
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


