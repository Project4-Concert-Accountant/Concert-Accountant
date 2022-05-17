import '../src/styles/App.css';
import { Route, Routes, Link } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import Homepage from './components/Homepage';
import { ReactComponent as Logo } from './components/brandLogo.svg';

function App() {

  return (
    <div className="wrapper App">
      <Link to={'/'} >
        <h1 title='Link to Home'>Concert Accountant</h1>
      </Link>
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
