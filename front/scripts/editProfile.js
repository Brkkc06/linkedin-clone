const img = document.getElementsByClassName("editPhoto");
let imgSrc,imgSrcBckground;
async function saveUserImg(imgtype){
    const formData = new FormData();
    formData.append("image", document.getElementById(imgtype).files[0]);
    fetch("http://127.0.0.1:3000/saveImg", {method: "post", body: formData}).then(async (res) => {
        if(imgtype === "profilePhotoUpload") imgSrc = await res.text()
        
        else imgSrcBckground =await res.text()
    });
}
function logFile(event) {
    // 
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
    // if(!file.value.length)return;
    // const reader = new FileReader();
    // reader.onload = logFile;
    // reader.readAsDataURL(file.files[0]);
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
            if (getProfilePhoto) {
                Array.from(document.getElementsByClassName("editPhoto"))[0].src =  await getFile(getProfilePhoto);
            }
            else {
                Array.from(document.getElementsByClassName("editPhoto"))[0].src = "assets/nonprofilephoto.png"
            }
            if (getBackgroundPhoto) {
              
                Array.from(document.getElementsByClassName("editBackground"))[0].src =   await getFile(getBackgroundPhoto);
            }
            else {
                Array.from(document.getElementsByClassName("editBackground"))[0].src = "assets/cap-photo.svg"
            }
            Array.from(document.getElementsByClassName("editFirstName"))[0].value = getFirstName;
            Array.from(document.getElementsByClassName("editLastName"))[0].value = getLastName;
            Array.from(document.getElementsByClassName("editEmail"))[0].value = getMail;
            Array.from(document.getElementsByClassName("editPass"))[0].value = getPass;
            if(getSkills){
                const ul = document.getElementsByClassName("ulChips");
                // const li = ul[0].querySelectorAll("li").forEach(li => li.remove());
                getSkills.forEach(skill => {
                    let liSkill = `<li>${skill} <i class="fa-solid fa-xmark fa-2xs"  onclick="remove(this,'${skill}')"></i></li>`;
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


    skills.slice().reverse().forEach(skill => {
        let liSkill = `<li>${skill} <i class="fa-solid fa-xmark fa-2xs"  onclick="remove(this,'${skill}')"></i></li>`;
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
        let index = skills.indexOf(skill);
        const x = skill.split("");
        x.pop();    
        const y=  x.join("");
        console.log(y);  
        const newSkill =skill.split(",");
        

        
        if(skill.length > 1 && !skills.includes(skill)){
            skill.split(' , ').forEach(skill =>{
                skills.push(newSkill[0])
                createSkill();
            });
        }
        e.target.value = "";
    
    }
}

function removeButtonActivity(event) {
    const ul = document.getElementsByClassName("ulChips");
    skills.length = 0;
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
    const updateBackground = document.getElementsByClassName("editBackground")[0].src;
    const updateProfilePhoto = document.getElementsByClassName("editPhoto")[0].src;
    const updateSkill = skills;
  

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
                profilePhoto: imgSrc
            }
        }) 
    }).then(res => {
        res.json().then(async json => alert(json.message))
    })

}
