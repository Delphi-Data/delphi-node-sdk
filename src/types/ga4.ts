export type GA4Query = {
  dimensions: string[];
  metrics: string[];
  dateRanges: {
    startDate: string;
    endDate: string;
  }[];
  dimensionFilter?: {
    filters: {
      dimensionName: string;
      operator:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'IN_LIST'
        | 'NOT_IN_LIST'
        | 'REGEXP'
        | 'BEGINS_WITH'
        | 'ENDS_WITH'
        | 'PARTIAL'
        | 'EXACT'
        | 'CONTAINS'
        | 'IN_LIST_ICASE'
        | 'NOT_IN_LIST_ICASE'
        | 'EXISTS'
        | 'NUMERIC_GREATER_THAN'
        | 'NUMERIC_GREATER_THAN_EQUAL'
        | 'NUMERIC_LESS_THAN'
        | 'NUMERIC_LESS_THAN_EQUAL'
        | 'NUMERIC_BETWEEN'
        | 'NUMERIC_EQUAL'
        | 'NUMERIC_IN_LIST';
      expressions: string[];
      caseSensitive: boolean;
    }[];
  };
  metricFilter?: {
    filters: {
      metricName: string;
      operator:
        | 'EQUAL'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUAL'
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUAL'
        | 'BETWEEN'
        | 'IN_LIST';
      comparisonValue: string;
    }[];
  };
  orderBys?: {
    fieldName: string;
    orderType:
      | 'ORDER_TYPE_UNSPECIFIED'
      | 'ALPHANUMERIC'
      | 'CASE_INSENSITIVE_ALPHANUMERIC'
      | 'NUMERIC'
      | 'CASE_INSENSITIVE_NUMERIC';
    sortOrder: 'ORDER_UNSPECIFIED' | 'ASCENDING' | 'DESCENDING';
  }[];
  currencyCode?: string;
  cohortSpec?: {
    cohorts: {
      name: string;
      dimension: string;
      dateRange: {
        startDate: string;
        endDate: string;
      };
    }[];
    cohortsRange: {
      granularity: 'GRANULARITY_UNSPECIFIED' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
      startOffset: number;
      endOffset: number;
    };
  };
  keepEmptyRows?: boolean;
  returnPropertyQuota?: boolean;
  samplingLevel?:
    | 'SAMPLING_UNSPECIFIED'
    | 'DEFAULT'
    | 'SMALL'
    | 'LARGE'
    | 'HIGHER_PRECISION';
  pageToken?: string;
  pageSize?: number;
  includeEmptyRows?: boolean;
  hideTotalRows?: boolean;
  hideValueRanges?: boolean;
  metricAggregations?:
    | 'METRIC_AGGREGATION_UNSPECIFIED'
    | 'TOTAL'
    | 'MINIMUM'
    | 'MAXIMUM'
    | 'COUNT'
    | 'SUM'
    | 'STANDARD_DEVIATION'
    | 'COUNT_DISTINCT'
    | 'COUNT_TRUE'
    | 'COUNT_FALSE'
    | 'FRACTION'
    | 'NUMERIC_MAX'
    | 'NUMERIC_MIN'
    | 'NUMERIC_SUM'
    | 'NUMERIC_AVERAGE'
    | 'EXPRESSION';
  dimensionAggregations?:
    | 'DIMENSION_AGGREGATION_UNSPECIFIED'
    | 'AUTO'
    | 'TOTAL'
    | 'MINIMUM'
    | 'MAXIMUM'
    | 'COUNT'
    | 'COUNT_DISTINCT'
    | 'NUMERIC_MIN'
    | 'NUMERIC_MAX'
    | 'NUMERIC_SUM'
    | 'NUMERIC_AVERAGE';
  offset?: number;
  returnResponse?: boolean;
  returnRowTotals?: boolean;
  returnRowsPerQuery?: number;
  viewId?: string;
  property?: string;
  quotaUser?: string;
  userIp?: string;
};
