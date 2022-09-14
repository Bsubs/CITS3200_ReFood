
window.onload=function clearAll() {
  
  let input1=document.getElementById("input1").innerHTML;
  let input2=document.getElementById("input2").innerHTML;

  if (input1 != '' && input2 != ''){
      input1='';
      input2='';
  } else if (input1 != '' && input2 == '') {
    input1='';
  } else if (input1 == '' && input2 != ''){
    input2='';
  }

  
  
  
}

export default clearAll;