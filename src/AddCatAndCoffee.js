import React from 'react'
import Select from 'react-select'

const List = props => {
  return (
    <div>
      <ul>
        <li> {props.name}/{props.price}/{props.power}</li>
      </ul>

    </div>
  )
}

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' }
]

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

const CoffeeEntry = props => {
  return (
    <div>
      <input
        type='text'
        onChange={props.onChangeCoffeeInput}
        value={props.valueCoffee}
      />
      <input
        type='text'
        onChange={props.onChangePriceInput}
        value={props.valuePrice}
      />

      <Select
        options={options}
        onChange={props.onChangePowerInput}
        value={props.valuePower}
      />

      <input
        type='button'
        onClick={props.onDeleteCoffeeEntry}
        value='Supprimer'
      />
    </div>
  )
}

class CatCoffee extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      inputCoffee: [''],
      inputPrice: [''],
      inputPower: [''],
      listCoffee: [{ nameCoffee: '', priceCoffee: '', powerCoffee: '' }]
    }
  }

  onValidCatCoffeeFinal = () => {
    this.setState(prevState => {
      var copieListCoffee = [...prevState.listCoffee]
      for (var i = 0; i < prevState.inputCoffee.length; i++) {
        copieListCoffee = [
          ...copieListCoffee,
          {
            nameCoffee: prevState.inputCoffee[i],
            priceCoffee: prevState.inputPrice[i],
            powerCoffee: prevState.inputPower[i]
          }
        ]
      }
      return { listCoffee: copieListCoffee }
    })
  }

  onAddNewCoffee = () => {
    this.setState(prevState => {
      return {
        inputCoffee: [...prevState.inputCoffee, ''],
        inputPrice: [...prevState.inputPrice, ''],
        inputPower: [...prevState.inputPower, '']
      }
    })
  }

  onDeleteCoffeeEntry = index => {
    const copieTabCoffee = [...this.state.inputCoffee]
    const copieTabPrice = [...this.state.inputPrice]
    const copieTabPower = [...this.state.inputPower]
    const copieListCoffee = [...this.state.listCoffee]

    copieTabCoffee.splice(index, 1)
    copieTabPrice.splice(index, 1)
    copieTabPower.splice(index, 1)
    copieListCoffee.splice(index, 1)

    this.setState({
      inputCoffee: copieTabCoffee,
      inputPower: copieTabPower,
      inputPrice: copieTabPrice,
      listCoffee: copieListCoffee
    })
  }

  onChangeCoffeeInput = (event, index) => {
    const value = event.target.value
    this.setState(prevState => {
      const copieTab = [...prevState.inputCoffee]
      copieTab[index] = value
      return { inputCoffee: copieTab }
    })
  }

  onChangePriceInput = (event, index) => {
    const value = event.target.value
    const copieTab = [...this.state.inputPrice]
    copieTab[index] = value
    this.setState({ inputPrice: copieTab })
  }

  onChangePowerInput = (selectedOption, index) => {
    this.setState(prevState => {
      const copieTab = [...prevState.inputPower]
      copieTab[index] = selectedOption
      return { inputPower: copieTab }
    })
  }

  render () {
    return (
      <div>
        <div>
          <input
            type='button'
            onClick={this.onAddNewCoffee}
            value='Ajouter Café'
          />
          <input
            type='button'
            onClick={this.onValidCatCoffeeFinal}
            value='Valider Saisie'
          />
        </div>
        <div>
          {this.state.inputCoffee.map((e, i) => {
            return (
              <CoffeeEntry
                onChangeCoffeeInput={event => {
                  this.onChangeCoffeeInput(event, i)
                }}
                onChangePriceInput={event => {
                  this.onChangePriceInput(event, i)
                }}
                onChangePowerInput={selectedOption => {
                  this.onChangePowerInput(selectedOption, i)
                }}
                onDeleteCoffeeEntry={() => {
                  this.onDeleteCoffeeEntry(i)
                }}
                valueCoffee={e}
                valuePrice={this.state.inputPrice[i]}
                valuePower={this.state.inputPower[i]}
              />
            )
          })}
        </div>
        <div />
      </div>
    )
  }
}

export default CatCoffee
