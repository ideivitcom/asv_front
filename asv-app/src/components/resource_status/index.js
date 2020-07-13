import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

import React, { useEffect } from "react";




function ResourceStatus(){
    const { useState } = React;
    const [serverUp, setServerUp] = useState([false]);    
    const [dbUp, setDbUp] = useState([false]);

    const URL_GET_STATUS = 'http://localhost:5000/api/status'

    function get_status(){
        fetch(URL_GET_STATUS)
        .then(res => res.json())
        .then(result =>  
            {
                setServerUp(result['server'])
                setDbUp(result['db']);
            })
    }
    



    useEffect(() => {
        get_status()      
    }, [])  

    return (
            <div>
                {                 
                    serverUp
                    &&
                    <p>Server <ThumbUp/></p>
                }               
                {
                    dbUp
                    &&
                    <p>Data Base <ThumbUp/></p>
                }               
            </div>
    )
}

export default ResourceStatus;



