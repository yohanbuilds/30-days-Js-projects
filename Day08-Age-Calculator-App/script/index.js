const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const dayError = document.getElementById("day-error");
const yearError = document.getElementById("year-error");
const monthError = document.getElementById("month-error");
const calculateBtn = document.getElementById("calculate-btn");

const dayLabel = document.getElementById("day-label");
const monthLabel = document.getElementById("month-label");
const yearLabel = document.getElementById("year-label");



function validateInput(input , errorEl, errorLabel){
  if(!input.value.trim()){
    errorLabel.classList.add("error");
    errorEl.textContent = "this field is required";
    input.classList.add("error-input");

    return false;
  }
  else{
    errorLabel.classList.remove("error");
    errorEl.textContent = "";
    input.classList.remove("error-input");

    return true;
  }
}

function isValidDate(year , month , day) {
  const date = new Date(year.value, month.value - 1, day.value);

  return (
    date.getFullYear() == year.value &&
    date.getMonth() == month.value - 1 &&
    date.getDate() == day.value
  );
}

function validDate(year, month, day){
  let hasError = false;

  yearError.textContent = "";
  monthError.textContent = "";
  dayError.textContent = "";

  if(year.value >= new Date().getFullYear()){
    yearError.textContent = "Must be in the past";
    year.classList.add("error-input");
    yearLabel.classList.add("error");
    hasError = true;
  }

  if(month.value > 12){
    monthError.textContent = "Must be a valid month";
    month.classList.add("error-input");
    monthLabel.classList.add("error");
    hasError = true;
  }

  if(day.value > 31){
    dayError.textContent = "Must be a valid day";
    day.classList.add("error-input");
    dayLabel.classList.add("error");
    hasError = true;
  }

  if(!hasError && !isValidDate(year, month, day)){
    dayError.textContent = "Must be a valid date";

    day.classList.add("error-input");
    dayLabel.classList.add("error");

    month.classList.add("error-input");
    monthLabel.classList.add("error");

    year.classList.add("error-input");
    yearLabel.classList.add("error");

    hasError = true;
  }

  return hasError;
}

function calculateAge(year, month, day) {
  const currentYear = new Date();
  const birthDate = new Date(year.value, month.value, day.value);

  let years = currentYear.getFullYear() - birthDate.getFullYear();
  let months = currentYear.getMonth() - birthDate.getMonth();
  let days = currentYear.getDate() - birthDate.getDate();

  if(days < 0){
    const lastMonth = new Date(currentYear.getFullYear(), currentYear.getMonth(), 0);
    days += lastMonth.getDate();
    month--;
  }
  if(months < 0){
    months += 12;
    year--;
  }

  document.getElementById('years-result').textContent = years;
  document.getElementById('months-result').textContent = months;
  document.getElementById('days-result').textContent = days;

}

calculateBtn.addEventListener('click', () => {
  let isValid = true;

  if(!validateInput(year, yearError, yearLabel)) isValid = false;
  if(!validateInput(month, monthError, monthLabel)) isValid = false;
  if(!validateInput(day , dayError, dayLabel)) isValid = false;

  if (isValid) {
    if (validDate(year, month, day)) {
      isValid = false;
    }
  }

  if(isValid){
    calculateAge(year, month, day);
  }
});