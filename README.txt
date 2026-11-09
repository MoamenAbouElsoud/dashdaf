EPTTS Dashboard - Vercel deploy
1) Upload this folder as a Vercel project (index.html + api/ + package.json).
2) Project > Storage > Create Blob store > Connect to project (adds BLOB_READ_WRITE_TOKEN).
3) Settings > Environment Variables: DASH_USER = dafa-admin and DASH_KEY = DAF@987654 (set here, NOT in code). Redeploy.
4) Open the link > log in > "تحديث البيانات" > upload the sheets > update.
Everyone with the link + code sees the same data. Data is stored encrypted (AES-GCM) with the code.
