import React, { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { setAccessToken } from './accessToken'
import About from './components/About'
import { Footer } from './components/Footer'

import GuestPage from './components/GuestPage'
import LoginPage from './components/LoginPage'
import Navigation from './components/Navigation'
import Terms from './components/Terms'
import LoggedIn from './pages/LoggedIn'
import './style/loading.css'
function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json()
      setAccessToken(accessToken)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <Container className={'spinner'} fluid>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    )
  }

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
        <Route path="/user">
          <LoggedIn />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
