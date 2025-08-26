import React from 'react';

export default function About() {
  return (
    <section id="about" className="mb-24 pt-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="pb-3 text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl font-display text-center mb-8">
          About 
        </h2>
        <div className="text-center space-y-6 text-gray-700 max-w-2xl mx-auto">
          <p className="text-lg leading-relaxed">
            The AI Diagnostic Assistant is an informational tool designed to help you better understand your symptoms. By leveraging advanced artificial intelligence models, it provides a differential diagnosis, potential first-line treatment suggestions, and important guidance on when to seek emergency care.
          </p>
          <p className="text-lg leading-relaxed">
            This tool is powered by a combination of two powerful AI technologies. The Google Gemini model performs the core analysis and diagnosis, while OpenAI&apos;s Whisper model provides the seamless speech-to-text transcription, allowing you to describe your symptoms naturally using your voice.
          </p>
          <p className="text-lg leading-relaxed font-bold text-black">
            <span className="text-red-300">This assistant is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for any medical questions or concerns.</span> 
          </p>
        </div>
      </div>
    </section>
  );
}
