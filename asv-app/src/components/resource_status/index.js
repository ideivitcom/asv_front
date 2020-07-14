import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

import React, { useEffect } from "react";




function ResourceStatus(){
    const { useState } = React;
    const [serverUp, setServerUp] = useState(false);  
    const [serverDown, setServerDown] = useState(false);   
    const [timer, setTimer] = useState(0);    
    

    const URL_GET_STATUS = 'http://localhost:5000/api/status'

    function get_status(){
        fetch(URL_GET_STATUS)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(res => res.json())
        .then(result =>  
            {
                setServerUp(result['server'])
                setServerDown(!result['server'])                
            })
            .catch(function(error) {
                setServerUp(false)
                setServerDown(true)               
            })
    }
    



    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            get_status();
          }, 1000);
        return () => clearInterval(interval);
                    
    }, [])  

    return (
            <div>
                {                 
                    serverUp
                    &&
                    <p>Server Status<ThumbUp/></p>
                }               
                {
                    !serverUp
                    &&
                    <p>Server Status<ThumbDown/></p>
                }               
            </div>
    )
}

export default ResourceStatus;



