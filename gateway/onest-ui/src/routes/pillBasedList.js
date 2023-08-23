import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Categories from "../utils/Categories";
import CheckIcon from '@mui/icons-material/Check';
import Chip from '@mui/joy/Chip';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import CauseList from "./CauseList";
import Causes from "../utils/Constants";
import { Container, Row} from "react-bootstrap";
import _axios from 'axios';
import config from "../config/config";
import AlignItems from "./item";

export default function ScrollableTabsButtonPrevent() {
  const [value, setValue] = React.useState(0);
  const [categories, setCategories] = React.useState(Categories);
  const [selected, setSelected] = React.useState('All Categories');
  let [causes, setCauses] = React.useState(Causes);
  const baseUrl = `${config.BackendURL}`

  const getData = async () => {
    const { data } = await _axios.get(`${baseUrl}/api/v1/Cause/getAllCauses`);
    // setCauses(data);
  };
  
  React.useEffect(() => {
    // getData()
  },[])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
            <>
                <Box sx={{ width: 1, marginTop: '10px',bgcolor: "background.paper" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons={false}
                        aria-label="scrollable prevent tabs example"
                    >
                        {categories.map((name) => {
                            const checked = selected === name;
                            return (
                            <Chip
                            style={{margin:'3px'}}
                                key={name}
                                variant="plain"
                                color={checked ? 'primary' : 'neutral'}
                                startDecorator={
                                checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                                }
                            >
                                <Radio
                                variant="outlined"
                                color={checked ? 'primary' : 'neutral'}
                                disableIcon
                                overlay
                                label={name}
                                value={name}
                                checked={checked}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                    setSelected(name);
                                    }
                                }}
                                />
                            </Chip>
                            );
                        })}
                    </Tabs>
                </Box>
                {/* <Row>
                    <CauseList causes={causes} causeType={selected}/>
                </Row> */}
                <AlignItems causes={causes} causeType={selected} />
            </>
           

  );
}
