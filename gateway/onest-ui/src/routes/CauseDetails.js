
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import {Container, Row, Col } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import OnestProgressBar from "./progressBar";



function CauseDetails() {
    let [cause,setCause] = useState();
    const location = useLocation();
    const naviagte = useNavigate();
    useEffect(() => {
        setCause(location.state);
    }, []);

    const navigateToPledge = (value) => {
        naviagte('/Pledge', {state: value} );
      };

    const goodFormat = (s, n) => {
        // If length if less than 3
        if (n <= 3)
            return "Rs. " + s;
    
        let ans = "";
        let start = 0, cnt = 0;
    
        // If length is even
        if (n % 2 == 0) {
            ans += s[0];
            ans += ", ";
            start = 1;
        }
        while (start < n - 2) {
            if (cnt == 2) {
                ans += ", ";
                cnt = 0;
                continue;
            }
            else {
                ans += s[start];
                cnt++;
            }
            start++;
        }
    
        for (let i = start; i < n; i++)
            ans += s[i];
    
        return "Rs " + ans;
      }

  return (  

    <div style={{ width: '100%' }}>
        <Box
            sx={{
            display: 'flex',
            alignItems: {xs :'felx-start' , md: 'center'},
            flexDirection: 'column',
            justifyContent: 'center',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            }}


        >
            <h6 style={{color:'#0F75BC'}}>{cause?.name}</h6>
        </Box>
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
            <img src={`${cause?.imageRef[0]}`} width={'350'} height={'200'} alt="Italian Trulli" />
            <h6 style={{
                marginTop:'4px',
                color: "#3B4555",
                fontSize: "19px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "28.5px /* 150% */",
            }}>Amount needed for the cause</h6>
            <h4>{goodFormat(cause?.amountNeeded, cause?.amountNeeded?.length)}</h4>
            <Typography style={{marginTop: '10px', marginBottom:'20px', width:'100%'}}>
                        <OnestProgressBar  current={cause?.amountPledged} total={cause?.amountNeeded}/>
            </Typography>
            <Button onClick={() => navigateToPledge(cause)} variant="contained">Start Pledge</Button>
        </Box>
        <Box
            sx={{
            display: 'flex',
            alignItems: 'felx-start',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            }}
        >   
                <h6 style={{color:'#0F75BC'}}>About the fundraiser</h6>
                <Typography  
                    variant="body2" 
                    color="text.secondary">
                    {cause?.description}
                </Typography>
        </Box>
    </div>


  );
}

export default CauseDetails;