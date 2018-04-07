import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Sentence from './Sentence.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: [],
      random:[],
      rendered: false
    }
    this.getPos = this.getPos.bind(this)
    this.getNeg = this.getNeg.bind(this)
    this.randomization = this.randomization.bind(this)
  }

  componentDidMount() {

  }

  randomization() {
    console.log('lyrics', this.state.lyrics)
    var randomLyrics = [];
    var lines = 45;
    while (randomLyrics.length < 45) {
      var randomIndex = this.state.lyrics[Math.floor(Math.random() * this.state.lyrics.length)];
      console.log("Math.floor(Math.random() * this.state.lyrics.length", Math.floor(Math.random() * this.state.lyrics.length))
      console.log("randomIndex", randomIndex)
      randomLyrics.push(randomIndex)
    }
    this.setState({
      random: randomLyrics,
      rendered: true
    })
  }

  getPos(){
    axios.get('/pos')
      .then((res) => {
        console.log('res', res)
        this.setState({
          lyrics: res.data
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
        lyrics: res.data
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
      {this.state.rendered ?
        this.state.random.map((sentence) => {
          return (
            <Sentence sentence={sentence}/>
          )
        })
        :
        null
      }
      I woke up this way.
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
