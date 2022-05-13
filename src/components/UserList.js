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

    // // Creating anew User array without empty string from firebase
    // useEffect(() => {
    //     // holds all the concert lists from all the users
    //     const primaryShowList = []
    //     // will hold a user list to display 
    //     const finalShowList = []
    //     // as name implies
    //     const copyUserListArray = [...userListArray]

    //     // adding each concert array into the primaryShowList
    //     copyUserListArray.forEach((list) => {
    //         primaryShowList.push(list.data.concert)
    //     })

    //     primaryShowList.map(element => {

    //         // checking if the array element is an object
    //         if(Object.keys(element).length > 0){
    //             for (const item in element){
    //                 finalShowList.push(element[item]);
    //             }
    //         }
    //         else {
    //             console.log("this is not an object", element);
    //         }
    //     })

    //     console.log("this is the final", finalShowList);
    //     //shift to get rid off the empty string from firebase
    //     finalShowList.shift();

    //     console.log("this is the final", finalShowList);

    //     setShowList(finalShowList)

    // }, [userListArray])

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
            {/* {console.log("Hello")} */}
        </>
    )
}

export default UserList