// mechanism to intake audio file to be transcribed
import { useState } from 'react';
import toast from 'react-hot-toast';

const ALLOWED_FILE_TYPES = [
    'audio/wav',
    'audio/mp4',
    'audio/mp3'
];

export default function FileUpload({ setTranscript }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        if (e.target.files) {
            const selected = e.target.files[0];
            if (selected && ALLOWED_FILE_TYPES.includes(selected.type)) {
                setFile(selected);
                handleUpload(selected); // pass file to handleUpload function
            } else {
                toast.error('Please select an acceptable audio file format (wav, mp3, or mp4)');
            }
        }
    };

    const handleUpload = async (file) => {
        console.log("Current file", file);
        if (file) {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            console.log('Uploading file...'); // Check if this line is executing
            let response = await fetch('../api/process', {
                method: 'POST',
                body: formData
            }); // fetch

            if (response.ok) {
                response = await response.json();
                setTranscript(response.message);
                toast.success('Transcription complete');
            }
            else {
                response = await response.json();
                toast.error(response.message);
            }
            setUploading(false);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-4">
                <label className="text-lg font-bold" htmlFor="file">Upload an audio file</label>
                <input type="file" name="file" id="file" accept="audio/*" onChange={handleChange} />
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
                <button className="btn" onClick={() => handleUpload(file)} disabled={uploading}>Upload</button>
            </div>
        </div>

    );
}