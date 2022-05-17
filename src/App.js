import '../src/styles/App.css';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import Homepage from './components/Homepage';
import { ReactComponent as Logo } from './components/brandLogo.svg';

function App() {

  return (
    <div className="wrapper App">
      <h1>Concert Accountant</h1>
      <div className='brandLogo' aria-hidden="true">
        <Logo />
      </div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/lists/:listID' element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
