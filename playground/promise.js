var simplePromise = new Promise((resolve, reject)=>{
  setTimeout(resolve('resolved.'),2000);
  setTimeout(reject('rejected.'),2000);
});

simplePromise.then((successMessage)=>{
  console.log('Promise is',successMessage);
},(errorMessage)=>{
  console.log('Promise is',errorMessage);
});



var addPromiseFactory = (a,b) => {
  return new Promise((resolve, reject) => {
    if(typeof a === 'number' && typeof b === 'number'){
      resolve(a+b);
    }else{
      reject('Not a number argument type found.');
    }
  });
};
/**
*the argument can also be some variable from another promise or function call
*chained promise calls
*hence we replace the duplicate error handlers with single catch call in the end.
*error handler of one leads to calling of success of the other as it thinks error handling has settled everything
*/
addPromiseFactory(10,3)
  .then((successMessage)=>{
    console.log('resolved : ',successMessage);
    return new addPromiseFactory(successMessage,12);
  }
  //error handler commented out to be handled by a single catch at the end
  // ,(errorMessage)=>{
  //   console.log('rejected : ',errorMessage)
  // }
  )
  //then handler for the returned new promise
  .then((successMessage)=>{
    console.log('resolved again : ',successMessage);
  }//no error handler duplicacy again
  )
  //catch handler to replace all the chained error handlers
  .catch((errorMessage)=>{
    console.log(errorMessage);
  });
