import formidable from 'formidable-serverless'; // this is for file upload
import fs from 'fs'; // file system
import * as FormData from 'form-data'; // this is for file upload
import fetch from 'node-fetch'; // this is for file upload

const WHISPER_URL = 'https://api.openai.com/v1/audio/transcriptions';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();

        // save locally
        form.on('fileBegin', (name, file) => {
            file.path = `./public/uploads/${file.name}`;
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).json({ message: 'Error parsing form data' });
            }

            const file = files.file;

            if (!file) {
                res.status(400).json({ message: 'No file uploaded' });
            }

            const formData = new FormData();
            formData.append('file', fs.createReadStream(file.path));
            formData.append('model', 'whisper-1');
            formData.append('language', 'en');

            try {
                const response = await fetch(WHISPER_URL, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                        'Content-Type': 'multipart/form-data; boundary=${formData.getBoundary()}', // important
                    }

                });

                if (response.ok) {
                    const response = await response.json();
                    // clean up
                    fs.unlinkSync(file.path
                    );
                    return res.status(200).json({ message: response.text });


                }
                else {
                    fs.unlinkSync(file.path);
                    res.status(400).json({ message: "error in generating transcription" });
                }

            } catch (error) {

                res.status(500).json({ message: 'Error processing file' });
            }

        }
        );
    }
    else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

