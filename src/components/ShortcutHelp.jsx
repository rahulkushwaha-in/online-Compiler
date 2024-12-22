import { Keyboard } from 'lucide-react';
import React, { Fragment } from 'react';

export function ShortcutHelp({ theme }) {
  const isDark = theme === 'vs-dark' || theme === 'hc-black';
  const shortcuts = [
    { keys: ['Ctrl', '+', 'Enter'], action: 'Run Code' },
    { keys: ['Ctrl', '+', 'L'], action: 'Clear Console' },
    { keys: ['Ctrl', '+', 'R'], action: 'Reset Code' },
    { keys: ['F11'], action: 'Toggle Fullscreen' },
    { keys: ['Ctrl', '+', 'S'], action: 'Save Code' },
    { keys: ['Ctrl', '+', '/'], action: 'Toggle Comment' },
  ];

  return (
    <div className={`fixed bottom-4 right-4 ${isDark ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg max-w-sm z-50 transition-colors`}>
      <div className="flex items-center gap-2 mb-3">
        <Keyboard size={18} className="text-blue-500" />
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Keyboard Shortcuts</h3>
      </div>
      <div className="space-y-2">
        {shortcuts.map(({ keys, action }) => (
          <div key={action} className="flex justify-between items-center">
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{action}</span>
            <div className="flex gap-1">
              {keys.map((key, index) => (
                <React.Fragment key={key}>
                  <kbd className={`px-2 py-1 text-sm rounded ${
                    isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {key}
                  </kbd>
                  {index < keys.length - 1 && <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>+</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}