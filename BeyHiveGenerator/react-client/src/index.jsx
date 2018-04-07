import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: []
    }
    this.getPos = this.getPos.bind(this)
    this.getNeg = this.getNeg.bind(this)
  }

  componentDidMount() {

  }

  getPos(){
    axios.get('/pos')
      .then((res) => {
        console.log('res', res)
        this.setState({
          lyrics: res
        })
      })
  }

  getNeg() {
    axios.get('/neg')
    .then((res) => {
      console.log('res', res)
      this.setState({
        lyrics: res
      })
    })
  }

  render () {
    return (<div>
      <button onClick={() => this.getPos()}>Feeling goooood</button>
      <button onClick={() => this.getNeg()}>Feeling baaad</button>
      I woke up this way.
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
