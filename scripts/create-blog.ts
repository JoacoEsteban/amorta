if (import.meta.main) await exec()

export async function exec() {
  await Bun.$`pi --model openrouter/minimax-m2.7 "new blog: ./specs/new-blog-post-spec.md. This is an unassisted task. Commit your changes when you finish. the runner will push them if they are valid."`
}
