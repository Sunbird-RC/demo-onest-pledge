

import { Routes, Route, Outlet } from "react-router-dom";
import Projects from './routes/projects';
import About from './routes/about';

import OnestNavbar from './routes/navbar';
import Home from "./routes/Home";
import Causes from "./utils/Constants";
import { useEffect, useState } from "react";
import Pledge from "./routes/Pledge";
import CauseDetails from "./routes/CauseDetails";
import { StyledEngineProvider } from '@mui/material/styles';
import ScrollableTabsButtonPrevent from "./routes/pillBasedList";
import ConfirmationPage from "./routes/ConfirmationPage";
import { BottomNavigation, Paper, Typography } from "@mui/material";

function App() {
  const [cause, setCause] = useState(Causes);

  const footerStyles = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    background: "#EEF1FE",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 1)", // Change the background color to match your design
    padding: "5px", // Add padding as needed
    textAlign: "center",
    zIndex: 10
  };

  useEffect(() => {
    console.log(cause);
  }, []);
  return (

        <>
        <OnestNavbar />
        <StyledEngineProvider injectFirst>
          <Routes>

                  <Route path="causeDetails" element={<CauseDetails />} />
                  <Route path="home" element={<ScrollableTabsButtonPrevent />} />
                  <Route path="pledge" element={<Pledge />} />
                  <Route path="confirmationPage" element={<ConfirmationPage />} />
                  <Route path="/" element={<ScrollableTabsButtonPrevent />}>
                  
                  {/* <Route path="home" element={<Home causes={cause} />} /> */}
              </Route>

          </Routes>
          {/* <div style={footerStyles}>
            <Typography variant="body2"><b>Discovery experience enabled by    </b><img style={{marginLeft:'3px'}} src='/beehyv_logo.png'></img> </Typography>
            </div> */}
            <Paper  sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
              sx={{
                height: '40px',
                background: "#EEF1FE",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            ><Typography style={{padding: '4px'}}  variant="body2"><b>Discovery experience enabled by    </b><img style={{marginLeft:'3px'}} src='/beehyv_logo.png'></img> </Typography></BottomNavigation>
            </Paper>


          </StyledEngineProvider> 
        </>


  );
}

export default App;