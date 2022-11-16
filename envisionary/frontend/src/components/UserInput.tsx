import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRecoilState } from 'recoil';
import { categoryState, pageState, searchQueryState } from '../states/states';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import { useContext } from 'react';

export const dropDownStyling = {
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
  light: {
    color: "#000000",
  },
};

const inputBoxStyle = {
  dark: {
    backgroundColor: '#172a3a',
    color: "#ffffff",
},
light: {
    backgroundColor: '#ffffff',
    color: '#000000'
},
}

const searchQueryStyle = {
  dark: {
    backgroundColor: '#172a3a',
    color: "#ffffff",

    input: {
      color: "#ffffff",
    },
    "& label": {
      color: "#ffffff",
    },
    "& label.MuiFocused": {
      color: "#ffffff",
    },
    "&:hover label": {
      color: "#ffffff",
    },
    "& .MuiInputUnderline:after": {
      color: "#ffffff",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: '#ffffff',
      }
    },
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: '#ffffff',
    },
    '&:hover fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: '#ffffff',
    },
  },
  light: {
      backgroundColor: 'white',
  },
}


// This component takes in a search query from user and what category the user has picked to search in.
function UserInput() {
  const { theme } = useContext(ThemeContext);
  const [category, setCategory] = useRecoilState(categoryState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [page, setPage] = useRecoilState(pageState);
  const navigate = useNavigate();

  const labelSearch = "Search for " + category.toLowerCase();

  // To ensure that the SPA requirement is achieved in the search (doesnt change url on search)
  async function onSubmit(e: React.FormEvent) {
    navigate(``, { replace: true });
    e.preventDefault();
  }

  const searchStyle = {
      ...(theme === 'light' ? searchQueryStyle.light : searchQueryStyle.dark),
  }

  const inputStyle = {
    ...(theme === 'light' ? inputBoxStyle.light : inputBoxStyle.dark),
  }

  const dropdownStyle = {
    ...(theme === 'light' ? dropDownStyling.light : dropDownStyling.dark),
  }

  return (
    <Box
      sx={{
        m: 5, p: '35px', width: '60%', maxWidth: '450px', display: 'flex', justifyContent: 'center',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        borderRadius: '10px'
      }}
      style={inputStyle}
    >
      <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
        <TextField
          label={labelSearch}
          inputProps={{ "data-testid": "search-test" }}
          variant="outlined"
          type="text"
          id="header-search"
          name="s"
          value={searchQuery}
          onInput={(event) => {
            setSearchQuery((event.target as HTMLInputElement).value);
            setPage(0);
          }}
          sx={searchStyle}
        />
      </form>
      <FormControl fullWidth sx={{ width: '150px', ml: "10px" }}>
        <InputLabel id="demo-simple-select-label" sx={dropdownStyle}>Category:</InputLabel>
        <label htmlFor="demo-simple-select">
          <span className="visually-hidden">Select which category to search in</span>
        </label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          inputProps={{ "data-testid": "select-test" }}
          value={category}
          label="Category:"
          onChange={(event) => { setCategory(event.target.value as string) }}
          sx={dropdownStyle}
        >
          <MenuItem value='Country'>Country</MenuItem>
          <MenuItem value='Continent'>Continent</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
export default UserInput;