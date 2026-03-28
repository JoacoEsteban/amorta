if (import.meta.main) {
  await exec()
}

export async function exec() {
  console.log('Running tsc')
  await Bun.$`tsc`
  console.log('Running tests')
  await Bun.$`bun run test`
}
