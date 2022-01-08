
import { updateOffer } from "./api/offersService.js";
import { login } from "./api/userService.js";
import { updateNav } from "./app.js";
import { html } from "./lib.js";

const loginTemplate = (onSubmit, redirect, errors) => html`
  <section id="login-page" class="auth">
    <form @submit=${(event) => onSubmit(event)} id="login">
      <div class="container">
  
        <h1>Login</h1>
        ${errors != null
          ? html`<div class="error-msg">${errors.error}</div>`
          : ""}
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label for="login-pass">Password:</label>
        <input type="password" id="login-password" name="password" />
        <input type="submit" class="btn submit" value="Login" />
        <p class="field">
          <span
            >If you don't have profile click
            <a @click=${(event) => redirect(event)} href="/register"
              >here</a
            ></span
          >
        </p>
      </div>
    </form>
  </section>
  <div class="push"></div>
`;

export async function loginPage(ctx) {
  updateLogin(null);
  async function updateLogin(errors) {
    ctx.render(loginTemplate(onSubmit, redirect, errors));

    async function onSubmit(ev) {
      ev.preventDefault();
      const form = new FormData(ev.target);
      const username = form.get("username").trim();
      const password = form.get("password").trim();

      try {
        if (username == "" || password == "") {
          if (username == "") {
            let usernameInput = document.querySelector("#username");
            usernameInput.classList.add("error-input");
            console.log(usernameInput);
            updateLogin();
          } else {
            let usernameInput = document.querySelector("#username");

            usernameInput.classList.remove("error-input");
            console.log(usernameInput);
            updateLogin();
          }
          if (password == "") {
            let passwordInput = document.querySelector("#login-password");
            passwordInput.classList.add("error-input");
            console.log(passwordInput);
            updateLogin();
          } else {
            let passwordInput = document.querySelector("#login-password");

            passwordInput.classList.remove("error-input");
            console.log(passwordInput);
            updateLogin();
          }
          throw new Error("Please fill all fields!");
        } else {
          let usernameInput = document.querySelector("#username");
          let passwordInput = document.querySelector("#login-password");
          passwordInput.classList.remove("error-input");
          usernameInput.classList.remove("error-input");
          updateLogin();
        }

     
        await login(username, password);
        updateNav();
        ctx.page.redirect("/");
      } catch (err) {
        // window.alert(err.message)
        updateLogin({ error: err.message });
     
      }
    }

    function redirect(ev) {
  
      ev.preventDefault();
      ctx.page.redirect("/register");
    }
  }
}


