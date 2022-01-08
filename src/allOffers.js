import { getAllOffers } from "./api/offersService.js";
import { html } from "./lib.js";

let bike = `<i class="fas fa-bicycle"></i>`;
let parts = `<i class="fas fa-cogs"></i>`;
let equipment = `<i class="fas fa-tshirt"></i>`;
const allTemplate = (
  offers,
  redirect,
  filter,
  toggle
) => html` <section id="catalog-page">
    <h1>All Offers</h1>
    <div class="type-options sort-width">
    <div class='sort-offers'>
    

      <a href="#" ><i @click=${(event) =>
        toggle(event)} class="fas fa-filter"></i></a>
  

      </div>
     <div class='hidden sorty'><a href="#" ><i @click=${(event) =>
       filter(event)} class="fas fa-bicycle" id='bike'></i></i></a></div>
     <div class='hidden sorty'><a href="#" ><i  @click=${(event) =>
       filter(event)} class="fas fa-cogs" id='parts'></i></a></div>
     <div class='hidden sorty'><a href="#" ><i @click=${(event) =>
       filter(event)} class="fas fa-tshirt" id='equipment'></i></i></a></div>
  
    </div>

  ${offers.map(
    (offer) => html` <div class="allOffers">
      <div class="allOffers-info">
        <img src=${offer.img} />
      
        <h2>${offer.title}</h2>
        <a
          @click=${(event) => redirect(event, offer.objectId)}
          href="/details/${offer.objectId}"
          class="details-button"
          >Details</a
        >
      </div>
    </div>`
  )}
  
  </section>
  <div class="push"></div>`;

const noDataTemplate = () => html` <section id="catalog-page">
    <h1>All Offers</h1>
    <!-- Display paragraph: If there is no offers  -->
    <h3 class="no-articles">No offers yet</h3>
  </section>
  <div class="push"></div>`;

const bikeOffersTemplate = (bikes, filter) => html` <section id="catalog-page">
<h1>All bike offers</h1>
<div class="type-options">
 <div><a href="#" ><i @click=${(event) =>
   filter(event)} class="fas fa-bicycle" id='bike'></i></i></a></div>
 <div><a href="#" ><i @click=${(event) =>
   filter(event)} class="fas fa-cogs" id='parts'></i></a></div>
 <div><a href="#" ><i @click=${(event) =>
   filter(event)} class="fas fa-tshirt" id='equipment'></i></i></a></div>

</div>
<!-- Display div: with information about every offer (if any) -->
${bikes.map(
  (offer) => html` <div class="allOffers">
    <div class="allOffers-info">
      <img src=${offer.img} />
    
      <h2>${offer.title}</h2>
      <a
        @click=${(event) => redirect(event, offer.objectId)}
        href="/details/${offer.objectId}"
        class="details-button"
        >Details</a
      >
    </div>
  </div>`
)}

</section>
<div class="push"></div>`;

const equipmentOffersTemplate = (
  offers,
  filter
) => html` <section id="catalog-page">
<h1>All equipment offers</h1>
<div class="type-options">
 <div><a href="#" ><i @click=${(event) =>
   filter(event)} class="fas fa-bicycle" id='bike'></i></i></a></div>
 <div><a href="#" ><i @click=${(event) =>
   filter(event)} class="fas fa-cogs" id='parts'></i></a></div>
 <div><a href="#" ><i @click=${(event) =>
   filter(event)} class="fas fa-tshirt" id='equipment'></i></i></a></div>

</div>
<!-- Display div: with information about every offer (if any) -->
${offers.map(
  (offer) => html` <div class="allOffers">
    <div class="allOffers-info">
      <img src=${offer.img} />

      <h2>${offer.title}</h2>
      <a
        @click=${(event) => redirect(event, offer.objectId)}
        href="/details/${offer.objectId}"
        class="details-button"
        >Details</a
      >
    </div>
  </div>`
)}

</section>
<div class="push"></div>`;

const partsOffersTemplate = (
  offers,
  filter
) => html` <section id="catalog-page">
<h1>All parts offers</h1>
<div class="type-options">
 <div><a href="#" ><i @click=${(event) =>
   filter(event)} class="fas fa-bicycle" id='bike'></i></i></a></div>
 <div><a href="#" ><i @click=${(event) =>
   filter(event)} class="fas fa-cogs" id='parts'></i></a></div>
 <div><a href="#" ><i @click=${(event) =>
   filter(event)} class="fas fa-tshirt" id='equipment'></i></i></a></div>

</div>
<!-- Display div: with information about every offer (if any) -->
${offers.map(
  (offer) => html` <div class="allOffers">
    <div class="allOffers-info">
      <img src=${offer.img} />

      <h2>${offer.title}</h2>
      <a
        @click=${(event) => redirect(event, offer.objectId)}
        href="/details/${offer.objectId}"
        class="details-button"
        >Details</a
      >
    </div>
  </div>`
)}

</section>
<div class="push"></div>`;

export async function allOffers(ctx) {
 
  const bikeOffers = await getAllOffers();

  let offers = bikeOffers.results;

  let onlyBikeOffers = [];
  let onlyPartsOffers = [];
  let onlyEquipmentOffers = [];
  for (const offer of offers) {
    if (offer.offerType == "bike") {
      onlyBikeOffers.push(offer);
    }
    if (offer.offerType == "equipment") {
      onlyEquipmentOffers.push(offer);
    }
    if (offer.offerType == "parts") {
      onlyPartsOffers.push(offer);
    }
  }


  if (offers.length == 0) {
    return ctx.render(noDataTemplate());
  } else {
    return ctx.render(allTemplate(offers, redirect, filter, toggle));
  }
  function toggle(ev) {
    ev.preventDefault();
    document.querySelector(".sort-offers").classList.add("hidden");
    document
      .querySelectorAll(".sorty")
      .forEach((i) => i.classList.remove("hidden"));
    document.querySelector(".sort-width").classList.remove("sort-width");
  }
  function filter(ev) {
    ev.preventDefault();
    let filterType = ev.target.id;
    if (filterType == "bike") {
     
      return ctx.render(bikeOffersTemplate(onlyBikeOffers, filter));
    }
    if (filterType == "equipment") {


      return ctx.render(equipmentOffersTemplate(onlyEquipmentOffers, filter));
    }
    if (filterType == "parts") {
  

      return ctx.render(partsOffersTemplate(onlyPartsOffers, filter));
    }
  }
  function redirect(ev, id) {
    ev.preventDefault();
    ctx.page.redirect(`/details/${id}`);
  }
}
