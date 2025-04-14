export type NODE_UI = {
    Name: string;
    active: boolean;
    description: string | null;
    id: number;
    node_data: any | null;
    node_description: string;
    node_logo: NODE_LOGO;
    node_type: string;
  }
  
  export type NODE_LOGO = {
    
      alternativeText: string;
      caption: string | null;
      createdAt: string;
      documentId: string;
      ext: string;
      formats: any | null;
      hash: string;
      height: number;
      id: number;
      mime: string;
      name: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: {
        public_id: string;
        resource_type: string;
      };
      publishedAt: string;
      size: number;
      updatedAt: string;
      url: string;
      width: number;
    
  }
  
  export type ConvexNode = {
    _id: string;
    data: {
      configurations: Record<string, any>;
      secrets: Record<string, any>;
      ui: NODE_UI;
      selected: boolean;
      id: string;
    };
    measured: {
      height: number;
      width: number;
    };
    position: {
      x: number;
      y: number;
    };
    projectId:string;
    type:string;
  }