import type { ReactNode } from "react";
import { Landmark, Percent, Wallet } from "lucide-react";
import { match } from "ts-pattern";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { PaymentFrequency } from "./domain/amortization";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select } from "./components/ui/select";
import {
  setEar,
  setLoanAmount,
  setPaymentAmount,
  setPaymentsPerYear,
  setYears,
  useDashboardViewModel,
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

export const App = () => {
  const { values, mode, calculation } = useDashboardViewModel();
  const isPaymentDriven = mode === "payment";

  return (
    <main className="app-shell">
      <div className="app-layout">
        <section className="app-grid">
          <Card className="panel-card panel-card--inputs">
            <CardHeader className="panel-card__header panel-card__header--accent">
              <CardTitle>French Mortgage Inputs</CardTitle>
              <CardDescription>
                Change any value and the amortization schedule recomputes immediately.
              </CardDescription>
            </CardHeader>
            <CardContent className="panel-card__content form-stack">
              <div className="field-group">
                <Label htmlFor="loan-amount">Loan amount</Label>
                <Input
                  id="loan-amount"
                  inputMode="decimal"
                  value={values.loanAmount}
                  onChange={(event) => setLoanAmount(event.currentTarget.value)}
                  placeholder="250000"
                />
              </div>

              <div className="field-group">
                <Label htmlFor="years">Time in years</Label>
                <Input
                  id="years"
                  inputMode="decimal"
                  value={values.years}
                  onChange={(event) => setYears(event.currentTarget.value)}
                  placeholder="30"
                />
              </div>

              <div className="field-group">
                <Label htmlFor="payments-per-year">Payments per year</Label>
                <Select
                  id="payments-per-year"
                  value={String(values.paymentsPerYear)}
                  onChange={(event) =>
                    setPaymentsPerYear(parseFrequency(event.currentTarget.value))
                  }
                >
                  {paymentFrequencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="field-group">
                <Label htmlFor="ear">Effective annual rate</Label>
                <Input
                  id="ear"
                  inputMode="decimal"
                  value={values.ear}
                  onChange={(event) => setEar(event.currentTarget.value)}
                  placeholder="0.12"
                  disabled={isPaymentDriven}
                />
                <p className="field-note">
                  {match(isPaymentDriven)
                    .with(
                      true,
                      () =>
                        "Disabled while a payment amount is provided. The app derives EAR from that payment.",
                    )
                    .otherwise(
                      () =>
                        "Use decimal format. Example: 0.12 means a 12% effective annual rate.",
                    )}
                </p>
              </div>

              <div className="field-group">
                <Label htmlFor="payment-amount">Payment amount (optional override)</Label>
                <Input
                  id="payment-amount"
                  inputMode="decimal"
                  value={values.paymentAmount}
                  onChange={(event) => setPaymentAmount(event.currentTarget.value)}
                  placeholder="Leave blank to derive payment"
                />
                <p className="field-note">
                  Fill this to switch into payment-driven mode and calculate the EAR dynamically.
                </p>
              </div>
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
                        <Metric label="Total interest" value={formatCurrency(ready.totalInterest)} />
                        <Metric label="Total paid" value={formatCurrency(ready.totalPaid)} />
                        <Metric
                          label="Final point"
                          value={`Quota ${ready.paymentCount + 1} closes at 0`}
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
                              formatter={(value, name) => [
                                formatCurrency(Number(value ?? 0)),
                                match(name)
                                  .with("principal", () => "Principal")
                                  .with("interest", () => "Interest")
                                  .with("remainingBalance", () => "Remaining balance")
                                  .otherwise(() => String(name)),
                              ]}
                              labelFormatter={(label) => `Quota ${label}`}
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

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="metric-card">
    <p className="metric-label">{label}</p>
    <p className="metric-value">{value}</p>
  </div>
);
