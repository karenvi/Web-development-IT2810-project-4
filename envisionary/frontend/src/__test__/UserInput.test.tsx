import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import renderer from 'react-test-renderer';
import UserInput from "../components/UserInput";
import { RecoilRoot } from "recoil";
import { HashRouter as Router } from "react-router-dom";
import { mocks } from './mocks/mocks';
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
export {};


describe("Testing UserInput component", () => {
    
    it("snapshot test", () => {
        const component = renderer.create(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <UserInput />
                    </RecoilRoot>
                </MockedProvider>
            </Router>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it("drop down menu contains correct information", () => {
        render(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                <RecoilRoot>
                    <UserInput />
                </RecoilRoot>
                </MockedProvider>
            </Router>
          );

        const component = screen.getByTestId("select-test") as HTMLInputElement;
        expect(component.value).toBe("Country");
    });

    it("contains the proper elements", () => {
        const component = renderer.create(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <UserInput />
                    </RecoilRoot>
                </MockedProvider>
            </Router>
        );
        
        const spans = component.root.findAllByType('span');
        expect(spans[0].props.children).toBe('Search for country');
        expect(spans[1].props.children).toBe('Select which category to search in');
        expect(spans[2].props.children).toBe('Category:');
    })

    it('change value to drop down menu', async () => {
      // ARRANGE
      render(
        <Router>
          <MockedProvider mocks={mocks} addTypename={false}>
              <RecoilRoot>
                  <UserInput />
              </RecoilRoot>
          </MockedProvider>
        </Router>
      )
      
      userEvent.click(screen.getByRole("button", {name: "Category: Country"}))
      userEvent.click(screen.getByRole("option", {name: "Continent"}))

      expect(screen.getByRole("button", {name: "Category: Continent"})).toHaveTextContent("Continent")
  })
});