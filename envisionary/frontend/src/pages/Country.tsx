import '../App.css'
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Rating, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Reviews from '../components/Reviews';
import PopulationChart from '../components/PopulationChart';
import StarIcon from '@mui/icons-material/Star';
import { useQuery } from '@apollo/client';
import { IReview } from '../types';
import { GET_COUNTRY_DATA_BY_NAME } from '../graphql/queries';

function Country() {
  const location = useLocation();
  const { loading, error, data, refetch } = useQuery(
    GET_COUNTRY_DATA_BY_NAME, { variables: { country: location.state.country.Country } });

  // Fetches any new reviews before calculating average rating
  refetch();

  // Calculate average rating 
  let totalSum: number = 0, avrgRating: number = 0, numberOfReviews: number = 0;
  if (!loading && !error && data.countryByName.Reviews !== null) {
    data.countryByName.Reviews.map((row: IReview) => totalSum += row.Rating);
    avrgRating = totalSum / data.countryByName.Reviews.length;
    numberOfReviews = data.countryByName.Reviews.length;
  }


  return (
    <Card 
      component="main"
      sx={{m: '3%', width: '50%', minWidth: '520px', display: 'flex', flexDirection: 'column', 
      justifyContent: 'center', alignItems: 'center', p: 5
    }}>
      <Typography variant="h3" sx={{ m: 2 }}>{location.state.country.Country}</Typography>
      <Box aria-label="Average rating" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: '48px', mb: 1 }}>
        <Rating name="read-only" value={avrgRating} precision={0.5} readOnly
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Typography variant="overline" sx={{ ml: 1 }}> {avrgRating.toFixed(2)} / 5 ({numberOfReviews} {numberOfReviews === 1 ? "review" : "reviews"})</Typography>
      </Box>
      <Box sx={{ width: '45vw', minWidth: '500px', height: '30vw', minHeight: '350px' }}>
        <PopulationChart aria-label="Population chart"/>
      </Box>
      <Container aria-label="Information about country" sx={{ width: '670px', display: 'flex', flexDirection: 'row', m: 4, justifyContent: 'center', alignItems: 'flex-start' }}>
        <Box sx={{ width: '220px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mr: '1vw' }}>
          <Typography variant="overline" aria-label="Population rank"><b>Population rank:</b> {location.state.country.Rank}</Typography>
          <Typography variant="overline" aria-label="Country code"><b>Country code:</b> {location.state.country.CCA3}</Typography>
          <Typography variant="overline" aria-label="Capital"><b>Capital:</b> {location.state.country.Capital}</Typography>
          <Typography variant="overline"  aria-label="Continent" align='left'><b>Continent:</b> {location.state.country.Continent}</Typography>
        </Box>
        <Box sx={{ width: '330px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="overline" aria-label="Area"><b>Area:</b> {parseInt(location.state.country.Area).toLocaleString()} km&#178;</Typography>
          <Typography variant="overline" aria-label="Density"><b>Density:</b> {location.state.country.Density} per km&#178;</Typography>
          <Typography variant="overline" aria-label="GDP growth rate"><b>GDP growth rate:</b> {location.state.country.GrowthRate}</Typography>
          <Typography variant="overline"  aria-label="World percentage" align='left'><b>Percentage of world population:</b> {location.state.country.WorldPopulationPercentage}%</Typography>
        </Box>
      </Container>
      <Reviews />
    </Card>
  );
}

export default Country;
