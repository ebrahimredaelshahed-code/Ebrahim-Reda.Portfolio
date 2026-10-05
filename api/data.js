import { put, list } from '@vercel/blob';
const K = 'portfolio-data.json';
const auth = r => !!process.env.ADMIN_PASSWORD && r.headers['x-admin-password'] === process.env.ADMIN_PASSWORD;
const DEF = {
  profile: { name: 'Aditya Rao', headline: 'I BUILD DIGITAL|EXPERIENCES|THAT MATTER.', title: 'Full Stack Developer & UI/UX Designer', tagline: 'Crafting modern, responsive and user-centric websites.', photo: '', resume: '', about: 'I am a Full Stack Developer with a passion for creating seamless digital experiences.', email: 'you@example.com', phone: '', location: 'Egypt' },
  socials: [{ label: 'LinkedIn', url: 'https://linkedin.com' }, { label: 'GitHub', url: 'https://github.com' }],
  education: [{ school: 'Your University', degree: "Bachelor's Degree", start: '2020', end: '2024' }],
  certs: [], projects: [],
  skillsP: [{ name: 'Teamwork' }, { name: 'Communication' }],
  skillsT: [{ name: 'JavaScript' }, { name: 'React' }, { name: 'Node.js' }],
  volunteering: []
};
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    if (req.query.check) return auth(req) ? res.json({ ok: 1 }) : res.status(401).json({ error: 'unauthorized' });
    try {
      const { blobs } = await list({ prefix: K });
      if (blobs[0]) { const r = await fetch(blobs[0].url + '?t=' + Date.now()); return res.json(await r.json()); }
    } catch (e) {}
    return res.json(DEF);
  }
  if (req.method === 'POST') {
    if (!auth(req)) return res.status(401).json({ error: 'unauthorized' });
    await put(K, JSON.stringify(req.body), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60 });
    return res.json({ ok: 1 });
  }
  res.status(405).end();
}
