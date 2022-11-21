import { Box, Button, Checkbox, Grid, SelectChangeEvent, TableContainer, Typography, Skeleton } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { categoryState, pageState, searchQueryState } from "../states/states";
import { ICountry } from "../types";
import UserInput from "./UserInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES_PAGINATION } from "../graphql/queries";
import { AppTheme } from "../context/AppTheme";
import { ThemeContext } from "../App";
import { dropDownStyling } from "./UserInput";

const pageSize = 10;

// Styling of the table headers
const tableHeadStyling = { fontWeight: "bold" };

// Styling of next and prev buttons and add review button
export const buttonStyling = {
  backgroundColor: "#31597a", "&:hover": { backgroundColor: "#2c506d" }, "&.Mui-disabled": { backgroundColor: "#a6a6a6" }
};

const styleForTableRow: AppTheme = {
  dark: { backgroundColor: "#172a3a", color: "white", }, light: { backgroundColor: "white", color: "black", },
};

// Styling of various elements both light and dark theme
const styleInputFields = {
  dark: {
    backgroundColor: "#172a3a",
    color: "#ffffff",
    input: {
      color: "#ffffff",
    },
    "& label": {
      color: "#ffffff",
    },
    "& label.Mui-focused": {
      color: "#ffffff",
    },
    "&:hover label": {
      color: "#ffffff",
    },
    "& .MuiInput-underline:after": {
      color: "#ffffff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ffffff",
      },
      "&:hover fieldset": {
        borderColor: "#ffffff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffffff",
      },
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff !important",
    },
    "& .MuiSvgIcon-root": {
      color: "#ffffff !important",
    },
  },
  light: { color: "#000000", },
};

export const textStyling: AppTheme = {
  dark: { color: "white", }, light: { color: "black", },
};

function Countries() {
  const { theme } = useContext(ThemeContext);
  const [category, setCategory] = useRecoilState(categoryState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [page, setPage] = useRecoilState(pageState);

  // This state takes in the value from the search dropdown
  const [sortingCategory, setSortingCategory] = useState("Country-asc");

  // A clean "value" from the sorting dropdown, default country and ascending order
  const [finalSortingCategory, setFinalSortingCategory] = useState("Country");
  const [sortDescending, setSortDescending] = useState(false);
  const [hideUnreviewedCountries, setHideUnreviewed] = useState(false);

  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_COUNTRIES_PAGINATION, {
    variables: {
      limit: pageSize,
      offset: page,
      sortOn: finalSortingCategory,
      sortDesc: sortDescending,
      filterOn: category,
      searchFieldValue: searchQuery,
      hideUnreviewed: hideUnreviewedCountries,
    },
  });

  // Routing to each country
  const toCountryPage = (country: ICountry) => {
    navigate("/country", { state: { country } });
    setPage(0);
  };

  const checkIfPageInvalid = () => {
    if (data?.paginatedCountries.length < 10) {
      return true;
    }
    return false;
  };

  // Passes in values for the parameters used to sort the data in the database
  const sortData = (event: SelectChangeEvent<string>) => {
    setSortingCategory(event.target.value);
    setFinalSortingCategory(event.target.value.split("-")[0]);
    if (event.target.value.split("-")[1] === "desc") {
      setSortDescending(true);
    } else if (event.target.value.split("-")[1] === "asc") {
      setSortDescending(false);
    }
    setPage(0);
  };

  const rowStyle = { ...(theme === "light" ? styleForTableRow.light : styleForTableRow.dark), };
  const textStyle = { ...(theme === "light" ? textStyling.light : textStyling.dark), };
  const inputStyle = { ...(theme === "dark" ? styleInputFields.dark : styleInputFields.light), };
  const inputDropDownStyle = { ...(theme === "dark" ? dropDownStyling.dark : dropDownStyling.light), };

  // If the data cannot be loaded due to lack of communication between db and frontend
  if (error) return <p style={textStyle}>Error - could not load data.</p>;

  return (
    <Box component="main" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
      <Typography variant="h1" sx={{ fontSize: "45px", mt: "40px", mb: "8px" }} style={textStyle}> Search for a {category.toLowerCase()}</Typography>
      <UserInput />
      <TableContainer sx={{ width: { xs: "95%", sm: "85%", md: "75%", lg: "65%" }, m: "10px" }} component={Paper}>
        <Table aria-label="Table of countries" style={rowStyle}><TableHead>
          <TableRow style={rowStyle}>
            {/* Let user pick what the data displayed should be sorted on */}
            <TableCell colSpan={2} sx={tableHeadStyling}>
              <label htmlFor="filter-category"><span className="visually-hidden">Sort by:</span></label>
              <Box sx={{ width: "300px", ml: "10px" }}>
                <FormControl fullWidth sx={inputDropDownStyle}>
                  <InputLabel id="select-filter-category">Sort by:</InputLabel>
                  <Select labelId="select-filter-category" id="filter-category" inputProps={{ "data-testid": "select-sortby" }} value={sortingCategory} label="Sort by:" onChange={sortData} sx={inputDropDownStyle}>
                    <MenuItem value="Country-asc">Ascending country</MenuItem>
                    <MenuItem value="Continent-asc">Ascending continent</MenuItem>
                    <MenuItem value="Country-desc">Descending country</MenuItem>
                    <MenuItem value="Continent-desc">Descending continent</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </TableCell>
            <TableCell colSpan={2} sx={tableHeadStyling} align="right" style={rowStyle}>
              Hide unreviewed countries
              <Checkbox checked={hideUnreviewedCountries}
                onChange={(event) => {
                  setHideUnreviewed(event.target.checked);
                  setPage(0);
                  refetch({
                    hideUnreviewed: event.target.checked,
                    offset: 0,
                  }); // refetch to check if there are any new countries with reviews not in local cache
                }}
                inputProps={{ "aria-label": "controlled" }}
                sx={inputStyle}
              />
            </TableCell>
          </TableRow>
          {/* Displaying fetched data */}
          <TableRow style={rowStyle}>
            <TableCell sx={tableHeadStyling} style={rowStyle}>Country</TableCell>
            <TableCell sx={tableHeadStyling} align="right" style={rowStyle}>Continent</TableCell>
            <TableCell sx={tableHeadStyling} align="right" style={rowStyle}>Population (2022)</TableCell>
            <TableCell sx={tableHeadStyling} align="right" style={rowStyle}>Area (km&#178;)</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {loading
              ? ( // if data is not yet loaded, show placeholder rows with MUI's skeleton
                [...Array(10)].map((row, index) => (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} style={rowStyle}>
                    <TableCell component="th" scope="row" className="pointer" style={rowStyle}><Skeleton /></TableCell>
                    <TableCell align="right" className="pointer" style={rowStyle}><Skeleton /></TableCell>
                    <TableCell align="right" className="pointer" style={rowStyle}><Skeleton /></TableCell>
                    <TableCell align="right" className="pointer" style={rowStyle}><Skeleton /></TableCell>
                  </TableRow>
                )))
              : // if data is loaded, show real data rows
              data?.paginatedCountries.length === 0
                ? (<TableRow style={rowStyle}><TableCell style={rowStyle} colSpan={4}>Sorry, no results matched your search</TableCell></TableRow>)
                : (data?.paginatedCountries.map((row: ICountry) => (
                  <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} onClick={() => { toCountryPage(row); }} hover={true} style={rowStyle}>
                    <TableCell component="th" scope="row" className="pointer" style={rowStyle}><button className="buttonInTable">{row.Country}</button></TableCell>
                    <TableCell align="right" className="pointer" style={rowStyle}>{row.Continent}</TableCell>
                    <TableCell align="right" className="pointer" style={rowStyle}>{parseInt(row.Population2022).toLocaleString("no-NO")}</TableCell>
                    <TableCell align="right" className="pointer" style={rowStyle}>{parseInt(row.Area).toLocaleString("no-NO")}</TableCell>
                  </TableRow>
                ))
                )}

            {/* Pagination */}
            <TableRow style={rowStyle}>
              <TableCell colSpan={4} style={rowStyle}>
                {data?.paginatedCountries.length !== 0 && (
                  <Grid container direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mt: "10px", mb: "20px" }}>
                    <Grid sx={{ ml: "20px" }}><Button variant="contained" disabled={!page} onClick={() => setPage((prev) => prev - 1)} sx={buttonStyling}>Previous</Button></Grid>
                    <Grid sx={{ mb: "5px" }}>Page {page + 1}</Grid>
                    <Grid sx={{ mr: "20px" }}><Button variant="contained" disabled={checkIfPageInvalid()} onClick={() => setPage((prev) => prev + 1)} sx={buttonStyling}>Next</Button></Grid>
                  </Grid>)}
                {page >= 1 && data?.paginatedCountries.length === 0 && (<Button variant="contained" disabled={!page} onClick={() => setPage((prev) => prev - 1)} sx={buttonStyling}>Previous page</Button>)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default Countries;