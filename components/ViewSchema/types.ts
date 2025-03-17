import { JSONSchema7 } from 'json-schema';

export type SchemaIcon = {
  number: 'hashtag';
  string: 'text';
  boolean: 'toggle';
  array: 'cube';
  object: 'folder';
  default: 'circle';
  root: 'file-json';
}[keyof {
  number: any;
  string: any;
  boolean: any;
  array: any;
  object: any;
  default: any;
  root: any;
}];

export interface ExtendedJSONSchema7 extends JSONSchema7 {
  icon?: SchemaIcon;
  properties?: {
    [key: string]: ExtendedJSONSchema7;
  };
  items?: ExtendedJSONSchema7 | ExtendedJSONSchema7[];
  examples?: any[];
}

export interface SchemaField {
  path: string;
  value: any;
  type: 'schema-field';
}

export interface SchemaViewerContextType {
  onDragStart?: (e: React.DragEvent, path: string, value: any) => void;
  onDrop?: (field: SchemaField) => void;
}

export interface SchemaViewerProps {
  schema: ExtendedJSONSchema7;
  initialExpanded?: boolean;
  onDragStart?: (e: React.DragEvent, path: string, value: any) => void;
  className?: string;
  level?: number;
  path?: string;
  searchTerm?: string;
} 