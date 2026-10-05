import { put } from '@vercel/blob';
export const config = { api: { bodyParser: false } };
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!process.env.ADMIN_PASSWORD || req.headers['x-admin-password'] !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'unauthorized' });
  const name = String(req.query.filename || 'file').replace(/[^\w.\-]+/g, '_');
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try {
    const b = await put('uploads/' + name, Buffer.concat(chunks), { access: 'public', addRandomSuffix: true, contentType: req.headers['content-type'] || undefined });
    res.json({ url: b.url });
  } catch (e) { res.status(500).json({ error: e.message }); }
}
