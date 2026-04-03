if (import.meta.main) {
  await exec()
}

export async function exec(target: 'dev' | 'prod' = 'prod') {
  console.log('Running tsc')
  await Bun.$`tsc`
  console.log('Running tests')
  await Bun.$`bun run test`
  if (target === 'dev') {
    console.log('Running prettier')
    await Bun.$`bun run prettier`
  }
}
