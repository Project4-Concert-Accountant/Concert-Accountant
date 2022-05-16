import { useState } from "react";
import firebase from "../firebase";
import { getDatabase, ref, push } from "firebase/database";

const ListBudgetForm = () => {
    //create state for budget value to limit input to numbers only
    const [budget, setBudget] = useState(0);
    const [name, setName] = useState("");
    const [concert, setConcert] = useState([""]);
    const [currentTotal, setCurrentTotal] = useState(0);
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const listName = {
        name: name,
        budget: budget,
        concert: concert,
        currentTotal: currentTotal
    };

    // const numberCheck = (event) => {
    //     //on input change, ; check if input matches pattern attribute (.validity.patternMismatch); if it is valid (false), set val state to input; if it is invalid (true) set target.value to val
    //     event.target.validity.patternMismatch === false ?  setBudget(event.target.value) : event.target.value = budget;

    // }

    return (
        <div className="listNameBudget">
            <h2>Create a Concert List!</h2>
            <form className="initialForm"
                onSubmit={
                    (e) => {
                        e.preventDefault()
                        push(dbRef, listName);
                        //REMOVE LATER.
                        alert("added to firebase");

                    }
                }>

                <label htmlFor="listName" className="sr-only">List Name</label>

                <input
                    type="text"
                    id="listName"
                    placeholder="List name"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />

                <label htmlFor="budget" className="sr-only">Budget</label>
                <input
                    type="text"
                    pattern="[0-9]*"
                    title="numbers only"
                    id="budget"
                    placeholder="Budget"
                    //event listener
                    onChange={(event) => {
                        setBudget(event.target.value);
                    }}
                />



                <button type="submit" >Create a list!</button>

            </form>


        </div>
    )
}

export default ListBudgetForm;