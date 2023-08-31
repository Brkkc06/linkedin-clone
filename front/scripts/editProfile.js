// const file = document.getElementById("profilePhotoUpload");
urlLocationHandler;
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
            const getBackgroundPhoto = json.user.backgroundPhoto         
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

        })
    })
}

const ul = document.getElementsByClassName("ulChips");
const input = document.getElementById("inputChips");

function addSkill(e){
    console.log(e.target.value);
}


if(input){
    input.addEventListener("keyup",addSkill,false)
}





