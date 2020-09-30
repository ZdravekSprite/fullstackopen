import React from 'react'
import Wether from './Wether'

const Countrie = ({ countrie }) => {
//console.log(countrie)
  return (
    <div>
      <h1>{countrie.name}</h1>
      <div>capital {countrie.capital}</div>
      <div>population {countrie.population}</div>
      <h2>languages</h2>
      <ul>
        {countrie.languages.map((lang, i) => <li key={i}>{lang.name}</li>)}
      </ul>
      <img src={countrie.flag} alt={countrie.name} height="100"/>
      <Wether capital={countrie.capital} />
    </div>
  )
}

export default Countrie