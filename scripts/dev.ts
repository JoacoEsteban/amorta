import { exec as build } from './build'
import { exec as preview } from './preview'

if (import.meta.main) {
  exec()
}

export async function exec() {
  await build('dev')
  await preview()
}
