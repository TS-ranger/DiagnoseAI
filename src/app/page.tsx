'use client';
import { useHotkeys } from "react-hotkeys-hook";
import { useRef, useState, FormEvent } from 'react';
import SpeechToTextInput from "./components/SpeechToTextInput";
import About from "./components/about";
import Header from "./components/Header";
import Solid from "./components/Solid";
import Result from "./components/result";

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

export default function Home() {
  const [symptoms, setSymptoms] = useState<string>('');
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  useHotkeys("enter", () => {
    if (buttonRef.current) buttonRef.current.click();
  }, { enableOnFormTags: true });

  const fetchDiagnosis = async (input: string) => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: input }),
      });

      if (!response.ok) throw new Error('Error fetching diagnosis.');

      const data: ResultData = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchDiagnosis(symptoms);
  };

  const PrimaryButton = ({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) => (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      className="bg-black text-white px-4 py-2 rounded-full text-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white font-mono">
        <Header />
        <main className="max-w-4xl mx-auto px-8 text-center">
          <Solid />

            <div className="w-full flex flex-col gap-8">
              <div className="">
               <form
                     onSubmit={handleSubmit}
                     className="flex flex-col gap-4">
                     <textarea
                               className="w-full p-3 border-2 border-gray-300 rounded-full text-sm text-center focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
                               value={symptoms}
                               onChange={(e) => setSymptoms(e.target.value)}
                               placeholder="Describe your symptoms (e.g. high fever, body aches, runny nose...)"
                               rows={2}
                               required
                              />
  
                    <div className="flex items-center justify-center gap-3 mt-4 ">
                      <SpeechToTextInput
                        onTranscription={(text) => {
                         const updated = symptoms ? `${symptoms} ${text}` : text;
                          setSymptoms(updated);
                         fetchDiagnosis(updated);
                        }}
                      />
                     <PrimaryButton
                      disabled={isLoading} >
                       {isLoading ? 'Analyzing...' : 'Get Diagnosis'}
                     </PrimaryButton>
                </div>
              </form>


                {isLoading && (
                  <div className="mx-auto my-8 border-4 border-gray-200 border-t-green-600 rounded-full w-10 h-10 animate-spin"></div>
                )}
                {error && <p className="text-red-600 text-center mt-4">{error}</p>}
              </div>

              
              <div className="">
                <Result result={result} isLoading={isLoading} error={error} /> 
              </div>
            </div>
        </main>
      </div>
    <hr className="my-6 h-px border-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
      <About />
    </>
  );
}

