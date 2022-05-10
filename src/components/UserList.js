import firebase from "../firebase"
import { getDatabase, ref, OnValue, onValue, push } from "firebase/database"
import { useEffect, useState } from "react";

const UserList = () => {
    //Get data from Firebase through onValue request
    //Display data (name and budget) 
    //add button to add concerts

    //FirebaseList refers to the user list created on the Firebase 
    const [firebaseList, setFirebaseList] = useState([])
    const [userListArray, setUserListArray] = useState([])


    const database = getDatabase(firebase);
    const dbRef = ref(database);

    useEffect(() => {
        onValue(dbRef, (response) => {
            const newName = response.val()
            const tempArray = []

            for (const key in newName) {
                tempArray.push({ id: key, data: newName[key] })
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
                        </li>
                    )

                })
            }
        </ul>
    )
}

export default UserList