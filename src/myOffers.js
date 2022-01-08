import { getUserId } from './api/auth.js'
import { getAllOffers, getMyProfile } from './api/offersService.js'
import {html} from './lib.js'

const myOffersTemplate = (result,redirect)=> html` <section id="catalog-page">
<h1>My Offers</h1>
<!-- Display div: with information about every offer (if any) -->
${result.map((offer)=>html`  <div class="allOffers">
  <div class="allOffers-info">
    <img src=${offer.img} />
    <!-- <h6>Action</h6> -->
    <h2>${offer.title}</h2>
    <a @click=${(event)=>redirect(event,offer.objectId)} href="/details/${offer.objectId}" class="details-button">Details</a>
  </div>
</div>`)}

</section>
<div class="push"></div>`;
const noDataTemplate = ()=>html`
<section id="welcome-world">

<div class="welcome-message">


<div id="home-page">
  <h1>My offers</h1>
<!-- Display paragraph: If there is no offer  -->
  <p class="no-articles"> No bike offers yet</p>
  <div class='no-offers'><a class="click2create" href="/create"><i class="fas fa-folder-plus"></i></a></div>
</div>

</section>
<div class="push"></div>`

export async function myOffersPage(ctx){

let result = [];
    const userId = getUserId()
    const myOffers = await getAllOffers()
    
    let offers = myOffers.results
    
    
for (const offer of offers) {
    let currentId=offer.ownerId
    let id=currentId.objectId
 
    if(id ==userId){
        result.push(offer)
    }
}

if(result.length ==0){
    return ctx.render(noDataTemplate())
}
else{
 return   ctx.render(myOffersTemplate(result,redirect))
}
function redirect(ev,id){ 
  ev.preventDefault();
 ctx.page.redirect(`/details/${id}`)

}
}