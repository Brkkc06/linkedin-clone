class Post{
    constructor(createdBy,text,mediaPhoto,mediaVideo,createdDate,likedBy){
        this.createdBy = createdBy
        this.text  = text;
        this.mediamediaPhoto =mediaPhoto;
        this.mediaVideo = mediaVideo
        this.createdDate = createdDate;
        this.likedBy =likedBy
    }
}
function openModal() {
    document.getElementById('modal-1').classList.add('open');
    const input = document.querySelector("textarea");
    const form = document.getElementById("postForm");
    const image = document.getElementsByClassName("imageInPostModal")[0];
    const imageSrc = document.getElementsByClassName("imageInPostModal")[0].src;
    const log = document.getElementById("modalInput");
    input.addEventListener("input" ,updateValue);
    const  buttonActivity = document.getElementById("ShareButton");   
    function updateValue() {
        log.textContent = event.target.value;
        if(event.target.value == "" || imageSrc  ==""){
            buttonActivity.disabled=true;
        }
        else{
            buttonActivity.disabled=false;
        }
    }
}

function closeModal() {
    document.querySelector('.jw-modal.open').classList.remove('open');
}
const userId=sessionStorage.getItem("userId");
function getByUserId(){
    const res =  fetch(`http://127.0.0.1:3000/getUserById/${userId}`,{
        method:"GET",
        headers:{
            "content-type":"application/json"
        },
    }).then(res =>{
        res.json().then (async json => {
            const result = json.user;
            const userName = result.firstName;
            const userLastName = result.lastName;
            const userPersonelId = result._id;
            const userFollowers = result.followers;
            const userFollowed = result.followed;
            if(userFollowers){
                fetch (`http://127.0.0.1:3000/getUserById/${userFollowers}`,{
                    method:"GET",
                    headers:{
                        "content-type":"application/json"
                    },
                }).then(response =>{
                    response.json().then(async json =>{
                        const resultUserFollowers = json.user;
                        const userFollowersName= resultUserFollowers.firstName;
                        const userFollowersLastName = resultUserFollowers.lastName;
                        const userFollowersId = resultUserFollowers._id;  
                    })
                })
            }
            if(userFollowed){
                fetch (`http://127.0.0.1:3000/getUserById/${userFollowed}`,{
                    method:"GET",
                    headers:{
                        "content-type":"application/json"
                    },
                }).then(responseUserFollowed =>{
                    responseUserFollowed.json().then(async json =>{
                        const resultUserFollowed = json.user;
                        const userFollowedName= resultUserFollowed.firstName;
                        const userFollowedLastName = resultUserFollowed.lastName;
                        const userFollowedId = resultUserFollowed._id; 
                    })
                })
            }
        })
    })
}
// BACK-END E BURADAN GÖNDERECEKSİN.
function sharePost(e){
    e.preventDefault() 
    postForm = document.getElementById('postForm');
    inputText = postForm.elements.modalInput.value;
    fetch("http://127.0.0.1:3000/addPost",{
        method:"POST",
        headers: {
            "Content-type" : "application/json"
        },
        body:JSON.stringify({
            newPost:{
                createdBy:sessionStorage.getItem("userId"),
                text:inputText,
                mediaPhoto:imgSrcSharePhoto,
                mediaVideo:videoSrcShareVideo,
            }
        })
    }).then(res => {
        res.text().then(text=> {
            alert(text)
            closeModal();
        })
    })
}