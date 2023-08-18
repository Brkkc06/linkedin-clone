
class Post{
    constructor(createdBy,text){
        this.createdBy = createdBy
        this.text  = text;
    }
}


function openModal() {
    document.getElementById('modal-1').classList.add('open');

    const input = document.querySelector("textarea");
    const log = document.getElementById("modalInput");
    input.addEventListener("input", updateValue);
    const  buttonActivity = document.getElementById("ShareButton");

    function updateValue() {
        log.textContent = event.target.value;

        if(event.target.value == ""){
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



function sharePost(e){
    e.preventDefault()
    
    postForm = document.getElementById('postForm');
    inputText = postForm.elements.modalInput.value;
    

    newPost = new Post(sessionStorage.getItem("userId"), inputText);
    
    fetch("http://127.0.0.1:3000/addPost",{
        method:"POST",

        headers: {
            "Content-type" : "application/json"
        },

        body:JSON.stringify({
            newPost:newPost
        })

    }).then(res => {
        
        res.text().then(text=> {
            alert(text)
            closeModal();
        })
        
    })
}