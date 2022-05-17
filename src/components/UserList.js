import firebase from "../firebase"
import { getDatabase, ref, onValue } from "firebase/database"
import { useEffect, useState } from "react";

import UserConcerts from "./UserConcerts";

const UserList = () => {
    // all the lists from firebase
    const [userListArray, setUserListArray] = useState([])

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
        <div className="firebaseListContainer">
            <ul>
                {
                    userListArray.map((list) => {
                        return (
                            <li className="firebaseUserList" key={list.id}>
                                <UserConcerts
                                    listName={list.data.name}
                                    listBudget={list.data.budget}
                                    listId={list.id}
                                    listConcerts={list.data.concert} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default UserList