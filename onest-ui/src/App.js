

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

function App() {
  const [cause, setCause] = useState(Causes);

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
        </StyledEngineProvider> 
        </>


  );
}

export default App;