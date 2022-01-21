import {Analysis, Language, NLClient} from '../../src'
import {
    DocumentAnalysisApi,
    DocumentClassificationApi,
    InformationDetectionApi
} from "../../src/generated-sources/nlapi";
import {
    AnalyzeResponse,
    CategorizeResponse,
    ContextsResponse, DetectorsResponse,
    PIIResponse,
    TaxonomiesResponse,
    TaxonomyResponse,
    TemporalInformationResponse,
    WriteprintResponse
} from "../../src";
import Mocked = jest.Mocked;

jest.mock('../../src/generated-sources/nlapi')

describe('NLClient', () => {
    let client: NLClient
    let mockAnalyzeApi: jest.Mocked<DocumentAnalysisApi>
    let mockCategorizeApi: jest.Mocked<DocumentClassificationApi>
    let mockInformationApi: jest.Mocked<InformationDetectionApi>

    beforeEach(() => {
        mockAnalyzeApi = new DocumentAnalysisApi() as Mocked<DocumentAnalysisApi>
        client = new NLClient();
        client["_documentAnalysis"] = mockAnalyzeApi;

        mockCategorizeApi = new DocumentClassificationApi() as Mocked<DocumentClassificationApi>
        client["_documentClassification"] = mockCategorizeApi

        mockInformationApi = new InformationDetectionApi() as Mocked<InformationDetectionApi>
        client["_informationDetection"] = mockInformationApi
    })

    describe('analyze', () => {
        let result: Promise<AnalyzeResponse>

        const expectedSuccessfulResult =  {
            success: true,
            data: {
                language: "en"
            }
        }

        describe('on full analyze', () => {
            const configuration = { context: 'standard', language: Language.EN}

            beforeEach(() => {
                mockAnalyzeApi.analyzeContextLanguagePost
                    .mockResolvedValue({
                        data: {
                            success: true,
                            data: {
                                language: "en"
                            }
                        },
                        statusText: "SUCCESS"
                    } as any)

                result = client.analyze(
                    "text",
                    configuration
                )
            })
            test('should call analyzeContextLanguagePost', () => {
                expect(mockAnalyzeApi.analyzeContextLanguagePost)
                    .toHaveBeenCalledWith(configuration.context, configuration.language, {document: {text: "text"}})
            })

            test('will return proper result', () => {
                return result.then((result) => {
                    expect(result).toEqual(expectedSuccessfulResult)
                })
            })

            test('should not call analyzeContextLanguageAnalysisPost', () => {
                expect(mockAnalyzeApi.analyzeContextLanguageAnalysisPost).toHaveBeenCalledTimes(0)
            })
        })

        describe('on partial analysis', () => {
            const configuration = { context: 'standard', language: Language.EN, analysis: Analysis.Relations}

            beforeEach(() => {
                mockAnalyzeApi.analyzeContextLanguageAnalysisPost
                    .mockResolvedValue({
                        data: {
                            success: true,
                            data: {
                                language: "en"
                            }
                        },
                        statusText: "SUCCESS"
                    } as any)

                result = client.analyze(
                    "text",
                    configuration
                )
            })

            test('should call analyzeContextLanguageAnalysisPost', () => {
                expect(mockAnalyzeApi.analyzeContextLanguageAnalysisPost)
                    .toHaveBeenCalledWith(configuration.context, configuration.language, configuration.analysis, {document: {text: "text"}})
            })

            test('will return proper result', () => {
                return result.then((result) => {
                    expect(result).toEqual(expectedSuccessfulResult)
                })
            })

            test('should not call analyzeContextLanguagePost', () => {
                expect(mockAnalyzeApi.analyzeContextLanguagePost).toHaveBeenCalledTimes(0)
            })
        })
    })

    describe('categorize', () => {
        let result: Promise<CategorizeResponse>

        const expectedSuccessfulResult =  {
            success: true,
            data: {
                language: "en"
            }
        }

        describe('on geotax categorize', () => {
            const configuration = { taxonomy: "geotax", language: Language.EN}

            beforeEach(() => {
                mockCategorizeApi.categorizeGeotaxLanguagePost
                    .mockResolvedValue({
                        data: {
                            success: true,
                            data: {
                                language: "en"
                            }
                        },
                        statusText: "SUCCESS"
                    } as any)

                result = client.categorize(
                    "text",
                    configuration
                )
            })

            test('should call categorizeGeotaxLanguagePost', () => {
                expect(mockCategorizeApi.categorizeGeotaxLanguagePost)
                    .toHaveBeenCalledWith(configuration.language, "extradata", {document: {text: "text"}})
            })

            test('will return proper result', () => {
                return result.then((result) => {
                    expect(result).toEqual(expectedSuccessfulResult)
                })
            })

            test('should not call categorizeEmotionalTraitsLanguagePost', () => {
                expect(mockCategorizeApi.categorizeEmotionalTraitsLanguagePost).toHaveBeenCalledTimes(0)
            })

            test('should not call categorizeTaxonomyLanguagePost', () => {
                expect(mockCategorizeApi.categorizeTaxonomyLanguagePost).toHaveBeenCalledTimes(0)
            })
        })

        describe('on emotional traits', () => {
            const configuration = { taxonomy: "emotional_traits", language: Language.EN}
            beforeEach(() => {
                mockCategorizeApi.categorizeEmotionalTraitsLanguagePost
                    .mockResolvedValue({
                        data: {
                            success: true,
                            data: {
                                language: "en"
                            }
                        },
                        statusText: "SUCCESS"
                    } as any)

                result = client.categorize(
                    "text",
                    configuration
                )
            })

            test('should call with en or de language', () => {
                expect(configuration.language).toMatch(/en|de/)
            })

            test('should throw exception with not en or de language', () => {
                const wrongConfiguration = {taxonomy: "emotional_traits", language: Language.IT}

                expect(() => {
                    client.categorize("text", wrongConfiguration)
                }).toThrow(new Error("Unsupported language in emotional traits"))
            })

            test('should call categorizeEmotionalTraitsLanguagePost', () => {
                expect(mockCategorizeApi.categorizeEmotionalTraitsLanguagePost)
                    .toHaveBeenCalledWith(configuration.language, "extradata", {document: {text: "text"}})
            })

            test('will return proper result', () => {
                return result.then((result) => {
                    expect(result).toEqual(expectedSuccessfulResult)
                })
            })

            test('should not call categorizeGeotaxLanguagePost', () => {
                expect(mockCategorizeApi.categorizeGeotaxLanguagePost).toHaveBeenCalledTimes(0)
            })

            test('should not call categorizeTaxonomyLanguagePost', () => {
                expect(mockCategorizeApi.categorizeTaxonomyLanguagePost).toHaveBeenCalledTimes(0)
            })
        })

        describe('on categorize', () => {
            const configuration = { taxonomy: "iptc", language: Language.EN }

            beforeEach(() => {
                mockCategorizeApi.categorizeTaxonomyLanguagePost
                    .mockResolvedValue({
                        data: {
                            success: true,
                            data: {
                                language: "en"
                            }
                        },
                        statusText: "SUCCESS"
                    } as any)

                result = client.categorize(
                    "text",
                    configuration
                )
            })

            test('should call categorizeTaxonomyLanguagePost', () => {
                expect(mockCategorizeApi.categorizeTaxonomyLanguagePost)
                    .toHaveBeenCalledWith( configuration.taxonomy, configuration.language, {document: {text: "text"}})
            })

            test('will return proper result', () => {
                return result.then((result) => {
                    expect(result).toEqual(expectedSuccessfulResult)
                })
            })

            test('should not call categorizeEmotionalTraitsLanguagePost', () => {
                expect(mockCategorizeApi.categorizeEmotionalTraitsLanguagePost).toHaveBeenCalledTimes(0)
            })

            test('should not call categorizeGeotaxLanguagePost', () => {
                expect(mockCategorizeApi.categorizeGeotaxLanguagePost).toHaveBeenCalledTimes(0)
            })
        })
    })

    describe('detect', () => {
        let result: Promise<PIIResponse | WriteprintResponse | TemporalInformationResponse>

        const expectedSuccessfulResult =  {
            success: true,
            data: {
                language: "en"
            }
        }

        describe('on pii detect', () => {
            const configuration = { language: Language.EN, detector: "pii"}

            beforeEach(() => {
                mockInformationApi.detectPiiLanguagePost
                    .mockResolvedValue({
                        data: {
                            success: true,
                            data: {
                                language: "en"
                            }
                        },
                        statusText: "SUCCESS"
                    } as any)

                result = client.detect(
                    "text",
                    configuration
                )
            })

            test('should call detectPiiLanguagePost', () => {
                expect(mockInformationApi.detectPiiLanguagePost)
                    .toHaveBeenCalledWith(configuration.language, {document: {text: "text"}})
            })

            test('will return proper result', () => {
                return result.then((result) => {
                    expect(result).toEqual(expectedSuccessfulResult)
                })
            })

            test('should not call detectTemporalInformationLanguagePost', () => {
                expect(mockInformationApi.detectTemporalInformationLanguagePost).toHaveBeenCalledTimes(0)
            })

            test('should not call categorizeTaxonomyLanguagePost', () => {
                expect(mockInformationApi.detectWriteprintLanguagePost).toHaveBeenCalledTimes(0)
            })

        })

        describe('on writeprint detect', () => {
            const configuration = { language: Language.EN, detector: "writeprint"}

            beforeEach(() => {
                mockInformationApi.detectWriteprintLanguagePost
                    .mockResolvedValue({
                        data: {
                            success: true,
                            data: {
                                language: "en"
                            }
                        },
                        statusText: "SUCCESS"
                    } as any)

                result = client.detect(
                    "text",
                    configuration
                )
            })

            test('should call detectWriteprintLanguagePost', () => {
                expect(mockInformationApi.detectWriteprintLanguagePost)
                    .toHaveBeenCalledWith(configuration.language, {document: {text: "text"}})
            })

            test('will return proper result', () => {
                return result.then((result) => {
                    expect(result).toEqual(expectedSuccessfulResult)
                })
            })

            test('should not call detectTemporalInformationLanguagePost', () => {
                expect(mockInformationApi.detectTemporalInformationLanguagePost).toHaveBeenCalledTimes(0)
            })

            test('should not call detectPiiLanguagePost', () => {
                expect(mockInformationApi.detectPiiLanguagePost).toHaveBeenCalledTimes(0)
            })

        })

        describe('on temporal information detect', () => {
            const configuration = { language: Language.EN, detector: "temporal-information"}

            beforeEach(() => {
                mockInformationApi.detectTemporalInformationLanguagePost
                    .mockResolvedValue({
                        data: {
                            success: true,
                            data: {
                                language: "en"
                            }
                        },
                        statusText: "SUCCESS"
                    } as any)

                result = client.detect(
                    "text",
                    configuration
                )
            })

            test('should call detectTemporalInformationLanguagePost', () => {
                expect(mockInformationApi.detectTemporalInformationLanguagePost)
                    .toHaveBeenCalledWith(configuration.language, {document: {text: "text"}})
            })

            test('will return proper result', () => {
                return result.then((result) => {
                    expect(result).toEqual(expectedSuccessfulResult)
                })
            })

            test('should not call detectPiiLanguagePost', () => {
                expect(mockInformationApi.detectPiiLanguagePost).toHaveBeenCalledTimes(0)
            })

            test('should not call categorizeTaxonomyLanguagePost', () => {
                expect(mockInformationApi.detectWriteprintLanguagePost).toHaveBeenCalledTimes(0)
            })

        })

        describe('unsupported', () => {
            const wrongConfiguration = { language: Language.EN, detector: "wrong"}

            test('should throw exception', () => {
                expect(() => {
                    client.detect("text", wrongConfiguration)
                }).toThrow(new Error("Unsupported detector"))
            })
        })
    })

    describe('context', () => {
        let result: Promise<ContextsResponse>

        const expectedSuccessfulResult =  {
            success: true,
            data: {}
        }
        beforeEach(() => {
            mockAnalyzeApi.contextsGet
                .mockResolvedValue({
                    data: {
                        success: true,
                        data: {}
                    },
                    statusText: "SUCCESS"
                } as any)

            result = client.context()
        })

        test('should call contextsGet', () => {
            expect(mockAnalyzeApi.contextsGet).toHaveBeenCalled()
        })

        test('will return proper result', () => {
            return result.then((result) => {
                expect(result).toEqual(expectedSuccessfulResult)
            })
        })
    })

    describe('taxonomies', () => {
        let result: Promise<TaxonomiesResponse>

        const expectedSuccessfulResult =  {
            success: true,
            data: {}
        }
        beforeEach(() => {
            mockCategorizeApi.taxonomiesGet
                .mockResolvedValue({
                    data: {
                        success: true,
                        data: {}
                    },
                    statusText: "SUCCESS"
                } as any)

            result = client.taxonomies()
        })

        test('should call taxonomiesGet', () => {
            expect(mockCategorizeApi.taxonomiesGet).toHaveBeenCalled()
        })

        test('will return proper result', () => {
            return result.then((result) => {
                expect(result).toEqual(expectedSuccessfulResult)
            })
        })
    })

    describe('taxonomy', () => {
        let result: Promise<TaxonomyResponse>
        const configuration = {taxonomy: "iptc", language: Language.EN}

        const expectedSuccessfulResult =  {
            success: true,
            data: {}
        }
        beforeEach(() => {
            mockCategorizeApi.taxonomiesTaxonomyLanguageGet
                .mockResolvedValue({
                    data: {
                        success: true,
                        data: {}
                    },
                    statusText: "SUCCESS"
                } as any)

            result = client.taxonomy(configuration)
        })

        test('should call taxonomiesTaxonomyLanguageGet', () => {
            expect(mockCategorizeApi.taxonomiesTaxonomyLanguageGet).toHaveBeenCalledWith("iptc", Language.EN)
        })

        test('will return proper result', () => {
            return result.then((result) => {
                expect(result).toEqual(expectedSuccessfulResult)
            })
        })
    })

    describe('detectors', () => {
        let result: Promise<DetectorsResponse>

        const expectedSuccessfulResult =  {
            success: true,
            data: {}
        }

        beforeEach(() => {
            mockInformationApi.detectorsGet
                .mockResolvedValue({
                    data: {
                        success: true,
                        data: {}
                    },
                    statusText: "SUCCESS"
                } as any)

            result = client.detectors()
        })

        test('should call detectorsGet', () => {
            expect(mockInformationApi.detectorsGet).toHaveBeenCalled()
        })

        test('will return proper result', () => {
            return result.then((result) => {
                expect(result).toEqual(expectedSuccessfulResult)
            })
        })
    })
})
