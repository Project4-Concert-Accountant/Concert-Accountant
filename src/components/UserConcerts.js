import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';


// getting props from userLists.js
const UserConcerts = ({ listName, listBudget, listId, listConcerts }) => {

    const displayConcertsArray = []
    for (const concert in listConcerts) {
        displayConcertsArray.push(listConcerts[concert]);
    }

    displayConcertsArray.shift();
    console.log(displayConcertsArray);

    return (
        <div className="userListContainer">
            <p>{listName}</p>
            <p>{listBudget}</p>
            <ul>
                {
                    displayConcertsArray.map(concertShow => {
                        return (
                            <li className="yolo" key={concertShow.name}>
                                <p>{concertShow.name}</p>
                                <p>{concertShow.priceRanges[0].min}</p>
                            </li>
                        )
                    })
                }

            </ul>
            <Link to={`/lists/${listId}`}>
                <FontAwesomeIcon icon={faPlus} />
            </Link>
        </div>
    )
}

export default UserConcerts