import { FC, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Spinner } from "@heroui/spinner";

interface KnowledgeBaseDetailsProps {
    nodeId: Id<"nodes">;
  selectedDocument: any;
  onDelete: (docId: string) => void;
}

export const KnowledgeBaseDetails: FC<KnowledgeBaseDetailsProps> = ({ nodeId, selectedDocument, onDelete }) => {

  const getDocument = useAction(api.Integrations.Voice.elevenlabs.getDocument);
  const [documentData, setDocumentData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {
    
    setIsLoading(true);
    getDocument({
      nodeId: nodeId,
      documentId: selectedDocument,
    }).then((res) => {
      setDocumentData(res);
      setIsLoading(false);
    });
  }, [selectedDocument]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-lg">
        <Spinner />
      </div>
    );
  }

  if (!selectedDocument) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-lg">
        Select a document to view details.
      </div>
    );
  }


  return (
    <div className="flex-1 overflow-y-auto max-w-[80vh] m-1 mb-3 bg-gray-200 p-2 rounded-lg">
      <Card className="w-full h-full mx-auto">
        <CardHeader>
          <CardTitle>{selectedDocument.name}</CardTitle>
          <CardDescription>Type: {selectedDocument.type?.toUpperCase() || "Unknown"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 text-sm text-gray-600">
            Usage Mode: {selectedDocument.usageMode || "-"}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onDelete(selectedDocument.id)}>Delete</Button>
        </CardFooter>
      </Card>
    </div>
  );
}; 