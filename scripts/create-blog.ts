if (import.meta.main) await exec()

export async function exec() {
  const model = process.env.CREATE_BLOG_MODEL ?? "openrouter/minimax-m2.7"
  const sessionDir = process.env.PI_SESSION_DIR
  const sessionArgs = sessionDir ? ["--session-dir", sessionDir] : []
  await Bun.$`pi --model ${model} ${sessionArgs} "new blog: ./specs/new-blog-post-spec.md. This is an unassisted task. Commit your changes when you finish. the runner will push them if they are valid."`
}
