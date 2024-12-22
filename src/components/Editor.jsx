import { Editor as MonacoEditor } from '@monaco-editor/react';

export function Editor({ code, onChange, language, theme }) {
  return (
    <MonacoEditor
      height="100%"
      defaultLanguage={language}
      value={code}
      onChange={(value) => onChange(value || '')}
      theme={theme}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: 'on',
      }}
    />
  );
}