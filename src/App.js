import './App.css';
import ListBudgetForm from './components/ListBudgetForm';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
function App() {

  return (
    <div className="App">
      <h1>Here is my Api call</h1>
      <ListBudgetForm />
      <Routes>
        <Route path='/' element={<SearchPage />}/>
      </Routes>
    </div>
  );
}

export default App;
