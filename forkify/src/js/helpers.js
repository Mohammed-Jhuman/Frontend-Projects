import { TIMEOUT_SEC } from './config.js';
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJSON=async function(url){
    try{
        
        const res=await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]);
        const data=await res.json();
        
   if(!res.ok){
    throw new Error(`${data.message}(${res.status})`);
   }
   /**need to return the data because this data is resolved value of the promise..so to use it in another place need to return the data */
   return data;
  }catch(err){
     throw err;
     /**to handle the error in model.js not in the helpers.js */
  }
};
export const sendJSON=async function(url,uploadData){
    try{
        const fetchPro=fetch(url,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(uploadData)
        })
        const res=await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]);
        const data=await res.json();
        
   if(!res.ok){
    throw new Error(`${data.message}(${res.status})`);
   }
   /**need to return the data because this data is resolved value of the promise..so to use it in another place */
   return data;
  }catch(err){
     throw err;
     /**to handle the error in model.js not in the helpers.js */
  }
};