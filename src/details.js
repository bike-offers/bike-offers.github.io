import { getUserData, getUserId, getUserName } from "./api/auth.js";
import { createComment, getCommentsByOfferId } from "./api/commentService.js";


import { notify } from "./api/notify.js";
import { deleteOffer, getOfferDetails } from "./api/offersService.js";
import { html } from "./lib.js";

const detailsTemplate = (
  info,
  owner,
  onEdit,
  onDelete,
  addComment,
  comments
) => html` <section
  id="offer-details"
>
  <h1>Offer Details</h1>
  <div class="info-section">
    <div class="offer-header">
      <img class="offer-img" src=${info.img} />
    <div class="offer-info">
    <h1 class="offer-title">${info.title}   </h1> 
    
    <div class=${"buttons" + (owner == true ? "" : " hidden")}>
      <a @click=${(event) => onEdit(event, info.objectId)} href="/edit/${
  info.objectId}" class="button" id="edit">Edit</a>
      <a @click=${(event) =>
        onDelete(
          event,
          info.objectId
        )} href="javascript:void(0)" class="button" id="delete">Delete</a>
    </div>
  </div>

  
    <span class="levels"> Created at:${info.createdAt}</span>
    <span class="levels">Owner: ${info.ownerUsername}</span>
    <span class="levels">Type: ${info.offerType}</span>
   

  
    <p class="offer-price" >Price: ${info.price} &euro;</p>
   

  
      

    </div>

    <p class="text">${info.description}</p>


    <div class="details-comments">
      <h2>Comments:</h2>
${comments.length > 0 ? comentsTemplate(comments) : noCommentsTemplate()}


  <article class=${
    "create-comment" + (owner == true || owner == null ? " hidden" : "")
  }>
                <label>Add new comment:</label>
                <form @submit=${(event) =>
                  addComment(event, info.objectId)} class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>
            </div>
</section>
<div class="push"></div>`;
const comentsTemplate = (comments) => html` <ul>
  <!-- list all comments for current offer (If any) -->
  ${comments.map(
    (comment) => html`<li class="comment">
      <div class="comment-username">${comment.ownerUsername}</div>
      <div class="comment-date">${comment.createdAt[0]} ${ comment.createdAt[1]}</div>
      <p class="comment-content">${comment.content}</p>
    </li>`
  )}
</ul>`;
const noCommentsTemplate = () => html`  <p class="no-comment">No comments.</p>
</div>`;
export async function detailsPage(ctx) {
  update();
  async function update() {
    let id = ctx.params.id;
   
  
    const info = await getOfferDetails(id);
    const commentsData = await getCommentsByOfferId(id);
    let comments = commentsData.results;
    comments.map(
      (comment) => (comment.createdAt = comment.createdAt.split("T"))
    );
    comments.map((comment) => comment.createdAt[1]=comment.createdAt[1].slice(0,8));



    let ownerInfo = info.ownerId;
    const offerOwner = ownerInfo.objectId;
    const userData = getUserData();
    let owner = false;

    if (userData) {
      //lognat
      const currentUser = getUserId();
  
      if (offerOwner == currentUser) {
        // Offer owner Match
        owner = true;
     
        return ctx.render(
          detailsTemplate(info, owner, onEdit, onDelete, null, comments, null)
        );
      } else {
        // No Offer owner match
     

        return ctx.render(
          detailsTemplate(info, owner, onEdit, onDelete, addComment, comments)
        );
      }
    } else {
      //guest
  

      return ctx.render(
        detailsTemplate(info, null, onEdit, onDelete, null, comments, null)
      );
    }
  }

  function onEdit(ev, id) {
    ev.preventDefault();
    ctx.page.redirect(`/edit/${id}`);
  }

  async function onDelete(ev, id) {
    ev.preventDefault();
   
    


    if (confirm('Are you sure?')) {
      notify('Offer deleted!')
      await deleteOffer(id); 
      ctx.page.redirect('/')
    } else {
      return;
    }
    
  }

  async function addComment(ev, id) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    let content = form.get("comment").trim();

    try {
      if (content == "") {
        throw new Error("You can not leave empty comment!");
      }
    
  
      let ownerUsername = getUserName();
      await createComment(id, { content }, ownerUsername);
      ev.target.reset();
      ctx.page.redirect(`/details/${id}`);
      update();
    } catch (err) {
 
      notify(err.message)

    }
  }
}

