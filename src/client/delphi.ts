import axios, { AxiosInstance } from 'axios';

import { BASE_URL } from '../constants/url';
import { DbtQuery } from '../types/dbt';
import type {
  DbtMetricsQueryRequest,
  DbtMetricsQueryResponse,
  Document,
  ErrorResponse,
  GetAnswerRequest,
  GetAnswerResponse,
  LightdashQueryRequest,
  LightdashQueryResponse,
  RefineQueryRequest,
  RefineQueryResponse,
  SearchEntitiesRequest,
  SearchEntitiesResponse,
  SummarizeQueryRequest,
  SummarizeQueryResponse,
} from '../types/delphi';
import { LightdashQuery } from '../types/lightdash';

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
    });
  }

  private handleError(error?: ErrorResponse['error']) {
    if (error) {
      throw new DelphiError(error);
    }
  }

  async generateDbtMetricsQuery(
    request: DbtMetricsQueryRequest
  ): Promise<DbtMetricsQueryResponse> {
    const response = await this.client.post<
      DbtMetricsQueryResponse | ErrorResponse
    >('/dbt-metrics-query', request);
    this.handleError((response.data as ErrorResponse).error);
    return response.data as DbtMetricsQueryResponse;
  }

  async generateLightdashQuery(
    request: LightdashQueryRequest
  ): Promise<LightdashQueryResponse> {
    const response = await this.client.post<
      LightdashQueryResponse | ErrorResponse
    >('/lightdash-query', request);
    this.handleError((response.data as ErrorResponse).error);
    return response.data as LightdashQueryResponse;
  }

  async summarizeQuery(
    request: SummarizeQueryRequest
  ): Promise<SummarizeQueryResponse> {
    const response = await this.client.post<
      SummarizeQueryResponse | ErrorResponse
    >('/query-summary', request);
    this.handleError((response.data as ErrorResponse).error);
    return response.data as SummarizeQueryResponse;
  }

  async refineQuery<T extends LightdashQuery | DbtQuery>(
    request: RefineQueryRequest<T>
  ): Promise<RefineQueryResponse<T>> {
    const response = await this.client.post<
      RefineQueryResponse<T> | ErrorResponse
    >('/refine-query', request);
    this.handleError((response.data as ErrorResponse).error);
    return response.data as RefineQueryResponse<T>;
  }

  async answerFromData(request: GetAnswerRequest): Promise<GetAnswerResponse> {
    const response = await this.client.post<GetAnswerResponse | ErrorResponse>(
      '/answer',
      request
    );
    this.handleError((response.data as ErrorResponse).error);
    return response.data as GetAnswerResponse;
  }

  async searchEntities<T extends Document>(
    request: SearchEntitiesRequest<T>
  ): Promise<SearchEntitiesResponse<T>> {
    const response = await this.client.post<
      SearchEntitiesResponse<T> | ErrorResponse
    >('/search-entities', request);
    this.handleError((response.data as ErrorResponse).error);
    return response.data as SearchEntitiesResponse<T>;
  }
}
