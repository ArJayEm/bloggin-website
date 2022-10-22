import React from 'react'
import UserDashboard from '../pages/UserDashboard'

const Dashboard = ({isLoggedIn}) => {
  return (
    <UserDashboard isLoggedIn={isLoggedIn} />
  )
}

export default Dashboard