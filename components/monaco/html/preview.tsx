
import { renderTemplate } from './templateHelper';

interface HTMLPreviewProps {
  content: string;
  jsonData: any;
}




const HTMLPreview: React.FC<HTMLPreviewProps> = ({ content, jsonData }) => {
  
  const renderedContent = renderTemplate(content, jsonData);

  return (
    <div className="space-y-4">
      <div 
        className="border rounded-md p-4 bg-white"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
      <details className="text-sm">
        <summary className="cursor-pointer text-gray-600">Show Data</summary>
        <pre className="mt-2 p-2 bg-gray-50 rounded-md overflow-auto">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default HTMLPreview;