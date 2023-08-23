import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import CauseCard from "./Card";
import { Grid } from "@mui/material";

function CauseList(props) {

    let [causeList, setCauseList] = useState(props.causes);

    useEffect(() => {
        if (props.causeType === 'All Categories') setCauseList(props.causes);
        else {
            setCauseList(props.causes.filter(i => {
                return i.causeType === props.causeType
            }))
        }

    }, [props.causeType]);

  return (
    <Grid container justify = "center">
        <Row className="justify-content-md-center">{causeList.map((i) => {
            return <CauseCard cause={i} />
            })

            }
        </Row>
    </Grid>


  );
}

export default CauseList;