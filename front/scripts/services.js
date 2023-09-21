function addPost(newPost){
    const newPost = {
        createdBy,text,mediaPhoto,mediaVideo,createdDate,likedBy,likeNumber
    }
    fetch("http://127.0.0.1:3000",{
        method:"Post",
        headers:{
            "content-type" : "application/json"
        },
        body:JSON.stringify({
            newPost:{

            }
        })
    }).then()
}