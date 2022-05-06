import axios from "axios";
import { useEffect, useState } from "react";
import EventInfo from "./EventInfo";

const ApiCall = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            url: "https://app.ticketmaster.com/discovery/v2/events.json?",
            params: {
                apikey: "dAuzWaR4q5pH90ZcC6CpJPHDjH7Gjzz8",
                format: "json",
                size: 10,
                city: "Toronto",
                segmentName: "music"
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