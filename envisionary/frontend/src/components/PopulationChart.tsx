import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps,} from "recharts";
import { useLocation } from 'react-router-dom';
import { Box } from "@mui/material";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { ThemeContext } from "../App";
import { useContext, useEffect, useState } from "react";


function PopulationChart() {

  const location = useLocation()
  const { theme } = useContext(ThemeContext);

  // Make sure that the graph also is adjusting to the user chosen mode (light/dark)
  const [cartesianGridColor, setCartesianGridColor] = useState<string>("#ffffff");
  const [graphColor, setGraphColor] = useState<string>("#dfe9f2");


  useEffect(() => {
    if (theme === 'light') {
      setCartesianGridColor("#000000");
      setGraphColor("#26435e");
    } else {
      setCartesianGridColor("#ffffff");
      setGraphColor("#dfe9f2");
    }
  }, [theme]);

  const data = [
    {
      name: "1970",
      Population: parseInt(location.state.country.Population1970),
    },
    {
      name: "1980",
      Population: parseInt(location.state.country.Population1980),
    },
    {
      name: "1990",
      Population: parseInt(location.state.country.Population1990),
    },
    {
      name: "2000",
      Population: parseInt(location.state.country.Population2000),
    },
    {
      name: "2010",
      Population: parseInt(location.state.country.Population2010),
    },
    {
      name: "2015",
      Population: parseInt(location.state.country.Population2015),
    },
    {
      name: "2020",
      Population: parseInt(location.state.country.Population2020),
    },
    {
      name: "2022",
      Population: parseInt(location.state.country.Population2022),
    },
  ];

  // Views the population in a shortened version instead of the whole number
  const FormatYaxis = (populationNumber: number) => {
    if (populationNumber <= 999999) {
      return (populationNumber / 1000).toString() + 'K';
    } else if (populationNumber <= 999999999) {
      return (populationNumber / 1000000).toString() + 'M';
    } 
    return (populationNumber / 1000000000).toString() + 'BN';
  }


  // To confirm that the above function is working correctly.
  const validateFormatUnit = () => {
    if (FormatYaxis(100000) === "100K") {
      if (FormatYaxis(1000000) === "1M") {
        if (FormatYaxis(1000000000) === "1BN") {
          return true;
        }
      }
    } 
  }

  // Formatting for Rechart Tooltip (inspiration: https://codesandbox.io/s/unruffled-napier-pzbdld?file=/src/CustomTooltip.js:0-572)
  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>): JSX.Element | null => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{
          marginTop: { xs: "50px", md: "30px" }, p: '5px', backgroundColor: `${theme === 'dark' ? '#101d28' : 'white'}`, justifyContent: 'center', borderRadius: '10px', fontSize: { xs: '2vw', md: "1vw", xl: "0.8vw" }, boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        }}>
          <p><b>Year:</b> {label} <br /> <b>Population:</b> {payload[0].value}</p>
        </Box>
      );
    }
    return null;
  };

  return (
    <>
    {validateFormatUnit() ?
    <ResponsiveContainer height="100%" width="100%">
      <LineChart
        aria-label="Population chart"
        data={data}
        margin={{
          top: 10,
          bottom: 5,
          left: 0,
          right: 25,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" stroke={cartesianGridColor} />
        <YAxis dataKey="Population" tickFormatter={FormatYaxis} stroke={cartesianGridColor}/>
        <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: "none" }} />
        <Legend />
        <Line type="monotone" dataKey="Population" activeDot={{ r: 10 }} strokeWidth={3} stroke={graphColor} isAnimationActive={false}/>
      </LineChart>
    </ResponsiveContainer> : <p>Sorry, we are unable to preview data in correct tickFormatter.</p>}
    </>
  );
}

export default PopulationChart;