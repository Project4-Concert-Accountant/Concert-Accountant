import './App.css';
import ApiCall from './components/ApiCall';
import ListBudgetForm from './components/ListBudgetForm';
function App() {

  return (
    <div className="App">
      <h1>Here is my Api call</h1>
      <ListBudgetForm />
      <ApiCall />
    </div>
  );
}

export default App;
