
import {  Button,Container, Row ,Form, Col, Image} from "react-bootstrap";
import { useHistory, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import _axios from 'axios';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMediaQuery } from "usehooks-ts";
import { Box } from "@mui/system";
// import { Button } from "@mui/material";
import config from "../config/config";
import { Typography } from "@mui/material";

function Pledge(props) {
    let [cause,setCause] = useState();
    const matches = useMediaQuery('(min-width: 1200px)')
    const [formData, setFormData] = useState({ name: '',email:'' ,organisation: '', mobileNumber: '', pledgeAmount: ''});
    const [submissionResult, setSubmissionResult] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        setCause(location.state);
    }, []);

    const getCurrentTime = () => {
      let today = new Date();
      
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      
      let yyyy = today.getFullYear();
      
      if (dd < 10) {
          dd = '0' + dd;
      }
      if (mm < 10) {
          mm = '0' + mm;
      }
      today = dd + '/' + mm + '/' + yyyy;
      return today;
    }
    /// ----------------------------------------------------------------

    const [emailError, setEmailError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [amountError, setAmountError] = useState("");
    const validateEmail = (email) => {
      // Simple email validation using a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validateMobileNumber = (mobileNumber) => {
      // Simple mobile number validation (you can adjust it as needed)
      const mobileRegex = /^[0-9]{10}$/;
      return mobileRegex.test(mobileNumber);
    };
  
    /// ----------------------------------------------------------------
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("this is running!")
   
                /// ----------------------------------------------------------------
                setEmailError("");
                setMobileError("");
                setAmountError("");
                /// ----------------------------------------------------------------  
      if (!formData.name || !formData.email || !formData.organisation || !formData.mobileNumber || !formData.pledgeAmount) {
        setSubmissionResult('Please fill in all fields.');
      } else {


        if (!validateEmail(formData.email)) {
          setEmailError("Invalid email address");
          return;
        }
  
        if (!validateMobileNumber(formData.mobileNumber)) {
          setMobileError("Invalid mobile number (10 digits required)");
          return;
        }

        const pledgeAmount = parseInt(formData.pledgeAmount, 10);

        if (isNaN(pledgeAmount) || !Number.isInteger(pledgeAmount)) {
          setAmountError("Pledge Amount must be a valid integer.");
          return;
        }

        
        let dataToSend = {
          "PledgeDetails": {
            "donorName": formData.name,
            "donorId": "845f52c5-da79-4c0a-a0b1-3d5cf70ec6cc", // have to create it in backend
            "causeId": "845f52c5-da79-4c0a-a0b1-3d5cf70ec6cc", // get it from the causeDetails
            "email": formData.email,
            "mobileNumber": formData.mobileNumber,
            "amountForPledge": formData.pledgeAmount,
            "donorOrganisation": formData.mobileNumber,
            "pledgeDate": getCurrentTime(),
            "causeDetails": {
              "causeId": "0e7cad04-0aba-40fd-abe8-b4cbe2a75eab",
              "causeName": cause?.name,
              "causeType": cause?.causeType,
              "organisation": cause?.organisation
            }
          }
        }
        let baseUrl = `${config.BackendURL}`
        try {
          let data = (await _axios.post( `${baseUrl}/api/v1/Pledge`, dataToSend)).data;
          console.log(data);
          if (data.success) navigateToConfirmationPage(cause)
        } catch (error) {
          console.log(error);
          toast.error("An error occurred while submitting the form.");
        }
        
       
        
        // setSubmissionResult(`Form submitted with Name: ${formData.name} and organisation: ${formData.organisation}`);
        // setFormData({ name: '', organisation: '' });
      }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const navigateToConfirmationPage = (value) => {
        navigate('/confirmationPage', {state: value})
    }


  return (  
    <div style={{ width: '100%' }}>
      <ToastContainer />
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
            }}
        >

                <h5 style={{color:'#2C2C2C', marginTop: '25px'}}>{cause?.name}</h5>
                <h3 style={{color:'#0F75BC', marginTop: '25px', marginBottom:'25px',lineHeight: "24px /* 120% */"}}>Choose a donation amount</h3>
              <Row style={{margin:'0px', padding:'0px'}}>
                  <Col style={{margin:'0px', padding:'0px'}}>
                  <Form onSubmit={handleSubmit}>
                      <Form.Group style={{ marginTop: '10px'}} controlId="name">
                      <Form.Label style={{paddingBottom:'0px', marginBottom: '0px'}}> <Typography  variant="body1" color="text.secondary">
                      Name:
                      </Typography></Form.Label>
                      <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          style={{ paddingTop:'0px',marginTop: '0px', color: '#0F75BC',fontSize: '15px'}}
                          required
                      />
                      </Form.Group>
                      <Form.Group style={{ marginTop: '10px'}} controlId="email">
                      <Form.Label style={{paddingBottom:'0px', marginBottom: '0px'}}><Typography  variant="body1" color="text.secondary">
                      Email:
                      </Typography></Form.Label>
                      <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          style={{ paddingTop:'0px',marginTop: '0px', color: '#0F75BC',fontSize: '15px'}}
                          required
                      />
                      <Typography  variant="body2" color="red">
                      {emailError}
                      </Typography>
                      </Form.Group>
                      <Form.Group style={{ marginTop: '10px'}} controlId="mobileNumber">
                      <Form.Label style={{paddingBottom:'0px', marginBottom: '0px'}}><Typography  variant="body1" color="text.secondary">
                      Mobile Number:
                      </Typography></Form.Label>
                      <Form.Control
                          type="mobileNumber"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          style={{ paddingTop:'0px',marginTop: '0px', color: '#0F75BC',fontSize: '15px'}}
                          required
                      />
                        <Typography  variant="body2" color="red">
                        {mobileError}
                        </Typography>
                      </Form.Group>
                      <Form.Group style={{ marginTop: '10px'}}controlId="organisation">
                      <Form.Label style={{paddingBottom:'0px', marginBottom: '0px'}}><Typography  variant="body1" color="text.secondary">
                      Organisation:
                      </Typography></Form.Label>
                      <Form.Control
                          type="organisation"
                          name="organisation"
                          value={formData.organisation}
                          onChange={handleInputChange}
                          style={{ paddingTop:'0px',marginTop: '0px', color: '#0F75BC',fontSize: '15px'}}
                          required
                      />
                      </Form.Group>
                      <Form.Group style={{ marginTop: '10px'}} controlId="pledgeAmount">
                      <Form.Label style={{paddingBottom:'0px', marginBottom: '0px'}}><Typography  variant="body1" color="text.secondary">
                      Amount to Pledge:
                      </Typography></Form.Label>
                      <Form.Control
                          type="pledgeAmount"
                          name="pledgeAmount"
                          value={formData.pledgeAmount}
                          onChange={handleInputChange}
                          style={{ paddingTop:'0px',marginTop: '0px', color: '#0F75BC',fontSize: '15px'}}
                          required
                      />
                       <Typography  variant="body2" color="red">
                         {amountError}
                        </Typography>

                      </Form.Group>
                  </Form>
                  </Col>
                  {matches &&
                      <Col >
                        <Image src='./pledgePage.png'></Image>
                      </Col>
                  }
                


              </Row>

              <Button style={{marginTop:'40px'}} variant="primary" disabled={!formData.name || !formData.email || !formData.organisation || !formData.mobileNumber || !formData.pledgeAmount} type="submit" onClick={(e) => handleSubmit(e)}>
                Submit
              </Button>
              {/* <Button style={{marginTop:'40px'}} variant="contained" onClick={(e) => handleSubmit(e)}>
                    Pledge
              </Button> */}

        </Box>

    </div>

  );
}

export default Pledge;

