import { MockedProvider } from '@apollo/client/testing';
import renderer from 'react-test-renderer';
import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import InfoPage from '../pages/InfoPage';
import { mocks } from './mocks/mocks';
import { render, screen } from '@testing-library/react';


describe("Testing InfoPage component", () => {
    it("snapshot test", () => {

      const component: renderer.ReactTestRenderer = renderer.create(
          <Router>
              <MockedProvider mocks={mocks} addTypename={false}>
                  <RecoilRoot>
                      <InfoPage />
                  </RecoilRoot>
              </MockedProvider>
          </Router>
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot(); 
    });

    it('Contains the right information', async () => {
      // ARRANGE
      render(
        <Router>
          <MockedProvider mocks={mocks} addTypename={false}>
              <RecoilRoot>
                  <InfoPage />
              </RecoilRoot>
          </MockedProvider>
        </Router>
      )
    
      // ASSERT
      expect(screen.getByText("Envision the world through the eyes of a traveller")).toBeInTheDocument();

    })
});