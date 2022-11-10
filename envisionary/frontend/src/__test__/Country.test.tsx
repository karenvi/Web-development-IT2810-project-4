import { MockedProvider } from '@apollo/client/testing';
import renderer from 'react-test-renderer';
import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { mocks } from './mocks/mocks';
import Country from '../pages/Country';
export {};



describe("Testing Countries component", () => {
    it("snapshot test", () => {

        const component: renderer.ReactTestRenderer = renderer.create(
            <Router>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <Country />
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