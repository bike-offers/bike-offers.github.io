const container = document.createElement("div");
container.id = "notification";
document.body.appendChild(container);

const ul = document.createElement("ul");
container.appendChild(ul);
ul.addEventListener("click", onClick);

export function notify(message,type) {
  const liItem = document.createElement("li");
 
  if(type==undefined){
    liItem.className = "notification";
  }
  else{
    liItem.className = "notification-comment";

  }

  liItem.textContent = message + "      \u2716";
  ul.appendChild(liItem);
  setTimeout(() => liItem.remove(), 3000);
}
function onClick(event) {
  event.preventDefault();
 
  if (event.target.tagName == "LI") {
    event.target.remove();
  }
}
