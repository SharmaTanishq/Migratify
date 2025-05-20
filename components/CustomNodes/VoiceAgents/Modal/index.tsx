import { ModalSize } from "@/components/Types/ui/Modal";
import GenericDrawerLayout from "../../Layouts/Drawer";
import { NodeData } from "@/components/CMS/types";
import useStore from "@/components/Store/store";
import { useState, useEffect } from "react";
import { Card, CardTitle, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { ModalStore } from "@/components/Store/modal";
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";

interface NodeDrawerProps {
  isOpen: boolean | undefined;
  nodeId: string;
  onClose?: () => void;
  nodeData?: NodeData;
  size?: ModalSize; // Type this according to your node structure
}

const Modal = ({
  isOpen,
  nodeId,
  onClose,
  nodeData,
  size,
}: NodeDrawerProps) => {
  const node = useStore((state) => state.getNode(nodeId));
  const saveSecrets = useMutation(api.flows.node.data.saveNodeConfigurations)
  const getSecrets = useQuery(api.flows.node.data.getNodeConfigurations,{
    nodeId: nodeId as Id<"nodes">,
  })
  const [id, setId] = useState("");
  const {modalOpen, setModalOpen} = ModalStore();
  const [isError, setIsError] = useState(false);
  const [apiKey, setApiKey] = useState("");

  useEffect(()=>{
    if(getSecrets) {
      setApiKey(getSecrets?.configurations?.apiKey);
    }
  },[getSecrets])


  const handleSave = () => {
    if(!apiKey) {
      setIsError(true);  
      return;
    }
    saveSecrets({
      nodeId: nodeId as Id<"nodes">,
      configurations: {
        apiKey: apiKey,
      },
    }).then((res) => {
       toast.success("Saved Successfully", {
        duration: 2000,
        position: "top-right",
        icon: "🔑",
       });
       setModalOpen(false);
       setIsError(false);
    });
  }
  useEffect(() => {
    setId(node?._id);
  }, [node]);

  const showAlert = () => {
    return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Please enter an API key.
          </AlertDescription>
        </Alert>
      )
  }


  return (
    <GenericDrawerLayout isOpen={isOpen} node={node} id={id} size="content">
      
      <Card>
        <CardHeader>
          <CardTitle>Voice Agent Modal</CardTitle>
        </CardHeader>
        <CardContent className=" flex flex-col gap-4">
            {isError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Please enter an API key.
                </AlertDescription>
              </Alert>
            )}
          <div>
                <Label>Api Key</Label>
                <Input type="text" placeholder="Api Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)}/>
          </div>
         
        </CardContent>
        <CardFooter className="flex justify-end gap-2">   
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={apiKey ? handleSave : showAlert}>Save</Button>
        </CardFooter>
      </Card>
    </GenericDrawerLayout>
  );
};

export default Modal;
