import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

interface AgentDetailsProps {
  agentData: any;
  onClose: () => void;
}

export const AgentDetails: FC<AgentDetailsProps> = ({ agentData, onClose }) => {
  if (!agentData) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-lg">
        No agent data available.
      </div>
    );
  }

  // Extract relevant fields from agentData
  const {
    name,
    agentId,
    conversationConfig,
    metadata,
    tags,
  } = agentData;

  const language = conversationConfig?.agent?.language;
  const additionalLanguages = conversationConfig?.agent?.languagePresets || {};
  const firstMessage = conversationConfig?.agent?.firstMessage;
  const systemPrompt = conversationConfig?.agent?.prompt?.prompt;
  const knowledgeBase = conversationConfig?.agent?.prompt?.knowledgeBase || [];
  const ragEnabled = conversationConfig?.agent?.prompt?.rag?.enabled;
  const tools = conversationConfig?.agent?.prompt?.tools || [];

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
      {/* Header */}
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{name}</h2>
              <Badge variant="outline">Public</Badge>
            </div>
            <div className="text-xs text-gray-500">{agentId}</div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onClose} aria-label="Close details">Close</Button>
      </div>
      <Separator />
      {/* Tabs (static for now) */}
     
      {/* Agent Language */}
      <Card className="bg-muted/50">
        <CardContent className="flex flex-col gap-2 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Agent Language</Label>
              <div className="text-xs text-gray-500">Choose the default language the agent will communicate in.</div>
            </div>
            <Badge className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-black border border-gray-300">
              <span className="i-flag-in" role="img" aria-label="Hindi">🇮🇳</span> Hindi
            </Badge>
          </div>
        </CardContent>
      </Card>
      {/* Additional Languages */}
      <Card className="bg-muted/50">
        <CardContent className="flex flex-col gap-2 pt-4">
          <Label className="text-base font-medium">Additional Languages</Label>
          <div className="text-xs text-gray-500 mb-2">Specify additional languages which callers can choose from.</div>
          <div className="flex gap-2 flex-wrap">
            <Badge className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-black border border-gray-300">
              <span className="i-flag-us" role="img" aria-label="English">🇺🇸</span> English
            </Badge>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            To support additional languages, language overrides will be enabled. You can view and configure all overrides in the "Security" tab.
          </div>
        </CardContent>
      </Card>
      {/* Language Detection Recommendation */}
      <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm">
        <span className="font-semibold">We recommend enabling <span className="underline">language detection</span> system tool for optimal conversation experience.</span>
      </div>
      {/* First Message */}
      <Card className="bg-muted/50">
        <CardContent className="flex flex-col gap-2 pt-4">
          <Label className="text-base font-medium">First message</Label>
          <div className="text-xs text-gray-500 mb-2">The first message the agent will say. If empty, the agent will wait for the user to start the conversation. You can specify different presets for each language.</div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-black border border-gray-300">
              <span className="i-flag-in" role="img" aria-label="Hindi">🇮🇳</span> Default (Hindi)
            </Badge>
            <Button variant="outline" size="sm" className="ml-2">Translate to all</Button>
          </div>
          <div className="bg-gray-100 rounded p-2 text-sm">{firstMessage}</div>
        </CardContent>
      </Card>
      {/* System Prompt */}
      <Card className="bg-muted/50">
        <CardContent className="flex flex-col gap-2 pt-4">
          <Label className="text-base font-medium">System prompt</Label>
          <div className="text-xs text-gray-500 mb-2">The system prompt is used to determine the persona of the agent and the context of the conversation.</div>
          <div className="bg-gray-100 rounded p-2 text-xs whitespace-pre-line max-h-60 overflow-y-auto">
            {systemPrompt}
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Base Section */}
      <Card className="bg-muted/50">
        <CardContent className="flex flex-col gap-4 pt-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Label className="text-base font-medium">Knowledge base</Label>
              <div className="text-xs text-gray-500">Provide the LLM with domain-specific information to help it answer questions more accurately</div>
            </div>
            <Button variant="outline" size="sm">Add document</Button>
          </div>
          <div className="flex flex-col gap-2 max-h-32 overflow-y-auto">
            {knowledgeBase.length > 0 ? knowledgeBase.map((doc: any) => (
              <div key={doc.id} className="flex items-center gap-3 bg-gray-100 rounded p-3">
                <span className="text-xl">🌐</span>
                <span className="flex-1 font-medium">{doc.name}</span>
                <Button variant="ghost" size="icon" aria-label="Delete document">
                  <span className="text-lg">🗑️</span>
                </Button>
              </div>
            )) : (
              <div className="text-xs text-gray-400">No documents added.</div>
            )}
          </div>
          <div className="mt-2">
            <Label className="text-sm font-medium">Use RAG</Label>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 flex-1">Retrieval-Augmented Generation (RAG) increases the agent's maximum Knowledge Base size. The agent will have access to relevant pieces of attached Knowledge Base during answer generation.</span>
              <input type="checkbox" checked={!!ragEnabled} readOnly className="accent-black w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tools Section */}
      <Card className="bg-muted/50">
        <CardContent className="flex flex-col gap-4 pt-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Label className="text-base font-medium">Tools</Label>
              <div className="text-xs text-gray-500">Provide the agent with tools it can use to help users.</div>
            </div>
            <Button variant="outline" size="sm">Add tool</Button>
          </div>
          <div className="flex flex-col gap-2 max-h-32 overflow-y-auto">
            {tools.length > 0 ? tools.map((tool: any) => (
              <div key={tool.id} className="flex items-center gap-3 bg-gray-100 rounded p-3">
                <Badge variant="secondary" className="px-2 py-1 bg-gray-700 text-white font-mono text-xs">{tool.name}</Badge>
                <span className="text-xs text-gray-500">System</span>
                <span className="flex-1 text-sm">Gives agent the ability to end the call with the user.</span>
                <Button variant="ghost" size="icon" aria-label="Delete tool">
                  <span className="text-lg">🗑️</span>
                </Button>
              </div>
            )) : (
              <div className="text-xs text-gray-400">No tools added.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 