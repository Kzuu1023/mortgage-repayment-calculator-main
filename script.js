const mortgageAmount = document.querySelector(".amount");
const termYears = document.querySelector(".term");
const interestRate = document.querySelector(".rate");
const mortgageType = document.querySelectorAll("input[name='mortgage__type']");
const form = document.getElementById("form");

const setError = (input) => {
    const errorMsg = input.parentElement.querySelector(".error");

    if (errorMsg) {
        errorMsg.textContent = "This field is required";
        errorMsg.parentElement.style.color = "var(--red)";
    }

    input.parentElement.classList.add("invalid");
    input.parentElement.classList.remove("valid");
    input.style.borderColor = "var(--red)";
};

const setSuccess = (input) => {
    input.parentElement.classList.add("valid");
    input.parentElement.classList.remove("invalid");
};

const isValidMortgageType = () => {
    for (const mortgageTypes of mortgageType) {
        if (mortgageTypes.checked) {
            mortgageTypes.parentElement.style.borderColor = "var(--lime)";
            mortgageTypes.parentElement.style.backgroundColor = "var(--lime)";
        } else {
            mortgageType.parentElement.style.borderColor = "";
        }
    }
};

form.addEventListener("click", function (e) {
    e.preventDefault();
    let isValid = true;

    if (mortgageAmount.value) {
        setSuccess(mortgageAmount);
        isValid = true;
    } else {
        setError(mortgageAmount);
        isValid = false;
    }

    if (termYears.value) {
        setSuccess(termYears);
        isValid = true;
    } else {
        setError(termYears);
        isValid = false;
    }

    if (interestRate.value) {
        setSuccess(interestRate);
        isValid = true;
    } else {
        setError(interestRate);
        isValid = false;
    }
});
