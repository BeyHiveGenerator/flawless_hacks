import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { 
  
    // }
  }

  componentDidMount() {
    
  }

  render () {
    return (<div>
      I woke up this way.
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));