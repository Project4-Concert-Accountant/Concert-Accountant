import './App.css';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import Homepage from './components/Homepage';

function App() {
  



  return (
    <div className="App">
      <h1>Welcome to concert accountant</h1>
      <Routes>
        <Route  path='/' element={<Homepage/>}/>
        <Route path='/lists/:listID' element={<SearchPage />}/>
      </Routes>
    </div>
  );
}

export default App;
