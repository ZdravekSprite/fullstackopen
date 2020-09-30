import React from 'react'
import Countrie from './Countrie'

const Countries = ({ countries, showFilter, setShowFilter }) => {
  const countriesToShow = (showFilter === '')
    ? countries
    : countries.filter(countrie => countrie.name.toUpperCase().includes(showFilter.toUpperCase()))
    
  const tooMany = 'Too many matches, specify another filter'

  const oneCountrie =  (countriesToShow.length === 1)
    ? <Countrie countrie={countriesToShow[0]} />
    : 'No matches, specify another filter'
  //console.log('render', oneCountrie, countriesToShow)

  return (
    <div>
        {(countriesToShow.length > 10)
          ? tooMany
          : (countriesToShow.length < 2)
            ? oneCountrie
            : countriesToShow.map((countrie, i) =>
              <div key={i}>{countrie.name} 
                <button onClick={() => setShowFilter(countrie.name)}>
                  show
                </button>
              </div>)
        }
    </div>
  )
}

export default Countries