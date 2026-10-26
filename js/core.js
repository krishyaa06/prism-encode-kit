/* Prism Encode Kit · core logic (browser + Node) */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  const te = new TextEncoder(), td = new TextDecoder("utf-8", { fatal: true });
  const subtle = () => (globalThis.crypto && globalThis.crypto.subtle) || require("crypto").webcrypto.subtle;
  const bytesToB64 = (bytes) => { let s = ""; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s); };
  const b64ToBytes = (b) => { const s = atob(b.replace(/\s+/g, "")); return Uint8Array.from(s, (c) => c.charCodeAt(0)); };
  const toHex = (bytes) => [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  const ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const CODECS = {
    base64: { label: "Base64", enc: (s) => bytesToB64(te.encode(s)), dec: (s) => td.decode(b64ToBytes(s)) },
    base64url: { label: "Base64 URL", enc: (s) => bytesToB64(te.encode(s)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), dec: (s) => { s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "="; return td.decode(b64ToBytes(s)); } },
    url: { label: "URL", enc: (s) => encodeURIComponent(s), dec: (s) => decodeURIComponent(s.replace(/\+/g, " ")) },
    hex: { label: "Hex", enc: (s) => toHex(te.encode(s)), dec: (s) => { const h = s.replace(/^0x|\s+/gi, ""); if (!/^([0-9a-f]{2})*$/i.test(h)) throw new Error("Hex must be pairs of 0-9 / a-f"); return td.decode(Uint8Array.from(h.match(/../g) || [], (x) => parseInt(x, 16))); } },
    html: { label: "HTML entities", enc: (s) => s.replace(/[&<>"']/g, (c) => ENTITIES[c]).replace(/[\u00a0-\uffff]/g, (c) => `&#${c.charCodeAt(0)};`), dec: (s) => s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp|#39);/gi, (m, e) => e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : +e.slice(1)) : { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0" }[e.toLowerCase()]) },
    binary: { label: "Binary", enc: (s) => [...te.encode(s)].map((b) => b.toString(2).padStart(8, "0")).join(" "), dec: (s) => { const p = s.trim().split(/\s+/); if (!p.every((x) => /^[01]{1,8}$/.test(x))) throw new Error("Binary must be groups of 0/1"); return td.decode(Uint8Array.from(p, (x) => parseInt(x, 2))); } },
    unicode: { label: "Unicode escape", enc: (s) => [...s].map((c) => { const cp = c.codePointAt(0); return cp < 128 ? c : cp > 0xffff ? `\\u{${cp.toString(16)}}` : "\\u" + cp.toString(16).padStart(4, "0"); }).join(""), dec: (s) => s.replace(/\\u\{([0-9a-f]+)\}|\\u([0-9a-f]{4})/gi, (_, a, b) => String.fromCodePoint(parseInt(a || b, 16))) },
    rot13: { label: "ROT13", enc: (s) => s.replace(/[a-z]/gi, (c) => String.fromCharCode((c <= "Z" ? 65 : 97) + ((c.charCodeAt(0) - (c <= "Z" ? 65 : 97) + 13) % 26))), dec: (s) => CODECS.rot13.enc(s) },
  };
  function run(codec, dir, input) {
    try { return { ok: true, value: CODECS[codec][dir](input) }; }
    catch (e) { return { ok: false, error: dir === "dec" ? `Not valid ${CODECS[codec].label}: ${e.message.replace(/^.*?: /, "")}` : e.message }; }
  }
  async function hash(algo, input) {
    const data = typeof input === "string" ? te.encode(input) : input;
    return toHex(new Uint8Array(await subtle().digest(algo, data)));
  }
  async function hashes(input) {
    const out = {};
    for (const a of ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]) out[a] = await hash(a, input);
    return out;
  }
  function detect(s) {
    s = s.trim();
    if (!s) return null;
    if (/^([01]{8}\s)*[01]{8}$/.test(s)) return "binary";
    if (/^(0x)?([0-9a-f]{2}){4,}$/i.test(s)) return "hex";
    if (/%[0-9a-f]{2}/i.test(s) && !/\s/.test(s)) return "url";
    if (/&(#\d+|#x[0-9a-f]+|amp|lt|gt|quot);/i.test(s)) return "html";
    if (/\\u[0-9a-f]{4}|\\u\{/i.test(s)) return "unicode";
    if (s.length >= 8 && /^[A-Za-z0-9_-]+$/.test(s) && /[-_]/.test(s)) return "base64url";
    if (s.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(s) && s.length >= 8) return "base64";
    return null;
  }
  return { CODECS, run, hash, hashes, detect, bytesToB64, toHex };
});
