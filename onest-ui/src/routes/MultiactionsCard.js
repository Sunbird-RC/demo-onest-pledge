import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, maxHeight } from '@mui/system';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OnestProgressBar from './progressBar';
import OnestCarousel from './imageCarousel';



export default function MultiActionAreaCard(props) {


    console.log(props);
    let navigate = useNavigate();

    const navigateToCauseDetails = (value) => {
      navigate('/causeDetails',  {state: value});
    };

    const navigateToPledge = (value) => {
      navigate('/pledge',  {state: value});
    };
  return (
        <Card sx={{maxWidth: 345 , margin: '5px', padding: '4px'}}>
            <CardActionArea onClick={() => navigateToCauseDetails(props.cause)} sx={{maxHeight: "350"}}>
                {/* <CardMedia
                component="img"
                height="140"
                image={`${props.cause.imageRef[0]}`}
                alt="green iguana"
                /> */}
                {props?.cause?.imageRef?.length > 0 &&
                  <CardMedia>
                    <OnestCarousel setFocus={null} JSXelements={props?.cause?.imageRef} />
                </CardMedia>}
                {(props?.cause?.imageRef?.length === 0 && props?.cause?.videoURL.length > 0) &&

                   <iframe width="350" height="200" style={{margin:'4px'}} src={props?.cause?.videoURL[0]} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
    
                    </iframe> 
                }
                <CardContent >
                <Typography gutterBottom variant="h6" component="div" sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                    }} >
                    {props.cause.name}
                </Typography>
                <Typography   sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                    }} 
                    variant="body2" 
                    color="text.secondary">
                    {props.cause.description}
                </Typography>
                <Typography style={{marginTop: '10px'}}>
                        <OnestProgressBar  current={props.cause.amountPledged} total={props.cause.amountNeeded}/>
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions 
            disableSpacing
            sx={{
              alignSelf: "stretch",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              // 👇 Edit padding to further adjust position
              p: 0,
            }}>
                <Button variant="contained" onClick={() => navigateToPledge(props.cause)}>
                Pledge
                </Button>
            </CardActions>
        </Card>

  );
}