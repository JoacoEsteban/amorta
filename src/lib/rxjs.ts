import {
  map,
  Observable,
  queueScheduler,
  scheduled,
  take,
  type ObservableInput,
} from 'rxjs'

export function sync$<T>(val: ObservableInput<T>) {
  return scheduled(val, queueScheduler)
}

export function evalSync<T>(obs: Observable<T>): T {
  let value: T
  let error: unknown
  let hasValue = false

  obs.pipe(take(1)).subscribe({
    next: (v) => {
      value = v
      hasValue = true
    },
    error: (err) => {
      error = err
    },
  })

  if (error) {
    throw error
  }

  if (!hasValue) {
    throw new Error('Observable did not emit synchronously')
  }

  return value!
}

export function unwrap<T extends () => K, K>() {
  return map<() => K, K>((fn) => fn())
}
