import { DbtMetric, DbtQuery } from './dbt';
import { LightdashDbtMetric, LightdashQuery } from './lightdash';
import { MetabaseMetric, MetabaseQuery } from './metabase';

export type LightdashField = {
  name: string;
  label?: string;
  description: string;
  explore: string;
  table: string;
};

export type QueryResult = Record<
  string,
  string | number | Date | boolean | JSON
>[];

export interface DbtMetricsQueryRequest {
  question: string;
  jobId?: string;
  serviceToken?: string;
  metrics?: Record<string, string | string[]>[];
  context?: string[];
}

export interface LightdashQueryRequest {
  question: string;
  dimensions: LightdashField[];
  metrics: LightdashField[];
  context?: string[];
}

export interface GetAnswerRequest {
  question: string;
  data: QueryResult;
  context?: string[];
  query?: string | LightdashQuery;
}

export interface LightdashQueryResponse {
  lightdashQuery: LightdashQuery;
}

export interface DbtMetricsQueryResponse {
  dbtMetricsQuery: string;
  dbtMetricObject: DbtQuery;
}

export type MetabaseQueryRequest = {
  question: string;
  dimensions: MetabaseMetric[];
  metrics: MetabaseMetric[];
  context?: string[];
};

export type MetabaseQueryResponse = {
  metabaseQuery: MetabaseQuery;
};

export interface RefineQueryRequest<
  T extends LightdashQuery | DbtQuery | MetabaseQuery
> {
  query: T;
  message: string;
  originalQuestion: string;
  dimensions: LightdashField[] | [];
  metrics:
    | LightdashField[]
    | DbtMetric[]
    | LightdashDbtMetric[]
    | MetabaseMetric[];
}

export interface RefineQueryResponse<
  T extends LightdashQuery | DbtQuery | MetabaseQuery
> {
  query: T extends DbtQuery
    ? DbtMetricsQueryResponse
    : T extends LightdashQuery
    ? LightdashQuery
    : MetabaseQuery;
}

export interface SummarizeQueryRequest {
  query: LightdashQuery | DbtQuery | MetabaseQuery;
}

export interface SummarizeQueryResponse {
  summary: string;
}

export interface GetAnswerResponse {
  answer: string;
}

export type Document = {
  name: string;
};

export type SearchEntitiesRequest<T extends Document> = {
  question: string;
  entities: T[];
};

export type SearchEntitiesResponse<T extends Document> = {
  relevantEntities: T[];
};

export type ErrorResponse = {
  error: string;
};
