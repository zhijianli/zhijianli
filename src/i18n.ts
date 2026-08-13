export type Locale = "zh" | "en";

const STORAGE_KEY = "locale";
const IP_CACHE_KEY = "locale-ip";
const FETCH_TIMEOUT_MS = 2500;

export function readManualLocale(): Locale | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "zh" || saved === "en") return saved;
  } catch {
    /* ignore */
  }
  return null;
}

export function persistLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

function readCachedIpLocale(): Locale | null {
  try {
    const cached = sessionStorage.getItem(IP_CACHE_KEY);
    if (cached === "zh" || cached === "en") return cached;
  } catch {
    /* ignore */
  }
  return null;
}

function cacheIpLocale(locale: Locale) {
  try {
    sessionStorage.setItem(IP_CACHE_KEY, locale);
  } catch {
    /* ignore */
  }
}

/** 首屏同步语言：手动选择 > 本次会话的 IP 结果 > 先用中文，等 IP 回来再校正 */
export function detectLocale(): Locale {
  return readManualLocale() ?? readCachedIpLocale() ?? "zh";
}

function localeFromCountry(raw: string): Locale | null {
  const value = raw.trim();
  if (!value) return null;
  const upper = value.toUpperCase();
  if (upper === "XX" || upper === "T1" || upper === "ZZ") return null;
  if (upper === "CN" || upper === "CHN" || upper === "CHINA" || value === "中国") {
    return "zh";
  }
  return "en";
}

function fetchJson(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { signal: controller.signal })
    .then(async (response) => {
      if (!response.ok) throw new Error(String(response.status));
      return response.json();
    })
    .finally(() => window.clearTimeout(timer));
}

async function fromIpwho(): Promise<Locale> {
  const data = (await fetchJson(
    "https://ipwho.is/?fields=country_code,success"
  )) as { success?: boolean; country_code?: string };
  if (!data?.success) throw new Error("ipwho");
  const locale = localeFromCountry(data.country_code ?? "");
  if (!locale) throw new Error("ipwho empty");
  return locale;
}

async function fromGeojs(): Promise<Locale> {
  const data = (await fetchJson("https://get.geojs.io/v1/ip/country.json")) as {
    country?: string;
  };
  const locale = localeFromCountry(data.country ?? "");
  if (!locale) throw new Error("geojs empty");
  return locale;
}

async function fromIpip(): Promise<Locale> {
  const data = (await fetchJson("https://myip.ipip.net/json")) as {
    ret?: string;
    data?: { location?: string[] };
  };
  if (data.ret !== "ok") throw new Error("ipip");
  const locale = localeFromCountry(data.data?.location?.[0] ?? "");
  if (!locale) throw new Error("ipip empty");
  return locale;
}

let inflight: Promise<Locale | null> | null = null;

async function lookupIpLocale(): Promise<Locale | null> {
  try {
    const locale = await Promise.any([fromIpwho(), fromGeojs(), fromIpip()]);
    cacheIpLocale(locale);
    return locale;
  } catch {
    return null;
  }
}

export function detectLocaleByIp(): Promise<Locale | null> {
  if (!inflight) inflight = lookupIpLocale();
  return inflight;
}
