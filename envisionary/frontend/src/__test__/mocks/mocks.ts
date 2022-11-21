
import { ADD_REVIEW } from "../../graphql/mutations";
import { GET_COUNTRIES_PAGINATION, GET_COUNTRY_DATA_BY_NAME } from "../../graphql/queries";


export const mocks = [
    {
      request: {
        query: GET_COUNTRIES_PAGINATION,
        variables: {
          offset: 0, 
          limit: 10, 
          sortOn: "Country", 
          sortDesc: false, 
          filterOn: "Country", 
          searchFieldValue: "", 
          hideUnreviewed: false
        }
      },
      result: {
        data: {
            paginatedCountries: 
            [{ _id: "1", Area: "120538", CCA3: "PRK", Capital: "Pyongyang", Continent: "Asia", Country: "North Korea", Density: "216.2755", 
            GrowthRate: "1.0038", Population1970: "14996879", Population1980: "17973650", Population1990: "20799523", Population2000: "23367059",
            Population2010: "24686435", Population2015: "25258015", Population2020: "25867467", Population2022: "26069416", Rank: "56",
            WorldPopulationPercentage: "0.33", __typename: "Country"},

            { _id: "2", Area: "25713", CCA3: "MKD", Capital: "Skopje", Continent: "Europe", Country: "North Macedonia", Density: "81.4218", GrowthRate: "0.9954",
            Population1970: "1656783", Population1980: "1907023", Population1990: "2044174", Population2000: "2037936", Population2010: "2093828",
            Population2015: "2107962", Population2020: "2111072", Population2022: "2093599", Rank: "150", WorldPopulationPercentage: "0.03", __typename: "Country"},

            { _id: "3", Area: "464", CCA3: "NFK", Capital: "Saipan", Continent: "Oceania", Country: "Northern Mariana Islands", Density: "106.7909",
            GrowthRate: "1.0014", Population1970: "10143", Population1980: "17613", Population1990: "48002", Population2000: "80338", Population2010: "54087",
            Population2015: "51514", Population2020: "49587", Population2022: "49551", Rank: "210", WorldPopulationPercentage: "0", __typename: "Country"},
            
            { _id: "4", Area: "330803", CCA3: "MYS", Capital: "Kuala Lumpur", Continent: "Asia", Country: "Malaysia", Density: "102.5934", 
            GrowthRate: "1.0109", Population1970: "10306508", Population1980: "13215707", Population1990: "17517054", Population2000: "22945150", 
            Population2010: "28717731", Population2015: "31068833", Population2020: "33199993", Population2022: "33938221", Rank: "45", WorldPopulationPercentage: "0.43",
            __typename: "Country"},
            ]
        }
      }
    },
    {
    request: {
      query: GET_COUNTRY_DATA_BY_NAME,
      variables: { country: "Afghanistan" }
    },
    result: {
      data: {
        countryByName: {
          _id: "6356ca3fd3267793f779b96c",
          Rank: "36",
          CCA3: "AFG",
          Country: "Afghanistan",
          Capital: "Kabul",
          Continent: "Asia",
          Population2022: "41128771",
          Population2020: "38972230",
          Population2015: "33753499",
          Population2010: "28189672",
          Population2000: "19542982",
          Population1990: "10694796",
          Population1980: "12486631",
          Population1970: "10752971",
          Area: "652230",
          Density: "63.0587",
          GrowthRate: "1.0257",
          WorldPopulationPercentage: "0.52",
          Reviews: [
            {
              Name: "Trond",
              ReviewText: "Flott land å feriere i.",
              Date: "2022-10-26T13:50:35.783Z",
              Rating: 3.5,
              __typename: "Review"
            },
            {
              Name: "Hans og Grethe",
              ReviewText: "Fint og fredelig land for et idyllisk opphold på all-inclusive.",
              Date: "2022-10-26T13:53:34.973Z",
              Rating: 5,
              __typename: "Review"
            },
            { 
              Name: "Lisbeth", 
              ReviewText: "Synes det var litt skummelt i Afghanistan.", 
              Date: "2022-10-26T19:51:35.080Z", 
              Rating: 3,
              __typename: "Review" 
            }
          ],
          __typename: "Country"
        }
      }
    }
  },
  {
  request: {
    query: ADD_REVIEW,
    variables: { country: "Afghanistan", name:"Doctor Ivo Robotnik", reviewText: "", date: new Date(), rating: 0 }
  },
  result: {
    data: {
      countryByName: {
        Reviews: [
          { 
            Name: "Trond", ReviewText: "Flott land å feriere i.", 
            Date: "2022-10-26T13:50:35.783Z", 
            Rating: 3.5,
            __typename: "Review"
            },
          { 
            Name: "Hans og Grethe", 
            ReviewText: "Fint og fredelig land for et idyllisk opphold på all-inclusive.",
            Date: "2022-10-26T13:53:34.973Z", 
            Rating: 5,
            __typename: "Review"
          },
          { 
            Name: "Lisbeth", 
            ReviewText: "Synes det var litt skummelt i Afghanistan.", 
            Date: "2022-10-26T19:51:35.080Z", 
            Rating: 3,
            __typename: "Review" 
          }
        ],
        __typename: "Country"
      }
    }
  }
},
  {
    request: {
      query: GET_COUNTRIES_PAGINATION,
      variables: {
        offset: 1, 
        limit: 10, 
        sortOn: "Country", 
        sortDesc: false, 
        filterOn: "Country", 
        searchFieldValue: "", 
        hideUnreviewed: false
      }
    },
    result: {
      data: {
          paginatedCountries: 
          [{ _id: "1", Area: "120538", CCA3: "PRK", Capital: "Pyongyang", Continent: "Asia", Country: "North Korea", Density: "216.2755", 
          GrowthRate: "1.0038", Population1970: "14996879", Population1980: "17973650", Population1990: "20799523", Population2000: "23367059",
          Population2010: "24686435", Population2015: "25258015", Population2020: "25867467", Population2022: "26069416", Rank: "56",
          WorldPopulationPercentage: "0.33", __typename: "Country"},

          { _id: "2", Area: "25713", CCA3: "MKD", Capital: "Skopje", Continent: "Europe", Country: "North Macedonia", Density: "81.4218", GrowthRate: "0.9954",
          Population1970: "1656783", Population1980: "1907023", Population1990: "2044174", Population2000: "2037936", Population2010: "2093828",
          Population2015: "2107962", Population2020: "2111072", Population2022: "2093599", Rank: "150", WorldPopulationPercentage: "0.03", __typename: "Country"},
          ]
      }
    }
  }
];


export const failMock = [
  {
    request: {
        query: GET_COUNTRY_DATA_BY_NAME,
        variables: { country: "Afghanistan" }
    },
    error: new Error()
  }
];

export const noReviewsMock = [
  {
    request: {
      query: GET_COUNTRY_DATA_BY_NAME,
      variables: { country: "Afghanistan" }
    },
    result: { 
      data: {
        countryByName: {
          _id: "6356ca3fd3267793f779b96c",
          Rank: "36",
          CCA3: "AFG",
          Country: "Afghanistan",
          Capital: "Kabul",
          Continent: "Asia",
          Population2022: "41128771",
          Population2020: "38972230",
          Population2015: "33753499",
          Population2010: "28189672",
          Population2000: "19542982",
          Population1990: "10694796",
          Population1980: "12486631",
          Population1970: "10752971",
          Area: "652230",
          Density: "63.0587",
          GrowthRate: "1.0257",
          WorldPopulationPercentage: "0.52",
          Reviews: null,
          __typename: "Country" 
        }
      }
    }  
  }
];
export const differentQueryMocks = [
    {
      request: {
        query: GET_COUNTRIES_PAGINATION,
        variables: {
          offset: 0, 
          limit: 10, 
          sortOn: "Country", 
          sortDesc: false, 
          filterOn: "Country", 
          searchFieldValue: "north", 
          hideUnreviewed: false
        }
      },
      result: {
        data: {
            paginatedCountries: 
            [{ _id: "1", Area: "120538", CCA3: "PRK", Capital: "Pyongyang", Continent: "Asia", Country: "North Korea", Density: "216.2755", 
            GrowthRate: "1.0038", Population1970: "14996879", Population1980: "17973650", Population1990: "20799523", Population2000: "23367059",
            Population2010: "24686435", Population2015: "25258015", Population2020: "25867467", Population2022: "26069416", Rank: "56",
            WorldPopulationPercentage: "0.33", __typename: "Country"},

            { _id: "2", Area: "25713", CCA3: "MKD", Capital: "Skopje", Continent: "Europe", Country: "North Macedonia", Density: "81.4218", GrowthRate: "0.9954",
            Population1970: "1656783", Population1980: "1907023", Population1990: "2044174", Population2000: "2037936", Population2010: "2093828",
            Population2015: "2107962", Population2020: "2111072", Population2022: "2093599", Rank: "150", WorldPopulationPercentage: "0.03", __typename: "Country"},

            { _id: "3", Area: "464", CCA3: "NFK", Capital: "Saipan", Continent: "Oceania", Country: "Northern Mariana Islands", Density: "106.7909",
            GrowthRate: "1.0014", Population1970: "10143", Population1980: "17613", Population1990: "48002", Population2000: "80338", Population2010: "54087",
            Population2015: "51514", Population2020: "49587", Population2022: "49551", Rank: "210", WorldPopulationPercentage: "0", __typename: "Country"},
            ]
        }
      }
    },
    {
      request: {
        query: GET_COUNTRIES_PAGINATION,
        variables: {
          offset: 0, 
          limit: 10, 
          sortOn: "Country", 
          sortDesc: false, 
          filterOn: "Country", 
          searchFieldValue: "aaa", 
          hideUnreviewed: false
        }
      },
      result: {
        data: {
            paginatedCountries: 
            []
        }
      }
    }
  ];

export const errorMock = [
    {
      request: {
        query: GET_COUNTRIES_PAGINATION,
        variables: {
          offset: 0, 
          limit: 10, 
          sortOn: "Country", 
          sortDesc: false, 
          filterOn: "Country", 
          searchFieldValue: "", 
          hideUnreviewed: false
        }
      },
      error: new Error("An error occurred")
    }
  ];

export const hideReviewedCountriesMock = [
    {
      request: {
        query: GET_COUNTRIES_PAGINATION,
        variables: {
          offset: 0, 
          limit: 10, 
          sortOn: "Country", 
          sortDesc: false, 
          filterOn: "Country", 
          searchFieldValue: "", 
          hideUnreviewed: true
        }
      },
      result: {
        data: {
            paginatedCountries: 
            [{ _id: "1", Area: "120538", CCA3: "PRK", Capital: "Pyongyang", Continent: "Asia", Country: "North Korea", Density: "216.2755", 
            GrowthRate: "1.0038", Population1970: "14996879", Population1980: "17973650", Population1990: "20799523", Population2000: "23367059",
            Population2010: "24686435", Population2015: "25258015", Population2020: "25867467", Population2022: "26069416", Rank: "56",
            WorldPopulationPercentage: "0.33", __typename: "Country"}]
        }
      }
    }
  ];

  export const sortMock = [
    {
      request: {
        query: GET_COUNTRIES_PAGINATION,
        variables: {
          offset: 0, 
          limit: 10, 
          sortOn: "Country", 
          sortDesc: true, 
          filterOn: "Country", 
          searchFieldValue: "", 
          hideUnreviewed: false
        }
      },
      result: {
        data: {
            paginatedCountries: 
            [{ _id: "3", Area: "464", CCA3: "NFK", Capital: "Saipan", Continent: "Oceania", Country: "Northern Mariana Islands", Density: "106.7909",
            GrowthRate: "1.0014", Population1970: "10143", Population1980: "17613", Population1990: "48002", Population2000: "80338", Population2010: "54087",
            Population2015: "51514", Population2020: "49587", Population2022: "49551", Rank: "210", WorldPopulationPercentage: "0", __typename: "Country"},

            { _id: "2", Area: "25713", CCA3: "MKD", Capital: "Skopje", Continent: "Europe", Country: "North Macedonia", Density: "81.4218", GrowthRate: "0.9954",
            Population1970: "1656783", Population1980: "1907023", Population1990: "2044174", Population2000: "2037936", Population2010: "2093828",
            Population2015: "2107962", Population2020: "2111072", Population2022: "2093599", Rank: "150", WorldPopulationPercentage: "0.03", __typename: "Country"},

            { _id: "1", Area: "120538", CCA3: "PRK", Capital: "Pyongyang", Continent: "Asia", Country: "North Korea", Density: "216.2755", 
            GrowthRate: "1.0038", Population1970: "14996879", Population1980: "17973650", Population1990: "20799523", Population2000: "23367059",
            Population2010: "24686435", Population2015: "25258015", Population2020: "25867467", Population2022: "26069416", Rank: "56",
            WorldPopulationPercentage: "0.33", __typename: "Country"},
            
            { _id: "4", Area: "330803", CCA3: "MYS", Capital: "Kuala Lumpur", Continent: "Asia", Country: "Malaysia", Density: "102.5934", 
            GrowthRate: "1.0109", Population1970: "10306508", Population1980: "13215707", Population1990: "17517054", Population2000: "22945150", 
            Population2010: "28717731", Population2015: "31068833", Population2020: "33199993", Population2022: "33938221", Rank: "45", WorldPopulationPercentage: "0.43",
            __typename: "Country"},
            ]
        }
      }
    }
  ];


  export const emptyNextPageMocks = [
    {
      request: {
        query: GET_COUNTRIES_PAGINATION,
        variables: {
          offset: 1, 
          limit: 10, 
          sortOn: "Country", 
          sortDesc: false, 
          filterOn: "Country", 
          searchFieldValue: "", 
          hideUnreviewed: false
        }
      },
      result: {
        data: {
            paginatedCountries: 
            []
        }
      }
    }
  ];
