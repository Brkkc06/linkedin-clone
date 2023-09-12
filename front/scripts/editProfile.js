const img = document.getElementsByClassName("editPhoto");
let imgSrc,imgSrcBckground,imgSrcSharePhoto,videoSrcShareVideo;
async function saveUserImg(imgtype){
    const fileExtension = document.getElementById(imgtype).files[0].name.split(".")
    const extension = fileExtension.slice(-1);
    const formData = new FormData();
    formData.append("image", document.getElementById(imgtype).files[0]);
    formData.append("extension",extension)
    fetch("http://127.0.0.1:3000/saveImg", {method: "post", body: formData}).then(async (res) => {
        const resultSrc = await res.text();
        if(imgtype === "profilePhotoUpload") {
            imgSrc = resultSrc;
        }        
        else if(imgtype === "sharePhotoInFeedPage"){
            imgSrcSharePhoto = resultSrc;
        }
        else if (imgtype === "backgroundPhotoUpload" ) {
            imgSrcBckground = resultSrc;
        } 
        else if (imgtype ==="shareVideoInFeedPage") {
            videoSrcShareVideo = resultSrc
        }
    });
}
function logFile(event) {
    var reader = new FileReader();
    reader.onload = function (event) {
        document.getElementsByClassName("editPhoto")[0].src = event.target.result;
    };
    reader.readAsDataURL(document.getElementById("profilePhotoUpload").files[0]);
    saveUserImg("profilePhotoUpload");
}
function HandleSubmit(event) {
    event.preventDefault();
    logFile(event);
}
const imgBackground = document.getElementsByClassName("editBackground");
function logFileBackground(event) {
    var readerBackground = new FileReader();
    readerBackground.onload = function (event) {
        document.getElementsByClassName("editBackground")[0].src = event.target.result;
    }
    readerBackground.readAsDataURL(document.getElementById("backgroundPhotoUpload").files[0]);
    saveUserImg("backgroundPhotoUpload");
}
function BackgroundHandleSubmit(event) {
    event.preventDefault();
    logFileBackground(event);
}
function fileUploadDone() {
    logFileSharePhoto();
    document.getElementById("ShareButton").disabled= false;
}
function logFileSharePhoto(){
    var readerSharePhoto = new FileReader();
    readerSharePhoto.onload = function(event){
        document.getElementsByClassName("imageInPostModal")[0].src = event.target.result; 
    };
    readerSharePhoto.readAsDataURL(document.getElementById("sharePhotoInFeedPage").files[0]);
    saveUserImg("sharePhotoInFeedPage");
}
function logFileShareVideo(){
    var readerShareVideo = new FileReader();
    readerShareVideo.onload = function(event){
        document.getElementById("videoTag").src = event.target.result;
    }
    readerShareVideo.readAsDataURL(document.getElementById("shareVideoInFeedPage").files[0]);
    saveUserImg("shareVideoInFeedPage");
    
}
const b64toBlob = (base64 = 'application/octet-stream') => 
  fetch(base64).then(res => res.blob())
function videoUploadDone(){
    logFileShareVideo();
    document.getElementById("ShareButton").disabled = false;
    document.getElementById("videoTag").style.display = "block"
}

async function getFile(imgsrc){
    const url = encodeURIComponent(imgsrc) 
    const result = await fetch(`http://127.0.0.1:3000/getFile?src=${url}`)
    return result?.url;
}
let skills = [];
function getProfileInfo() {
    const loginUserId = sessionStorage.getItem("userId");
    fetch(`http://127.0.0.1:3000/getUserById/${loginUserId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },
    }).then((res) => {
        res.json().then(async json => {
            const getProfilePhoto = json.user.profilePhoto;
            const getFirstName = json.user.firstName;
            const getLastName = json.user.lastName;
            const getMail = json.user.email;
            const getPass = json.user.password;
            const getBackgroundPhoto = json.user.backgroundPhoto;
            const getSkills = json.user.skills;
            const getdepartment = json.user.department;
            const getCompanyOrSchool = json.user.companyOrSchool;
            if(getdepartment) Array.from(document.getElementsByClassName("userDepartment"))[0].value = getdepartment;
            if(getCompanyOrSchool) Array.from(document.getElementsByClassName("userInfo"))[0].value = getCompanyOrSchool;
            if (getProfilePhoto) Array.from(document.getElementsByClassName("editPhoto"))[0].src =  await getFile(getProfilePhoto);        
            else Array.from(document.getElementsByClassName("editPhoto"))[0].src = "assets/nonprofilephoto.png"   
            if (getBackgroundPhoto) Array.from(document.getElementsByClassName("editBackground"))[0].src =   await getFile(getBackgroundPhoto);     
            else Array.from(document.getElementsByClassName("editBackground"))[0].src = "assets/cap-photo.svg"
            Array.from(document.getElementsByClassName("editFirstName"))[0].value = getFirstName;
            Array.from(document.getElementsByClassName("editLastName"))[0].value = getLastName;
            Array.from(document.getElementsByClassName("editEmail"))[0].value = getMail;
            Array.from(document.getElementsByClassName("editPass"))[0].value = getPass;
            if(getSkills){
                const ul = document.getElementsByClassName("ulChips");
                getSkills.forEach(skill => {
                    let liSkill = `<li>${skill} <i class="fa-solid fa-xmark fa-2xs"  onclick="remove(this,'${skill}');onChangeInput();"></i></li>`;
                    ul[0].insertAdjacentHTML("afterbegin", liSkill);
                    skills.push(skill) 
                })
            }
        })
    })
}
function startEditProfile() {
    const ul = document.getElementsByClassName("ulChips");
    const removeButton = document.getElementById("removeButton");
    const input = document.getElementById("inputChips");
    input.addEventListener("keyup", addSkill)
}
function createSkill() {
    const ul = document.getElementsByClassName("ulChips");
    ul[0].querySelectorAll("li").forEach(li => li.remove());
    skills.reverse().forEach(skill => {
        let liSkill = `<li>${skill} <i class="fa-solid fa-xmark fa-2xs"  onclick="remove(this,'${skill};onChangeInput();')"></i></li>`;
        ul[0].insertAdjacentHTML("afterbegin", liSkill);
    })
}
function remove(element, skill) {
    let index = skills.indexOf(skill);
    skills.splice(index, 1);
    element.parentElement.remove();
}
function addSkill(e) { 
    if(e.key ==","){
        const skill = e.target.value.replace(/\s+/g,' ')   
        const newSkill =skill.split("");
        newSkill.pop()
        const newSkillJoin = newSkill.join("");
        if(newSkillJoin.length > 1 && !skills.includes(newSkillJoin)){
            newSkillJoin.split(",").forEach(newSkillJoin =>{
                if(skills.includes(newSkillJoin) == false){
                    skills.push(newSkillJoin)
                    createSkill();
                }
            });
        }
        onChangeInput();
        e.target.value = "";
    }
}
function removeButtonActivity(event) {
    const ul = document.getElementsByClassName("ulChips");
    skills = []
    ul[0].querySelectorAll("li").forEach(li => li.remove());
}
function onChangeInput() {
    document.getElementsByClassName('changeSaveBtn')[0].disabled = false;
}
function updateUser(e) {
    const loginUserId = sessionStorage.getItem("userId");
    e.preventDefault();
    const updateFirstName = document.getElementsByClassName("editFirstName")[0].value;
    const updateLastName = document.getElementsByClassName("editLastName")[0].value;
    const updateEmail = document.getElementsByClassName("editEmail")[0].value;
    const updatePass = document.getElementsByClassName("editPass")[0].value;
    const updateSkill = skills;
    const updateCompanyOrSchool =document.getElementsByClassName("userInfo")[0].value;
    const updateDepartment = document.getElementsByClassName("userDepartment")[0].value;
    fetch("http://127.0.0.1:3000/updateUser", {
        method: "Post",
        headers: {
            "Content-type": "application/json"
        },
        body:JSON.stringify({
            loginUserId:loginUserId,
            user:{
                firstName: updateFirstName,
                lastName: updateLastName,
                email: updateEmail,
                password: updatePass,
                skills: updateSkill,
                backgroundPhoto: imgSrcBckground,
                profilePhoto: imgSrc,
                companyOrSchool: updateCompanyOrSchool,
                department: updateDepartment
            }
        }) 
    }).then(res => {
        res.json().then(async json => alert(json.message))
    })
}