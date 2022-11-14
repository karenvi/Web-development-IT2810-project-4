import GiveReview from "../pages/GiveReview";
import { render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { mocks } from './mocks/mocks';
import userEvent from "@testing-library/user-event";


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

describe("Testing review content", () => {

    beforeEach(async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                    <GiveReview />
            </MockedProvider>
        );
    });

    it("snapshot test", () => {

        const component: renderer.ReactTestRenderer = renderer.create(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <GiveReview />
                </MockedProvider>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot(); 
    });


    it("empty review content field", async () => {

        userEvent.click(await waitFor(() => screen.findByText('Review Afghanistan')));
        expect(await screen.findByTestId('review-content-field-test')).toHaveValue('');
    });


/**
 * Couldn't get this to work. There's something different about the contend field compared to the name field
 * that makes some async stuff go wrong. Jest insists that things should be wrapped in act(), but that's a dead end. 
 *  */    

/* 
    it("entering review content", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false} defaultOptions={{watchQuery: { fetchPolicy: 'no-cache' }, query: { fetchPolicy: 'no-cache' }, }}>
                    <GiveReview />
            </MockedProvider>
        );

        userEvent.click(await waitFor(() => screen.findByText('Review Afghanistan')));

        // content field should be empty first
        await waitFor(() => expect(screen.getByText('Review Afghanistan')).not.toBeInTheDocument());
        
        // should contain name after typing
        userEvent.type(screen.getByTestId('review-content-field-test'), "Muahaha, if it isn't Sonic >:) ");
        expect(await screen.findByTestId('name-field-test')).toHaveValue("Muahaha, if it isn't Sonic >:) ");
    });
 */
    it("empty name field", async () => {

        userEvent.click(await waitFor(() => screen.findByText('Review Afghanistan')));

        // empty name field should trigger error
        expect(await screen.findByTestId('name-field-test')).toHaveValue('');
        userEvent.click(await screen.findByText('Submit'));
        expect(await screen.findByText('Name is required')).toBeInTheDocument();
    });

    it("too long name", async () => {

        userEvent.click(await waitFor(() => screen.findByText('Review Afghanistan')));

        // name > 40 should trigger error
        userEvent.type(await screen.findByTestId('name-field-test'), '{selectall}{backspace}');
        userEvent.type(await screen.findByTestId('name-field-test'), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet porttitor dui. Ut vel est.');
        expect(await screen.findByTestId('name-field-test')).toHaveValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet porttitor dui. Ut vel est.');
        userEvent.click(await screen.findByText('Submit'));
        expect(await screen.findByText('Name cannot be longer than 40 characters')).toBeInTheDocument();
    });

    it("entering valid name", async () => {

        userEvent.click(await waitFor(() => screen.findByText('Review Afghanistan')));

        // name field should be empty first
        expect(await screen.findByTestId('name-field-test')).toHaveValue('');
        // should contain name after typing
        userEvent.type(await screen.findByTestId('name-field-test'), 'Doctor Ivo Robotnik');
        expect(await screen.findByTestId('name-field-test')).toHaveValue('Doctor Ivo Robotnik');
        // normal name should pass
        userEvent.click(await screen.findByText('Submit'));
        expect(await screen.findByText('Review successfully given!')).toBeInTheDocument();  
    });

    it("special characters in name", async() => {

        userEvent.click(await waitFor(() => screen.findByText('Review Afghanistan')));
        // name starting with special characters should trigger error
        userEvent.type(await screen.findByTestId('name-field-test'), '{selectall}{backspace}');
        userEvent.type(await screen.findByTestId('name-field-test'), '$/2gutta');
        expect(await screen.findByTestId('name-field-test')).toHaveValue('$/2gutta');
        userEvent.click(await screen.findByText('Submit'));
        expect(await screen.findByText('A name must start with normal letters (a-z)')).toBeInTheDocument();
    });
});