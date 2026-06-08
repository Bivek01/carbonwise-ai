import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
// Assuming package.json version is ^0.24.1 as previously updated
import packageJson from '../../package.json';

const GeminiTest = () => {
  const [log, setLog] = useState([]);
  const [errorDetails, setErrorDetails] = useState(null);

  const addLog = (message) => setLog(prev => [...prev, message]);

  useEffect(() => {
    const runTest = async () => {
      addLog(`SDK Version (package.json): ${packageJson.dependencies['@google/generative-ai']}`);
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      addLog(`API Key Present: ${!!apiKey}`);
      addLog(`Model Requested: gemini-2.0-flash`);

      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        addLog('Sending request to Gemini...');
        const result = await model.generateContent("Reply with exactly: Gemini Working");
        
        const text = await result.response.text();
        addLog(`Response received: ${text}`);
      } catch (err) {
        addLog(`Error caught: ${err.message}`);
        console.error("RAW GOOGLE ERROR:", err);
        setErrorDetails({
          name: err.name,
          message: err.message,
          stack: err.stack,
          // Extract any raw response properties if available from the GoogleGenerativeAI error
          raw: JSON.stringify(err, Object.getOwnPropertyNames(err), 2)
        });
      }
    };

    runTest();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 mt-20">
      <h1 className="text-2xl font-bold mb-4">Gemini Direct SDK Test</h1>
      
      <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-6 whitespace-pre-wrap">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      {errorDetails && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-lg p-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-rose-700 mb-2">Google API Error Body & Stack Trace</h2>
          <pre className="text-sm text-slate-800 font-mono whitespace-pre-wrap">
            {errorDetails.raw}
          </pre>
        </div>
      )}
    </div>
  );
};

export default GeminiTest;
