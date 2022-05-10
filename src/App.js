import './App.css';
import ListBudgetForm from './components/ListBudgetForm';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import UserList from './components/UserList';

function App() {
  



  return (
    <div className="App">
      <h1>Here is my Api call</h1>
      <ListBudgetForm />
      <UserList /> 
      <Routes>
        <Route path='/lists/:listID' element={<SearchPage />}/>
      </Routes>
    </div>
  );
}

export default App;
