// NusaStat charts: small hand-rolled SVG charts (no library).
// Every function takes plain data and returns an SVG string with a
// <title> for accessibility. Colours come from the site palette.

const INK = '#1c2b33';
const MUTED = '#5d6f78';
const GRID = '#dfe6e4';
const TEAL = '#0b6b5e';
const TEAL_LIGHT = '#3aa08f';
const AMBER = '#e8862e';
const RED = '#b3402e';
const BLUE = '#2e6da4';

const PALETTE = [TEAL, AMBER, BLUE, '#7a5ea8', '#4d9b6a', '#c25e7a', '#8a6d3b', '#5b7f95', '#a05a2c', MUTED];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Vertical bar chart. data: [{label, value}]. options: {height, unit, highlightLast}
export function barChart(data, options = {}) {
  const w = options.width || 640;
  const h = options.height || 260;
  const padL = 44, padB = 28, padT = 14, padR = 8;
  const max = Math.max(...data.map((d) => d.value), 0.1);
  const min = Math.min(0, ...data.map((d) => d.value));
  const span = max - min;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const slot = plotW / data.length;
  const barW = Math.min(34, slot * 0.62);
  const y = (v) => padT + plotH * (1 - (v - min) / span);
  const zeroY = y(0);
  let out = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Diagram batang">`;
  out += `<title>Diagram batang</title>`;
  for (let i = 0; i <= 4; i++) {
    const gv = min + (span * i) / 4;
    const gy = y(gv);
    out += `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>`;
    out += `<text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmtAxis(gv)}</text>`;
  }
  out += `<line x1="${padL}" y1="${zeroY}" x2="${w - padR}" y2="${zeroY}" stroke="${MUTED}" stroke-width="1"/>`;
  data.forEach((d, i) => {
    const x = padL + slot * i + (slot - barW) / 2;
    const top = y(Math.max(d.value, 0));
    const bottom = y(Math.min(d.value, 0));
    const isLast = options.highlightLast && i === data.length - 1;
    const color = d.value < 0 ? RED : isLast ? AMBER : TEAL;
    out += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${Math.max(1, bottom - top).toFixed(1)}" rx="2" fill="${color}"><title>${esc(d.label)}: ${d.value}</title></rect>`;
    out += `<text x="${(x + barW / 2).toFixed(1)}" y="${(top - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${fmtValue(d.value)}</text>`;
    out += `<text x="${(x + barW / 2).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(d.label)}</text>`;
  });
  out += '</svg>';
  return out;
}

// Line chart. data: [{label, value}]. options: {height, unit, color}
export function lineChart(data, options = {}) {
  const w = options.width || 640;
  const h = options.height || 260;
  const padL = 44, padB = 28, padT = 16, padR = 14;
  const values = data.map((d) => d.value);
  let max = Math.max(...values);
  let min = Math.min(...values);
  const pad = (max - min) * 0.15 || 1;
  max += pad; min -= pad;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const x = (i) => padL + (plotW * i) / (data.length - 1);
  const y = (v) => padT + plotH * (1 - (v - min) / (max - min));
  let out = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Diagram garis">`;
  out += `<title>Diagram garis</title>`;
  for (let i = 0; i <= 4; i++) {
    const gv = min + ((max - min) * i) / 4;
    const gy = y(gv);
    out += `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>`;
    out += `<text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmtAxis(gv)}</text>`;
  }
  const color = options.color || TEAL;
  const points = data.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  out += `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  data.forEach((d, i) => {
    out += `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"><title>${esc(d.label)}: ${d.value}</title></circle>`;
    if (i === data.length - 1 || i === 0) {
      out += `<text x="${x(i).toFixed(1)}" y="${(y(d.value) - 9).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${fmtValue(d.value)}</text>`;
    }
    out += `<text x="${x(i).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(d.label)}</text>`;
  });
  out += '</svg>';
  return out;
}

// Donut chart with a legend list. data: [{label, value}]
export function donutChart(data, options = {}) {
  const size = options.size || 220;
  const cx = size / 2, cy = size / 2, r = size / 2 - 8, inner = r * 0.62;
  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = -Math.PI / 2;
  let out = `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Diagram lingkaran" width="${size}" height="${size}">`;
  out += `<title>Diagram lingkaran</title>`;
  data.forEach((d, i) => {
    const frac = d.value / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    const color = PALETTE[i % PALETTE.length];
    out += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${color}"><title>${esc(d.label)}: ${d.value}%</title></path>`;
  });
  out += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="${INK}">100%</text>`;
  out += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">dari PDB 2024</text>`;
  out += '</svg><ul class="legend">';
  data.forEach((d, i) => {
    out += `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span>${esc(d.label)} <strong>${fmtValue(d.value)}%</strong></li>`;
  });
  out += '</ul></div>';
  return out;
}

// Horizontal bars: [{label, value, suffix}]. Best for rankings.
export function hbarChart(data, options = {}) {
  const w = options.width || 640;
  const rowH = options.rowHeight || 30;
  const h = data.length * rowH + 8;
  const max = Math.max(...data.map((d) => d.value), 0.1);
  const labelW = options.labelWidth || 150;
  let out = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Diagram batang horizontal">`;
  out += `<title>Diagram batang horizontal</title>`;
  data.forEach((d, i) => {
    const y = i * rowH + 8;
    const barX = labelW;
    const barW = (w - labelW - 64) * (d.value / max);
    const color = options.color || TEAL;
    out += `<text x="${labelW - 8}" y="${y + 15}" text-anchor="end" font-size="12" fill="${INK}">${esc(d.label)}</text>`;
    out += `<rect x="${barX}" y="${y + 4}" width="${Math.max(2, barW).toFixed(1)}" height="14" rx="2" fill="${color}"><title>${esc(d.label)}: ${d.value}</title></rect>`;
    out += `<text x="${(barX + barW + 6).toFixed(1)}" y="${y + 15}" font-size="12" font-weight="600" fill="${INK}">${d.display ?? fmtValue(d.value)}</text>`;
  });
  out += '</svg>';
  return out;
}

function fmtValue(v) {
  return String(v).replace('.', ',');
}

function fmtAxis(v) {
  const abs = Math.abs(v);
  if (abs >= 100) return String(Math.round(v));
  if (abs >= 10) return v.toFixed(1).replace('.', ',');
  return v.toFixed(2).replace('.', ',');
}

export { TEAL, AMBER, RED, BLUE, TEAL_LIGHT };
