import '../styles/App.css'
import { useLocation } from 'react-router-dom';
import { Alert, Button, IconButton, Modal, Rating, Snackbar, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/system';
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from "../graphql/mutations"
import { GET_COUNTRY_DATA_BY_NAME } from '../graphql/queries';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeContext } from '../App';
import { useRecoilState } from 'recoil';
import { starOpacityRating, toggleColorTheme } from '../states/states';
import { buttonStyling } from '../components/Countries';

// Miscellanous styling both for light and dark theme
const styleTitleOfReviews = { width: "100%", display: 'flex', justifyContent: 'flex-start', mb: "20px"};

// Styling of modal
const modalStyle = {
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

const reviewHeaderStyling = { mt: 3, fontSize: '18px' }

// Dark and light mode styling
const giveReviewStyle = {
  dark: {
      backgroundColor: '#1e374c',
      color: '#ffffff',
  },
  light: {
      backgroundColor: 'white',
      color: 'black',
  },
}

const inputReviewStyle = {
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


function GiveReview() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const [rating, setRating] = useState<number>(0);
  const [author, setAuthor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [invalidAuthor, setInvalidAuthor] = useState<boolean>(false);
  const [authorError, setAuthorError] = useState<string>(" ");
  const [clear, setClear] = useState("false");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const [starOpacity] = useRecoilState<number>(starOpacityRating);
  const [toggleColor] = useRecoilState<string>(toggleColorTheme);

  //Functions of setters that are being used multiple times to clear the review field:
  const clearReview = () => {
    setAuthor("");
    setReviewText("");
    setRating(0);
    setOpenModal(false);
  }
  // Use ADD_REVIEW mutation to add review to database
  const [addReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [ // keep local cache updated by refetching reviews after adding new review 
      {query: GET_COUNTRY_DATA_BY_NAME, variables: {country: location.state.country.Country}},
    ]});

  // onChange-functions for the modal that opens "Give review"
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => {
    setOpenModal(false);
    clearReview();
  }


  // Validation of give review input fields 

  const validation = () => {
    const validateNameRegex = /^[a-zA-Z]/; // names should start with normal letters
    const emptyFieldRegex = /^\s*$/; // checks for whitespaces

    if (author.length > 40) {
      setInvalidAuthor(true);
      setAuthorError("Name cannot be longer than 40 characters");
      return false
    }
    else if (emptyFieldRegex.test(author)) { // if name field is empty
      setInvalidAuthor(true);
      setAuthorError("Name is required");
      return false
    }
    else if (!validateNameRegex.test(author)) { // if name does not start with normal letters
      setInvalidAuthor(true);
      setAuthorError("A name must start with normal letters (a-z)");
      return false
    }
    else { // else, name is valid
      setInvalidAuthor(false);
      setAuthorError(" ");
      return true
    }
  }

  const submit = () => {
    if (validation()) {
      addReview({
        variables:
        {
          country: location.state.country.Country,
          name: author,
          reviewText: reviewText,
          date: new Date().toISOString(),
          rating: rating
        }
      });
      setOpen(true);// Opens the success alert.
      clearReview();

      // Clears the country field
      if (clear === "false") {
        setClear("true")
      } else {
        setClear("false")
      }
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }



  const reviewStyle = {
    ...(theme === 'light' ? giveReviewStyle.light : giveReviewStyle.dark),
  }

  const reviewInputStyle = {
    ...(theme === 'light' ? inputReviewStyle.light : inputReviewStyle.dark),
  }

  return (
    <>
    <Box sx={styleTitleOfReviews}><Typography component="h2" variant="h6">Reviews of {location.state.country.Country}:</Typography></Box>
    <Box sx={styleTitleOfReviews}>
      <Button
        endIcon={<EditIcon />}
        id="button-write-review"
        variant="contained"
        onClick={handleModalOpen}
        sx={buttonStyling}
      >
       Review {location.state.country.Country}
      </Button>
      </Box>
      <Modal open={openModal}
        onClose={handleModalClose}
      >
        
      <Box sx={modalStyle} style={reviewStyle}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <Typography component="h1" variant="h6">Write a review for {location.state.country.Country}</Typography>
          <IconButton aria-label="close modal" onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography component="label" htmlFor="name-field" variant="h6" sx={{ mt: 1, fontSize: '18px' }}>Name *</Typography>
        <Box sx={{width: '50%', minWidth: '100px'}}>
        <TextField id="name-field"
          required
          label=""
          placeholder="Name"
          variant="outlined"
          value={author}
          error={invalidAuthor}
          helperText={authorError}
          onChange={(e) => setAuthor(e.target.value)}
          sx={reviewInputStyle}
        />
        </Box>

        <Typography component="label" htmlFor="rating-stars" variant="h6" sx={{ mt: 1, fontSize: '18px' }}>Rating</Typography>
        <Rating id="rating-stars"
          name="hover-feedback"
          value={rating}
          precision={0.5}
          onChange={(event, newValue) => {
            newValue === null ? setRating(0) : setRating(newValue);
          }}
          emptyIcon={<StarIcon style={{ opacity: starOpacity }} fontSize="inherit" />}
        />

        <Typography component="label" htmlFor="review-content-field" variant="h6" sx={reviewHeaderStyling}>Review Content</Typography>
        <Box sx={{width: '50vw', minWidth: '100px', maxWidth: '450px', mb: "20px"}}>
        <TextField
          id="review-content-field"
          label=""
          placeholder="Write your review..."
          multiline
          rows={7}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={reviewInputStyle}
          InputProps={{ inputProps: { style: { color: toggleColor }}}}
        />
        </Box>

        <Button variant="contained"
          sx={buttonStyling}
          onClick={(event) => {
            event.preventDefault();
            submit()
          }}
        >
          Submit
        </Button>
      </Box>
      </Modal>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Review successfully given!
        </Alert>
      </Snackbar>
    </>
  );
}

export default GiveReview;
