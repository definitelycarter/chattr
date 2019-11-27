const base = {
  type: 'postgres',
  synchronize: true,
  database: 'postgres',
  host: 'postgres',
  username: 'postgres',
  password: '',
  maxQueryExecutionTime: 1000,
  entities: ['lib/**/model.js'],
  logging: true,
};

module.exports = [
  {
    ...base,
    name: 'development',
  },
  {
    ...base,
    name: 'default',
    logging: true,
  },
  {
    ...base,
    name: 'test',
  },
];
