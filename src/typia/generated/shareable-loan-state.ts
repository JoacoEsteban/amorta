import * as __typia_transform__validateReport from 'typia/lib/internal/_validateReport.js'
import * as __typia_transform__createStandardSchema from 'typia/lib/internal/_createStandardSchema.js'
import type { ShareableLoanState } from '../../domain/share'
export const validateShareableLoanState = (() => {
  const _io0 = (input: any): boolean =>
    'string' === typeof input.loanAmount &&
    'string' === typeof input.years &&
    (1 === input.paymentsPerYear ||
      3 === input.paymentsPerYear ||
      6 === input.paymentsPerYear ||
      12 === input.paymentsPerYear) &&
    'string' === typeof input.ear &&
    'string' === typeof input.paymentAmount
  const _vo0 = (
    input: any,
    _path: string,
    _exceptionable: boolean = true,
  ): boolean =>
    [
      'string' === typeof input.loanAmount ||
        _report(_exceptionable, {
          path: _path + '.loanAmount',
          expected: 'string',
          value: input.loanAmount,
        }),
      'string' === typeof input.years ||
        _report(_exceptionable, {
          path: _path + '.years',
          expected: 'string',
          value: input.years,
        }),
      1 === input.paymentsPerYear ||
        3 === input.paymentsPerYear ||
        6 === input.paymentsPerYear ||
        12 === input.paymentsPerYear ||
        _report(_exceptionable, {
          path: _path + '.paymentsPerYear',
          expected: '(1 | 12 | 3 | 6)',
          value: input.paymentsPerYear,
        }),
      'string' === typeof input.ear ||
        _report(_exceptionable, {
          path: _path + '.ear',
          expected: 'string',
          value: input.ear,
        }),
      'string' === typeof input.paymentAmount ||
        _report(_exceptionable, {
          path: _path + '.paymentAmount',
          expected: 'string',
          value: input.paymentAmount,
        }),
    ].every((flag: boolean) => flag)
  const __is = (input: any): input is ShareableLoanState =>
    'object' === typeof input && null !== input && _io0(input)
  let errors: any
  let _report: any
  return __typia_transform__createStandardSchema._createStandardSchema(
    (input: any): import('typia').IValidation<ShareableLoanState> => {
      if (false === __is(input)) {
        errors = []
        _report = (__typia_transform__validateReport._validateReport as any)(
          errors,
        )
        ;((input: any, _path: string, _exceptionable: boolean = true) =>
          ((('object' === typeof input && null !== input) ||
            _report(true, {
              path: _path + '',
              expected: 'LoanFormValues',
              value: input,
            })) &&
            _vo0(input, _path + '', true)) ||
          _report(true, {
            path: _path + '',
            expected: 'LoanFormValues',
            value: input,
          }))(input, '$input', true)
        const success = 0 === errors.length
        return success
          ? {
              success,
              data: input,
            }
          : ({
              success,
              errors,
              data: input,
            } as any)
      }
      return {
        success: true,
        data: input,
      } as any
    },
  )
})()
