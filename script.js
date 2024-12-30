const mortgageAmount = document.getElementById("amount");
const termYears = document.getElementById("term");
const interestRate = document.getElementById("rate");
const mortgageType = document.querySelectorAll("input[name='mortgage__type']");

const amountError = document.querySelector(".currency__symbol");
const yearsError = document.querySelector(".years-container");
const rateError = document.querySelector(".rate__symbol");
const form = document.getElementById("form");

const setError = (input, message) => {
    const errorMsg = input.parentElement.nextElementSibling;

    if (!input.value) {
        errorMsg.textContent = message;
        errorMsg.style.color = "var(--red)";
        input.parentElement.classList.add("invalid");
        input.parentElement.classList.remove("valid");
        input.parentElement.style.borderColor = "var(--red)";
    }
};

const setSuccess = (input) => {
    const errorMsg = input.parentElement.nextElementSibling;

    if (input.value) {
        errorMsg.textContent = "";
        input.parentElement.classList.add("valid");
        input.parentElement.classList.remove("invalid");
        input.parentElement.style.borderColor = "";
    }
};

// const isValidMortgageType = () => {
//     let isChecked = false;
//     for (const types of mortgageType) {
//         if (types.checked) {
//             setSuccess(types.parentElement);
//             types.parentElement.style.borderColor = "var(--lime)";
//             types.parentElement.style.backgroundColor = "var(--lime-100)";
//             isChecked = true;
//         } else {
//             setError(types.parentElement, "This field is required");
//         }
//     }
//     return isChecked;
// };

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

    if (!mortgageType.checked) {
        setError(mortgageType[0].parentElement, "This field is required");
    }
    return isChecked;
};

const validateInputs = (input) => {
    if (isNaN(input.value)) {
        console.log("Please enter a valid number");
    }
};

function formattedNumber() {
    // input = input.replace(/[^\d.]/g, "");
    // if (input.includes(".")) {
    //     const [integerPart, decimalPart] = input.split(".");
    //     input =
    //         parseFloat(integerPart).toLocaleString("en") + "." + decimalPart;
    // } else {
    //     input = parseFloat(input).toLocaleString("en");
    // }
    // return input;

    const inputText = document.querySelectorAll("input[type='text']");

    inputText.forEach((input) => {
        input.onkeyup = function () {
            if (this.value.includes(".")) {
                const [integerPart, decimalPart] = input.split(".");
                const removeChar = this.value.replace(/[^\d.]/g, "");
                this.value = removeChar;

                let formattedNum = this.value.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                );
                this.value = formattedNum;
            } else {
                const removeChar = this.value.replace(/[^\d.]/g, "");
                this.value = removeChar;

                let formattedNum = this.value.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                );
                this.value = formattedNum;
            }
        };
    });
}

formattedNumber();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    if (mortgageAmount.value) {
        setSuccess(mortgageAmount);
        amountError.style.backgroundColor = "";
        amountError.firstElementChild.style.color = "";
        isValid = true;
    } else {
        setError(mortgageAmount, "This field is required");
        amountError.style.backgroundColor = "var(--red)";
        amountError.firstElementChild.style.color = "var(--white)";
        isValid = false;
    }

    if (termYears.value) {
        validateInputs(termYears);
        setSuccess(termYears);
        yearsError.style.backgroundColor = "";
        yearsError.firstElementChild.style.color = "";
        isValid = true;
    } else {
        setError(termYears, "This field is required");
        yearsError.style.backgroundColor = "var(--red)";
        yearsError.firstElementChild.style.color = "var(--white)";
        isValid = false;
    }

    if (interestRate.value) {
        setSuccess(interestRate);
        rateError.style.backgroundColor = "";
        rateError.firstElementChild.style.color = "";
        isValid = true;
    } else {
        setError(interestRate, "This field is required");
        rateError.style.backgroundColor = "var(--red)";
        rateError.firstElementChild.style.color = "var(--white)";
        isValid = false;
    }

    if (isValidMortgageType()) {
        isValid = true;
    } else {
        isValid = false;
    }
});
