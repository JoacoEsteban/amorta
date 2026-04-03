if (import.meta.main) await exec()

export async function exec() {
  await Bun.$`/opt/homebrew/bin/opencode run "new blog: @specs/blog-posts.md. this is an unassisted task. commit your changes when you finish"`
}
