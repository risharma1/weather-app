
setTimeout(()=>{
  console.log('called after 2 sec delay');
},2000);

setTimeout(()=>{
  console.log('called after 2.01 sec delay');
},2010);

setTimeout(()=>{
  console.log('called without delay');
},0);

console.log('Last statement');
