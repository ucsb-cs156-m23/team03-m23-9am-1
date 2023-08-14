import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import UCSBOrganizationEditPage from "main/pages/UCSBOrganization/UCSBOrganizationEditPage";

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
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("UCSBOrganizationEditPage tests", () => {

    describe("when the backend doesn't return data", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/ucsborganization", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {

            const restoreConsole = mockConsole();

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBOrganizationEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await screen.findByText("Edit Organization");
            expect(screen.queryByTestId("UCSBOrganization-orgCode")).not.toBeInTheDocument();
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
            axiosMock.onGet("/api/ucsborganization", { params: { id: 17 } }).reply(200, {
                id: 17,
                orgCode: "ZTR",
                orgTranslationShort: "Zeta Rho",
                orgTranslation: "Zeta Rho at UCSB",
                inactive: true
            });
            axiosMock.onPut('/api/ucsborganization').reply(200, {
                id: "17",
                orgCode: "ZPR",
                orgTranslationShort: "Zeta Phi Rho",
                orgTranslation: "Zeta Phi Rho at UCSB",
                inactive: false
            });
        });

        const queryClient = new QueryClient();
    
        test("Is populated with the data provided", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBOrganizationEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("UCSBOrganizationForm-id");

            const idField = screen.getByTestId("UCSBOrganizationForm-id");
            const orgCodeField = screen.getByTestId("UCSBOrganizationForm-orgCode");
            const orgTranslationShortField = screen.getByTestId("UCSBOrganizationForm-orgTranslationShort");
            const orgTranslationField = screen.getByTestId("UCSBOrganizationForm-orgTranslation")
            const inactiveField = screen.getByTestId("UCSBOrganizationForm-inactive");
            const submitButton = screen.getByTestId("UCSBOrganizationForm-submit");

            expect(idField).toBeInTheDocument();
            expect(idField).toHaveValue("17");
            expect(orgCodeField).toBeInTheDocument();
            expect(orgCodeField).toHaveValue("ZTR");
            expect(orgTranslationShortField).toBeInTheDocument();
            expect(orgTranslationShortField).toHaveValue("Zeta Rho")
            expect(orgTranslationField).toBeInTheDocument();
            expect(orgTranslationField).toHaveValue("Zeta Rho at UCSB");
            expect(inactiveField).toBeInTheDocument();
            expect(inactiveField).toBeChecked();
            expect(submitButton).toBeInTheDocument();
            expect(submitButton).toHaveTextContent("Update");
            
            
            fireEvent.change(orgCodeField,{target: {value: 'ZPR'}});
            fireEvent.change(orgTranslationShortField,{target: {value: 'Zeta Phi Rho'}});
            fireEvent.change(orgTranslationField,{target: {value: 'Zeta Phi Rho at UCSB'}});
            fireEvent.click(inactiveField)
            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("Organization Updated - id: 17 orgCode: ZPR");
            
            expect(mockNavigate).toBeCalledWith({ "to": "/ucsborganization" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                id: 17,
                orgCode: "ZPR",
                orgTranslationShort: "Zeta Phi Rho",
                orgTranslation: "Zeta Phi Rho at UCSB",
                inactive: false
            })); // posted object


        });

        test("Changes when you click Update", async () => {

            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <UCSBOrganizationEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await screen.findByTestId("UCSBOrganizationForm-id");

            const idField = screen.getByTestId("UCSBOrganizationForm-id");
            const orgCodeField = screen.getByTestId("UCSBOrganizationForm-orgCode");
            const orgTranslationShortField = screen.getByTestId("UCSBOrganizationForm-orgTranslationShort");
            const orgTranslationField = screen.getByTestId("UCSBOrganizationForm-orgTranslation")
            const inactiveField = screen.getByTestId("UCSBOrganizationForm-inactive");
            const submitButton = screen.getByTestId("UCSBOrganizationForm-submit");

            expect(idField).toBeInTheDocument();
            expect(idField).toHaveValue("17");
            expect(orgCodeField).toBeInTheDocument()
            expect(orgCodeField).toHaveValue("ZTR");
            expect(orgTranslationShortField).toBeInTheDocument()
            expect(orgTranslationShortField).toHaveValue("Zeta Rho");
            expect(orgTranslationField).toBeInTheDocument()
            expect(orgTranslationField).toHaveValue("Zeta Rho at UCSB")
            expect(inactiveField).toBeInTheDocument()
            expect(inactiveField).toBeChecked()

            expect(submitButton).toBeInTheDocument();
            expect(submitButton).toHaveTextContent("Update");

            
            fireEvent.change(orgCodeField,{target: {value: 'ZPR'}});
            fireEvent.change(orgTranslationShortField,{target: {value: 'Zeta Phi Rho'}});
            fireEvent.change(orgTranslationField,{target: {value: 'Zeta Phi Rho at UCSB'}});
            fireEvent.change(inactiveField,{target: {value: false}});
            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled());
            expect(mockToast).toBeCalledWith("Organization Updated - id: 17 orgCode: ZPR");
            expect(mockNavigate).toBeCalledWith({ "to": "/ucsborganization" });
        });

       
    });
});
