import {CategorizerConfig, Language, NLClient} from "../../src";
import successIptcResponse from "../mocks/categorizer/success-iptc-response";
import successGeotaxResponse from "../mocks/categorizer/success-geotax-response";
import successEmotionalTraitsResponse from "../mocks/categorizer/success-emotional-traits-response";
import successTaxonomiesResponse from "../mocks/categorizer/success-taxonomies-response";
import successTexonomyIptcResponse from "../mocks/categorizer/success-texonomy-iptc-response";
import successTaxonomyGeotaxResponse from "../mocks/categorizer/success-taxonomy-geotax-response";
import successTaxonomyEmotionalTraitsResponse from "../mocks/categorizer/success-taxonomy-emotional-traits-response";

describe('Categorize', () => {
    let nlClient: NLClient;

    beforeEach(() => {
        nlClient = new NLClient();
    })

    describe('Categorize resources with basic taxonomy', () => {
        const text = "Michael Jordan was one of the best basketball players of all time. Scoring was Jordan's stand-out skill, but he still holds a defensive NBA record, with eight steals in a half."

        test('should have success response with iptc taxonomy', () => {
            const configuration: CategorizerConfig = {
                taxonomy: "iptc",
                language: Language.EN
            }

            return nlClient.categorize(text, configuration).then((result) => {
                expect(result).toEqual(successIptcResponse);
            })
        })
    })

    describe('Categorize resources with geotax taxonomy', () => {
        const text = "Last year I moved from San Francisco to New York."

        test('should have success response with geotax taxonomy', () => {
            const configuration: CategorizerConfig = {
                taxonomy: "geotax",
                language: Language.EN
            }

            return nlClient.categorize(text, configuration).then((result) => {
                expect(result).toEqual(successGeotaxResponse);
            })
        })
    })

    describe('Categorize resources with emotional traits taxonomy', () => {
        const text = successEmotionalTraitsResponse.data.content

        test('should have success response with emotional traits taxonomy', () => {
            const configuration: CategorizerConfig = {
                taxonomy: "emotional-traits",
                language: Language.EN
            }

            return nlClient.categorize(text, configuration).then((result) => {
                expect(result).toEqual(successEmotionalTraitsResponse);
            })
        })
    })

    describe('Categorize resources with wrong taxonomy', () => {
        const text = "Michael Jordan was one of the best basketball players of all time. Scoring was Jordan's stand-out skill, but he still holds a defensive NBA record, with eight steals in a half."

        test('should failed with wrong taxonomy', () => {
            const configuration: CategorizerConfig = {
                taxonomy: "wrong",
                language: Language.EN
            }

            return nlClient.categorize(text, configuration).catch((error) => {
                expect(error).toEqual(new Error("Request failed with status code 404"));
            })
        })
    })

    describe('List of taxonomies', () => {
        test('should have success taxonomies response', () => {
            return nlClient.taxonomies().then((result) => {
                expect(result).toEqual(successTaxonomiesResponse)
            })
        })
    })

    describe('Category tree for a given taxonomy', () => {
        test('should have success response with iptc taxonomy', () => {
            const configuration: CategorizerConfig = {
                taxonomy: "iptc",
                language: Language.EN
            }

            return nlClient.taxonomy(configuration).then((result) => {
                expect(result).toEqual(successTexonomyIptcResponse);
            })
        })

        test('should have success response with geotax taxonomy', () => {
            const configuration: CategorizerConfig = {
                taxonomy: "geotax",
                language: Language.EN
            }

            return nlClient.taxonomy(configuration).then((result) => {
                expect(result).toEqual(successTaxonomyGeotaxResponse);
            })
        })

        test('should have success response with emotional traits taxonomy', () => {
            const configuration: CategorizerConfig = {
                taxonomy: "emotional-traits",
                language: Language.EN
            }

            return nlClient.taxonomy(configuration).then((result) => {
                expect(result).toEqual(successTaxonomyEmotionalTraitsResponse);
            })
        })
    })
})
