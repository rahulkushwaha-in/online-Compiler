import React, { useState, useCallback } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Code2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Editor } from './components/Editor';
import { ConsoleOutput } from './components/ConsoleOutput';
import { Toolbar } from './components/Toolbar';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { executeCode } from './services/Api';

const DEFAULT_CODE = `// Welcome to the Online JavaScript Compiler!
// Write your code here and click Run to execute
// Use Ctrl + Enter to run, F11 for fullscreen
// Press Ctrl + / to see all shortcuts

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i));
}`;

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState('vs-dark');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleRun = useCallback(async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    try {
      const result = await executeCode(code);
      setOutput(result);
      
      if (result.error) {
        toast.error('Execution failed');
      } else {
        toast.success('Code executed successfully');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsRunning(false);
    }
  }, [code, isRunning]);

  const handleReset = useCallback(() => {
    setCode(DEFAULT_CODE);
    setOutput(null);
    toast.success('Code reset to default');
  }, []);

  const handleClearConsole = useCallback(() => {
    setOutput(null);
    toast.success('Console cleared');
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useKeyboardShortcuts({
    onRun: handleRun,
    onReset: handleReset,
    onClearConsole: handleClearConsole,
    onToggleFullscreen: handleToggleFullscreen,
  });

  return (
    <div className={`min-h-screen ${theme === 'vs-light' ? 'bg-gray-100' : 'bg-gray-900'} transition-colors`}>
      <header className={`${theme === 'vs-light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} border-b p-4 transition-colors`}>
        <div className=" mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="text-blue-500" />
            <h1 className={`text-xl font-bold ${theme === 'vs-light' ? 'text-gray-900' : 'text-white'}`}>
              Online JavaScript Compiler
            </h1>
          </div>
          <div className="flex-1" />
          <Toolbar
            theme={theme}
            onThemeChange={setTheme}
            onReset={handleReset}
            onRun={handleRun}
            isRunning={isRunning}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
          />
        </div>
      </header>

      <main className="w-full mx-auto p-4 h-[calc(100vh-80px)]">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={70}>
            <div className="h-full rounded-lg overflow-hidden border border-gray-700">
              <Editor
                code={code}
                onChange={setCode}
                language="javascript"
                theme={theme}
              />
            </div>
          </Panel>
          <PanelResizeHandle className="w-2 bg-gray-800 hover:bg-gray-700 transition-colors cursor-col-resize flex items-center justify-center">
            <div className="h-24 w-1 bg-gray-600 rounded-full" />
          </PanelResizeHandle>
          <Panel defaultSize={30}>
            <div className="h-full rounded-lg overflow-hidden border border-gray-700">
              <ConsoleOutput output={output} theme={theme} />
            </div>
          </Panel>
        </PanelGroup>
      </main>
    </div>
  );
}

export default App;