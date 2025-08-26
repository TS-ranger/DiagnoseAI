// 'use client';
// import { useHotkeys } from "react-hotkeys-hook";
// import { useRef, useState, FormEvent } from 'react';
// import SpeechToTextInput from "./components/SpeechToTextInput";

// interface Reference {
//   title: string;
//   url: string;
// }

// interface Differential {
//   disease: string;
//   confidence: number;
//   rationale: string;
// }

// interface PrimaryTreatment {
//   disease: string;
//   first_line_medication: string;
//   typical_adult_dosage: string;
//   common_precautions: string[];
//   monitoring_or_followup: string;
// }

// interface ResultData {
//   patient_summary?: string;
//   differential?: Differential[];
//   primary_treatment?: PrimaryTreatment;
//   recommended_tests?: string[];
//   when_to_seek_emergency?: string;
//   notes?: string;
//   references?: Reference[];
//   critical_warning?: string;
// }

// export default function Home() {
//   const [symptoms, setSymptoms] = useState<string>('');
//   const [result, setResult] = useState<ResultData | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   useHotkeys("enter", () => {
//     if (buttonRef.current) buttonRef.current.click();
//   }, { enableOnFormTags: true });

//   // Reusable diagnosis function
//   const fetchDiagnosis = async (input: string) => {
//     if (!input.trim()) return;
//     setIsLoading(true);
//     setError('');
//     setResult(null);

//     try {
//       const response = await fetch('/api/diagnose', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ symptoms: input }),
//       });

//       if (!response.ok) throw new Error('Error fetching diagnosis.');

//       const data: ResultData = await response.json();
//       setResult(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await fetchDiagnosis(symptoms);
//   };

//   const PrimaryButton = ({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) => (
//     <button
//       ref={buttonRef}
//       onClick={onClick}
//       disabled={disabled}
//       className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//     >
//       {children}
//     </button>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white font-mono">
//       <header className="flex justify-between items-center px-8 py-6">
//         <div className="flex items-center space-x-6">
//           <div className="w-8 h-8 grid grid-cols-3 gap-1">
//             {[...Array(9)].map((_, i) => (
//               <div key={i} className="w-1.5 h-1.5 bg-black rounded-full"></div>
//             ))}
//           </div>
//           <span className="text-xl font-medium text-black">MYLE AI</span>
//         </div>
//         <a href="#features" className="no-underline">
//           <PrimaryButton>Analyze Now</PrimaryButton>
//         </a>
//       </header>

//       <main className="max-w-4xl mx-auto px-8 py-16 text-center">
//         <div className="inline-block bg-blue-300 shadow-md text-slate-700 font-bold text-xs px-4 py-2 rounded-full mb-8 tracking-wide">
//           Built with great minds!
//         </div>

//         <h1 className="text-4xl md:text-6xl font-medium text-black mb-6 leading-tight">
//           AI that provides<br />
//           diagnostic information in real-time
//         </h1>

//         <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
//           Enter your symptoms below to get started.
//           <strong className="block mt-2">
//             Always consult a healthcare professional for medical advice.
//           </strong>
//         </p>

//         {/* Diagnostic Section */}
//         <div className="rounded-lg p-8 shadow-2xl shadow-amber-300/60 max-w-4xl mx-auto mb-16 text-left bg-white">
//           <div className="w-full flex flex-col lg:flex-row gap-8">
            
//             {/* Left Column: Input */}
//             <div className="flex-1 lg:w-1/4">
//               <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//                 <textarea
//                   className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
//                   value={symptoms}
//                   onChange={(e) => setSymptoms(e.target.value)}
//                   placeholder="e.g., high fever, body aches, runny nose..."
//                   rows={5}
//                   required
//                 />
//                 <SpeechToTextInput 
//                   onTranscription={(text) => {
//                     const updated = symptoms ? `${symptoms} ${text}` : text;
//                     setSymptoms(updated);
//                     fetchDiagnosis(updated); // auto-run diagnosis after speech
//                   }}
//                 />
//                 <PrimaryButton disabled={isLoading}>
//                   {isLoading ? 'Analyzing...' : 'Get Diagnosis'}
//                 </PrimaryButton>
//               </form>
//               {isLoading && (
//                 <div className="mx-auto my-8 border-4 border-gray-200 border-t-green-600 rounded-full w-10 h-10 animate-spin"></div>
//               )}
//               {error && <p className="text-red-600 text-center mt-4">{error}</p>}
//             </div>

//             {/* Right Column: Result */}
//             <div className="flex-3 lg:w-3/4">
//               {result && (
//                 <div className="p-6 bg-gray-50 border border-gray-300 rounded-lg">
//                   {result.critical_warning ? (
//                     <div className="bg-red-50 border border-red-500 text-red-600 p-4 rounded-lg">
//                       <h2 className="text-xl font-bold">⚠ Critical Warning!</h2>
//                       <p>{result.critical_warning}</p>
//                       <p className="mt-2">
//                         <strong>Please seek immediate medical attention.</strong>
//                       </p>
//                     </div>
//                   ) : (
//                     <>
//                       {/* Patient Summary */}
//                       {result.patient_summary && (
//                         <div className="mb-4">
//                           <h3 className="text-lg font-semibold mb-1 text-gray-700">Patient Summary</h3>
//                           <p>{result.patient_summary}</p>
//                         </div>
//                       )}

//                       {/* Differential */}
//                       {result.differential && (
//                         <div className="mb-6">
//                           <h3 className="text-xl font-semibold mb-2 text-gray-700">Differential Diagnosis</h3>
//                           <ul className="list-none pl-0">
//                             {result.differential.map((item, idx) => (
//                               <li key={idx} className="bg-gray-200 p-2 rounded-md mb-2">
//                                 <strong>{item.disease}</strong> - Confidence: {item.confidence}%<br />
//                                 <span className="text-sm text-gray-700">{item.rationale}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       {/* Treatment */}
//                       {result.primary_treatment && (
//                         <div className="mb-6">
//                           <h3 className="text-xl font-semibold mb-2 text-gray-700">
//                             Primary Treatment for {result.primary_treatment.disease}
//                           </h3>
//                           <p><strong>Medication:</strong> {result.primary_treatment.first_line_medication}</p>
//                           <p><strong>Dosage:</strong> {result.primary_treatment.typical_adult_dosage}</p>
//                           <p><strong>Precautions:</strong> {result.primary_treatment.common_precautions?.join(', ')}</p>
//                           <p><strong>Monitoring/Follow-up:</strong> {result.primary_treatment.monitoring_or_followup}</p>
//                         </div>
//                       )}

//                       {/* Tests */}
//                       {result.recommended_tests?.length > 0 && (
//                         <div className="mb-6">
//                           <h3 className="text-xl font-semibold mb-2 text-gray-700">Recommended Tests</h3>
//                           <ul className="list-disc pl-6">
//                             {result.recommended_tests.map((test, idx) => (
//                               <li key={idx}>{test}</li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       {/* Emergency Care */}
//                       {result.when_to_seek_emergency && (
//                         <div className="mb-6">
//                           <h3 className="text-xl font-semibold mb-2 text-gray-700">When to Seek Emergency Care</h3>
//                           <p>{result.when_to_seek_emergency}</p>
//                         </div>
//                       )}

//                       {/* Disclaimer */}
//                       {result.notes && (
//                         <p className="text-sm text-gray-500 border-t border-dashed border-gray-400 pt-4 mt-4">
//                           <strong>Disclaimer:</strong> {result.notes}
//                         </p>
//                       )}

//                       {/* References */}
//                       {result.references?.length > 0 && (
//                         <div className="mt-4">
//                           <h3 className="text-lg font-semibold mb-1 text-gray-700">References</h3>
//                           <ul className="list-disc pl-6">
//                             {result.references.map((ref, idx) => (
//                               <li key={idx}>
//                                 <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
//                                   {ref.title}
//                                 </a>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }




"use client";

import { useHotkeys } from "react-hotkeys-hook";
import { useRef, useState, FormEvent } from "react";
import Header from "./components/Header";
import Soild from "./components/Solid";
import {Mic, MicOff } from "lucide-react"

interface Reference {
  title: string;
  url: string;
}

interface Differential {
  disease: string;
  confidence: number;
  rationale: string;
}

interface PrimaryTreatment {
  disease: string;
  first_line_medication: string;
  typical_adult_dosage: string;
  common_precautions: string[];
  monitoring_or_followup: string;
}

interface ResultData {
  patient_summary?: string;
  differential?: Differential[];
  primary_treatment?: PrimaryTreatment;
  recommended_tests?: string[];
  when_to_seek_emergency?: string;
  notes?: string;
  references?: Reference[];
  critical_warning?: string;
}

// 👇 Reusable Whisper Speech-to-Text Recorder
function SpeechToTextRecorder({ onTranscription }: { onTranscription: (text: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Change this to your backend/ngrok URL
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Please allow microphone access.");
    }
  };

  const stopRecording = async () => {
    setRecording(false);
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.webm");

      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/transcribe/`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        if (data.text) {
          onTranscription(data.text); // send transcript back to parent
        }
      } catch (err) {
        console.error("Upload failed:", err);
        onTranscription("Error transcribing audio.");
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="mt-5">
      {!recording ? (
        <button
          onClick={startRecording}
          className="p-4 bg-slate-600 text-white rounded-full"
          disabled={loading}
        >
          <Mic />
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="p-4  bg-red-600 text-white rounded-full"
        >
         <MicOff />
        </button>
      )}
      {loading && <p className="text-sm mt-2">⏳ Transcribing...</p>}
    </div>
  );
}

// 👇 Main Diagnosis Page
export default function Home() {
  const [symptoms, setSymptoms] = useState<string>("");
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  useHotkeys(
    "enter",
    () => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    },
    { enableOnFormTags: true }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        throw new Error("An error occurred while fetching the diagnosis.");
      }

      const data: ResultData = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  [background:radial-gradient(125%_100%_at_50%_0%,_#FFF_6.32%,_#E0F0FF_29.28%,_#E7EFFD_68.68%,_#FFF_100%)] font-mono">
       <Header/>
      <main className="max-w-4xl mx-auto px-8 py-8 text-center">

     <Soild/>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms..."
            rows={5}
            required
          />
          <div className="flex gap-6 items-center justify-center">
             <SpeechToTextRecorder
            onTranscription={(text) =>
              setSymptoms((prev) => (prev ? prev + " " + text : text))
            }
          />

          <button
            ref={buttonRef}
            type="submit"
            className="bg-black text-white  px-4 py-2 rounded-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Get Diagnosis"}
          </button>
          </div>
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {result && (
          <div className="mt-8 p-6 bg-gray-50 border border-gray-300 rounded-lg text-left">
            {/* Display results like in your original page */}
            {result.patient_summary && (
              <p>
                <strong>Summary:</strong> {result.patient_summary}
              </p>
            )}
          </div>
        )}
    </main>
    </div>
  );
}