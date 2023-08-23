
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

function OnestProgressBar(props) {
    let [percentage, setPercentage] = useState(0)
    const getPercentage = (current, total) => {
        
        let per =null
        if (!current || !total) per = 0
        else {
            per = ( parseInt(current)/ parseInt(total)) 
            console.log(per);
            if (per >= 1) per = 100 
            else per = per*100
        }
        return per
 
    }
   useEffect(() => {
        let per = getPercentage(props?.current , props?.total)
        setPercentage(per);
    },[props?.current, props?.total])

  return (
    <ProgressBar now={percentage} label={`${percentage}%`} />
  );
}

export default OnestProgressBar;