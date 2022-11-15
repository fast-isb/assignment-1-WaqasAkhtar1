import Login from "./login.component";
import { screen, cleanup, render,waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route } from 'react-router-dom';



afterEach(() => {
    cleanup(); 
})
    test("Login Button", () => {
        render(<MemoryRouter>
            <Login />
        </MemoryRouter>)
    const logBtton = screen.queryByTestId("login_button");
    waitFor(() => expect(getByTestId(logBtton)).toBeInTheDocument());
})

