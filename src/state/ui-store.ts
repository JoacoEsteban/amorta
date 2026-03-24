import { bind, shareLatest } from '@react-rxjs/core'
import { BehaviorSubject, combineLatest } from 'rxjs'

export type UIViewModel = {
  tableExpanded: boolean
}

export type UIStore = {
  useUIViewModel: () => UIViewModel
  setTableExpanded: (value: boolean) => void
  toggleTableExpanded: () => void
}

export const createUIStore = (): UIStore => {
  const tableExpandedSubject = new BehaviorSubject(false)

  const values$ = combineLatest({
    tableExpanded: tableExpandedSubject,
  }).pipe(shareLatest())

  const initialViewModel: UIViewModel = {
    tableExpanded: false,
  }

  const [useUIViewModel] = bind(values$, initialViewModel)

  return {
    useUIViewModel,
    setTableExpanded: (value) => tableExpandedSubject.next(value),
    toggleTableExpanded: () =>
      tableExpandedSubject.next(!tableExpandedSubject.value),
  }
}
