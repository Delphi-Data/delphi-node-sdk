import { CubeCube, CubeQuery } from './cube';
import { DbtMetric, DbtQuery, DbtQueryWithSQL } from './dbt';
import { LightdashDbtMetric, LightdashQuery } from './lightdash';
import { MetabaseField, MetabaseQuery } from './metabase';

export type DataServiceType =
  | 'mock'
  | 'dbt_cloud'
  | 'lightdash'
  | 'metabase'
  | 'cubejs';

export type LightdashField = {
  name: string;
  label?: string;
  description?: string;
  explore: string;
  table: string;
};

export type QueryResult = Record<
  string,
  string | number | Date | boolean | JSON
>[];

export type Conversation = {
  text: string;
  author: 'delphi' | 'user';
};

type QueryRequest = {
  question: string;
  conversation?: Conversation[];
  includeSummary?: boolean;
};

export interface DbtMetricsQueryRequest extends QueryRequest {
  jobId?: string;
  serviceToken?: string;
  metrics?: Record<string, string | string[]>[];
}

export interface LightdashQueryRequest extends QueryRequest {
  dimensions: LightdashField[];
  metrics: LightdashField[];
}

export interface GetAnswerRequest {
  question: string;
  data: QueryResult;
  context?: string[];
  query?: string | LightdashQuery;
}

export type Query =
  | LightdashQuery
  | DbtQueryWithSQL
  | MetabaseQuery
  | CubeQuery;

export type QueryResponse<T extends Query> = {
  query: T;
  summary?: string;
};

export type LightdashQueryResponse = QueryResponse<LightdashQuery>;

export type DbtMetricsQueryResponse = QueryResponse<DbtQueryWithSQL>;

export interface MetabaseQueryRequest extends QueryRequest {
  dimensions: MetabaseField[];
  metrics: MetabaseField[];
}
export type MetabaseQueryResponse = QueryResponse<MetabaseQuery>;

export interface CubeQueryRequest extends QueryRequest {
  cubes: CubeCube[];
}
export type CubeQueryResponse = QueryResponse<CubeQuery>;

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
  includeSummary?: boolean;
  type?: DataServiceType;
  conversation?: Conversation[];
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
