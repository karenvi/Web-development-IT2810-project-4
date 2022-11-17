import { MockedProvider } from '@apollo/client/testing';
import renderer from 'react-test-renderer';
import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { mocks } from './mocks/mocks';
import Country from '../pages/Country';
import { render, waitFor, screen } from '@testing-library/react';

export { };


// Mock useLocation in order to make the query mocks work for useQuery in component.
// Technique found at https://blog.changani.me/2022/01/30/webdev/react/react-mocking-react-router-dom-s-use-location-with-jest/
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
                        Rank: "36",
                        CCA3: "AFG",
                        Capital: "Kabul",
                        Continent: "Asia",
                        Area: "652230",
                        Density: "63.0587",
                        GrowthRate: "1.0257",
                        WorldPopulationPercentage: "0.52",
                    }
                },
                key: "eb77n1u7"
            }
        }
    };
});

// Mock ResponsiveContainer for PopulationChart
// code snippet inspired by https://github.com/recharts/recharts/issues/2268 
jest.mock('recharts', () => {
    const OriginalRechartsModule = jest.requireActual('recharts');

    return {
        ...OriginalRechartsModule,
        ResponsiveContainer: ({ children }: { children?: React.ReactNode }) => (
            <div className="recharts-responsive-container" style={{ width: "100%", height: "100%" }}>
                {children}
            </div>
        ),
    };
});

describe("Testing Country component", () => {
    it('Snapshot test of country component', async () => {
        const { container } = render(
          <MockedProvider mocks={mocks}>
            <RecoilRoot>
                <Country/>
            </RecoilRoot>
          </MockedProvider>,
        )
        await waitFor(() => new Promise((res) => setTimeout(res, 100)));
        //screen.debug();
        expect(container).toMatchSnapshot();
      })

    it('Contains the right elements', async () => {
        render(
            <Router>
                <MockedProvider mocks={mocks} >
                    <RecoilRoot>
                        <Country />
                    </RecoilRoot>
                </MockedProvider>
            </Router>
        );
        expect(await screen.findByText("Afghanistan")).toBeInTheDocument();
        expect(await screen.findByText("Asia")).toBeInTheDocument();
        expect(await screen.findByText("Reviews of Afghanistan:")).toBeInTheDocument();
        expect(await screen.findByText("Review Afghanistan")).toBeInTheDocument();
    });

});