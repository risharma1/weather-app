var getUser = (id, callback) => {
  var userObj = {
    id:id,
    name:'bucky'
  };
  setTimeout(()=>{callback(userObj)},2000);
};

getUser(31, (user) => {
  console.log(user);
});
