import axios from "axios";
import { useEffect, useState } from "react";
import EventInfo from "./EventInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
    const [userSearch, setUserSearch] = useState("")

    const [data, setData] = useState([]);
    const [paidArray, setPaidArray] = useState([]);
    // use the free array for broke mode later
    const [freeArray, setFreeArray] = useState([]);

    const { listID } = useParams();

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
                setData(apiData);
            })
    }

    const handleUserSearch = (event) => {
        const searchQuery = event.target.value;
        setUserSearch(searchQuery)
        console.log(userSearch)
    }


    useEffect(()=>{
               // creating a copy so we dont mutate the original data
                const copyOfData = [...data];
                const primaryPaidArray = [];
                const primaryFreeArray = [];

                copyOfData.forEach(eachItem => {
                    if(eachItem.priceRanges && eachItem.priceRanges[0].min > 0){
                        primaryPaidArray.push(eachItem);
                    }
                    else {
                        primaryFreeArray.push(eachItem);
                    }
                })

                setPaidArray(primaryPaidArray);
                console.log(primaryPaidArray)
                setFreeArray(primaryFreeArray);
        }, [data])
        
    return (
        <div>
            <form onSubmit={apiCall}>
                <input onChange={handleUserSearch} type="text" id="search" name="search" placeholder="Enter a City"/>
                <button>BUTTONNNNN</button>
            </form>
            {paidArray.length === 0 ? null : <EventInfo eventArray = { paidArray } />}
        </div>
    )
}

export default SearchPage