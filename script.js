const mortgageAmount = document.getElementById("amount");
const termYears = document.getElementById("term");
const interestRate = document.getElementById("rate");
const mortgageType = document.querySelectorAll("input[name='mortgage__type']");
const errorMsg = document.querySelectorAll(".error");
const form = document.getElementById("form");

const setError = (input) => {
    errorMsg.forEach((error) => {
        error.textContent = "This field is required";
        error.style.color = "var(--red)";
    });

    input.parentElement.classList.add("invalid");
    input.parentElement.classList.remove("valid");
    input.parentElement.style.borderColor = "var(--red)";
};

const setSuccess = (input) => {
    errorMsg.forEach((error) => {
        error.textContent = "";
        error.style.color = "";
    });
    input.parentElement.classList.add("valid");
    input.parentElement.classList.remove("invalid");
    input.parentElement.style.borderColor = "";
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
