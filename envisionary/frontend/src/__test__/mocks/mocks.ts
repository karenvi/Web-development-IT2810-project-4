
import { ADD_REVIEW } from "../../graphql/mutations";
import { GET_COUNTRIES, GET_REVIEWS_BY_COUNTRY_NAME } from "../../graphql/queries";





export const mocks = [
    {
      request: {
        query: GET_COUNTRIES,
        variables: {}
      },
      result: {
        data: {
            country: 
            [{ _id: "1", Area: "120538", CCA3: "PRK", Capital: "Pyongyang", Continent: "Asia", Country: "North Korea", Density: "216.2755", 
            GrowthRate: "1.0038", Population1970: "14996879", Population1980: "17973650", Population1990: "20799523", Population2000: "23367059",
            Population2010: "24686435", Population2015: "25258015", Population2020: "25867467", Population2022: "26069416", Rank: "56", 
            WorldPopulationPercentage: "0.33" },

            { _id: "2", Area: "25713", CCA3: "MKD", Capital: "Skopje", Continent: "Europe", Country: "North Macedonia", Density: "81.4218", GrowthRate: "0.9954",
            Population1970: "1656783", Population1980: "1907023", Population1990: "2044174", Population2000: "2037936", Population2010: "2093828",
            Population2015: "2107962", Population2020: "2111072", Population2022: "2093599", Rank: "150", WorldPopulationPercentage: "0.03"},

            { _id: "3", Area: "464", CCA3: "NFK", Capital: "Saipan", Continent: "Oceania", Country: "Northern Mariana Islands", Density: "106.7909", 
            GrowthRate: "1.0014", Population1970: "10143", Population1980: "17613", Population1990: "48002", Population2000: "80338", Population2010: "54087",
            Population2015: "51514", Population2020: "49587", Population2022: "49551", Rank: "210", WorldPopulationPercentage: "0"},
            ]
        }
      }
    },
    {
      request: {
        query: GET_REVIEWS_BY_COUNTRY_NAME,
        variables: { country: "Afghanistan" }
      },
      result: { 
        data: {
          countryByName: {
            Reviews: [
              { Name: "Trond", ReviewText: "Flott land å feriere i." , Date: "2022-10-26T13:50:35.783Z", Rating: 3.5 },
              { Name: "Hans og Grethe", ReviewText: "Fint og fredelig land for et idyllisk opphold på all-inclusive.", Date: "2022-10-26T13:53:34.973Z",  Rating: 5 },
              { Name: "Lisbeth", ReviewText: "Synes det var litt skummelt i Afghanistan.", Date: "2022-10-26T19:51:35.080Z", Rating: 3 }
            ]
          }
        }
      }  
    },
    {
      request: {
        query: ADD_REVIEW,
        variables: { country: "Afghanistan", reviewText: "Lorem ipsum dolor sit amet", date: "2022-10-26T13:53:34.973Z", rating: 3.5 }
      },
      restult: {
        data: {
          countryByName: {
            Reviews: [
              { Name: "Trond", ReviewText: "Flott land å feriere i." , Date: "2022-10-26T13:50:35.783Z", Rating: 3.5 },
              { Name: "Hans og Grethe", ReviewText: "Fint og fredelig land for et idyllisk opphold på all-inclusive.", Date: "2022-10-26T13:53:34.973Z",  Rating: 5 },
              { Name: "Lisbeth", ReviewText: "Synes det var litt skummelt i Afghanistan.", Date: "2022-10-26T19:51:35.080Z", Rating: 3 }
            ]
          }
        }
      }
    }
  ];


export const failMock = [
  {
    request: {
        query: GET_REVIEWS_BY_COUNTRY_NAME,
        variables: { country: "Afghanistan" }
    },
    error: new Error()
  }
];

export const noReviewsMock = [
  {
    request: {
      query: GET_REVIEWS_BY_COUNTRY_NAME,
      variables: { country: "Afghanistan" }
    },
    result: { 
      data: {
        countryByName: { Reviews: null }
      }
    }  
  }
];