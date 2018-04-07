import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: [],
      random:[]
    }
    this.getPos = this.getPos.bind(this)
    this.getNeg = this.getNeg.bind(this)
  }

  componentDidMount() {

  }

  randomization() {
    var randomLyrics = [];
    var lines = 45;
    while (randomLyrics.length < 45) {
      var randomIndex = this.state.lyrics[Math.floor(Math.random() * this.state.lyrics.length)];
      console.log("randomIndex", randomIndex)
      randomLyrics.push(this.state.lyrics[randomIndex])
    }
    this.setState({
      random: randomLyrics
    })
  }

  getPos(){
    axios.get('/pos')
      .then((res) => {
        console.log('res', res)
        this.setState({
          lyrics: res
        }, () => {
          this.randomization()
        })
      })
  }

  getNeg() {
    axios.get('/neg')
    .then((res) => {
      console.log('res', res)
      this.setState({
        lyrics: res
      }, () => {
        this.randomization()
      })
    })
  }

  render () {
    console.log('heyy', this.state.random)
    return (<div>
      <button onClick={() => this.getPos()}>Feeling goooood</button>
      <button onClick={() => this.getNeg()}>Feeling baaad</button>
      I woke up this way.
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
