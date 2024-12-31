const mortgageAmount = document.getElementById("amount");
const termYears = document.getElementById("term");
const interestRate = document.getElementById("rate");
const mortgageType = document.querySelectorAll("input[name='mortgage__type']");
const amountError = document.querySelector(".currency__symbol");
const yearsError = document.querySelector(".years-container");
const rateError = document.querySelector(".rate__symbol");
const clear = document.getElementById("clear");
const form = document.getElementById("form");
let isValid = true;

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

const isValidMortgageType = () => {
    let isChecked = false;

    for (const type of mortgageType) {
        if (type.checked) {
            setSuccess(type.parentElement);
            type.parentElement.style.borderColor = "var(--lime)";
            type.parentElement.style.backgroundColor = "var(--lime-100)";
            isChecked = true;
        }
    }

    if (!isChecked) {
        setError(mortgageType[0].parentElement, "This field is required");
    }

    return isChecked;
};

function formattedNumber() {
    const inputText = document.querySelectorAll("input[type='text']");

    inputText.forEach((input) => {
        input.onkeyup = function () {
            // const removeChar = this.value.replace(/[^\d.]/g, ""); // Remove non-numeric characters
            // const [integerPart, decimalPart] = input.split(".");
            // this.value = removeChar;
            // let formattedNum = integerPart.replace(
            //     /\B(?=(\d{3})+(?!\d))/g,
            //     ","
            // );

            if (this.value.includes(".")) {
                const removeChar = this.value.replace(/[^\d.]/g, "");
                const [integerPart, decimalPart] = input.split(".");
                this.value = removeChar;
                let formattedNum = integerPart.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                );
                this.value = formattedNum;
                if (decimalPart) {
                    this.value = `${formattedNum}.${decimalPart.slice(0, 2)}`; // Limit decimals to 2 places
                } else {
                    this.value = formattedNum;
                }
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

function formatResult(value) {
    const [integerPart, decimalPart] = value.toFixed(2).split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedInteger}.${decimalPart}`;
}

function calculate() {
    let monthlyPayment = 0;
    let totalRepayment = 0;
    const amount = parseFloat(
        document.getElementById("amount").value.replace(/,/g, "")
    );
    const rate = parseFloat(document.getElementById("rate").value) / 100;
    const years = parseFloat(document.getElementById("term").value);

    if (isValid) {
        if (mortgageType[0].checked) {
            const monthlyRate = rate / 12;
            const n = years * 12;
            monthlyPayment =
                (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
            totalRepayment = monthlyPayment * n;
        } else if (mortgageType[1].checked) {
            monthlyPayment = (amount * rate) / 12;
            totalRepayment = monthlyPayment * years * 12;
        }

        // Format and display results
        document.getElementById("monthly-result").innerText = `£${formatResult(
            monthlyPayment
        )}`;
        document.getElementById("term-result").innerText = `£${formatResult(
            totalRepayment
        )}`;

        document.querySelector(".show-results").style.display = "flex";
        document.querySelector(".results").style.display = "none";
    }
}

function clearAll() {
    const input = document.querySelectorAll("input[type='text']");

    clear.addEventListener("click", function () {
        input.forEach((inputs) => {
            inputs.value = "";
        });

        mortgageType.forEach((options) => {
            options.checked = false;
        });

        document.querySelector(".show-results").style.display = "none";
        document.querySelector(".results").style.display = "flex";
    });
}

formattedNumber();
clearAll();

form.addEventListener("submit", function (e) {
    e.preventDefault();

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

    if (isValid) {
        calculate();
    }
});
