export type DbtQuery = {
  metrics: string[];
  groupBy: string[];
  limit?: number;
  startTime?: string;
  endTime?: string;
  where?: string;
  order?: string;
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
