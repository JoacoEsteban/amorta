# French amortization graph app

This is a spec for an application that graphs mortgages using french amortization system.
The app should be a SPA web app that takes the following inputs:

- Loan amount
- Time in years
- Amount of payments per year (should be enum 1 / 3 / 6 / 12)
- Effective Annual Rate (EAR)
- Optionally the payment amount can be inputted and the EAR should be calculated dynamically

It's output should be a bar chart graph with x being the payment quota (1..n) and in Y it should show the principal and interests being stacked.
When X reaches N Y should display 0.

There should be no 'submit' button as changing any value should impact the graph immediately

Technical spec:

- use Bun as runtime and pkg manager
- use React
- use the best graphing package that you think of
- use typescript
- use shad-cn for components
- the repository uses jj, not git, so use jj for VC.

Styleguide:

- no hidden control flow, therefore, no try/catch
- use promises with .then and .catch to express things as expressions with returning values instead of imperative let + try/catch assignments
- use ts-pattern package to handle logic, no if/else cases at all. Prefer pattern matching with ts-pattern `match` and `P.(types)`
- for reactivity use rx-js along with @react-rxjs/core @react-rxjs/utils. I don't want react style logic with hooks. The logic should be expressed with observables and subjects and react should consume theme with react-rxjs corresponding bindings
