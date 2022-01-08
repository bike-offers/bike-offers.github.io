import { notify } from "./api/notify.js";
import { register } from "./api/userService.js";
import { updateNav } from "./app.js";
import { html } from "./lib.js";

const registerTemplate = (onSubmit, redirect,errors) => html` <section
    id="register-page"
    class="content auth"
  >
    <form @submit=${(event) => onSubmit(event)} id="register">
      <div class="container">
     
        <h1>Register</h1>
${errors != null
          ? html`<div class="error-msg">${errors.error}</div>`
          : ""}
        <label for="email">Username:</label>
        <input type="text" id="username" name="username" />

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" />

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password" />

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password" />

        <input class="btn submit" type="submit" value="Register" />

        <p class="field">
          <span
            >If you already have profile click
            <a @click=${(event) => redirect(event)} href="/login">here</a></span
          >
        </p>
      </div>
    </form>
  </section>
  <div class="push"></div>`;

export async function registerPage(ctx) {
  updateRegister(null);
  async function updateRegister(errors) {
    ctx.render(registerTemplate(onSubmit, redirect,errors));
    async function onSubmit(ev) {
      ev.preventDefault();
      const form = new FormData(ev.target);
      const username = form.get("username").trim();
      const password = form.get("password").trim();
      const email = form.get("email").trim();
      const rePass = form.get("confirm-password").trim();

      try {
        if (username == "" || password == "" || rePass == "" || email == "") {
          if (username == "") {
            let usernameInput = document.querySelector("#username");
            usernameInput.classList.add("error-input");
            console.log(usernameInput);
            updateRegister();
          } else {
            let usernameInput = document.querySelector("#username");

            usernameInput.classList.remove("error-input");
            console.log(usernameInput);
            updateRegister();
          }
          if (password == "") {
            let passwordInput = document.querySelector("#register-password");
            passwordInput.classList.add("error-input");
            console.log(passwordInput);
            updateRegister();
          } else {
            let passwordInput = document.querySelector("#register-password");

            passwordInput.classList.remove("error-input");
            console.log(passwordInput);
            updateRegister();
          }
          if (rePass == "") {
            let rePassInput = document.querySelector("#confirm-password");
            rePassInput.classList.add("error-input");
            console.log(rePassInput);
            updateRegister();
          } else {
            let rePassInput = document.querySelector("#confirm-password");
            rePassInput.classList.add("error-input");
            console.log(rePassInput);
            updateRegister();
          }
          if (email == "") {
            let emailInput = document.querySelector("#email");
            emailInput.classList.add("error-input");
            console.log(emailInput);
            updateRegister();
          } else {
            let emailInput = document.querySelector("#email");
            emailInput.classList.remove("error-input");
            console.log(emailInput);
            updateRegister();
          }

          throw new Error("Please fill all fields!");
        } else {
          let usernameInput = document.querySelector("#username");
          let passwordInput = document.querySelector("#register-password");
          let rePassInput = document.querySelector("#confirm-password");
          let emailInput = document.querySelector("#email");
          rePassInput.classList.remove("error-input");
          emailInput.classList.remove("error-input");
          passwordInput.classList.remove("error-input");
          usernameInput.classList.remove("error-input");
          updateRegister();
        }

        if (password != rePass) {
          let passwordInput = document.querySelector("#register-password");
          let rePassInput = document.querySelector("#confirm-password");
          rePassInput.classList.add("error-input");
          passwordInput.classList.add("error-input");


          throw new Error("Passwords must be the same!");
        }
        else{
          let passwordInput = document.querySelector("#register-password");
          let rePassInput = document.querySelector("#confirm-password");
          rePassInput.classList.remove("error-input");
          passwordInput.classList.remove("error-input");
        }

  

        await register(username, email, password);
        updateNav();
        ctx.page.redirect("/");
      } catch (err) {
        updateRegister({ error: err.message });
        notify(err.message)

      }
    }

    function redirect(ev) {
  
      ev.preventDefault();
      ctx.page.redirect("/login");
    }
  }
}

