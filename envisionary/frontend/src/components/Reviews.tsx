import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY_DATA_BY_NAME } from '../graphql/queries';
import { IReview } from "../types"
import PaginationReviews from "./PaginationReviews";
import { textStyling } from '../styles/StyleObjects';
import { useContext } from 'react';
import { ThemeContext } from '../App';

function Reviews() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_COUNTRY_DATA_BY_NAME, { variables: { country: location.state.country.Country } });
  
  // Theme
  const textStyle = {...(theme === "light" ? textStyling.light : textStyling.dark),};

  if (loading) return <p style={textStyle}>Loading reviews ...</p>;
  if (error) return <p style={textStyle}>Could not get reviews</p>;

  // Order reviews from new-old
  const sortReviews = () => {
    if (data.countryByName.Reviews) {
      let reviews = [...data?.countryByName?.Reviews];
      reviews.sort((firstReview: IReview, nextReview: IReview) => Date.parse(nextReview.Date) - Date.parse(firstReview.Date));
      return reviews
    }
    return [];
  }

  return (
    <>
      <PaginationReviews sortReviews={sortReviews()} country={location.state.country.Country} />
    </>
  );
}
export default Reviews;