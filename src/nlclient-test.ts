import {Language, NLClient} from './'

let nlClient = new NLClient();

//Document analysis
// nlClient.analyze("test", {
//     language: Language.EN,
//     context: "standard"
// }).then((result: any) => {
//     console.log("Full analysis")
// })
//
// nlClient.analyze("test", {
//     language: Language.EN,
//     context: "standard",
//     analysis: Analysis.Relations
// }).then((result: any) => {
//     console.log("Partial analysis")
//     console.log(result.data)
// })
//
// nlClient.context().then((result: any) => {
//     console.log("Context")
//     console.log(result)
// })

//Document classification
//
// nlClient.categorize("test", {
//     taxonomy: "iptc",
//     language: Language.EN
// }).then((result: any) => {
//     console.log("Categorize")
//     console.log(result.data)
// })
//
// nlClient.categorize("test", {
//     taxonomy: "geotax",
//     language: Language.EN
// }).then((result: any) => {
//     console.log("Geotax")
//     console.log(result.data)
// })
//
// nlClient.categorize("test", {
//     taxonomy: "emotional_traits",
//     language: Language.EN
// }).then((result: any) => {
//     console.log("Emotional traits")
//     console.log(result.data)
// })
//
// nlClient.taxonomy({
//     taxonomy: "iptc",
//     language: Language.EN
// }).then((result: any) => {
//     console.log("Taxonomy")
//     console.log(result.data)
// })
//
// nlClient.taxonomies().then((result: any) => {
//     console.log("Taxonomies")
//     console.log(result)
// })

//Information detection
//
// nlClient.detect("test", {
//     language: Language.EN,
//     detector: "pii"
// }).then((result: any) => {
//     console.log("PII")
//     console.log(result.data)
// })
//
// nlClient.detect("test", {
//     language: Language.EN,
//     detector: "writeprint"
// }).then((result: any) => {
//     console.log("Writeprint")
//     console.log(result.data)
// })
//
// nlClient.detect("test", {
//     language: Language.EN,
//     detector: "temporal-information"
// }).then((result: any) => {
//     console.log("Temporal information")
//     console.log(result.data)
// })
//
nlClient.detectors().then((result: any) => {
    console.log("Detectors")
    console.log(result)
})
