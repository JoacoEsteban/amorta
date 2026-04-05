import { type BunPlugin } from 'bun'
import { resolve } from 'path'

export type TailwindPluginConfig = {
  inputFile: string
  minify?: boolean
}

/**

 * @description Bun Tailwind CLI Plugin gives support for tailwind > 4 and Bun bundler using Tailwind CLI as a processor.

 * @param {TailwindPluginConfig} config - The configuration object for the Tailwind Plugin.

 * @returns {BunPlugin} - The Bun plugin instance.

 */
const TailwindPlugin = (config: TailwindPluginConfig): BunPlugin => {
  return {
    name: '@joacoesteban/bun-tailwind-cli-plugin',
    setup(builder) {
      const filter = /\.css$/
      if (!filter.test(config.inputFile)) {
        throw new Error(
          `Config's input file should be a css file, received ${config.inputFile}`,
        )
      }

      const resolvedOutputFile = resolve(config.inputFile)

      let ran = false

      builder.onLoad({ filter }, async (args) => {
        if (args.path !== resolvedOutputFile) {
          console.info(
            `Got css file ${args.path} instead of ${resolvedOutputFile}`,
          )
          return
        }

        if (ran) {
          throw new Error(
            `Tailwind plugin has already ran for ${resolvedOutputFile}`,
          )
        }

        const [original, twOutput] = await Promise.all([
          Bun.file(args.path).text(),
          Bun.$`tailwindcss -i node_modules/tailwindcss/index.css ${config.minify ? ' --minify' : ''}`.text(),
        ])

        const augmented = `${twOutput}\n${original}`

        ran = true
        return {
          contents: augmented,
          loader: 'css',
        }
      })

      builder.onEnd(() => {
        if (!ran) {
          throw new Error(
            `Tailwind did not run. Check if you've imported ${config.inputFile} in your code.`,
          )
        }
      })
    },
  }
}

export { TailwindPlugin as tailwind }
