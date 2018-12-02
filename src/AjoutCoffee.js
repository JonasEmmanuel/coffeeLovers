import React from 'react'
import ReactDOM from 'react-dom'
import AddCoffeeForm from './AddCoffeeForm'

const List = props => {
  return (
    <div>
      <ul>
        <li> {props.name}/{props.categorie} / {props.prix}</li>
      </ul>

    </div>
  )
}

class AjoutCoffee extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [
        { name: 'Colombia', categorie: 'Master Origine', prix: 0.46 },
        { name: 'Colombia', categorie: 'Master Origine', prix: 0.47 }
      ]
    }
  }

  addCoffee = props => {
    const { categorie, name, prix } = props
    this.setState(prevState => {
      return {
        items: [
          ...prevState.items,
          {
            name: name,
            categorie: categorie,
            prix: prix
          }
        ]
      }
    })
  }

  render () {
    return (
      <div>
        <div>

          {this.state.items.map((element, index) => (
            <List
              key={index}
              name={element.name}
              categorie={element.categorie}
              prix={element.prix}
            />
          ))}

        </div>
        <div><AddCoffeeForm AddCoffee={this.addCoffee} /></div>
      </div>
    )
  }
}

export default AjoutCoffee
