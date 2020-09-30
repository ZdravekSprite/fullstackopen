import React from 'react'

const Filter = ({ showFilter, handleFilterChange }) => {

  return (
    <div>
      filter shown with
      <input value={showFilter} onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter