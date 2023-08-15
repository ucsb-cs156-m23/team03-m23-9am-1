import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import RecommendationRequestForm from "main/components/RecommendationRequest/RecommendationRequestForm";
import { recommendationRequestFixtures } from "fixtures/recommendationRequestFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("RecommendationRequestForm tests", () => {

    test("renders correctly", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByText(/Requester Email/);
        await screen.findByText(/Create/);
    });


    test("renders correctly when passing in a RecommendationRequest", async () => {

        render(
            <Router  >
                <RecommendationRequestForm initialContents={recommendationRequestFixtures.oneRR} />
            </Router>
        );
        await screen.findByTestId(/RecommendationRequestForm-id/);
        expect(screen.getByText(/Id/)).toBeInTheDocument();
        expect(screen.getByTestId(/RecommendationRequestForm-id/)).toHaveValue("1");
    });


    test("Correct Error messages on bad input", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-requesterEmail");
        const requesterEmailField = screen.getByTestId("RecommendationRequestForm-requesterEmail");
        const professorEmailField = screen.getByTestId("RecommendationRequestForm-professorEmail");
        const explanationField = screen.getByTestId("RecommendationRequestForm-explanation");
        const dateRequestedField = screen.getByTestId("RecommendationRequestForm-dateRequested");
        const dateNeededField = screen.getByTestId("RecommendationRequestForm-dateNeeded");
        const doneField = screen.getByTestId("RecommendationRequestForm-done");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'bad-input' } });
        fireEvent.change(professorEmailField, { target: { value: 'bin-2' } });
        fireEvent.change(explanationField, { target: { value: 'valid-input' } });
        fireEvent.change(dateRequestedField, { target: { value: '2022-01-03T00:00:00' } });
        fireEvent.change(dateNeededField, { target: { value: '2022-01-05T00:00:00' } });
        fireEvent.change(doneField, { target: { value: 'false' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Requester email must be a valid email address./);
        await screen.findByText(/Professor email must be a valid email address./);
        
    });

    test("Correct Error messages on bad input 2", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-requesterEmail");
        const requesterEmailField = screen.getByTestId("RecommendationRequestForm-requesterEmail");
        const professorEmailField = screen.getByTestId("RecommendationRequestForm-professorEmail");
        const doneField = screen.getByTestId("RecommendationRequestForm-done");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'adhit5@ucsb.edu' } });
        fireEvent.change(professorEmailField, { target: { value: 'phtcon5@ucsb.edu' } });
        fireEvent.change(doneField, { target: { value: 'yaaaas' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Explanation is required./);
        expect(screen.getByText(/Date requested is required./)).toBeInTheDocument();
        expect(screen.getByText(/Date needed is required./)).toBeInTheDocument();
        expect(screen.getByText(/Done must be either "true" or "false"./)).toBeInTheDocument();

    });

    test("Correct Error messages on bad & missing input", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-requesterEmail");
        const requesterEmailField = screen.getByTestId("RecommendationRequestForm-requesterEmail");
        const professorEmailField = screen.getByTestId("RecommendationRequestForm-professorEmail");
        const explanationField = screen.getByTestId("RecommendationRequestForm-explanation");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'invalidemail1' } });
        fireEvent.change(professorEmailField, { target: { value: 'invalidemail2' } });
        fireEvent.change(explanationField, { target: { value: 'valid-input' } });
        fireEvent.click(submitButton);

        await screen.findByText(/Requester email must be a valid email address./);
        await screen.findByText(/Professor email must be a valid email address./);
        expect(screen.getByText(/Date requested is required./)).toBeInTheDocument();
        expect(screen.getByText(/Date needed is required./)).toBeInTheDocument();
        expect(screen.getByText(/Done is required./)).toBeInTheDocument();

    });

    test("Correct Error messages on missing input", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-submit");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.click(submitButton);

        await screen.findByText(/Requester email is required./);
        expect(screen.getByText(/Professor email is required./)).toBeInTheDocument();
        expect(screen.getByText(/Explanation is required./)).toBeInTheDocument();
        expect(screen.getByText(/Date requested is required./)).toBeInTheDocument();
        expect(screen.getByText(/Date needed is required./)).toBeInTheDocument();
        expect(screen.getByText(/Done is required./)).toBeInTheDocument();

    });

    test("No Error messages on good input", async () => {

        const mockSubmitAction = jest.fn();


        render(
            <Router  >
                <RecommendationRequestForm submitAction={mockSubmitAction} />
            </Router>
        );
        
        await screen.findByTestId("RecommendationRequestForm-requesterEmail");
        const requesterEmailField = screen.getByTestId("RecommendationRequestForm-requesterEmail");
        const professorEmailField = screen.getByTestId("RecommendationRequestForm-professorEmail");
        const explanationField = screen.getByTestId("RecommendationRequestForm-explanation");
        const dateRequestedField = screen.getByTestId("RecommendationRequestForm-dateRequested");
        const dateNeededField = screen.getByTestId("RecommendationRequestForm-dateNeeded");
        const doneField = screen.getByTestId("RecommendationRequestForm-done");
        const submitButton = screen.getByTestId("RecommendationRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'adhit1@ucsb.edu' } });
        fireEvent.change(professorEmailField, { target: { value: 'phtcon1@ucsb.edu' } });
        fireEvent.change(explanationField, { target: { value: 'Recommendations are cool 1' } });
        fireEvent.change(dateRequestedField, { target: { value: '2022-03-03T00:00:00' } });
        fireEvent.change(dateNeededField, { target: { value: '2022-03-05T00:00:00' } });
        fireEvent.change(doneField, { target: { value: 'true' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(screen.queryByText(/Requester email is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/Professor email is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/Explanation is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/Date requested is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/Date needed is required./)).not.toBeInTheDocument();
        expect(screen.queryByText(/Done is required./)).not.toBeInTheDocument();

        expect(screen.queryByText(/Requester email must be a valid email address./)).not.toBeInTheDocument();
        expect(screen.queryByText(/Professor email must be a valid email address./)).not.toBeInTheDocument();
        expect(screen.queryByText(/Done must be either "true" or "false"./)).not.toBeInTheDocument();

    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {

        render(
            <Router  >
                <RecommendationRequestForm />
            </Router>
        );
        await screen.findByTestId("RecommendationRequestForm-cancel");
        const cancelButton = screen.getByTestId("RecommendationRequestForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


