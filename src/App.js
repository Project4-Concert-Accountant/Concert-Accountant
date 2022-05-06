import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {

  const url = new URL('https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=dAuzWaR4q5pH90ZcC6CpJPHDjH7Gjzz8&city=Toronto&segmentName=sports')

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
  }, [])

 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
