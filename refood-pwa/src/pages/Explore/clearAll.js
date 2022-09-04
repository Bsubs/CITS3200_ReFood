let btnClear = document.getElementById("clearAll");
let inputs = document.querySelectorAll("input");

btnClear.addEventListener("click", () => {
  inputs.forEach((input) => (input.value = "!!!"));
});
