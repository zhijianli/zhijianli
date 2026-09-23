/** 模糊产品名，用于对外发布的调研报告 */
export function blurProductName(text: string): string {
  return text
    .replace(/Volo 教练产品/g, "AI 教练产品")
    .replace(/volo free-coach/g, "自研 free-coach 模块")
    .replace(/volo Custom LLM/g, "自研 Custom LLM")
    .replace(/volo 人设 prompt/g, "自研人设 prompt")
    .replace(/volo LLM/g, "自研 LLM")
    .replace(/LLM volo/g, "LLM 自研引擎")
    .replace(/⇄ volo/g, "⇄ 自研引擎")
    .replace(/\+ volo \+/g, "+ 自研 LLM +")
    .replace(/\+ volo /g, "+ 自研 LLM ")
    .replace(/走 volo/g, "走自研引擎")
    .replace(/接 volo/g, "接自研引擎")
    .replace(/volo 持上下文/g, "自研引擎持上下文")
    .replace(/volo 外挂/g, "自研引擎外挂")
    .replace(/volo 集成/g, "自研引擎集成")
    .replace(/volo 参照/g, "自研引擎参照")
    .replace(/不含 volo/g, "不含自研 LLM")
    .replace(/volo /g, "自研引擎 ")
    .replace(/ volo/g, " 自研引擎")
    .replace(/Volo/g, "AI 教练产品");
}

/** Blur product name in English blog content */
export function blurProductNameEn(text: string): string {
  return text
    .replace(/Volo coaching product/gi, "AI coaching product")
    .replace(/volo free-coach/gi, "proprietary free-coach module")
    .replace(/volo Custom LLM/gi, "proprietary Custom LLM")
    .replace(/volo persona prompt/gi, "proprietary persona prompt")
    .replace(/volo LLM/gi, "proprietary LLM")
    .replace(/LLM volo/gi, "LLM proprietary engine")
    .replace(/⇄ volo/gi, "⇄ proprietary engine")
    .replace(/\+ volo \+/gi, "+ proprietary LLM +")
    .replace(/\+ volo /gi, "+ proprietary LLM ")
    .replace(/via volo/gi, "via proprietary engine")
    .replace(/with volo/gi, "with proprietary engine")
    .replace(/to volo/gi, "to proprietary engine")
    .replace(/excluding volo/gi, "excluding proprietary LLM")
    .replace(/volo /gi, "proprietary engine ")
    .replace(/ volo/gi, " proprietary engine")
    .replace(/Volo/gi, "AI coaching product");
}
