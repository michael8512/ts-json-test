const Mock = require('mockjs');
const { get } = require('lodash');
const { resolve } = require('path');

const tsj = require('ts-json-schema-generator');

const config = {
  path: resolve(process.cwd(), './mock/data-source.d.ts'),
  tsconfig: resolve(process.cwd(), './tsconfig.json'),
  type: '*',
};

const shapeSchema = tsj.createGenerator(config).createSchema(config.type);

console.log(JSON.stringify(shapeSchema));

const { Random } = Mock;

const formatMockData = (schemaData) => {
  const { type, properties, $ref } = schemaData;
  const data = {};
  if ($ref) {
    const quoteList = $ref.split('/').slice(1);
    return formatMockData(get(schema, quoteList));
  }

  if (type === 'object') {
    // eslint-disable-next-line guard-for-in
    for (const key in properties) {
      const propertyType = properties[key].type;
      let value;
      if (propertyType === 'string') {
        value = Random.cname();
      } else if (propertyType === 'boolean') {
        value = Random.boolean();
      } else if (propertyType === 'number') {
        value = Random.integer(0, 100);
      } else if (propertyType === 'array') {
        const { items } = properties[key];
        value = formatMockData(items);
      } else {
        value = formatMockData(properties[key]);
      }
      data[key] = value;
    }
  }
  return data;
};

module.exports = () => {
  const data = Mock.mock({
    'data|1-10': [
      () => {
        const mockData = formatMockData(get(shapeSchema, ['definitions', 'DATA_SOURCE.DsTouchData']));
        return mockData || {};
      },
    ],
  });
  return data;
};
