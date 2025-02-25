import { jsonToSchema, schemaIcons } from '@/utils/jsonSchema';
import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';

// Mock VTEX order schema for testing
const MOCK_VTEX_ORDER = {
  orderId: "1172452900788-01",
  sequence: "502556",
  marketplaceOrderId: "1172452900788-01",
  status: "handling",
  value: 1160,
  items: [
    {
      uniqueId: "94913BB553334977BFD669A24E678C69",
      id: "18",
      price: 990,
      quantity: 1
    }
  ]
};

describe('JSON Schema Generator', () => {
  const ajv = new Ajv();

  test('generates valid schema for simple object', () => {
    const input = {
      name: 'John',
      age: 30,
      isStudent: false
    };

    const schema = jsonToSchema(input, 'Person');
    const validate = ajv.compile(schema);
    
    expect(schema.$schema).toBe('http://json-schema.org/draft-07/schema#');
    expect(schema.title).toBe('Person');
    expect(schema.type).toBe('object');
    expect(schema.icon).toBe(schemaIcons.object);
    expect(schema.required).toEqual(['name', 'age', 'isStudent']);
    expect(validate(input)).toBe(true);

    // Check property icons
    expect(schema.properties?.name.icon).toBe(schemaIcons.string);
    expect(schema.properties?.age.icon).toBe(schemaIcons.number);
    expect(schema.properties?.isStudent.icon).toBe(schemaIcons.boolean);
  });

  test('generates valid schema for arrays', () => {
    const input = {
      items: [1, 2, 3],
      tags: ['test', 'demo']
    };

    const schema = jsonToSchema(input) as JSONSchema7;
    const validate = ajv.compile(schema);
    
    expect((schema.properties?.items as any).type).toBe('array');
    expect((schema.properties?.items as any).icon).toBe(schemaIcons.array);
    expect(((schema.properties?.items as any).items as any).type).toBe('number');
    expect(((schema.properties?.items as any).items as any).icon).toBe(schemaIcons.number);
    expect((schema.properties?.tags as any).type).toBe('array');
    expect((schema.properties?.tags as any).icon).toBe(schemaIcons.array);
    expect(((schema.properties?.tags as any).items as any).type).toBe('string');
    expect(((schema.properties?.tags as any).items as any).icon).toBe(schemaIcons.string);
    expect(validate(input)).toBe(true);
  });

  test('generates valid schema for nested objects', () => {
    const input = {
      user: {
        name: 'John',
        address: {
          street: '123 Main St',
          city: 'Boston'
        }
      }
    };

    const schema = jsonToSchema(input) as any;
    const validate = ajv.compile(schema);
    
    expect(schema.properties?.user.type).toBe('object');
    expect(schema.properties?.user.icon).toBe(schemaIcons.object);
    expect(schema.properties?.user.properties?.address.type).toBe('object');
    expect(schema.properties?.user.properties?.address.icon).toBe(schemaIcons.object);
    expect(validate(input)).toBe(true);
  });

  test('generates valid schema for VTEX order', () => {
    const schema = jsonToSchema(MOCK_VTEX_ORDER, 'VTEXOrder');
    const validate = ajv.compile(schema);
    
    expect(schema.title).toBe('VTEXOrder');
    expect(schema.type).toBe('object');
    expect(schema.icon).toBe(schemaIcons.object);
    expect(validate(MOCK_VTEX_ORDER)).toBe(true);
  });

  test('handles null values', () => {
    const input = {
      name: 'John',
      address: null
    };

    const schema = jsonToSchema(input) as any;
    const validate = ajv.compile(schema);
    
    expect(schema.properties?.address.type).toBe('null');
    expect(schema.properties?.address.icon).toBe(schemaIcons.null);
    expect(validate(input)).toBe(true);
  });
}); 