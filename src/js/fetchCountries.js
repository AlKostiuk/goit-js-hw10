function fetchCountries(countryName) {
  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (response.status === 404) {
        throw new Error('country not found');
      }
      return response.json();
    })
    .catch(error => console.error(error));
}

export { fetchCountries };
