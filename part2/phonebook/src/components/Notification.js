import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const classColor = (message[1]) ? 'notification' : 'error'

  return (
    <div className={classColor}>
      {message[0]}
    </div>
  )
}

export default Notification