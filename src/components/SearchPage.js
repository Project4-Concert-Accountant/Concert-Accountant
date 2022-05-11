import axios from "axios";
import { useEffect, useState } from "react";
import EventInfo from "./EventInfo";
import { useParams } from "react-router-dom";
import firebase from "../firebase";
import { getDatabase, ref, get } from "firebase/database"
// import UserList from "./UserList";

const SearchPage = () => {
    const { listID } = useParams();
    const [userSearch, setUserSearch] = useState("")
    const [data, setData] = useState([]);
    const [paidArray, setPaidArray] = useState([]);
    
    // use the free array for broke mode later
    // const [freeArray, setFreeArray] = useState([]);

    //creating state to store budget from firebase object
    const [listBudget, setListBudget] = useState(0)
    //create state to hold ticket prices from firebase object
    const [ticketPrices, setTicketPrices] = useState([])

   

    //

    const budgetCheck = (listBudget) => {


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
        setUserSearch(searchQuery)     
        
    }

    useEffect(() => {
             //#REGION firebase stuff
    //getting list name and budget object from firebase
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${listID}`);

    const ticketArray = [];
    get(dbRef).then((snapshot) => {
        const tempObject = snapshot.val();
        setListBudget(tempObject.budget);
        delete tempObject.budget
        delete tempObject.name

        for (const item in tempObject) {
            ticketArray.push(item);
            // console.log("dbItem", item)
            // if (item.priceRanges) {
            // }
        } // for-in END
    })
    console.log("this is prices", ticketArray);
    //#endregion
    }, [])


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
        
    return (
        <div>
            <h2>{listID}</h2>
            <form onSubmit={apiCall}>
                <input onChange={handleUserSearch} type="text" id="search" name="search" placeholder="Enter a City"/>
                <button>BUTTONNNNN</button>
            </form>
            {paidArray.length === 0 ? null : <EventInfo eventArray={paidArray} listKey ={listID} />}
        </div>
    )
  
}

export default SearchPage;