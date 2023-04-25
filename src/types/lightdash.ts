export type LookerDbtMetrics = Record<string, string | string[]>;

enum FilterOperator {
  NULL = 'isNull',
  NOT_NULL = 'notNull',
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
  STARTS_WITH = 'startsWith',
  INCLUDE = 'include',
  NOT_INCLUDE = 'doesNotInclude',
  LESS_THAN = 'lessThan',
  LESS_THAN_OR_EQUAL = 'lessThanOrEqual',
  GREATER_THAN = 'greaterThan',
  GREATER_THAN_OR_EQUAL = 'greaterThanOrEqual',
  IN_THE_PAST = 'inThePast',
  IN_THE_NEXT = 'inTheNext',
  IN_THE_CURRENT = 'inTheCurrent',
  IN_BETWEEN = 'inBetween',
}

type ConditionalRule<O = FilterOperator, V = unknown> = {
  operator: O;
  values?: V[];
};

type FieldTarget = {
  fieldId: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FilterRule<O = FilterOperator, T = FieldTarget, V = any, S = any>
  extends ConditionalRule<O, V> {
  id: string;
  target: T;
  settings?: S;
}

type FilterGroupItem = FilterGroup | FilterRule;

type OrFilterGroup = {
  id: string;
  or: Array<FilterGroupItem>;
};

type AndFilterGroup = {
  id: string;
  and: Array<FilterGroupItem>;
};

type FilterGroup = OrFilterGroup | AndFilterGroup;

type Filters = {
  // Note: dimensions need to be in a separate filter group from metrics & table calculations
  dimensions?: FilterGroup;
  metrics?: FilterGroup;
};

type SortField = {
  fieldId: string; // Field must exist in the explore
  descending: boolean; // Direction of the sort
};

type TableCalculation = {
  index?: number;
  name: string;
  displayName: string;
  sql: string;
};

// Object used to query an explore. Queries only happen within a single explore
export type LightdashQuery = {
  explore: string;
  query: {
    dimensions: string[]; // Dimensions to group by in the explore
    metrics: string[]; // Metrics to compute in the explore
    filters: Filters;
    sorts: SortField[]; // Sorts for the data
    limit: number; // Max number of rows to return from query
    tableCalculations: TableCalculation[]; // calculations to append to results
  };
};

export type LightdashDbtMetric = Record<string, string | string[]> & {
  name: string;
};
