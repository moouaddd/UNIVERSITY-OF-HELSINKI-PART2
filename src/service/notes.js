import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => response.data)
}


export default getAll;