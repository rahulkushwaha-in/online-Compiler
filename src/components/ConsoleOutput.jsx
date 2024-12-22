import { Terminal } from 'lucide-react';
import React from 'react';

export function ConsoleOutput({ output, theme }) {
  const isDark = theme === 'vs-dark' || theme === 'hc-black';

  if (!output) {
    return (
      <div className={`h-full ${isDark ? 'bg-gray-900' : 'bg-white'} p-4 font-mono text-sm flex items-center justify-center text-gray-500`}>
        <Terminal size={18} className="mr-2" />
        <span>Console output will appear here</span>
      </div>
    );
  }

  return (
    <div className={`h-full ${isDark ? 'bg-gray-900' : 'bg-white'} p-4 font-mono text-sm overflow-auto transition-colors`}>
      <div className={`flex items-center gap-2 mb-4 ${isDark ? 'text-gray-400 border-gray-700' : 'text-gray-600 border-gray-200'} border-b pb-2`}>
        <Terminal size={18} />
        <span>Console Output</span>
        {output.executionTime && (
          <span className="ml-auto">
            Execution time: {output.executionTime}ms
          </span>
        )}
      </div>
      
      {output.error ? (
        <pre className="text-red-500 whitespace-pre-wrap">{output.error}</pre>
      ) : (
        <pre className={`${isDark ? 'text-green-400' : 'text-green-600'} whitespace-pre-wrap`}>
          {output.result}
        </pre>
      )}
    </div>
  );
}