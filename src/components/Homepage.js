import React from 'react'
import UserList from './UserList'
import ListBudgetForm from './ListBudgetForm'
import Footer from './Footer'

const Homepage = () => {
  return (
    <div>
      <p>Making a tour list of your own?</p>
      <p>Add a budget. Pick a city. Add your shows!</p>
      <ListBudgetForm />
      <UserList />
      <Footer />
    </div>
  )
}

export default Homepage