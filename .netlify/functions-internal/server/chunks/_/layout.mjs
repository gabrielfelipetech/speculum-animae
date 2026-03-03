import { Buffer } from 'node:buffer';

const DEFAULT_THEME = {
  colors: {
    primary: "#1D4ED8",
    accent: "#D97706",
    text: "#111827",
    muted: "#6B7280",
    border: "#E5E7EB",
    surface: "#F3F4F6",
    coverText: "#FFFFFF",
    coverMuted: "#E5E7EB"
  },
  typography: {
    h1: 25,
    h2: 16,
    h3: 13,
    body: 11.5,
    small: 8
  }
};
function createLayoutState(doc) {
  return {
    contentWidth: doc.page.width - doc.page.margins.left - doc.page.margins.right
  };
}
function ensureSpace(doc, requiredHeight) {
  const available = doc.page.height - doc.page.margins.bottom - doc.y;
  if (available < requiredHeight) {
    doc.addPage();
  }
}
function writeCover(doc, state, title, subtitle, options) {
  const theme = mergeTheme(options == null ? void 0 : options.theme);
  const topBandHeight = 150;
  const left = doc.page.margins.left;
  doc.save();
  doc.rect(0, 0, doc.page.width, topBandHeight).fill(theme.colors.primary);
  doc.restore();
  doc.y = 42;
  doc.font("Helvetica-Bold").fontSize(theme.typography.h1).fillColor(theme.colors.coverText).text(title, left, doc.y, {
    width: state.contentWidth,
    align: "left",
    lineGap: 2
  });
  doc.moveDown(0.2);
  doc.font("Helvetica").fontSize(11.5).fillColor(theme.colors.coverMuted).text(subtitle, {
    width: state.contentWidth,
    align: "left",
    lineGap: 2
  });
  if (options == null ? void 0 : options.badge) {
    doc.moveDown(0.6);
    doc.font("Helvetica-Bold").fontSize(12.5).fillColor(theme.colors.coverText).text(options.badge, {
      width: state.contentWidth,
      align: "left",
      lineGap: 2
    });
  }
  if (options == null ? void 0 : options.summary) {
    doc.moveDown(1);
    doc.font("Helvetica").fontSize(theme.typography.body).fillColor(theme.colors.text).text(options.summary, {
      width: state.contentWidth,
      align: "left",
      lineGap: 4
    });
  }
  doc.moveDown(0.5);
  writeDivider(doc, state, options == null ? void 0 : options.theme);
}
function writeH2(doc, state, text, themeInput) {
  const theme = mergeTheme(themeInput);
  doc.moveDown(0.8);
  ensureSpace(doc, 28);
  doc.font("Helvetica-Bold").fontSize(theme.typography.h2).fillColor(theme.colors.primary).text(text, {
    width: state.contentWidth,
    align: "left",
    lineGap: 2
  });
  doc.moveDown(0.1);
}
function writeH3(doc, state, text, themeInput) {
  const theme = mergeTheme(themeInput);
  doc.moveDown(0.4);
  ensureSpace(doc, 22);
  doc.font("Helvetica-Bold").fontSize(theme.typography.h3).fillColor(theme.colors.primary).text(text, {
    width: state.contentWidth,
    align: "left",
    lineGap: 2
  });
  doc.moveDown(0.1);
}
function writeParagraph(doc, state, text, options) {
  const content = text.trim();
  if (!content) return;
  const theme = mergeTheme(options == null ? void 0 : options.theme);
  const estimatedHeight = doc.heightOfString(content, {
    width: state.contentWidth,
    align: "justify",
    lineGap: 4
  }) + 8;
  ensureSpace(doc, Math.min(estimatedHeight, 260));
  doc.font((options == null ? void 0 : options.italic) ? "Helvetica-Oblique" : "Helvetica").fontSize(theme.typography.body).fillColor(theme.colors.text).text(content, {
    width: state.contentWidth,
    align: "justify",
    lineGap: 4
  });
  doc.moveDown(0.45);
}
function writeBulletList(doc, state, items, themeInput) {
  const theme = mergeTheme(themeInput);
  for (const item of items) {
    const content = `- ${item.trim()}`;
    ensureSpace(doc, 18);
    doc.font("Helvetica").fontSize(theme.typography.body).fillColor(theme.colors.text).text(content, {
      width: state.contentWidth,
      align: "left",
      lineGap: 4
    });
    doc.moveDown(0.15);
  }
}
function writeDivider(doc, state, themeInput) {
  const theme = mergeTheme(themeInput);
  ensureSpace(doc, 18);
  const startX = doc.page.margins.left;
  const y = doc.y + 2;
  const endX = startX + state.contentWidth;
  doc.save().moveTo(startX, y).lineTo(endX, y).lineWidth(0.8).strokeColor(theme.colors.border).stroke().restore();
  doc.y = y + 12;
}
function writeCallout(doc, state, text, options) {
  const content = text.trim();
  if (!content) return;
  const theme = mergeTheme(void 0 );
  const boxPadding = 10;
  const lineGap = 4;
  const textHeight = doc.heightOfString(content, {
    width: state.contentWidth - boxPadding * 2,
    align: "left",
    lineGap
  });
  const boxHeight = textHeight + boxPadding * 2;
  ensureSpace(doc, boxHeight + 12);
  const x = doc.page.margins.left;
  const y = doc.y;
  doc.save();
  doc.rect(x, y, state.contentWidth, boxHeight).fill(theme.colors.surface);
  doc.rect(x, y, state.contentWidth, boxHeight).lineWidth(0.8).strokeColor(theme.colors.border).stroke();
  doc.restore();
  doc.font("Helvetica").fontSize(theme.typography.body).fillColor(theme.colors.text).text(content, x + boxPadding, y + boxPadding, {
    width: state.contentWidth - boxPadding * 2,
    align: "left",
    lineGap
  });
  doc.y = y + boxHeight + 8;
}
function drawHeaderFooter(doc, options) {
  const theme = mergeTheme(options.theme);
  const range = doc.bufferedPageRange();
  for (let offset = 0; offset < range.count; offset += 1) {
    const pageIndex = range.start + offset;
    doc.switchToPage(pageIndex);
    const left = doc.page.margins.left;
    const top = doc.page.margins.top;
    const right = doc.page.margins.right;
    const bottom = doc.page.margins.bottom;
    const width = doc.page.width - left - right;
    doc.save();
    doc.font("Helvetica").fontSize(theme.typography.small).fillColor(theme.colors.muted).text(options.brand, left, top - 24, {
      width,
      align: "left",
      lineBreak: false
    });
    doc.text(`Pagina ${offset + 1}/${range.count}`, left, top - 24, {
      width,
      align: "right",
      lineBreak: false
    });
    doc.moveTo(left, top - 8).lineTo(left + width, top - 8).lineWidth(0.7).strokeColor(theme.colors.border).stroke();
    doc.text(`Session: ${options.sessionId}`, left, doc.page.height - bottom + 14, {
      width,
      align: "right",
      lineBreak: false
    });
    doc.restore();
  }
  const lastPage = range.start + Math.max(0, range.count - 1);
  doc.switchToPage(lastPage);
}
function collectPdfBuffer(doc) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    doc.on("data", (chunk) => {
      chunks.push(Buffer.from(chunk));
    });
    doc.once("end", () => resolve(Buffer.concat(chunks)));
    doc.once("error", reject);
  });
}
function mergeTheme(input) {
  var _a, _b;
  if (!input) return DEFAULT_THEME;
  return {
    colors: {
      ...DEFAULT_THEME.colors,
      ...(_a = input.colors) != null ? _a : {}
    },
    typography: {
      ...DEFAULT_THEME.typography,
      ...(_b = input.typography) != null ? _b : {}
    }
  };
}

export { createLayoutState as a, writeDivider as b, collectPdfBuffer as c, writeH2 as d, writeH3 as e, writeParagraph as f, writeBulletList as g, writeCallout as h, drawHeaderFooter as i, ensureSpace as j, writeCover as w };
//# sourceMappingURL=layout.mjs.map
