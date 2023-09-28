export type DbtQuery = {
  metrics: { name: string }[];
  groupBy?: { name: string; grain?: string }[];
  limit?: number;
  where?: {
    sql: string;
  };
  orderBy?: {
    metric?: {
      name: string;
    };
    groupBy?: {
      name: string;
      grain?: string;
    };
    descending: boolean;
  };
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
