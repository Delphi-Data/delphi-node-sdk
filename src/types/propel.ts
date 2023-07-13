export type PropelMetric = {
  uniqueName: string;
  description: string;
  dimensions: { columnName: string }[];
};

export type PropelQuery = {
  query: string;
};
