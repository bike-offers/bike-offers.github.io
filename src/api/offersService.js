import { addOwner, endpoints } from "./data.js";
import * as api from './auth.js'
export async function updateOffer(id, data) {
    return api.put(endpoints.update(id), data);
  }
  export async function deleteOffer(id) {
    return api.del(endpoints.delete(id));
  }
  export async function getMyProfile(userId) {
    return api.get(endpoints.profile(userId));
  }
  export async function getOfferFullDetails(id) {
    return api.get(endpoints.offerById(id));
  }
  export async function getOfferDetails(id) {
    return api.get(endpoints.offerDetails(id));
  }
  export async function getAllOffers() {
    return api.get(endpoints.all);
  }

  
  export async function createOffer(offer) {
  
  console.log(offer);
  
    addOwner(offer);
    console.log(offer);
    return api.post(endpoints.create, offer);
  }
