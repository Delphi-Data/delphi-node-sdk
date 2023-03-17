export type DbtQuery = {
  metric: string;
  dimensions?: string[];
  timeGrain?: string;
  startDate?: string;
  endDate?: string;
  where?: string;
};

export type DbtMetric = {
  uniqueId?: string | undefined;
  name: string;
  dimensions: string[];
  description: string;
  timeGrains: string[];
  label: string;
};
