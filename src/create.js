import { getUserName } from "./api/auth.js";
import { notify } from "./api/notify.js";
import { createOffer } from "./api/offersService.js";
import { html } from "./lib.js";

const createTemplate = (onSubmit, onChange) => html` <section
    id="create-page"
    class="auth"
  >
    <form @submit=${(event) => onSubmit(event)} id="create">
      <div class="container">
        <h1>Create Offer</h1>
        <label for="leg-title"
          >Offer title: <span class="red-star"> *</span></label
        >
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter offer title..."
        />

        <label for="manufacturer"
          >Manufacture: <span class="red-star"> *</span></label
        >
        <input
          type="text"
          id="manufacturer"
          name="manufacturer"
          placeholder="Enter item manufacture..."
        />

        <label for="type">Type:<span class="red-star"> *</span></label>
        <div class="type-wrap">
          <input
            @change=${(event) => onChange(event)}
            type="checkbox"
            name="bike"
            id="bike"
            value="Bike"
            class="type-check"
          />
          <label for="Bike" id ="redme" class="create-type">bike</label>
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
          <label for="equipment" id ="redme" class="create-type">equipment</label>
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
          <label for="parts" id ="redme" class="create-type">parts</label>
        </div>

        <label for="levels">Price: <span class="red-star"> *</span></label>
        <input type="number" id="price" name="price" min="1" placeholder="1" />

        <label for="offer-img">Image:</label>
        <input
          type="text"
          id="img"
          name="img"
          placeholder="Upload a photo..."
        />

        <label for="description"
          >Description: <span class="red-star"> *</span></label
        >
        <textarea name="description" id="description"></textarea>
        <input class="btn submit" type="submit" value="Create Offer" />
      </div>
    </form>
  </section>
  <div class="push"></div>`;

export async function createPage(ctx) {
  update();
  function update() {
    ctx.render(createTemplate(onSubmit, onChange));
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
        equipmentType.checked == false) {
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
     
            colorRed(false)

          }
          else{
            let titleInput = document.querySelector("#title");
            titleInput.classList.remove("error-input");
            colorRed(false)

          }
          if (manufacturer == "") {
            let manufacturerInput = document.querySelector("#manufacturer");
            manufacturerInput.classList.add("error-input");
            colorRed(false)

          }
          else{
            let manufacturerInput = document.querySelector("#manufacturer");
            manufacturerInput.classList.remove("error-input");
            colorRed(false)

          }
          if (price == "") {
            let priceInput = document.querySelector("#price");
            priceInput.classList.add("error-input");
            colorRed(false)

          }
          else{
            let priceInput = document.querySelector("#price");
            priceInput.classList.remove("error-input");
            colorRed(false)

          }
          if (desc == "") {
            let descInput = document.querySelector("#description");
            descInput.classList.add("error-input");
            colorRed(false)

          }
          else{
            let descInput = document.querySelector("#description");
            descInput.classList.remove("error-input");
            colorRed(false)

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
          colorRed(false)
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
  
        const ownerUsername = getUserName();

        if (img == "") {
    notify('New offer has been created!','newOffer')

          const newOffer = await createOffer({
            title,
            manufacturer,
            price,
            description,
            ownerUsername,
            offerType,
          });
        } else {
    notify('New offer has been created!','newOffer')

          const newOffer = await createOffer({
            title,
            manufacturer,
            price,
            description,
            img,
            ownerUsername,
            offerType,
          });
        }

        ctx.page.redirect("/");
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

