if (import.meta.main) await exec()

export async function exec() {
  await Bun.$`pi "new blog: ./specs/new-blog-post-spec.md. This is an unassisted task. Commit and push your changes when you finish"`
}
