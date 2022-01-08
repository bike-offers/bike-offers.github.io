

import { getUserId } from "./auth.js";


 export const endpoints = {
  all: "/classes/Offers",
  create: "/classes/Offers",
  offerById: (id) => `/classes/Offers/${id}?include=ownerId`,
  offerDetails: (id) => `/classes/Offers/${id}`,
  update: (id) => `/classes/Offers/${id}`, //?
  delete: (id) => `/classes/Offers/${id}`,
  profile: (user) => `/users/me`,
  commentsByOffer:(offerId)=>`/classes/Comment?where=${createPointerQuery('offer','Offers',offerId)}&include=owner`,
  comments:`/classes/Comment`,
};
export function createPointerQuery(propName,className,objectId){
return createRelationalQuery({[propName]:createPointer(className,objectId)});
}
export function createRelationalQuery(query){
  return encodeURIComponent(JSON.stringify(query))
}
export function createPointer(className, objectId) {
  return {
    __type: "Pointer",
    className,
    objectId,
  };
}
export function addOwner(record) {
  const id = getUserId();
  console.log(id);
  record.ownerId = createPointer("_User", id);  
  return record; 
}

