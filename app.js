// Select the 'from' and 'to' select elements
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");

// Select the icon element
let icon = document.querySelector(".icon");

// Select the exchange rate element
let exchangeTxt = document.querySelector(".exchange_rate");

// Select the button element
let getBtn = document.querySelector("button");

// Populate the select elements with currencies
for (let currency_code in country_list) {
    let optionTag = `<option value="${currency_code}">${currency_code}</option>`;
    fromCurrency.insertAdjacentHTML("beforeend", optionTag);
    toCurrency.insertAdjacentHTML("beforeend", optionTag);
}

// Set default values for 'from' and 'to' currencies
fromCurrency.value = "USD";
toCurrency.value = "INR";

// Function to load flag based on selected currency
function loadFlag(element) {
    for (let code in country_list) {
        if (code == element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

// Add event listeners to 'from' and 'to' select elements
fromCurrency.addEventListener("change", (e) => {
    loadFlag(e.target);
});
toCurrency.addEventListener("change", (e) => {
    loadFlag(e.target);
});

// Event listener for the button click
getBtn.addEventListener("click", e => {
    e.preventDefault();
    getExchangeValue();
});

// Function to get exchange value
function getExchangeValue() {
    const amount = document.querySelector("form input");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }

    exchangeTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/83a69505a192bdc834281d81/latest/${fromCurrency.value}`;
    fetch(url)
       .then(response => response.json())
       .then(result => {
            if (result.result === 'success') {
                let exchangeRate = result.conversion_rates[toCurrency.value];
                let total = (amountVal * exchangeRate).toFixed(2);
                exchangeTxt.innerText = `${amountVal} ${fromCurrency.value} = ${total} ${toCurrency.value}`;
            } else {
                exchangeTxt.innerText = "Error: Unable to fetch exchange rates";
            }
        })
       .catch(error => {
            console.error('Error fetching exchange rates:', error);
            exchangeTxt.innerText = "Error: Something went wrong";
        });
}

// Event listener for window load
window.addEventListener("load", () => {
    getExchangeValue();
});

// Event listener for icon click
icon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeValue();
});