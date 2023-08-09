function stryNS_9fa48() {
  var g = new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import MenuItemReviewForm from "main/components/MenuItemReview/MenuItemReviewForm";
import { menuItemReviewFixtures } from "fixtures/menuItemReviewFixtures";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
const mockedNavigate = jest.fn();
jest.mock(stryMutAct_9fa48("0") ? "" : (stryCov_9fa48("0"), 'react-router-dom'), stryMutAct_9fa48("1") ? () => undefined : (stryCov_9fa48("1"), () => stryMutAct_9fa48("2") ? {} : (stryCov_9fa48("2"), {
  ...jest.requireActual(stryMutAct_9fa48("3") ? "" : (stryCov_9fa48("3"), 'react-router-dom')),
  useNavigate: stryMutAct_9fa48("4") ? () => undefined : (stryCov_9fa48("4"), () => mockedNavigate)
})));
describe(stryMutAct_9fa48("5") ? "" : (stryCov_9fa48("5"), "MenuItemReviewForm tests"), () => {
  if (stryMutAct_9fa48("6")) {
    {}
  } else {
    stryCov_9fa48("6");
    const queryClient = new QueryClient();
    const expectedHeaders = stryMutAct_9fa48("7") ? [] : (stryCov_9fa48("7"), [stryMutAct_9fa48("8") ? "" : (stryCov_9fa48("8"), "Item Id"), stryMutAct_9fa48("9") ? "" : (stryCov_9fa48("9"), "Reviewer Email"), stryMutAct_9fa48("10") ? "" : (stryCov_9fa48("10"), "Stars"), stryMutAct_9fa48("11") ? "" : (stryCov_9fa48("11"), "Date Reviewed"), stryMutAct_9fa48("12") ? "" : (stryCov_9fa48("12"), "Comments")]);
    const testId = stryMutAct_9fa48("13") ? "" : (stryCov_9fa48("13"), "MenuItemReviewForm");
    test(stryMutAct_9fa48("14") ? "" : (stryCov_9fa48("14"), "renders correctly with no initialContents"), async () => {
      if (stryMutAct_9fa48("15")) {
        {}
      } else {
        stryCov_9fa48("15");
        render(<QueryClientProvider client={queryClient}>
                <Router>
                    <MenuItemReviewForm />
                </Router>
            </QueryClientProvider>);
        expect(await screen.findByText(/Create/)).toBeInTheDocument();
        expectedHeaders.forEach(headerText => {
          if (stryMutAct_9fa48("16")) {
            {}
          } else {
            stryCov_9fa48("16");
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
          }
        });
      }
    });
    test(stryMutAct_9fa48("17") ? "" : (stryCov_9fa48("17"), "renders correctly when passing in initialContents"), async () => {
      if (stryMutAct_9fa48("18")) {
        {}
      } else {
        stryCov_9fa48("18");
        render(<QueryClientProvider client={queryClient}>
                <Router>
                    <MenuItemReviewForm initialContents={menuItemReviewFixtures.oneReview} />
                </Router>
            </QueryClientProvider>);
        expect(await screen.findByText(/Create/)).toBeInTheDocument();
        expectedHeaders.forEach(headerText => {
          if (stryMutAct_9fa48("19")) {
            {}
          } else {
            stryCov_9fa48("19");
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
          }
        });
        expect(await screen.findByTestId(stryMutAct_9fa48("20") ? `` : (stryCov_9fa48("20"), `${testId}-id`))).toBeInTheDocument();
        expect(screen.getByText(stryMutAct_9fa48("21") ? `` : (stryCov_9fa48("21"), `Id`))).toBeInTheDocument();
      }
    });
    test(stryMutAct_9fa48("22") ? "" : (stryCov_9fa48("22"), "that navigate(-1) is called when Cancel is clicked"), async () => {
      if (stryMutAct_9fa48("23")) {
        {}
      } else {
        stryCov_9fa48("23");
        render(<QueryClientProvider client={queryClient}>
                <Router>
                    <MenuItemReviewForm />
                </Router>
            </QueryClientProvider>);
        expect(await screen.findByTestId(stryMutAct_9fa48("24") ? `` : (stryCov_9fa48("24"), `${testId}-cancel`))).toBeInTheDocument();
        const cancelButton = screen.getByTestId(stryMutAct_9fa48("25") ? `` : (stryCov_9fa48("25"), `${testId}-cancel`));
        fireEvent.click(cancelButton);
        await waitFor(stryMutAct_9fa48("26") ? () => undefined : (stryCov_9fa48("26"), () => expect(mockedNavigate).toHaveBeenCalledWith(stryMutAct_9fa48("27") ? +1 : (stryCov_9fa48("27"), -1))));
      }
    });
    test(stryMutAct_9fa48("28") ? "" : (stryCov_9fa48("28"), "that the correct validations are performed"), async () => {
      if (stryMutAct_9fa48("29")) {
        {}
      } else {
        stryCov_9fa48("29");
        render(<QueryClientProvider client={queryClient}>
                <Router>
                    <MenuItemReviewForm />
                </Router>
            </QueryClientProvider>);
        expect(await screen.findByText(/Create/)).toBeInTheDocument();
        const submitButton = screen.getByText(/Create/);
        fireEvent.click(submitButton);
        await screen.findByText(/Item Id is required/);
        expect(screen.getByText(/Reviewer Email is required/)).toBeInTheDocument();
        expect(screen.getByText(/Stars are required/)).toBeInTheDocument();
        expect(screen.getByText(/Date Reviewed is required/)).toBeInTheDocument();
        expect(screen.getByText(/Comments are required/)).toBeInTheDocument();
      }
    });
    test(stryMutAct_9fa48("30") ? "" : (stryCov_9fa48("30"), "Correct Error messsages on missing input"), async () => {
      if (stryMutAct_9fa48("31")) {
        {}
      } else {
        stryCov_9fa48("31");
        render(<Router>
                <MenuItemReviewForm />
            </Router>);
        await screen.findByTestId(stryMutAct_9fa48("32") ? "" : (stryCov_9fa48("32"), "MenuItemReviewForm-submit"));
        const submitButton = screen.getByTestId(stryMutAct_9fa48("33") ? "" : (stryCov_9fa48("33"), "MenuItemReviewForm-submit"));
        fireEvent.click(submitButton);
        await screen.findByText(/Item Id is required/);
        expect(screen.getByText(/Reviewer Email is required/)).toBeInTheDocument();
        expect(screen.getByText(/Stars are required/)).toBeInTheDocument();
        expect(screen.getByText(/Date Reviewed is required/)).toBeInTheDocument();
        expect(screen.getByText(/Comments are required/)).toBeInTheDocument();
      }
    });
    test(stryMutAct_9fa48("34") ? "" : (stryCov_9fa48("34"), "No Error messsages on good input"), async () => {
      if (stryMutAct_9fa48("35")) {
        {}
      } else {
        stryCov_9fa48("35");
        const mockSubmitAction = jest.fn();
        render(<Router>
                <MenuItemReviewForm submitAction={mockSubmitAction} />
            </Router>);
        await screen.findByTestId(stryMutAct_9fa48("36") ? "" : (stryCov_9fa48("36"), "MenuItemReviewForm-item-id"));
        const itemIdField = screen.getByTestId(stryMutAct_9fa48("37") ? "" : (stryCov_9fa48("37"), "MenuItemReviewForm-item-id"));
        const reviewerEmailField = screen.getByTestId(stryMutAct_9fa48("38") ? "" : (stryCov_9fa48("38"), "MenuItemReviewForm-reviewer-email"));
        const starsField = screen.getByTestId(stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), "MenuItemReviewForm-stars"));
        const dateReviewedField = screen.getByTestId(stryMutAct_9fa48("40") ? "" : (stryCov_9fa48("40"), "MenuItemReviewForm-date-reviewed"));
        const commentsField = screen.getByTestId(stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), "MenuItemReviewForm-comments"));
        const submitButton = screen.getByTestId(stryMutAct_9fa48("42") ? "" : (stryCov_9fa48("42"), "MenuItemReviewForm-submit"));
        fireEvent.change(itemIdField, stryMutAct_9fa48("43") ? {} : (stryCov_9fa48("43"), {
          target: stryMutAct_9fa48("44") ? {} : (stryCov_9fa48("44"), {
            value: stryMutAct_9fa48("45") ? "" : (stryCov_9fa48("45"), '1')
          })
        }));
        fireEvent.change(reviewerEmailField, stryMutAct_9fa48("46") ? {} : (stryCov_9fa48("46"), {
          target: stryMutAct_9fa48("47") ? {} : (stryCov_9fa48("47"), {
            value: stryMutAct_9fa48("48") ? "" : (stryCov_9fa48("48"), 'pds@ucsb.edu')
          })
        }));
        fireEvent.change(starsField, stryMutAct_9fa48("49") ? {} : (stryCov_9fa48("49"), {
          target: stryMutAct_9fa48("50") ? {} : (stryCov_9fa48("50"), {
            value: stryMutAct_9fa48("51") ? "" : (stryCov_9fa48("51"), '5')
          })
        }));
        fireEvent.change(dateReviewedField, stryMutAct_9fa48("52") ? {} : (stryCov_9fa48("52"), {
          target: stryMutAct_9fa48("53") ? {} : (stryCov_9fa48("53"), {
            value: stryMutAct_9fa48("54") ? "" : (stryCov_9fa48("54"), '2022-01-02T12:00')
          })
        }));
        fireEvent.change(commentsField, stryMutAct_9fa48("55") ? {} : (stryCov_9fa48("55"), {
          target: stryMutAct_9fa48("56") ? {} : (stryCov_9fa48("56"), {
            value: stryMutAct_9fa48("57") ? "" : (stryCov_9fa48("57"), 'good food')
          })
        }));
        fireEvent.click(submitButton);
        await waitFor(stryMutAct_9fa48("58") ? () => undefined : (stryCov_9fa48("58"), () => expect(mockSubmitAction).toHaveBeenCalled()));
        expect(screen.queryByText(/Item Id must be a number/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Reviewer Email must be a valid email address/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Stars must be a number between 1 and 5/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Date Reviewed must be a valid date/)).not.toBeInTheDocument();
        //expect(screen.queryByText(/localDateTime must be in ISO format/)).not.toBeInTheDocument();
      }
    });

    test(stryMutAct_9fa48("59") ? "" : (stryCov_9fa48("59"), "Correct Error messsages on bad input"), async () => {
      if (stryMutAct_9fa48("60")) {
        {}
      } else {
        stryCov_9fa48("60");
        render(<Router>
                <MenuItemReviewForm />
            </Router>);
        await screen.findByTestId(stryMutAct_9fa48("61") ? "" : (stryCov_9fa48("61"), "MenuItemReviewForm-item-id"));
        const itemIdField = screen.getByTestId(stryMutAct_9fa48("62") ? "" : (stryCov_9fa48("62"), "MenuItemReviewForm-item-id"));
        const reviewerEmailField = screen.getByTestId(stryMutAct_9fa48("63") ? "" : (stryCov_9fa48("63"), "MenuItemReviewForm-reviewer-email"));
        const starsField = screen.getByTestId(stryMutAct_9fa48("64") ? "" : (stryCov_9fa48("64"), "MenuItemReviewForm-stars"));
        const dateReviewedField = screen.getByTestId(stryMutAct_9fa48("65") ? "" : (stryCov_9fa48("65"), "MenuItemReviewForm-date-reviewed"));
        const commentsField = screen.getByTestId(stryMutAct_9fa48("66") ? "" : (stryCov_9fa48("66"), "MenuItemReviewForm-comments"));
        const submitButton = screen.getByTestId(stryMutAct_9fa48("67") ? "" : (stryCov_9fa48("67"), "MenuItemReviewForm-submit"));
        fireEvent.change(itemIdField, stryMutAct_9fa48("68") ? {} : (stryCov_9fa48("68"), {
          target: stryMutAct_9fa48("69") ? {} : (stryCov_9fa48("69"), {
            value: stryMutAct_9fa48("70") ? "" : (stryCov_9fa48("70"), 'p')
          })
        }));
        fireEvent.change(reviewerEmailField, stryMutAct_9fa48("71") ? {} : (stryCov_9fa48("71"), {
          target: stryMutAct_9fa48("72") ? {} : (stryCov_9fa48("72"), {
            value: stryMutAct_9fa48("73") ? "" : (stryCov_9fa48("73"), 'pdsucsbedu')
          })
        }));
        fireEvent.change(starsField, stryMutAct_9fa48("74") ? {} : (stryCov_9fa48("74"), {
          target: stryMutAct_9fa48("75") ? {} : (stryCov_9fa48("75"), {
            value: stryMutAct_9fa48("76") ? "" : (stryCov_9fa48("76"), '8')
          })
        }));
        fireEvent.change(dateReviewedField, stryMutAct_9fa48("77") ? {} : (stryCov_9fa48("77"), {
          target: stryMutAct_9fa48("78") ? {} : (stryCov_9fa48("78"), {
            value: stryMutAct_9fa48("79") ? "" : (stryCov_9fa48("79"), 'march 2nd')
          })
        }));
        fireEvent.change(commentsField, stryMutAct_9fa48("80") ? {} : (stryCov_9fa48("80"), {
          target: stryMutAct_9fa48("81") ? {} : (stryCov_9fa48("81"), {
            value: stryMutAct_9fa48("82") ? "" : (stryCov_9fa48("82"), 'good food')
          })
        }));
        fireEvent.click(submitButton);
        await screen.findByText(/Item Id must be a number/);
        expect(screen.queryByText(/Reviewer Email must be a valid email address/)).toBeInTheDocument();
        expect(screen.queryByText(/Stars must be a number between 1 and 5/)).toBeInTheDocument();
        expect(screen.queryByText(/Date Reviewed must be a valid date/)).toBeInTheDocument();
      }
    });
  }
});