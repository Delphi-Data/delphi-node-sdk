export type MetabaseField = {
  name: string;
  description: string | null;
  id: number;
};

type AggregationClause =
  | ['avg', ConcreteField]
  | ['count']
  | ['count', ConcreteField]
  | ['count-where', FilterClause]
  | ['cum-count', ConcreteField]
  | ['cum-sum', ConcreteField]
  | ['distinct', ConcreteField]
  | ['stddev', ConcreteField]
  | ['sum', ConcreteField]
  | ['sum-where', ConcreteField, FilterClause]
  | ['min', ConcreteField]
  | ['max', ConcreteField]
  | ['share', FilterClause];

type FilterClause =
  | ['and', ...FilterClause[]]
  | ['or', ...FilterClause[]]
  | ['not', FilterClause]
  | ['=', ConcreteField, ...Value[]]
  | ['!=', ConcreteField, ...Value[]]
  | ['<', ConcreteField, OrderableValue]
  | ['>', ConcreteField, OrderableValue]
  | ['<=', ConcreteField, OrderableValue]
  | ['>=', ConcreteField, OrderableValue]
  | ['is-null', ConcreteField]
  | ['not-null', ConcreteField]
  | ['between', ConcreteField, OrderableValue, OrderableValue]
  | [
      'inside',
      LatConcreteField,
      LonConcreteField,
      number,
      number,
      number,
      number
    ]
  | ['starts-with', ConcreteField, string]
  | ['contains', ConcreteField, string]
  | ['does-not-contain', ConcreteField, string]
  | ['ends-with', ConcreteField, string]
  | [
      'time-interval',
      ConcreteField,
      number | 'current' | 'last' | 'next',
      RelativeDatetimeUnit
    ];

type ConcreteField = ['field-id', number];
type Value = string | number | boolean;
type OrderableValue = string | number;
type LatConcreteField = string;
type LonConcreteField = string;
type RelativeDatetimeUnit =
  | 'hour'
  | 'day'
  | 'minute'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';

export type MetabaseQuery = {
  type: 'query';
  query: {
    'source-table': number;
    fields?: ConcreteField[];
    aggregation?: AggregationClause[];
    breakout?: ConcreteField[];
    filter?: FilterClause;
    limit?: number;
  };
  database: number;
  parameters: [];
};
