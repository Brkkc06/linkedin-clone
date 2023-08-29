
// const file = document.getElementById("profilePhotoUpload");
const img = document.getElementsByClassName("editPhoto");

function logFile(event){
    console.log(document.getElementById("profilePhotoUpload").files)
    var reader = new FileReader();
    
    reader.onload = function (event) {
        console.log(event);
        document.getElementById("editPhoto").src = event.target.result;
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