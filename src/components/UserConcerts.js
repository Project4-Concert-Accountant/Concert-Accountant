import { Link } from "react-router-dom";

// getting props from userLists.js
const UserConcerts = ({listName, listBudget, listId , listConcerts}) => {

    const displayConcertsArray = []
    for (const concert in listConcerts){
        displayConcertsArray.push(listConcerts[concert]);
    }

    displayConcertsArray.shift();
    console.log(displayConcertsArray);

    return (
        <div>
            <p>{listName}</p>
            <p>{listBudget}</p>
            <ul>
                {
                    displayConcertsArray.map(concertShow => {
                        return (
                            <div className="yolo">
                                <p>{concertShow.name}</p>
                                <p>{concertShow.priceRanges[0].min}</p>
                            </div>
                        )
                    })
                }

            </ul>
            <Link to={`/lists/${listId}`}>+++</Link>
        </div>
    )
}

export default UserConcerts