(() => {
  const { $, $$, copy, store, esc, debounce, tabs } = Prism;
  let codec = store.get("enc:codec", "base64");
  $("#codec").innerHTML = Object.entries(Core.CODECS).map(([k, c]) => `<button data-v="${k}" class="${k === codec ? "on" : ""}">${c.label}</button>`).join("");
  const plain = $("#plain"), enc = $("#enc");
  function fromPlain() {
    const r = Core.run(codec, "enc", plain.value); enc.value = r.ok ? r.value : ""; $("#err").textContent = ""; meta(); hashes();
  }
  function fromEnc() {
    const d = Core.detect(enc.value); $("#detect").className = "pill " + (d ? "acc" : ""); $("#detect").textContent = d ? `Looks like ${Core.CODECS[d].label}` : "";
    if (!enc.value) { plain.value = ""; $("#err").textContent = ""; return; }
    const r = Core.run(codec, "dec", enc.value);
    if (r.ok) { plain.value = r.value; $("#err").textContent = ""; hashes(); } else $("#err").textContent = r.error;
    meta();
  }
  const meta = () => ($("#len").textContent = `${new TextEncoder().encode(plain.value).length} bytes → ${enc.value.length} chars`);
  const hashes = debounce(async () => {
    const h = await Core.hashes(plain.value);
    $("#hashes").innerHTML = Object.entries(h).map(([a, v]) => `<div class="hs"><b>${a}</b><code>${v}</code><button class="btn small ghost" data-c="${v}">Copy</button></div>`).join("");
  }, 120);
  $("#hashes").onclick = (e) => e.target.dataset.c && copy(e.target.dataset.c);
  tabs($("#codec"), (v) => { codec = v; store.set("enc:codec", v); fromPlain(); });
  plain.addEventListener("input", () => { store.set("enc:plain", plain.value); fromPlain(); });
  enc.addEventListener("input", debounce(fromEnc, 100));
  $("#cpP").onclick = () => copy(plain.value); $("#cpE").onclick = () => copy(enc.value);
  async function handle(f) {
    const buf = new Uint8Array(await f.arrayBuffer());
    const url = `data:${f.type || "application/octet-stream"};base64,${Core.bytesToB64(buf)}`;
    const sha = await Core.hash("SHA-256", buf);
    $("#fileOut").innerHTML = `${f.type.startsWith("image/") ? `<img src="${url}" alt="" />` : ""}<div class="row"><span class="pill acc">${esc(f.name)}</span><span class="pill">${(f.size / 1024).toFixed(1)} KB</span></div><div class="hs"><b>SHA-256</b><code>${sha}</code><button class="btn small ghost" data-c="${sha}">Copy</button></div><textarea readonly>${esc(url)}</textarea><button class="btn small" data-c="">Copy data URL</button>`;
    $("#fileOut").querySelectorAll("[data-c]").forEach((b) => (b.onclick = () => copy(b.dataset.c || url)));
  }
  const drop = $("#drop");
  $("#file").onchange = (e) => e.target.files[0] && handle(e.target.files[0]);
  ["dragover", "dragenter"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("over"); }));
  ["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, () => drop.classList.remove("over")));
  drop.addEventListener("drop", (e) => { e.preventDefault(); e.dataTransfer.files[0] && handle(e.dataTransfer.files[0]); });
  plain.value = store.get("enc:plain", "Prism Protocol ◇ Build. Create. Compete. 🚀");
  fromPlain();
})();
