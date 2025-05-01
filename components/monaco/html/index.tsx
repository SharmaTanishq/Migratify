import { Editor, } from '@monaco-editor/react';
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

  const completionProvider = {
    
  };

  const handleEditorMount = (editor: any, monaco: any) => {
    setEditorInstance(editor);

    editor.addAction({
      id: 'show-variables',
      label: 'Show Available Variables',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space],
      run: () => setShowOverlay(prev => !prev)
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
      theme={'vs-dark'}
      onMount={(editor, monaco) => {
        // Register completion provider
        handleEditorMount(editor, monaco);
        monaco.languages.registerCompletionItemProvider('html', {
          provideCompletionItems: (model, position, context, token) => {
            const wordInfo = model.getWordUntilPosition(position);
            const range = {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: wordInfo.startColumn,
              endColumn: wordInfo.endColumn
            };
            
            const suggestions = Object.keys(jsonData).map(key => ({
              label: key,
              kind: monaco.languages.CompletionItemKind.Value,
              insertText: `{{ ${key} }}`,
              detail: `Value: ${JSON.stringify(jsonData[key]).slice(0, 50)}...`,
              range: range
            }));
      
            return { suggestions };
          }
        });
      }}
      options={{
        minimap: { enabled: false },
        suggest:{
          showMethods: true,
          showFunctions: true,
          showConstructors: true,
          showFields: true,
          showVariables: true,
          showClasses: true,
          showStructs: true,
          showInterfaces: true,
          showModules: true,
          showProperties: true,
          showEvents: true,
          showOperators: true,
          showUnits: true,
          showValues: true,
          showConstants: true,
          showEnums: true,
          showEnumMembers: true,
          showKeywords: true,
          showWords: true,
          showColors: true,
          showFiles: true,
          showReferences: true,
          showFolders: true,
          showTypeParameters: true,
          showSnippets: true,
          // Filter suggestions based on prefix
          filterGraceful: true,
           // Insert selected suggestion on Enter key
          insertMode: 'insert',
        },
        
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