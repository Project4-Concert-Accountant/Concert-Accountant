import '../src/styles/App.css';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import Homepage from './components/Homepage';

function App() {

  return (
    <div className="wrapper App">
      <h1>Concert Accountant</h1>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/lists/:listID' element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
