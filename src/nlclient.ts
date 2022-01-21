import {
    AnalyzeResponse,
    CategorizeResponse,
    Configuration,
    ContextsResponse,
    DetectorsResponse,
    DocumentAnalysisApi,
    DocumentClassificationApi,
    EmotionalTraitsResponse,
    GeoTaxResponse,
    InformationDetectionApi,
    PIIResponse,
    TaxonomiesResponse,
    TaxonomyResponse,
    TemporalInformationResponse,
    WriteprintResponse
} from "./generated-sources/nlapi";
import {AnalyzerConfig, CategorizerConfig, DetectorConfig, Language} from "./interfaces";
import {AxiosResponse} from "axios";
import {Authentication} from "./authentication";

export class NLClient{
    private _documentAnalysis: DocumentAnalysisApi
    private _documentClassification: DocumentClassificationApi
    private _informationDetection: InformationDetectionApi
    private _userAuthentication: Authentication

    constructor() {
        this._userAuthentication = new Authentication()

        const config = new Configuration({
            accessToken: () => this._userAuthentication.getAccessToken()
        })

        this._documentAnalysis = new DocumentAnalysisApi(config)
        this._documentClassification = new DocumentClassificationApi(config)
        this._informationDetection = new InformationDetectionApi(config)
    }

    public analyze(text: string, configuration: AnalyzerConfig): Promise<AnalyzeResponse> {
        const textToAnalyze = {document: {text: text}}

        if(!configuration.analysis) {
            return this._documentAnalysis.analyzeContextLanguagePost(configuration.context, configuration.language, textToAnalyze)
                .then((response: AxiosResponse<AnalyzeResponse>) => {
                    return response.data
                });
        }

        return this._documentAnalysis.analyzeContextLanguageAnalysisPost(configuration.context, configuration.language, configuration.analysis, textToAnalyze)
            .then((response: AxiosResponse<AnalyzeResponse>) => {
                return response.data
            });
    }

    public categorize(text: string, configuration: CategorizerConfig): Promise<CategorizeResponse | GeoTaxResponse | EmotionalTraitsResponse> {
        const textToAnalyze = {document: {text: text}}

        if (configuration.taxonomy === "geotax") {
            return this._documentClassification.categorizeGeotaxLanguagePost(configuration.language, "extradata", textToAnalyze)
                .then((response:AxiosResponse<AnalyzeResponse>) => {
                    return response.data
                });

        } else if (configuration.taxonomy === "emotional_traits") {
            if(configuration.language === Language.EN || configuration.language === Language.DE) {
                return this._documentClassification.categorizeEmotionalTraitsLanguagePost(configuration.language, "extradata", textToAnalyze)
                    .then((response:AxiosResponse<AnalyzeResponse>) => {
                        return response.data
                    });
            }
            throw new Error("Unsupported language in emotional traits")
        }

        return this._documentClassification.categorizeTaxonomyLanguagePost(configuration.taxonomy, configuration.language, textToAnalyze)
            .then((response:AxiosResponse<AnalyzeResponse>) => {
                return response.data
            });
    }

    public detect(text: string, configuration: DetectorConfig): Promise< PIIResponse | WriteprintResponse | TemporalInformationResponse > {
        const textToAnalyze = {document: {text: text}}

        switch (configuration.detector) {
            case "pii": {
                return this._informationDetection.detectPiiLanguagePost(configuration.language, textToAnalyze)
                    .then((response:AxiosResponse<PIIResponse>) => {
                        return response.data
                    })
            }
            case "writeprint": {
                return this._informationDetection.detectWriteprintLanguagePost(configuration.language, textToAnalyze)
                    .then((response:AxiosResponse) => {
                        return response.data
                    })
            }
            case "temporal-information": {
                return this._informationDetection.detectTemporalInformationLanguagePost(configuration.language, textToAnalyze)
                    .then((response:AxiosResponse) => {
                        return response.data
                    })
            }
            default:
                throw new Error("Unsupported detector")
        }
    }

    public context(): Promise<ContextsResponse> {
        return this._documentAnalysis.contextsGet()
            .then((response:AxiosResponse<ContextsResponse>) => {
                return response.data
            })
    }

    public taxonomies(): Promise<TaxonomiesResponse> {
        return this._documentClassification.taxonomiesGet()
            .then((response:AxiosResponse<TaxonomiesResponse>) => {
                return response.data
            })
    }

    public taxonomy(configuration: CategorizerConfig): Promise<TaxonomyResponse> {
        return this._documentClassification.taxonomiesTaxonomyLanguageGet(configuration.taxonomy, configuration.language)
            .then((response:AxiosResponse<TaxonomyResponse>) => {
                return response.data
            })
    }

    public detectors(): Promise<DetectorsResponse> {
        return this._informationDetection.detectorsGet()
            .then((response:AxiosResponse<DetectorsResponse>) => {
                return response.data
            })
    }
}
