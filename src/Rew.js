import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import Home from './Home'
import Login from './Login'

class Rew extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/home' component={Home} />
          <Route path='/login' component={Login} />
        </div>
      </Router>
    )
  }
}

export default Rew
