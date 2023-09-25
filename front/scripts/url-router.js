const urlPageTitle = "LinkedIn";
const urlRoutes = {
    404: {
        template: "/public/404.html",
        title: "404 | " + urlPageTitle,
        description: "Page not found",
    },
    "/homepage": {
        template: "/public/feed.html",
        title:  urlPageTitle + "homepage",
        description: "This is the feedpage",
    },
    "/feed": {
        template: "/public/feed.html",
        title: urlPageTitle + '\xa0' +" | feed",
        description: "This is the feedpage",
    },
    "/login": {
        template: "/public/login.html",
        title: urlPageTitle + '\xa0' +" | login",
        description: "This is the loginpage",
    },
    "/register": {
        template: "/public/register.html",
        title: urlPageTitle + '\xa0' + " | register",
        description: "This is the registerpage",
    },
    "/login": {
        template: "/public/login.html",
        title: urlPageTitle + '\xa0' + " | login",
        description: "You are redirected to the login page"
    },
    "/editProfile":{
        template:"/public/editProfile.html",
        title: urlPageTitle + '\xa0' + " | edit Profile",
        description:"This is edit profile page"
    },
}
const urlRoute = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
}
const urlLocationHandler = async () => {
    let location = window.location.pathname;
    if (location === "/" || location === "/homepage") {
        location = "/feed";
    }
    const route = urlRoutes[location] || urlRoutes[404];
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("content").innerHTML = html;
    if (route.template === "/public/feed.html") {
        getPosts()
        getProfilePhoto()
        getUserName()
    }
    if(route.template === "/public/editProfile.html"){
        getProfileInfo();
        startEditProfile();
    }
    document.title = route.title;
    document.querySelector('meta[name="description"]').setAttribute("content", route.description);
}
urlLocationHandler();

function dislikePostEvent(e, postDiv) {
    dislike(e);
    const likeButton = postDiv.getElementsByClassName("likeButton")[0];
    const likeButtonText = postDiv.getElementsByClassName("liketext")[0];
    const likeButtonIcon = postDiv.getElementsByClassName("likeButtonIcon")[0];
    likeButton.style.backgroundColor = "white";
    likeButtonText.style.color = "#616165";
    likeButtonIcon.style.color = "#616165";
    likeButton.onclick = (e) => likePostEvent(e, postDiv);
}

function likePostEvent(e, postDiv) {
    likePost(e);
    const likeButton = postDiv.getElementsByClassName("likeButton")[0];
    const likeButtonText = postDiv.getElementsByClassName("liketext")[0];
    const likeButtonIcon = postDiv.getElementsByClassName("likeButtonIcon")[0];
    
    likeButton.style.backgroundColor = "#0a66c2";
    likeButtonText.style.color = "white";
    likeButtonIcon.style.color = "white"
    likeButton.onclick = (e) => dislikePostEvent(e, postDiv);
}

function getPosts() {
    const loginUserId = localStorage.getItem("userId");
 getAllPostServices()
 .then(res => {
        res.json().then(async json => {
            const posts = json.posts;
            const postsDiv = document.getElementById("posts");
            for (let index = posts.length; index > 0; index--) {
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
                    const postId = post._id;
                    const likedBy = post.likedBy;
                    const likeButton = postDiv.getElementsByClassName("likeButton")[0];
                    const likeButtonText = postDiv.getElementsByClassName("liketext")[0];
                    const likeButtonIcon = postDiv.getElementsByClassName("likeButtonIcon")[0];                    
                    if(likedBy.includes(userId)){    
                        likeButton.style.backgroundColor = "#0a66c2"
                        likeButtonText.style.color = "white";
                        likeButtonIcon.style.color = "white";
                        likeButton.onclick = (e) => dislikePostEvent(e, postDiv);
                    }
                    else {
                        likeButton.style.backgroundColor = "white";
                        likeButtonText.style.color = "#616165";
                        likeButtonIcon.style.color = "#616165";
                        likeButton.onclick = (e) => likePostEvent(e, postDiv);
                    }



                    const json = await result.json();
                    const userName = json.user.firstName.charAt(0).toUpperCase() + json.user.firstName.slice(1) + '\xa0' + json.user.lastName.charAt(0).toUpperCase() + json.user.lastName.slice(1);
                    const userProfilePhoto = json.user.profilePhoto;
                    const followedByUser = json.user.followers.length + '\xa0' + "Takipçi";
                    const postMediaPhoto = post.mediaPhoto;
                    const postMediaVideo = post.mediaVideo;
                    const postText = post.text;
                    const postFollowedByUser = json.user.followed;
                    const postFollowersOfUser = json.user.followers;
                    Array.from(postDiv.getElementsByClassName("zgl"))[0].innerHTML = userName;
                    Array.from(postDiv.getElementsByClassName("golf"))[0].innerHTML = postText;
                    if (postFollowersOfUser.includes(loginUserId)) {
                        for (const btnBrk of postDiv.getElementsByClassName("btn-brk"))
                            btnBrk.style.display = "none";
                    }
                    if (loginUserId === post.createdBy) {
                        for (const btnBrk of postDiv.getElementsByClassName("btn-brk"))
                            btnBrk.style.display = "none";
                    }
                    // if (post.likedBy) {
                    //     const likedByResult = await fetch(`http://127.0.0.1:3000/getUserById/${post.likedBy}`, {
                    //         method: "GET",
                    //         headers: {
                    //             "Content-type": "application/json"
                    //         },
                    //     });
                    //     const jsonLikedBy = await likedByResult.json();
                    //     const userPhoto = jsonLikedBy.user.profilePhoto
                    //     const likedByPost = jsonLikedBy.user.firstName.charAt(0).toUpperCase() + jsonLikedBy.user.firstName.slice(1) + '\xa0' + jsonLikedBy.user.lastName.charAt(0).toUpperCase() + jsonLikedBy.user.lastName.slice(1);
                    //     Array.from(postDiv.getElementsByClassName("evttuctvm"))[0].innerHTML = likedByPost;
                    //     Array.from(postDiv.getElementsByClassName("ivm-view-attr"))[0].src = userPhoto;
                    // }
                    // else
                    //     for (const likethisDiv of postDiv.getElementsByClassName("likethis"))
                    //         likethisDiv.style.display = "none";    
                    if(postMediaVideo){
                        Array.from(postDiv.getElementsByClassName("videoTagStylesInFeedPage"))[0].src = await getFile(postMediaVideo);
                    }
                    else
                        for(const index of postDiv.getElementsByClassName("videoTagStylesInFeedPage"))
                            index.style.display ="none";
                    if (postMediaPhoto) {
                        Array.from(postDiv.getElementsByClassName("post-image"))[0].src = await getFile(postMediaPhoto);  
                    }
                    if (userProfilePhoto) {
                        Array.from(postDiv.getElementsByClassName("img-anka "))[0].src = await getFile(userProfilePhoto);
                    }
                    const accessKey = post.createdBy
                    const accesKeyPost = post._id;
                    Array.from(postDiv.getElementsByClassName("tfn "))[0].innerHTML = followedByUser;
                    Array.from(postDiv.getElementsByClassName("proof-text"))[0].innerHTML = likedBy.length + '\xa0' + "kişi beğendi"
                    Array.from(postDiv.getElementsByClassName("likeButton"))[0].accessKey = accesKeyPost;
                    Array.from(postDiv.getElementsByClassName("btn-brk"))[0].accessKey = accessKey;
                    Array.from(postDiv.getElementsByClassName("mre "))[0].innerHTML = moment(new Date(post.createdDate)).fromNow();;
                    postsDiv.appendChild(postDiv);
                }
            }
        }).catch(err => {
        })
    })
}
function getProfilePhoto() {
    const loginUserId = localStorage.getItem("userId");
    getUserByIdServices(loginUserId).then((res) => {
        res.json().then(async json => {
            const userProfilePhoto = json.user.profilePhoto;
            Array.from(document.getElementsByClassName("followersStrong"))[0].innerHTML = json.user.followers.length;
            if (userProfilePhoto) {
                Array.from(document.getElementsByClassName("post-photo-style"))[0].src = await getFile(userProfilePhoto);
            }
            else {
                Array.from(document.getElementsByClassName("post-photo-style"))[0].src = "assets/nonprofilephoto.png"
            }
            if (loginUserId != null) {
                Array.from(document.getElementsByClassName("logInLogOut"))[0].innerHTML = "Çıkış"
            }
        })
    })
}
function getUserName() {
    const loginUserId = localStorage.getItem("userId");
 getUserByIdServices(loginUserId).then((res) => {
        res.json().then(async json => {
            const userName = json.user.firstName.charAt(0).toUpperCase() + json.user.firstName.slice(1) + '\xa0' + json.user.lastName.charAt(0).toUpperCase() + json.user.lastName.slice(1);
            const userBckgroundPhoto = json.user.backgroundPhoto;
            const userCompanyOrShcool = json.user.companyOrSchool;
            const userDepartment = json.user.department;
            if(userCompanyOrShcool){
                Array.from(document.getElementsByClassName("ptag-profile"))[0].innerHTML =userCompanyOrShcool
                Array.from(document.getElementsByClassName("departmentText"))[0].innerHTML =userDepartment
            }
            if(userBckgroundPhoto) Array.from(document.getElementsByClassName("p-cap-photo"))[0].src =await getFile(userBckgroundPhoto);
            Array.from(document.getElementsByClassName("profile-name-text"))[0].innerHTML = userName
            Array.from(document.getElementsByClassName("modalUserName"))[0].innerHTML = userName
            const userProfile = json.user.profilePhoto;
            if (userProfile) {
                Array.from(document.getElementsByClassName("modalImg"))[0].src = await getFile(userProfile);
                Array.from(document.getElementsByClassName("left-profile-photo"))[0].src = await getFile(userProfile);
                Array.from(document.getElementsByClassName("i-photo"))[0].src = await getFile(userProfile);
            }
            else[
                Array.from(document.getElementsByClassName("modalImg"))[0].src = "assets/nonprofilephoto.png",
                Array.from(document.getElementsByClassName("left-profile-photo"))[0].src = "assets/nonprofilephoto.png",
                Array.from(document.getElementsByClassName("i-photo"))[0].src = "assets/nonprofilephoto.png"
            ]
        })
    })
}
function getButtonBrk(e) {
    const accessKey = event.target.accessKey;
    const loginUserId = localStorage.getItem("userId");
    addFollowerServices(loginUserId,accessKey).
    then((res) => res.text()).
    then(async (res) => {
        alert(res);
    })
}