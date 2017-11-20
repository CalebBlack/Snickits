// Simply converts object into an immutable
function immutable(object={},clone=false){
  if (typeof object !== 'object') throw new Error('Cannot Create Immutable, Input not Object!');
  if (clone === true) object = Object.assign({},object);
  return new Proxy(object,{get:(target,name)=>{return object[name]},set:()=>{return false;},deleteProperty:()=>{return false;},defineProperty:()=>{return false;},setPrototypeOf:()=>{return false;}});
}
