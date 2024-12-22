import { useEffect, useCallback } from 'react';

export function useKeyboardShortcuts({
  onRun,
  onReset,
  onClearConsole,
  onToggleFullscreen,
}) {
  const handleKeyDown = useCallback(
    (event) => {
      // Run code: Ctrl + Enter
      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        onRun();
      }
      // Reset code: Ctrl + R
      if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        onReset();
      }
      // Clear console: Ctrl + L
      if (event.ctrlKey && event.key === 'l') {
        event.preventDefault();
        onClearConsole();
      }
      // Toggle fullscreen: F11
      if (event.key === 'F11') {
        event.preventDefault();
        onToggleFullscreen();
      }
    },
    [onRun, onReset, onClearConsole, onToggleFullscreen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}