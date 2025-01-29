"use client";
import Image from "next/image";
import FileUpload from "./components/FileUpload";
import Intro from "./components/Intro";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Head>
        <title>Transcript to Audio</title>
      </Head>

      <main className="row-start-2 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-center">Transcript to Audio</h1>

          {/* content */}
          <div className="flex flex-col items-center justify-center gap-4">
            <Intro />

            {/* accept file */}
            <div className="flex flex-col items-center justify-center gap-4"><FileUpload setTranscript={setTranscript} /></div>

            {/* transcript */}
            {transcript ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold">Transcript</h2>
                <p className="text-lg text-center">{transcript}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold">Transcript</h2>
                <p className="text-lg text-center">No data to display, sorry</p>
              </div>
            )}

            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
