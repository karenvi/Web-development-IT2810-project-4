import { MockedProvider } from '@apollo/client/testing';
import renderer from 'react-test-renderer';
import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { mocks } from './mocks/mocks';
import Country from '../pages/Country';
import PopulationChart from '../components/PopulationChart';
export { };

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

// Mock ResponsiveContainer for PopulationChart
// code snippet below from https://github.com/recharts/recharts/issues/2268 
jest.mock('recharts', () => {
    const OriginalRechartsModule = jest.requireActual('recharts');
  
    return {
      ...OriginalRechartsModule,
      ResponsiveContainer: ({ children }: any) => (
        <div className="recharts-responsive-container" style={{ width: "100%", height: "100%" }}>
          {children}
        </div>
      ),
    };
  });

describe("Testing Country component", () => {
    it("snapshot test", () => {

        const component: renderer.ReactTestRenderer = renderer.create(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <Country  />
                    </RecoilRoot>
                </MockedProvider>
            </Router>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Contains the right elements', () => {

        const component: renderer.ReactTestRenderer = renderer.create(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <Country />
                    </RecoilRoot>
                </MockedProvider>
            </Router>
        );

        expect(component.root.findAllByType('h1')[0].props.children).toBe('Afghanistan');

    });

});