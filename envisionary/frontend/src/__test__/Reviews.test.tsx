import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import renderer from 'react-test-renderer';
import { useLocation, HashRouter as Router } from 'react-router-dom';
import { create, ReactTestRenderer } from 'react-test-renderer';
import { RecoilRoot } from 'recoil';
import { mocks } from './mocks/mocks';
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
 * Mocking useLocation in order to make the query mocks work.
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

    it('Contains the right elements', async () => {

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                    <Reviews />
            </MockedProvider>
        );

        expect(screen.getByText('Loading reviews ...')).toBeInTheDocument();
    });

    it('Should show error message', async () => {
        const mockFail = {
            request: {
                query: GET_REVIEWS_BY_COUNTRY_NAME,
                variables: { Country: "Afghanistan" }
            },
            error: new Error("Could not get reviews")

        };

        render(
            <MockedProvider mocks={[mockFail]} addTypename={false}>
                    <Reviews />
            </MockedProvider>
        );

        expect(await screen.findByText("Could not get reviews")).toBeInTheDocument();
    });

});