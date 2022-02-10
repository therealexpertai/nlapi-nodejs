# nlapi-nodejs
NodeJS client for the expert.ai Natural Language API 

Description:
=
NodeJS Client for the Expert.ai Natural Language API adds Natural Language understanding capabilities to your NodeJS apps.
Natural Language API provides a comprehensive set of natural language understanding capabilities based on Expert.ai technology like document analysis, document classification and information detection.

API capabilities:
=
Make reference to the [Natural Language API](https://docs.expert.ai/nlapi/latest/guide/) and [Studio Local Deployment Agent](https://docs.expert.ai/studio/latest/lda-api/) documentation to know more about the APIs capabilities.

**Functionality of the NodeJS Client:**

- Parametric methods corresponding to main features of the API:
  - [document analysis]((https://docs.expert.ai/nlapi/latest/reference/endpoints/?#document-analysis-resources)) - full analysis and partial/specific analysis of text with custom resources
  - [document classification]((https://docs.expert.ai/nlapi/latest/reference/endpoints/?#document-classification-resources)) - classification text with different taxonomy resources
  - [information detection]((https://docs.expert.ai/nlapi/latest/reference/endpoints/?#information-detection-resources)) - detects text with custom detector resources: pii, writeprint or temporal-information

- Self-documentation methods:
  - [contexts]((https://docs.expert.ai/nlapi/latest/reference/endpoints/?#contexts)) - retrives information about the context that can be used for document analysis
  - [taxonomies]((https://docs.expert.ai/nlapi/latest/reference/endpoints/?#taxonomies)) - retrives the list of the taxonomies that can be used for document classification
  - [category tree for a given taxonomy]((https://docs.expert.ai/nlapi/latest/reference/endpoints/?#taxonomies-child-resources)) - retrives the category tree for a given taxonomy in a given language
  - [detectors]((https://docs.expert.ai/nlapi/latest/reference/endpoints/?#detectors)) - retrives the list of the detectors that can be used for information detection

Getting started:
=
## Installation

  To install the client library with npm, use the command: npm install @expertai/nlapi

## Usage

**Setting your credentials**

  You need an Expert.ai developer account to use the APIs and you can get one for free registering on the [Expert.ai]((https://developer.expert.ai/ui)) developer portal.
  Your developer account credentials must be specified as environment variables on the machine with keys:
```
EAI_USERNAME=YOUR_USERNAME
EAI_PASSWORD=YOUR_PASSWORD
``` 

  Replace ``YOUR_USERNAME`` with the email address you specified during registration and ``YOUR_PASSWORD`` with the actual account password.


**Create the client**

  To use the client in your code import ``NLClient`` class:
```
import {NLClient} from "@expertai/nlapi"
```
  Initialization of the client:
```
let nlClient = new NLClient()
```

**Usage examples**

  To retrieve different types of data from NLAPI, you can call specific methods. Part of the methods have input parameters that contain the text, that we want to analyse and configuration that contains the needed information to call the methods.

***Example for full analysis:***
```
nlClient.analyze("test", {
  language: Language.EN,
  context: "standard"
})
```

Where Language is enum type for all language that can be used in NLAPI.
```
DE = 'de',
EN = 'en',
ES = 'es',
FR = 'fr',
IT = 'it'
```
Text can be analyze with all of this language.
The context for analysis have to be "standard".
The methods return promise with [AnalyzeResponse](https://docs.expert.ai/nlapi/latest/reference/output/full-analysis/?).

***Example for specific analysis:***

```
nlClient.analyze("test", {
  language: Language.EN,
  context: "standard",
  analysis: Analysis.Relations
})
```

Where analysis is enum type with different analysis.
```
Disambiguation = "disambiguation",
Relevants = "relevants",
Entities = "entities",
Sentiment = "sentiment",
Relations = "relations"
```

The methods return promise with [AnalyzeResponse](https://docs.expert.ai/nlapi/latest/reference/output/relation-extraction/?).

***Example for categorize text:***
```
nlClient.categorize("test", {
  taxonomy: "iptc",
  language: Language.EN
})
```

Where taxonomy can be ```"iptc"```, ```"behavioral-traits"```, ```"geotax"```, ```"emotional-traits"```. The methods return promise and the ``geotax`` return [GeoTaxResponse](https://docs.expert.ai/nlapi/latest/guide/classification/geotax/?) with ``extra data``,
``emotional-traits`` return [EmotionalTraitsResponse](https://docs.expert.ai/nlapi/latest/guide/classification/emotional-traits/?) with ``extra data`` and can be call only with ``English`` or ``German`` language.
Other taxonomy returns [CategorizeResponse](https://docs.expert.ai/nlapi/latest/reference/output/classification/?).

***Example for detect:***
```
nlClient.detect("test", {
  language: Language.EN,
  detector: "pii"
})
```

Where detector can be ```"pii"```, ```"writeprint"``` or ```"temporal-information"```. The methods return promise and with ``pii`` we have [PIIResponse](https://docs.expert.ai/nlapi/latest/reference/output/detection/pii/?),
with ``writeprint`` [WriteprintResponse](https://docs.expert.ai/nlapi/latest/reference/output/detection/writeprint/?) and
with ``temporal information`` [TemporalInformationResponse](https://docs.expert.ai/nlapi/latest/reference/output/detection/temporal-information/).

***Example for contexts:***
```
nlClient.context()
```

The methods return promise with [ContextsResponse](https://docs.expert.ai/nlapi/v2/reference/output/self-documentation/?#contexts).

***Example for taxonomies:***
```
nlClient.taxonomies()
```

The methods return promise with [TaxonomiesResponse](https://docs.expert.ai/nlapi/v2/reference/output/self-documentation/?#taxonomies).

***Example for taxonomy:***
```
nlClient.taxonomy({
  taxonomy: "iptc",
  language: Language.EN
})
```

Where taxonomy can be ```"iptc"```, ```"behavioral-traits"```, ```"geotax"```, ```"emotional-traits"```.
The methods return promise with [TaxonomyResponse](https://docs.expert.ai/nlapi/v2/reference/output/self-documentation/?#taxonomies-child-resources).

***Example for detectors:***
```
nlClient.detectors()
```

The methods return promise with [DetectorsResponse](https://docs.expert.ai/nlapi/v2/reference/output/self-documentation/?#detectors).
