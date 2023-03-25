import { CubeCube, CubeQuery } from './cube';
import { DbtMetric, DbtQuery } from './dbt';
import { LightdashDbtMetric, LightdashQuery } from './lightdash';
import { MetabaseField, MetabaseQuery } from './metabase';

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
  dimensions: MetabaseField[];
  metrics: MetabaseField[];
  context?: string[];
};

export type MetabaseQueryResponse = {
  metabaseQuery: MetabaseQuery;
};

export type CubeQueryRequest = {
  question: string;
  cubes: CubeCube[];
  context?: string[];
};

export type CubeQueryResponse = {
  cubeQuery: CubeQuery;
};

export type Query =
  | LightdashQuery
  | DbtMetricsQueryResponse
  | MetabaseQuery
  | CubeQuery;

export interface RefineQueryRequest<T extends Query> {
  query: T;
  message: string;
  originalQuestion: string;
  dimensions?: LightdashField[] | MetabaseField[] | [];
  metrics?:
    | LightdashField[]
    | DbtMetric[]
    | LightdashDbtMetric[]
    | MetabaseField[];
  cubes?: CubeCube[];
}

export interface RefineQueryResponse<T extends Query> {
  query: T extends DbtQuery
    ? DbtMetricsQueryResponse
    : T extends LightdashQuery
    ? LightdashQuery
    : T extends CubeQuery
    ? CubeQuery
    : MetabaseQuery;
}

export interface SummarizeQueryRequest {
  query: Query;
  question?: string;
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
