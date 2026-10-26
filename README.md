<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:F5C561,100:00D2FF&height=200&section=header&text=Prism%20Encode%20Kit&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Base64%20%C2%B7%20URL%20%C2%B7%20Hex%20%C2%B7%20HTML%20%C2%B7%20SHA-256&descAlignY=58&descSize=16" width="100%" alt="Prism Encode Kit" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=F5C561&center=true&vCenter=true&width=680&lines=Base64+that+handles+emoji+%F0%9F%9A%80;Type+on+either+side;SHA-256+of+anything;Drop+a+file+%E2%86%92+data+URL" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-encode-kit/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-encode-kit/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-encode-kit/"><img src="https://img.shields.io/badge/Live_Demo-Open-F5C561?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-F5C561?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-encode-kit?style=for-the-badge&color=00D2FF" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Encode Kit screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" />

## ⚡ Overview

**Prism Encode Kit** is the everyday encoding toolbox. Type on either side and the other updates instantly, in eight formats. It is fully Unicode-safe (emoji and non-Latin scripts work), auto-detects the format you paste, computes SHA hashes with Web Crypto, and converts files into data URLs without uploading them.

## ✨ Features

- **8 codecs**, both directions: Base64, Base64 URL, URL, Hex, HTML entities, Binary, Unicode escape, ROT13
- **Unicode-safe** via UTF-8 TextEncoder/Decoder
- **Auto-detect** the encoding of pasted text
- **SHA-1 / 256 / 384 / 512** hashes, live
- **File → data URL** with SHA-256 checksum and image preview
- Helpful error messages for invalid input

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Encode Kit on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Encode Kit on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-encode-kit/](https://krishyaa06.github.io/prism-encode-kit/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-encode-kit.git
cd prism-encode-kit
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

- Choose a codec tab, then type in **Plain text** to encode or in **Encoded** to decode.
- Hashes update for whatever is in the plain side.
- Drop any file to get its data URL and SHA-256.

## 📁 Project Structure

```
prism-encode-kit/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # UI wiring
│   ├── core.js   # codecs, hashing, detection — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Encode Kit is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00D2FF,50:F5C561,100:07060f&height=110&section=footer" width="100%" />
