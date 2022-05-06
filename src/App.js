import './App.css';
<<<<<<< Updated upstream
import ApiCall from "./components/ApiCall"

=======
import { useEffect } from 'react';
>>>>>>> Stashed changes

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
      <h1>Api Call</h1>
    </div>
  );
}

export default App;
