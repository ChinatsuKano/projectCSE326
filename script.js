const BASE_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_YGTK7wnFWNomH8SnVmYjk8pcGGzX74Q8Iy8gfFop";
const dropdowns = document.querySelectorAll(".dropdown");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("#from-currency");
const toCurr = document.querySelector("#to-currency");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector(".amount");
const fromFlag = document.querySelector("#from-flag");
const toFlag = document.querySelector("#to-flag");

// Currency to Country mapping for flags
const countryData = {
    USD: "US", INR: "IN", EUR: "EU", JPY: "JP", GBP: "GB", 
    CAD: "CA", AUD: "AU", CHF: "CH", CNY: "CN", NZD: "NZ",
    MXN: "MX", ZAR: "ZA", SEK: "SE", NOK: "NO", SGD: "SG",
    HKD: "HK", KRW: "KR", BRL: "BR", RUB: "RU", TRY: "TR",
    SAR: "SA", AED: "AE", PHP: "PH", PLN: "PL", THB: "TH",
    MYR: "MY", IDR: "ID", DKK: "DK", CZK: "CZ", HUF: "HU",
    ILS: "IL", CLP: "CL", PKR: "PK", EGP: "EG", VND: "VN"
};

// Populate dropdowns with currency options
for (let select of dropdowns) {
    for (let currCode in countryData) {
        const option = document.createElement("option");
        option.value = currCode;
        option.innerText = currCode;
        if (select === fromCurr && currCode === "USD") option.selected = true;
        if (select === toCurr && currCode === "INR") option.selected = true;
        select.append(option);
    }
}

// Function to update flags based on selected currency
const updateFlags = () => {
    const fromCountryCode = countryData[fromCurr.value];
    const toCountryCode = countryData[toCurr.value];

    fromFlag.src = `https://flagsapi.com/${fromCountryCode}/flat/64.png`;
    toFlag.src = `https://flagsapi.com/${toCountryCode}/flat/64.png`;
};

// Fetch exchange rates and calculate the converted amount
const updateExchangeRate = async () => {
    const amtVal = amountInput.value || 1;

    try {
        const response = await fetch(`${BASE_URL}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`);
        const data = await response.json();
        const rate = data.data[toCurr.value];
        const finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        msg.innerText = "Error fetching exchange rate. Please try again.";
    }
    updateFlags();
};

// Event listener for the convert button
btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();
});

// Update flags on dropdown change
fromCurr.addEventListener("change", updateFlags);
toCurr.addEventListener("change", updateFlags);

// Initial load conversion and flag update
window.addEventListener("load", () => {
    updateExchangeRate();
    updateFlags();
});
