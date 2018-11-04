import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Coffeeinput = props => {
  return (
    <div>
      <input
        type='text'
        onChange={props.onChangeCoffeeInput}
        value={props.value}
      />
      <input
        type='button'
        onClick={props.onDeleteCoffeeInput}
        value='Supprimer'
      />
    </div>
  )
}

class CatCoffee extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputCat: '',
      inputCoffee: [''],
      catcoffee: [{ categorie: '', coffee: [''] }]
    }
  }

  onValidCatCoffee = () => {
    this.setState(prevState => {
      const copieCatCoffee = [
        ...prevState.catcoffee,
        { categorie: prevState.inputCat, coffee: prevState.inputCoffee }
      ]
      axios
        .post(
          'http://localhost:8080/coffeeRegistration/',
          JSON.stringify({ copieCatCoffee })
        )
        .then(res => {
          console.log(res)
          console.log(res.data)
        })
      return { CatCoffee: copieCatCoffee }
    })
  }

  onChange = event => {
    const value = event.target.value
    this.setState(() => {
      return { inputCat: value }
    })
  }

  onAddCoffee = () => {
    this.setState(prevState => {
      return { inputCoffee: [...prevState.inputCoffee, ''] }
    })
  }

  onDeleteCoffeeInput = index => {
    const copieTab = [...this.state.inputCoffee]
    copieTab.splice(index, 1)
    this.setState({
      inputCoffee: copieTab
    })
  }

  onChangeCoffeeInput = (event, index) => {
    const value = event.target.value
    const copieTab = [...this.state.inputCoffee]
    copieTab[index] = value
    this.setState({ inputCoffee: copieTab })
  }

  render () {
    return (
      <div>
        <div>
          <input
            type='text'
            onChange={this.onChange}
            value={this.state.inputCat}
          />
          <input
            type='button'
            onClick={this.onAddCoffee}
            value='Ajouter Café'
          />
          <input
            type='button'
            onClick={this.onValidCatCoffee}
            value='Valider Saisie'
          />
        </div>
        <div>
          {this.state.inputCoffee.map((e, i) => {
            return (
              <Coffeeinput
                onChangeCoffeeInput={event => {
                  this.onChangeCoffeeInput(event, i)
                }}
                onDeleteCoffeeInput={() => {
                  this.onDeleteCoffeeInput(i)
                }}
                value={e}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default CatCoffee
