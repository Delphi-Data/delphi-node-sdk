import { AtScaleCube, AtScaleQuery } from './atscale';
import { CubeCube, CubeDimension, CubeQuery } from './cube';
import { DbtMetric, DbtQueryWithSQL } from './dbt';
import { LightdashDbtMetric, LightdashQuery } from './lightdash';
import { LookerField, LookerQuery } from './looker';
import { MetabaseField, MetabaseQuery } from './metabase';
import { PropelMetric, PropelQuery } from './propel';

export type DelphiApiResponse<T extends unknown> =
  | {
      status: 'ok';
      result: T;
    }
  | {
      status: 'error';
      error: string;
    };

export type ConnectionType =
  | 'atScale'
  | 'cube'
  | 'dbtCloud'
  | 'lightdash'
  | 'looker'
  | 'metabase'
  | 'propel';

export type ConnectionPrettyType =
  | 'Mock'
  | 'dbt Cloud'
  | 'Lightdash'
  | 'Looker'
  | 'Metabase'
  | 'Cube'
  | 'AtScale'
  | 'Propel';

export type Catalog =
  | LightdashField[]
  | DbtMetric[]
  | LightdashDbtMetric[]
  | MetabaseField[]
  | CubeDimension[]
  | LookerField[];

export type CatalogItem = Catalog[0];

export type BIEntityType = 'saved_query' | 'dashboard';

export type BIEntity = {
  type: BIEntityType;
  name: string;
  description?: string;
  id: string;
  url: string;
  author?: string;
  imageUrl: string;
  updatedAt?: string;
  views?: number;
};

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
  author: 'delphi' | 'user' | 'function';
};

type QueryRequest = {
  question: string;
  conversation?: Conversation[];
  includeSummary?: boolean;
  notes?: string[];
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

export interface LookerQueryRequest extends QueryRequest {
  dimensions: LookerField[];
  metrics: LookerField[];
}

export interface GetAnswerRequest {
  question: string;
  data: QueryResult;
  conversation?: Conversation[];
  query?: Query | string;
  currency?: string;
}

export type Query =
  | LightdashQuery
  | DbtQueryWithSQL
  | MetabaseQuery
  | CubeQuery
  | LookerQuery
  | AtScaleQuery
  | PropelQuery;

export type QueryResponse<T extends Query> = {
  query:
    | (T & { status: 'ok' })
    | { status: 'clarification_needed'; message: string };
  summary?: string;
};

export type LightdashQueryResponse = QueryResponse<LightdashQuery>;
export type DbtMetricsQueryResponse = QueryResponse<DbtQueryWithSQL>;
export type LookerQueryResponse = QueryResponse<LookerQuery>;
export type AtScaleQueryResponse = QueryResponse<AtScaleQuery>;
export type PropelQueryResponse = QueryResponse<PropelQuery>;

export interface MetabaseQueryRequest extends QueryRequest {
  dimensions: MetabaseField[];
  metrics: MetabaseField[];
}
export type MetabaseQueryResponse = QueryResponse<MetabaseQuery>;

export interface CubeQueryRequest extends QueryRequest {
  cubes: CubeCube[];
}
export type CubeQueryResponse = QueryResponse<CubeQuery>;

export interface AtScaleQueryRequest extends QueryRequest {
  cubes: AtScaleCube[];
}

export interface PropelQueryRequest extends QueryRequest {
  metrics: PropelMetric[];
}

export interface RefineQueryRequest<T extends Query> {
  query: T;
  message: string;
  originalQuestion: string;
  dimensions?: LightdashField[] | MetabaseField[] | LookerField[] | [];
  metrics?:
    | LightdashField[]
    | DbtMetric[]
    | LightdashDbtMetric[]
    | MetabaseField[]
    | LookerField[]
    | PropelMetric[];
  cubes?: AtScaleCube[] | CubeCube[];
  includeSummary?: boolean;
  type?: ConnectionType;
  conversation?: Conversation[];
  notes?: string[];
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

export interface GetChartResponse {
  chart: string;
  url: string;
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

export type GetValidatedQueryRequest = {
  question: string;
  type: ConnectionType;
  includeSummary?: boolean;
  limit?: number;
  minSimilarity?: number;
};

export type GetValidatedQueryResponse = {
  query: Query;
  validatedAt: string | undefined;
  question: string;
  summary?: string;
  askedBy?: string;
  validatedBy?: string;
};

export type PostValidatedQueryRequest = GetValidatedQueryRequest & {
  query: Query;
  validatedBy?: string;
  askedBy?: string;
};

export type MessageClassification =
  | 'general_question'
  | 'edit_previous_query'
  | 'data_pull'
  | 'metric_query'
  | 'data_query'
  | 'question_about_catalog'
  | 'chart_or_graph';

export type ClassifyMessageRequest = {
  message: string;
};

export type ClassifyMessageResponse = {
  classification: MessageClassification;
};

export type ChatRequest = {
  message: string;
  conversation?: Conversation[];
  semanticLayerType?: ConnectionType;
  catalog?: {
    dimensions: Catalog;
    metrics: Catalog;
    cubes?: CubeCube[] | AtScaleCube[];
  };
};

export type ChatResponse = {
  text: string;
};

export type SavedDimension = {
  name: string;
  values: string[];
};

export type ProfileDimensionsRequest = {
  dimensions: SavedDimension[];
  connectionType: ConnectionType;
};

export type ErrorResponse = {
  message: string;
};

export type LanguageModel =
  | 'gpt-4'
  | 'claude-v1'
  | 'palm-2'
  | 'delphi'
  | 'gpt-3.5-turbo';

export type TextToCrontabRequest = {
  text: string;
};

export type TextToCrontabResponse = {
  crontab: string;
};

export type AuthenticateRequest = {
  clientId: string;
  apiKey: string;
};

export enum COORDINATOR_FUNCTIONS {
  PLAN = 'registerPlan',
  SEARCH_CATALOG = 'searchCatalog',
  GET_DATA = 'getData',
  SQL_QUERY = 'runSqlQuery',
  ANSWER_QUESTION = 'answerQuestion',
  GENERATE_CHART = 'generateChart',
  MESSAGE_USER = 'messageUser',
}

export type CoordinatorRequest = {
  message: string;
  conversation?: Conversation[];
  catalog?: {
    dimensions: Catalog;
    metrics: Catalog;
    cubes?: CubeCube[] | AtScaleCube[];
  };
  connectionType: ConnectionType;
  currency?: string;
};

export type CoordinatorResponse = {
  type:
    | 'plan'
    | 'catalog'
    | 'query'
    | 'answer'
    | 'chart'
    | 'message'
    | 'sql'
    | 'error';
  response: string;
  catalog?: {
    dimensions: Catalog;
    metrics: Catalog;
    cubes?: CubeCube[] | AtScaleCube[];
  };
  query?: Query;
  plan?: string;
  answer?: string;
  chart?: string;
  sql?: string;
  name?: string;
  conversation: Conversation[];
};
