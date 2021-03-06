import {Language} from "./language";
import {Analysis} from "./analysis";

export interface AnalyzerConfig {
    context: string
    language: Language
    analysis?: Analysis
}
