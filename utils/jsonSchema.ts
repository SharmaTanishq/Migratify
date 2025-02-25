import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';

export const schemaIcons = {
  object: 'cube',
  array: 'list',
  string: 'font',
  null: 'font',
  number: 'hashtag',
  boolean: 'check-square',
  function: 'code',
  bigint: 'calculator',
  symbol: 'sun',
  undefined: 'ban',
} as const;

type SchemaIcon = typeof schemaIcons[keyof typeof schemaIcons];

interface ExtendedJSONSchema7 extends JSONSchema7 {
  icon?: SchemaIcon;
  properties?: {
    [key: string]: ExtendedJSONSchema7;
  };
  items?: ExtendedJSONSchema7 | ExtendedJSONSchema7[];
}

function inferType(value: any): JSONSchema7TypeName {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value as JSONSchema7TypeName;
}

function getIconForType(type: JSONSchema7TypeName): SchemaIcon {
  return schemaIcons[type as keyof typeof schemaIcons] || 'ban';
}

export function jsonToSchema(json: any, title?: string): ExtendedJSONSchema7 {
  const type = inferType(json);
  const schema: ExtendedJSONSchema7 = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type,
    icon: getIconForType(type),
  };

  if (title) {
    schema.title = title;
  }

  if (typeof json === 'object' && json !== null) {
    if (Array.isArray(json)) {
      schema.items = json.length > 0 ? jsonToSchema(json[0]) : {};
    } else {
      schema.properties = {};
      schema.required = [];
      
      for (const [key, value] of Object.entries(json)) {
        schema.properties[key] = jsonToSchema(value);
        schema.required.push(key);
      }
    }
  }

  return schema;
} 