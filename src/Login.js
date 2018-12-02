import React from 'react'
import ReactDOM from 'react-dom'
import AuthForm from './AuthForm'
import Home from './Home'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

class Login extends React.Component {
  state = {
    loggedOk: false
  }

  changeLogged = () => {
    this.setState({ loggedOk: true })
  }

  render () {
    if (this.state.loggedOk) {
      return <Route render={() => <Redirect to='/home' />} />
    }

    return <AuthForm changeLogged={this.changeLogged} />
  }
}

export default Login
