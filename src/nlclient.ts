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

/**
 * NLClient - object-oriented class to call NLApi basic methods: analyze, categorize, detect, context, taxonomies, taxonomy, detectors
 *
 * @exports
 * @class NLClient
 */
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

    /**
     * Analyze return full analysis of text or return specific analysis of text with custom resources
     *
     * @summary Analyze
     * @param {string} text The text to be analyzed
     * @param {AnalyzerConfig} configuration Configuration collect placeholders: context, language and optional part analysis type
     * @returns {AnalyzeResponse} Return analysis of the text
     * @memberof NLClient
     */
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

    /**
     * Classification text with different taxonomy resources
     *
     * @summary Classification
     * @param {string} text The text to be classified
     * @param {CategorizerConfig} configuration Configuration collect type taxonomy and language
     * @throws "Unsupported language in emotional traits"
     * @returns {CategorizeResponse | GeoTaxResponse | EmotionalTraitsResponse} Return categorize, geotax or emotional traits classification of the text
     * @memberof NLClient
     */
    public categorize(text: string, configuration: CategorizerConfig): Promise<CategorizeResponse | GeoTaxResponse | EmotionalTraitsResponse> {
        const textToAnalyze = {document: {text: text}}

        if (configuration.taxonomy === "geotax") {
            return this._documentClassification.categorizeGeotaxLanguagePost(configuration.language, "extradata", textToAnalyze)
                .then((response:AxiosResponse<AnalyzeResponse>) => {
                    return response.data
                });

        } else if (configuration.taxonomy === "emotional-traits") {
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

    /**
     * Detect text with custom detector resources: pii, writeprint or temporal-information
     *
     * @summary Detection
     * @param {string} text The text to be detected
     * @param {DetectorConfig} configuration Configuration collect placeholders: detector and language. Detector will be replaced with the name of the detector.
     * @throws "Unsupported detector"
     * @returns {PIIResponse | WriteprintResponse | TemporalInformationResponse} Return pii, writeprint or temporal information detection resources
     * @memberof NLClient
     */
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
                return this._informationDetection.detectDetectorLanguagePost(configuration.detector,configuration.language, textToAnalyze)
                .then((response:AxiosResponse) => {
                    return response.data
                })
        }
    }

    /**
     * Contexts returns information about the context that can be used for document analysis
     *
     * @summary Contexts information
     * @returns {ContextsResponse} Return information about the contexts
     * @memberof NLClient
     */
    public contexts(): Promise<ContextsResponse> {
        return this._documentAnalysis.contextsGet()
            .then((response:AxiosResponse<ContextsResponse>) => {
                return response.data
            })
    }

    /**
     * Taxonomies returns the list of the taxonomies that can be used for document classification
     *
     * @summary Taxonomies information
     * @returns {TaxonomiesResponse} Return the list of the taxonomies
     * @memberof NLClient
     */
    public taxonomies(): Promise<TaxonomiesResponse> {
        return this._documentClassification.taxonomiesGet()
            .then((response:AxiosResponse<TaxonomiesResponse>) => {
                return response.data
            })
    }

    /**
     * Taxonomy returns the category tree for a given taxonomy in a given language
     *
     * @summary Taxonomy tree
     * @param {CategorizerConfig} configuration Configuration collect type taxonomy and language
     * @returns {TaxonomyResponse} Return the category tree for the given taxonomy
     * @memberof NLClient
     */
    public taxonomy(configuration: CategorizerConfig): Promise<TaxonomyResponse> {
        return this._documentClassification.taxonomiesTaxonomyLanguageGet(configuration.taxonomy, configuration.language)
            .then((response:AxiosResponse<TaxonomyResponse>) => {
                return response.data
            })
    }

    /**
     * Detectors returns the list of the detectors that can be used for information detection
     *
     * @summary Detectors information
     * @returns {DetectorsResponse} Return the list of the detectors
     * @memberof NLClient
     */
    public detectors(): Promise<DetectorsResponse> {
        return this._informationDetection.detectorsGet()
            .then((response:AxiosResponse<DetectorsResponse>) => {
                return response.data
            })
    }
}
