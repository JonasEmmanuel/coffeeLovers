import React from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import {
  Input,
  InputGroup,
  Button,
  Col,
  Label,
  Form,
  ButtonGroup
} from 'reactstrap'
import './customCss.css'
import Select from 'react-select'

const options = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' }
]

const OperationInfo = props => {
  return (
    <div className='card'>
      <h5 className='card-header'>{props.operationDesc}</h5>
      <div className='card-body'>
        {console.log('iriririr')}
        {props.myparams.map((idParams, i) => {
          return (
            <Col sm={10}>
              <Label>
                <b>
                  {props.allparams[idParams].name}(
                  {props.allparams[idParams].type}):
                </b>
              </Label>
              <Input
                type='text'
                value={props.allparams[idParams].value}
                onChange={event => props.onChangeParamsValue(event, idParams)}
              />
            </Col>
          )
        })}
        <Col sm={10}>
          <br />
          <br />
          <Label>Resultat:</Label>
          <Input type='textarea' id='paste' value={props.result} />
        </Col>
      </div>
      <div className='card-footer'>
        <ButtonGroup>
          <Button outline color='success'>
            Executer Requete
          </Button>
          <div id='right'>
            <Button
              outline
              color='danger'
              onClick={() => {
                props.onReset(
                  props.myparams,
                  props.allparams,
                  props.operationId
                )
              }}
            >
              Reset Params
            </Button>
          </div>
        </ButtonGroup>
      </div>
    </div>
  )
}

class JmxFront extends React.Component {
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

  onCall = endpoint => {}

  onChangeParamsValue = (event, pa) => {
    const valueX = event.target.value
    this.setState(prevState => {
      const p = { ...prevState.params }
      p[pa].value = valueX
      // console.log(indexParams)
      // p[indexParams].value = valueX
      return { params: p }
    })
  }

  /* onChangeSelect = (v, index) => {
    this.setState(prevState => {
      const op = [...prevState.operations];
      op[index].verbeHttp = v;
      return { operations: op };
    });
  }; */

  /*   onReset = (myParams, allparams, operationId) => {
    this.setState(prevState => {
      myParams.map((e, i) => {
        allparams[e].value = ''
      })
      const ops = [...prevState.operations]
      const op = ops.find((op, i) => {
        return op.id === operationId
      })
      op.result = ''

      return { params: allparams, operations: ops }
    })
  } */

  render () {
    {
      return (
        <div>
          {Object.keys(this.state.operations).forEach(opId => {
            var op = this.state.operations[opId]
            // console.log(op.desc)
            
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-md-2' />
                  <div className='col-md-8' id='cardBoard'>
                    toto
                  </div>
                  <div className='col-md-2' />
                </div>
              </div>
            
          })}
        </div>
      )
    }
  }
}

export default JmxFront
