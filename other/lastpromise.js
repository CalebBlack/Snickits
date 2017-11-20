function lastPromise(...promiseArray){
  return new Promise((resolve,reject)=>{
    let finished = [];
    const done = (index,result)=>{
      finished[index] = true;
      if (Object.keys(finished).length == promiseArray.length) {
        resolve(result);
      }
    }
    promiseArray.forEach((promise,index)=>{
      if (!promise instanceof Promise) throw new Error("Input Not Promise!");
      promise.then(done.bind(null,index)).catch(done.bind(null,index));
    });
  });
}
