import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import renderer from 'react-test-renderer';
import { HashRouter, HashRouter as Router } from "react-router-dom";
import { create, ReactTestRenderer } from 'react-test-renderer';
import { RecoilRoot } from 'recoil';
import Countries from '../components/Countries';
import { differentQueryMocks, errorMock, hideReviewedCountriesMock, mocks } from './mocks/mocks';
import { act, getByLabelText, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
export {};

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

describe("Testing Countries component", () => {
    it("snapshot test", () => {

        const component: renderer.ReactTestRenderer = renderer.create(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <Countries />
                    </RecoilRoot>
                </MockedProvider>
            </Router>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot(); 
    });


    it('Contains the right elements', async () => {
      // ARRANGE
      render(
        <Router>
          <MockedProvider mocks={mocks} addTypename={false}>
              <RecoilRoot>
                  <Countries />
              </RecoilRoot>
          </MockedProvider>
        </Router>
      )
    
      // ASSERT
      expect(await screen.findByRole('heading', {name: 'Search for a country'})).toHaveTextContent('Search for a country')
      expect(await screen.findByTestId('search-test')).toHaveValue('')
      expect(await screen.findByText("North Korea")).toBeInTheDocument();
      expect((await screen.findAllByText('Asia')).length).toBe(2)
      expect(await screen.findByText("26 069 416")).toBeInTheDocument();
      expect(await screen.findByText("120 538")).toBeInTheDocument();

      expect(await screen.findByText("North Macedonia")).toBeInTheDocument();
      expect(await screen.findByText("Northern Mariana Islands")).toBeInTheDocument();
      expect(await screen.findByText("Malaysia")).toBeInTheDocument();

    })

    it('Table contains correct elements with different query', async () => {
      // ARRANGE
      render(
        <Router>
          <MockedProvider mocks={differentQueryMocks} addTypename={false}>
              <RecoilRoot>
                  <Countries />
              </RecoilRoot>
          </MockedProvider>
        </Router>
      )
    
      // ACT
      userEvent.type(screen.getByLabelText("Search for country"), "north")
    
      // ASSERT
      expect(await screen.findByText("North Korea")).toBeInTheDocument();
      expect(await screen.findByText("North Macedonia")).toBeInTheDocument();
      expect(await screen.findByText("Northern Mariana Islands")).toBeInTheDocument();

      // Contains three rows of countries and three other rows from the table
      expect((await screen.findAllByRole('row')).length).toBe(6) 
      
    })

    it('Table contains correct elements while searching in the continent category', async () => {
      // ARRANGE
      render(
        <Router>
          <MockedProvider mocks={differentQueryMocks} addTypename={false}>
              <RecoilRoot>
                  <Countries />
              </RecoilRoot>
          </MockedProvider>
        </Router>
      )
    
      // ACT
      // act(async () => {
      userEvent.click(screen.getByLabelText("Category:"))
      // })
      // act(async () => {
        // await waitFor(() => {
          userEvent.click(await screen.findByRole("option", {name: "Continent"}))
      // })
      userEvent.type(screen.getByLabelText("Search for continent"), "asia")

      // ASSERT
      expect(await screen.findByText("North Korea")).toBeInTheDocument();
      expect(await screen.findByText("Malaysia")).toBeInTheDocument();

      // Contains three rows of countries and three other rows from the table
      expect((await screen.findAllByRole('row')).length).toBe(5) 
      
    })

    it('Table contains no elements while searching for non-existent country', async () => {
      // ARRANGE
      render(
        <Router>
          <MockedProvider mocks={differentQueryMocks} addTypename={false}>
              <RecoilRoot>
                  <Countries />
              </RecoilRoot>
          </MockedProvider>
        </Router>
      )
    
      // ACT
      userEvent.type(screen.getByLabelText("Search for country"), "aaa")
    
      // ASSERT
      expect(await screen.findByText("Sorry, no results matched your search")).toBeInTheDocument();

      // Contains one row with the text above and three other rows from the table
      expect((await screen.findAllByRole('row')).length).toBe(4) 
      
    })

    it('Shows error message', async () => {
      // ARRANGE
      render(
        <Router>
          <MockedProvider mocks={errorMock} addTypename={false}>
              <RecoilRoot>
                  <Countries />
              </RecoilRoot>
          </MockedProvider>
        </Router>
      )
    
      // ASSERT
      expect(await screen.findByText("Error - could not load data.")).toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument(); 
      
    })

    it('Tests clicking on a country', async () => {
      // ARRANGE
      render(
        <Router>
          <MockedProvider mocks={mocks} addTypename={false}>
              <RecoilRoot>
                  <Countries />
              </RecoilRoot>
          </MockedProvider>
        </Router>
      )

      // ACT
      userEvent.click(await screen.findByText("North Korea"))
    
      // ASSERT
      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1); 
      
    })

    it('Table contains correct elements after clicking on checkbox', async () => {
      // ARRANGE
      render(
        <Router>
          <MockedProvider mocks={hideReviewedCountriesMock} addTypename={false}>
              <RecoilRoot>
                  <Countries />
              </RecoilRoot>
          </MockedProvider>
        </Router>
      )

      // ACT
      userEvent.click(screen.getByRole("checkbox"))
    
      // ASSERT
      expect(await screen.findByText("North Korea")).toBeInTheDocument();
      expect((await screen.findAllByRole('row')).length).toBe(4) 
      
    })

});