# Delphi SDK

The Delphi SDK provides an easy-to-use TypeScript interface for interacting with various analytics platforms such as dbt, Lightdash, Looker, Metabase, and Cube.js. It allows you to generate queries, refine them, obtain answers, create charts, search entities, and more.

## Installation

To install the Delphi SDK, use the following command:

```
npm install delphi-node-sdk
```

## Usage

First, import the DelphiApi class from the SDK:

```typescript
import { DelphiApi } from 'delphi-node-sdk';
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

The [DelphiApi class](https://github.com/Delphi-Data/delphi-node-sdk/blob/main/src/client/delphi.ts#L46) provides the following methods.

Please refer to the [types folder](https://github.com/Delphi-Data/delphi-node-sdk/blob/main/src/types/delphi.ts) for details on the request and response objects of each method.

#### **generateDbtMetricsQuery**

```typescript
generateDbtMetricsQuery(request: DbtMetricsQueryRequest): Promise<DbtMetricsQueryResponse>
```

Generates a dbt metrics query based on the provided request.

#### **generateLightdashQuery**

```typescript
generateLightdashQuery(request: LightdashQueryRequest): Promise<LightdashQueryResponse>
```

Generates a Lightdash query based on the provided request.

#### **generateLookerQuery**

```typescript
generateLookerQuery(request: LookerQueryRequest): Promise<LookerQueryResponse>
```

Generates a Looker query based on the provided request.

#### **generateMetabaseQuery**

```typescript
generateMetabaseQuery(request: MetabaseQueryRequest): Promise<MetabaseQueryResponse>
```

Generates a Metabase query based on the provided request.

#### **generateCubeQuery**

```typescript
generateCubeQuery(request: CubeQueryRequest): Promise<CubeQueryResponse>
```

Generates a Cube.js query based on the provided request.

#### **summarizeQuery**

```typescript
summarizeQuery(request: SummarizeQueryRequest): Promise<SummarizeQueryResponse>
```

Summarizes the given query to provide a human-readable summary.

#### **refineQuery**

```typescript
refineQuery<T extends Query>(request: RefineQueryRequest<T>): Promise<RefineQueryResponse<T>>
```

Refines the given query based on the provided request, returning an optimized or more specific query.

#### **answerFromData**

```typescript
answerFromData(request: GetAnswerRequest): Promise<GetAnswerResponse>
```

Retrieves an answer from the data based on the provided request.

#### **chartFromData**

```typescript
chartFromData(request: GetAnswerRequest): Promise<GetChartResponse>
```

Generates a chart from the data based on the provided request.

#### **searchEntities**

```typescript
searchEntities<T extends Document>(request: SearchEntitiesRequest<T>): Promise<SearchEntitiesResponse<T>>
```

Searches for entities in the data based on the provided request, returning a list of matching entities.

#### **postValidatedQuery**

```typescript
postValidatedQuery(request: PostValidatedQueryRequest): Promise<void>
```

Posts a validated query to the API, storing it for future reference.

#### **getValidatedQueries**

```typescript
getValidatedQueries(request: GetValidatedQueryRequest): Promise<GetValidatedQueryResponse[]>
```

Retrieves a list of validated queries based on the provided request.

#### **classifyMessage**

```typescript
classifyMessage(request: ClassifyMessageRequest): Promise<ClassifyMessageResponse>
```

Classifies a given message based on the provided request, returning a classification result.

#### **chat**

```typescript
chat(request: ChatRequest): Promise<ChatResponse>
```

Sends a chat request to the API and returns a chat response.

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

## Development

1. `yarn`
2. `yarn build`
3. `yarn link`
4. (In the projects you are using this, such as the Delphi Frontend or Slack App) `yarn link delphi-node-sdk`
5. After making any changes here, run `yarn build` again so that your applications get your changes
6. Bump the version number in `package.json` before pushing changes.
