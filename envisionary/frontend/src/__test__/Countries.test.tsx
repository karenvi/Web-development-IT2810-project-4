import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import renderer from 'react-test-renderer';
import { HashRouter, HashRouter as Router } from "react-router-dom";
import { create, ReactTestRenderer } from 'react-test-renderer';
import { RecoilRoot } from 'recoil';
import Countries from '../components/Countries';
import { differentQueryMocks, mocks } from './mocks/mocks';
import { getByLabelText, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
export {};



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


    test('Contains the right elements', async () => {
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
      // expect((await screen.findAllByRole('row')).length).toBe(7)
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
      // expect(await screen.findByText("Malaysia")).toBeInTheDocument();
      // expect(async () => await screen.findByText("Malaysia")).toThrow()

      // Contains three rows of countries and three other rows from the table
      expect((await screen.findAllByRole('row')).length).toBe(6) 
      
    })

    // No result query, and check prev-button is disabled

    // Check error 

    // Check checkbox of hide-unreviewed-countries and check page and offset values? And table contents

    // Click on row and check toCountryPage?


});