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