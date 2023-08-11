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
    }
}

const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    console.log(event.target)
    window.history.pushState({},"",event.target.href);
    urlLocationHandler();
    
}

const urlLocationHandler = async () =>{
    const location = window.location.pathname;
    if(location.length == 0 ) {
        location = "feed";
    }
    const route = urlRoutes[location] || urlRoutes[404];
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("content").innerHTML = html;
    document.title = route.title;
    document.querySelector('meta[name="description"]').setAttribute("content",route.description);
}

urlLocationHandler();