import { useState } from "react";
import firebase from "../firebase";
import { getDatabase, ref, push } from "firebase/database";

const ListBudgetForm = () => {
    const [budget, setBudget] = useState("");
    const [name, setName] = useState("");

    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const listName = {
        name: name,
        budget: budget,
        concert: [""],
        currentTotal: 0
    };

    const resetInput = () => {
        setBudget("");
        setName("");
    }

    return (
        <div className="listNameBudget">
            <h2>Create a Concert List!</h2>
            <form className="initialForm"
                onSubmit={(e) => {
                    e.preventDefault()
                    push(dbRef, listName);
                    resetInput();
                    alert("Your list has been created!");
                }
                }>

                <label htmlFor="listName" className="sr-only">List Name</label>

                <input
                    type="text"
                    id="listName"
                    placeholder="List name"
                    value={name}
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
                    value={budget}
                    //event listener
                    onChange={(event) => {
                        setBudget(event.target.value);
                    }}
                />

                <button disabled={!name} type="submit">Create a list!</button>

            </form>


        </div>
    )
}

export default ListBudgetForm;