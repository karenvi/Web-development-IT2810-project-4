import '../styles/App.css'
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
import { cardStyling } from './InfoPage';
import GiveReview from '../components/GiveReview';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { useRecoilState } from 'recoil';
import { starOpacityRating } from '../states/states';
import { pageStyle } from '../styles/StyleObjects';

function Country() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const [starOpacity] = useRecoilState<number>(starOpacityRating);
  const { loading, error, data, refetch } = useQuery(GET_COUNTRY_DATA_BY_NAME, { variables: { country: location.state.country.Country } });

  // Fetches any new reviews before calculating average rating
  refetch();

  // Calculate average rating 
  let totalSum: number = 0, avrgRating: number = 0, numberOfReviews: number = 0;
  if (!loading && !error && data.countryByName.Reviews !== null) {
    data.countryByName.Reviews.map((row: IReview) => totalSum += row.Rating);
    avrgRating = totalSum / data.countryByName.Reviews.length;
    numberOfReviews = data.countryByName.Reviews.length;
  }

  // Theme
  const themeStyle = {...(theme === 'light' ? pageStyle.light : pageStyle.dark),}


  return (
    <Card sx={cardStyling} style={themeStyle}>
      <Typography component="h1" variant="h3" sx={{ m: 2, fontSize: '40px' }}>{location.state.country.Country}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: '48px', mb: 1 }}>
        <Rating name="read-only" value={avrgRating} precision={0.5} readOnly
          emptyIcon={<StarIcon style={{ opacity: starOpacity }} fontSize="inherit" />}
        />
        <Typography variant="overline" sx={{ ml: 1 }}> {avrgRating.toFixed(2)} / 5 ({numberOfReviews})</Typography>
      </Box>
      <Box sx={{ width: '100%', height: '30vw', minHeight: '350px' }}>
        <PopulationChart aria-label="Population chart" />
      </Box>
      <Container sx={{ width: '100%', display: 'flex', flexDirection: 'row', m: 4, alignItems: 'flex-start' }}>
        <Container sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="overline"><b>Population rank:</b> {location.state.country.Rank}</Typography>
          <Typography variant="overline"><b>Country code:</b> {location.state.country.CCA3}</Typography>
          <Typography variant="overline"><b>Capital:</b> {location.state.country.Capital}</Typography>
          <Typography variant="overline" align='left'><b>Continent:</b> {location.state.country.Continent}</Typography>
        </Container>
        <Container sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="overline"><b>Area:</b> {parseInt(location.state.country.Area).toLocaleString('no-NO')} km&#178;</Typography>
          <Typography variant="overline"><b>Density:</b> {location.state.country.Density} per km&#178;</Typography>
          <Typography variant="overline"><b>GDP growth rate:</b> {location.state.country.GrowthRate}</Typography>
          <Typography variant="overline" align='left'><b>Percentage of world population:</b> {location.state.country.WorldPopulationPercentage}%</Typography>
        </Container>
      </Container>
      <GiveReview />
      <Reviews />
    </Card>
  );
}

export default Country;
