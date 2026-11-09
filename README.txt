EPTTS Dashboard - Vercel deploy
1) Upload this folder as a Vercel project (index.html + api/ + package.json).
2) Project > Storage > Create Blob store > Connect to project (adds BLOB_READ_WRITE_TOKEN).
3) Settings > Environment Variables: set DASH_USER and DASH_KEY for admin updates (set passwords here, not in code). Redeploy.
4) Open the link > "تحديث البيانات" > enter the admin username and password > upload the sheets > update.
Anyone with the link can view the dashboard and its latest data. Only an admin with DASH_USER and DASH_KEY can upload updates.
