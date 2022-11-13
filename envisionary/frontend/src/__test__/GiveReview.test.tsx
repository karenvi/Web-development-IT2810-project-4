import GiveReview from "../pages/GiveReview";
import { act, findByText, fireEvent, render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { failMock, mocks, noReviewsMock } from './mocks/mocks';
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
    it("snapshot test", () => {

        const component: renderer.ReactTestRenderer = renderer.create(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <GiveReview />
                </MockedProvider>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot(); 
    });

    it("testing input fields", async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                    <GiveReview />
            </MockedProvider>
        );

        userEvent.click(await screen.findByText('Review Afghanistan'));

        // name field should be empty first
        expect(await screen.findByTestId('name-field-test')).toHaveValue('');
        // should contain name after typing
        userEvent.type(await screen.findByTestId('name-field-test'), 'Doctor Ivo Robotnik');
        expect(await screen.findByTestId('name-field-test')).toHaveValue('Doctor Ivo Robotnik');
        // normal name should pass
        userEvent.click(await screen.findByText('Submit'));

        
        // review content should be empty first
        expect(await screen.findByTestId('review-content-field-test')).toHaveValue('');
        // should contain content after typing
        userEvent.type(await screen.findByTestId('review-content-field-test'), "Muahaha, if it isn't Sonic >:) ");
        expect(await screen.findByTestId('review-content-field-test')).toHaveValue("Muahaha, if it isn't Sonic >:) ");
        // clear review content to prevent submition
        userEvent.type(await screen.findByTestId('review-content-field-test'), '{selectall}{backspace}');


        // empty name field should trigger error
        userEvent.type(await screen.findByTestId('name-field-test'), '{selectall}{backspace}');
        expect(await screen.findByTestId('name-field-test')).toHaveValue('');
        userEvent.click(await screen.findByText('Submit'));
        expect(await screen.findByText('Name is required')).toBeInTheDocument();

        // name > 40 should trigger error
        userEvent.type(await screen.findByTestId('name-field-test'), '{selectall}{backspace}');
        userEvent.type(await screen.findByTestId('name-field-test'), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet porttitor dui. Ut vel est.');
        expect(await screen.findByTestId('name-field-test')).toHaveValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet porttitor dui. Ut vel est.');
        userEvent.click(await screen.findByText('Submit'));
        expect(await screen.findByText('Name cannot be longer than 40 characters')).toBeInTheDocument();

        // name starting with special characters should trigger error
        userEvent.type(await screen.findByTestId('name-field-test'), '{selectall}{backspace}');
        userEvent.type(await screen.findByTestId('name-field-test'), '$/2gutta');
        expect(await screen.findByTestId('name-field-test')).toHaveValue('$/2gutta');
        userEvent.click(await screen.findByText('Submit'));
        expect(await screen.findByText('A name must start with normal letters (a-z)')).toBeInTheDocument();


    });

});