const mortgageAmount = document.getElementById("amount");
const termYears = document.getElementById("term");
const interestRate = document.getElementById("rate");
const mortgageType = document.querySelectorAll("input[name='mortgage__type']");

const form = document.getElementById("form");

const setError = (input, message) => {
    const errorMsg = input.parentElement.nextElementSibling;

    if (!input.value) {
        errorMsg.textContent = message;
        errorMsg.style.color = "var(--red)";
    }
    input.parentElement.classList.add("invalid");
    input.parentElement.classList.remove("valid");
    input.parentElement.style.borderColor = "var(--red)";
};

const setSuccess = (input) => {
    const errorMsg = input.parentElement.nextElementSibling;

    if (input.value) {
        errorMsg.textContent = "";
        errorMsg.style.color = "";
    }
    input.parentElement.classList.add("valid");
    input.parentElement.classList.remove("invalid");
    input.parentElement.style.borderColor = "";
};

const isValidMortgageType = () => {
    let isChecked = false;
    for (const types of mortgageType) {
        if (types.checked) {
            setSuccess(types.parentElement);
            types.parentElement.style.borderColor = "var(--lime)";
            types.parentElement.style.backgroundColor = "var(--lime-100)";
            isChecked = true;
        }
    }

    if (!isChecked) {
        setError(mortgageType[0].parentElement, "This field is required");
    }
};

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    if (mortgageAmount.value) {
        setSuccess(mortgageAmount);
        isValid = true;
    } else {
        setError(mortgageAmount, "This field is required");
        isValid = false;
    }

    if (termYears.value) {
        setSuccess(termYears);
        isValid = true;
    } else {
        setError(termYears, "This field is required");
        isValid = false;
    }

    if (interestRate.value) {
        setSuccess(interestRate);
        isValid = true;
    } else {
        setError(interestRate, "This field is required");
        isValid = false;
    }

    if (isValidMortgageType()) {
        isValid = true;
    } else {
        isValid = false;
    }
});
