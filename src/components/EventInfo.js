import React from 'react'

const EventInfo = ({ eventArray } ) => {
    return (
        <div className='container'>
            {
                Object.keys(eventArray).length ===0 ? "this is empty" :

                eventArray.map (singleEvent => {
                    // somethimes this isn't there - need to refine the api request
                    // console.log(singleEvent.priceRanges[0]);
                    return (
                        <div key={singleEvent.id} className= 'redBorder'>
                            <p>{singleEvent.name}</p>
                            <p>{singleEvent.dates.start.localDate} at {singleEvent.dates.start.localTime}</p>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default EventInfo