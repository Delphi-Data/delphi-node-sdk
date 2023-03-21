export type MetabaseMetric = {
  name: string;
  description: string;
  id: string;
};

type TemporalUnit =
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';
type Field = ['field', number, null | { 'temporal-unit': TemporalUnit }]; // the field ID
type Metric = ['metric', number]; // the metric ID

type AggregationType =
  | 'avg'
  | 'count'
  | 'count-where'
  | 'cum-count'
  | 'cum-sum'
  | 'distinct'
  | 'stddev'
  | 'sum'
  | 'sum-where'
  | 'min'
  | 'max';
type AggregationClause = [AggregationType, Field] | Metric;

type FilterType =
  | 'not'
  | '='
  | '!='
  | '<'
  | '>'
  | '<='
  | '>='
  | 'is-null'
  | 'not-null'
  | 'between'
  | 'inside'
  | 'starts-with'
  | 'contains'
  | 'does-not-contain'
  | 'ends-with'
  | 'time-interval';
type FilterClause =
  | [FilterType, Field, number | boolean | string | null]
  | ['and' | 'or', ...FilterClause[]];

export type MetabaseQuery = {
  type: 'query';
  query: {
    'source-table': number;
    fields?: Field[];
    aggregation?: AggregationClause[];
    breakout?: Field[];
    filter?: FilterClause;
    limit?: number;
  };
  database: number;
  parameters: [];
};
