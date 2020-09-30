import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ showFilter, setShowFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  //console.log('countries', countries)

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setShowFilter(event.target.value)
  }

  return (
    <div>
      <Filter
        showFilter={showFilter}
        handleFilterChange={handleFilterChange.bind(this)}
      />
      <Countries
        countries={countries}
        showFilter={showFilter}
        setShowFilter={setShowFilter.bind(this)}
       />
    </div>
  )
}

export default App