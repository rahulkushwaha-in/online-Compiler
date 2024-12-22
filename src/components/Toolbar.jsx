import { useState } from 'react';
import { Play, RotateCcw, Maximize2, Minimize2, HelpCircle } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ShortcutHelp } from './ShortcutHelp';

export function Toolbar({
  theme,
  onThemeChange,
  onReset,
  onRun,
  isRunning,
  isFullscreen,
  onToggleFullscreen,
}) {
  const [showShortcuts, setShowShortcuts] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <ThemeSwitcher theme={theme} onThemeChange={onThemeChange} />
      <div className="flex gap-2">
        <button
          onClick={onReset}
          title="Reset Code (Ctrl + R)"
          className={`px-4 py-2 flex items-center gap-2 rounded-md transition-colors ${
            theme === 'vs-light'
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
        >
          <RotateCcw size={18} />
          <span className="hidden sm:inline">Reset</span>
        </button>
        <button
          onClick={onRun}
          disabled={isRunning}
          title="Run Code (Ctrl + Enter)"
          className={`px-4 py-2 flex items-center gap-2 rounded-md transition-colors ${
            isRunning
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          <Play size={18} />
          <span className="hidden sm:inline">{isRunning ? 'Running...' : 'Run'}</span>
        </button>
        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen (F11)' : 'Enter Fullscreen (F11)'}
          className={`p-2 rounded-md transition-colors ${
            theme === 'vs-light'
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
        <button
          onClick={() => setShowShortcuts(!showShortcuts)}
          title="Keyboard Shortcuts"
          className={`p-2 rounded-md transition-colors ${
            theme === 'vs-light'
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
        >
          <HelpCircle size={18} />
        </button>
      </div>
      {showShortcuts && <ShortcutHelp theme={theme} />}
    </div>
  );
}