export type MetabaseMetric = {
  name: string;
  description: string;
  id: string;
};

export type MetabaseQuery = {
  database: number;
  query: {
    'source-table': number;
  };
  type: 'query';
};
