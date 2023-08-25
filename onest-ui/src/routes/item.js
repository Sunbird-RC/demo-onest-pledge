import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CauseCard from "./Card";
import MultiActionAreaCard from "./MultiactionsCard";
import { height } from "@mui/system";

function Item(props) {
    const { sx, ...other } = props;


  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object
  ])
};

export default function AlignItems(props) {
    let [causeList, setCauseList] = React.useState(props.causes);


    React.useEffect(() => {
        if (props.causeType === 'All') setCauseList(props.causes);
        else {
            setCauseList(props.causes.filter(i => {
                return i.causeType === props.causeType
            }))
        }
  
    }, [props.causeType, props.causes]);
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          height: 116,
          borderRadius: 1
        }}
      >
        {causeList.map((i,j) => {
            return  < span style={{height: '450', margin:'10px'}}>
                <MultiActionAreaCard cause={i}/>
                {(j=== causeList.length-1) &&
                    <div style={{"marginBottom": '60px'}}></div>
                }
            </span > 
            // return <CauseCard  cause={i} />
            })

        }
      </Box>
    </div>
  );
}
