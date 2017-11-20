function enforcePassword(input){
  if (!input) return;
  input.addEventListener('input',()=>{
    input.value = input.value.replace(' ','');
  });
}
function enforceUsername(input){
  if (!input) return;
  input.addEventListener('input',()=>{
    input.value = input.value.replace(' ','');
  });
}
function enforceEmail(input){
  if (!input) return;
  input.addEventListener('input',()=>{
    input.value = input.value.replace(' ','');
  });
}
