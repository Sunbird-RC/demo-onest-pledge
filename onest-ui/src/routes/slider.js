import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Pledge Amount"
        defaultValue={1000}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1000}
        marks
        min={1000}
        max={20000}
      />
      {/* <Slider defaultValue={1000} step={1000} marks min={1000} max={2000} disabled /> */}
    </Box>
  );
}
