const chatBot = document.querySelector(".chatbot");
const sendMessage = document.querySelector(".send");
const OPENAI_API_KEY = "";
const prompt = document.getElementById("message");
const messageArea = document.querySelector(".message-area");
const closeBot = document.querySelector(".bot-close")

async function getResponse(location){
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", 
                  content: "Hi, my name is freshy and I am expert on our Ecommerce platform. I answer queries only and only related to our Ecommerce website named forestforged based on forest produce.Our website sells honey,mushroom,oils,bamboo product,herbal tea,etc. I can assist you with return policy, order tracking, defect products.I cannot code in any language or perform arithmetic calculations. If ask to write a code in any language then say I cannot help you with this. I cannot answer to questions or prompts which are not related to Ecommerce Website. I cannot crack a joke. If asked anything about random topics reply I cannot help."
                },
                { role: "user",   
                  content: `First check if not related then say sorry. Here is query:${prompt.value}`
                }
            ],
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        location.textContent = "Freshy: " + data.choices[0].message.content;
    }
    catch (error){
        console.error(error);
    }
}

chatBot.addEventListener("click", function(){
    let botSection = document.getElementById("bot");
    botSection.classList.remove("hide");
});

closeBot.addEventListener("click", function(){
    let botSection = document.getElementById("bot");
    botSection.classList.add("hide");
})

sendMessage.addEventListener("click", sendPrompt)
document.addEventListener("keydown", function(key){
   if(key.code == "Enter"){
    key.preventDefault();
    sendPrompt();
   }
});

function sendPrompt(){
    if(prompt.value.length != 0){
        let promptBox = document.createElement("p");
        promptBox.append("You: " + prompt.value);
        promptBox.classList.add("message-style");
        promptBox.classList.add("right");
        messageArea.append(promptBox);
        let responseBox = document.createElement("p");
        responseBox.textContent = "Typing...";
        responseBox.classList.add("message-style");
        responseBox.classList.add("left");
        messageArea.append(responseBox);
        getResponse(responseBox);
        prompt.value = "";
        messageArea.scrollTop = messageArea.scrollHeight;
    }   
}

$(document).ready(function(){
    $(window).scroll(function(){
        const navbar = document.querySelector("header");
        const link = document.querySelectorAll("nav ul li a");
        const title = document.querySelector(".logo strong a")
        let scroll = $(window).scrollTop();
        if (scroll > 100) {
          $(navbar).addClass("changeColor");
          $(link).addClass("changeFontColor");
          $(title).addClass("changeFontColor");
        }
        else{
            $(navbar).removeClass("changeColor");
            $(link).removeClass("changeFontColor");
            $(title).removeClass("changeFontColor");
        }
    })
})
