const urlPageTitle = "JS SPA  Routing";

const urlRoutes = {
    404: {
        template:"/public/404.html",
        title: "404 | "+ urlPageTitle ,
        description:"Page not found",
    },
    "/homepage":{
        template:"/public/feed.html",
        title:"404 | "+ urlPageTitle ,
        description:"This is the feedpage",
    },
    "/feed":{
        template:"/public/feed.html",
        title:"404 | "+ urlPageTitle ,
        description:"This is the feedpage",
    },
    "/login":{
        template:"/public/login.html",
        title: "404 | "+ urlPageTitle ,
        description:"This is the loginpage",
    },
    "/register":{
        template:"/public/register.html",
        title: "404 | "+ urlPageTitle ,
        description:"This is the registerpage",
    },
    "/login":{
        template:"/public/login.html",
        title: "404 |"+urlPageTitle,
        description:"You are redirected to the login page"
    },
 
}

const urlRoute = (event) => {
    // event = event || window.event;
    event.preventDefault();
    console.log(event)
    console.log(event.target)
    window.history.pushState({},"",event.target.href);
    urlLocationHandler();
    
}

const urlLocationHandler = async () =>{
    let location = window.location.pathname;
    if(location === "/" ) {
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
    document.querySelector('meta[name="description"]').setAttribute("content",route.description);
}

urlLocationHandler();


function getPosts(){
    fetch("http://127.0.0.1:3000/getAll",{
        method: "GET",
        headers:{
            "Content-type":"application/json"
        },
        
    }).then(res => {
        res.json().then(async json => {
            const posts = json.posts;
            const postsDiv = document.getElementById("posts");

            for (let index = 0; index < posts.length; index++) {
                const post = posts[index];
                const postDiv = document.createElement('div');
                const postHtml = await fetch("/public/post.html").then((response) => response.text());
                postDiv.innerHTML = postHtml;
                postsDiv.appendChild(postDiv);
                postsDiv.getElementsByClassName("zgl")[index].innerHTML = post.createdBy
            }

            // alert(json.text)
        }).catch(err => {
            console.log(err);
        })
    })
}
