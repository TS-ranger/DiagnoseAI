'use client';
import { useHotkeys } from "react-hotkeys-hook";
import { useRef, useState, useEffect, FormEvent } from 'react';
import SpeechToTextInput from "./components/SpeechToTextInput";
import About from "./components/about";
import Header from "./components/Header";
import Solid from "./components/Solid";
import Result from "./components/result";
import {Button} from "./components/ui/stateful-button";
import Footer from "./components/footer";


// import Typewriter from 'typewriter-effect'; // not needed for placeholder typing

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
  const [placeholder, setPlaceholder] = useState<string>('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  useHotkeys("enter", () => {
    if (buttonRef.current) buttonRef.current.click();
  }, { enableOnFormTags: true });


  useEffect(() => {
    const phrases = [
      'Describe your symptoms...',
      'e.g. high fever, body aches, runny nose...',
      'Tell us how you feel today?',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: number | undefined;

    const type = () => {
      const full = phrases[phraseIndex];

      if (!deleting) {
        charIndex = Math.min(charIndex + 1, full.length);
        setPlaceholder(full.slice(0, charIndex));

        if (charIndex === full.length) {
          deleting = true;
          timer = window.setTimeout(type, 1200);
          return;
        }
      } else {
        charIndex = Math.max(charIndex - 1, 0);
        setPlaceholder(full.slice(0, charIndex));

        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      const speed = deleting ? 30 : 75;
      timer = window.setTimeout(type, speed);
    };

    type();

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, []);

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
   setSymptoms("");

  };

  return (
    <>
      <div className="min-h-screen [background:radial-gradient(125%_100%_at_50%_0%,_#FFF_6.32%,_#E0F0FF_29.28%,_#E7EFFD_68.68%,_#FFF_100%)] p-5 font-mono">
        <Header />
        <main className="max-w-4xl mx-auto text-center">
          <Solid />

            <div className="w-full  flex flex-col gap-8">
              <div className=" md:mt-20">
               <form
                     onSubmit={handleSubmit}
                     className="flex flex-col gap-4">
                     <textarea
                               className="min-w-[66vw] md:min-w-[50vw]  mx-auto p-3 border-2 border-gray-300 rounded-full text-sm text-center focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
                               value={symptoms}
                               onChange={(e) => setSymptoms(e.target.value)}
                               placeholder={placeholder}
                               rows={2}
                               required
                      />
                      <div className="flex items-center justify-center gap-3 mt-4 ">
                      <SpeechToTextInput
                        onTranscription={async (text) => {
                         const updated = symptoms ? `${symptoms} ${text}` : text;
                          setSymptoms(updated);
                         await fetchDiagnosis(updated);
                         setSymptoms("");
                        }}
                      />
                     <Button
                        className="bg-black text-white hover:ring-black"
                      disabled={isLoading} >
                       {isLoading ? 'Analyzing...' : 'Get Diagnosis'}
                     </Button>
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
      <Footer />
    </>
  );
}
