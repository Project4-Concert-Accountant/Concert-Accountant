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

    return (
        <div className="userListContainer">
            <div className="listInfo">
                <h3>{listName}</h3>
                <h3>${listBudget}</h3>
            </div>
            <ul>
                {
                    displayConcertsArray.map(concertShow => {
                        return (
                            <li className="concertContainer" key={concertShow.name}>
                                <div className="imgContainer">
                                <img src={`${concertShow.images[2].url}`} alt={concertShow.name}/> 
                                </div>
                                <div className="subListInfo">
                                <p>{concertShow.name}</p>
                                <p>${concertShow.priceRanges[0].min}</p>
                                <p>{concertShow.dates.start.localDate} @ {concertShow.dates.start.localTime}</p>
                                </div>
                                <button>Remove</button>
                            </li>
                        )
                    })
                }

            </ul>
            <Link to={`/lists/${listId}`} className="addConcertButton">
                <FontAwesomeIcon icon={faPlus} />
            </Link>
        </div>
    )
}

export default UserConcerts