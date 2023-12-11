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
  dimensionName?: string;
};

type UpperCase = {
  dimensionName?: string;
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
  expression?: string;
};

type DateRange = {
  startDate: string;
  endDate: string;
};

type FilterExpression = {
  andGroup?: FilterGroup;
  orGroup?: FilterGroup;
  notExpression?: FilterExpression;
  filter?: Filter;
};

type FilterGroup = {
  expressions: FilterExpression[];
};

type Filter = {
  fieldName?: string;
  stringFilter?: StringFilter;
  inListFilter?: InListFilter;
  numericFilter?: NumericFilter;
  betweenFilter?: BetweenFilter;
};

type StringFilter = {
  value?: string;
  caseSensitive?: boolean;
  matchType?: MatchType | keyof typeof MatchType;
};

type InListFilter = {
  values?: string[];
};

type NumberValue = {
  int64Value?: number | string | null;
  doubleValue?: number | null;
};

type NumericFilter = {
  operation?: keyof typeof NumericFilterOperation;
  value?: NumberValue;
};

type BetweenFilter = {
  fromValue?: NumberValue;
  toValue?: NumberValue;
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

enum MetricAggregation {
  METRIC_AGGREGATION_UNSPECIFIED = 0,
  TOTAL = 1,
  MINIMUM = 5,
  MAXIMUM = 6,
  COUNT = 4,
}

enum MatchType {
  MATCH_TYPE_UNSPECIFIED = 0,
  EXACT = 1,
  BEGINS_WITH = 2,
  ENDS_WITH = 3,
  CONTAINS = 4,
  FULL_REGEXP = 5,
  PARTIAL_REGEXP = 6,
}

enum NumericFilterOperation {
  OPERATION_UNSPECIFIED = 0,
  EQUAL = 1,
  LESS_THAN = 2,
  LESS_THAN_OR_EQUAL = 3,
  GREATER_THAN = 4,
  GREATER_THAN_OR_EQUAL = 5,
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
