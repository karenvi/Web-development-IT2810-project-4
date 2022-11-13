import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import renderer from 'react-test-renderer';
import { useLocation, HashRouter as Router } from 'react-router-dom';
import { create, ReactTestRenderer } from 'react-test-renderer';
import { RecoilRoot } from 'recoil';
import { failMock, mocks } from './mocks/mocks';
import { render, screen } from '@testing-library/react';
import Reviews from '../components/Reviews';
import { GET_REVIEWS_BY_COUNTRY_NAME } from '../graphql/queries';
import { ApolloError } from '@apollo/client';
export {};

/* 
jest.mock('@apollo/client', () => {
    //const loading: boolean = true;
    //const error: ApolloError | undefined;
    useQuery: jest.fn().mockReturnValue(({data: {
        Date: "2022-10-26T13:50:35.783Z", 
        Name: "Trond", Rating: 3.5, 
        ReviewText: "Flott land å feriere i.", 
        __typename: "Review"}, loading: false, error: {} }))
}); 
*/

/* 
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as {},
    useLocation: jest.fn().mockImplementation(() => {   
        return {pathname: "/country", search: "", hash: "",  state: { country: { Country: "Afghanistan"} }, key: "eb77n1u7" };
    })
}));
 */

/**
 * Mocking useLocation in order to make the query mocks work for useQuery in component.
 * Technique found at https://blog.changani.me/2022/01/30/webdev/react/react-mocking-react-router-dom-s-use-location-with-jest/
 */
jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
        useLocation: () => {
            return {
                pathname: "/country",
                search: "",
                hash: "",
                state: {
                    country: {
                        Country: "Afghanistan",
                    }
                },
                key: "eb77n1u7"
            }
        }
    };
});

describe("Testing Reviews component", () => {
    it("snapshot test", () => {

        const component: renderer.ReactTestRenderer = renderer.create(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <Reviews />
                </MockedProvider>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot(); 
    });

    it('Loads reviews correctly', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                    <Reviews />
            </MockedProvider>
        );

        expect(await screen.findByText('Loading reviews ...')).toBeInTheDocument();
        // Trond
        expect(await screen.findByText('Trond')).toBeInTheDocument();
        expect(await screen.findByText('Flott land å feriere i.')).toBeInTheDocument();
        // Hans og Grethe
        expect(await screen.findByText('Hans og Grethe')).toBeInTheDocument();
        expect(await screen.findByText('Fint og fredelig land for et idyllisk opphold på all-inclusive.')).toBeInTheDocument();
        // Lisbeth
        expect(await screen.findByText('Lisbeth')).toBeInTheDocument();
        expect(await screen.findByText('Synes det var litt skummelt i Afghanistan.')).toBeInTheDocument();
        
    });

    it('Should show error message', async () => {
        render(
            <MockedProvider mocks={failMock} addTypename={false}>
                    <Reviews />
            </MockedProvider>
        );
        
        expect(await screen.findByText("Could not get reviews")).toBeInTheDocument();
    });

});