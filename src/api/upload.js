import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const file = req.files.file;
        const uploadPath = path.join(process.cwd(), 'public', 'media', file.name);

        file.mv(uploadPath, (err) => {
            if (err) {
                res.status(500).send({ error: err.message });
            } else {
                res.status(200).send({ success: true, path: `../${file.name}` });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}