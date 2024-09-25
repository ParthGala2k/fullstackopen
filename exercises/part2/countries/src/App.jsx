import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountry = ({ country }) => {

  const languages = Object.values(country.languages)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language, i) => <li key={i}>{language}</li>)}
      </ul>
      <img src={country.flags.svg} width='150' height='150' />
    </div>
  )
}

const DisplayList = ({ searchString, allCountries, handleCountryChange }) => {

  if (searchString === '') return 'Type in search box for countries'

  const matchingCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(searchString.toLowerCase()))

  if (matchingCountries.length > 10) return 'Too many matches'
  if (matchingCountries.length === 0) return 'No matches found'
  if (matchingCountries.length === 1) {
    return <ShowCountry country={matchingCountries[0]} />
  }

  return (
    <div>
      {matchingCountries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button value={country.name.common} onClick={handleCountryChange}>Show</button>
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [searchString, setSearchString] = useState('')
  const [allCountries, setAllCountries] = useState([])

  const handleSearchChange = (event) => setSearchString(event.target.value)

  const handleCountryChange = (event) => setSearchString(event.target.value)

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then((response) => { setAllCountries(response.data) })
  }, [])

  return (
    <div>
      <form>
        Find Countries: <input value={searchString} onChange={handleSearchChange} />
      </form>
      <DisplayList searchString={searchString} allCountries={allCountries} handleCountryChange={handleCountryChange} />
    </div>
  )
}

export default App