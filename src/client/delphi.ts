import axios, { AxiosInstance } from 'axios';

import { BASE_URL } from '../constants/url';
import type {
  DbtMetricsQueryRequest,
  DbtMetricsQueryResponse,
  ErrorResponse,
  GetAnswerRequest,
  GetAnswerResponse,
  LightdashQueryRequest,
  LightdashQueryResponse,
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

  async answerFromData(request: GetAnswerRequest): Promise<GetAnswerResponse> {
    const response = await this.client.post<GetAnswerResponse | ErrorResponse>(
      '/answer',
      request
    );
    this.handleError((response.data as ErrorResponse).error);
    return response.data as GetAnswerResponse;
  }
}
