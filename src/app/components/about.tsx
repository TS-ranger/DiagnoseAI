import React from 'react';

export default function About() {
  return (
    <section id="about" className="mb-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="pb-3 text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl font-display text-center mb-8">
          About 
        </h2>

        <h3 className="text-center text-sm mb-6  text-gray-600">
        <a
            href="https://app.eraser.io/workspace/TAOziyHANQ5xkpMbeKqp?origin=share"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline" >  
             [Click to view the architecture diagram]
        </a>
        </h3>


        <div className="px-4 py-4 text-center space-y-4 text-gray-700 max-w-2xl mx-auto">
          <p className="text-sm  md:text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            The AI Diagnostic Assistant is an informational tool designed to help you better understand your symptoms. By leveraging advanced artificial intelligence models, it provides a differential diagnosis, potential first-line treatment suggestions, and important guidance on when to seek emergency care.
          </p>
          <p className="text-sm  md:text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            This tool is powered by a combination of two powerful AI technologies. The Google Gemini model performs the core analysis and diagnosis, while OpenAI&apos;s Whisper model provides the seamless speech-to-text transcription, allowing you to describe your symptoms naturally using your voice.
          </p>
          <p className="text-sm  md:text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            <span className="text-red-500">This assistant is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for any medical questions or concerns.</span> 
          </p>
        </div>
      </div>
    </section>
  );
}
