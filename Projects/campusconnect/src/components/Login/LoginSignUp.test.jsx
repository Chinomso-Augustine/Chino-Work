/*
3 cases to test using jest: Initial Render, clicking Login, and clicking Sign Up

/*
Test 1: Initial Render 
1. ensure form header says "Form"
2. Ensure name input is visible 
3. Ensure sign up and login btn are blue not gray 
*/

//render-> gives LoginSignUp components access to DOM. In general render takes data and transforms it into 
//visuals that can be see and interacted with the web

//Screen -> gives access to tools for querying rendered DOM
import { render, screen } from '@testing-library/react';
import LoginSignUp from './LoginSignUp';
import userEvent from '@testing-library/user-event';

//Describe: built-in function that groups related test cases together. 
//In this case it groups all the LoginSignUp Components 
describe('LoginSignUp Component', () => {
    //test(....) starts the first test while using render to display content on the web
    test('renders with default state "Form', () => {
        render(<LoginSignUp />);

        //Display "Form" on header by first finding the DOM elem that contains "Form" and then ensures that it exist 
        //We know that Form is just a text so use getByText
        const headerText = screen.getByText("Form");
        expect(headerText).toBeInTheDocument();

        //Ensuring name is visible by finding "Name which is a placeholder" then ensure that it exist 
        const nameText = screen.queryByPlaceholderText("Name");
        expect(nameText).toBeInTheDocument();

        //Ensuring sign btn does not have gray color by finding the text "Sign Up", then ensure it does not have a class of gray 
        const signUpBtn = screen.getByText("Sign Up");
        expect(signUpBtn).not.toHaveClass("gray");

        //Ensuring Login do not have gray 
        const logInBtn = screen.getByText("Login");
        expect(logInBtn).not.toHaveClass("gray");

    });

    /*Test 2: When Login Btn is clicked, check that 
    1. Header text change to "Login"
    2. Name input disappear 
    3. Lost password disappear 
    4. Sign up btn becomes gray 
    5. Log btn becomes blue
    */

    test("Correct Btn Response", async () => {
        render(<LoginSignUp />);

        const loginBtn = screen.getByRole("button", { name: "Login" });//More effective than getByText
        await userEvent.click(loginBtn);

        const loginHeader = screen.getAllByText("Login")[0]; // First "Login" is header
        expect(loginHeader).toBeInTheDocument();

        // SAFER: Expect it to be null instead of .not.toBeInTheDocument()
        expect(screen.queryByPlaceholderText("Name")).toBeNull();

        const lostP = screen.getByText(/Lost Password/i);
        expect(lostP).toBeInTheDocument();

        const signUpButton = screen.getByRole("button", { name: "Sign Up" });
        expect(signUpButton).toHaveClass("gray");

        expect(loginBtn).not.toHaveClass("gray");
    });

    test("responds correctly to clicking Sign Up", async () => {
        render(<LoginSignUp />);

        // Get correct Sign Up button (not the header)
        const buttons = screen.getAllByRole("button");
        const signUpButton = buttons.find(btn => btn.textContent.trim() === "Sign Up");
        await userEvent.click(signUpButton);

        // Header should now say "Sign Up"
        const header = screen.getByRole("button", { name: "Sign Up" });
        expect(header).toBeInTheDocument();

        // Name input should be visible
        const nameInput = screen.getByPlaceholderText("Name");
        expect(nameInput).toBeInTheDocument();

        // "Lost Password?" should be gone
        const lostPassword = screen.queryByText(/Lost Password/i);
        expect(lostPassword).toBeNull();

        // Login button should be gray
        const loginButton = buttons.find(btn => btn.textContent.trim() === "Login");
        expect(loginButton).toHaveClass("gray");

        // Sign Up button should not be gray
        expect(signUpButton).not.toHaveClass("gray");
    });

});

/*
    SUMMARY 
 1. Import render and screen 
 2. Import function needed to be tested 
 3. Import jest library 
 4. use .getByRole("elemType", {name: "text"}) instead of getByText when a text is rendered more than once
 
*/