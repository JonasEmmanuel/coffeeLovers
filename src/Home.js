import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from './NavBar'

class Home extends React.Component {
  state = {}
  render () {
    return (
      <div>
        <NavBar />
        <div>home</div>
      </div>
    )
  }
}
export default Home
