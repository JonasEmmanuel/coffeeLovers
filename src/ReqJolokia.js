import React from 'react'
import randomstring from 'randomstring'
import axios from 'axios'
import initStateFromJolokia from './Utils'

class ReqJolokia extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      services: [],
      params: {},
      operations: {}
    }
  }

  componentDidMount () {
    axios.get(` http://www.mocky.io/v2/5c0d77122f00002900e2e584`).then(res => {
      const myDonnees = res.data.value
      // console.log(myDonnees)
      var serviceName = ''
      var operationsName = ''
      var descOperation = ''
      var returnOperation = ''
      var argsName
      // const md = JSON.parse(res);
      var value2 = ''
      Object.keys(myDonnees).forEach(operations => {
        var value = myDonnees[operations]
        // getServiceName
        serviceName = operations // type=ShrimpMaintenance
        // console.log(operations)
        var argsCollected = value.op // all operation : reloadConfig, shutdownSystem
        // get allOperations for this Service
        // console.log(argsCollected)
        var tabOps = []
        Object.keys(argsCollected).forEach(arg => {
          // console.log(arg)
          // operationsName = arg
          value2 = argsCollected[arg] // Table of args for this operations
          // console.log(value2.args)
          returnOperation = value2.ret
          descOperation = value2.desc
          argsName = value2.args
          // getArgs for this operations
          var tapParams = []
          argsName.map((a, i) => {
            // console.log(a.name)
            this.setState(prevState => {
              var y =
                Math.random()
                  .toString(36)
                  .substring(2, 15) +
                Math.random()
                  .toString(36)
                  .substring(2, 15)
              console.log(y)

              // Ajouter un element cle valeur à la liste des parametres.
              var p = {
                ...prevState.params,
                [y]: { name: a.name, type: a.type, desc: a.desc, value: '' }
              }
              tapParams.push(y)
              // console.log(tapParams)

              // clear Array
              return { params: p }
            })
          })
          this.setState(prevState => {
            var y2 =
              Math.random()
                .toString(36)
                .substring(2, 15) +
              Math.random()
                .toString(36)
                .substring(2, 15)
            tabOps.push(y2)
            var p2 = {
              ...prevState.operations,
              [y2]: {
                name: arg,
                desc: descOperation,
                ret: returnOperation,
                paramsId: tapParams,
                result: ''
              }
            }
            return { operations: p2 }
          })
        })
        this.setState(prevState => {
          var serv = [
            ...prevState.services,
            { name: operations, allOps: tabOps }
          ]
          return { services: serv }
        })
      })
    })
  }

  render () {
    return <div>toto</div>
  }
}

export default ReqJolokia
