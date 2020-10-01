import React from 'react'

const Filter = ({ showFilter, handleFilterChange }) => {

  return (
    <div>
      find countries
      <input value={showFilter} onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter