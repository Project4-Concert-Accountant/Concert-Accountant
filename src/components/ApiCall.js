import axios from "axios";
import { useEffect, useState } from "react";
import EventInfo from "./EventInfo";

const ApiCall = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        

        // const todatsDate = new Date();
        // const year = todatsDate.getFullYear();
        // const month = todatsDate.getMonth().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        // const date = todatsDate.getDay().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        // const today = `${year}-${month}-${date}`;
        // console.log(today);

        axios({
            url: "https://app.ticketmaster.com/discovery/v2/events.json?",
            params: {
                apikey: "dAuzWaR4q5pH90ZcC6CpJPHDjH7Gjzz8",
                format: "json",
                size: 10,
                city: "Toronto",
                segmentName: "music",
                // onsaleOnStartDate : today
            }
        })
            .then((res) => {
                // console.log(res.data._embedded.events);
                setData(res.data._embedded.events);
            })

    }, [])

    return (
        <div>
            <EventInfo eventArray = { data } />
        </div>
    )
}
export default ApiCall