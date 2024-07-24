const socket = io();
let name;
do {
    name = prompt("Please Enter Your Name: ");
} while (
    !name
);

let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector('.message__area');
textarea.addEventListener('keyup', (e) =>{
    if(e.key === "Enter"){
        sendMessage(e.target.value);
    }
})


function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    };

    
    appendMessage(msg, "outgoing");
    textarea.value = ""
    scrollToBottom()

    socket.emit('message', msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, "message")

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}


//rec

socket.on("message",(msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})



function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}