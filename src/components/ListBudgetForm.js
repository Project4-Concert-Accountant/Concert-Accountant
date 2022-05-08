const ListBudgetForm = () => {
    return (
        <div className="listNameBudget">
            <form>
                <p>Create a budget!</p>
                <label for="listName" className="sr-only">List Name</label>
                <input 
                type="text" 
                id="listName" 
                placeholder="Name the list" />

                <label for="budget" className="sr-only">Budget</label>
                <input 
                type="text" 
                pattern="[0-9]*"
                id="budget" 
                placeholder="How much is your budget?"/>
                <button type="submit">Create a budget!</button>
            </form>
        </div>
    )
}

export default ListBudgetForm;