// Set a timer, create promises for certain times, you can also pause the timer to pause the callbacks, and resume them when you like.
class Timer {
  constructor(startNow){
    this.bindMethods(this);
    this.reset(startNow);
  }
  reset(startNow=true){
    this.stopWaiting();
    this.elapsed = 0;
    this.waitingFor = [];
    if (startNow === true) {
      this.start();
    } else {
      this.startTime = null;
    }
    return this;
  }
  stopWaiting(){
    if (typeof this.waitingFor === 'object') {
      this.waitingFor.forEach(wait=>{
        if (wait.timeoutID){
          clearTimeout(wait.timeoutID);
          delete wait.timeoutID;
        }
      });
    }
  }
  startWaiting(){
    if (typeof this.watingFor === 'object') {
      var currentTime = this.checkExact();
      var currentMilliseconds = currentTime/1000000;
      this.waitingFor.forEach(wait=>{
        if (!wait.timeoutID) {
          wait.timeoutID = setTimeout(wait.resolve,wait.milliseconds - currentMilliseconds);
        };
      });
    }
  }
  start(){
    this.startTime = process.hrtime();
    this.startWaiting();
    return this;
  }
  pause(){
    var check = this.startTime !== null ? process.hrtime(this.startTime) : [0,0];
    this.elapsed += check[0] * 1000000000 + check[1];
    this.startTime = null;
    this.stopWaiting();
    return this;
  }
  resume(){
    this.startTime = process.hrtime();
    this.startWaiting();
    return this;
  }
  check(){
    return this.checkExact() / 1000000;
  }
  checkExact(){
    var check = this.startTime !== null ? process.hrtime(this.startTime) : [0,0];
    return this.elapsed + check[0] * 1000000000 + check[1];
  }
  waitFor(milliseconds){
    var resolve,reject = null;
    var finished = new Promise((resolvePromise,rejectPromise)=>{
      resolve = resolvePromise;
      reject = rejectPromise;
    });
    var currentTime = this.checkExact();
    var currentMilliseconds = currentTime / 1000000;
    var wait = null;
    if (currentMilliseconds > milliseconds) {
      resolve(currentTime,milliseconds);
      return finished;
    } else if (this.start) {
      let timeoutID = setTimeout(resolve,milliseconds - currentMilliseconds);
      wait = {milliseconds,resolve,reject,timeoutID};
      this.waitingFor.push(wait);
    } else {
      wait = {milliseconds,resolve,reject};
      this.waitingFor.push(wait);
    }
    finished.then(()=>{
      let index = this.waitingFor.indexOf(wait);
      if (index > -1) {
        this.waitingFor.splice(index,1);
      }
    });
    return finished;
  }
  bindMethods(self){
    self.checkExact = this.checkExact.bind(self);
    self.start = this.start.bind(self);
    self.check = this.check.bind(self);
    self.pause = this.pause.bind(self);
    self.resume = this.resume.bind(self);
    self.reset = this.reset.bind(self);
    self.stopWaiting = this.stopWaiting.bind(self);
    self.startWaiting = this.startWaiting.bind(self);
  }
}
module.exports = Timer;
