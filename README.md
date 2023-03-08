# delphi-node-sdk

A NodeJS SDK for the Delphi API

## Usage

1. Install to your project
   `npm install delphi-node-sdk`
   or
   `yarn add delphi-node-sdk`
2. Start using Delphi!

```TypeScript
const delphi = new DelphiApi({
  baseURL: params.apiBaseUrl,
  clientId: params.apiClientId,
  apiKey: params.apiKey,
})

const { dbtMetricsQuery } = await delphi.generateDbtMetricsQuery({
  question,
  jobId,
  metrics,
  serviceToken,
  context,
})

const { lightdashQuery } = await delphi.generateLightdashQuery({
  question,
  dimensions,
  metrics,
  context,
})

const { summary } = await delphi.summarizeQuery({
  query
})

const { answer } = await this.delphi.answerFromData({
  question,
  data,
  context,
})
```
