import firebase from "../firebase"
import { getDatabase, ref, onValue, remove } from "firebase/database"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
    //Get data from Firebase through onValue request
    //Display data (name and budget) 
    //add button to add concerts



    const [userListArray, setUserListArray] = useState([])


    const database = getDatabase(firebase);
    const dbRef = ref(database);

    useEffect(() => {
        onValue(dbRef, (response) => {
            const firebaseList = response.val()
            const tempArray = []

            for (const key in firebaseList) {
                tempArray.push({ id: key, data: firebaseList[key] })
            }
            setUserListArray(tempArray)
        })
    }, [])

    // Creating anew User array without empty string from firebase
    useEffect(() => {

        // creating primary list to get the concert data back from the firebase
        const primaryShowList = []
        // final list was created to separate the objects into each index in the array
        const finalShowList = []
        const copyUserListArray = [...userListArray]
        copyUserListArray.forEach((list) => {
            primaryShowList.push(list.data.concert)

        })
        for (let key in primaryShowList[0]) {
            finalShowList.push(primaryShowList[0][key])
        }

        //splicing to get rid off the empty string from firebase
        finalShowList.splice(0, 1)

    }, [userListArray])



    return (
        <>
            <ul>
                {
                    userListArray.map((list) => {
                        return (
                            <li key={list.id}>
                                <p>{list.data.name}</p>
                                <p>{list.data.budget}</p>
                                {/* <p>{list.data.concert}</p> */}
                                <Link to={`/lists/${list.id}`}>+++</Link>
                            </li>

                        )

                    })
                }
            </ul>
            {/* {console.log("Hello")} */}

        </>
    )
}

export default UserList