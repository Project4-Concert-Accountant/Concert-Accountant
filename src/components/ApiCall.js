import axios from "axios";
import { useEffect, useState } from "react";
import EventInfo from "./EventInfo";

const ApiCall = () => {

    const [data, setData] = useState([]);
    const [paidArray, setPaidArray] = useState([]);
    // use the free array for broke mode later
    const [freeArray, setFreeArray] = useState([]);

    useEffect(() => {

        axios({
            url: "https://app.ticketmaster.com/discovery/v2/events.json?",
            params: {
                apikey: "dAuzWaR4q5pH90ZcC6CpJPHDjH7Gjzz8",
                format: "json",
                size: 20,
                sort: 'date,asc',
                city: "Toronto",
                segmentName: "music",
            }
        })
            .then((res) => {
                // the useful data from api
                setData(res.data._embedded.events);
            })

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
                setFreeArray(primaryFreeArray);

                console.log(freeArray);
    }, [])

    return (
        <div>
            <EventInfo eventArray = { paidArray } />
        </div>
    )
}
export default ApiCall