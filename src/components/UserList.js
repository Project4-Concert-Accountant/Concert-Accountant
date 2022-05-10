import firebase from "../firebase"
import { getDatabase, ref, onValue, push } from "firebase/database"
import { useEffect, useState } from "react";

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

    return (
        <ul>
            {
                userListArray.map((list) => {
                    return (
                        <li key={list.id}>
                            <p>{list.data.name}</p>
                            <p>{list.data.budget}</p>
                            <button>+</button>
                        </li>

                    )

                })
            }
        </ul>
    )
}

export default UserList