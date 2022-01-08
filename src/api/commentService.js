import * as api from './auth.js'
import { endpoints} from './data.js'
import { notify } from './notify.js'
let commentEndpoints ={
  commentsByOfferGuest:(offerId)=>`/classes/Comment?where=${createPointerQuery('offer','Offers',offerId)}`,
  commentsByOffer:(offerId)=>`/classes/Comment?where=${createPointerQuery('offer','Offers',offerId)}&include=owner`

}

export function getCommentsByOfferId(offerId){
  let userData = api.getUserData()
  if(userData){
    return api.get(commentEndpoints.commentsByOffer(offerId))

  }
  else{
    return api.get(commentEndpoints.commentsByOfferGuest(offerId))

  }
}
export function createComment(offerId,comment,ownerUsername){
    comment.offer = createPointer('Offers',offerId)
    addOwner(comment,ownerUsername)
  
    notify('New comment has been created','newComment')
    return api.post(endpoints.comments,comment)
}
 function createPointerQuery(propName,className,objectId){
  return createRelationalQuery({[propName]:createPointer(className,objectId)});
  }
 function createRelationalQuery(query){
  return encodeURIComponent(JSON.stringify(query))
}
function createPointer(className, objectId) {
    return {
      __type: "Pointer",
      className,
      objectId,
    };
  }
 function addOwner(record,ownerUsername) {
    const id = api.getUserId();
  
    record.owner = createPointer("_User", id); 
    record.ownerUsername =ownerUsername
    
    return record; 
  }