export type DbtQuery = {
  metrics: { name: string }[];
  groupBy: { name: string; grain?: string }[];
  limit?: number;
  where?: {
    sql: string;
  };
  orderBy?: string;
};

export type DbtMetric = {
  name: string;
  description: string | null;
  type: string;
  queryableGranularities: string[];
  dimensions: {
    name: string;
    description: string | null;
    type: string;
  }[];
};
