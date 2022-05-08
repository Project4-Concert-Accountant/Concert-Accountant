import { useState } from "react";

const ListBudgetForm = () => {
    //create state for budget value to limit input to numbers only
    const [val, setVal] = useState("");
    const numberCheck = (event) => {
        //on input change, ; check if input matches pattern attribute (.validity.patternMismatch); if it is valid (false), set val state to input; if it is invalid (true) set target.value to val
        event.target.validity.patternMismatch === false ?  setVal(event.target.value) : event.target.value = val;
        
    }
    return (
        <div className="listNameBudget">
            <form>
                <p>Create a budget!</p>
                <label htmlFor="listName" className="sr-only">List Name</label>
                <input 
                type="text" 
                id="listName" 
                placeholder="Name the list" />

                <label htmlFor="budget" className="sr-only">Budget</label>
                <input 
                type="text" 
                pattern="[0-9]*"
                title="numbers only"
                id="budget" 
                placeholder="How much is your budget?"
                //event listener
                onChange={
                    numberCheck
                }/>
                <button type="submit">Create a budget!</button>
            </form>
        </div>
    )
}

export default ListBudgetForm;