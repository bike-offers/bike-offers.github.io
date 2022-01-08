import { notify } from "./api/notify.js";
import { getOfferDetails, updateOffer } from "./api/offersService.js";
import { detailsPage } from "./details.js";
import { html } from "./lib.js";

const editTemplate = (onSubmit, offer, onChange) => html` <section
    id="create-page"
    class="auth"
  >
    <form @submit=${(event) => onSubmit(event)} id="create">
      <div class="container">
        <h1>Edit Offer</h1>
        <label for="leg-title">Offer title:<span class="red-star"> *</span></label>
        <input type="text" id="title" name="title" value=${offer.title} />

        <label for="manufacturer">Manufacture:<span class="red-star"> *</span></label>
        <input
          type="text"
          id="manufacturer"
          name="manufacturer"
          value=${offer.manufacturer}
        />

        <label  for="type">Type:<span class="red-star"> *</span></label>
        <div class="type-wrap">
          <input
            @change=${(event) => onChange(event)}
            type="checkbox"
            name="bike"
            id="bike"
            value="Bike"
            class="type-check"
          />
          <label id='redme' for="Bike" class="create-type">bike</label>
        </div>
        <div class="type-wrap">
          <input
            @change=${(event) => onChange(event)}
            type="checkbox"
            name="equipment"
            id="equipment"
            value="equipment"
            class="type-check"
          />
          <label id='redme' for="equipment" class="create-type">equipment</label>
        </div>
        <div class="type-wrap">
          <input
            @change=${(event) => onChange(event)}
            type="checkbox"
            name="parts"
            id="parts"
            value="parts"
            class="type-check"
          />
          <label id='redme' for="parts" class="create-type">parts</label>
        </div>
        <label for="levels">Price:<span class="red-star"> *</span></label>
        <input
          type="number"
          id="price"
          name="price"
          min="1"
          value=${offer.price}
        />

        <label for="offer-img">Image:</label>
        <input type="text" id="img" name="img" value=${offer.img} />

        <label for="description">Description:<span class="red-star"> *</span></label>
        <textarea name="description" id="description">
${offer.description}</textarea
        >
        <input class="btn submit" type="submit" value="Edit Offer" />
      </div>
    </form>
  </section>
  <div class="push"></div>`;

export async function editPage(ctx) {
  update()
async function update(){
  let id = ctx.params.id;


  let offer = await getOfferDetails(id);
 
  let currentType = offer.offerType;
  

  ctx.render(editTemplate(onSubmit, offer, onChange));
  myFunction(currentType);

  function myFunction(currentType) {


    if (currentType == "bike") {
      let checkBox = document.querySelector("#bike");
     
      checkBox.checked = true;
      const equipmentType =
        document.querySelector("#equipment").checked = false;
      const partsType = document.querySelector("#parts").checked = false;
    } else if (currentType == "equipment") {
      let checkBox = document.getElementById("equipment");
      checkBox.checked = true;

      const equipmentType = document.querySelector("#bike").checked = false;
      const partsType = document.querySelector("#parts").checked = false;
    } else if (currentType == "parts") {
      let checkBox = document.getElementById("parts");
      checkBox.checked = true;

      const equipmentType = document.querySelector("#bike").checked = false;
      const partsType = document.querySelector("#equipment").checked = false;
    }


  }
  async function onChange(ev) {
    ev.preventDefault();

    const bikeType = document.querySelector("#bike");
    const equipmentType = document.querySelector("#equipment");
    const partsType = document.querySelector("#parts");
    if (bikeType.checked == true) {
      equipmentType.disabled = true;
      partsType.disabled = true;
    } else if (equipmentType.checked == true) {
      bikeType.disabled = true;
      partsType.disabled = true;
    } else if (partsType.checked == true) {
      bikeType.disabled = true;
      equipmentType.disabled = true;
    } else if (
      bikeType.checked == false &&
      partsType.checked == false &&
      equipmentType.checked == false
    ) {
      bikeType.disabled = false;
      partsType.disabled = false;
      equipmentType.disabled = false;
    }
  }
  async function onSubmit(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const title = form.get("title").trim();
    const manufacturer = form.get("manufacturer").trim();
    const price = Number(form.get("price").trim());
    const img = form.get("img").trim();
    const desc = form.get("description").trim();
    let offerType = "";
    const bikeType = document.querySelector("#bike");
    const equipmentType = document.querySelector("#equipment");
    const partsType = document.querySelector("#parts");
    if (bikeType.checked == true) {
      offerType = "bike";
    } else if (equipmentType.checked == true) {
      offerType = "equipment";
    } else if (partsType.checked == true) {
      offerType = "parts";
    }

    try {
      if (title == "" || manufacturer == "" || price <= 0 || desc == "") {
        if (title == "") {
          let titleInput = document.querySelector("#title");
          titleInput.classList.add("error-input");
     
          colorRed();
        }
        else{
          let titleInput = document.querySelector("#title");
          titleInput.classList.remove("error-input");
      
          colorRed();
        }
        if (manufacturer == "") {
          let manufacturerInput = document.querySelector("#manufacturer");
          manufacturerInput.classList.add("error-input");
      
          colorRed();
        }
        else{
          let manufacturerInput = document.querySelector("#manufacturer");
          manufacturerInput.classList.remove("error-input");
         
          colorRed();
        }
        if (price == "") {
          let priceInput = document.querySelector("#price");
          priceInput.classList.add("error-input");
    
          colorRed();
        }
        else{
          let priceInput = document.querySelector("#price");
          priceInput.classList.remove("error-input");
        
          colorRed();
        }
        if (desc == "") {
          let descInput = document.querySelector("#description");
          descInput.classList.add("error-input");
      
          colorRed();
        }
        else{
          let descInput = document.querySelector("#description");
          descInput.classList.remove("error-input");
        
          colorRed();
        }
        throw new Error("Please fill all * fields!");
      }
      else{
        let titleInput = document.querySelector("#title");
        let manufacturerInput = document.querySelector("#manufacturer");
        let priceInput = document.querySelector("#price");
        let descInput = document.querySelector("#description");
        titleInput.classList.remove("error-input");
        manufacturerInput.classList.remove("error-input");
        priceInput.classList.remove("error-input");
        descInput.classList.remove("error-input");
        colorRed();
      }
   
      if (title.length > 12) {
        throw new Error("Maximum title symbols are 12!");
      }
      if (
        bikeType.checked == false &&
        equipmentType.checked == false &&
        partsType.checked == false
      ) {
        colorRed(true)
        throw new Error("Please select type of offer!");
      }
      let description = [desc];
 
      delete offer.updatedAt;
      delete offer.ownerId;
      delete offer.objectId;
      delete offer.createdAt;

      if (img == "") {
        const updatedOffer = await updateOffer(id, {
          title,
          manufacturer,
          price,
          description,
          offerType,
        });
      } else {
        const updatedOffer = await updateOffer(id, {
          title,
          manufacturer,
          price,
          description,
          img,
          offerType,
        });
      }

      ctx.page.redirect(`/details/${id}`);
    } catch (err) {
      notify(err.message)

    }
  }
  function colorRed(check){
    if(check){
      const allLabels = document.querySelectorAll('#redme').forEach((label) => label.classList.add('red-element'))

    }
    else{
    const allLabels = document.querySelectorAll('#redme').forEach((label) => label.classList.remove('red-element'))

    }
update()
  }
}
}

 //COLOR RED FUNCTION-a na vsi4ki update!!!