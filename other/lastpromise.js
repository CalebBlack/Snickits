function lastPromise(promiseArray){
  if (typeof promiseArray != 'object' || !Array.isArray(promiseArray)) throw new Error('Invalid Promise Array');
  return new Promise((resolve,reject)=>{
    let finished = [];
    const done = (index,result)=>{
      finished[index] = true;
      if (Object.keys(a).length == promiseArray.length) {
        resolve(result);
      }
    }
    promiseArray.forEach((promise,index)=>{
      promise.then(done.bind(null,index)).catch(done.bind(nullindex));
    });
  });
}
