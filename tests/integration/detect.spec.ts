import {NLClient, DetectorConfig, Language} from "../../src";
import successPiiResponse from "../mocks/detect/success-pii-response";
import successWriteprintResponse from "../mocks/detect/success-writeprint-response";
import successTemporalInformationResponse from "../mocks/detect/success-temporal-information-response";
import successDetectorsResponse from "../mocks/detect/success-detectors-response";

describe('Detection', () => {
    let nlClient: NLClient;
    const text = "Michael Jordan was one of the best basketball players of all time. Scoring was Jordan's stand-out skill, but he still holds a defensive NBA record, with eight steals in a half."

    beforeEach(() => {
        nlClient = new NLClient();
    })

    describe('Information detection with pii detector', () => {
        test('should have success response with pii detector', () => {
            const configuration: DetectorConfig = {
                detector: "pii",
                language: Language.EN
            }

            return nlClient.detect(text, configuration).then((result) => {
                expect(result).toEqual(successPiiResponse);
            })
        })
    })

    describe('Information detection with writeprint detector', () => {
        test('should have success response with writeprint detector', () => {
            const configuration: DetectorConfig = {
                detector: "writeprint",
                language: Language.EN
            }

            return nlClient.detect(text, configuration).then((result) => {
                expect(result).toEqual(successWriteprintResponse);
            })
        })
    })

    describe('Information detection with temporal-information detector', () => {
        test('should have success response with temporal-information detector', () => {
            const configuration: DetectorConfig = {
                detector: "temporal-information",
                language: Language.EN
            }

            return nlClient.detect(text, configuration).then((result) => {
                expect(result).toEqual(successTemporalInformationResponse);
            })
        })
    })

    describe('List of the detectors', () => {
        test('should have success response with list of the detectors', () => {
            return nlClient.detectors().then((result) => {
                expect(result).toEqual(successDetectorsResponse)
            })
        })
    })
})
