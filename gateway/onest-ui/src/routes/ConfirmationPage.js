import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

function ConfirmationPage() {

    let [cause,setCause] = useState();
    const location = useLocation();
    useEffect(() => {
        setCause(location.state);
    }, []);


    const naviagte = useNavigate();
    const navigateToHome = () => {
        naviagte('/home');
    };


  return (
    <div style={{width:'100%', height:'100%'}}>
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            height: '90%'
            }}
            >
                <Typography  
                    variant="body2" 
                    color="text.secondary"
                    style={{margin: '10px', marginTop:"45px"}} 
                    >
                    Your commitment to <i>{`${cause?.name}`}</i> is deeply appreciated. An email containing your pledge certificate will soon be on its way to you.
                </Typography>
            {/* <h4 id="text" style={{ color: '#0F75BC', transition: "1s", marginTop: "45px" }}>
                {`Your commitment to ${cause?.name} is deeply appreciated. An email containing your pledge certificate will soon be on its way to you`}
            </h4> */}
            <img src='./star.png' width='64px' height='64px' style={{ marginTop:'25px' }}></img>
            <Button style={{ color: '#0F75BC', transition: "1s", marginTop:'25px' }} onClick={navigateToHome}>
                Pledge Again
              </Button>
            </Box> 
    </div>
    // <Container
    //   id="quote-box"
    //   className="pl-4 pr-4 pt-4 pb-4 col-lg-8 shadow p-3 mb-5 mt-5 bg-white rounded"
    // >
    //   {/*Quotes and Author name*/}
    //   <Row className="justify-content-md-center">
    //     <Col xs="auto">
    //       <div>
            
    //         <p className="text-right" id="author">
             
    //         </p>
    //       </div>
    //     </Col>
    //   </Row>
    // </Container>
  );
}

export default ConfirmationPage;