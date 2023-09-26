const userId = localStorage.getItem("userId"); 
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
function getByUserId(){
    getUserByIdServices(userId).then(res =>{
        res.json().then (async json => {
            const result = json.user;
            const userName = result.firstName;
            const userLastName = result.lastName;
            const userPersonelId = result._id;
            const userFollowers = result.followers;
            const userFollowed = result.followed;
            if(userFollowers){
                getUserByIdServices(userFollowers)
                .then(response =>{
                    response.json().then(async json =>{
                        const resultUserFollowers = json.user;
                        const userFollowersName= resultUserFollowers.firstName;
                        const userFollowersLastName = resultUserFollowers.lastName;
                        const userFollowersId = resultUserFollowers._id;  
                    })
                })
            }
            if(userFollowed){
                getUserByIdServices(userFollowed)
                .then(responseUserFollowed =>{
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
function likePost(event){
    const accessKey = event.target.accessKey;
    console.log("like yapıldı")
       
    getUserByIdServices(userId)
    .then(res => {
        res.json().then(async json =>{
            const user = json.user;
            const userFN = user.firstName;
            const userLN = user.lastName;
            Array.from(document.getElementsByClassName("proof-text"))[0].innerHTML = userFN.charAt(0).toUpperCase() + userFN.slice(1) + '\xa0' + userLN.charAt(0).toUpperCase() + userLN.slice(1) + '\xa0' +"beğendi";
            updateLikeServices(userId,accessKey)
            .then()
        })
    })
}

function dislike(event){
    const accessKey = event.target.accessKey;
    dislikeServices(accessKey,userId).then() 
}

function sharePost(e){
    calendarChange()
    e.preventDefault() 
    postForm = document.getElementById('postForm');
    inputText = postForm.elements.modalInput.value;
    addPost({
        createdBy:localStorage.getItem("userId"),
        text:inputText,
        mediaPhoto:imgSrcSharePhoto,
        mediaVideo:videoSrcShareVideo,
        activity:activity,
        activityClock:activityClock,       
    }).then(res => res.text().then(text=> {
        alert(text)
        closeModal();
    }))
}