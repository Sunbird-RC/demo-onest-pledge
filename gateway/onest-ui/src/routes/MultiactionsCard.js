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
                <CardMedia
                component="img"
                height="140"
                image={`${props.cause.imageRef[0]}`}
                alt="green iguana"
                />
                <CardContent >
                <Typography gutterBottom variant="h6" component="div">
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
            <CardActions>
                <Button size="small" color="primary"  onClick={() => navigateToPledge(props.cause)}>
                Pledge
                </Button>
            </CardActions>
        </Card>

  );
}