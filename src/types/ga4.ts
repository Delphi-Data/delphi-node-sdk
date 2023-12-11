export type GA4Query = Report | RealtimeReport;

type Dimension = {
  name: string;
  dimensionExpression?: DimensionExpression;
};

type DimensionExpression = {
  lowerCase?: LowerCase;
  upperCase?: UpperCase;
  concatenate?: Concatenate;
  dimensionName?: DimensionName;
  caseExpression?: CaseExpression;
  extract?: Extract;
};

type LowerCase = {
  sourceProperty?: string;
};

type UpperCase = {
  sourceProperty?: string;
};

type Concatenate = {
  dimensionNames?: string[];
  delimiter?: string;
};

type DimensionName = {
  dimensionName?: string;
};

type CaseExpression = {
  dimensionName?: string;
  cases?: Case[];
  defaultValue?: string;
};

type Case = {
  value?: string;
  dimensionName?: string;
};

type Extract = {
  sourceProperty?: string;
  regex?: string;
};

type Metric = {
  name: string;
  expression?: MetricExpression;
};

type MetricExpression = {
  concatenate?: Concatenate;
  expression?: string;
};

type DateRange = {
  startDate: string;
  endDate: string;
};

type FilterExpression = {
  andGroup?: FilterGroup;
  orGroup?: FilterGroup;
};

type FilterGroup = {
  filters?: Filter[];
};

type Filter = {
  fieldName?: string;
  stringFilter?: StringFilter;
  inListFilter?: InListFilter;
  numericFilter?: NumericFilter;
  betweenFilter?: BetweenFilter;
  nullFilter?: NullFilter;
  notFilter?: FilterExpression;
};

type StringFilter = {
  value?: string;
  caseSensitive?: boolean;
  matchType?: MatchType;
};

type InListFilter = {
  values?: string[];
};

type NumericFilter = {
  operation?: NumericFilterOperation;
  value?: number;
};

type BetweenFilter = {
  fromValue?: number;
  toValue?: number;
};

type NullFilter = {
  operator?: NullFilterOperator;
};

type OrderBy = {
  dimension?: DimensionOrderBy;
  metric?: MetricOrderBy;
};

type DimensionOrderBy = {
  dimensionName?: string;
  orderType?: OrderType;
};

type MetricOrderBy = {
  metricName?: string;
  orderType?: OrderType;
};

// type Pivot = {
//   fieldNames?: string[];
//   limit?: number;
//   metricAggregations?: MetricAggregation[];
//   orderBys?: OrderBy[];
// };

type MetricAggregation = {
  name?: string;
  expression?: string;
};

enum MatchType {
  MATCH_TYPE_UNSPECIFIED = 'MATCH_TYPE_UNSPECIFIED',
  EXACT = 'EXACT',
  CONTAINS = 'CONTAINS',
  BEGINS_WITH = 'BEGINS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  PARTIAL = 'PARTIAL',
  REGEXP = 'REGEXP',
  WILDCARD = 'WILDCARD',
}

enum NumericFilterOperation {
  OPERATOR_UNSPECIFIED = 'OPERATOR_UNSPECIFIED',
  EQUAL = 'EQUAL',
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
}

enum NullFilterOperator {
  NULL_OPERATOR_UNSPECIFIED = 'NULL_OPERATOR_UNSPECIFIED',
  IS_NULL = 'IS_NULL',
  IS_NOT_NULL = 'IS_NOT_NULL',
}

enum OrderType {
  ORDER_TYPE_UNSPECIFIED = 'ORDER_TYPE_UNSPECIFIED',
  ALPHANUMERIC = 'ALPHANUMERIC',
  CASE_INSENSITIVE_ALPHANUMERIC = 'CASE_INSENSITIVE_ALPHANUMERIC',
  NUMERIC = 'NUMERIC',
}

type Report = {
  type?: 'REPORT';
  dimensions: Dimension[];
  metrics: Metric[];
  dateRanges: DateRange[];
  dimensionFilter?: FilterExpression;
  metricFilter?: FilterExpression;
  offset?: number;
  limit?: number;
  metricAggregations?: MetricAggregation[];
  orderBys?: OrderBy[];
};

// type PivotReport = {
//   type: 'PIVOT';
//   dimensions: Dimension[];
//   metrics: Metric[];
//   dateRanges: DateRange[];
//   dimensionFilter?: FilterExpression;
//   metricFilter?: FilterExpression;
//   offset?: number;
//   limit?: number;
//   metricAggregations?: MetricAggregation[];
//   orderBys?: OrderBy[];
//   pivots: Pivot[];
// };

type RealtimeReport = {
  type: 'REALTIME';
  dimensions: Dimension[];
  metrics: Metric[];
  dimensionFilter?: FilterExpression;
  metricFilter?: FilterExpression;
  limit?: number;
  metricAggregations?: MetricAggregation[];
  orderBys?: OrderBy[];
};
