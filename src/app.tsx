import type { ReactNode } from "react";
import { Copy, Landmark, Percent, PencilLine, RotateCcw, Share2, Wallet } from "lucide-react";
import toast from "react-hot-toast";
import { P, match } from "ts-pattern";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  type TooltipContentProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

import type { PaymentFrequency } from "./domain/amortization";
import { buildShareUrl, type RouteState } from "./domain/share";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select } from "./components/ui/select";
import {
  clearLoanStateFromLocalStorage,
  defaultLoanStore,
  type LoanStore,
  saveLoanStateToLocalStorage,
} from "./state/loan-store";

const paymentFrequencyOptions: Array<{
  label: string;
  value: PaymentFrequency;
}> = [
  { label: "1 payment / year", value: 1 },
  { label: "3 payments / year", value: 3 },
  { label: "6 payments / year", value: 6 },
  { label: "12 payments / year", value: 12 },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 3,
});

const READONLY_MESSAGE =
  "This shared result is readonly. Use “Edit this result” to continue from these values.";

const parseFrequency = (rawValue: string): PaymentFrequency =>
  match(Number(rawValue))
    .with(1, () => 1 as const)
    .with(3, () => 3 as const)
    .with(6, () => 6 as const)
    .otherwise(() => 12 as const);

const formatCurrency = (value: number): string => currencyFormatter.format(value);

const formatCompactCurrency = (value: number): string =>
  compactCurrencyFormatter.format(value);

const formatPercent = (value: number): string => percentFormatter.format(value);

const formatShareOfTotal = (value: number, total: number): string =>
  match(total > 0)
    .with(true, () => formatPercent(value / total))
    .otherwise(() => "0%");

const copyShareUrl = (shareUrl: string): void => {
  const clipboard = match(typeof navigator)
    .with("undefined", () => null)
    .otherwise(() => navigator.clipboard);

  match(clipboard)
    .with(null, () => {
      toast.error("Clipboard access is not available here.");
    })
    .otherwise((resolvedClipboard) => {
      resolvedClipboard
        .writeText(shareUrl)
        .then(() => {
          toast.success("Share URL copied to the clipboard.");
        })
        .catch(() => {
          toast.error("The share URL could not be copied.");
        });
    });
};

const navigateTo = (pathname: string): void => {
  match(typeof window)
    .with("undefined", () => null)
    .otherwise(() => {
      window.location.assign(pathname);
      return null;
    });
};

type AppProps =
  | {
      kind: "calculator";
      routeState: Extract<RouteState, { kind: "index" | "result" }>;
      store: LoanStore;
    }
  | {
      kind: "invalid-result";
      routeState: {
        kind: "result";
        payload: string | null;
        decoded: Extract<
          RouteState,
          { kind: "result" }
        >["decoded"] extends infer T
          ? Exclude<T, { kind: "valid" }>
          : never;
      };
    };

export const App = (props: AppProps) =>
  match(props)
    .with({ kind: "invalid-result" }, ({ routeState }) => (
      <InvalidResultPage routeState={routeState} />
    ))
    .with({ kind: "calculator" }, ({ routeState, store }) => (
      <CalculatorPage routeState={routeState} store={store} />
    ))
    .exhaustive();

const CalculatorPage = ({
  routeState,
  store,
}: {
  routeState: Extract<RouteState, { kind: "index" | "result" }>;
  store: LoanStore;
}) => {
  const {
    values,
    mode,
    calculation,
    storeMode,
  } = store.useDashboardViewModel();
  const isPaymentDriven = mode === "payment";
  const isReadonly = storeMode === "shared-result";
  const displayedEarValue = match({ isPaymentDriven, calculation })
    .with(
      { isPaymentDriven: true, calculation: { kind: "ready" } },
      ({ calculation: readyCalculation }) => formatPercent(readyCalculation.ear),
    )
    .with({ isPaymentDriven: true }, () => "")
    .otherwise(() => values.ear);

  const shareUrl = match(typeof window)
    .with("undefined", () => "")
    .otherwise(() => buildShareUrl(store.getValues(), window.location));

  return (
    <main className="app-shell">
      <div className="app-layout">
        <div className="page-toolbar">
          <div className="page-toolbar__copy">
            <p className="page-kicker">
              {match(storeMode)
                .with("shared-result", () => "Shared Result")
                .otherwise(() => "Live Calculator")}
            </p>
            <h1 className="page-title">
              {match(storeMode)
                .with("shared-result", () => "Shared French Amortization Result")
                .otherwise(() => "French Amortization Calculator")}
            </h1>
            <p className="page-summary">
              {match(storeMode)
                .with(
                  "shared-result",
                  () =>
                    "Review the loan schedule, compare principal and interest for each quota, and copy the readonly result URL.",
                )
                .otherwise(
                  () =>
                    "Model a French-style loan, invert a payment into its effective annual rate, and inspect the amortization schedule visually.",
                )}
            </p>
          </div>
          <button
            type="button"
            className="action-button action-button--primary"
            onClick={() => copyShareUrl(shareUrl)}
          >
            <Share2 size={16} />
            <span>Share result</span>
          </button>
        </div>

        <section className="app-grid">
          <Card className="panel-card panel-card--inputs">
            <CardHeader className="panel-card__header panel-card__header--accent">
              <CardTitle>
                {match(storeMode)
                  .with("shared-result", () => "Shared Inputs")
                  .otherwise(() => "French Mortgage Inputs")}
              </CardTitle>
              <CardDescription>
                {match(storeMode)
                  .with(
                    "shared-result",
                    () =>
                      "These values came from a shared result and cannot be edited in place.",
                  )
                  .otherwise(
                    () =>
                      "Change any value and the amortization schedule recomputes immediately.",
                  )}
              </CardDescription>
            </CardHeader>
            <CardContent className="panel-card__content form-stack">
              <FieldShell readonly={isReadonly}>
                <Label htmlFor="loan-amount">Loan amount</Label>
                <Input
                  id="loan-amount"
                  inputMode="decimal"
                  value={values.loanAmount}
                  onChange={(event) => store.setLoanAmount(event.currentTarget.value)}
                  placeholder="250000"
                  readOnly={isReadonly}
                />
              </FieldShell>

              <FieldShell readonly={isReadonly}>
                <Label htmlFor="years">Time in years</Label>
                <Input
                  id="years"
                  inputMode="decimal"
                  value={values.years}
                  onChange={(event) => store.setYears(event.currentTarget.value)}
                  placeholder="30"
                  readOnly={isReadonly}
                />
              </FieldShell>

              <FieldShell readonly={isReadonly}>
                <Label htmlFor="payments-per-year">Payments per year</Label>
                <Select
                  id="payments-per-year"
                  value={String(values.paymentsPerYear)}
                  onChange={(event) =>
                    store.setPaymentsPerYear(parseFrequency(event.currentTarget.value))
                  }
                  disabled={isReadonly}
                >
                  {paymentFrequencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FieldShell>

              <FieldShell readonly={isReadonly}>
                <Label htmlFor="ear">Effective annual rate</Label>
                <Input
                  id="ear"
                  inputMode="decimal"
                  value={displayedEarValue}
                  onChange={(event) => store.setEar(event.currentTarget.value)}
                  placeholder={match(isPaymentDriven)
                    .with(true, () => "Calculated automatically")
                    .otherwise(() => "0.12")}
                  disabled={isReadonly || isPaymentDriven}
                  readOnly={isReadonly}
                />
                <p className="field-note">
                  {match({ isReadonly, isPaymentDriven })
                    .with({ isReadonly: true }, () => READONLY_MESSAGE)
                    .with(
                      { isPaymentDriven: true },
                      () =>
                        "Disabled while a payment amount is provided. The app derives EAR from that payment.",
                    )
                    .otherwise(
                      () =>
                        "Use decimal format. Example: 0.12 means a 12% effective annual rate.",
                    )}
                </p>
              </FieldShell>

              <FieldShell readonly={isReadonly}>
                <Label htmlFor="payment-amount">Payment amount (optional override)</Label>
                <Input
                  id="payment-amount"
                  inputMode="decimal"
                  value={values.paymentAmount}
                  onChange={(event) => store.setPaymentAmount(event.currentTarget.value)}
                  placeholder="Leave blank to derive payment"
                  readOnly={isReadonly}
                />
                <p className="field-note">
                  {match(isReadonly)
                    .with(true, () => READONLY_MESSAGE)
                    .otherwise(
                      () =>
                        "Fill this to switch into payment-driven mode and calculate the EAR dynamically.",
                    )}
                </p>
              </FieldShell>

              {match(routeState)
                .with({ kind: "result", decoded: { kind: "valid" } }, () => (
                  <div className="result-actions">
                    <button
                      type="button"
                      className="action-button action-button--secondary"
                      onClick={() => {
                        clearLoanStateFromLocalStorage();
                        navigateTo("/");
                      }}
                    >
                      <RotateCcw size={16} />
                      <span>Start new calculation</span>
                    </button>
                    <button
                      type="button"
                      className="action-button action-button--primary"
                      onClick={() => {
                        saveLoanStateToLocalStorage(values);
                        navigateTo("/");
                      }}
                    >
                      <PencilLine size={16} />
                      <span>Edit this result</span>
                    </button>
                  </div>
                ))
                .otherwise(() => null)}
            </CardContent>
          </Card>

          <div className="dashboard-stack">
            <div className="summary-grid">
              <SummaryCard
                icon={<Wallet />}
                label="Active payment"
                value={match(calculation)
                  .with({ kind: "ready" }, ({ payment }) => formatCurrency(payment))
                  .otherwise(() => "Waiting for valid inputs")}
              />
              <SummaryCard
                icon={<Percent />}
                label="Active EAR"
                value={match(calculation)
                  .with({ kind: "ready" }, ({ ear }) => formatPercent(ear))
                  .otherwise(() => "Waiting for valid inputs")}
              />
              <SummaryCard
                icon={<Landmark />}
                label="Repayment horizon"
                value={match(calculation)
                  .with(
                    { kind: "ready" },
                    ({ paymentCount, paymentsPerYear }) =>
                      `${paymentCount} installments at ${paymentsPerYear}/year`,
                  )
                  .otherwise(() => "Waiting for valid inputs")}
              />
            </div>

            <Card className="panel-card panel-card--chart">
              <CardHeader className="panel-card__header panel-card__header--plain">
                <CardTitle>Amortization Graph</CardTitle>
                <CardDescription>
                  Principal and interest are stacked for each quota, with a final zero point appended for payoff closure.
                </CardDescription>
              </CardHeader>
              <CardContent className="panel-card__content chart-stack">
                {match(calculation)
                  .with({ kind: "invalid" }, ({ errors }) => (
                    <div className="error-box">
                      <p className="error-box__title">The schedule cannot be graphed yet.</p>
                      <ul className="error-box__list">
                        {errors.map((error) => (
                          <li key={error}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                  .with({ kind: "ready" }, (ready) => (
                    <>
                      <div className="metrics-grid">
                        <Metric
                          label="Loan amount"
                          value={formatCurrency(ready.loanAmount)}
                          detail={formatShareOfTotal(ready.loanAmount, ready.totalPaid)}
                        />
                        <Metric
                          label="Total interest"
                          value={formatCurrency(ready.totalInterest)}
                          detail={formatShareOfTotal(ready.totalInterest, ready.totalPaid)}
                        />
                        <Metric
                          label="Total paid"
                          value={formatCurrency(ready.totalPaid)}
                          detail={`${(ready.totalPaid / ready.loanAmount).toFixed(2)}x principal repaid`}
                        />
                      </div>

                      <div className="chart-frame">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={ready.chartRows} barCategoryGap={2}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#d6d3d1" />
                            <XAxis dataKey="quotaLabel" stroke="#57534e" tickLine={false} />
                            <YAxis
                              stroke="#57534e"
                              tickFormatter={formatCompactCurrency}
                              tickLine={false}
                              axisLine={false}
                            />
                            <Tooltip
                              content={QuotaTooltip}
                              cursor={{ fill: "rgba(217, 119, 6, 0.08)" }}
                            />
                            <Legend />
                            <Bar
                              dataKey="principal"
                              name="Principal"
                              stackId="payment"
                              fill="#b45309"
                              radius={[10, 10, 0, 0]}
                            />
                            <Bar
                              dataKey="interest"
                              name="Interest"
                              stackId="payment"
                              fill="#f59e0b"
                              radius={[10, 10, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </>
                  ))
                  .exhaustive()}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
};

const InvalidResultPage = ({
  routeState,
}: {
  routeState: {
    kind: "result";
    payload: string | null;
    decoded: Exclude<Extract<RouteState, { kind: "result" }>["decoded"], { kind: "valid" }>;
  };
}) => (
  <main className="app-shell">
    <div className="app-layout">
      <div className="page-toolbar">
        <div className="page-toolbar__copy">
          <p className="page-kicker">Shared Result</p>
          <h1 className="page-title">Shared result unavailable</h1>
        </div>
        <button
          type="button"
          className="action-button action-button--disabled"
          disabled
          title="A valid shared result is required before it can be shared again."
        >
          <Share2 size={16} />
          <span>Share result</span>
        </button>
      </div>

      <Card className="panel-card panel-card--message">
        <CardHeader className="panel-card__header panel-card__header--plain">
          <CardTitle>
            {match(routeState.decoded.kind)
              .with("missing", () => "No shared result found")
              .otherwise(() => "This shared result is invalid")}
          </CardTitle>
          <CardDescription>{routeState.decoded.message}</CardDescription>
        </CardHeader>
        <CardContent className="panel-card__content message-actions">
          <button
            type="button"
            className="action-button action-button--primary"
            onClick={() => navigateTo("/")}
          >
            <RotateCcw size={16} />
            <span>Open calculator</span>
          </button>
        </CardContent>
      </Card>
    </div>
  </main>
);

const FieldShell = ({
  children,
  readonly,
}: {
  children: ReactNode;
  readonly: boolean;
}) => (
  <div
    className={match(readonly)
      .with(true, () => "field-group field-group--readonly")
      .otherwise(() => "field-group")}
    title={match(readonly)
      .with(true, () => READONLY_MESSAGE)
      .otherwise(() => undefined)}
  >
    {children}
  </div>
);

const SummaryCard = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) => (
  <Card className="summary-card">
    <CardContent className="summary-card__content">
      <div className="summary-icon">{icon}</div>
      <div className="summary-copy">
        <p className="summary-label">{label}</p>
        <p className="summary-value">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const Metric = ({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) => (
  <div className="metric-card">
    <p className="metric-label">{label}</p>
    <p className="metric-value">{value}</p>
    {match(detail)
      .with(undefined, () => null)
      .otherwise((resolvedDetail) => (
        <p className="metric-detail">{resolvedDetail}</p>
      ))}
  </div>
);

const QuotaTooltip = ({ active, payload, label }: TooltipContentProps<ValueType, NameType>) =>
  match(Boolean(active) && Array.isArray(payload) && payload.length > 0)
    .with(false, () => null)
    .otherwise(() => {
      const row = payload?.[0]?.payload as
        | {
            payment?: number;
            principal?: number;
            interest?: number;
          }
        | undefined;

      const payment = Number(row?.payment ?? 0);
      const principal = Number(row?.principal ?? 0);
      const interest = Number(row?.interest ?? 0);

      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip__title">{`Quota ${String(label)}`}</p>
          <div className="chart-tooltip__rows">
            <div className="chart-tooltip__row">
              <span>Total</span>
              <strong>{formatCurrency(payment)}</strong>
            </div>
            <div className="chart-tooltip__row">
              <span>Principal</span>
              <strong>{`${formatCurrency(principal)} (${formatShareOfTotal(principal, payment)})`}</strong>
            </div>
            <div className="chart-tooltip__row">
              <span>Interest</span>
              <strong>{`${formatCurrency(interest)} (${formatShareOfTotal(interest, payment)})`}</strong>
            </div>
          </div>
        </div>
      );
    });

export const appStore = defaultLoanStore;
