import { render, screen } from '@testing-library/react';
import App from './App';
import { RecoilRoot } from 'recoil';
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from './__test__/mocks/mocks';
import userEvent from '@testing-library/user-event';


it("App renders correctly", () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RecoilRoot>
          <App/>
        </RecoilRoot>
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('Tests the toggle from darkmode to lightmode', async () => {
    // ARRANGE
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RecoilRoot>
          <App/>
        </RecoilRoot>
      </MockedProvider>
    )

    // ACT
    userEvent.click(screen.getByRole("checkbox", {name: "Theme switch"}))

    // ASSERT
    expect(await screen.findByRole("table")).toHaveStyle('backgroundColor: white; color: black')

  })


