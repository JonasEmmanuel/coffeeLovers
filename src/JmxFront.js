import React from "react";
import NavBar from "./NavBar";
import {
  Input,
  InputGroup,
  Button,
  Col,
  Label,
  Form,
  ButtonGroup
} from "reactstrap";
import "./customCss.css";
import Select from "react-select";

const options = [
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" }
];

const OperationInfo = props => {
  return (
    <div className="card">
      <h5 className="card-header">{props.description}</h5>
      <div className="card-body">
        <Col sm={10}>
          <Label for="VerbeHttp">
            <b>Verbe HTTP:</b>
          </Label>
          <Select
            options={options}
            onChange={props.onChangeSelect}
            value={props.verbeHttp ? props.verbeHttp : ""}
          />
          <Label for="Endpoint">
            <b>Url:</b>
          </Label>
          <Input type="text" value={props.endpoint} disabled />
        </Col>
        {props.myparams.map((p, i) => {
          return (
            <Col sm={10}>
              <Label>
                <b>
                  {props.allparams[p].nom}({props.allparams[p].ptype}):
                </b>
              </Label>
              <Input
                type="text"
                value={props.allparams[p].value}
                onChange={event => props.onChangeParamsValue(event, p)}
              />
              <Label>
                <i>Required: {props.allparams[p].nullable}</i>
              </Label>
            </Col>
          );
        })}
        <Col sm={10}>
          <br />
          <br />
          <Label>Resultat:</Label>
          <Input type="textarea" id="paste" value={props.result} />
        </Col>
      </div>
      <div className="card-footer">
        <ButtonGroup>
          <Button outline color="success">
            Executer Requete
          </Button>
          <div id="right">
            <Button
              outline
              color="danger"
              onClick={() => {
                props.onReset(
                  props.myparams,
                  props.allparams,
                  props.operationId
                );
              }}
            >
              Reset Params
            </Button>
          </div>
        </ButtonGroup>
      </div>
    </div>
  );
};

class JmxFront extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        param1: {
          id: "1",
          nom: "Prenom",
          ptype: "String",
          nullable: "false",
          value: "Jonas"
        },
        param2: {
          id: "1",
          nom: "Nom",
          ptype: "String",
          nullable: "false",
          value: "HOUNSOU"
        },
        param3: { id: "2", nom: "", ptype: "", nullable: "", value: "ds" },
        param4: {
          id: "1",
          nom: "Age",
          ptype: "Integer",
          nullable: "false",
          value: 14
        }
      },
      operations: [
        {
          description: "DescriptionOperation1",
          result:
            "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
          myparams: ["param1", "param2", "param4"]
        }
      ]
    };
  }

  onCall = endpoint => {};

  onChangeParamsValue = (event, pa) => {
    const valueX = event.target.value;
    this.setState(prevState => {
      const p = { ...prevState.params };
      p[pa].value = valueX;
      // console.log(indexParams)
      // p[indexParams].value = valueX
      return { params: p };
    });
  };

  onChangeSelect = (v, index) => {
    this.setState(prevState => {
      const op = [...prevState.operations];
      op[index].verbeHttp = v;
      return { operations: op };
    });
  };

  onReset = (myParams, allparams, operationId) => {
    this.setState(prevState => {
      myParams.map((e, i) => {
        allparams[e].value = "";
      });
      const ops = [...prevState.operations];
      const op = ops.find((op, i) => {
        return op.id === operationId;
      });
      op.result = "";

      return { params: allparams, operations: ops };
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        {this.state.operations.map((op, index) => {
          return (
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-8" id="cardBoard">
                  <OperationInfo
                    description={op.description}
                    operationId={op.id}
                    endpoint={op.endpoint}
                    verbeHttp={op.verbeHttp}
                    myparams={op.myparams}
                    allparams={this.state.params}
                    result={op.result}
                    onChangeParamsValue={this.onChangeParamsValue}
                    onReset={this.onReset}
                    onChangeSelect={event => this.onChangeSelect(event, index)}
                  />
                </div>
                <div className="col-md-2" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default JmxFront;
