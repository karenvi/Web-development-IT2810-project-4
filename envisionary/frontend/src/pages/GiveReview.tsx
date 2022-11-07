import '../App.css'
import { useLocation } from 'react-router-dom';
import { Accordion, AccordionSummary, Alert, Button, Rating, Snackbar, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from "../graphql/mutations"


const styleTitleOfReviews = { width: "100%", display: 'flex', justifyContent: 'flex-start', mb: "20px"};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function GiveReview() {
  const location = useLocation().state.country.Country;
  const [rating, setRating] = useState<number>(0);
  const [author, setAuthor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [invalidAuthor, setInvalidAuthor] = useState<boolean>(false);
  const [authorError, setAuthorError] = useState<string>("");
  const [clear, setClear] = useState("false")
  const [open, setOpen] = useState(false)

  // Use ADD_REVIEW mutation to add review to database
  const [addReview] = useMutation(ADD_REVIEW);

  // onChange-functions for the modal that opens "Give review"
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      setAuthorError("");
      return true
    }
  }

  const submit = () => {
    if (validation()) {
      addReview({
        variables:
        {
          country: location,
          name: author,
          reviewText: reviewText,
          date: new Date().toISOString(),
          rating: rating
        }
      });
      setOpen(true) // Opens the success alert.

      setAuthor("");
      setReviewText("");
      setRating(0);

      // Clears the country field
      if (clear === "false") {
        setClear("true")
      } else {
        setClear("false")
      }
    }
  }

  // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // }

  const reviewHeaderStyling = { mt: 3, fontSize: '18px' }

  return (
    <>
    <Box sx={styleTitleOfReviews}><Typography variant="h6">Reviews of {location}:</Typography></Box>
    <Box sx={{ width: '100%', mb: "40px" }}>
      <Button
        endIcon={<EditIcon />}
        id="button-write-review"
        variant="contained"

      >
        Write a review for {location}
      </Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pl: '20px', pb: '20px', pr: '20px'}}>
        <Typography component="label" htmlFor="name-field" variant="h6" sx={{ mt: 1, fontSize: '18px' }}>Name *</Typography>
        <TextField id="name-field"
          required
          label=""
          sx={{ width: 250 }}
          placeholder="Name"
          variant="outlined"
          value={author}
          error={invalidAuthor}
          helperText={authorError}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <Typography component="label" htmlFor="rating-stars" variant="h6" sx={{ mt: 1, fontSize: '18px' }}>Rating</Typography>
        <Rating id="rating-stars"
          name="hover-feedback"
          value={rating}
          precision={0.5}
          onChange={(event, newValue) => {
            newValue === null ? setRating(0) : setRating(newValue);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />

        <Typography component="label" htmlFor="review-content-field" variant="h6" sx={reviewHeaderStyling}>Review Content</Typography>
        <TextField
          id="review-content-field"
          label=""
          placeholder="Write your review..."
          multiline
          rows={7}
          sx={{ width: '50vw', maxWidth: 500 }}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <Button variant="contained"
          sx={{ backgroundColor: '#172A3A', '&:hover': { backgroundColor: '#172A3A' }, mt: 3, mb: 2 }}
          onClick={(event) => {
            event.preventDefault();
            submit()
          }}
        >
          Submit
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Review successfully given!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
    </>
  );
}

export default GiveReview;
