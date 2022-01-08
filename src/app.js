import * as user from './api/userService.js'
import * as offer from './api/offersService.js'
import * as data from './api/data.js'

import {html,render,page} from './lib.js'
import { homePage } from './home.js';
import { registerPage } from './register.js';
import { loginPage } from './login.js';
import { detailsPage } from './details.js';
import { createPage } from './create.js';
import { editPage } from './edit.js';
import { myOffersPage } from './myOffers.js';
import { allOffers } from './allOffers.js';
import { getUserData, getUserName, isLoggedIn } from './api/auth.js';
import { donatePage } from './donate.js';
import { notify } from './api/notify.js';


const root = document.querySelector('#main-content')
document.querySelector('.logout').addEventListener('click',logOutUser)
window.notify= notify;
page(decoration)
page('/',homePage)
page('/register',registerPage)
page('/login',loginPage)
page('/details/:id',detailsPage)
page('/create',createPage)
page('/edit/:id',editPage)
page('/my-offers',myOffersPage)
page('/all-offers',allOffers)
page('/donate',donatePage)




 
page.start()

updateNav()


function decoration(ctx,next){
ctx.render = (content) => render(content,root)
  next()
}
export function updateNav(){
    const userData = getUserData();
 
    if (userData) {
    

    const userHello = document.querySelector('#welcome')
   
    let userName=getUserName();
  
userHello.textContent = `Welcome, ${userName}!`
 
      Array.from(document.querySelectorAll('.guest')).forEach((guest)=>guest.style.display = "none")
      Array.from(document.querySelectorAll('.user')).forEach((guest)=>guest.style.display = "block")
    } else {
 
 

      Array.from(document.querySelectorAll('.guest')).forEach((guest)=>guest.style.display = "block")
      Array.from(document.querySelectorAll('.user')).forEach((guest)=>guest.style.display = "none")
    }
}

async function logOutUser(e){
    e.preventDefault()
  await user.logOut()
//  notify('Logged out!','new-notification')
  updateNav()

  page.redirect('/')
}
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navBarLinks = document.getElementsByClassName('navbar-links')[0]
toggleButton.addEventListener('click',()=>{
  navBarLinks.classList.toggle('active')
 
})

    
const footer =document.querySelector('.footer')
const donate = document.querySelector('.donate')
const creator = document.querySelector('.creator-info')
footer.addEventListener('click',() => {
 
  donate.classList.toggle('active')
 
  creator.classList.toggle('hidden')

})
