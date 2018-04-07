import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Sentence extends React.Component {
  constructor(props) {
    super(props);

  }

  // componentDidMount() {
  //
  // }


  render () {
    console.log("each sentence", this.props.sentence)
    return (

    <div>
      {this.props.sentence}
    </div>)
  }
}

export default Sentence
