export type DbtQuery = {
  metric: string;
  dimensions?: string[];
  timeGrain?: string;
  startDate?: string;
  endDate?: string;
  where?: string;
};
