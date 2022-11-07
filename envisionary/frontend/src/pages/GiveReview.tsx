import '../App.css'
import { useLocation } from 'react-router-dom';
import { Accordion, AccordionSummary, Alert, Button, Rating, Snackbar, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from "../graphql/mutations"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GET_COUNTRY_DATA_BY_NAME, GET_REVIEWS_BY_COUNTRY_NAME } from '../graphql/queries';
import { IReview } from '../types';


function GiveReview() {
  const location = useLocation().state.country.Country;
  const [rating, setRating] = useState<number>(0);
  const [author, setAuthor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [invalidAuthor, setInvalidAuthor] = useState<boolean>(false);
  const [authorError, setAuthorError] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Use ADD_REVIEW mutation to add review to database
  const [addReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [ // keep local cache updated by refetching reviews after adding new review 
      {query: GET_REVIEWS_BY_COUNTRY_NAME, variables: {Country: location}}, // DocumentNode object parsed with gql
      'CountryReviewsByName' // Query name
    ]});

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
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const reviewHeaderStyling = { mt: 3, fontSize: '18px' }

  return (
    <Accordion sx={{ width: '100%' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Write a review for {location}</Typography>
      </AccordionSummary>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: '20px' }}>
        <Typography component="h1" variant="h4">Give review</Typography>

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

    </Accordion>
  );
}

export default GiveReview;
