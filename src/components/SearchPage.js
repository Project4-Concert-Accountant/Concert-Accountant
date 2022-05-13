import axios from "axios";
import { useEffect, useState } from "react";
import EventInfo from "./EventInfo";
import { useParams } from "react-router-dom";
import firebase from "../firebase";
import { getDatabase, ref, onValue } from "firebase/database"
import UserList from "./UserList";


const SearchPage = () => {
    // current list's firebase key id
    const { listID } = useParams();
    // api states 
    const [userSearch, setUserSearch] = useState("")
    const [data, setData] = useState([]);
    const [paidArray, setPaidArray] = useState([]);
     // use the free array for broke mode later
    // const [freeArray, setFreeArray] = useState([]);

    // user's current list // this holds the name
    const [userListArray, setUserListArray] = useState([]);
    //creating state to store budget from firebase object
    const [listBudget, setListBudget] = useState(0)
    const [currentConcerts, setCurrentConcerts] = useState([])

    // const [showList, setShowList] = useState([]);
    const [remainingBudget, setRemainingBudget] = useState(0)

    //create state to hold ticket prices from firebase object
    const [ticketTotal, setTicketTotal] = useState(0)

    const database = getDatabase(firebase);
    const dbRef = ref(database, `${listID}`);

    // get ticket prices from firebase and sum them up
    const budgetCheck = () => {

        const copyOfShowList = [...currentConcerts];
        let ticketPrice = 0;

        // getting the min price from each concert that's already in the list and calculating the sum
        copyOfShowList.forEach(ticket => {
            ticketPrice = ticketPrice + parseFloat(ticket.priceRanges[0].min);
        })

        return (
            ticketPrice
        )
    }

    //create logic for listBudget <= ticketTotal, boolean result
    const budgetDifference = (currentTicketPrice) => {
        const remaining = listBudget - ticketTotal - currentTicketPrice;
        setRemainingBudget(remaining);

        if (remaining > 0) {
            console.log("NOT BROKE")
        }
        else {
            console.log("WHERES MY MONEY???")
        }
    }



    const updatePrice = (currentTicketPrice) => {
        const tempVariable = budgetCheck() + currentTicketPrice;
        setTicketTotal(tempVariable)
        // budgetDifference(currentTicketPrice);
    }


    const apiCall = (event) => {
        event.preventDefault()

        axios({
            url: "https://app.ticketmaster.com/discovery/v2/events.json?",
            params: {
                apikey: "dAuzWaR4q5pH90ZcC6CpJPHDjH7Gjzz8",
                format: "json",
                size: 20,
                sort: 'date,asc',
                // the city should be user input
                city: userSearch,
                segmentName: 'Music',
                // keyword: userSearch,
            }
        })
            .then((res) => {
                // the useful data from api
                const apiData = res.data._embedded.events
                // take only the data we want from apiData
                const destructuredApiData = []
                apiData.map((object) => {
                    //for each object, deconstruct the following
                    const {id, name, dates, priceRanges, images} = object
                    const newObject = {id, name, dates, priceRanges, images}

                    return (
                        destructuredApiData.push(newObject)
                        
                    ) // return END

                })// map END
                console.log(destructuredApiData);

                setData(destructuredApiData);
            })
    }

    const handleUserSearch = (event) => {
        const searchQuery = event.target.value;
        setUserSearch(searchQuery);    
    }

    useEffect(() => {
    //#REGION firebase stuff
    //getting list name and budget object from firebase
        onValue(dbRef, (snapshot) => {
            setListBudget(snapshot.val().budget);
            setUserListArray(snapshot.val().name);
            setTicketTotal(snapshot.val().currentTotal);
            // snapshot.value.concert is an object so we're converting it into an array
            const tempConcertsArray = [];
            for (const concert in snapshot.val().concert){
                tempConcertsArray.push(snapshot.val().concert[concert]);
            }
            // removing the first element from the array since it's an empty string
            tempConcertsArray.shift();

            setCurrentConcerts(tempConcertsArray);

        })
    //#endregion
        
    }, [])

//#region useEffect for filtering API data into paid events and free events
    useEffect(()=>{
               // creating a copy so we dont mutate the original data
                
                const copyOfData = [...data];
                
                const primaryPaidArray = [];
                // const primaryFreeArray = [];

        copyOfData.forEach(eachItem => {
            if (eachItem.priceRanges && eachItem.priceRanges[0].min > 0) {
                primaryPaidArray.push(eachItem);
            }
            // else {
            //     primaryFreeArray.push(eachItem);
            // }
        })

                setPaidArray(primaryPaidArray);
                // setFreeArray(primaryFreeArray);
        }, [data])
//#endregion
    

    return (
        <div>
            <div>
                {
                    userListArray ? 
                    <div>
                        <h2>your current list's name is {userListArray}</h2>
                        <h2>your current list's budget is {listBudget}</h2>
                        <h2>your remaining budget is {remainingBudget}</h2>
                        <p>your current total is: {ticketTotal}</p>
                     </div> : null
                }
            </div>
            
            <form onSubmit={apiCall}>
                <input onChange={handleUserSearch} type="text" id="search" name="search" placeholder="Enter a City"/>
                <button>BUTTONNNNN</button>
            </form>
            {paidArray.length === 0 ? null : <EventInfo eventArray={paidArray} listKey ={listID} updatePrice = {updatePrice} />}
        </div>
    )
  
}

export default SearchPage;