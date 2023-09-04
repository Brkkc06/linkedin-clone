// const file = document.getElementById("profilePhotoUpload");
const img = document.getElementsByClassName("editPhoto");
function logFile(event){
    console.log(document.getElementById("profilePhotoUpload").files)
    var reader = new FileReader();
    
    reader.onload = function (event) {
        console.log(event);
        document.getElementsByClassName("editPhoto")[0].src = event.target.result;
    };
    
    reader.readAsDataURL(document.getElementById("profilePhotoUpload").files[0]);
}
function HandleSubmit(event){

    event.preventDefault();
    logFile(event);
    // if(!file.value.length)return;
    // const reader = new FileReader();
    // reader.onload = logFile;
    // reader.readAsDataURL(file.files[0]);
}
const imgBackground = document.getElementsByClassName("editBackground");
function logFileBackground(event){
    
    var readerBackground = new FileReader();
    readerBackground.onload = function(event) {
        document.getElementsByClassName("editBackground")[0].src = event.target.result;
    }
    readerBackground.readAsDataURL(document.getElementById("backgroundPhotoUpload").files[0]);
}
function BackgroundHandleSubmit(event){
    event.preventDefault();
    logFileBackground(event);
}


function getProfileInfo(){
    const loginUserId = sessionStorage.getItem("userId");
    fetch(`http://127.0.0.1:3000/getUserById/${loginUserId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },
    }).then((res)=>{
        res.json().then( async json => {
            const getProfilePhoto = json.user.profilePhoto;
            const getFirstName = json.user.firstName;
            const getLastName = json.user.lastName;
            const getMail = json.user.email;
            const getPass = json.user.password; 
            const getBackgroundPhoto = json.user.backgroundPhoto;
            const getSkills = json.user.skills;         
            if(getProfilePhoto){
                Array.from(document.getElementsByClassName("editPhoto"))[0].src= getProfilePhoto
            }
            else{
                Array.from(document.getElementsByClassName("editPhoto"))[0].src = "assets/nonprofilephoto.png"
            }
            if(getBackgroundPhoto){
                Array.from(document.getElementsByClassName("editBackground"))[0].src = getBackgroundPhoto
            }            
            else{
                Array.from(document.getElementsByClassName("editBackground"))[0].src = "assets/cap-photo.svg"
            }
            Array.from(document.getElementsByClassName("editFirstName"))[0].value = getFirstName;
            Array.from(document.getElementsByClassName("editLastName"))[0].value = getLastName;
            Array.from(document.getElementsByClassName("editEmail"))[0].value = getMail;
            Array.from(document.getElementsByClassName("editPass"))[0].value = getPass;
            if(getSkills){
                Array.from(document.getElementById("inputChips")).value = getSkills;
            }

        })
    })
}

function addSkill(e){
    console.log(e)
    console.log(e.target.value);
   
}

function startEditProfile() {
    const ul = document.getElementsByClassName("ulChips");
    const  removeButton = document.getElementById("removeButton");
    const input = document.getElementById("inputChips"); 
    input.addEventListener("keyup",addSkill)
}
let skills =[];

function createSkill(){
    const ul = document.getElementsByClassName("ulChips");
    ul[0].querySelectorAll("li").forEach(li => li.remove());
    

    skills.slice().reverse().forEach(skill =>{
        let liSkill = `<li>${skill} <i class="fa-solid fa-xmark fa-2xs"  onclick="remove(this,'${skill}')"></i></li>`;
        ul[0].insertAdjacentHTML("afterbegin",liSkill);
    })
}

function remove(element, skill){
    let index = skills.indexOf(skill);
    skills =[...skill.slice(0,index),...skills.slice(index+1)];
    element.parentElement.remove();
}

function addSkill(e){
    if(e.key =="Enter"){
        const skill = e.target.value.replace(/\s+/g,' ')
        if(skill.length > 1 && !skills.includes(skill)){
            skill.split(' , ').forEach(skill =>{
                skills.push(skill)
                createSkill();
            });
        }
        e.target.value = "";
    }
}

function removeButtonActivity(event){
    const ul = document.getElementsByClassName("ulChips");
    skills.length = 0;
    ul[0].querySelectorAll("li").forEach(li => li.remove());
}


function onChangeInput() {
    document.getElementsByClassName('changeSaveBtn')[0].disabled = false;
}

function uptadeUser(){
const updateFirstName = document.getElementsByClassName("editFirstName")[0];
const updateLastName = document.getElementsByClassName("editLastName")[0];
const updateEmail = document.getElementsByClassName("editEmail")[0];
const updatePass = document.getElementsByClassName("editPass")[0];
const updateSkill = document.getElementById("inputChips");

    fetch(`http://127.0.0.1:3000/getUserById/${uptadeUser}`,{
        method:"Post",
        headers:{
            "Content-type" : "application/json"
        },
        body:{

        }

    })
}