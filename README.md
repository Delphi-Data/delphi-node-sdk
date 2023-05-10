# Delphi SDK

The Delphi SDK provides an easy-to-use TypeScript interface for interacting with various analytics platforms such as dbt, Lightdash, Looker, Metabase, and Cube.js. It allows you to generate queries, refine them, obtain answers, create charts, search entities, and more.

## Installation

To install the Delphi SDK, use the following command:

```
npm install delphi-sdk
```

## Usage

First, import the DelphiApi class from the SDK:

```typescript
import { DelphiApi } from 'delphi-sdk';
```

### Initializing the API client

Create a new instance of the DelphiApi class with your credentials:

```typescript
const delphi = new DelphiApi({
  clientId: 'your-client-id',
  apiKey: 'your-api-key',
});
```

### Error handling

The SDK will throw a DelphiError if there's a problem with the API request. To handle errors, use a try-catch block:

```typescript
try {
  const response = await delphi.someMethod(request);
} catch (error) {
  console.error('An error occurred:', error);
}
```

### Methods

The [DelphiApi class](https://github.com/Delphi-Data/delphi-node-sdk/blob/main/src/client/delphi.ts#L46) provides the following methods:

- `generateDbtMetricsQuery(request: DbtMetricsQueryRequest): Promise<DbtMetricsQueryResponse>`
- `generateLightdashQuery(request: LightdashQueryRequest): Promise<LightdashQueryResponse>`
- `generateLookerQuery(request: LookerQueryRequest): Promise<LookerQueryResponse>`
- `generateMetabaseQuery(request: MetabaseQueryRequest): Promise<MetabaseQueryResponse>`
- `generateCubeQuery(request: CubeQueryRequest): Promise<CubeQueryResponse>`
- `summarizeQuery(request: SummarizeQueryRequest): Promise<SummarizeQueryResponse>`
- `refineQuery(request: RefineQueryRequest<T>): Promise<RefineQueryResponse<T>>`
- `answerFromData(request: GetAnswerRequest): Promise<GetAnswerResponse>`
- `chartFromData(request: GetAnswerRequest): Promise<GetChartResponse>`
- `searchEntities(request: SearchEntitiesRequest<T>): Promise<SearchEntitiesResponse<T>>`
- `postValidatedQuery(request: PostValidatedQueryRequest): Promise<void>`
- `getValidatedQueries(request: GetValidatedQueryRequest): Promise<GetValidatedQueryResponse[]>`
- `classifyMessage(request: ClassifyMessageRequest): Promise<ClassifyMessageResponse>`
- `chat(request: ChatRequest): Promise<ChatResponse>`

Please refer to the API documentation for details on the request and response objects of each method.

## Example

Here's an example of how to generate a Lightdash query:

```typescript
import { DelphiApi, LightdashQueryRequest } from 'delphi-sdk';

const delphi = new DelphiApi({
  clientId: 'your-client-id',
  apiKey: 'your-api-key',
});

async function generateQuery() {
  const request: LightdashQueryRequest = {
    // Your request data here
  };

  try {
    const response = await delphi.generateLightdashQuery(request);
    console.log('Generated Lightdash query:', response);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

generateQuery();
```

Make sure to replace 'your-client-id' and 'your-api-key' with your actual credentials, and fill in the request object with the required data.
