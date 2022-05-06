import axios from "axios";
import { useEffect } from "react";

const ApiCall = () => {

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
                console.log(res)
            })

    }, [])

    return (
        <div>

        </div>
    )
}
export default ApiCall