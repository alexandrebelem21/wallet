async function getAPI() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => json);
}

export default getAPI;
