import { MockedProvider } from '@apollo/client/testing';
import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { mocks } from './mocks/mocks';
import { render, waitFor, screen } from '@testing-library/react';
import PopulationChart from '../components/PopulationChart';

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
                        Population1970: "10752971",
                        Population1980: "12486631",
                        Population1990: "10694796",
                        Population2000: "19542982",
                        Population2010: "28189672",
                        Population2015: "33753499",
                        Population2020: "38972230",
                        Population2022: "41128771",
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
            <PopulationChart/>
          </MockedProvider>,
        )
        await waitFor(() => new Promise((res) => setTimeout(res, 100)));
        //screen.debug();
        expect(container).toMatchSnapshot();
      })
});