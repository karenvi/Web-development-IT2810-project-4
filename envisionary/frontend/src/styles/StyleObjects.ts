import { AppTheme } from "../context/AppTheme";

// Used in InfoPage and Country
export const pageStyle: AppTheme = {
    dark: {
        backgroundColor: '#172a3a',
        color: '#ffffff',
    },
    light: {
        backgroundColor: '#ffffff',
        color: '#000000',
    },
  }

// Used in UserInput

//(The below is used in both UserInput and Countries)
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
  
export const inputBoxStyle = {
    dark: { backgroundColor: '#172a3a', color: "#ffffff",}, light: { backgroundColor: '#ffffff', color: '#000000'},
  }
  
export const searchQueryStyle = {
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
        backgroundColor: '#ffffff',
    },
  }

// Used in PaginationReviews
export const paginationReviewsStyle: AppTheme = {
    dark: { backgroundColor: '#1e374c', color: '#ffffff',}, light: { backgroundColor: '#ffffff', color: '#000000',},
}

// Used in GiveReview
// - Miscellanous styling both for light and dark theme
export const styleTitleOfReviews = { width: "100%", display: 'flex', justifyContent: 'flex-start', mb: "20px"};

// - Styling of modal
export const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  maxWidth: '500px',
  minWidth: '100px',
  bgcolor: '#ffffff',
  p: 4,
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'flex-start',
  boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  borderRadius: '10px',
};

export const reviewHeaderStyling = { mt: 3, fontSize: '18px' }

// - Dark and light mode styling
export const giveReviewStyle = {
  dark: {
      backgroundColor: '#1e374c',
      color: '#ffffff',
  },
  light: {
      backgroundColor: 'white',
      color: 'black',
  },
}

export const inputReviewStyle = {
    dark: {
      width: '100%',
      input: {
        color: "#ffffff",
      },
      '& fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: '#ffffff',
      },
      '&:hover fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: '#ffffff',
      },
    },
    light: {
      width: '100%',
    },  
}

// Used in Countries and GiveReview

// - Styling of the table headers
export const tableHeadStyling = { fontWeight: "bold" };

// - Styling of next and prev buttons and add review button
export const buttonStyling = {
  backgroundColor: "#31597a", "&:hover": { backgroundColor: "#2c506d" }, "&.Mui-disabled": { backgroundColor: "#a6a6a6" }
};

export const styleForTableRow: AppTheme = {
  dark: { backgroundColor: "#172a3a", color: "white", }, light: { backgroundColor: "white", color: "black", },
};

// - Styling of various elements both light and dark theme
export const styleInputFields = {
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
