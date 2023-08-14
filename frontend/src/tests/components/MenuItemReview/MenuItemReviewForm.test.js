import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import MenuItemReviewForm from "main/components/MenuItemReview/MenuItemReviewForm";
import { menuItemReviewFixtures } from "fixtures/menuItemReviewFixtures";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("MenuItemReviewForm tests", () => {
    const queryClient = new QueryClient();

    const expectedHeaders = ["Reviewer Email", "Stars", "Date Reviewed", "Comments"];
    const testId = "MenuItemReviewForm";

    test("renders correctly with no initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <MenuItemReviewForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });

    });

    test("renders correctly when passing in initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <MenuItemReviewForm initialContents={menuItemReviewFixtures.oneReview} />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expect(await screen.findByTestId(`${testId}-item-id`)).toBeInTheDocument();
        expect(screen.getByText(`Item Id`)).toBeInTheDocument();
    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <MenuItemReviewForm />
                </Router>
            </QueryClientProvider>
        );
        expect(await screen.findByTestId(`${testId}-cancel`)).toBeInTheDocument();
        const cancelButton = screen.getByTestId(`${testId}-cancel`);

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
    });

    test("that the correct validations are performed", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <MenuItemReviewForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();
        const submitButton = screen.getByText(/Create/);
        fireEvent.click(submitButton);

        await screen.findByText(/Reviewer Email is required/);
        //expect(screen.getByText(/Reviewer Email is required/)).toBeInTheDocument();
        expect(screen.getByText(/Stars are required/)).toBeInTheDocument();
        expect(screen.getByText(/Date Reviewed is required/)).toBeInTheDocument();
        expect(screen.getByText(/Comments are required/)).toBeInTheDocument();

        
    });

    test("Correct Error messsages on missing input", async () => {

        render(
            <Router  >
                <MenuItemReviewForm />
            </Router>
        );
        await screen.findByTestId("MenuItemReviewForm-submit");
        const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

        fireEvent.click(submitButton);
        await screen.findByText(/Reviewer Email is required/);
        //expect(screen.getByText(/Reviewer Email is required/)).toBeInTheDocument();
        expect(screen.getByText(/Stars are required/)).toBeInTheDocument();
        expect(screen.getByText(/Date Reviewed is required/)).toBeInTheDocument();
        expect(screen.getByText(/Comments are required/)).toBeInTheDocument();
       
    });
    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <MenuItemReviewForm submitAction={mockSubmitAction} />
            </Router>
        );
        await screen.findByTestId("MenuItemReviewForm-reviewer-email");

        //const itemIdField = screen.getByTestId("MenuItemReviewForm-item-id");
        const reviewerEmailField = screen.getByTestId("MenuItemReviewForm-reviewer-email");
        const starsField = screen.getByTestId("MenuItemReviewForm-stars");
        const dateReviewedField = screen.getByTestId("MenuItemReviewForm-date-reviewed");
        const commentsField = screen.getByTestId("MenuItemReviewForm-comments");

        const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

       // fireEvent.change(itemIdField, { target: { value: '1' } });
        fireEvent.change(reviewerEmailField, { target: { value: 'pds@ucsb.edu' } });
        fireEvent.change(starsField, { target: { value: '5' } });
        fireEvent.change(dateReviewedField, { target: { value: '2022-01-02T12:00' } });
        fireEvent.change(commentsField, { target: { value: 'good food' } });

        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        //expect(screen.queryByText(/Item Id must be a number/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Reviewer Email must be a valid email address/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Stars must be a number between 1 and 5/)).not.toBeInTheDocument();
       // expect(screen.queryByText(/Date Reviewed must be a valid date/)).not.toBeInTheDocument();
        //expect(screen.queryByText(/localDateTime must be in ISO format/)).not.toBeInTheDocument();

    });

    test("Correct Error messsages on bad input", async () => {

        render(
            <Router  >
                <MenuItemReviewForm />
            </Router>
        );
        await screen.findByTestId("MenuItemReviewForm-reviewer-email");

        //const itemIdField = screen.getByTestId("MenuItemReviewForm-item-id");
        const reviewerEmailField = screen.getByTestId("MenuItemReviewForm-reviewer-email");
        const starsField = screen.getByTestId("MenuItemReviewForm-stars");
        const dateReviewedField = screen.getByTestId("MenuItemReviewForm-date-reviewed");
        const commentsField = screen.getByTestId("MenuItemReviewForm-comments");

        const submitButton = screen.getByTestId("MenuItemReviewForm-submit");


       // fireEvent.change(itemIdField, { target: { value: 'p' } });
        fireEvent.change(reviewerEmailField, { target: { value: 'pdsucsbedu' } });
        fireEvent.change(starsField, { target: { value: '8' } });
        fireEvent.change(dateReviewedField, { target: { value: 'march 2nd' } });
        fireEvent.change(commentsField, { target: { value: 'good food' } });

        fireEvent.click(submitButton);
       
       
        await screen.findByText(/Reviewer Email must be a valid email address/);
        //expect(screen.getByText(/Reviewer Email must be a valid email address/)).toBeInTheDocument();
        expect(screen.getByText(/Stars must be a number between 1 and 5/)).toBeInTheDocument();
        expect(screen.getByText(/Date Reviewed must be a valid date/)).toBeInTheDocument();

    });







});