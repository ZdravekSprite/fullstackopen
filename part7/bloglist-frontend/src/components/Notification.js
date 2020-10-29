import React from 'react'
import { connect } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return <div>
    {(notification.message &&
      <Alert severity={notification.type}>
        {notification.message}
      </Alert>
    )}
  </div>
}

export default connect(
  (state) => ({ notification: state.notification })
)(Notification)