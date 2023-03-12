import { DbtQuery } from './dbt';
import { LightdashQuery } from './lightdash';

export type LightdashField = {
  name: string;
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
  jobId: string;
  serviceToken: string;
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

export interface RefineQueryRequest<T extends LightdashQuery | DbtQuery> {
  query: T;
  message: string;
}

export interface RefineQueryResponse<T extends LightdashQuery | DbtQuery> {
  query: T extends DbtQuery ? DbtMetricsQueryResponse : LightdashQuery;
}

export interface SummarizeQueryRequest {
  query: LightdashQuery | DbtQuery;
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
