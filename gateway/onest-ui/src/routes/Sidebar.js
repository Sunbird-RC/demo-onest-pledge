import React, { useEffect, useState } from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
// import '../pages/style/Dashboard.css'

const Sidebar= (props) => {
   let [causeTypesList, setCauseTypeLists] = useState(["All Categories"])

    useEffect(() => {
        let causes = props.causes;
        let array = causes.map(i => i.causeType);
        setCauseTypeLists([... new Set(array)])
    }, [props.causes])
    console.log(causeTypesList);

    const handleOnCLickEvent = (value) => {
        console.log(value);
        if (value === 0) props.causeChangeHandler('All Categories')
        else props.causeChangeHandler(causeTypesList[value-1]);
    }
    return (
        <>
    
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                            
                <>
                            <Nav.Item key={0}>
                            <Nav.Link onClick={() => handleOnCLickEvent(0)}>All Categories</Nav.Link>
                            </Nav.Item>
                {causeTypesList.map((element, index)=> {
                
                        return    <Nav.Item key={index+1}>
                            <Nav.Link onClick={() =>handleOnCLickEvent(index+1)}>{element}</Nav.Link>
                            </Nav.Item>
                })
                }
                </>
            </Nav>
          
        </>
        );
  };
//   const Sidebar = Side);
  export default Sidebar