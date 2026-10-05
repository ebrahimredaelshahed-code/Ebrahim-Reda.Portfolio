# Deploy on Vercel
1. Push this folder to GitHub, import it in Vercel.
2. Vercel dashboard > Storage > create a **Blob** store (Public) and connect it to the project (adds BLOB_READ_WRITE_TOKEN).
3. Settings > Environment Variables: add `ADMIN_PASSWORD` (your admin password).
4. Redeploy. Site: `/`  Admin: `/admin`
Notes: uploads are limited to 4.5MB per file (Vercel function limit). For larger files paste a link (Drive, YouTube...) in "Files & links".
