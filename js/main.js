

let elCountryForm = document.querySelector('.country-form'),
search = document.querySelector('.country-input');

const COUNTRY_SEARCH = 'https://restcountries.com/v3.1/name/';
const COUNTRIES_SEARCH = 'https://restcountries.com/v3.1/all';
const  REGION_SEARCH = 'https://restcountries.com/v3.1/region/africa';

let elLoder = document.querySelector('.loader')
console.log(elLoder);





const URL = "https://restcountries.com/v3.1";

async function fetchData(url) {
    elLoder.style.display = 'flex';
    const res = await fetch(`${URL}/${url}`);
    const data = await res.json();
    elLoder.style.display = 'none';
    return data;
}


let elAboutResults = document.querySelector('.about-country')
let elCountrySection = document.querySelector('.countries-section')
let elSearchCountry = document.querySelector('.search-country')


let elAboutCardTemplate = document.querySelector('.about-card-template').content;
let aboutCardFragment = new DocumentFragment();

// COUNTRY RESUTS

let elCountryResults = document.querySelector('.countries-results');
let countryFragment = new DocumentFragment();

elCountryResults.addEventListener('click', (evt) => {

     fetch('https://restcountries.com/v3.1/all')
     .then((res) => res.json())
     .then((data) => {
    
        let filtera = data.filter((el) => el.name.common === evt.target.textContent)
        if(filtera.length !== 0){
            elCountrySection.style.display = 'none';
             elSearchCountry.style.display = 'none';

             let currency = filtera.currencies ? Object.values(filtera.currencies)[0] : 'USD, EURO';
             console.log(currency);
             let language = filtera.languages ? Object.values(filtera.languages)[0] : "no language";

             console.log(filtera);
             filtera.forEach((el) => {
                console.log(el);
                  let cloneAboutC = elAboutCardTemplate.cloneNode(true);

                  cloneAboutC.querySelector('.about-cy-image').src = el.flags.png;
                  cloneAboutC.querySelector('.about-cy-name').textContent = el.name.common;
                  cloneAboutC.querySelector('.about-cy-nativeName').textContent = el.name.official;
                  cloneAboutC.querySelector('.about-cy-population').textContent = el.population;
                  cloneAboutC.querySelector('.about-cy-region').textContent = el.region;
                  cloneAboutC.querySelector('.about-cy-subRegion').textContent = el.subregion || 'no Subregion';
                  cloneAboutC.querySelector('.about-cy-capital').textContent = el.capital;
                  cloneAboutC.querySelector('.about-cy-domain').textContent = `${el.tld[0]}`;
                  cloneAboutC.querySelector('.about-cy-currencies').textContent = currency ;
                  cloneAboutC.querySelector('.about-cy-language').textContent = 'English, United States, Canada';

                   aboutCardFragment.appendChild(cloneAboutC);
             })

             elAboutResults.appendChild(aboutCardFragment);
        }
     })

})


// COUNTRY CARD

let elCardsTemplate = document.querySelector('.cards-template').content;
let cardFragment = new DocumentFragment();

function countryCard(country){
    
    
    country.forEach((el) => {
        
        let cloneCards = elCardsTemplate.cloneNode(true);
        
        cloneCards.querySelector('.country-img').src = el.flags.png;
        cloneCards.querySelector('.country-title').textContent = el.name.common;
        cloneCards.querySelector('.country-population').textContent = el.population;
        cloneCards.querySelector('.country-region').textContent = el.region;
        cloneCards.querySelector('.country-capital').textContent = el.capital;
        
        cardFragment.appendChild(cloneCards)
    })
    
    elCountryResults.appendChild(cardFragment)
}


// RENDER COUNTRIES

async function renderCountries(){
    const data = await fetchData("all");

    let sortData = data.sort((a,b) => a.name.common - b.name.common);

    console.log(sortData);
    
    countryCard(data)

}

renderCountries();

// RENDER NAMES

let elSelect = document.querySelector('.select')

async function renderNames(){
    const data = await fetchData('all');
    const regions = [];
    data.forEach((el) => {
        if(!regions.includes(el.region)){
            regions.push(el.region)
        }
    })
    
    regions.forEach((el) => {
        elSelect.innerHTML += `
        <option value="${el}">${el}</option>
        `
    })
}

renderNames();

// SELECT ONCHANGE 

elSelect.onchange = async () => {
    if (elSelect.value == "Filter by Region") {
        renderCountries();
    } else {
        const data = await fetchData(`/region/${elSelect.value}`);
        elCountryResults.innerHTML = "";
        countryCard(data)
    }
};


search.addEventListener('input', (evt) => {
    
    let SEARCH_QUERY = new RegExp(evt.target.value, 'gi');
    
    let searchFunc = async() => {
        if(evt.target.value == ''){
            elCountryResults.innerHTML = '';
            const data = await fetchData(`/all`)
            countryCard(data)
        }else{
            const data = await fetchData(`/name/${evt.target.value}`);
            let searchR = data.filter((a) =>  a.name.common.match(SEARCH_QUERY))
            elCountryResults.innerHTML = null;
            countryCard(searchR)
        }
    }
    searchFunc()
})




