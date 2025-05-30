import { ModalSize } from "@/components/Types/ui/Modal";
import GenericDrawerLayout from "../../Layouts/Drawer";
import { NodeData } from "@/components/CMS/types";
import useStore from "@/components/Store/store";
import { useState, useEffect } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { ModalStore } from "@/components/Store/modal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Settings,
  Paintbrush,
  Menu,
  Bell,
  Play,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarInset,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";

import { SettingsDialog } from "@/components/ui/sidebar-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@mui/material";
import { AgentDetails } from "./AgentDetails";
import { Spinner } from "@heroui/spinner";
import { IconBrowser } from "@tabler/icons-react";
import { KnowledgeBaseDetails } from "./KnowledgeBaseDetails";

const data = {
  nav: [
    { name: "Agents", icon: Bell },
    { name: "Knowledge Base", icon: Menu },

    { name: "Settings", icon: Paintbrush },

    { name: "Advanced", icon: Settings },
  ],
};

interface NodeDrawerProps {
  isOpen: boolean | undefined;
  nodeId: string;
  onClose?: () => void;
  nodeData?: NodeData;
  size?: ModalSize; // Type this according to your node structure
  availableAgents: any;
}

const Modal = ({
  isOpen,
  nodeId,
  onClose,
  nodeData,
  size,
  availableAgents,
}: NodeDrawerProps) => {
  const node = useStore((state) => state.getNode(nodeId));
  const saveSecrets = useMutation(api.flows.node.data.saveNodeConfigurations);
  const getSecrets = useQuery(api.flows.node.data.getNodeConfigurations, {
    nodeId: nodeId as Id<"nodes">,
  });
  const [id, setId] = useState("");
  const { modalOpen, setModalOpen } = ModalStore();
  const [isError, setIsError] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const [activeSection, setActiveSection] = useState("Agents");
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [activeAgentData, setActiveAgentData] = useState<any>(null);

  

  const getKnowledgeBase = useAction(api.Integrations.Voice.elevenlabs.getKnowledgeBase)

  const [knowledgeBase, setKnowledgeBase] = useState<any>(null);
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<any>(null);

  const [viewAddDocument, setViewAddDocument] = useState(false);

  const renderAddDocument=()=>{
    setViewAddDocument(true);
    setSelectedKnowledgeBase(null);
  }

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (getSecrets) {
      setApiKey(getSecrets?.configurations?.apiKey);
    }
  }, [getSecrets]);

  const handleSave = () => {
    if (!apiKey) {
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
  };
  useEffect(() => {
    setId(node?._id);
    getKnowledgeBase({
      nodeId: nodeId as Id<"nodes">,
    }).then((res) => {
      
      setKnowledgeBase(res.documents);
    });
  }, [node]);

  

  // Filter agents by search term
  const filteredAgents = availableAgents.filter((agent: any) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSetAgent = (agentId: string) => {
    setActiveAgent(agentId);
    
    
  }

  const showAlert = () => {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Please enter an API key.</AlertDescription>
      </Alert>
    );
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen} modal={true} >
      <DialogContent className=" px-2 overflow-hidden  h-[90vh] md:max-w-[1400px] lg:max-w-[1400px] w-full gap-0 pb-1 ">
        <DialogHeader className="px-4">
          <div className="flex items-center gap-2">
            <Image
              src={node.data.ui.node_logo.url}
              alt="ElevenLabs"
              width={60}
              height={50}
            />
            <DialogTitle className="">
              <span className="text-2xl font-bold">
                {node.data.ui.Name || "Voice Agent"}
              </span>
            </DialogTitle>
          </div>

          <DialogDescription className="">
            Customize your settings here.
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-2 bg-gray-300" />
        
        <SidebarProvider className="items-start ">
          <Sidebar
            collapsible="none"
            variant="floating"
            className="bg-gray-200 shadow-sm rounded-lg md:flex  h-[80vh] mt-1"
          >
            <SidebarContent className="">
              <SidebarGroup className="">
                <SidebarGroupContent>
                  <SidebarMenu className="gap-2 ">
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.name === activeSection}
                          variant={"ghost"}
                          className="w-full text-black border border-gray-200 shadow-sm data-[active=true]:bg-color-primary-black data-[active=true]:text-white data-[state=active]:border-black "
                          onClick={() => {
                            setActiveSection(item.name);
                            setActiveAgent(null); // Reset agent selection when switching sections
                          }}
                        >
                          <span>
                            <item.icon /> {item.name}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-full flex-1 flex-col overflow-hidden ml-1 ">
            {activeSection === "Agents" && (
              <div className="flex h-full">
                {/* Nested Sidebar */}
                <Sidebar
                  collapsible="none"
                  className="hidden flex-1 mt-1 h-[80vh] md:flex bg-gray-200 rounded-lg  max-w-xs min-w-[200px]"
                >
                  <SidebarHeader className="gap-3.5 border-b p-1">
                    <div className="flex w-full items-center justify-between p-2">
                      <div className="text-base font-medium text-foreground">
                        Agents
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        className="ml-2"
                        aria-label="Create Agent"
                        onClick={() => {/* handle create agent logic here */}}
                      >
                        + Create Agent
                      </Button>
                    </div>
                    <SidebarInput
                      placeholder="Type to search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      aria-label="Search agents"
                    />
                  </SidebarHeader>
                  <SidebarContent className="list-none p-2">
                    <SidebarGroup className="px-0">
                      <SidebarGroupContent>
                        {filteredAgents.length === 0 && (
                          <div className="p-4 text-sm text-gray-500">No agents found.</div>
                        )}
                        {filteredAgents.map((agent: any) => (
                          <Button
                            key={agent.agentId}
                            className={`w-full`}
                            onClick={() => getSetAgent(agent.agentId)}
                            tabIndex={0}
                            variant={activeAgent === agent.agentId ? "default" : "outline"}
                            aria-label={`Select agent ${agent.name}`}
                            onKeyDown={(e) => { if (e.key === "Enter") setActiveAgent(agent.agentId); }}
                          >
                            <div className="flex w-full items-center gap-2">
                              <span className="font-normal">{agent.name}</span>
                            </div>
                            <span className="font-medium">{agent.subject}</span>
                            <span className="line-clamp-2 w-[200px] whitespace-break-spaces text-xs">
                              {agent.teaser}
                            </span>
                          </Button>
                        ))}
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
                {/* Main Content Area for Agent Details */}
                <div className="flex-1  overflow-y-auto max-w-[80vh]  m-1 mb-3 bg-gray-200 p-2 rounded-lg ">
                  {activeAgent ? (
                    <AgentDetails agentId={activeAgent} onClose={() => setModalOpen(false)} nodeId={nodeId as Id<"nodes">} />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-lg">
                      Select an agent to view details.
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeSection === "Settings" && (
              <Card className="shadow-none border-none ">
                <CardHeader>
                  <CardTitle>{`${node.data.ui.Name || "Voice Agent"} Settings`}</CardTitle>
                  <CardDescription>
                    Configure your settings here.
                  </CardDescription>
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
                    <Input
                      type="text"
                      placeholder="Api Key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={apiKey ? handleSave : showAlert}
                  >
                    Save
                  </Button>
                </CardFooter>
              </Card>
            )}
            {activeSection === "Knowledge Base" && (
              <div className="flex h-full">
                {/* Nested Sidebar for Knowledge Base */}
                <Sidebar
                  collapsible="none"
                  className="hidden flex-1 mt-1 h-[80vh] md:flex bg-gray-200 rounded-lg max-w-xs min-w-[200px]"
                >
                  <SidebarHeader className="gap-3.5 border-b p-1">
                    <div className="flex w-full items-center justify-between p-2">
                      <div className="text-base font-medium text-foreground">
                        Knowledge Base
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        className="ml-2"
                        aria-label="Add Document"
                        onClick={() => renderAddDocument()}
                      >
                        + Add document
                      </Button>
                    </div>
                    <SidebarInput
                      placeholder="Type to search..."
                      aria-label="Search knowledge base"
                    />
                  </SidebarHeader>
                  <SidebarContent className="list-none p-2">
                    <SidebarGroup className="px-0">
                      <SidebarGroupContent>
                        
                        {knowledgeBase ? (
                          knowledgeBase?.map((item: any) => (
                            <Button
                              className={`w-full`}
                              tabIndex={0}
                              key={item.id}
                              variant={selectedKnowledgeBase === item.id ? "default" : "outline"}
                              onClick={() => {setSelectedKnowledgeBase(item.id); setViewAddDocument(false)}}
                              aria-label={`Select document Luxury Apartments in Sector 85, Gurgaon`}
                            >
                              <div className="flex w-full items-center gap-2">
                                <span className="text-xl"><IconBrowser/></span>
                                <span className="font-normal text-sm text-ellipsis overflow-hidden   ">{item.name}</span>
                              </div>
                            </Button>
                          ))
                        ) : (
                          <div className="flex justify-center items-center p-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"><Spinner/></div>
                          </div>
                        )}
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
                {/* Main Content Area for Knowledge Base Details */}
                {viewAddDocument ? (
                          <div className="flex flex-col gap-2">
                            <h1>URL</h1>
                            <Input
                              placeholder="URL"
                              value={"url"}
                              onChange={ (e) => {
                                console.log(e.target.value);
                              }}
                            />
                            <Button variant="primary" onClick={() => {}}>Add</Button>
                          </div>
                        ) : (<></>)}
                {selectedKnowledgeBase ? (
                <KnowledgeBaseDetails
                  nodeId={nodeId as Id<"nodes">}
                  selectedDocument={selectedKnowledgeBase}
                  onDelete={(docId) => {/* handle delete logic here */}}
                />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-lg">
                    Select a document to view details.
                  </div>
                )}
              </div>
            )}
            {activeSection === "Advanced" && (
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                <div className="flex flex-col gap-4">
                  <Label>Advanced</Label>
                </div>
              </div>
            )}
          </main>
        </SidebarProvider>
        
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
