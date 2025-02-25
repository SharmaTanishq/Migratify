import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { json } from '@codemirror/lang-json';
import { syntaxTree } from '@codemirror/language';
import { ViewUpdate } from '@codemirror/view';
import { ChevronRight, ChevronDown, Type } from 'lucide-react';

interface JsonTreeViewProps {
  data: any;
  onFieldDrag?: (path: string) => void;
}

export function JsonTreeView({ data, onFieldDrag }: JsonTreeViewProps) {
  const editorRef = useRef<EditorView>();
  const containerRef = useRef<HTMLDivElement>(null);
  var lineNumber = 0;
  var charNumber = 0;
  var snippet = "[[tag]]"
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Convert data to tree-like string representation
    //const treeString = convertToTreeString(data);
    const state = EditorState.create({
      doc: JSON.stringify(data, null, 2),
      extensions: [
        basicSetup,
        json(),
        EditorView.theme({
          '&': {
            height: '100%',
            backgroundColor: 'transparent'
          },
          '.cm-line': {
            padding: '2px 0',
            userSelect: 'none',
            cursor: 'grab',
            '&:active': {
              cursor: 'grabbing'
            },
            //cursor: 'default'
          },
          '.cm-content': {
            padding: '8px'
          },
          '.tree-item': {
            display: 'flex',
            alignItems: 'center', 
            gap: '4px'
          },
          '.tree-icon': {
            color: 'var(--muted-foreground)',
            width: '16px',
            height: '16px'
          },
          '.tree-label': {
            color: 'var(--foreground)',
            userSelect: 'none'
          },
          '.tree-value': {
            color: 'var(--muted-foreground)',
            marginLeft: '4px'
          }
        }),

        EditorView.editable.of(false),
        
        
        EditorView.updateListener.of((update: ViewUpdate) => {
          // Handle updates if needed
        }),
        EditorView.domEventHandlers({
          drag: (event, view) => {
            console.log("dragover", event);
            if (event.dataTransfer) {
              event.dataTransfer.dropEffect = 'move';
            }
          },
          dragstart: (event, view) => {
            const pos = view.posAtCoords({ x: event.clientX, y: event.clientY });
            if (pos) {
              const line = view.state.doc.lineAt(pos);
              const path = extractPathFromLine(line.text);
              if (path) {
                event.dataTransfer?.setData('text/plain', path);
                onFieldDrag?.(path);
              }
            }
          }
        })
      ]
    });

    editorRef.current = new EditorView({
      state,
      parent: containerRef.current
    });

    return () => {
      editorRef.current?.destroy();
    };
  }, [data, onFieldDrag]);

  return (
    <div 
      ref={containerRef} 
      className="h-[500px] overflow-auto border rounded-lg bg-background"
    />
  );
}

// Helper function to convert JSON to tree string
function convertToTreeString(data: any, level = 0, path = ''): string {
  const indent = '  '.repeat(level);
  let result = '';

  if (typeof data === 'object' && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      const isObject = typeof value === 'object' && value !== null;
      
      result += `${indent}${isObject ? '▼' : '•'} ${key}`;
      
      if (isObject) {
        result += '\n' + convertToTreeString(value, level + 1, currentPath);
      } else {
        result += `: ${String(value)}\n`;
      }
    });
  }

  return result;
}

// Helper function to extract path from line
function extractPathFromLine(line: string): string {
  const match = line.match(/^(\s*)([▼•])\s*(.+?)(?::.*)?$/);
  if (match) {
    const [, indent, icon, label] = match;
    const level = indent.length / 2;
    return label;
  }
  return '';
}