import {Analysis, AnalyzerConfig, Language, NLClient} from "../../src";
import successResponseEN from "../mocks/analyze/success-response-en";
import successResponseIt from "../mocks/analyze/success-response-it";
import successDisambiguationResponse from "../mocks/analyze/success-disambiguation-response";
import successRelevantsResponse from "../mocks/analyze/success-relevants-response";
import successEntitiesResponse from "../mocks/analyze/success-entities-response";
import successRelationsResponse from "../mocks/analyze/success-relations-response";
import successSentimentResponse from "../mocks/analyze/success-sentiment-response";
import successResponseEs from "../mocks/analyze/success-response-es";
import successResponseFr from "../mocks/analyze/success-response-fr";
import successResponseDe from "../mocks/analyze/success-response-de";
import successContextResponse from "../mocks/analyze/success-context-response";

describe('Analyze', () => {
    let nlClient: NLClient;
    const text = "Michael Jordan was one of the best basketball players of all time. Scoring was Jordan's stand-out skill, but he still holds a defensive NBA record, with eight steals in a half."

    beforeEach(() => {
        nlClient = new NLClient();
    })

    describe('Full Analyze of text', () => {
        describe('Success Full Analyze of text', () => {

            test('should have successful full response with english language', () => {
                const configuration: AnalyzerConfig = {
                    context: "standard",
                    language: Language.EN
                }
                return nlClient.analyze(text, configuration).then((result) => {
                    expect(result).toEqual(successResponseEN);
                })
            })

            test('should have successful full response with italian language', () => {
                const text = "Roma, lunedì 3 maggio 2021 Nella giornata di ieri il Ministero della cultura ha reso noto che Milan Ingegneria S.p.A. si è aggiudicata il bando per la progettazione e realizzazione di un nuovo piano di calpestio per il Colosseo di Roma."
                const configuration: AnalyzerConfig = {
                    context: "standard",
                    language: Language.IT
                }
                return nlClient.analyze(text, configuration).then((result) => {
                    expect(result).toEqual(successResponseIt);
                })
            })

            test('should have successful full response with spanish language', () => {
                const text = "8 de mayo de 2021 Mapa de fragmentos del cohete chino. El cohete chino Long March 5B (Larga Marcha 5B, traducido al español) cayó en el océano Índico cerca de India y África, al oeste del archipiélago de las Maldivas"
                const configuration: AnalyzerConfig = {
                    context: "standard",
                    language: Language.ES
                }
                return nlClient.analyze(text, configuration).then((result) => {
                    expect(result).toEqual(successResponseEs);
                })
            })

            test('should have successful full response with french language', () => {
                const text = "La même année, elle devient membre du jury du prix Médicis."
                const configuration: AnalyzerConfig = {
                    context: "standard",
                    language: Language.FR
                }
                return nlClient.analyze(text, configuration).then((result) => {
                    expect(result).toEqual(successResponseFr);
                })
            })

            test('should have successful full response with german language', () => {
                const text = "An Bord der Flugzeugs waren nach Behördenangaben 62 Personen, darunter zwölf Besatzungsmitglieder und sieben Kinder."
                const configuration: AnalyzerConfig = {
                    context: "standard",
                    language: Language.DE
                }
                return nlClient.analyze(text, configuration).then((result) => {
                    expect(result).toEqual(successResponseDe);
                })
            })

        });

        describe('Failed with wrong configuration', () => {
            test('should have failed with wrong context', () => {
                return nlClient.analyze(text, { context: "standart", language: Language.EN}).catch((error) => {
                    expect(error).toEqual(new Error("Request failed with status code 404"));
                })
            })
        })
    })

    describe('Partial Analyze of text', () => {
        describe('Deep linguistic analysis', () => {

            test('should have successful disambiguation response with english language', () => {
                const text = "Michael Jordan was one of the best basketball players of all time. Scoring was Jordan's stand-out skill, but he still holds a defensive NBA record, with eight steals in a half."
                const configuration: AnalyzerConfig = {
                    context: "standard",
                    language: Language.EN,
                    analysis: Analysis.Disambiguation
                }
                return nlClient.analyze(text, configuration).then((result) => {
                    expect(result).toEqual(successDisambiguationResponse);
                })
            })
        })

        describe('Keyphrase extraction analysis', () => {

            test('should have successful relevants response with english language', () => {
                const text = "Michael Jordan was one of the best basketball players of all time. Scoring was Jordan's stand-out skill, but he still holds a defensive NBA record, with eight steals in a half."
                const configuration: AnalyzerConfig = {
                    context: "standard",
                    language: Language.EN,
                    analysis: Analysis.Relevants
                }
                return nlClient.analyze(text, configuration).then((result) => {
                    expect(result).toEqual(successRelevantsResponse);
                })
            })
        })

        describe('Named entities recognition analysis', () => {

            test('should have successful entities response with english language', () => {
                const text = "Michael Jordan was one of the best basketball players of all time. Scoring was Jordan's stand-out skill, but he still holds a defensive NBA record, with eight steals in a half."
                const configuration: AnalyzerConfig = {
                    context: "standard",
                    language: Language.EN,
                    analysis: Analysis.Entities
                }
                return nlClient.analyze(text, configuration).then((result) => {
                    expect(result).toEqual(successEntitiesResponse);
                })
            })
        })

        describe('Relation extraction analysis', () => {

            test('should have successful relations response with english language', () => {
                const text = "Michael Jordan was one of the best basketball players of all time. Scoring was Jordan's stand-out skill, but he still holds a defensive NBA record, with eight steals in a half."
                const configuration: AnalyzerConfig = {
                    context: "standard",
                    language: Language.EN,
                    analysis: Analysis.Relations
                }
                return nlClient.analyze(text, configuration).then((result) => {
                    expect(result).toEqual(successRelationsResponse);
                })
            })
        })

        describe('Sentiment analysis', () => {

            test('should have successful sentiment response with english language', () => {
                const text = "Michael Jordan was one of the best basketball players of all time. Scoring was Jordan's stand-out skill, but he still holds a defensive NBA record, with eight steals in a half."
                const configuration: AnalyzerConfig = {
                    context: "standard",
                    language: Language.EN,
                    analysis: Analysis.Sentiment
                }
                return nlClient.analyze(text, configuration).then((result) => {
                    expect(result).toEqual(successSentimentResponse);
                })
            })
        })
    })

    describe('Information about the contexts', () => {
        test('should have successful context response', () => {
            return nlClient.contexts().then((result) => {
                expect(result).toEqual(successContextResponse)
            })
        })
    })
})
