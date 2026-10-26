const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");
const S = "Prism ◇ 🚀 <a href='x'>&</a>";

test("every codec round-trips unicode", () => {
  for (const k of Object.keys(C.CODECS)) {
    const e = C.run(k, "enc", S); assert.equal(e.ok, true, k);
    assert.equal(C.run(k, "dec", e.value).value, S, k);
  }
});
test("known values", () => {
  assert.equal(C.run("base64", "enc", "hello").value, "aGVsbG8=");
  assert.equal(C.run("hex", "enc", "AB").value, "4142");
  assert.equal(C.run("url", "enc", "a b&c").value, "a%20b%26c");
  assert.equal(C.run("rot13", "enc", "Hello").value, "Uryyb");
});
test("decode errors are reported", () => {
  assert.equal(C.run("base64", "dec", "@@@").ok, false);
  assert.equal(C.run("hex", "dec", "zz").ok, false);
});
test("SHA-256 hash", async () => {
  assert.equal(await C.hash("SHA-256", "abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
});
test("auto-detects encodings", () => {
  assert.equal(C.detect("aGVsbG8gd29ybGQ="), "base64");
  assert.equal(C.detect("01000001 01000010"), "binary");
  assert.equal(C.detect("a%20b"), "url");
  assert.equal(C.detect("hello world"), null);
});
