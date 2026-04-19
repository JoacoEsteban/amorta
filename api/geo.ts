export const config = { runtime: 'edge' }

export default function handler(req: Request): Response {
  const country = req.headers.get('x-vercel-ip-country') ?? 'unknown'
  return Response.json({ country })
}
