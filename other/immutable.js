// Simply converts object into an immutable
function immutable(object={}){
  if (typeof object !== 'object') throw new Error('Cannot Create Immutable, Input not Object!');
  return new Proxy(object,{get:(target,name)=>{return object[name]},set:()=>{}});
}
