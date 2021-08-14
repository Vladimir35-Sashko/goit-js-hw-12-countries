var debounce = require('lodash.debounce');
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');
const refs = {
    input: document.getElementById("input-id"),
    countriesList: document.getElementById("countries"),
};

refs.input.addEventListener("input", debounce(fetchCountries,500));

function fetchCountries(e) {
    const searchQuery = e.target.value;
    if (searchQuery) {
        fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
            .then((response) => { return response.json(); })
            .then((countries) => {
                const countriesHtml = countries
                    .map((country) => `<h4>${country.name}</h4>`)
                    .join('');
                refs.countriesList.insertAdjacentHTML('afterbegin', countriesHtml);
                
            }).catch(console.error);
    }
}