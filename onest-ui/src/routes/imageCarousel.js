import React, { useState } from 'react';
// import './App.css';
import Carousel from 'react-material-ui-carousel'
import { CardMedia, Paper } from '@mui/material';

let elements = [
  <iframe width="560" height="315" src="https://www.youtube.com/embed/eKL3TceSxvk?si=XSejtnDzrX3QgLOC" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>,
  <iframe width="560" height="315" src="https://www.youtube.com/embed/xkthhGX-fuA?si=5tWufTiJeQzq_XWy" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>,
  <iframe width="560" height="315" src="https://www.youtube.com/embed/m7B4qtmgHkk?si=slvMlMS694N4597k" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>,
  <img src='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?q=10&h=200'></img>
]

export default function OnestCarousel( props ) {

  let {JSXelements, setFocus} = props

  return (

      <Carousel
        
        width={345}
        height={140}
        stopAutoPlayOnHover={true}
        indicators={true} //dots below element
        cycleNavigation={true} //set false to stop autoplay
        swipe={true}//for swiping on vids
        autoPlay={true}//make true for auto play
        interval={4000} //set time in ms
        navButtonsAlwaysVisible={false} //false to make nav button apear on hover
        // next={(next, active) => { console.log(`we left ${active}, and are now at ${next}`); setFocus(next); }}
        // prev={(prev, active) => { console.log(`we left ${active}, and are now at ${prev}`); setFocus(prev); }}
      >
        {
          JSXelements?.map((item, i) => 
          <CardMedia
                component="img"
                width="345"
                height="140"
                image={`${item}`}
                alt="green iguana"
          />)
        }
      </Carousel>

  )
}


// function App() {
//   const [onFocus, setOnFocus] = useState(null)
//   const setFocus = (focusOn) => {
//     if (focusOn === undefined || focusOn === null) {
//       setOnFocus(null);
//       return;
//     }
//     if (focusOn >= 0) {
//       setOnFocus(focusOn)
//     }
//   }

//   return (

//     <>
//       <Example setFocus={setFocus} JSXelements={elements} />
//     </>
//   );

// };
// export default App;