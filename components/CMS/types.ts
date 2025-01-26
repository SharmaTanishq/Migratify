export interface NodeLogo {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  
}

export interface NodeData {
  id: number;
  Name: string;
  node_description: string;
  node_type: string;
  active: boolean;
  node_data: any | null;
  node_logo: NodeLogo;
}

export interface CMSNode {
  
  Name: string;
  Node: NodeData;
}

export interface NodesTypeCMS {
  id: number;
  
  Name: string;
  
  
  
  nodes: CMSNode[];
}
