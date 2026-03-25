import { useState } from 'react'
import { Download, FileJson, FileSpreadsheet } from 'lucide-react'
import { match } from 'ts-pattern'

import type { CalculationResult } from '../domain/amortization'
import type { ExportableCalculation } from '../domain/export'
import { buildCsvContent, buildJsonContent } from '../domain/export'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './ui/dialog'
import { i18n } from '../i18n/index.js'
import { locale$ } from '../i18n/locale-state'

type ExportModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  calculation: Extract<CalculationResult, { kind: 'ready' }>
}

const triggerDownload = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

const toExportable = (
  calculation: Extract<CalculationResult, { kind: 'ready' }>,
): ExportableCalculation => ({
  loanAmount: calculation.loanAmount,
  years: calculation.years,
  paymentsPerYear: calculation.paymentsPerYear,
  paymentCount: calculation.paymentCount,
  periodicRate: calculation.periodicRate,
  ear: calculation.ear,
  payment: calculation.payment,
  totalInterest: calculation.totalInterest,
  totalPaid: calculation.totalPaid,
  schedule: calculation.schedule,
})

export const ExportModal = ({
  open,
  onOpenChange,
  calculation,
}: ExportModalProps) => {
  const [downloading, setDownloading] = useState<'csv' | 'json' | null>(null)

  const handleDownloadCsv = (): void => {
    setDownloading('csv')
    const locale = locale$.getValue()
    const content = buildCsvContent(toExportable(calculation), locale)
    const filename = `amortization-schedule-${calculation.loanAmount}-${calculation.years}yr.csv`
    triggerDownload(content, filename)
    setTimeout(() => setDownloading(null), 600)
  }

  const handleDownloadJson = (): void => {
    setDownloading('json')
    const content = buildJsonContent(toExportable(calculation), null)
    const filename = `amortization-schedule-${calculation.loanAmount}-${calculation.years}yr.json`
    triggerDownload(content, filename)
    setTimeout(() => setDownloading(null), 600)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{i18n._('exportSchedule')}</DialogTitle>
          <DialogDescription>
            {i18n._('exportScheduleDescription')}
          </DialogDescription>
        </DialogHeader>

        <div className="export-options">
          <button
            type="button"
            className="export-option"
            onClick={handleDownloadCsv}
            disabled={downloading !== null}
          >
            <div className="export-option__icon">
              <FileSpreadsheet size={22} />
            </div>
            <div className="export-option__copy">
              <span className="export-option__label">
                {i18n._('downloadCsv')}
              </span>
              <span className="export-option__detail">
                {i18n._('downloadCsvDetail')}
              </span>
            </div>
            <div className="export-option__action">
              {match(downloading)
                .with('csv', () => (
                  <Download size={16} className="export-option__spinner" />
                ))
                .otherwise(() => (
                  <Download size={16} />
                ))}
            </div>
          </button>

          <button
            type="button"
            className="export-option"
            onClick={handleDownloadJson}
            disabled={downloading !== null}
          >
            <div className="export-option__icon">
              <FileJson size={22} />
            </div>
            <div className="export-option__copy">
              <span className="export-option__label">
                {i18n._('downloadJson')}
              </span>
              <span className="export-option__detail">
                {i18n._('downloadJsonDetail')}
              </span>
            </div>
            <div className="export-option__action">
              {match(downloading)
                .with('json', () => (
                  <Download size={16} className="export-option__spinner" />
                ))
                .otherwise(() => (
                  <Download size={16} />
                ))}
            </div>
          </button>
        </div>

        <DialogFooter>
          <DialogClose
            className="export-close"
            onClick={() => onOpenChange(false)}
          >
            {i18n._('cancel')}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
