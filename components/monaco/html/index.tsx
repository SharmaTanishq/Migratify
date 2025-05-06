import { Editor,Monaco } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';


interface HTMLEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  height?: string;
  jsonSchema: any;
}



const HTMLEditor: React.FC<HTMLEditorProps> = ({ 
  value, 
  onChange,
  height = "200px",
  jsonSchema
}) => {
  const { theme } = useTheme();
  const jsonData = jsonSchema;

  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  
  const handleInsertPath = (path: string) => {
    const insertion = `{{ ${path} }}`;
    // Monaco editor instance will handle this through its API
    onChange(value + insertion);
  };

  const handleEditorMount = (editor: any, monaco: any) => {
    setEditorInstance(editor);

    // Define custom tokens for syntax highlighting
    monaco.languages.setMonarchTokensProvider('html', {
      tokenizer: {
        root: [
          [/\{\{/, 'delimiter.curly'],
          [/\}\}/, 'delimiter.curly'],
          [/\{\{(\s*)([\w.]+)(\s*)\}\}/, ['delimiter.curly', 'white', 'variable', 'white', 'delimiter.curly']],
          [/<\/?[\w\.$]+/, 'tag'],
          [/=/, 'operator'],
          [/"[^"]*"/, 'string'],
          [/'[^']*'/, 'string'],
        ]
      }
    });

    // Define github-dark theme
    monaco.editor.defineTheme('github-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'variable', foreground: '9CDCFE', fontStyle: 'italic' },
        { token: 'delimiter.curly', foreground: 'D4D4D4' },
        { token: 'tag', foreground: 'E06C75' },
        { token: 'operator', foreground: '56B6C2' },
        { token: 'string', foreground: '98C379' },
        { token: 'comment', foreground: '6A737D' },
      ],
      colors: {
        'editor.background': '#0D1117',
        'editor.foreground': '#C9D1D9',
        'editor.lineHighlightBackground': '#161B22',
        'editor.selectionBackground': '#264F78',
        'editorCursor.foreground': '#C9D1D9',
        'editorWhitespace.foreground': '#484F58',
        'editor.lineHighlightBorder': '#161B22',
        'editorLineNumber.foreground': '#6E7681',
        'editorLineNumber.activeForeground': '#C9D1D9',
        'editorIndentGuide.background': '#21262D',
        'editorIndentGuide.activeBackground': '#30363D',
      }
    });

    // Set the theme
    monaco.editor.setTheme('github-dark');

    editor.addAction({
      id: 'show-variables',
      label: 'Show Available Variables',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space],
      run: () => setShowOverlay(prev => !prev)
    });

    // Register hover provider
    monaco.languages.registerHoverProvider('html', {
      provideHover: (model: any, position: any) => {
        const word = model.getWordAtPosition(position);
        if (!word) return;

        const lineContent = model.getLineContent(position.lineNumber);
        const beforeCursor = lineContent.substring(0, word.startColumn - 1);
        const afterCursor = lineContent.substring(word.endColumn - 1);
        
        if (beforeCursor.endsWith('{{') && afterCursor.startsWith('}}')) {
          const varName = word.word;
          const varValue = jsonData[varName];
          
          if (varValue !== undefined) {
            return {
              contents: [
                { value: `**${varName}**` },
                { value: `Type: \`${typeof varValue}\`` },
                { value: `Value: \`${JSON.stringify(varValue).slice(0, 50)}${JSON.stringify(varValue).length > 50 ? '...' : ''}\`` }
              ]
            };
          }
        }
      }
    });
  }

  const insertVariable = (variable: string) => {
    if (editorInstance) {
      const position = editorInstance.getPosition();
      editorInstance.executeEdits('insert-variable', [{
        range: {
          startLineNumber: position.lineNumber,
          startColumn: position.column,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        },
        text: `{{ ${variable} }}`
      }]);
      editorInstance.focus();
      
    }
  };

  


  return (
    <div className='w-full relative'>
    <Editor
      className='min-h-full rounded-md'
      defaultLanguage="html"
      value={value}
      onChange={onChange}
      theme="github-dark"
      onMount={(editor, monaco) => {
        handleEditorMount(editor, monaco);
        monaco.languages.registerCompletionItemProvider('html', {
          triggerCharacters: ['{', ' '],
          provideCompletionItems: (model, position) => {
            const linePrefix = model.getLineContent(position.lineNumber).substr(0, position.column);
            
            // Only show suggestions after {{ is typed
            if (!linePrefix.endsWith('{{') && !linePrefix.endsWith('{{ ')) {
              return { suggestions: [] };
            }

            const wordInfo = model.getWordUntilPosition(position);
            const range = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: wordInfo.startColumn,
              endColumn: wordInfo.endColumn
            };
            
            const suggestions = Object.entries(jsonData).map(([key, value]) => ({
              label: key,
              kind: monaco.languages.CompletionItemKind.Variable,
              insertText: `${key} }}`,
              detail: `${typeof value === 'object' ? 'Object' : typeof value}`,
              documentation: {
                value: `Value: ${JSON.stringify(value).slice(0, 50)}...`
              },
              range: range
            }));
      
            return { suggestions };
          }
        });
      }}
      options={{
        minimap: { enabled: false },
        suggest: {
          preview: true,
          showWords: false,
          showSnippets: true
        },
        quickSuggestions: {
          other: true,
          strings: true
        },
        acceptSuggestionOnEnter: 'on',
        padding:{
          top: 20,
          bottom: 20,
        },
        fontSize: 14,
        wordWrap: 'on',
        lineNumbers: 'on',
        folding: true,
        
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 3,
        automaticLayout: true,
        roundedSelection: true,
        scrollBeyondLastLine: false,
        renderLineHighlight: 'all',
      }}
      
    />
     {showOverlay && (
        <div className="absolute top-0 right-0 bg-white/95 dark:bg-gray-800/95 border rounded-lg shadow-lg m-2 p-4 w-64 max-h-[80%] overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Available Variables</h3>
            <button
              onClick={() => setShowOverlay(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1">
            {Object.entries(jsonData).map(([key, value]) => (
              <button
                key={key}
                onClick={() => insertVariable(key)}
                className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex justify-between items-center group"
              >
                <span className="font-mono">{key}</span>
                <span className="text-xs text-gray-500 group-hover:text-gray-700 truncate max-w-[150px]">
                  {typeof value === 'object' 
                    ? 'Object' 
                    : String(value).slice(0, 20)
                  }
                </span>
              </button>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t text-xs text-gray-500">
            Press Ctrl+Space to toggle overlay
          </div>
        </div>
      )}
    </div>
  );
};

export default HTMLEditor;