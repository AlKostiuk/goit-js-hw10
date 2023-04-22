import './css/styles.css';
import {fetchCountries} from './js/fetchCountries'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputCountryName = document.querySelector("#search-box");
const countryInfo = document.querySelector('.country-info')
const countryList = document.querySelector('.country-list')

inputCountryName.addEventListener('input', debounce(handleInputSearch , DEBOUNCE_DELAY))


function countryMarkup(elements){
  const resultMarkup = elements
  .map((element) => {
    return `<li class = country_search>
        <img class = country_flag src= "${element.flags.svg}"/>
        <h2 class = country_name >${element.name.official} </h2>
    </li>`;
  })
  .join("");
  return resultMarkup;
}

function countryElementInfo(elements){
  const resultElementInfo = elements
  .map((element) => {
    return `<div class = country_info_flex>
    <img class = one_country_flag src= "${element.flags.svg}"/>
        <h1 class = one_country_name >${element.name.official} </h2>

        </div>
        <p class = country_capital ><strong> Capital:</strong> ${element.capital} </p>
        <p class = country_population > <strong> Population:</strong>${element.population} </p>
        <p class = country_language ><strong> Languages:</strong> ${Object.values(element.languages).join(",")} </p>`

  })
  .join("");
  return resultElementInfo
}




function handleInputSearch(){
  let curentCountry = inputCountryName.value.trim();
  if(curentCountry === ""){
    return
  }
  fetchCountries(curentCountry)
  .then(countries => {
    countryInfo.innerHTML = ""
    countryList.innerHTML = ""
    if(countries.length > 10){
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    }else if(countries.length ===1){
      const markupCountryElement =countryElementInfo(countries)
      countryInfo.insertAdjacentHTML('beforeend', markupCountryElement)
    }else {
      const listMarkup = countryMarkup(countries)
      countryList.insertAdjacentHTML('beforeend', listMarkup)
    }
  }).catch(()=>{
    Notiflix.Notify.failure("Oops, there is no country with that name")
  })

}

