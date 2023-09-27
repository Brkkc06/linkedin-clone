const loginUserId = localStorage.getItem("userId");
async function addPost(newPost){  
    const result = await fetch("http://127.0.0.1:3000/addPost",{
        method:"Post",
        headers:{
            "content-type" : "application/json"
        },
        body:JSON.stringify({
            newPost: newPost,
        })
    });
    return result;
}
async function getUserByIdServices(id){
    const result = await fetch(`http://127.0.0.1:3000/getUserById/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },
    });
    return result;
}

async function updateUserServices(user){
    const result = await fetch("http://127.0.0.1:3000/updateUser", {
        method: "Post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            loginUserId: loginUserId,
            user:user
        })
    });
    return result;
}

async function updateLikeServices(likedBy,postId){
    const result = await  fetch(`http://127.0.0.1:3000/updateLike`,{
        method:"Post",
        headers:{
            "content-type" :"application/json"
        },
        body:JSON.stringify({
            likedBy:likedBy,
            postId:postId
        })
    });
    return result;
}

async function dislikeServices(accessKey,userId){
    const result = await  fetch(`http://127.0.0.1:3000/disLike`,{
        method:"Post",
        headers:{
            "content-type" : "application/json"
        },
        body:JSON.stringify({
            postId:accessKey,
            likedBy:userId,
        })
    })
    return result;
}

async function getAllPostServices(){
    const result =  await fetch("http://127.0.0.1:3000/getAll", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },
    })
    return result;
}

async function getAllUserServices(){
    const result = await fetch("http://127.0.0.1:3000/getAllUser", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },
    })
    return result;
}

async function addFollowerServices(loginUserId,accessKey){
    const result = await fetch("http://127.0.0.1:3000/addFollower", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            follower: loginUserId,
            followed: accessKey,
        })
    })
    return result;
}