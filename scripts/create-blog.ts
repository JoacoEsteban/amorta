if (import.meta.main) await exec()

export async function exec() {
  await Bun.$`pi --model opencode-go/kimi-k2.5 "new blog: ./specs/new-blog-post-spec.md. This is an unassisted task. Commit your changes when you finish. the runner will push them if they are valid."`
}
