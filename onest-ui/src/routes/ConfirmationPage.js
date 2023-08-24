import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

function ConfirmationPage() {

    let [cause,setCause] = useState();
    let [pledgeId,setPledge] = useState();
    const location = useLocation();
    useEffect(() => {
        let {cause, pledgeId} = location?.state;

        setCause(cause);
        setPledge(pledgeId);
    }, []);


    const naviagte = useNavigate();
    const navigateToHome = () => {
        naviagte('/home');
    };

    const downloadPdf = () => {
        // Replace with your PDF URL
        const pdfUrl = 'http://localhost:8000/download/36a91a51-b895-400d-936e-7bb7fd714372';
    
        // Fetch the PDF

        fetch(pdfUrl)
          .then((response) => response.blob())
          .then((blob) => {
            console.log(blob)
            // Create a blob URL for the PDF
            const blobUrl = window.URL.createObjectURL(blob);
    
            // Create an anchor element for downloading
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = 'document.pdf'; // You can set the desired file name here
            a.style.display = 'none';
    
            // Append the anchor element to the DOM and trigger the click event
            document.body.appendChild(a);
            a.click();
    
            // Clean up by revoking the blob URL
            window.URL.revokeObjectURL(blobUrl);
          })
          .catch((error) => {
            console.error('Error downloading PDF:', error);
          });
      };
    

      const handleDownloadClick = () => {
        // Create an anchor element
        const a = document.createElement('a');
    
        // Set the anchor's href attribute to the PDF URL
        a.href = `http://localhost:8000/download/${pledgeId}`;
    
        // Set the anchor's download attribute to specify the file name
        a.download = `Pledge_Certificate_${pledgeId}.pdf`;
    
        // Programmatically click the anchor element to trigger the download
        a.click();
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

{/* 
                <a href="http://localhost:8000/download/123123132">
                    Download certificate
                </a> */}
              <Button style={{ color: '#0F75BC', transition: "1s", marginTop:'15px' }} onClick={() => handleDownloadClick()}>
                  Download Pledge
              </Button>
              {/* <button onClick={() => handleDownloadClick()}>Download PDF</button> */}
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