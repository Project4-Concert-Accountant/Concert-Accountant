import firebase from "../firebase"
import { getDatabase, ref, onValue, remove } from "firebase/database"
import { useEffect, useState } from "react";

import UserConcerts from "./UserConcerts";

const UserList = () => {
    //Get data from Firebase through onValue request
    //Display data (name and budget) 
    //add button to add concerts

    // all the lists from firebase
    const [userListArray, setUserListArray] = useState([])
    // const [showList, setShowList] = useState([])

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    // gets all the lists from firebase
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
        <>
            <ul>
                {/* Create css class to resize objects for readable list concert */}
                {
                    userListArray.map((list) => {
                        return (
                            <li className= "firebaseUserList" key={list.id}>
                                <UserConcerts 
                                listName={list.data.name} 
                                listBudget={list.data.budget} 
                                listId={list.id}
                                listConcerts={list.data.concert}/>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default UserList