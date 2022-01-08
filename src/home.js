import { getUserData, getUserName } from "./api/auth.js";
import { getAllOffers } from "./api/offersService.js";

import { html } from "./lib.js";
let bike = `<i class="fas fa-bicycle"></i>`;
let parts = `<i class="fas fa-cogs"></i>`;
let equipment = `<i class="fas fa-tshirt"></i>`;
let type = {
  bike: bike,
  parts: parts,
  equipment: equipment,
};

const homeTemplate = (homeOffers,username) => html`
  <section id="welcome-world">

 

    <div id="home-page">
      <h1>Latest Offers</h1>

      <!-- Display div: with information about every offer (if any) -->

      <div class="offer-wrapper">
        ${homeOffers.map(
          (bike) => html`
            <div class="offer">
              <div class="image-wrap">
               
                ${bike.img
                  ? html` <img src=${bike.img} />`
                  : html`<img src="./img/noImg.jpg" />`}
              </div>
              <div class="info-wrapper">
                <h3>${bike.title}</h3>
                <div class="rating">
              
                  ${bike.offerType == 'bike' ? bikeType() : ''}
                  ${bike.offerType == 'equipment' ? equipmentType() : ''}
                  ${bike.offerType == 'parts' ? partsType() : ''}

          
                </div>
                <div class="data-buttons">
                  <a href="/details/${bike.objectId}" class="btn details-btn"
                    >Details</a
                  >
                </div>
              </div>
            
            </div>
          `
        )}
      </div>
    </div>
  </section>
  <div class="push"></div>
`;
const noDataTemplate = () => html`
  <section id="welcome-world">
    <div class="welcome-message">
      <h2>ALL bikes are</h2>
      <h3>Only in BikeMarket</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero" />

    <div id="home-page">
      <h1>Latest Offers</h1>
      <!-- Display paragraph: If there is no offers  -->
      <p class="no-articles">No offers yet</p>
    </div>
  </section>
  <div class="push"></div>
`;
const bikeType = () => html`   <p class="offer-icon">
                   
                   
<i class="fas fa-bicycle"></i>
</p>`
const partsType = () => html `<p class="offer-icon"> <i class="fas fa-cogs"></i> </p>`
const equipmentType = () => html `<p class="offer-icon">  <i class="fas fa-tshirt"></i> </p>`
const noType = () => html `<p class="offer-icon"> <span> No Type</span> </p>`

export async function homePage(ctx) {
  const bikeOffers = await getAllOffers();

  let allOffers = bikeOffers.results;
  let username =null;
  let userData = getUserData()
  if(userData!=null){
    username = getUserName()
  }
 
  if (allOffers.length == 0) {
    return ctx.render(noDataTemplate());
  } else {
    let homeOffers = [];
    let length = allOffers.length - 1;
    for (let index = length; length - 4 < index; index--) {
   
      homeOffers.push(allOffers[index]);
    }
    return ctx.render(homeTemplate(homeOffers,username));
  }
}
