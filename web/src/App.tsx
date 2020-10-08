import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Spinner } from 'react-bootstrap'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import About from './components/About'
import { Footer } from './components/Footer'

import GuestPage from './components/GuestPage'
import LoginPage from './components/LoginPage'
import Navigation from './components/Navigation'
import Terms from './components/Terms'

function App() {
  const { data, loading } = useQuery(gql`
    {
      hello
    }
  `)
  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }
  console.log(JSON.stringify(data))
  return (
    <BrowserRouter>
      <Navigation />

      <Switch>
        <Route path="/" exact>
          <GuestPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/terms">
          <Terms />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
