import { gql } from "@apollo/client";

// Get filtered countries on a page
export const GET_COUNTRIES_PAGINATION = gql`
query PaginatedCountries($offset: Int, $limit: Int, $sortOn: String, $sortDesc: Boolean, $filterOn: String, $searchFieldValue: String, $hideUnreviewed: Boolean) {
  paginatedCountries(offset: $offset, limit: $limit, sortOn: $sortOn, sortDesc: $sortDesc, filterOn: $filterOn, searchFieldValue: $searchFieldValue, hideUnreviewed: $hideUnreviewed) {
    _id,
    Rank,
    CCA3,
    Country,
    Capital,
    Continent,
    Population2022,
    Population2020,
    Population2015,
    Population2010,
    Population2000,
    Population1990,
    Population1980,
    Population1970,
    Area,
    Density,
    GrowthRate,
    WorldPopulationPercentage,
    __typename,
  }
}
`;

// Get country data for a specific country
export const GET_COUNTRY_DATA_BY_NAME = gql`
query GetCountryDataByName($country: String) {
  countryByName(Country: $country) {
    _id,
    Rank,
    CCA3,
    Country,
    Capital,
    Continent,
    Population2022,
    Population2020,
    Population2015,
    Population2010,
    Population2000,
    Population1990,
    Population1980,
    Population1970,
    Area,
    Density,
    GrowthRate,
    WorldPopulationPercentage,
    Reviews{
        Name,
        ReviewText,
        Date,
        Rating,
        __typename,
    },
    __typename,
    }
}
`;

// Get only country names
export const GET_COUNTRY_NAMES = gql`
query getCountryNames {
    countries {
        Country
    }
}`;