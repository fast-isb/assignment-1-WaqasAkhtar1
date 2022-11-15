import SignUp from "./signup.component";
import { screen, cleanup, render,waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route } from 'react-router-dom';



afterEach(() => {
    cleanup(); 
})
    test("Sign up Button", () => {
        render(<MemoryRouter>
            <SignUp />
        </MemoryRouter>)
    const signupBtton = screen.queryByTestId("signup_button");
    waitFor(() => expect(getByTestId(signupBtton)).toBeInTheDocument());
})


test("name ", () => {
    render(<MemoryRouter>
        <SignUp />
    </MemoryRouter>)
const signupBtton = screen.queryByTestId("name");
waitFor(() => expect(getByTestId(signupBtton)).toBeInTheDocument());
})
