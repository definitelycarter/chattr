const base = {
  type: 'postgres',
  synchronize: true,
  database: 'postgres',
  username: 'postgres',
  password: '',
  maxQueryExecutionTime: 1000,
  entities: ['lib/**/model.js'],
};

module.exports = [
  {
    ...base,
    name: 'development',
  },
  {
    ...base,
    host: 'postgres',
    name: 'default',
    logging: true,
  },
  {
    ...base,
    name: 'test',
  },
];
