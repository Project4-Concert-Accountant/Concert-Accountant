import React from 'react'

const EventInfo = ({ eventArray } ) => {
    return (
        <div className='container'>
            {
                Object.keys(eventArray).length ===0 ? "this is empty" :

                eventArray.map (singleEvent => {
                    return (
                        <div key={singleEvent.id} className= 'redBorder'>
                            <p>{singleEvent.name}</p>
                            <p>{singleEvent.dates.start.localDate} at {singleEvent.dates.start.localTime}</p>
                            <p>{singleEvent.priceRanges ? singleEvent.priceRanges[0].min : 'free event'}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default EventInfo