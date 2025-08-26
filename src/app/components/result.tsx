import React from 'react';

// Interfaces are defined here to make the component self-contained
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

interface ResultProps {
  result: ResultData | null;
  isLoading: boolean;
  error: string;
}

export default function Result({ result}: ResultProps) {
  // If no result yet, return null
  if (!result) {
    return null;
  }

  return (
    <div className="p-6 bg-gray-50 border border-gray-300 rounded-lg">
      {result.critical_warning ? (
        <div className="bg-red-50 border border-red-500 text-red-600 p-4 rounded-lg">
          <h2 className="text-xl font-bold">⚠ Critical Warning!</h2>
          <p>{result.critical_warning}</p>
          <p className="mt-2">
            <strong>Please seek immediate medical attention.</strong>
          </p>
        </div>
      ) : (
        <>
          {/* Patient Summary */}
          {result.patient_summary && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1 text-gray-700">Patient Summary</h3>
              <p>{result.patient_summary}</p>
            </div>
          )}

          {/* Differential */}
          {result.differential && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Differential Diagnosis</h3>
              <ul className="list-none pl-0">
                {result.differential.map((item, idx) => (
                  <li key={idx} className="bg-gray-200 p-2 rounded-md mb-2">
                    <strong>{item.disease}</strong> - Confidence: {item.confidence}%<br />
                    <span className="text-sm text-gray-700">{item.rationale}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Treatment */}
          {result.primary_treatment && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Primary Treatment for {result.primary_treatment.disease}
              </h3>
              <p><strong>Medication:</strong> {result.primary_treatment.first_line_medication}</p>
              <p><strong>Dosage:</strong> {result.primary_treatment.typical_adult_dosage}</p>
              <p><strong>Precautions:</strong> {result.primary_treatment.common_precautions?.join(', ')}</p>
              <p><strong>Monitoring/Follow-up:</strong> {result.primary_treatment.monitoring_or_followup}</p>
            </div>
          )}

          {/* Tests */}
          {result.recommended_tests?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Recommended Tests</h3>
              <ul className="list-disc pl-6">
                {result.recommended_tests.map((test, idx) => (
                  <li key={idx}>{test}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Emergency Care */}
          {result.when_to_seek_emergency && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">When to Seek Emergency Care</h3>
              <p>{result.when_to_seek_emergency}</p>
            </div>
          )}

          {/* Disclaimer */}
          {result.notes && (
            <p className="text-sm text-gray-500 border-t border-dashed border-gray-400 pt-4 mt-4">
              <strong>Disclaimer:</strong> {result.notes}
            </p>
          )}

          {/* References */}
          {result.references?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-1 text-gray-700">References</h3>
              <ul className="list-disc pl-6">
                {result.references.map((ref, idx) => (
                  <li key={idx}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
                      {ref.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
