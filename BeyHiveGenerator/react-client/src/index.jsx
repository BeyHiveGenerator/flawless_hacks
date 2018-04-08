import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Sentence from './Sentence.jsx';
import sentiment from 'sentiment';

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
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {

  }

  randomization() {
    console.log('lyrics', this.state.lyrics)
    var randomLyrics = [];
    var lines = 45;
    let chorus = this.state.lyrics[Math.floor(Math.random() * this.state.lyrics.length)];
    while (randomLyrics.length < 45) {
      if (randomLyrics.length === 0 || randomLyrics.length === 10 || randomLyrics.length === 20 || randomLyrics.length === 30) {
        randomLyrics.push(chorus, chorus, chorus)
      }
      var randomIndex = this.state.lyrics[Math.floor(Math.random() * this.state.lyrics.length)];
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

  handleChange(e) {
    this.setState({
      mood: e.target.value
    });
  }
    
  handleClick() {
    event.preventDefault();
    var result = sentiment(this.state.mood);
    console.log('SCOREEEE', result.score);
    if (result.score >= 0) {
      this.getPos();
    } else {
      this.getNeg();
    }
    
  }

  render () {
    return (
      <div style={{"textAlign": "center"}}>
        How YOU doin'?
        <br></br>
        <br></br>
      <div style={{"textAlign": "center"}}>
      {/* <button onClick={() => this.getPos()}>Feeling goooood</button>
      <button onClick={() => this.getNeg()}>Feeling baaad</button> */}
      <br></br>
      <br></br>
      <input 
        type="text"
        value={this.state.mood}
        onChange={this.handleChange}
        placeholder="How are you feeling today?"></input>
      <button onClick={this.handleClick}>Show Me My Song</button>
      <br></br>
      <br></br>
      <button onClick={() => this.getNeg()}>Feeling baaad</button>
      <button onClick={() => this.getPos()}>Feeling goooood</button>
      </div>
      <br></br>
      <br></br>
      <div style={{"textAlign": "center"}}>
      {this.state.rendered ?
        // this.state.random.map((sentence, id) => {
        //   return (
            <Sentence items={this.state.random}/>
        //   )
        // }
        // )
        :
        null
      }
    </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
