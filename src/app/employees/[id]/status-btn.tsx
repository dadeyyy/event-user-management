'use client'

import { useState } from "react"

export default async function StatusBtn({status}:{status:string}) {
    const [eventStatus, setEventStatus] = useState(status);
    const [buttonStatus,setButtonStatus] = useState(true)

    const startHandler = () =>{
        if(status === "PLANNED"){
            
        }
    }

    const stopHandler = () =>{

    }

    const cancelHandler = () =>{

    }


  return (
    <div>
        <button onClick={startHandler}>Start</button>
        <button onClick={stopHandler}>Stop</button>
        <button onClick={cancelHandler}>Cancel</button>
    </div>
    )
}