import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import MenuItemReviewEditPage from "main/pages/MenuItemReview/MenuItemReviewEditPage";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            //might need to be itemId?
            itemId: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("MenuItemReviewEditPage tests", () => {

    describe("when the backend doesn't return data", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            //maybe itemId
            axiosMock.onGet("/api/menuitemreview", { params: { itemId: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await screen.findByText("Edit Review");
            //reviewer-email?
            expect(screen.queryByTestId("MenuItemReview-reviewerEmail")).not.toBeInTheDocument();
            restoreConsole();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/menuitemreview", { params: { itemId: 17 } }).reply(200, {
                //id: 17,
                itemId: 17,//not sure if this is int or string
                reviewerEmail: "test@ucsb.edu",
                stars: 5,
                dateReviewed: "2022-01-02T12:00:00",
                comments: "test comment"
            });
            axiosMock.onPut('/api/menuitemreview').reply(200, {
                //id: 17,
                itemId: "17",
                reviewerEmail: "pds@ucsb.edu",
                stars: "1",
                dateReviewed: "2022-04-02T12:00:00",
                comments: "bad test comment"
            });
        
        });
    

        const queryClient = new QueryClient();
    
        test("Is populated with the data provided", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("MenuItemReviewForm-reviewer-email");

           // const idField = screen.getByTestId("MenuItemReviewForm-item-id");
            const emailField = screen.getByTestId("MenuItemReviewForm-reviewer-email");
            const starsField = screen.getByTestId("MenuItemReviewForm-stars");
            const dateField = screen.getByTestId("MenuItemReviewForm-date-reviewed");
            const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
            const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

           // expect(idField).toBeInTheDocument();
            //expect(idField).toHaveValue(review.id);
            expect(emailField).toBeInTheDocument();
            expect(emailField).toHaveValue("test@ucsb.edu");
            expect(starsField).toBeInTheDocument();
            expect(starsField).toHaveValue("5");
            expect(dateField).toBeInTheDocument();
            expect(dateField).toHaveValue("2022-01-02T12:00:00");
            expect(commentsField).toBeInTheDocument();
            expect(commentsField).toHaveValue("test comment");
            expect(submitButton).toHaveTextContent("Update");

            fireEvent.change(emailField, { target: { value: 'pds@ucsb.edu' } });
            fireEvent.change(starsField, { target: { value: '1' } });
            fireEvent.change(dateField, { target: { value: '2022-04-02T12:00:00' } });
            fireEvent.change(commentsField, { target: { value: 'bad test comment' } });
            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            //might have to add all fields
            expect(mockToast).toBeCalledWith("Review Updated - itemId: 17 reviewerEmail: pds@ucsb.edu stars: 1 dateReviewed: 2022-04-02T12:00:00 comments: bad test comment");
            
            expect(mockNavigate).toBeCalledWith({ "to": "/menuitemreview" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ itemId: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                reviewerEmail: 'pds@ucsb.edu',
                stars: "1",
                dateReviewed: '2022-04-02T12:00:00',
                comments: 'bad test comment'
            })); // posted object


        });

        test("Changes when you click Update", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <MenuItemReviewEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("MenuItemReviewForm-reviewer-email");

            //const idField = screen.getByTestId("MenuItemReviewForm-item-Id");
            const emailField = screen.getByTestId("MenuItemReviewForm-reviewer-email");
            const starsField = screen.getByTestId("MenuItemReviewForm-stars");
            const dateField = screen.getByTestId("MenuItemReviewForm-date-reviewed");
            const commentsField = screen.getByTestId("MenuItemReviewForm-comments");
            const submitButton = screen.getByTestId("MenuItemReviewForm-submit");

            //expect(idField).toHaveValue(review.itemId);
            expect(emailField).toHaveValue("test@ucsb.edu");
            expect(starsField).toHaveValue("5");
            expect(dateField).toHaveValue("2022-01-02T12:00:00");
            expect(commentsField).toHaveValue("test comment");
            expect(submitButton).toBeInTheDocument();

            fireEvent.change(emailField, { target: { value: 'pds@ucsb.edu' } })
            fireEvent.change(starsField, { target: { value: '1' } })
            fireEvent.change(dateField, { target: { value: '2022-04-02T12:00:00' } })
            fireEvent.change(commentsField, { target: { value: 'bad test comment' } })
    
            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("Review Updated - itemId: 17 reviewerEmail: pds@ucsb.edu stars: 1 dateReviewed: 2022-04-02T12:00:00 comments: bad test comment");
            expect(mockNavigate).toBeCalledWith({ "to": "/menuitemreview" });
        });

       
    });
});