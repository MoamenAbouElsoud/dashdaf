// Stores one encrypted blob (the dashboard state). The server never sees plaintext.
// Env vars: DASH_USER (default dafa-admin), DASH_KEY (password), BLOB_READ_WRITE_TOKEN (added by Vercel Blob store).
const PATH = 'eptts/state.bin';
module.exports = async (req, res) => {
  const { put, list } = await import('@vercel/blob');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    const { blobs } = await list({ prefix: PATH });
    const b = blobs.find(x => x.pathname === PATH);
    if (!b) return res.status(204).end();
    const r = await fetch(b.url + '?t=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) return res.status(502).end();
    res.setHeader('Content-Type', 'application/octet-stream');
    return res.status(200).send(Buffer.from(await r.arrayBuffer()));
  }
  if (req.method === 'POST') {
    if (!process.env.DASH_KEY || req.headers['x-key'] !== process.env.DASH_KEY || req.headers['x-user'] !== (process.env.DASH_USER || 'dafa-admin')) return res.status(401).end();
    if (req.headers['x-check']) return res.status(200).end();
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const body = Buffer.concat(chunks);
    if (!body.length || body.length > 4000000) return res.status(413).end();
    await put(PATH, body, { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/octet-stream' });
    return res.status(200).end();
  }
  res.status(405).end();
};
module.exports.config = { api: { bodyParser: false } };
