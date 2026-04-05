import type { ReactNode } from 'react'
import { PencilLine, RotateCcw } from 'lucide-react'
import { match } from 'ts-pattern'

import type { PaymentFrequency } from '../domain/amortization'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select } from './ui/select'
import { useTranslator } from '../state/locale.js'
import type { LoanStore } from '../state/loan-store'
import {
  clearLoanStateFromLocalStorage,
  saveLoanStateToLocalStorage,
} from '../state/loan-store'
import type { RouteState } from '../domain/share'

const parseFrequency = (rawValue: string): PaymentFrequency =>
  match(Number(rawValue))
    .with(1, () => 1 as const)
    .with(3, () => 3 as const)
    .with(6, () => 6 as const)
    .otherwise(() => 12 as const)

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 3,
})

const formatPercent = (value: number): string => percentFormatter.format(value)

const FieldShell = ({
  children,
  readonly,
}: {
  children: ReactNode
  readonly: boolean
}) => {
  const { _ } = useTranslator()
  return (
    <div
      className={match(readonly)
        .with(true, () => 'field-group field-group--readonly')
        .otherwise(() => 'field-group')}
      title={match(readonly)
        .with(true, () => _('fieldNoteReadonly'))
        .otherwise(() => undefined)}
    >
      {children}
    </div>
  )
}

type LoanFormValues = {
  loanAmount: string
  years: string
  paymentsPerYear: PaymentFrequency
  ear: string
  paymentAmount: string
}

type LoanFormProps = {
  values: LoanFormValues
  store: LoanStore
  storeMode: 'local' | 'session' | 'shared-result'
  isReadonly: boolean
  isPaymentDriven: boolean
  isPendingResult: boolean
  displayedEarValue: string
  routeState:
    | Extract<RouteState, { kind: 'index' }>
    | {
        kind: 'result'
        payload: string | null
        decoded: Extract<
          RouteState,
          { kind: 'result' }
        >['decoded'] extends infer T
          ? Extract<T, { kind: 'pending' | 'valid' }>
          : never
      }
  onNavigate: (pathname: string) => void
}

const LoanForm = ({
  values,
  store,
  storeMode,
  isReadonly,
  isPaymentDriven,
  isPendingResult,
  displayedEarValue,
  routeState,
  onNavigate,
}: LoanFormProps) => {
  const { _ } = useTranslator()

  const paymentFrequencyOptions: Array<{
    label: string
    value: PaymentFrequency
  }> = [
    { label: _('frequencyOnePayment'), value: 1 },
    { label: _('frequencyThreePayments'), value: 3 },
    { label: _('frequencySixPayments'), value: 6 },
    { label: _('frequencyTwelvePayments'), value: 12 },
  ]

  return (
    <Card className="panel-card panel-card--inputs h-fit xl:sticky top-6">
      <CardHeader className="panel-card__header panel-card__header--accent">
        <CardTitle>
          {match({ storeMode, isPendingResult })
            .with({ isPendingResult: true }, () => _('sharedInputs'))
            .with({ storeMode: 'shared-result' }, () => _('sharedInputs'))
            .otherwise(() => _('frenchMortgageInputs'))}
        </CardTitle>
        <CardDescription>
          {match({ storeMode, isPendingResult })
            .with({ storeMode: 'shared-result' }, () =>
              _('sharedInputsDescription'),
            )
            .otherwise(() => _('changeValueDescription'))}
        </CardDescription>
      </CardHeader>
      <CardContent className="panel-card__content form-stack">
        <FieldShell readonly={isReadonly}>
          <Label htmlFor="loan-amount">{_('loanAmount')}</Label>
          <Input
            id="loan-amount"
            inputMode="decimal"
            value={values.loanAmount}
            onChange={(event) => store.setLoanAmount(event.currentTarget.value)}
            placeholder={_('placeholderLoanAmount')}
            readOnly={isReadonly}
          />
        </FieldShell>

        <FieldShell readonly={isReadonly}>
          <Label htmlFor="years">{_('timeInYears')}</Label>
          <Input
            id="years"
            inputMode="decimal"
            value={values.years}
            onChange={(event) => store.setYears(event.currentTarget.value)}
            placeholder={_('placeholderYears')}
            readOnly={isReadonly}
          />
        </FieldShell>

        <FieldShell readonly={isReadonly}>
          <Label htmlFor="payments-per-year">{_('paymentsPerYear')}</Label>
          <Select
            id="payments-per-year"
            value={String(values.paymentsPerYear)}
            onChange={(event) =>
              store.setPaymentsPerYear(
                parseFrequency(event.currentTarget.value),
              )
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
          <Label htmlFor="ear">{_('effectiveAnnualRate')}</Label>
          <Input
            id="ear"
            inputMode="decimal"
            value={displayedEarValue}
            onChange={(event) => store.setEar(event.currentTarget.value)}
            placeholder={match({ isPaymentDriven, isPendingResult })
              .with({ isPendingResult: true }, () => _('loadingSharedResult'))
              .with({ isPaymentDriven: true }, () =>
                _('calculatedAutomatically'),
              )
              .otherwise(() => _('placeholderEar'))}
            disabled={isReadonly || isPaymentDriven}
            readOnly={isReadonly}
          />
          <p className="field-note">
            {match({ isReadonly, isPaymentDriven, isPendingResult })
              .with({ isReadonly: true }, () => _('fieldNoteReadonly'))
              .with({ isPaymentDriven: true }, () => _('fieldNoteEarDisabled'))
              .otherwise(() => _('fieldNoteEarFormat'))}
          </p>
        </FieldShell>

        <FieldShell readonly={isReadonly}>
          <Label htmlFor="payment-amount">
            {_('paymentAmountOptionalOverride')}
          </Label>
          <Input
            id="payment-amount"
            inputMode="decimal"
            value={values.paymentAmount}
            onChange={(event) =>
              store.setPaymentAmount(event.currentTarget.value)
            }
            placeholder={_('placeholderPaymentAmount')}
            readOnly={isReadonly}
          />
          <p className="field-note">
            {match({ isReadonly, isPendingResult })
              .with({ isReadonly: true }, () => _('fieldNoteReadonly'))
              .otherwise(() => _('fieldNotePaymentOverride'))}
          </p>
        </FieldShell>

        {match(routeState)
          .with({ kind: 'result', decoded: { kind: 'valid' } }, () => (
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="action-button action-button--secondary"
                onClick={() => {
                  clearLoanStateFromLocalStorage()
                  onNavigate('/')
                }}
              >
                <RotateCcw size={16} />
                <span>{_('startNewCalculation')}</span>
              </button>
              <button
                type="button"
                className="action-button action-button--primary"
                onClick={() => {
                  saveLoanStateToLocalStorage(values)
                  onNavigate('/')
                }}
              >
                <PencilLine size={16} />
                <span>{_('editThisResult')}</span>
              </button>
            </div>
          ))
          .otherwise(() => null)}
      </CardContent>
    </Card>
  )
}

export { LoanForm, FieldShell }
export type { LoanFormValues }
