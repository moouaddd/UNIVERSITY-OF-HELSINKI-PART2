import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(countries);

  return (
    <div>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Countries countries={countries} searchTerm={searchTerm} setCountries={setCountries}/>
    </div>
  );
}

export default App;

