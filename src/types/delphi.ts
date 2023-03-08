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
}

export interface LightdashQueryResponse {
  lightdashQuery: LightdashQuery;
}

export interface DbtMetricsQueryResponse {
  dbtMetricsQuery: string;
  dbtMetricObject: DbtQuery;
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

export type ErrorResponse = {
  error: string;
};
