import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';


// getting props from userLists.js
const UserConcerts = ({ listName, listBudget, listId, listConcerts }) => {

    const displayConcertsArray = [];
    // pushing each concert into the array to display the concerts
    for (const concert in listConcerts) {
        displayConcertsArray.push(listConcerts[concert]);
    }
    // removing the first element in the array since it's an emepty string
    displayConcertsArray.shift();

    // sortting the array with the highest price to lowest
    displayConcertsArray.sort(function(a, b){return b.priceRanges[0].min - a.priceRanges[0].min});

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
                                <div className="mainContentContainer">
                                    <div className="imgContainer">
                                        <img src={`${concertShow.images[0].url}`} alt={concertShow.name}/> 
                                    </div>
                                    <div className="subListInfo">
                                        <p>{concertShow.name}</p>
                                        <p>${concertShow.priceRanges[0].min}</p>
                                        <p>{concertShow.dates.start.localDate}</p>
                                        <p>{concertShow.dates.start.localTime}</p>
                                    </div>
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