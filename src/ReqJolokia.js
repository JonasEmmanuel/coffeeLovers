import React from "react";

import axios from "axios";

class ReqJolokia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donnees: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/jolokia/list/jolokia`).then(res => {
      const myDonnees = res.data.value;
      //const md = JSON.parse(res);
      var value2 = "";
      var lengthd = "";
      Object.keys(myDonnees).forEach(function(operations) {
        var value = myDonnees[operations];
        var args = value.op;
        Object.keys(args).forEach(arg => {
          value2 = args[arg];
        });
        console.log(lengthd);
      });
    });
  }

  render() {
    return <div>{this.state.donnees}</div>;
  }
}

export default ReqJolokia;
