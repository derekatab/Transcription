export default function Intro() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-lg text-center">This application allows you to upload
                an audio file and receive a transcription of the audio content.</p>
            <p className="text-lg text-center">The transcription is generated using OpenAI's
                Whisper model.</p>
        </div>
    );
}
