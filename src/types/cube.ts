/**
 * Member identifier. Should satisfy to the following regexp: /^[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$/
 */
type Member = string;

/**
 * Datetime member identifier. Should satisfy to the following
 * regexp: /^[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+(\.(second|minute|hour|day|week|month|year))?$/
 */
type TimeMember = string;

/**
 * Filter operator string.
 */
type FilterOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'in'
  | 'notIn'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'set'
  | 'notSet'
  | 'inDateRange'
  | 'notInDateRange'
  | 'onTheDate'
  | 'beforeDate'
  | 'afterDate'
  | 'measureFilter';

/**
 * Time dimension granularity data type.
 */
type QueryTimeDimensionGranularity =
  | 'quarter'
  | 'day'
  | 'month'
  | 'year'
  | 'week'
  | 'hour'
  | 'minute'
  | 'second';

/**
 * Query order data type.
 */
type QueryOrderType = 'asc' | 'desc';

/**
 * Query base filter definition.
 */
interface QueryFilter {
  member: Member;
  operator: FilterOperator;
  values?: string[];
}

/**
 * Query 'and'-filters type definition.
 */
type LogicalAndFilter = {
  and: (
    | QueryFilter
    | {
        or: (QueryFilter | LogicalAndFilter)[];
      }
  )[];
};

/**
 * Query 'or'-filters type definition.
 */
type LogicalOrFilter = {
  or: (QueryFilter | LogicalAndFilter)[];
};

/**
 * Query datetime dimention interface.
 */
interface QueryTimeDimension {
  dimension: Member;
  dateRange?: string[] | string;
  granularity?: QueryTimeDimensionGranularity;
}

/**
 * Incoming network query data type.
 */
export type CubeQuery = {
  measures: Member[];
  dimensions?: (Member | TimeMember)[];
  filters?: (QueryFilter | LogicalAndFilter | LogicalOrFilter)[];
  timeDimensions?: QueryTimeDimension[];
  segments?: Member[];
  limit?: null | number;
  offset?: number;
  total?: boolean;
  totalQuery?: boolean;
  order?: QueryOrderType;
  timezone?: string;
  renewQuery?: boolean;
  ungrouped?: boolean;
};

/*** CATALOG TYPES BELOW ***/
export type CubeDimension = {
  name: string;
  title: string;
  type: string;
  aliasName: string;
  shortTitle: string;
};

export type CubeMeasure = CubeDimension & {
  aggType: string;
  drill_members: string[];
};

export type CubeCube = {
  name: string;
  title: string;
  connectedComponent: number;
  measures: CubeMeasure[];
  dimensions: CubeDimension[];
};
