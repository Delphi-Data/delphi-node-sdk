import axios, { AxiosError, AxiosInstance } from 'axios';

import { BASE_URL } from '../constants/url';
import type {
  ChatRequest,
  ChatResponse,
  ClassifyMessageRequest,
  ClassifyMessageResponse,
  CubeQueryRequest,
  CubeQueryResponse,
  DbtMetricsQueryRequest,
  DbtMetricsQueryResponse,
  Document,
  ErrorResponse,
  GetAnswerRequest,
  GetAnswerResponse,
  GetValidatedQueryRequest,
  GetValidatedQueryResponse,
  LightdashQueryRequest,
  LightdashQueryResponse,
  LookerQueryRequest,
  LookerQueryResponse,
  MetabaseQueryRequest,
  MetabaseQueryResponse,
  PostValidatedQueryRequest,
  Query,
  RefineQueryRequest,
  RefineQueryResponse,
  SearchEntitiesRequest,
  SearchEntitiesResponse,
  SummarizeQueryRequest,
  SummarizeQueryResponse,
} from '../types/delphi';

export class DelphiError extends Error {
  type = 'DelphiError';
}

type Params = {
  baseURL?: string;
  clientId: string;
  apiKey: string;
};

export class DelphiApi {
  private client: AxiosInstance;

  constructor(params: Params) {
    const { baseURL = BASE_URL, clientId, apiKey } = params;
    this.client = axios.create({
      baseURL,
      headers: {
        'X-CLIENT-ID': clientId,
        'X-API-KEY': apiKey,
      },
      timeout: 120000,
      signal: AbortSignal.timeout(120000),
    });
  }

  private handleError(error: AxiosError): never {
    if (error.response?.data) {
      throw new DelphiError((error.response.data as ErrorResponse).error);
    }
    throw error;
  }

  async generateDbtMetricsQuery(
    request: DbtMetricsQueryRequest
  ): Promise<DbtMetricsQueryResponse> {
    const response = await this.client
      .post<DbtMetricsQueryResponse | ErrorResponse>(
        '/dbt-metrics-query',
        request
      )
      .catch(this.handleError);
    return response.data as DbtMetricsQueryResponse;
  }

  async generateLightdashQuery(
    request: LightdashQueryRequest
  ): Promise<LightdashQueryResponse> {
    const response = await this.client
      .post<LightdashQueryResponse | ErrorResponse>('/lightdash-query', request)
      .catch(this.handleError);
    return response.data as LightdashQueryResponse;
  }

  async generateLookerQuery(
    request: LookerQueryRequest
  ): Promise<LookerQueryResponse> {
    const response = await this.client
      .post<LookerQueryResponse | ErrorResponse>('/looker-query', request)
      .catch(this.handleError);
    return response.data as LookerQueryResponse;
  }

  async generateMetabaseQuery(
    request: MetabaseQueryRequest
  ): Promise<MetabaseQueryResponse> {
    const response = await this.client
      .post<MetabaseQueryResponse | ErrorResponse>('/metabase-query', request)
      .catch(this.handleError);
    return response.data as MetabaseQueryResponse;
  }

  async generateCubeQuery(
    request: CubeQueryRequest
  ): Promise<CubeQueryResponse> {
    const response = await this.client
      .post<CubeQueryResponse | ErrorResponse>('/cube-query', request)
      .catch(this.handleError);
    return response.data as CubeQueryResponse;
  }

  async summarizeQuery(
    request: SummarizeQueryRequest
  ): Promise<SummarizeQueryResponse> {
    const response = await this.client
      .post<SummarizeQueryResponse | ErrorResponse>('/query-summary', request)
      .catch(this.handleError);
    return response.data as SummarizeQueryResponse;
  }

  async refineQuery<T extends Query>(
    request: RefineQueryRequest<T>
  ): Promise<RefineQueryResponse<T>> {
    const response = await this.client
      .post<RefineQueryResponse<T> | ErrorResponse>('/refine-query', request)
      .catch(this.handleError);
    return response.data as RefineQueryResponse<T>;
  }

  async answerFromData(request: GetAnswerRequest): Promise<GetAnswerResponse> {
    const response = await this.client
      .post<GetAnswerResponse | ErrorResponse>('/answer', request)
      .catch(this.handleError);
    return response.data as GetAnswerResponse;
  }

  async searchEntities<T extends Document>(
    request: SearchEntitiesRequest<T>
  ): Promise<SearchEntitiesResponse<T>> {
    const response = await this.client
      .post<SearchEntitiesResponse<T> | ErrorResponse>(
        '/search-entities',
        request
      )
      .catch(this.handleError);
    return response.data as SearchEntitiesResponse<T>;
  }

  async postValidatedQuery(request: PostValidatedQueryRequest): Promise<void> {
    await this.client
      .post<void | ErrorResponse>('/validated-query', request)
      .catch(this.handleError);
  }

  async getValidatedQueries(
    request: GetValidatedQueryRequest
  ): Promise<GetValidatedQueryResponse[]> {
    // urlencode the query params
    const params = new URLSearchParams();
    params.append('question', request.question);
    params.append('type', request.type);
    request.includeSummary &&
      params.append('includeSummary', `${request.includeSummary}`);
    request.limit && params.append('limit', `${request.limit}`);
    const response = await this.client
      .get<GetValidatedQueryResponse[] | ErrorResponse>(
        `/validated-query?${params.toString()}`
      )
      .catch(this.handleError);
    return response.data as GetValidatedQueryResponse[];
  }

  async classifyMessage(
    request: ClassifyMessageRequest
  ): Promise<ClassifyMessageResponse> {
    const response = await this.client
      .post<ClassifyMessageResponse | ErrorResponse>(
        '/classify-message',
        request
      )
      .catch(this.handleError);
    return response.data as ClassifyMessageResponse;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await this.client
      .post<ChatResponse | ErrorResponse>('/chat', request)
      .catch(this.handleError);
    return response.data as ChatResponse;
  }
}
