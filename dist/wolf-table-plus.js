var Jr = Object.defineProperty;
var m0 = (i) => {
  throw TypeError(i);
};
var es = (i, e, t) => e in i ? Jr(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var w = (i, e, t) => es(i, typeof e != "symbol" ? e + "" : e, t), y0 = (i, e, t) => e.has(i) || m0("Cannot " + t);
var We = (i, e, t) => (y0(i, e, "read from private field"), t ? t.call(i) : e.get(i)), Kt = (i, e, t) => e.has(i) ? m0("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), Gt = (i, e, t, r) => (y0(i, e, "write to private field"), r ? r.call(i, t) : e.set(i, t), t);
const j = "wolf-table";
function Xt(...i) {
  const e = document.createDocumentFragment();
  return i.forEach((t) => {
    let r;
    t instanceof qe ? r = t._ : typeof t == "string" ? r = document.createTextNode(t) : r = t, e.append(r);
  }), e;
}
class qe {
  constructor(e, t) {
    w(this, "_");
    w(this, "_data", /* @__PURE__ */ new Map());
    if (this._ = e instanceof Node ? e : document.createElement(e), t)
      if (typeof t == "string")
        this._.className = t;
      else if (Array.isArray(t))
        this._.className = t.join(" ");
      else
        for (const [r, s] of Object.entries(t))
          s && this._.classList.add(r);
  }
  element() {
    return this._;
  }
  data(e, t) {
    return t ? (this._data.set(e, t), this) : this._data.get(e);
  }
  on(e, t) {
    const [r, ...s] = e.split(".");
    return this._.addEventListener(r, (n) => {
      t(n);
      for (const o of s)
        o === "stop" && n.stopPropagation(), o === "prevent" && n.preventDefault();
    }), this;
  }
  focus() {
    return this._.focus(), this;
  }
  value(e) {
    return e !== void 0 ? (this._.value = e, this) : this._.value;
  }
  textContent(e) {
    return this._.textContent = e, this;
  }
  html(e) {
    return this._.innerHTML = e, this;
  }
  attr(e, t) {
    return t ? (this._.setAttribute(e, t), this) : this._.getAttribute(e);
  }
  addCss(e) {
    this._.classList.add(e);
  }
  removeCss(e) {
    this._.classList.remove(e);
  }
  css(e, t) {
    const { style: r } = this._;
    return t && typeof e == "string" ? (r.setProperty(e, t), this) : typeof e == "string" ? r.getPropertyValue(e) : (Object.keys(e).forEach((s) => {
      let n = e[s];
      typeof n == "number" && (n = `${n}px`), r.setProperty(s, n);
    }), this);
  }
  rect() {
    return this._.getBoundingClientRect();
  }
  offset() {
    const { _: e } = this;
    return {
      x: e.offsetLeft,
      y: e.offsetTop,
      width: e.offsetWidth,
      height: e.offsetHeight
    };
  }
  computedStyle() {
    return window.getComputedStyle(this._);
  }
  show(e = !0) {
    return this.css("display", e ? "block" : "none"), this;
  }
  hide() {
    return this.css("display", "none"), this;
  }
  scrollx(e) {
    const { _: t } = this;
    return e !== void 0 ? (t.scrollLeft = e, this) : t.scrollLeft;
  }
  scrolly(e) {
    const { _: t } = this;
    return e !== void 0 ? (t.scrollTop = e, this) : t.scrollTop;
  }
  after(...e) {
    return this._.after(Xt(...e)), this;
  }
  before(...e) {
    return this._.before(Xt(...e)), this;
  }
  append(...e) {
    return this._.append(Xt(...e)), this;
  }
  remove(...e) {
    e.forEach((t) => {
      (t instanceof qe ? t._ : t).remove();
    });
  }
  cloneNode() {
    return this._.cloneNode(!0);
  }
  get firstChild() {
    const e = this._.firstChild;
    return e ? new qe(e) : null;
  }
}
function N(i, e) {
  return new qe(i, e);
}
function pe() {
  return N("div", `${j}-overlayer-area`);
}
class ts {
  constructor(e) {
    w(this, "_areas");
    w(this, "_headerAreas");
    w(this, "_areaRects", []);
    this._areas = [pe(), pe(), pe(), pe()], this._headerAreas = [pe(), pe(), pe(), pe()], e.append(...this._areas, ...this._headerAreas);
  }
  area(e, t) {
    if (t) {
      this._areaRects[e] = t;
      const { x: r, y: s, height: n, width: o } = t;
      return this._areas[e].css({ left: r, top: s, width: o, height: n }), this;
    }
    return this._areas[e];
  }
  headerArea(e, t) {
    if (t) {
      const { x: r, y: s, height: n, width: o } = t;
      this._headerAreas[e].css({ left: r, top: s, width: o, height: n });
    }
    return this._headerAreas[e];
  }
  inAreas({ x: e, y: t, height: r, width: s }) {
    const n = e + s, o = t + r;
    for (const c of this._areaRects)
      if (e >= 0 && n <= c.width && t >= 0 && o <= c.height)
        return !0;
    return !1;
  }
}
const e0 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function rs(i) {
  return e0.charAt(i % e0.length);
}
function br(i) {
  const e = [];
  for (; i >= 0; )
    e.push(rs(i)), i = Number.parseInt(`${i / e0.length}`, 10) - 1;
  return e.reverse().join("");
}
function ss(i) {
  let e = 0;
  for (let t = 0; t < i.length; t++)
    e = 26 * e + i.charCodeAt(t) - 64;
  return e - 1;
}
function fe(i) {
  let e = "", t = "";
  for (let r = 0; r < i.length; r += 1)
    i.charAt(r) >= "0" && i.charAt(r) <= "9" ? t += i.charAt(r) : e += i.charAt(r).toUpperCase();
  return [ss(e), Number.parseInt(t, 10) - 1];
}
function ie(i, e) {
  return `${br(i)}${e + 1}`;
}
function B0(i, e, t) {
  const [r, s] = fe(i);
  return ie(r + e, s + t);
}
class is {
  constructor(e, t) {
    w(this, "_target");
    w(this, "_ctx");
    w(this, "_scale");
    this.target = e;
    const r = e.getContext("2d");
    if (!r) throw new Error("getContext(2d) is null");
    this._ctx = r, this._scale = t, this._target = e;
  }
  size(e, t) {
    const { _target: r, _scale: s } = this;
    r.style.width = `${e}px`, r.style.height = `${t}px`;
    const n = window.devicePixelRatio;
    return r.width = Math.floor(e * n), r.height = Math.floor(t * n), this._ctx.scale(n * s, n * s), this;
  }
  prop(e, t) {
    return t ? (this._ctx[e] = t, this) : typeof e == "string" ? this._ctx[e] : (Object.entries(e).forEach(([r, s]) => {
      s != null && (this._ctx[r] = s);
    }), this);
  }
  measureTextWidth(e) {
    return this.measureText(e).width;
  }
  // draw line
  line(e, t, r, s) {
    return this.moveTo(e, t).lineTo(r, s).stroke(), this;
  }
  // Drawing rectangles
  clearRect(e, t, r, s) {
    return this._ctx.clearRect(e, t, r, s), this;
  }
  fillRect(e, t, r, s) {
    return this._ctx.fillRect(e, t, r, s), this;
  }
  strokeRect(e, t, r, s) {
    return this._ctx.strokeRect(e, t, r, s), this;
  }
  // Drawing text
  fillText(e, t, r, s) {
    return this._ctx.fillText(e, t, r, s), this;
  }
  strokeText(e, t, r, s) {
    return this._ctx.strokeText(e, t, r, s), this;
  }
  measureText(e) {
    return this._ctx.measureText(e);
  }
  // Line styles
  getLineDash() {
    return this._ctx.getLineDash();
  }
  setLineDash(e) {
    return this._ctx.setLineDash(e), this;
  }
  // Gradients and patterns
  createLinearGradient(e, t, r, s) {
    return this._ctx.createLinearGradient(e, t, r, s);
  }
  createRadialGradient(e, t, r, s, n, o) {
    return this._ctx.createRadialGradient(e, t, r, s, n, o);
  }
  createPattern(e, t) {
    return this._ctx.createPattern(e, t);
  }
  // Paths
  beginPath() {
    return this._ctx.beginPath(), this;
  }
  closePath() {
    return this._ctx.closePath(), this;
  }
  moveTo(e, t) {
    return this._ctx.moveTo(e, t), this;
  }
  lineTo(e, t) {
    return this._ctx.lineTo(e, t), this;
  }
  bezierCurveTo(e, t, r, s, n, o) {
    return this._ctx.bezierCurveTo(e, t, r, s, n, o), this;
  }
  quadraticCurveTo(e, t, r, s) {
    return this._ctx.quadraticCurveTo(e, t, r, s), this;
  }
  arc(e, t, r, s, n, o) {
    return this._ctx.arc(e, t, r, s, n, o), this;
  }
  arcTo(e, t, r, s, n) {
    return this._ctx.arcTo(e, t, r, s, n), this;
  }
  ellipse(e, t, r, s, n, o, c, f) {
    return this._ctx.ellipse(e, t, r, s, n, o, c, f), this;
  }
  rect(e, t, r, s) {
    return this._ctx.rect(e, t, r, s), this;
  }
  roundRect(e, t, r, s, n) {
    return this.beginPath().moveTo(e + n, t).arcTo(e + r, t, e + r, t + s, n).arcTo(e + r, t + s, e, t + s, n).arcTo(e, t + s, e, t, n).arcTo(e, t, e + r, t, n).closePath(), this;
  }
  // Drawing paths
  fill(e) {
    return this._ctx.fill(e), this;
  }
  stroke() {
    return this._ctx.stroke(), this;
  }
  clip(e) {
    return this._ctx.clip(e), this;
  }
  isPointInPath(e, t, r) {
    return this._ctx.isPointInPath(e, t, r);
  }
  isPointInStroke(e, t) {
    return this._ctx.isPointInStroke(e, t);
  }
  // Transformations
  getTransform() {
    return this._ctx.getTransform();
  }
  rotate(e) {
    return this._ctx.rotate(e), this;
  }
  scale(e, t) {
    return this._ctx.scale(e, t), this;
  }
  translate(e, t) {
    return this._ctx.translate(e, t), this;
  }
  setTransform(e, t, r, s, n, o) {
    return this._ctx.setTransform(e, t, r, s, n, o), this;
  }
  // Drawing images
  drawImage(e, t, r) {
    return this._ctx.drawImage(e, t, r), this;
  }
  // Pixel manipulation
  createImageData(e, t) {
    return this._ctx.createImageData(e, t);
  }
  getImageData(e, t, r, s) {
    return this._ctx.getImageData(e, t, r, s);
  }
  putImageData(e, t, r) {
    return this._ctx.putImageData(e, t, r), this;
  }
  // The canvas state
  save() {
    return this._ctx.save(), this;
  }
  restore() {
    return this._ctx.restore(), this;
  }
}
class U {
  /**
   * @param startRow index of row of the start position
   * @param startCol index of col of the start position
   * @param endRow index of row of the end position
   * @param endCol index of col of the end position
   */
  constructor(e, t, r, s) {
    this.startRow = e, this.startCol = t, this.endRow = r, this.endCol = s;
  }
  get start() {
    return [this.startRow, this.startCol];
  }
  get end() {
    return [this.endRow, this.endCol];
  }
  // count of rows contained in this range
  get rows() {
    return this.endRow - this.startRow;
  }
  // count of cols contained in this range
  get cols() {
    return this.endCol - this.startCol;
  }
  get multiple() {
    return this.cols > 0 || this.rows > 0;
  }
  /**
   * check whether or not the row-index contained in the row of range
   * @param {int} index
   * @returns {boolean}
   */
  containsRow(e) {
    return this.startRow <= e && e <= this.endRow;
  }
  /**
   * check whether or not the index contained in the col of range
   * @param {int} index
   * @returns {boolean}
   */
  containsCol(e) {
    return this.startCol <= e && e <= this.endCol;
  }
  /**
   * check whether or not the range contains a cell position(row, col)
   * @param {int} row row-index
   * @param {int} col col-index
   * @returns {boolean}
   */
  contains(e, t) {
    return this.containsRow(e) && this.containsCol(t);
  }
  /**
   * check whether or not the range within the other range
   * @param {Range} other
   * @returns {boolean}
   */
  within(e) {
    return this.startRow >= e.startRow && this.startCol >= e.startCol && this.endRow <= e.endRow && this.endCol <= e.endCol;
  }
  position(e) {
    if (this.startRow <= e.startRow && this.endRow >= e.endRow) {
      if (e.startCol > this.endCol) return "right";
      if (e.endCol < this.startCol) return "left";
    } else if (this.startCol <= e.startCol && this.endCol >= e.endCol) {
      if (e.startRow > this.endRow) return "down";
      if (e.endRow < this.startRow) return "up";
    }
    return "none";
  }
  intersectsRow(e, t) {
    return this.startRow <= t && e <= this.endRow;
  }
  intersectsCol(e, t) {
    return this.startCol <= t && e <= this.endCol;
  }
  /**
   * check whether or not the range intersects the other range
   * @param {Range} other
   * @returns {boolean}
   */
  intersects({ startRow: e, startCol: t, endRow: r, endCol: s }) {
    return this.intersectsCol(t, s) && this.intersectsRow(e, r);
  }
  /**
   * the self intersection the other resulting in the new range
   * @param {Range} other
   * @returns {Range} the new range
   */
  intersection(e) {
    return new U(
      e.startRow < this.startRow ? this.startRow : e.startRow,
      e.startCol < this.startCol ? this.startCol : e.startCol,
      e.endRow > this.endRow ? this.endRow : e.endRow,
      e.endCol > this.endCol ? this.endCol : e.endCol
    );
  }
  /**
   * the self union the other resulting in the new range
   * @param {Range} other
   * @returns {Range} the new range
   */
  union(e) {
    return new U(
      e.startRow < this.startRow ? e.startRow : this.startRow,
      e.startCol < this.startCol ? e.startCol : this.startCol,
      e.endRow > this.endRow ? e.endRow : this.endRow,
      e.endCol > this.endCol ? e.endCol : this.endCol
    );
  }
  // Returns Array<CellRange> that represents that part of this that does not intersect with other
  // difference
  difference(e) {
    const t = [];
    if (!this.intersects(e)) return t;
    const { startRow: r, startCol: s, endRow: n, endCol: o } = this, c = this.intersection(e);
    return [
      new U(r, s, c.startRow - 1, o),
      // top
      new U(c.endRow + 1, s, n, o),
      // bottom
      new U(c.startRow, s, c.endRow, c.startCol - 1),
      // left
      new U(c.startRow, c.endCol + 1, c.endRow, o)
      // right
    ].filter((f) => f.rows >= 0 && f.cols >= 0);
  }
  touches(e) {
    return e.startRow === this.startRow && e.endRow === this.endRow && (e.endCol + 1 === this.startCol || this.endCol + 1 === e.startCol) || e.startCol === this.startCol && e.endCol === this.endCol && (e.endRow + 1 === this.startRow || this.endRow + 1 === this.startCol);
  }
  eachRow(e, t) {
    let { endRow: r } = this;
    t && r > t && (r = t);
    for (let s = this.startRow; s <= r; s += 1)
      e(s);
    return this;
  }
  eachCol(e, t) {
    let { endCol: r } = this;
    t && r > t && (r = t);
    for (let s = this.startCol; s <= r; s += 1)
      e(s);
    return this;
  }
  /**
   * @param {Function} cb (rowIndex, colIndex) => {}
   * @returns this
   */
  each(e) {
    return this.eachRow((t) => {
      this.eachCol((r) => e(t, r));
    }), this;
  }
  clone() {
    return new U(this.startRow, this.startCol, this.endRow, this.endCol);
  }
  toString() {
    let e = ie(this.startCol, this.startRow);
    return this.multiple && (e += `:${ie(this.endCol, this.endRow)}`), e;
  }
  equals(e) {
    return this.startRow === e.startRow && this.startCol === e.startCol && this.endRow === e.endRow && this.endCol === e.endCol;
  }
  static create(e, t, r, s) {
    if (r !== void 0 && s !== void 0) {
      let [n, o, c, f] = [e, t, r, s];
      return e > r && (n = r, c = e), t > s && (o = s, f = t), new U(n, o, c, f);
    }
    return new U(e, t, e, t);
  }
  static with(e) {
    const t = e.split(":"), [r, s] = fe(t[0]);
    if (t.length === 1)
      return this.create(s, r);
    const [n, o] = fe(t[1]);
    return this.create(s, r, o, n);
  }
}
function ns(i, e) {
  i && i.length > 0 && i.forEach((t) => {
    e(U.with(t));
  });
}
class os {
  constructor(e) {
    w(this, "_");
    w(this, "_target", null);
    w(this, "_rect", null);
    w(this, "_oldValue", "");
    w(this, "_value");
    w(this, "_visible", !1);
    w(this, "_moveChanger", () => {
    });
    w(this, "_changer", () => {
    });
    w(this, "storeHistory", () => 0);
    this._ = N("div", e);
  }
  get visible() {
    return this._visible;
  }
  target(e) {
    return e.append(this._), this._target = e, this;
  }
  cellIndex(e, t) {
    return this;
  }
  value(e) {
    return this._value = e, this;
  }
  changed() {
    this._changer(this._value), this.hide();
  }
  rect(e) {
    if (e) {
      this._visible = !0, this._rect = e;
      const { x: t, y: r, width: s, height: n } = e;
      this._.css({
        left: t - 2 / 2,
        top: r - 2 / 2,
        width: s - 2,
        height: n - 2
      }).show();
    }
    return this;
  }
  show(e) {
    return this._oldValue = JSON.stringify(this._value), e !== void 0 && this.value(e), this._.show(), this;
  }
  hide() {
    return JSON.stringify(this._value || "") !== this._oldValue && this._changer(this._value), this._visible = !1, this._oldValue = "", this.value(), this._.hide(), this;
  }
  moveChanger(e) {
    return this._moveChanger = e, this;
  }
  cancel() {
    this._value = JSON.parse(this._oldValue);
  }
  changer(e) {
    return this._changer = e, this;
  }
}
class as {
  constructor() {
    w(this, "_", []);
    w(this, "_indexes", /* @__PURE__ */ new Map());
    w(this, "_formulas", []);
    w(this, "_formulaParser", (e) => e);
    w(this, "_formatter", (e, t, r) => r);
    w(this, "_releasedIndexs", []);
  }
  formulaParser(e) {
    return this._formulaParser = e, this;
  }
  formatter(e) {
    return this._formatter = e, this;
  }
  load({ cells: e }) {
    e && (this._ = e, this.resetIndexes());
  }
  get(e, t) {
    const { _indexes: r } = this;
    if (r.has(e)) {
      const s = r.get(e).get(t);
      return s !== void 0 ? this._[s] : null;
    }
    return null;
  }
  removeValue(e, t) {
    const { _indexes: r } = this;
    if (r.has(e)) {
      const n = r.get(e).get(t);
      n !== void 0 && this._[n] && (typeof this._[n][2] == "object" ? this._[n][2].value = void 0 : this.remove(e, t));
    }
    return this;
  }
  remove(e, t) {
    const { _indexes: r } = this;
    if (r.has(e)) {
      const s = r.get(e), n = s.get(t);
      n !== void 0 && (this._[n] = null, this._releasedIndexs.includes(n) || this._releasedIndexs.push(n), s.delete(t));
    }
    return this;
  }
  set(e, t, r) {
    const s = this.get(e, t);
    if (s == null) {
      if (r != null) {
        const n = this._.push([e, t, r]) - 1;
        this.updateIndex(e, t, n), this.addFormula(r, n);
      }
    } else {
      const n = s[2], o = je(n), c = je(r);
      n instanceof Object ? Object.assign(n, r instanceof Object ? r : { value: r }) : s[2] = r, c !== o && this.resetFormulas();
    }
  }
  setFormat(e, t, r) {
    const s = this.get(e, t), n = s ? s[2] : null;
    n === null ? this.set(e, t, { format: r }) : typeof n == "object" ? this.set(e, t, { ...n, format: r }) : this.set(e, t, { value: n || "", format: r });
  }
  fixed(e, t, r) {
    const s = this.get(e, t), n = s ? s[2] : null;
    let o = 2;
    if ((n == null ? void 0 : n.fixed) !== void 0 && (o = n.fixed, o < 0 && (o = 0)), r)
      typeof r == "number" ? r >= 0 ? o = r : console.warn("fixed can't less than zero") : typeof r == "string" && (r === "increase" ? o++ : r === "reduce" && o > 0 && o--), n === null ? this.set(e, t, { fixed: o }) : typeof n == "object" ? this.set(e, t, { ...n, fixed: o }) : this.set(e, t, { value: n || "", fixed: o });
    else
      return o;
  }
  resetIndexes() {
    const { _: e } = this;
    this._indexes = /* @__PURE__ */ new Map();
    for (const [t, r] of e.entries())
      if (r) {
        const [s, n, o] = r;
        this.updateIndex(s, n, t), this.addFormula(o, t);
      }
  }
  updateIndex(e, t, r) {
    const { _indexes: s } = this;
    s.has(e) || s.set(e, /* @__PURE__ */ new Map()), s.get(e).set(t, r);
  }
  addFormula(e, t) {
    e instanceof Object && e.formula && (e.value = String(this._formulaParser(e.formula)), this._formulas.push(t));
  }
  resetFormulas() {
    this._formulas.forEach((e) => {
      if (this._[e]) {
        const t = this._[e][2];
        t instanceof Object && t.formula && (t.value = String(this._formulaParser(t.formula)));
      }
    });
  }
}
function mr(i) {
  return i instanceof Object ? i.value : i;
}
function je(i) {
  const e = mr(i);
  return `${e ?? ""}`;
}
function yr(i, e, t, r, s) {
  const { scroll: n } = i, o = r === "row" ? 0 : 1, c = r === "row" ? 3 : 2;
  let f = n[c], a = !1;
  const l = n[o];
  let p = 0;
  const { freeze: h } = i;
  if (h && (p = fe(h)[r === "row" ? 1 : 0]), t > 0)
    if (e === "+")
      for (let d = l; !(f >= t); d += 1) {
        const x = s(p + d);
        f += x, i.scroll[o] = d + 1, a = !0;
      }
    else
      for (let d = l; !(f <= t); d -= 1) {
        const x = s(p + d - 1);
        if (f -= x, i.scroll[o] = d - 1, a = !0, x > 0) break;
      }
  else
    i.scroll[o] = 0, f = 0, a = !0;
  return n[c] = f, a;
}
function ls(i, e, t) {
  return e && t !== void 0 ? yr(i, e, t, "col", (r) => De(i, r).width) : i.scroll[2];
}
function cs(i, e, t) {
  return e && t !== void 0 ? yr(i, e, t, "row", (r) => Fe(i, r).height) : i.scroll[3];
}
function E0({ merges: i }, e) {
  if (i) {
    const t = U.with(e);
    for (let r = 0; r < i.length; r += 1)
      if (U.with(i[r]).equals(t))
        return !0;
  }
  return !1;
}
function A0(i, e) {
  const t = U.with(e);
  if (!t.multiple) return;
  i.merges || (i.merges = []);
  const { merges: r } = i;
  r.length <= 0 || r.forEach((s, n) => {
    U.with(s).within(t) && r.splice(n, 1);
  }), r.push(e);
}
function t0({ merges: i }, e) {
  if (i) {
    for (let t = 0; t < i.length; t += 1)
      if (i[t] === e) {
        i.splice(t, 1);
        return;
      }
  }
}
function Br({ merges: i }, e) {
  if (i)
    for (let t = 0; t < i.length; t += 1) {
      const r = U.with(i[t]);
      r.intersects(e) && (e = r.union(e));
    }
  return e;
}
function Er(i, e, t) {
  i.styles || (i.styles = []);
  const r = {};
  t && t._cells._.forEach((s) => {
    if (s) {
      const n = s[2];
      n instanceof Object && n.style !== void 0 && (r[n.style] = !0);
    }
  });
  for (let s = 0; s < i.styles.length; s++)
    if (!r[s])
      return i.styles[s] = e, s;
  return i.styles.push(e) - 1;
}
function hs(i, e, t, r) {
  i.styles[e] = t;
}
function Zt(i, e, t = !0) {
  const r = i.styles[e];
  return t ? Object.assign({}, i.style, i.styles[e] || {}) : r;
}
function fs(i) {
  i.styles.length = 0;
}
function xs(i, e) {
  i.borders || (i.borders = []);
  const t = U.with(e[0]), { borders: r } = i;
  for (let s = 0; s < r.length; s += 1) {
    const [n, ...o] = r[s], c = U.with(n);
    if (c.intersects(t)) {
      c.within(t) ? r.push(e) : (r.push(e), c.difference(t).forEach((f) => {
        r.push([f.toString(), ...o]);
      })), r.splice(s, 1);
      return;
    } else if (o.every((f, a) => f === e[a + 1]) && c.touches(t)) {
      r[s][0] = c.union(t).toString();
      return;
    }
  }
  r.push(e);
}
function ds(i, e) {
  const { borders: t } = i;
  if (t) {
    const r = [], s = U.with(e);
    for (let n = 0; n < t.length; n += 1) {
      const [o, ...c] = t[n], f = U.with(o);
      f.intersects(s) && (f.within(s) || f.difference(s).forEach((a) => {
        r.push([a.toString(), ...c]);
      }), t.splice(n, 1), n -= 1);
    }
    t.push(...r);
  }
}
function us(i) {
  i.borders.length = 0;
}
function Ar(i, e, t) {
  let r = 0;
  for (let s = i; s < e; s += 1) r += t(s);
  return r;
}
function ps(i) {
  return i <= 0.75 ? 1 : i <= 1.5 ? 2 : i <= 2.25 ? 3 : i <= 3 ? 4 : i <= 3.75 ? 5 : i <= 4.5 ? 6 : 96 / 72 * i;
}
function De(i, e, t) {
  const r = i.cols[e] || { width: i.colWidth };
  return t ? i.cols[e] = Object.assign(r, t) : r;
}
function Tt(i, e, t) {
  if (t) {
    const { cols: r } = i;
    r[e] ? r[e].width = t : r[e] = { width: t };
  } else {
    const r = De(i, e);
    return r.hide ? 0 : r.width;
  }
}
function Dr(i, e, t) {
  const { cols: r } = i;
  if (arguments.length === 1) {
    let s = r.len * i.colWidth;
    for (const n in r)
      if (n !== "len") {
        const o = Tt(i, Number.parseInt(n, 10));
        o > 0 && (s += o, s -= i.colWidth);
      }
    return s;
  }
  return Ar(
    e !== void 0 ? e : 0,
    t !== void 0 ? t : r.len,
    (s) => Tt(i, s)
  );
}
function _s(i, e) {
  return i.cols.len - 1 === e;
}
function zt(i, e, t) {
  for (; ; )
    if (De(i, e).hide) e += t;
    else return e;
}
function Fr(i) {
  let e = 0;
  return i.cells.forEach((t) => {
    t && t[1] > e && (e = t[1]);
  }), e;
}
function Fe(i, e, t) {
  const r = i.rows[e] || { height: i.rowHeight };
  return t ? i.rows[e] = Object.assign(r, t) : r;
}
function It(i, e, t, r) {
  if (t) {
    const { rows: s } = i;
    let n = !1;
    if (t !== i.rowHeight && !r && (n = !0), s[e]) {
      if (s[e].autoWrapDisabled && r)
        return;
      s[e].height = t, s[e].autoWrapDisabled = n;
    } else
      s[e] = { height: t, autoWrapDisabled: n };
  } else {
    const s = Fe(i, e);
    return s.hide ? 0 : s.height;
  }
}
function Rr(i, e, t) {
  const { rows: r } = i;
  if (arguments.length === 1) {
    let s = r.len * i.rowHeight;
    for (const n in r)
      if (n !== "len") {
        const o = It(i, Number.parseInt(n, 10));
        o > 0 && (s += o, s -= i.rowHeight);
      }
    return s;
  }
  return Ar(
    e !== void 0 ? e : 0,
    t !== void 0 ? t : r.len,
    (s) => It(i, s)
  );
}
function vs(i, e) {
  return i.rows.len - 1 === e;
}
function Pt(i, e, t) {
  for (; ; )
    if (Fe(i, e).hide) e += t;
    else return e;
}
function Sr(i) {
  let e = 0;
  return i.cells.forEach((t) => {
    t && t[0] > e && (e = t[0]);
  }), e;
}
function gs(i, e, t = !1) {
  if (!i || !e) return;
  const r = i.range.position(e.range);
  if (r === "none") return;
  const { rows: s, cols: n } = i.range;
  e.range.each((o, c) => {
    let f = i.range.startRow, a = i.range.startCol, l, p, h = [o - e.range.startRow, c - e.range.startCol];
    ["up", "left"].includes(r) && (h = [e.range.endRow - o, e.range.endCol - c]), r === "down" || r === "up" ? s <= 0 && t && (l = r, p = h[0] + 1, r === "up" && (p = 0 - p)) : n <= 0 && t && (l = r, p = h[1] + 1, r === "left" && (p = 0 - p));
    const d = h[1] % (n + 1), x = h[0] % (s + 1);
    ["up", "left"].includes(r) ? (f = i.range.endRow - x, a = i.range.endCol - d) : (f += x, a += d), Cs(f, a, o, c, i, e, l, p);
  });
}
function Cs(i, e, t, r, s, n, o, c) {
  const f = s.cells.get(i, e);
  if (f !== null && f[2] !== void 0 && f[2] !== null) {
    let a = f[2];
    if (a instanceof Object) {
      if (a = Object.assign({}, a), a.style !== void 0 && s.cells !== n.cells) {
        const l = Object.assign({}, s.data.styles[a.style]);
        a.style = Er(n.data, l);
      }
      o !== void 0 && c !== void 0 && (a.formula ? a.formula = a.formula.replace(
        /[A-Za-z]{1,3}\d+/g,
        (l) => ["left", "top"].includes(o) ? B0(l, c, 0) : B0(l, 0, c)
      ) : a.value && (ve.use().getRender(ke(a)).disableAutoFillAction || (a.value = String(D0(a.value, c)))));
    } else
      c !== void 0 && (a = D0(a, c));
    n.cells.set(t, r, a);
  } else
    n.cells.remove(i, e);
}
function D0(i, e) {
  return typeof i == "string" ? i.replace(/(\d+$)|((\d+)\D+$)/g, (t) => t.replace(/\d+/, (r) => `${Number.parseInt(r) + e}`)) : i + e;
}
function ws() {
  return {
    rows: {
      len: 100
    },
    cols: {
      len: 26
    },
    rowHeight: 25,
    colWidth: 100,
    scroll: [0, 0, 0, 0],
    style: {
      color: "#333",
      align: "left",
      valign: "middle",
      textwrap: !1,
      bold: !1,
      italic: !1,
      fontFamily: "Arial",
      fontSize: 10,
      underline: !1,
      strikethrough: !1
    },
    styles: [],
    borders: [],
    merges: [],
    cells: []
  };
}
class bs extends os {
  constructor() {
    super(`${j}-editor`);
    w(this, "_text", N("textarea", ""));
    w(this, "_textMeasure", N("div", "measure"));
    w(this, "_editing", !1);
    this._.append(this._text, this._textMeasure), this._text.on("keydown", (t) => {
      ms(this, t);
    }).on("input", (t) => {
      const r = t.target, { value: s } = r;
      this._editing = !0, this._value = s, F0(this);
    });
  }
  value(t) {
    return super.value(t), this._text.value(je(t) || ""), F0(this), this;
  }
  rect(t) {
    return super.rect(t), t && setTimeout(() => {
      const { _value: r } = this;
      let s = 0;
      r !== null && (s = je(r).length);
      const n = this._text.element();
      n.focus(), n.setSelectionRange(s, s);
    }, 0), this;
  }
  hide() {
    return super.hide(), this._editing = !1, this;
  }
}
function F0(i) {
  const { _: e, _value: t, _rect: r, _textMeasure: s, _target: n } = i;
  if (typeof t != "string") return;
  let o = t.replace(`
`, "<br/>");
  if (t.endsWith(`
`) && (o += "T"), s.html(o), r && n) {
    const c = Number.parseInt(s.computedStyle().getPropertyValue("padding")), f = n.offset(), a = f.width - r.x - 2, l = f.height - r.y - 2;
    e.css("max-width", `${a}px`), s.css("max-width", `${a - c * 2}px`);
    const { width: p, height: h } = s.rect(), d = r.width - 2;
    p > d && e.css({ width: p }), h > r.height && h <= l ? e.css({ height: h }) : h < r.height && e.css({ height: r.height - 2 });
  }
}
function ms(i, e) {
  const { code: t, shiftKey: r, metaKey: s, altKey: n, ctrlKey: o, target: c } = e, f = (a) => {
    i.hide(), i._moveChanger(a);
  };
  t === "Enter" || t === "NumpadEnter" ? (n ? (c.value += `
`, i.value(c.value)) : f(r ? "up" : "down"), e.preventDefault()) : t === "Tab" && !o && !s && !n ? (f(r ? "left" : "right"), e.preventDefault()) : t === "Escape" && (i.cancel(), f("none"), e.preventDefault());
}
function ys(i, e, t, r, s) {
  switch (i) {
    case "top":
      return s;
    case "middle": {
      const n = e / 2 - t / 2, o = r / 2 + s;
      return n < o ? o : n;
    }
    case "bottom":
      return e - s - t;
    default:
      return 0;
  }
}
function Bs(i, e, t, r, s, n, o) {
  let c = 0;
  i === "underline" ? t === "top" ? c = -o : t === "middle" && (c = -o / 2) : i === "strikethrough" && (t === "top" ? c = -o / 2 : t === "bottom" && (c = o / 2));
  let f = 0;
  return e === "center" ? f = n / 2 : e === "right" && (f = n), [r - f, s - c, r - f + n, s - c];
}
function Es(i, e, t) {
  switch (i) {
    case "left":
      return t;
    case "center":
      return e / 2;
    case "right":
      return e - t;
    default:
      return 0;
  }
}
function As(i, e, t, r) {
  if (i && e) {
    let s = "";
    return t && (s += "italic "), r && (s += "bold "), `${s} ${e}pt ${i}`;
  }
}
const kr = (i, e, t, r, s, n, o, c) => {
  c || (c = l0(e, r, n));
  const {
    fontSize: f,
    fontFamily: a,
    bold: l,
    italic: p,
    color: h,
    align: d,
    valign: x,
    underline: v,
    strikethrough: _,
    textwrap: b,
    padding: u
  } = r;
  i.save().beginPath().prop({
    textAlign: d,
    textBaseline: x,
    font: As(a, f, p, l),
    fillStyle: h
  });
  const [g, C] = u || [5, 5], m = Es(d, t.width, g), B = c.split(`
`), A = t.width - g * 2, D = [];
  B.forEach((S) => {
    const k = i.measureTextWidth(S);
    if (b && k > A) {
      let W = { w: 0, len: 0, start: 0 };
      for (let O = 0; O < S.length; O += 1)
        W.w > A && (D.push(S.slice(W.start, O)), W = { w: 0, len: 0, start: O }), W.len++, W.w += i.measureTextWidth(S[O]) + 1;
      W.len > 0 && D.push(S.slice(W.start));
    } else
      D.push(S);
  });
  const H = f / 0.75, y = (D.length - 1) * H, E = [];
  v && E.push("underline"), _ && E.push("strikethrough");
  let $ = ys(x, t.height, y, H, C), T = 0;
  const F = (D.length > 0 ? D.length : 1) * H;
  return D.forEach((S) => {
    const k = i.measureTextWidth(S);
    T = Math.max(T, k), i.fillText(S, m, $), E.forEach((W) => {
      i._ctx.strokeStyle = h, i.line(...Bs(W, d, x, m, $, k, f));
    }), $ += H;
  }), i.restore(), {
    contentInfo: {
      width: T,
      height: F + 10
    }
  };
}, Ds = (i, e, t, r, s) => `>${i.cellValueString(t, r)}</td>`, Fs = (i, e, t) => {
  const r = e.innerHTML.replace(/<br(\/){0,1}>/gi, `
`).replace(/(<([^>]+)>|)/gi, "").replace("&nbsp;", " "), s = {};
  return Object.keys(t).length > 0 && (s.style = i.addStyle(t)), r !== null && !/^\s*$/.test(r) && (s.value = r), s;
}, Rs = bs;
var Qt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ss(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
function ks(i) {
  if (i.__esModule) return i;
  var e = i.default;
  if (typeof e == "function") {
    var t = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(i).forEach(function(r) {
    var s = Object.getOwnPropertyDescriptor(i, r);
    Object.defineProperty(t, r, s.get ? s : {
      enumerable: !0,
      get: function() {
        return i[r];
      }
    });
  }), t;
}
var Ze = { exports: {} };
function Hs(i) {
  throw new Error('Could not dynamically require "' + i + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Qe = { exports: {} };
const $s = {}, Ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $s
}, Symbol.toStringTag, { value: "Module" })), zs = /* @__PURE__ */ ks(Ts);
var Is = Qe.exports, R0;
function K() {
  return R0 || (R0 = 1, function(i, e) {
    (function(t, r) {
      i.exports = r();
    })(Is, function() {
      var t = t || function(r, s) {
        var n;
        if (typeof window < "u" && window.crypto && (n = window.crypto), typeof self < "u" && self.crypto && (n = self.crypto), typeof globalThis < "u" && globalThis.crypto && (n = globalThis.crypto), !n && typeof window < "u" && window.msCrypto && (n = window.msCrypto), !n && typeof Qt < "u" && Qt.crypto && (n = Qt.crypto), !n && typeof Hs == "function")
          try {
            n = zs;
          } catch {
          }
        var o = function() {
          if (n) {
            if (typeof n.getRandomValues == "function")
              try {
                return n.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof n.randomBytes == "function")
              try {
                return n.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, c = Object.create || /* @__PURE__ */ function() {
          function u() {
          }
          return function(g) {
            var C;
            return u.prototype = g, C = new u(), u.prototype = null, C;
          };
        }(), f = {}, a = f.lib = {}, l = a.Base = /* @__PURE__ */ function() {
          return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function(u) {
              var g = c(this);
              return u && g.mixIn(u), (!g.hasOwnProperty("init") || this.init === g.init) && (g.init = function() {
                g.$super.init.apply(this, arguments);
              }), g.init.prototype = g, g.$super = this, g;
            },
            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function() {
              var u = this.extend();
              return u.init.apply(u, arguments), u;
            },
            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function() {
            },
            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function(u) {
              for (var g in u)
                u.hasOwnProperty(g) && (this[g] = u[g]);
              u.hasOwnProperty("toString") && (this.toString = u.toString);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }(), p = a.WordArray = l.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of 32-bit words.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.create();
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
           */
          init: function(u, g) {
            u = this.words = u || [], g != s ? this.sigBytes = g : this.sigBytes = u.length * 4;
          },
          /**
           * Converts this word array to a string.
           *
           * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
           *
           * @return {string} The stringified word array.
           *
           * @example
           *
           *     var string = wordArray + '';
           *     var string = wordArray.toString();
           *     var string = wordArray.toString(CryptoJS.enc.Utf8);
           */
          toString: function(u) {
            return (u || d).stringify(this);
          },
          /**
           * Concatenates a word array to this word array.
           *
           * @param {WordArray} wordArray The word array to append.
           *
           * @return {WordArray} This word array.
           *
           * @example
           *
           *     wordArray1.concat(wordArray2);
           */
          concat: function(u) {
            var g = this.words, C = u.words, m = this.sigBytes, B = u.sigBytes;
            if (this.clamp(), m % 4)
              for (var A = 0; A < B; A++) {
                var D = C[A >>> 2] >>> 24 - A % 4 * 8 & 255;
                g[m + A >>> 2] |= D << 24 - (m + A) % 4 * 8;
              }
            else
              for (var H = 0; H < B; H += 4)
                g[m + H >>> 2] = C[H >>> 2];
            return this.sigBytes += B, this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var u = this.words, g = this.sigBytes;
            u[g >>> 2] &= 4294967295 << 32 - g % 4 * 8, u.length = r.ceil(g / 4);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {WordArray} The clone.
           *
           * @example
           *
           *     var clone = wordArray.clone();
           */
          clone: function() {
            var u = l.clone.call(this);
            return u.words = this.words.slice(0), u;
          },
          /**
           * Creates a word array filled with random bytes.
           *
           * @param {number} nBytes The number of random bytes to generate.
           *
           * @return {WordArray} The random word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.random(16);
           */
          random: function(u) {
            for (var g = [], C = 0; C < u; C += 4)
              g.push(o());
            return new p.init(g, u);
          }
        }), h = f.enc = {}, d = h.Hex = {
          /**
           * Converts a word array to a hex string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The hex string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
           */
          stringify: function(u) {
            for (var g = u.words, C = u.sigBytes, m = [], B = 0; B < C; B++) {
              var A = g[B >>> 2] >>> 24 - B % 4 * 8 & 255;
              m.push((A >>> 4).toString(16)), m.push((A & 15).toString(16));
            }
            return m.join("");
          },
          /**
           * Converts a hex string to a word array.
           *
           * @param {string} hexStr The hex string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
           */
          parse: function(u) {
            for (var g = u.length, C = [], m = 0; m < g; m += 2)
              C[m >>> 3] |= parseInt(u.substr(m, 2), 16) << 24 - m % 8 * 4;
            return new p.init(C, g / 2);
          }
        }, x = h.Latin1 = {
          /**
           * Converts a word array to a Latin1 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Latin1 string.
           *
           * @static
           *
           * @example
           *
           *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
           */
          stringify: function(u) {
            for (var g = u.words, C = u.sigBytes, m = [], B = 0; B < C; B++) {
              var A = g[B >>> 2] >>> 24 - B % 4 * 8 & 255;
              m.push(String.fromCharCode(A));
            }
            return m.join("");
          },
          /**
           * Converts a Latin1 string to a word array.
           *
           * @param {string} latin1Str The Latin1 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
           */
          parse: function(u) {
            for (var g = u.length, C = [], m = 0; m < g; m++)
              C[m >>> 2] |= (u.charCodeAt(m) & 255) << 24 - m % 4 * 8;
            return new p.init(C, g);
          }
        }, v = h.Utf8 = {
          /**
           * Converts a word array to a UTF-8 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-8 string.
           *
           * @static
           *
           * @example
           *
           *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
           */
          stringify: function(u) {
            try {
              return decodeURIComponent(escape(x.stringify(u)));
            } catch {
              throw new Error("Malformed UTF-8 data");
            }
          },
          /**
           * Converts a UTF-8 string to a word array.
           *
           * @param {string} utf8Str The UTF-8 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
           */
          parse: function(u) {
            return x.parse(unescape(encodeURIComponent(u)));
          }
        }, _ = a.BufferedBlockAlgorithm = l.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new p.init(), this._nDataBytes = 0;
          },
          /**
           * Adds new data to this block algorithm's buffer.
           *
           * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
           *
           * @example
           *
           *     bufferedBlockAlgorithm._append('data');
           *     bufferedBlockAlgorithm._append(wordArray);
           */
          _append: function(u) {
            typeof u == "string" && (u = v.parse(u)), this._data.concat(u), this._nDataBytes += u.sigBytes;
          },
          /**
           * Processes available data blocks.
           *
           * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
           *
           * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
           *
           * @return {WordArray} The processed data.
           *
           * @example
           *
           *     var processedData = bufferedBlockAlgorithm._process();
           *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
           */
          _process: function(u) {
            var g, C = this._data, m = C.words, B = C.sigBytes, A = this.blockSize, D = A * 4, H = B / D;
            u ? H = r.ceil(H) : H = r.max((H | 0) - this._minBufferSize, 0);
            var y = H * A, E = r.min(y * 4, B);
            if (y) {
              for (var $ = 0; $ < y; $ += A)
                this._doProcessBlock(m, $);
              g = m.splice(0, y), C.sigBytes -= E;
            }
            return new p.init(g, E);
          },
          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = bufferedBlockAlgorithm.clone();
           */
          clone: function() {
            var u = l.clone.call(this);
            return u._data = this._data.clone(), u;
          },
          _minBufferSize: 0
        });
        a.Hasher = _.extend({
          /**
           * Configuration options.
           */
          cfg: l.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(u) {
            this.cfg = this.cfg.extend(u), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            _.reset.call(this), this._doReset();
          },
          /**
           * Updates this hasher with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {Hasher} This hasher.
           *
           * @example
           *
           *     hasher.update('message');
           *     hasher.update(wordArray);
           */
          update: function(u) {
            return this._append(u), this._process(), this;
          },
          /**
           * Finalizes the hash computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The hash.
           *
           * @example
           *
           *     var hash = hasher.finalize();
           *     var hash = hasher.finalize('message');
           *     var hash = hasher.finalize(wordArray);
           */
          finalize: function(u) {
            u && this._append(u);
            var g = this._doFinalize();
            return g;
          },
          blockSize: 16,
          /**
           * Creates a shortcut function to a hasher's object interface.
           *
           * @param {Hasher} hasher The hasher to create a helper for.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
           */
          _createHelper: function(u) {
            return function(g, C) {
              return new u.init(C).finalize(g);
            };
          },
          /**
           * Creates a shortcut function to the HMAC's object interface.
           *
           * @param {Hasher} hasher The hasher to use in this HMAC helper.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
           */
          _createHmacHelper: function(u) {
            return function(g, C) {
              return new b.HMAC.init(u, C).finalize(g);
            };
          }
        });
        var b = f.algo = {};
        return f;
      }(Math);
      return t;
    });
  }(Qe)), Qe.exports;
}
var Je = { exports: {} }, Ps = Je.exports, S0;
function Vt() {
  return S0 || (S0 = 1, function(i, e) {
    (function(t, r) {
      i.exports = r(K());
    })(Ps, function(t) {
      return function(r) {
        var s = t, n = s.lib, o = n.Base, c = n.WordArray, f = s.x64 = {};
        f.Word = o.extend({
          /**
           * Initializes a newly created 64-bit word.
           *
           * @param {number} high The high 32 bits.
           * @param {number} low The low 32 bits.
           *
           * @example
           *
           *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
           */
          init: function(a, l) {
            this.high = a, this.low = l;
          }
          /**
           * Bitwise NOTs this word.
           *
           * @return {X64Word} A new x64-Word object after negating.
           *
           * @example
           *
           *     var negated = x64Word.not();
           */
          // not: function () {
          // var high = ~this.high;
          // var low = ~this.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ANDs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to AND with this word.
           *
           * @return {X64Word} A new x64-Word object after ANDing.
           *
           * @example
           *
           *     var anded = x64Word.and(anotherX64Word);
           */
          // and: function (word) {
          // var high = this.high & word.high;
          // var low = this.low & word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to OR with this word.
           *
           * @return {X64Word} A new x64-Word object after ORing.
           *
           * @example
           *
           *     var ored = x64Word.or(anotherX64Word);
           */
          // or: function (word) {
          // var high = this.high | word.high;
          // var low = this.low | word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise XORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to XOR with this word.
           *
           * @return {X64Word} A new x64-Word object after XORing.
           *
           * @example
           *
           *     var xored = x64Word.xor(anotherX64Word);
           */
          // xor: function (word) {
          // var high = this.high ^ word.high;
          // var low = this.low ^ word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the left.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftL(25);
           */
          // shiftL: function (n) {
          // if (n < 32) {
          // var high = (this.high << n) | (this.low >>> (32 - n));
          // var low = this.low << n;
          // } else {
          // var high = this.low << (n - 32);
          // var low = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the right.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftR(7);
           */
          // shiftR: function (n) {
          // if (n < 32) {
          // var low = (this.low >>> n) | (this.high << (32 - n));
          // var high = this.high >>> n;
          // } else {
          // var low = this.high >>> (n - 32);
          // var high = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Rotates this word n bits to the left.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotL(25);
           */
          // rotL: function (n) {
          // return this.shiftL(n).or(this.shiftR(64 - n));
          // },
          /**
           * Rotates this word n bits to the right.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotR(7);
           */
          // rotR: function (n) {
          // return this.shiftR(n).or(this.shiftL(64 - n));
          // },
          /**
           * Adds this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to add with this word.
           *
           * @return {X64Word} A new x64-Word object after adding.
           *
           * @example
           *
           *     var added = x64Word.add(anotherX64Word);
           */
          // add: function (word) {
          // var low = (this.low + word.low) | 0;
          // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
          // var high = (this.high + word.high + carry) | 0;
          // return X64Word.create(high, low);
          // }
        }), f.WordArray = o.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.x64.WordArray.create();
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ]);
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ], 10);
           */
          init: function(a, l) {
            a = this.words = a || [], l != r ? this.sigBytes = l : this.sigBytes = a.length * 8;
          },
          /**
           * Converts this 64-bit word array to a 32-bit word array.
           *
           * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
           *
           * @example
           *
           *     var x32WordArray = x64WordArray.toX32();
           */
          toX32: function() {
            for (var a = this.words, l = a.length, p = [], h = 0; h < l; h++) {
              var d = a[h];
              p.push(d.high), p.push(d.low);
            }
            return c.create(p, this.sigBytes);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {X64WordArray} The clone.
           *
           * @example
           *
           *     var clone = x64WordArray.clone();
           */
          clone: function() {
            for (var a = o.clone.call(this), l = a.words = this.words.slice(0), p = l.length, h = 0; h < p; h++)
              l[h] = l[h].clone();
            return a;
          }
        });
      }(), t;
    });
  }(Je)), Je.exports;
}
var et = { exports: {} }, Os = et.exports, k0;
function Ws() {
  return k0 || (k0 = 1, function(i, e) {
    (function(t, r) {
      i.exports = r(K());
    })(Os, function(t) {
      return function() {
        if (typeof ArrayBuffer == "function") {
          var r = t, s = r.lib, n = s.WordArray, o = n.init, c = n.init = function(f) {
            if (f instanceof ArrayBuffer && (f = new Uint8Array(f)), (f instanceof Int8Array || typeof Uint8ClampedArray < "u" && f instanceof Uint8ClampedArray || f instanceof Int16Array || f instanceof Uint16Array || f instanceof Int32Array || f instanceof Uint32Array || f instanceof Float32Array || f instanceof Float64Array) && (f = new Uint8Array(f.buffer, f.byteOffset, f.byteLength)), f instanceof Uint8Array) {
              for (var a = f.byteLength, l = [], p = 0; p < a; p++)
                l[p >>> 2] |= f[p] << 24 - p % 4 * 8;
              o.call(this, l, a);
            } else
              o.apply(this, arguments);
          };
          c.prototype = n;
        }
      }(), t.lib.WordArray;
    });
  }(et)), et.exports;
}
var tt = { exports: {} }, Ms = tt.exports, H0;
function Ls() {
  return H0 || (H0 = 1, function(i, e) {
    (function(t, r) {
      i.exports = r(K());
    })(Ms, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.WordArray, o = r.enc;
        o.Utf16 = o.Utf16BE = {
          /**
           * Converts a word array to a UTF-16 BE string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-16 BE string.
           *
           * @static
           *
           * @example
           *
           *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
           */
          stringify: function(f) {
            for (var a = f.words, l = f.sigBytes, p = [], h = 0; h < l; h += 2) {
              var d = a[h >>> 2] >>> 16 - h % 4 * 8 & 65535;
              p.push(String.fromCharCode(d));
            }
            return p.join("");
          },
          /**
           * Converts a UTF-16 BE string to a word array.
           *
           * @param {string} utf16Str The UTF-16 BE string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
           */
          parse: function(f) {
            for (var a = f.length, l = [], p = 0; p < a; p++)
              l[p >>> 1] |= f.charCodeAt(p) << 16 - p % 2 * 16;
            return n.create(l, a * 2);
          }
        }, o.Utf16LE = {
          /**
           * Converts a word array to a UTF-16 LE string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-16 LE string.
           *
           * @static
           *
           * @example
           *
           *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
           */
          stringify: function(f) {
            for (var a = f.words, l = f.sigBytes, p = [], h = 0; h < l; h += 2) {
              var d = c(a[h >>> 2] >>> 16 - h % 4 * 8 & 65535);
              p.push(String.fromCharCode(d));
            }
            return p.join("");
          },
          /**
           * Converts a UTF-16 LE string to a word array.
           *
           * @param {string} utf16Str The UTF-16 LE string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
           */
          parse: function(f) {
            for (var a = f.length, l = [], p = 0; p < a; p++)
              l[p >>> 1] |= c(f.charCodeAt(p) << 16 - p % 2 * 16);
            return n.create(l, a * 2);
          }
        };
        function c(f) {
          return f << 8 & 4278255360 | f >>> 8 & 16711935;
        }
      }(), t.enc.Utf16;
    });
  }(tt)), tt.exports;
}
var rt = { exports: {} }, Ns = rt.exports, $0;
function be() {
  return $0 || ($0 = 1, function(i, e) {
    (function(t, r) {
      i.exports = r(K());
    })(Ns, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.WordArray, o = r.enc;
        o.Base64 = {
          /**
           * Converts a word array to a Base64 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Base64 string.
           *
           * @static
           *
           * @example
           *
           *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
           */
          stringify: function(f) {
            var a = f.words, l = f.sigBytes, p = this._map;
            f.clamp();
            for (var h = [], d = 0; d < l; d += 3)
              for (var x = a[d >>> 2] >>> 24 - d % 4 * 8 & 255, v = a[d + 1 >>> 2] >>> 24 - (d + 1) % 4 * 8 & 255, _ = a[d + 2 >>> 2] >>> 24 - (d + 2) % 4 * 8 & 255, b = x << 16 | v << 8 | _, u = 0; u < 4 && d + u * 0.75 < l; u++)
                h.push(p.charAt(b >>> 6 * (3 - u) & 63));
            var g = p.charAt(64);
            if (g)
              for (; h.length % 4; )
                h.push(g);
            return h.join("");
          },
          /**
           * Converts a Base64 string to a word array.
           *
           * @param {string} base64Str The Base64 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
           */
          parse: function(f) {
            var a = f.length, l = this._map, p = this._reverseMap;
            if (!p) {
              p = this._reverseMap = [];
              for (var h = 0; h < l.length; h++)
                p[l.charCodeAt(h)] = h;
            }
            var d = l.charAt(64);
            if (d) {
              var x = f.indexOf(d);
              x !== -1 && (a = x);
            }
            return c(f, a, p);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function c(f, a, l) {
          for (var p = [], h = 0, d = 0; d < a; d++)
            if (d % 4) {
              var x = l[f.charCodeAt(d - 1)] << d % 4 * 2, v = l[f.charCodeAt(d)] >>> 6 - d % 4 * 2, _ = x | v;
              p[h >>> 2] |= _ << 24 - h % 4 * 8, h++;
            }
          return n.create(p, h);
        }
      }(), t.enc.Base64;
    });
  }(rt)), rt.exports;
}
var st = { exports: {} }, qs = st.exports, T0;
function js() {
  return T0 || (T0 = 1, function(i, e) {
    (function(t, r) {
      i.exports = r(K());
    })(qs, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.WordArray, o = r.enc;
        o.Base64url = {
          /**
           * Converts a word array to a Base64url string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @param {boolean} urlSafe Whether to use url safe
           *
           * @return {string} The Base64url string.
           *
           * @static
           *
           * @example
           *
           *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
           */
          stringify: function(f, a) {
            a === void 0 && (a = !0);
            var l = f.words, p = f.sigBytes, h = a ? this._safe_map : this._map;
            f.clamp();
            for (var d = [], x = 0; x < p; x += 3)
              for (var v = l[x >>> 2] >>> 24 - x % 4 * 8 & 255, _ = l[x + 1 >>> 2] >>> 24 - (x + 1) % 4 * 8 & 255, b = l[x + 2 >>> 2] >>> 24 - (x + 2) % 4 * 8 & 255, u = v << 16 | _ << 8 | b, g = 0; g < 4 && x + g * 0.75 < p; g++)
                d.push(h.charAt(u >>> 6 * (3 - g) & 63));
            var C = h.charAt(64);
            if (C)
              for (; d.length % 4; )
                d.push(C);
            return d.join("");
          },
          /**
           * Converts a Base64url string to a word array.
           *
           * @param {string} base64Str The Base64url string.
           *
           * @param {boolean} urlSafe Whether to use url safe
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
           */
          parse: function(f, a) {
            a === void 0 && (a = !0);
            var l = f.length, p = a ? this._safe_map : this._map, h = this._reverseMap;
            if (!h) {
              h = this._reverseMap = [];
              for (var d = 0; d < p.length; d++)
                h[p.charCodeAt(d)] = d;
            }
            var x = p.charAt(64);
            if (x) {
              var v = f.indexOf(x);
              v !== -1 && (l = v);
            }
            return c(f, l, h);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
        };
        function c(f, a, l) {
          for (var p = [], h = 0, d = 0; d < a; d++)
            if (d % 4) {
              var x = l[f.charCodeAt(d - 1)] << d % 4 * 2, v = l[f.charCodeAt(d)] >>> 6 - d % 4 * 2, _ = x | v;
              p[h >>> 2] |= _ << 24 - h % 4 * 8, h++;
            }
          return n.create(p, h);
        }
      }(), t.enc.Base64url;
    });
  }(st)), st.exports;
}
var it = { exports: {} }, Vs = it.exports, z0;
function me() {
  return z0 || (z0 = 1, function(i, e) {
    (function(t, r) {
      i.exports = r(K());
    })(Vs, function(t) {
      return function(r) {
        var s = t, n = s.lib, o = n.WordArray, c = n.Hasher, f = s.algo, a = [];
        (function() {
          for (var v = 0; v < 64; v++)
            a[v] = r.abs(r.sin(v + 1)) * 4294967296 | 0;
        })();
        var l = f.MD5 = c.extend({
          _doReset: function() {
            this._hash = new o.init([
              1732584193,
              4023233417,
              2562383102,
              271733878
            ]);
          },
          _doProcessBlock: function(v, _) {
            for (var b = 0; b < 16; b++) {
              var u = _ + b, g = v[u];
              v[u] = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360;
            }
            var C = this._hash.words, m = v[_ + 0], B = v[_ + 1], A = v[_ + 2], D = v[_ + 3], H = v[_ + 4], y = v[_ + 5], E = v[_ + 6], $ = v[_ + 7], T = v[_ + 8], F = v[_ + 9], S = v[_ + 10], k = v[_ + 11], W = v[_ + 12], O = v[_ + 13], M = v[_ + 14], L = v[_ + 15], R = C[0], z = C[1], P = C[2], I = C[3];
            R = p(R, z, P, I, m, 7, a[0]), I = p(I, R, z, P, B, 12, a[1]), P = p(P, I, R, z, A, 17, a[2]), z = p(z, P, I, R, D, 22, a[3]), R = p(R, z, P, I, H, 7, a[4]), I = p(I, R, z, P, y, 12, a[5]), P = p(P, I, R, z, E, 17, a[6]), z = p(z, P, I, R, $, 22, a[7]), R = p(R, z, P, I, T, 7, a[8]), I = p(I, R, z, P, F, 12, a[9]), P = p(P, I, R, z, S, 17, a[10]), z = p(z, P, I, R, k, 22, a[11]), R = p(R, z, P, I, W, 7, a[12]), I = p(I, R, z, P, O, 12, a[13]), P = p(P, I, R, z, M, 17, a[14]), z = p(z, P, I, R, L, 22, a[15]), R = h(R, z, P, I, B, 5, a[16]), I = h(I, R, z, P, E, 9, a[17]), P = h(P, I, R, z, k, 14, a[18]), z = h(z, P, I, R, m, 20, a[19]), R = h(R, z, P, I, y, 5, a[20]), I = h(I, R, z, P, S, 9, a[21]), P = h(P, I, R, z, L, 14, a[22]), z = h(z, P, I, R, H, 20, a[23]), R = h(R, z, P, I, F, 5, a[24]), I = h(I, R, z, P, M, 9, a[25]), P = h(P, I, R, z, D, 14, a[26]), z = h(z, P, I, R, T, 20, a[27]), R = h(R, z, P, I, O, 5, a[28]), I = h(I, R, z, P, A, 9, a[29]), P = h(P, I, R, z, $, 14, a[30]), z = h(z, P, I, R, W, 20, a[31]), R = d(R, z, P, I, y, 4, a[32]), I = d(I, R, z, P, T, 11, a[33]), P = d(P, I, R, z, k, 16, a[34]), z = d(z, P, I, R, M, 23, a[35]), R = d(R, z, P, I, B, 4, a[36]), I = d(I, R, z, P, H, 11, a[37]), P = d(P, I, R, z, $, 16, a[38]), z = d(z, P, I, R, S, 23, a[39]), R = d(R, z, P, I, O, 4, a[40]), I = d(I, R, z, P, m, 11, a[41]), P = d(P, I, R, z, D, 16, a[42]), z = d(z, P, I, R, E, 23, a[43]), R = d(R, z, P, I, F, 4, a[44]), I = d(I, R, z, P, W, 11, a[45]), P = d(P, I, R, z, L, 16, a[46]), z = d(z, P, I, R, A, 23, a[47]), R = x(R, z, P, I, m, 6, a[48]), I = x(I, R, z, P, $, 10, a[49]), P = x(P, I, R, z, M, 15, a[50]), z = x(z, P, I, R, y, 21, a[51]), R = x(R, z, P, I, W, 6, a[52]), I = x(I, R, z, P, D, 10, a[53]), P = x(P, I, R, z, S, 15, a[54]), z = x(z, P, I, R, B, 21, a[55]), R = x(R, z, P, I, T, 6, a[56]), I = x(I, R, z, P, L, 10, a[57]), P = x(P, I, R, z, E, 15, a[58]), z = x(z, P, I, R, O, 21, a[59]), R = x(R, z, P, I, H, 6, a[60]), I = x(I, R, z, P, k, 10, a[61]), P = x(P, I, R, z, A, 15, a[62]), z = x(z, P, I, R, F, 21, a[63]), C[0] = C[0] + R | 0, C[1] = C[1] + z | 0, C[2] = C[2] + P | 0, C[3] = C[3] + I | 0;
          },
          _doFinalize: function() {
            var v = this._data, _ = v.words, b = this._nDataBytes * 8, u = v.sigBytes * 8;
            _[u >>> 5] |= 128 << 24 - u % 32;
            var g = r.floor(b / 4294967296), C = b;
            _[(u + 64 >>> 9 << 4) + 15] = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360, _[(u + 64 >>> 9 << 4) + 14] = (C << 8 | C >>> 24) & 16711935 | (C << 24 | C >>> 8) & 4278255360, v.sigBytes = (_.length + 1) * 4, this._process();
            for (var m = this._hash, B = m.words, A = 0; A < 4; A++) {
              var D = B[A];
              B[A] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360;
            }
            return m;
          },
          clone: function() {
            var v = c.clone.call(this);
            return v._hash = this._hash.clone(), v;
          }
        });
        function p(v, _, b, u, g, C, m) {
          var B = v + (_ & b | ~_ & u) + g + m;
          return (B << C | B >>> 32 - C) + _;
        }
        function h(v, _, b, u, g, C, m) {
          var B = v + (_ & u | b & ~u) + g + m;
          return (B << C | B >>> 32 - C) + _;
        }
        function d(v, _, b, u, g, C, m) {
          var B = v + (_ ^ b ^ u) + g + m;
          return (B << C | B >>> 32 - C) + _;
        }
        function x(v, _, b, u, g, C, m) {
          var B = v + (b ^ (_ | ~u)) + g + m;
          return (B << C | B >>> 32 - C) + _;
        }
        s.MD5 = c._createHelper(l), s.HmacMD5 = c._createHmacHelper(l);
      }(Math), t.MD5;
    });
  }(it)), it.exports;
}
var nt = { exports: {} }, Ys = nt.exports, I0;
function Hr() {
  return I0 || (I0 = 1, function(i, e) {
    (function(t, r) {
      i.exports = r(K());
    })(Ys, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.WordArray, o = s.Hasher, c = r.algo, f = [], a = c.SHA1 = o.extend({
          _doReset: function() {
            this._hash = new n.init([
              1732584193,
              4023233417,
              2562383102,
              271733878,
              3285377520
            ]);
          },
          _doProcessBlock: function(l, p) {
            for (var h = this._hash.words, d = h[0], x = h[1], v = h[2], _ = h[3], b = h[4], u = 0; u < 80; u++) {
              if (u < 16)
                f[u] = l[p + u] | 0;
              else {
                var g = f[u - 3] ^ f[u - 8] ^ f[u - 14] ^ f[u - 16];
                f[u] = g << 1 | g >>> 31;
              }
              var C = (d << 5 | d >>> 27) + b + f[u];
              u < 20 ? C += (x & v | ~x & _) + 1518500249 : u < 40 ? C += (x ^ v ^ _) + 1859775393 : u < 60 ? C += (x & v | x & _ | v & _) - 1894007588 : C += (x ^ v ^ _) - 899497514, b = _, _ = v, v = x << 30 | x >>> 2, x = d, d = C;
            }
            h[0] = h[0] + d | 0, h[1] = h[1] + x | 0, h[2] = h[2] + v | 0, h[3] = h[3] + _ | 0, h[4] = h[4] + b | 0;
          },
          _doFinalize: function() {
            var l = this._data, p = l.words, h = this._nDataBytes * 8, d = l.sigBytes * 8;
            return p[d >>> 5] |= 128 << 24 - d % 32, p[(d + 64 >>> 9 << 4) + 14] = Math.floor(h / 4294967296), p[(d + 64 >>> 9 << 4) + 15] = h, l.sigBytes = p.length * 4, this._process(), this._hash;
          },
          clone: function() {
            var l = o.clone.call(this);
            return l._hash = this._hash.clone(), l;
          }
        });
        r.SHA1 = o._createHelper(a), r.HmacSHA1 = o._createHmacHelper(a);
      }(), t.SHA1;
    });
  }(nt)), nt.exports;
}
var ot = { exports: {} }, Us = ot.exports, P0;
function o0() {
  return P0 || (P0 = 1, function(i, e) {
    (function(t, r) {
      i.exports = r(K());
    })(Us, function(t) {
      return function(r) {
        var s = t, n = s.lib, o = n.WordArray, c = n.Hasher, f = s.algo, a = [], l = [];
        (function() {
          function d(b) {
            for (var u = r.sqrt(b), g = 2; g <= u; g++)
              if (!(b % g))
                return !1;
            return !0;
          }
          function x(b) {
            return (b - (b | 0)) * 4294967296 | 0;
          }
          for (var v = 2, _ = 0; _ < 64; )
            d(v) && (_ < 8 && (a[_] = x(r.pow(v, 1 / 2))), l[_] = x(r.pow(v, 1 / 3)), _++), v++;
        })();
        var p = [], h = f.SHA256 = c.extend({
          _doReset: function() {
            this._hash = new o.init(a.slice(0));
          },
          _doProcessBlock: function(d, x) {
            for (var v = this._hash.words, _ = v[0], b = v[1], u = v[2], g = v[3], C = v[4], m = v[5], B = v[6], A = v[7], D = 0; D < 64; D++) {
              if (D < 16)
                p[D] = d[x + D] | 0;
              else {
                var H = p[D - 15], y = (H << 25 | H >>> 7) ^ (H << 14 | H >>> 18) ^ H >>> 3, E = p[D - 2], $ = (E << 15 | E >>> 17) ^ (E << 13 | E >>> 19) ^ E >>> 10;
                p[D] = y + p[D - 7] + $ + p[D - 16];
              }
              var T = C & m ^ ~C & B, F = _ & b ^ _ & u ^ b & u, S = (_ << 30 | _ >>> 2) ^ (_ << 19 | _ >>> 13) ^ (_ << 10 | _ >>> 22), k = (C << 26 | C >>> 6) ^ (C << 21 | C >>> 11) ^ (C << 7 | C >>> 25), W = A + k + T + l[D] + p[D], O = S + F;
              A = B, B = m, m = C, C = g + W | 0, g = u, u = b, b = _, _ = W + O | 0;
            }
            v[0] = v[0] + _ | 0, v[1] = v[1] + b | 0, v[2] = v[2] + u | 0, v[3] = v[3] + g | 0, v[4] = v[4] + C | 0, v[5] = v[5] + m | 0, v[6] = v[6] + B | 0, v[7] = v[7] + A | 0;
          },
          _doFinalize: function() {
            var d = this._data, x = d.words, v = this._nDataBytes * 8, _ = d.sigBytes * 8;
            return x[_ >>> 5] |= 128 << 24 - _ % 32, x[(_ + 64 >>> 9 << 4) + 14] = r.floor(v / 4294967296), x[(_ + 64 >>> 9 << 4) + 15] = v, d.sigBytes = x.length * 4, this._process(), this._hash;
          },
          clone: function() {
            var d = c.clone.call(this);
            return d._hash = this._hash.clone(), d;
          }
        });
        s.SHA256 = c._createHelper(h), s.HmacSHA256 = c._createHmacHelper(h);
      }(Math), t.SHA256;
    });
  }(ot)), ot.exports;
}
var at = { exports: {} }, Ks = at.exports, O0;
function Gs() {
  return O0 || (O0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), o0());
    })(Ks, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.WordArray, o = r.algo, c = o.SHA256, f = o.SHA224 = c.extend({
          _doReset: function() {
            this._hash = new n.init([
              3238371032,
              914150663,
              812702999,
              4144912697,
              4290775857,
              1750603025,
              1694076839,
              3204075428
            ]);
          },
          _doFinalize: function() {
            var a = c._doFinalize.call(this);
            return a.sigBytes -= 4, a;
          }
        });
        r.SHA224 = c._createHelper(f), r.HmacSHA224 = c._createHmacHelper(f);
      }(), t.SHA224;
    });
  }(at)), at.exports;
}
var lt = { exports: {} }, Xs = lt.exports, W0;
function $r() {
  return W0 || (W0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Vt());
    })(Xs, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.Hasher, o = r.x64, c = o.Word, f = o.WordArray, a = r.algo;
        function l() {
          return c.create.apply(c, arguments);
        }
        var p = [
          l(1116352408, 3609767458),
          l(1899447441, 602891725),
          l(3049323471, 3964484399),
          l(3921009573, 2173295548),
          l(961987163, 4081628472),
          l(1508970993, 3053834265),
          l(2453635748, 2937671579),
          l(2870763221, 3664609560),
          l(3624381080, 2734883394),
          l(310598401, 1164996542),
          l(607225278, 1323610764),
          l(1426881987, 3590304994),
          l(1925078388, 4068182383),
          l(2162078206, 991336113),
          l(2614888103, 633803317),
          l(3248222580, 3479774868),
          l(3835390401, 2666613458),
          l(4022224774, 944711139),
          l(264347078, 2341262773),
          l(604807628, 2007800933),
          l(770255983, 1495990901),
          l(1249150122, 1856431235),
          l(1555081692, 3175218132),
          l(1996064986, 2198950837),
          l(2554220882, 3999719339),
          l(2821834349, 766784016),
          l(2952996808, 2566594879),
          l(3210313671, 3203337956),
          l(3336571891, 1034457026),
          l(3584528711, 2466948901),
          l(113926993, 3758326383),
          l(338241895, 168717936),
          l(666307205, 1188179964),
          l(773529912, 1546045734),
          l(1294757372, 1522805485),
          l(1396182291, 2643833823),
          l(1695183700, 2343527390),
          l(1986661051, 1014477480),
          l(2177026350, 1206759142),
          l(2456956037, 344077627),
          l(2730485921, 1290863460),
          l(2820302411, 3158454273),
          l(3259730800, 3505952657),
          l(3345764771, 106217008),
          l(3516065817, 3606008344),
          l(3600352804, 1432725776),
          l(4094571909, 1467031594),
          l(275423344, 851169720),
          l(430227734, 3100823752),
          l(506948616, 1363258195),
          l(659060556, 3750685593),
          l(883997877, 3785050280),
          l(958139571, 3318307427),
          l(1322822218, 3812723403),
          l(1537002063, 2003034995),
          l(1747873779, 3602036899),
          l(1955562222, 1575990012),
          l(2024104815, 1125592928),
          l(2227730452, 2716904306),
          l(2361852424, 442776044),
          l(2428436474, 593698344),
          l(2756734187, 3733110249),
          l(3204031479, 2999351573),
          l(3329325298, 3815920427),
          l(3391569614, 3928383900),
          l(3515267271, 566280711),
          l(3940187606, 3454069534),
          l(4118630271, 4000239992),
          l(116418474, 1914138554),
          l(174292421, 2731055270),
          l(289380356, 3203993006),
          l(460393269, 320620315),
          l(685471733, 587496836),
          l(852142971, 1086792851),
          l(1017036298, 365543100),
          l(1126000580, 2618297676),
          l(1288033470, 3409855158),
          l(1501505948, 4234509866),
          l(1607167915, 987167468),
          l(1816402316, 1246189591)
        ], h = [];
        (function() {
          for (var x = 0; x < 80; x++)
            h[x] = l();
        })();
        var d = a.SHA512 = n.extend({
          _doReset: function() {
            this._hash = new f.init([
              new c.init(1779033703, 4089235720),
              new c.init(3144134277, 2227873595),
              new c.init(1013904242, 4271175723),
              new c.init(2773480762, 1595750129),
              new c.init(1359893119, 2917565137),
              new c.init(2600822924, 725511199),
              new c.init(528734635, 4215389547),
              new c.init(1541459225, 327033209)
            ]);
          },
          _doProcessBlock: function(x, v) {
            for (var _ = this._hash.words, b = _[0], u = _[1], g = _[2], C = _[3], m = _[4], B = _[5], A = _[6], D = _[7], H = b.high, y = b.low, E = u.high, $ = u.low, T = g.high, F = g.low, S = C.high, k = C.low, W = m.high, O = m.low, M = B.high, L = B.low, R = A.high, z = A.low, P = D.high, I = D.low, Y = H, G = y, X = E, q = $, te = T, Z = F, ne = S, le = k, J = W, re = O, Ue = M, Te = L, Ke = R, ze = z, Ut = P, Ie = I, ce = 0; ce < 80; ce++) {
              var oe, de, Ge = h[ce];
              if (ce < 16)
                de = Ge.high = x[v + ce * 2] | 0, oe = Ge.low = x[v + ce * 2 + 1] | 0;
              else {
                var h0 = h[ce - 15], Be = h0.high, Pe = h0.low, Mr = (Be >>> 1 | Pe << 31) ^ (Be >>> 8 | Pe << 24) ^ Be >>> 7, f0 = (Pe >>> 1 | Be << 31) ^ (Pe >>> 8 | Be << 24) ^ (Pe >>> 7 | Be << 25), x0 = h[ce - 2], Ee = x0.high, Oe = x0.low, Lr = (Ee >>> 19 | Oe << 13) ^ (Ee << 3 | Oe >>> 29) ^ Ee >>> 6, d0 = (Oe >>> 19 | Ee << 13) ^ (Oe << 3 | Ee >>> 29) ^ (Oe >>> 6 | Ee << 26), u0 = h[ce - 7], Nr = u0.high, qr = u0.low, p0 = h[ce - 16], jr = p0.high, _0 = p0.low;
                oe = f0 + qr, de = Mr + Nr + (oe >>> 0 < f0 >>> 0 ? 1 : 0), oe = oe + d0, de = de + Lr + (oe >>> 0 < d0 >>> 0 ? 1 : 0), oe = oe + _0, de = de + jr + (oe >>> 0 < _0 >>> 0 ? 1 : 0), Ge.high = de, Ge.low = oe;
              }
              var Vr = J & Ue ^ ~J & Ke, v0 = re & Te ^ ~re & ze, Yr = Y & X ^ Y & te ^ X & te, Ur = G & q ^ G & Z ^ q & Z, Kr = (Y >>> 28 | G << 4) ^ (Y << 30 | G >>> 2) ^ (Y << 25 | G >>> 7), g0 = (G >>> 28 | Y << 4) ^ (G << 30 | Y >>> 2) ^ (G << 25 | Y >>> 7), Gr = (J >>> 14 | re << 18) ^ (J >>> 18 | re << 14) ^ (J << 23 | re >>> 9), Xr = (re >>> 14 | J << 18) ^ (re >>> 18 | J << 14) ^ (re << 23 | J >>> 9), C0 = p[ce], Zr = C0.high, w0 = C0.low, se = Ie + Xr, ue = Ut + Gr + (se >>> 0 < Ie >>> 0 ? 1 : 0), se = se + v0, ue = ue + Vr + (se >>> 0 < v0 >>> 0 ? 1 : 0), se = se + w0, ue = ue + Zr + (se >>> 0 < w0 >>> 0 ? 1 : 0), se = se + oe, ue = ue + de + (se >>> 0 < oe >>> 0 ? 1 : 0), b0 = g0 + Ur, Qr = Kr + Yr + (b0 >>> 0 < g0 >>> 0 ? 1 : 0);
              Ut = Ke, Ie = ze, Ke = Ue, ze = Te, Ue = J, Te = re, re = le + se | 0, J = ne + ue + (re >>> 0 < le >>> 0 ? 1 : 0) | 0, ne = te, le = Z, te = X, Z = q, X = Y, q = G, G = se + b0 | 0, Y = ue + Qr + (G >>> 0 < se >>> 0 ? 1 : 0) | 0;
            }
            y = b.low = y + G, b.high = H + Y + (y >>> 0 < G >>> 0 ? 1 : 0), $ = u.low = $ + q, u.high = E + X + ($ >>> 0 < q >>> 0 ? 1 : 0), F = g.low = F + Z, g.high = T + te + (F >>> 0 < Z >>> 0 ? 1 : 0), k = C.low = k + le, C.high = S + ne + (k >>> 0 < le >>> 0 ? 1 : 0), O = m.low = O + re, m.high = W + J + (O >>> 0 < re >>> 0 ? 1 : 0), L = B.low = L + Te, B.high = M + Ue + (L >>> 0 < Te >>> 0 ? 1 : 0), z = A.low = z + ze, A.high = R + Ke + (z >>> 0 < ze >>> 0 ? 1 : 0), I = D.low = I + Ie, D.high = P + Ut + (I >>> 0 < Ie >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var x = this._data, v = x.words, _ = this._nDataBytes * 8, b = x.sigBytes * 8;
            v[b >>> 5] |= 128 << 24 - b % 32, v[(b + 128 >>> 10 << 5) + 30] = Math.floor(_ / 4294967296), v[(b + 128 >>> 10 << 5) + 31] = _, x.sigBytes = v.length * 4, this._process();
            var u = this._hash.toX32();
            return u;
          },
          clone: function() {
            var x = n.clone.call(this);
            return x._hash = this._hash.clone(), x;
          },
          blockSize: 1024 / 32
        });
        r.SHA512 = n._createHelper(d), r.HmacSHA512 = n._createHmacHelper(d);
      }(), t.SHA512;
    });
  }(lt)), lt.exports;
}
var ct = { exports: {} }, Zs = ct.exports, M0;
function Qs() {
  return M0 || (M0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Vt(), $r());
    })(Zs, function(t) {
      return function() {
        var r = t, s = r.x64, n = s.Word, o = s.WordArray, c = r.algo, f = c.SHA512, a = c.SHA384 = f.extend({
          _doReset: function() {
            this._hash = new o.init([
              new n.init(3418070365, 3238371032),
              new n.init(1654270250, 914150663),
              new n.init(2438529370, 812702999),
              new n.init(355462360, 4144912697),
              new n.init(1731405415, 4290775857),
              new n.init(2394180231, 1750603025),
              new n.init(3675008525, 1694076839),
              new n.init(1203062813, 3204075428)
            ]);
          },
          _doFinalize: function() {
            var l = f._doFinalize.call(this);
            return l.sigBytes -= 16, l;
          }
        });
        r.SHA384 = f._createHelper(a), r.HmacSHA384 = f._createHmacHelper(a);
      }(), t.SHA384;
    });
  }(ct)), ct.exports;
}
var ht = { exports: {} }, Js = ht.exports, L0;
function ei() {
  return L0 || (L0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Vt());
    })(Js, function(t) {
      return function(r) {
        var s = t, n = s.lib, o = n.WordArray, c = n.Hasher, f = s.x64, a = f.Word, l = s.algo, p = [], h = [], d = [];
        (function() {
          for (var _ = 1, b = 0, u = 0; u < 24; u++) {
            p[_ + 5 * b] = (u + 1) * (u + 2) / 2 % 64;
            var g = b % 5, C = (2 * _ + 3 * b) % 5;
            _ = g, b = C;
          }
          for (var _ = 0; _ < 5; _++)
            for (var b = 0; b < 5; b++)
              h[_ + 5 * b] = b + (2 * _ + 3 * b) % 5 * 5;
          for (var m = 1, B = 0; B < 24; B++) {
            for (var A = 0, D = 0, H = 0; H < 7; H++) {
              if (m & 1) {
                var y = (1 << H) - 1;
                y < 32 ? D ^= 1 << y : A ^= 1 << y - 32;
              }
              m & 128 ? m = m << 1 ^ 113 : m <<= 1;
            }
            d[B] = a.create(A, D);
          }
        })();
        var x = [];
        (function() {
          for (var _ = 0; _ < 25; _++)
            x[_] = a.create();
        })();
        var v = l.SHA3 = c.extend({
          /**
           * Configuration options.
           *
           * @property {number} outputLength
           *   The desired number of bits in the output hash.
           *   Only values permitted are: 224, 256, 384, 512.
           *   Default: 512
           */
          cfg: c.cfg.extend({
            outputLength: 512
          }),
          _doReset: function() {
            for (var _ = this._state = [], b = 0; b < 25; b++)
              _[b] = new a.init();
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          },
          _doProcessBlock: function(_, b) {
            for (var u = this._state, g = this.blockSize / 2, C = 0; C < g; C++) {
              var m = _[b + 2 * C], B = _[b + 2 * C + 1];
              m = (m << 8 | m >>> 24) & 16711935 | (m << 24 | m >>> 8) & 4278255360, B = (B << 8 | B >>> 24) & 16711935 | (B << 24 | B >>> 8) & 4278255360;
              var A = u[C];
              A.high ^= B, A.low ^= m;
            }
            for (var D = 0; D < 24; D++) {
              for (var H = 0; H < 5; H++) {
                for (var y = 0, E = 0, $ = 0; $ < 5; $++) {
                  var A = u[H + 5 * $];
                  y ^= A.high, E ^= A.low;
                }
                var T = x[H];
                T.high = y, T.low = E;
              }
              for (var H = 0; H < 5; H++)
                for (var F = x[(H + 4) % 5], S = x[(H + 1) % 5], k = S.high, W = S.low, y = F.high ^ (k << 1 | W >>> 31), E = F.low ^ (W << 1 | k >>> 31), $ = 0; $ < 5; $++) {
                  var A = u[H + 5 * $];
                  A.high ^= y, A.low ^= E;
                }
              for (var O = 1; O < 25; O++) {
                var y, E, A = u[O], M = A.high, L = A.low, R = p[O];
                R < 32 ? (y = M << R | L >>> 32 - R, E = L << R | M >>> 32 - R) : (y = L << R - 32 | M >>> 64 - R, E = M << R - 32 | L >>> 64 - R);
                var z = x[h[O]];
                z.high = y, z.low = E;
              }
              var P = x[0], I = u[0];
              P.high = I.high, P.low = I.low;
              for (var H = 0; H < 5; H++)
                for (var $ = 0; $ < 5; $++) {
                  var O = H + 5 * $, A = u[O], Y = x[O], G = x[(H + 1) % 5 + 5 * $], X = x[(H + 2) % 5 + 5 * $];
                  A.high = Y.high ^ ~G.high & X.high, A.low = Y.low ^ ~G.low & X.low;
                }
              var A = u[0], q = d[D];
              A.high ^= q.high, A.low ^= q.low;
            }
          },
          _doFinalize: function() {
            var _ = this._data, b = _.words;
            this._nDataBytes * 8;
            var u = _.sigBytes * 8, g = this.blockSize * 32;
            b[u >>> 5] |= 1 << 24 - u % 32, b[(r.ceil((u + 1) / g) * g >>> 5) - 1] |= 128, _.sigBytes = b.length * 4, this._process();
            for (var C = this._state, m = this.cfg.outputLength / 8, B = m / 8, A = [], D = 0; D < B; D++) {
              var H = C[D], y = H.high, E = H.low;
              y = (y << 8 | y >>> 24) & 16711935 | (y << 24 | y >>> 8) & 4278255360, E = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360, A.push(E), A.push(y);
            }
            return new o.init(A, m);
          },
          clone: function() {
            for (var _ = c.clone.call(this), b = _._state = this._state.slice(0), u = 0; u < 25; u++)
              b[u] = b[u].clone();
            return _;
          }
        });
        s.SHA3 = c._createHelper(v), s.HmacSHA3 = c._createHmacHelper(v);
      }(Math), t.SHA3;
    });
  }(ht)), ht.exports;
}
var ft = { exports: {} }, ti = ft.exports, N0;
function ri() {
  return N0 || (N0 = 1, function(i, e) {
    (function(t, r) {
      i.exports = r(K());
    })(ti, function(t) {
      /** @preserve
      			(c) 2012 by Cédric Mesnil. All rights reserved.
      
      			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
      
      			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
      			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
      
      			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
      			*/
      return function(r) {
        var s = t, n = s.lib, o = n.WordArray, c = n.Hasher, f = s.algo, a = o.create([
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          7,
          4,
          13,
          1,
          10,
          6,
          15,
          3,
          12,
          0,
          9,
          5,
          2,
          14,
          11,
          8,
          3,
          10,
          14,
          4,
          9,
          15,
          8,
          1,
          2,
          7,
          0,
          6,
          13,
          11,
          5,
          12,
          1,
          9,
          11,
          10,
          0,
          8,
          12,
          4,
          13,
          3,
          7,
          15,
          14,
          5,
          6,
          2,
          4,
          0,
          5,
          9,
          7,
          12,
          2,
          10,
          14,
          1,
          3,
          8,
          11,
          6,
          15,
          13
        ]), l = o.create([
          5,
          14,
          7,
          0,
          9,
          2,
          11,
          4,
          13,
          6,
          15,
          8,
          1,
          10,
          3,
          12,
          6,
          11,
          3,
          7,
          0,
          13,
          5,
          10,
          14,
          15,
          8,
          12,
          4,
          9,
          1,
          2,
          15,
          5,
          1,
          3,
          7,
          14,
          6,
          9,
          11,
          8,
          12,
          2,
          10,
          0,
          4,
          13,
          8,
          6,
          4,
          1,
          3,
          11,
          15,
          0,
          5,
          12,
          2,
          13,
          9,
          7,
          10,
          14,
          12,
          15,
          10,
          4,
          1,
          5,
          8,
          7,
          6,
          2,
          13,
          14,
          0,
          3,
          9,
          11
        ]), p = o.create([
          11,
          14,
          15,
          12,
          5,
          8,
          7,
          9,
          11,
          13,
          14,
          15,
          6,
          7,
          9,
          8,
          7,
          6,
          8,
          13,
          11,
          9,
          7,
          15,
          7,
          12,
          15,
          9,
          11,
          7,
          13,
          12,
          11,
          13,
          6,
          7,
          14,
          9,
          13,
          15,
          14,
          8,
          13,
          6,
          5,
          12,
          7,
          5,
          11,
          12,
          14,
          15,
          14,
          15,
          9,
          8,
          9,
          14,
          5,
          6,
          8,
          6,
          5,
          12,
          9,
          15,
          5,
          11,
          6,
          8,
          13,
          12,
          5,
          12,
          13,
          14,
          11,
          8,
          5,
          6
        ]), h = o.create([
          8,
          9,
          9,
          11,
          13,
          15,
          15,
          5,
          7,
          7,
          8,
          11,
          14,
          14,
          12,
          6,
          9,
          13,
          15,
          7,
          12,
          8,
          9,
          11,
          7,
          7,
          12,
          7,
          6,
          15,
          13,
          11,
          9,
          7,
          15,
          11,
          8,
          6,
          6,
          14,
          12,
          13,
          5,
          14,
          13,
          13,
          7,
          5,
          15,
          5,
          8,
          11,
          14,
          14,
          6,
          14,
          6,
          9,
          12,
          9,
          12,
          5,
          15,
          8,
          8,
          5,
          12,
          9,
          12,
          5,
          14,
          6,
          8,
          13,
          6,
          5,
          15,
          13,
          11,
          11
        ]), d = o.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), x = o.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), v = f.RIPEMD160 = c.extend({
          _doReset: function() {
            this._hash = o.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          },
          _doProcessBlock: function(B, A) {
            for (var D = 0; D < 16; D++) {
              var H = A + D, y = B[H];
              B[H] = (y << 8 | y >>> 24) & 16711935 | (y << 24 | y >>> 8) & 4278255360;
            }
            var E = this._hash.words, $ = d.words, T = x.words, F = a.words, S = l.words, k = p.words, W = h.words, O, M, L, R, z, P, I, Y, G, X;
            P = O = E[0], I = M = E[1], Y = L = E[2], G = R = E[3], X = z = E[4];
            for (var q, D = 0; D < 80; D += 1)
              q = O + B[A + F[D]] | 0, D < 16 ? q += _(M, L, R) + $[0] : D < 32 ? q += b(M, L, R) + $[1] : D < 48 ? q += u(M, L, R) + $[2] : D < 64 ? q += g(M, L, R) + $[3] : q += C(M, L, R) + $[4], q = q | 0, q = m(q, k[D]), q = q + z | 0, O = z, z = R, R = m(L, 10), L = M, M = q, q = P + B[A + S[D]] | 0, D < 16 ? q += C(I, Y, G) + T[0] : D < 32 ? q += g(I, Y, G) + T[1] : D < 48 ? q += u(I, Y, G) + T[2] : D < 64 ? q += b(I, Y, G) + T[3] : q += _(I, Y, G) + T[4], q = q | 0, q = m(q, W[D]), q = q + X | 0, P = X, X = G, G = m(Y, 10), Y = I, I = q;
            q = E[1] + L + G | 0, E[1] = E[2] + R + X | 0, E[2] = E[3] + z + P | 0, E[3] = E[4] + O + I | 0, E[4] = E[0] + M + Y | 0, E[0] = q;
          },
          _doFinalize: function() {
            var B = this._data, A = B.words, D = this._nDataBytes * 8, H = B.sigBytes * 8;
            A[H >>> 5] |= 128 << 24 - H % 32, A[(H + 64 >>> 9 << 4) + 14] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360, B.sigBytes = (A.length + 1) * 4, this._process();
            for (var y = this._hash, E = y.words, $ = 0; $ < 5; $++) {
              var T = E[$];
              E[$] = (T << 8 | T >>> 24) & 16711935 | (T << 24 | T >>> 8) & 4278255360;
            }
            return y;
          },
          clone: function() {
            var B = c.clone.call(this);
            return B._hash = this._hash.clone(), B;
          }
        });
        function _(B, A, D) {
          return B ^ A ^ D;
        }
        function b(B, A, D) {
          return B & A | ~B & D;
        }
        function u(B, A, D) {
          return (B | ~A) ^ D;
        }
        function g(B, A, D) {
          return B & D | A & ~D;
        }
        function C(B, A, D) {
          return B ^ (A | ~D);
        }
        function m(B, A) {
          return B << A | B >>> 32 - A;
        }
        s.RIPEMD160 = c._createHelper(v), s.HmacRIPEMD160 = c._createHmacHelper(v);
      }(), t.RIPEMD160;
    });
  }(ft)), ft.exports;
}
var xt = { exports: {} }, si = xt.exports, q0;
function a0() {
  return q0 || (q0 = 1, function(i, e) {
    (function(t, r) {
      i.exports = r(K());
    })(si, function(t) {
      (function() {
        var r = t, s = r.lib, n = s.Base, o = r.enc, c = o.Utf8, f = r.algo;
        f.HMAC = n.extend({
          /**
           * Initializes a newly created HMAC.
           *
           * @param {Hasher} hasher The hash algorithm to use.
           * @param {WordArray|string} key The secret key.
           *
           * @example
           *
           *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
           */
          init: function(a, l) {
            a = this._hasher = new a.init(), typeof l == "string" && (l = c.parse(l));
            var p = a.blockSize, h = p * 4;
            l.sigBytes > h && (l = a.finalize(l)), l.clamp();
            for (var d = this._oKey = l.clone(), x = this._iKey = l.clone(), v = d.words, _ = x.words, b = 0; b < p; b++)
              v[b] ^= 1549556828, _[b] ^= 909522486;
            d.sigBytes = x.sigBytes = h, this.reset();
          },
          /**
           * Resets this HMAC to its initial state.
           *
           * @example
           *
           *     hmacHasher.reset();
           */
          reset: function() {
            var a = this._hasher;
            a.reset(), a.update(this._iKey);
          },
          /**
           * Updates this HMAC with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {HMAC} This HMAC instance.
           *
           * @example
           *
           *     hmacHasher.update('message');
           *     hmacHasher.update(wordArray);
           */
          update: function(a) {
            return this._hasher.update(a), this;
          },
          /**
           * Finalizes the HMAC computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The HMAC.
           *
           * @example
           *
           *     var hmac = hmacHasher.finalize();
           *     var hmac = hmacHasher.finalize('message');
           *     var hmac = hmacHasher.finalize(wordArray);
           */
          finalize: function(a) {
            var l = this._hasher, p = l.finalize(a);
            l.reset();
            var h = l.finalize(this._oKey.clone().concat(p));
            return h;
          }
        });
      })();
    });
  }(xt)), xt.exports;
}
var dt = { exports: {} }, ii = dt.exports, j0;
function ni() {
  return j0 || (j0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), o0(), a0());
    })(ii, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.Base, o = s.WordArray, c = r.algo, f = c.SHA256, a = c.HMAC, l = c.PBKDF2 = n.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hasher to use. Default: SHA256
           * @property {number} iterations The number of iterations to perform. Default: 250000
           */
          cfg: n.extend({
            keySize: 128 / 32,
            hasher: f,
            iterations: 25e4
          }),
          /**
           * Initializes a newly created key derivation function.
           *
           * @param {Object} cfg (Optional) The configuration options to use for the derivation.
           *
           * @example
           *
           *     var kdf = CryptoJS.algo.PBKDF2.create();
           *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
           *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
           */
          init: function(p) {
            this.cfg = this.cfg.extend(p);
          },
          /**
           * Computes the Password-Based Key Derivation Function 2.
           *
           * @param {WordArray|string} password The password.
           * @param {WordArray|string} salt A salt.
           *
           * @return {WordArray} The derived key.
           *
           * @example
           *
           *     var key = kdf.compute(password, salt);
           */
          compute: function(p, h) {
            for (var d = this.cfg, x = a.create(d.hasher, p), v = o.create(), _ = o.create([1]), b = v.words, u = _.words, g = d.keySize, C = d.iterations; b.length < g; ) {
              var m = x.update(h).finalize(_);
              x.reset();
              for (var B = m.words, A = B.length, D = m, H = 1; H < C; H++) {
                D = x.finalize(D), x.reset();
                for (var y = D.words, E = 0; E < A; E++)
                  B[E] ^= y[E];
              }
              v.concat(m), u[0]++;
            }
            return v.sigBytes = g * 4, v;
          }
        });
        r.PBKDF2 = function(p, h, d) {
          return l.create(d).compute(p, h);
        };
      }(), t.PBKDF2;
    });
  }(dt)), dt.exports;
}
var ut = { exports: {} }, oi = ut.exports, V0;
function ge() {
  return V0 || (V0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Hr(), a0());
    })(oi, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.Base, o = s.WordArray, c = r.algo, f = c.MD5, a = c.EvpKDF = n.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hash algorithm to use. Default: MD5
           * @property {number} iterations The number of iterations to perform. Default: 1
           */
          cfg: n.extend({
            keySize: 128 / 32,
            hasher: f,
            iterations: 1
          }),
          /**
           * Initializes a newly created key derivation function.
           *
           * @param {Object} cfg (Optional) The configuration options to use for the derivation.
           *
           * @example
           *
           *     var kdf = CryptoJS.algo.EvpKDF.create();
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
           */
          init: function(l) {
            this.cfg = this.cfg.extend(l);
          },
          /**
           * Derives a key from a password.
           *
           * @param {WordArray|string} password The password.
           * @param {WordArray|string} salt A salt.
           *
           * @return {WordArray} The derived key.
           *
           * @example
           *
           *     var key = kdf.compute(password, salt);
           */
          compute: function(l, p) {
            for (var h, d = this.cfg, x = d.hasher.create(), v = o.create(), _ = v.words, b = d.keySize, u = d.iterations; _.length < b; ) {
              h && x.update(h), h = x.update(l).finalize(p), x.reset();
              for (var g = 1; g < u; g++)
                h = x.finalize(h), x.reset();
              v.concat(h);
            }
            return v.sigBytes = b * 4, v;
          }
        });
        r.EvpKDF = function(l, p, h) {
          return a.create(h).compute(l, p);
        };
      }(), t.EvpKDF;
    });
  }(ut)), ut.exports;
}
var pt = { exports: {} }, ai = pt.exports, Y0;
function Q() {
  return Y0 || (Y0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), ge());
    })(ai, function(t) {
      t.lib.Cipher || function(r) {
        var s = t, n = s.lib, o = n.Base, c = n.WordArray, f = n.BufferedBlockAlgorithm, a = s.enc;
        a.Utf8;
        var l = a.Base64, p = s.algo, h = p.EvpKDF, d = n.Cipher = f.extend({
          /**
           * Configuration options.
           *
           * @property {WordArray} iv The IV to use for this operation.
           */
          cfg: o.extend(),
          /**
           * Creates this cipher in encryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
           */
          createEncryptor: function(y, E) {
            return this.create(this._ENC_XFORM_MODE, y, E);
          },
          /**
           * Creates this cipher in decryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
           */
          createDecryptor: function(y, E) {
            return this.create(this._DEC_XFORM_MODE, y, E);
          },
          /**
           * Initializes a newly created cipher.
           *
           * @param {number} xformMode Either the encryption or decryption transormation mode constant.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
           */
          init: function(y, E, $) {
            this.cfg = this.cfg.extend($), this._xformMode = y, this._key = E, this.reset();
          },
          /**
           * Resets this cipher to its initial state.
           *
           * @example
           *
           *     cipher.reset();
           */
          reset: function() {
            f.reset.call(this), this._doReset();
          },
          /**
           * Adds data to be encrypted or decrypted.
           *
           * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
           *
           * @return {WordArray} The data after processing.
           *
           * @example
           *
           *     var encrypted = cipher.process('data');
           *     var encrypted = cipher.process(wordArray);
           */
          process: function(y) {
            return this._append(y), this._process();
          },
          /**
           * Finalizes the encryption or decryption process.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
           *
           * @return {WordArray} The data after final processing.
           *
           * @example
           *
           *     var encrypted = cipher.finalize();
           *     var encrypted = cipher.finalize('data');
           *     var encrypted = cipher.finalize(wordArray);
           */
          finalize: function(y) {
            y && this._append(y);
            var E = this._doFinalize();
            return E;
          },
          keySize: 128 / 32,
          ivSize: 128 / 32,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          /**
           * Creates shortcut functions to a cipher's object interface.
           *
           * @param {Cipher} cipher The cipher to create a helper for.
           *
           * @return {Object} An object with encrypt and decrypt shortcut functions.
           *
           * @static
           *
           * @example
           *
           *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
           */
          _createHelper: /* @__PURE__ */ function() {
            function y(E) {
              return typeof E == "string" ? H : B;
            }
            return function(E) {
              return {
                encrypt: function($, T, F) {
                  return y(T).encrypt(E, $, T, F);
                },
                decrypt: function($, T, F) {
                  return y(T).decrypt(E, $, T, F);
                }
              };
            };
          }()
        });
        n.StreamCipher = d.extend({
          _doFinalize: function() {
            var y = this._process(!0);
            return y;
          },
          blockSize: 1
        });
        var x = s.mode = {}, v = n.BlockCipherMode = o.extend({
          /**
           * Creates this mode for encryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
           */
          createEncryptor: function(y, E) {
            return this.Encryptor.create(y, E);
          },
          /**
           * Creates this mode for decryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
           */
          createDecryptor: function(y, E) {
            return this.Decryptor.create(y, E);
          },
          /**
           * Initializes a newly created mode.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
           */
          init: function(y, E) {
            this._cipher = y, this._iv = E;
          }
        }), _ = x.CBC = function() {
          var y = v.extend();
          y.Encryptor = y.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function($, T) {
              var F = this._cipher, S = F.blockSize;
              E.call(this, $, T, S), F.encryptBlock($, T), this._prevBlock = $.slice(T, T + S);
            }
          }), y.Decryptor = y.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function($, T) {
              var F = this._cipher, S = F.blockSize, k = $.slice(T, T + S);
              F.decryptBlock($, T), E.call(this, $, T, S), this._prevBlock = k;
            }
          });
          function E($, T, F) {
            var S, k = this._iv;
            k ? (S = k, this._iv = r) : S = this._prevBlock;
            for (var W = 0; W < F; W++)
              $[T + W] ^= S[W];
          }
          return y;
        }(), b = s.pad = {}, u = b.Pkcs7 = {
          /**
           * Pads data using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to pad.
           * @param {number} blockSize The multiple that the data should be padded to.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
           */
          pad: function(y, E) {
            for (var $ = E * 4, T = $ - y.sigBytes % $, F = T << 24 | T << 16 | T << 8 | T, S = [], k = 0; k < T; k += 4)
              S.push(F);
            var W = c.create(S, T);
            y.concat(W);
          },
          /**
           * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to unpad.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.unpad(wordArray);
           */
          unpad: function(y) {
            var E = y.words[y.sigBytes - 1 >>> 2] & 255;
            y.sigBytes -= E;
          }
        };
        n.BlockCipher = d.extend({
          /**
           * Configuration options.
           *
           * @property {Mode} mode The block mode to use. Default: CBC
           * @property {Padding} padding The padding strategy to use. Default: Pkcs7
           */
          cfg: d.cfg.extend({
            mode: _,
            padding: u
          }),
          reset: function() {
            var y;
            d.reset.call(this);
            var E = this.cfg, $ = E.iv, T = E.mode;
            this._xformMode == this._ENC_XFORM_MODE ? y = T.createEncryptor : (y = T.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == y ? this._mode.init(this, $ && $.words) : (this._mode = y.call(T, this, $ && $.words), this._mode.__creator = y);
          },
          _doProcessBlock: function(y, E) {
            this._mode.processBlock(y, E);
          },
          _doFinalize: function() {
            var y, E = this.cfg.padding;
            return this._xformMode == this._ENC_XFORM_MODE ? (E.pad(this._data, this.blockSize), y = this._process(!0)) : (y = this._process(!0), E.unpad(y)), y;
          },
          blockSize: 128 / 32
        });
        var g = n.CipherParams = o.extend({
          /**
           * Initializes a newly created cipher params object.
           *
           * @param {Object} cipherParams An object with any of the possible cipher parameters.
           *
           * @example
           *
           *     var cipherParams = CryptoJS.lib.CipherParams.create({
           *         ciphertext: ciphertextWordArray,
           *         key: keyWordArray,
           *         iv: ivWordArray,
           *         salt: saltWordArray,
           *         algorithm: CryptoJS.algo.AES,
           *         mode: CryptoJS.mode.CBC,
           *         padding: CryptoJS.pad.PKCS7,
           *         blockSize: 4,
           *         formatter: CryptoJS.format.OpenSSL
           *     });
           */
          init: function(y) {
            this.mixIn(y);
          },
          /**
           * Converts this cipher params object to a string.
           *
           * @param {Format} formatter (Optional) The formatting strategy to use.
           *
           * @return {string} The stringified cipher params.
           *
           * @throws Error If neither the formatter nor the default formatter is set.
           *
           * @example
           *
           *     var string = cipherParams + '';
           *     var string = cipherParams.toString();
           *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
           */
          toString: function(y) {
            return (y || this.formatter).stringify(this);
          }
        }), C = s.format = {}, m = C.OpenSSL = {
          /**
           * Converts a cipher params object to an OpenSSL-compatible string.
           *
           * @param {CipherParams} cipherParams The cipher params object.
           *
           * @return {string} The OpenSSL-compatible string.
           *
           * @static
           *
           * @example
           *
           *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
           */
          stringify: function(y) {
            var E, $ = y.ciphertext, T = y.salt;
            return T ? E = c.create([1398893684, 1701076831]).concat(T).concat($) : E = $, E.toString(l);
          },
          /**
           * Converts an OpenSSL-compatible string to a cipher params object.
           *
           * @param {string} openSSLStr The OpenSSL-compatible string.
           *
           * @return {CipherParams} The cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
           */
          parse: function(y) {
            var E, $ = l.parse(y), T = $.words;
            return T[0] == 1398893684 && T[1] == 1701076831 && (E = c.create(T.slice(2, 4)), T.splice(0, 4), $.sigBytes -= 16), g.create({ ciphertext: $, salt: E });
          }
        }, B = n.SerializableCipher = o.extend({
          /**
           * Configuration options.
           *
           * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
           */
          cfg: o.extend({
            format: m
          }),
          /**
           * Encrypts a message.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(y, E, $, T) {
            T = this.cfg.extend(T);
            var F = y.createEncryptor($, T), S = F.finalize(E), k = F.cfg;
            return g.create({
              ciphertext: S,
              key: $,
              iv: k.iv,
              algorithm: y,
              mode: k.mode,
              padding: k.padding,
              blockSize: y.blockSize,
              formatter: T.format
            });
          },
          /**
           * Decrypts serialized ciphertext.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(y, E, $, T) {
            T = this.cfg.extend(T), E = this._parse(E, T.format);
            var F = y.createDecryptor($, T).finalize(E.ciphertext);
            return F;
          },
          /**
           * Converts serialized ciphertext to CipherParams,
           * else assumed CipherParams already and returns ciphertext unchanged.
           *
           * @param {CipherParams|string} ciphertext The ciphertext.
           * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
           *
           * @return {CipherParams} The unserialized ciphertext.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
           */
          _parse: function(y, E) {
            return typeof y == "string" ? E.parse(y, this) : y;
          }
        }), A = s.kdf = {}, D = A.OpenSSL = {
          /**
           * Derives a key and IV from a password.
           *
           * @param {string} password The password to derive from.
           * @param {number} keySize The size in words of the key to generate.
           * @param {number} ivSize The size in words of the IV to generate.
           * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
           *
           * @return {CipherParams} A cipher params object with the key, IV, and salt.
           *
           * @static
           *
           * @example
           *
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
           */
          execute: function(y, E, $, T, F) {
            if (T || (T = c.random(64 / 8)), F)
              var S = h.create({ keySize: E + $, hasher: F }).compute(y, T);
            else
              var S = h.create({ keySize: E + $ }).compute(y, T);
            var k = c.create(S.words.slice(E), $ * 4);
            return S.sigBytes = E * 4, g.create({ key: S, iv: k, salt: T });
          }
        }, H = n.PasswordBasedCipher = B.extend({
          /**
           * Configuration options.
           *
           * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
           */
          cfg: B.cfg.extend({
            kdf: D
          }),
          /**
           * Encrypts a message using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(y, E, $, T) {
            T = this.cfg.extend(T);
            var F = T.kdf.execute($, y.keySize, y.ivSize, T.salt, T.hasher);
            T.iv = F.iv;
            var S = B.encrypt.call(this, y, E, F.key, T);
            return S.mixIn(F), S;
          },
          /**
           * Decrypts serialized ciphertext using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(y, E, $, T) {
            T = this.cfg.extend(T), E = this._parse(E, T.format);
            var F = T.kdf.execute($, y.keySize, y.ivSize, E.salt, T.hasher);
            T.iv = F.iv;
            var S = B.decrypt.call(this, y, E, F.key, T);
            return S;
          }
        });
      }();
    });
  }(pt)), pt.exports;
}
var _t = { exports: {} }, li = _t.exports, U0;
function ci() {
  return U0 || (U0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Q());
    })(li, function(t) {
      return t.mode.CFB = function() {
        var r = t.lib.BlockCipherMode.extend();
        r.Encryptor = r.extend({
          processBlock: function(n, o) {
            var c = this._cipher, f = c.blockSize;
            s.call(this, n, o, f, c), this._prevBlock = n.slice(o, o + f);
          }
        }), r.Decryptor = r.extend({
          processBlock: function(n, o) {
            var c = this._cipher, f = c.blockSize, a = n.slice(o, o + f);
            s.call(this, n, o, f, c), this._prevBlock = a;
          }
        });
        function s(n, o, c, f) {
          var a, l = this._iv;
          l ? (a = l.slice(0), this._iv = void 0) : a = this._prevBlock, f.encryptBlock(a, 0);
          for (var p = 0; p < c; p++)
            n[o + p] ^= a[p];
        }
        return r;
      }(), t.mode.CFB;
    });
  }(_t)), _t.exports;
}
var vt = { exports: {} }, hi = vt.exports, K0;
function fi() {
  return K0 || (K0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Q());
    })(hi, function(t) {
      return t.mode.CTR = function() {
        var r = t.lib.BlockCipherMode.extend(), s = r.Encryptor = r.extend({
          processBlock: function(n, o) {
            var c = this._cipher, f = c.blockSize, a = this._iv, l = this._counter;
            a && (l = this._counter = a.slice(0), this._iv = void 0);
            var p = l.slice(0);
            c.encryptBlock(p, 0), l[f - 1] = l[f - 1] + 1 | 0;
            for (var h = 0; h < f; h++)
              n[o + h] ^= p[h];
          }
        });
        return r.Decryptor = s, r;
      }(), t.mode.CTR;
    });
  }(vt)), vt.exports;
}
var gt = { exports: {} }, xi = gt.exports, G0;
function di() {
  return G0 || (G0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Q());
    })(xi, function(t) {
      /** @preserve
       * Counter block mode compatible with  Dr Brian Gladman fileenc.c
       * derived from CryptoJS.mode.CTR
       * Jan Hruby jhruby.web@gmail.com
       */
      return t.mode.CTRGladman = function() {
        var r = t.lib.BlockCipherMode.extend();
        function s(c) {
          if ((c >> 24 & 255) === 255) {
            var f = c >> 16 & 255, a = c >> 8 & 255, l = c & 255;
            f === 255 ? (f = 0, a === 255 ? (a = 0, l === 255 ? l = 0 : ++l) : ++a) : ++f, c = 0, c += f << 16, c += a << 8, c += l;
          } else
            c += 1 << 24;
          return c;
        }
        function n(c) {
          return (c[0] = s(c[0])) === 0 && (c[1] = s(c[1])), c;
        }
        var o = r.Encryptor = r.extend({
          processBlock: function(c, f) {
            var a = this._cipher, l = a.blockSize, p = this._iv, h = this._counter;
            p && (h = this._counter = p.slice(0), this._iv = void 0), n(h);
            var d = h.slice(0);
            a.encryptBlock(d, 0);
            for (var x = 0; x < l; x++)
              c[f + x] ^= d[x];
          }
        });
        return r.Decryptor = o, r;
      }(), t.mode.CTRGladman;
    });
  }(gt)), gt.exports;
}
var Ct = { exports: {} }, ui = Ct.exports, X0;
function pi() {
  return X0 || (X0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Q());
    })(ui, function(t) {
      return t.mode.OFB = function() {
        var r = t.lib.BlockCipherMode.extend(), s = r.Encryptor = r.extend({
          processBlock: function(n, o) {
            var c = this._cipher, f = c.blockSize, a = this._iv, l = this._keystream;
            a && (l = this._keystream = a.slice(0), this._iv = void 0), c.encryptBlock(l, 0);
            for (var p = 0; p < f; p++)
              n[o + p] ^= l[p];
          }
        });
        return r.Decryptor = s, r;
      }(), t.mode.OFB;
    });
  }(Ct)), Ct.exports;
}
var wt = { exports: {} }, _i = wt.exports, Z0;
function vi() {
  return Z0 || (Z0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Q());
    })(_i, function(t) {
      return t.mode.ECB = function() {
        var r = t.lib.BlockCipherMode.extend();
        return r.Encryptor = r.extend({
          processBlock: function(s, n) {
            this._cipher.encryptBlock(s, n);
          }
        }), r.Decryptor = r.extend({
          processBlock: function(s, n) {
            this._cipher.decryptBlock(s, n);
          }
        }), r;
      }(), t.mode.ECB;
    });
  }(wt)), wt.exports;
}
var bt = { exports: {} }, gi = bt.exports, Q0;
function Ci() {
  return Q0 || (Q0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Q());
    })(gi, function(t) {
      return t.pad.AnsiX923 = {
        pad: function(r, s) {
          var n = r.sigBytes, o = s * 4, c = o - n % o, f = n + c - 1;
          r.clamp(), r.words[f >>> 2] |= c << 24 - f % 4 * 8, r.sigBytes += c;
        },
        unpad: function(r) {
          var s = r.words[r.sigBytes - 1 >>> 2] & 255;
          r.sigBytes -= s;
        }
      }, t.pad.Ansix923;
    });
  }(bt)), bt.exports;
}
var mt = { exports: {} }, wi = mt.exports, J0;
function bi() {
  return J0 || (J0 = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Q());
    })(wi, function(t) {
      return t.pad.Iso10126 = {
        pad: function(r, s) {
          var n = s * 4, o = n - r.sigBytes % n;
          r.concat(t.lib.WordArray.random(o - 1)).concat(t.lib.WordArray.create([o << 24], 1));
        },
        unpad: function(r) {
          var s = r.words[r.sigBytes - 1 >>> 2] & 255;
          r.sigBytes -= s;
        }
      }, t.pad.Iso10126;
    });
  }(mt)), mt.exports;
}
var yt = { exports: {} }, mi = yt.exports, er;
function yi() {
  return er || (er = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Q());
    })(mi, function(t) {
      return t.pad.Iso97971 = {
        pad: function(r, s) {
          r.concat(t.lib.WordArray.create([2147483648], 1)), t.pad.ZeroPadding.pad(r, s);
        },
        unpad: function(r) {
          t.pad.ZeroPadding.unpad(r), r.sigBytes--;
        }
      }, t.pad.Iso97971;
    });
  }(yt)), yt.exports;
}
var Bt = { exports: {} }, Bi = Bt.exports, tr;
function Ei() {
  return tr || (tr = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Q());
    })(Bi, function(t) {
      return t.pad.ZeroPadding = {
        pad: function(r, s) {
          var n = s * 4;
          r.clamp(), r.sigBytes += n - (r.sigBytes % n || n);
        },
        unpad: function(r) {
          for (var s = r.words, n = r.sigBytes - 1, n = r.sigBytes - 1; n >= 0; n--)
            if (s[n >>> 2] >>> 24 - n % 4 * 8 & 255) {
              r.sigBytes = n + 1;
              break;
            }
        }
      }, t.pad.ZeroPadding;
    });
  }(Bt)), Bt.exports;
}
var Et = { exports: {} }, Ai = Et.exports, rr;
function Di() {
  return rr || (rr = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Q());
    })(Ai, function(t) {
      return t.pad.NoPadding = {
        pad: function() {
        },
        unpad: function() {
        }
      }, t.pad.NoPadding;
    });
  }(Et)), Et.exports;
}
var At = { exports: {} }, Fi = At.exports, sr;
function Ri() {
  return sr || (sr = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Q());
    })(Fi, function(t) {
      return function(r) {
        var s = t, n = s.lib, o = n.CipherParams, c = s.enc, f = c.Hex, a = s.format;
        a.Hex = {
          /**
           * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
           *
           * @param {CipherParams} cipherParams The cipher params object.
           *
           * @return {string} The hexadecimally encoded string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
           */
          stringify: function(l) {
            return l.ciphertext.toString(f);
          },
          /**
           * Converts a hexadecimally encoded ciphertext string to a cipher params object.
           *
           * @param {string} input The hexadecimally encoded string.
           *
           * @return {CipherParams} The cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
           */
          parse: function(l) {
            var p = f.parse(l);
            return o.create({ ciphertext: p });
          }
        };
      }(), t.format.Hex;
    });
  }(At)), At.exports;
}
var Dt = { exports: {} }, Si = Dt.exports, ir;
function ki() {
  return ir || (ir = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), be(), me(), ge(), Q());
    })(Si, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.BlockCipher, o = r.algo, c = [], f = [], a = [], l = [], p = [], h = [], d = [], x = [], v = [], _ = [];
        (function() {
          for (var g = [], C = 0; C < 256; C++)
            C < 128 ? g[C] = C << 1 : g[C] = C << 1 ^ 283;
          for (var m = 0, B = 0, C = 0; C < 256; C++) {
            var A = B ^ B << 1 ^ B << 2 ^ B << 3 ^ B << 4;
            A = A >>> 8 ^ A & 255 ^ 99, c[m] = A, f[A] = m;
            var D = g[m], H = g[D], y = g[H], E = g[A] * 257 ^ A * 16843008;
            a[m] = E << 24 | E >>> 8, l[m] = E << 16 | E >>> 16, p[m] = E << 8 | E >>> 24, h[m] = E;
            var E = y * 16843009 ^ H * 65537 ^ D * 257 ^ m * 16843008;
            d[A] = E << 24 | E >>> 8, x[A] = E << 16 | E >>> 16, v[A] = E << 8 | E >>> 24, _[A] = E, m ? (m = D ^ g[g[g[y ^ D]]], B ^= g[g[B]]) : m = B = 1;
          }
        })();
        var b = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], u = o.AES = n.extend({
          _doReset: function() {
            var g;
            if (!(this._nRounds && this._keyPriorReset === this._key)) {
              for (var C = this._keyPriorReset = this._key, m = C.words, B = C.sigBytes / 4, A = this._nRounds = B + 6, D = (A + 1) * 4, H = this._keySchedule = [], y = 0; y < D; y++)
                y < B ? H[y] = m[y] : (g = H[y - 1], y % B ? B > 6 && y % B == 4 && (g = c[g >>> 24] << 24 | c[g >>> 16 & 255] << 16 | c[g >>> 8 & 255] << 8 | c[g & 255]) : (g = g << 8 | g >>> 24, g = c[g >>> 24] << 24 | c[g >>> 16 & 255] << 16 | c[g >>> 8 & 255] << 8 | c[g & 255], g ^= b[y / B | 0] << 24), H[y] = H[y - B] ^ g);
              for (var E = this._invKeySchedule = [], $ = 0; $ < D; $++) {
                var y = D - $;
                if ($ % 4)
                  var g = H[y];
                else
                  var g = H[y - 4];
                $ < 4 || y <= 4 ? E[$] = g : E[$] = d[c[g >>> 24]] ^ x[c[g >>> 16 & 255]] ^ v[c[g >>> 8 & 255]] ^ _[c[g & 255]];
              }
            }
          },
          encryptBlock: function(g, C) {
            this._doCryptBlock(g, C, this._keySchedule, a, l, p, h, c);
          },
          decryptBlock: function(g, C) {
            var m = g[C + 1];
            g[C + 1] = g[C + 3], g[C + 3] = m, this._doCryptBlock(g, C, this._invKeySchedule, d, x, v, _, f);
            var m = g[C + 1];
            g[C + 1] = g[C + 3], g[C + 3] = m;
          },
          _doCryptBlock: function(g, C, m, B, A, D, H, y) {
            for (var E = this._nRounds, $ = g[C] ^ m[0], T = g[C + 1] ^ m[1], F = g[C + 2] ^ m[2], S = g[C + 3] ^ m[3], k = 4, W = 1; W < E; W++) {
              var O = B[$ >>> 24] ^ A[T >>> 16 & 255] ^ D[F >>> 8 & 255] ^ H[S & 255] ^ m[k++], M = B[T >>> 24] ^ A[F >>> 16 & 255] ^ D[S >>> 8 & 255] ^ H[$ & 255] ^ m[k++], L = B[F >>> 24] ^ A[S >>> 16 & 255] ^ D[$ >>> 8 & 255] ^ H[T & 255] ^ m[k++], R = B[S >>> 24] ^ A[$ >>> 16 & 255] ^ D[T >>> 8 & 255] ^ H[F & 255] ^ m[k++];
              $ = O, T = M, F = L, S = R;
            }
            var O = (y[$ >>> 24] << 24 | y[T >>> 16 & 255] << 16 | y[F >>> 8 & 255] << 8 | y[S & 255]) ^ m[k++], M = (y[T >>> 24] << 24 | y[F >>> 16 & 255] << 16 | y[S >>> 8 & 255] << 8 | y[$ & 255]) ^ m[k++], L = (y[F >>> 24] << 24 | y[S >>> 16 & 255] << 16 | y[$ >>> 8 & 255] << 8 | y[T & 255]) ^ m[k++], R = (y[S >>> 24] << 24 | y[$ >>> 16 & 255] << 16 | y[T >>> 8 & 255] << 8 | y[F & 255]) ^ m[k++];
            g[C] = O, g[C + 1] = M, g[C + 2] = L, g[C + 3] = R;
          },
          keySize: 256 / 32
        });
        r.AES = n._createHelper(u);
      }(), t.AES;
    });
  }(Dt)), Dt.exports;
}
var Ft = { exports: {} }, Hi = Ft.exports, nr;
function $i() {
  return nr || (nr = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), be(), me(), ge(), Q());
    })(Hi, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.WordArray, o = s.BlockCipher, c = r.algo, f = [
          57,
          49,
          41,
          33,
          25,
          17,
          9,
          1,
          58,
          50,
          42,
          34,
          26,
          18,
          10,
          2,
          59,
          51,
          43,
          35,
          27,
          19,
          11,
          3,
          60,
          52,
          44,
          36,
          63,
          55,
          47,
          39,
          31,
          23,
          15,
          7,
          62,
          54,
          46,
          38,
          30,
          22,
          14,
          6,
          61,
          53,
          45,
          37,
          29,
          21,
          13,
          5,
          28,
          20,
          12,
          4
        ], a = [
          14,
          17,
          11,
          24,
          1,
          5,
          3,
          28,
          15,
          6,
          21,
          10,
          23,
          19,
          12,
          4,
          26,
          8,
          16,
          7,
          27,
          20,
          13,
          2,
          41,
          52,
          31,
          37,
          47,
          55,
          30,
          40,
          51,
          45,
          33,
          48,
          44,
          49,
          39,
          56,
          34,
          53,
          46,
          42,
          50,
          36,
          29,
          32
        ], l = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], p = [
          {
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378
          },
          {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672
          },
          {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792
          },
          {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464
          },
          {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040
          },
          {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656
          },
          {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577
          },
          {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848
          }
        ], h = [
          4160749569,
          528482304,
          33030144,
          2064384,
          129024,
          8064,
          504,
          2147483679
        ], d = c.DES = o.extend({
          _doReset: function() {
            for (var b = this._key, u = b.words, g = [], C = 0; C < 56; C++) {
              var m = f[C] - 1;
              g[C] = u[m >>> 5] >>> 31 - m % 32 & 1;
            }
            for (var B = this._subKeys = [], A = 0; A < 16; A++) {
              for (var D = B[A] = [], H = l[A], C = 0; C < 24; C++)
                D[C / 6 | 0] |= g[(a[C] - 1 + H) % 28] << 31 - C % 6, D[4 + (C / 6 | 0)] |= g[28 + (a[C + 24] - 1 + H) % 28] << 31 - C % 6;
              D[0] = D[0] << 1 | D[0] >>> 31;
              for (var C = 1; C < 7; C++)
                D[C] = D[C] >>> (C - 1) * 4 + 3;
              D[7] = D[7] << 5 | D[7] >>> 27;
            }
            for (var y = this._invSubKeys = [], C = 0; C < 16; C++)
              y[C] = B[15 - C];
          },
          encryptBlock: function(b, u) {
            this._doCryptBlock(b, u, this._subKeys);
          },
          decryptBlock: function(b, u) {
            this._doCryptBlock(b, u, this._invSubKeys);
          },
          _doCryptBlock: function(b, u, g) {
            this._lBlock = b[u], this._rBlock = b[u + 1], x.call(this, 4, 252645135), x.call(this, 16, 65535), v.call(this, 2, 858993459), v.call(this, 8, 16711935), x.call(this, 1, 1431655765);
            for (var C = 0; C < 16; C++) {
              for (var m = g[C], B = this._lBlock, A = this._rBlock, D = 0, H = 0; H < 8; H++)
                D |= p[H][((A ^ m[H]) & h[H]) >>> 0];
              this._lBlock = A, this._rBlock = B ^ D;
            }
            var y = this._lBlock;
            this._lBlock = this._rBlock, this._rBlock = y, x.call(this, 1, 1431655765), v.call(this, 8, 16711935), v.call(this, 2, 858993459), x.call(this, 16, 65535), x.call(this, 4, 252645135), b[u] = this._lBlock, b[u + 1] = this._rBlock;
          },
          keySize: 64 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        function x(b, u) {
          var g = (this._lBlock >>> b ^ this._rBlock) & u;
          this._rBlock ^= g, this._lBlock ^= g << b;
        }
        function v(b, u) {
          var g = (this._rBlock >>> b ^ this._lBlock) & u;
          this._lBlock ^= g, this._rBlock ^= g << b;
        }
        r.DES = o._createHelper(d);
        var _ = c.TripleDES = o.extend({
          _doReset: function() {
            var b = this._key, u = b.words;
            if (u.length !== 2 && u.length !== 4 && u.length < 6)
              throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            var g = u.slice(0, 2), C = u.length < 4 ? u.slice(0, 2) : u.slice(2, 4), m = u.length < 6 ? u.slice(0, 2) : u.slice(4, 6);
            this._des1 = d.createEncryptor(n.create(g)), this._des2 = d.createEncryptor(n.create(C)), this._des3 = d.createEncryptor(n.create(m));
          },
          encryptBlock: function(b, u) {
            this._des1.encryptBlock(b, u), this._des2.decryptBlock(b, u), this._des3.encryptBlock(b, u);
          },
          decryptBlock: function(b, u) {
            this._des3.decryptBlock(b, u), this._des2.encryptBlock(b, u), this._des1.decryptBlock(b, u);
          },
          keySize: 192 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        r.TripleDES = o._createHelper(_);
      }(), t.TripleDES;
    });
  }(Ft)), Ft.exports;
}
var Rt = { exports: {} }, Ti = Rt.exports, or;
function zi() {
  return or || (or = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), be(), me(), ge(), Q());
    })(Ti, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.StreamCipher, o = r.algo, c = o.RC4 = n.extend({
          _doReset: function() {
            for (var l = this._key, p = l.words, h = l.sigBytes, d = this._S = [], x = 0; x < 256; x++)
              d[x] = x;
            for (var x = 0, v = 0; x < 256; x++) {
              var _ = x % h, b = p[_ >>> 2] >>> 24 - _ % 4 * 8 & 255;
              v = (v + d[x] + b) % 256;
              var u = d[x];
              d[x] = d[v], d[v] = u;
            }
            this._i = this._j = 0;
          },
          _doProcessBlock: function(l, p) {
            l[p] ^= f.call(this);
          },
          keySize: 256 / 32,
          ivSize: 0
        });
        function f() {
          for (var l = this._S, p = this._i, h = this._j, d = 0, x = 0; x < 4; x++) {
            p = (p + 1) % 256, h = (h + l[p]) % 256;
            var v = l[p];
            l[p] = l[h], l[h] = v, d |= l[(l[p] + l[h]) % 256] << 24 - x * 8;
          }
          return this._i = p, this._j = h, d;
        }
        r.RC4 = n._createHelper(c);
        var a = o.RC4Drop = c.extend({
          /**
           * Configuration options.
           *
           * @property {number} drop The number of keystream words to drop. Default 192
           */
          cfg: c.cfg.extend({
            drop: 192
          }),
          _doReset: function() {
            c._doReset.call(this);
            for (var l = this.cfg.drop; l > 0; l--)
              f.call(this);
          }
        });
        r.RC4Drop = n._createHelper(a);
      }(), t.RC4;
    });
  }(Rt)), Rt.exports;
}
var St = { exports: {} }, Ii = St.exports, ar;
function Pi() {
  return ar || (ar = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), be(), me(), ge(), Q());
    })(Ii, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.StreamCipher, o = r.algo, c = [], f = [], a = [], l = o.Rabbit = n.extend({
          _doReset: function() {
            for (var h = this._key.words, d = this.cfg.iv, x = 0; x < 4; x++)
              h[x] = (h[x] << 8 | h[x] >>> 24) & 16711935 | (h[x] << 24 | h[x] >>> 8) & 4278255360;
            var v = this._X = [
              h[0],
              h[3] << 16 | h[2] >>> 16,
              h[1],
              h[0] << 16 | h[3] >>> 16,
              h[2],
              h[1] << 16 | h[0] >>> 16,
              h[3],
              h[2] << 16 | h[1] >>> 16
            ], _ = this._C = [
              h[2] << 16 | h[2] >>> 16,
              h[0] & 4294901760 | h[1] & 65535,
              h[3] << 16 | h[3] >>> 16,
              h[1] & 4294901760 | h[2] & 65535,
              h[0] << 16 | h[0] >>> 16,
              h[2] & 4294901760 | h[3] & 65535,
              h[1] << 16 | h[1] >>> 16,
              h[3] & 4294901760 | h[0] & 65535
            ];
            this._b = 0;
            for (var x = 0; x < 4; x++)
              p.call(this);
            for (var x = 0; x < 8; x++)
              _[x] ^= v[x + 4 & 7];
            if (d) {
              var b = d.words, u = b[0], g = b[1], C = (u << 8 | u >>> 24) & 16711935 | (u << 24 | u >>> 8) & 4278255360, m = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360, B = C >>> 16 | m & 4294901760, A = m << 16 | C & 65535;
              _[0] ^= C, _[1] ^= B, _[2] ^= m, _[3] ^= A, _[4] ^= C, _[5] ^= B, _[6] ^= m, _[7] ^= A;
              for (var x = 0; x < 4; x++)
                p.call(this);
            }
          },
          _doProcessBlock: function(h, d) {
            var x = this._X;
            p.call(this), c[0] = x[0] ^ x[5] >>> 16 ^ x[3] << 16, c[1] = x[2] ^ x[7] >>> 16 ^ x[5] << 16, c[2] = x[4] ^ x[1] >>> 16 ^ x[7] << 16, c[3] = x[6] ^ x[3] >>> 16 ^ x[1] << 16;
            for (var v = 0; v < 4; v++)
              c[v] = (c[v] << 8 | c[v] >>> 24) & 16711935 | (c[v] << 24 | c[v] >>> 8) & 4278255360, h[d + v] ^= c[v];
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function p() {
          for (var h = this._X, d = this._C, x = 0; x < 8; x++)
            f[x] = d[x];
          d[0] = d[0] + 1295307597 + this._b | 0, d[1] = d[1] + 3545052371 + (d[0] >>> 0 < f[0] >>> 0 ? 1 : 0) | 0, d[2] = d[2] + 886263092 + (d[1] >>> 0 < f[1] >>> 0 ? 1 : 0) | 0, d[3] = d[3] + 1295307597 + (d[2] >>> 0 < f[2] >>> 0 ? 1 : 0) | 0, d[4] = d[4] + 3545052371 + (d[3] >>> 0 < f[3] >>> 0 ? 1 : 0) | 0, d[5] = d[5] + 886263092 + (d[4] >>> 0 < f[4] >>> 0 ? 1 : 0) | 0, d[6] = d[6] + 1295307597 + (d[5] >>> 0 < f[5] >>> 0 ? 1 : 0) | 0, d[7] = d[7] + 3545052371 + (d[6] >>> 0 < f[6] >>> 0 ? 1 : 0) | 0, this._b = d[7] >>> 0 < f[7] >>> 0 ? 1 : 0;
          for (var x = 0; x < 8; x++) {
            var v = h[x] + d[x], _ = v & 65535, b = v >>> 16, u = ((_ * _ >>> 17) + _ * b >>> 15) + b * b, g = ((v & 4294901760) * v | 0) + ((v & 65535) * v | 0);
            a[x] = u ^ g;
          }
          h[0] = a[0] + (a[7] << 16 | a[7] >>> 16) + (a[6] << 16 | a[6] >>> 16) | 0, h[1] = a[1] + (a[0] << 8 | a[0] >>> 24) + a[7] | 0, h[2] = a[2] + (a[1] << 16 | a[1] >>> 16) + (a[0] << 16 | a[0] >>> 16) | 0, h[3] = a[3] + (a[2] << 8 | a[2] >>> 24) + a[1] | 0, h[4] = a[4] + (a[3] << 16 | a[3] >>> 16) + (a[2] << 16 | a[2] >>> 16) | 0, h[5] = a[5] + (a[4] << 8 | a[4] >>> 24) + a[3] | 0, h[6] = a[6] + (a[5] << 16 | a[5] >>> 16) + (a[4] << 16 | a[4] >>> 16) | 0, h[7] = a[7] + (a[6] << 8 | a[6] >>> 24) + a[5] | 0;
        }
        r.Rabbit = n._createHelper(l);
      }(), t.Rabbit;
    });
  }(St)), St.exports;
}
var kt = { exports: {} }, Oi = kt.exports, lr;
function Wi() {
  return lr || (lr = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), be(), me(), ge(), Q());
    })(Oi, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.StreamCipher, o = r.algo, c = [], f = [], a = [], l = o.RabbitLegacy = n.extend({
          _doReset: function() {
            var h = this._key.words, d = this.cfg.iv, x = this._X = [
              h[0],
              h[3] << 16 | h[2] >>> 16,
              h[1],
              h[0] << 16 | h[3] >>> 16,
              h[2],
              h[1] << 16 | h[0] >>> 16,
              h[3],
              h[2] << 16 | h[1] >>> 16
            ], v = this._C = [
              h[2] << 16 | h[2] >>> 16,
              h[0] & 4294901760 | h[1] & 65535,
              h[3] << 16 | h[3] >>> 16,
              h[1] & 4294901760 | h[2] & 65535,
              h[0] << 16 | h[0] >>> 16,
              h[2] & 4294901760 | h[3] & 65535,
              h[1] << 16 | h[1] >>> 16,
              h[3] & 4294901760 | h[0] & 65535
            ];
            this._b = 0;
            for (var _ = 0; _ < 4; _++)
              p.call(this);
            for (var _ = 0; _ < 8; _++)
              v[_] ^= x[_ + 4 & 7];
            if (d) {
              var b = d.words, u = b[0], g = b[1], C = (u << 8 | u >>> 24) & 16711935 | (u << 24 | u >>> 8) & 4278255360, m = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360, B = C >>> 16 | m & 4294901760, A = m << 16 | C & 65535;
              v[0] ^= C, v[1] ^= B, v[2] ^= m, v[3] ^= A, v[4] ^= C, v[5] ^= B, v[6] ^= m, v[7] ^= A;
              for (var _ = 0; _ < 4; _++)
                p.call(this);
            }
          },
          _doProcessBlock: function(h, d) {
            var x = this._X;
            p.call(this), c[0] = x[0] ^ x[5] >>> 16 ^ x[3] << 16, c[1] = x[2] ^ x[7] >>> 16 ^ x[5] << 16, c[2] = x[4] ^ x[1] >>> 16 ^ x[7] << 16, c[3] = x[6] ^ x[3] >>> 16 ^ x[1] << 16;
            for (var v = 0; v < 4; v++)
              c[v] = (c[v] << 8 | c[v] >>> 24) & 16711935 | (c[v] << 24 | c[v] >>> 8) & 4278255360, h[d + v] ^= c[v];
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function p() {
          for (var h = this._X, d = this._C, x = 0; x < 8; x++)
            f[x] = d[x];
          d[0] = d[0] + 1295307597 + this._b | 0, d[1] = d[1] + 3545052371 + (d[0] >>> 0 < f[0] >>> 0 ? 1 : 0) | 0, d[2] = d[2] + 886263092 + (d[1] >>> 0 < f[1] >>> 0 ? 1 : 0) | 0, d[3] = d[3] + 1295307597 + (d[2] >>> 0 < f[2] >>> 0 ? 1 : 0) | 0, d[4] = d[4] + 3545052371 + (d[3] >>> 0 < f[3] >>> 0 ? 1 : 0) | 0, d[5] = d[5] + 886263092 + (d[4] >>> 0 < f[4] >>> 0 ? 1 : 0) | 0, d[6] = d[6] + 1295307597 + (d[5] >>> 0 < f[5] >>> 0 ? 1 : 0) | 0, d[7] = d[7] + 3545052371 + (d[6] >>> 0 < f[6] >>> 0 ? 1 : 0) | 0, this._b = d[7] >>> 0 < f[7] >>> 0 ? 1 : 0;
          for (var x = 0; x < 8; x++) {
            var v = h[x] + d[x], _ = v & 65535, b = v >>> 16, u = ((_ * _ >>> 17) + _ * b >>> 15) + b * b, g = ((v & 4294901760) * v | 0) + ((v & 65535) * v | 0);
            a[x] = u ^ g;
          }
          h[0] = a[0] + (a[7] << 16 | a[7] >>> 16) + (a[6] << 16 | a[6] >>> 16) | 0, h[1] = a[1] + (a[0] << 8 | a[0] >>> 24) + a[7] | 0, h[2] = a[2] + (a[1] << 16 | a[1] >>> 16) + (a[0] << 16 | a[0] >>> 16) | 0, h[3] = a[3] + (a[2] << 8 | a[2] >>> 24) + a[1] | 0, h[4] = a[4] + (a[3] << 16 | a[3] >>> 16) + (a[2] << 16 | a[2] >>> 16) | 0, h[5] = a[5] + (a[4] << 8 | a[4] >>> 24) + a[3] | 0, h[6] = a[6] + (a[5] << 16 | a[5] >>> 16) + (a[4] << 16 | a[4] >>> 16) | 0, h[7] = a[7] + (a[6] << 8 | a[6] >>> 24) + a[5] | 0;
        }
        r.RabbitLegacy = n._createHelper(l);
      }(), t.RabbitLegacy;
    });
  }(kt)), kt.exports;
}
var Ht = { exports: {} }, Mi = Ht.exports, cr;
function Li() {
  return cr || (cr = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), be(), me(), ge(), Q());
    })(Mi, function(t) {
      return function() {
        var r = t, s = r.lib, n = s.BlockCipher, o = r.algo;
        const c = 16, f = [
          608135816,
          2242054355,
          320440878,
          57701188,
          2752067618,
          698298832,
          137296536,
          3964562569,
          1160258022,
          953160567,
          3193202383,
          887688300,
          3232508343,
          3380367581,
          1065670069,
          3041331479,
          2450970073,
          2306472731
        ], a = [
          [
            3509652390,
            2564797868,
            805139163,
            3491422135,
            3101798381,
            1780907670,
            3128725573,
            4046225305,
            614570311,
            3012652279,
            134345442,
            2240740374,
            1667834072,
            1901547113,
            2757295779,
            4103290238,
            227898511,
            1921955416,
            1904987480,
            2182433518,
            2069144605,
            3260701109,
            2620446009,
            720527379,
            3318853667,
            677414384,
            3393288472,
            3101374703,
            2390351024,
            1614419982,
            1822297739,
            2954791486,
            3608508353,
            3174124327,
            2024746970,
            1432378464,
            3864339955,
            2857741204,
            1464375394,
            1676153920,
            1439316330,
            715854006,
            3033291828,
            289532110,
            2706671279,
            2087905683,
            3018724369,
            1668267050,
            732546397,
            1947742710,
            3462151702,
            2609353502,
            2950085171,
            1814351708,
            2050118529,
            680887927,
            999245976,
            1800124847,
            3300911131,
            1713906067,
            1641548236,
            4213287313,
            1216130144,
            1575780402,
            4018429277,
            3917837745,
            3693486850,
            3949271944,
            596196993,
            3549867205,
            258830323,
            2213823033,
            772490370,
            2760122372,
            1774776394,
            2652871518,
            566650946,
            4142492826,
            1728879713,
            2882767088,
            1783734482,
            3629395816,
            2517608232,
            2874225571,
            1861159788,
            326777828,
            3124490320,
            2130389656,
            2716951837,
            967770486,
            1724537150,
            2185432712,
            2364442137,
            1164943284,
            2105845187,
            998989502,
            3765401048,
            2244026483,
            1075463327,
            1455516326,
            1322494562,
            910128902,
            469688178,
            1117454909,
            936433444,
            3490320968,
            3675253459,
            1240580251,
            122909385,
            2157517691,
            634681816,
            4142456567,
            3825094682,
            3061402683,
            2540495037,
            79693498,
            3249098678,
            1084186820,
            1583128258,
            426386531,
            1761308591,
            1047286709,
            322548459,
            995290223,
            1845252383,
            2603652396,
            3431023940,
            2942221577,
            3202600964,
            3727903485,
            1712269319,
            422464435,
            3234572375,
            1170764815,
            3523960633,
            3117677531,
            1434042557,
            442511882,
            3600875718,
            1076654713,
            1738483198,
            4213154764,
            2393238008,
            3677496056,
            1014306527,
            4251020053,
            793779912,
            2902807211,
            842905082,
            4246964064,
            1395751752,
            1040244610,
            2656851899,
            3396308128,
            445077038,
            3742853595,
            3577915638,
            679411651,
            2892444358,
            2354009459,
            1767581616,
            3150600392,
            3791627101,
            3102740896,
            284835224,
            4246832056,
            1258075500,
            768725851,
            2589189241,
            3069724005,
            3532540348,
            1274779536,
            3789419226,
            2764799539,
            1660621633,
            3471099624,
            4011903706,
            913787905,
            3497959166,
            737222580,
            2514213453,
            2928710040,
            3937242737,
            1804850592,
            3499020752,
            2949064160,
            2386320175,
            2390070455,
            2415321851,
            4061277028,
            2290661394,
            2416832540,
            1336762016,
            1754252060,
            3520065937,
            3014181293,
            791618072,
            3188594551,
            3933548030,
            2332172193,
            3852520463,
            3043980520,
            413987798,
            3465142937,
            3030929376,
            4245938359,
            2093235073,
            3534596313,
            375366246,
            2157278981,
            2479649556,
            555357303,
            3870105701,
            2008414854,
            3344188149,
            4221384143,
            3956125452,
            2067696032,
            3594591187,
            2921233993,
            2428461,
            544322398,
            577241275,
            1471733935,
            610547355,
            4027169054,
            1432588573,
            1507829418,
            2025931657,
            3646575487,
            545086370,
            48609733,
            2200306550,
            1653985193,
            298326376,
            1316178497,
            3007786442,
            2064951626,
            458293330,
            2589141269,
            3591329599,
            3164325604,
            727753846,
            2179363840,
            146436021,
            1461446943,
            4069977195,
            705550613,
            3059967265,
            3887724982,
            4281599278,
            3313849956,
            1404054877,
            2845806497,
            146425753,
            1854211946
          ],
          [
            1266315497,
            3048417604,
            3681880366,
            3289982499,
            290971e4,
            1235738493,
            2632868024,
            2414719590,
            3970600049,
            1771706367,
            1449415276,
            3266420449,
            422970021,
            1963543593,
            2690192192,
            3826793022,
            1062508698,
            1531092325,
            1804592342,
            2583117782,
            2714934279,
            4024971509,
            1294809318,
            4028980673,
            1289560198,
            2221992742,
            1669523910,
            35572830,
            157838143,
            1052438473,
            1016535060,
            1802137761,
            1753167236,
            1386275462,
            3080475397,
            2857371447,
            1040679964,
            2145300060,
            2390574316,
            1461121720,
            2956646967,
            4031777805,
            4028374788,
            33600511,
            2920084762,
            1018524850,
            629373528,
            3691585981,
            3515945977,
            2091462646,
            2486323059,
            586499841,
            988145025,
            935516892,
            3367335476,
            2599673255,
            2839830854,
            265290510,
            3972581182,
            2759138881,
            3795373465,
            1005194799,
            847297441,
            406762289,
            1314163512,
            1332590856,
            1866599683,
            4127851711,
            750260880,
            613907577,
            1450815602,
            3165620655,
            3734664991,
            3650291728,
            3012275730,
            3704569646,
            1427272223,
            778793252,
            1343938022,
            2676280711,
            2052605720,
            1946737175,
            3164576444,
            3914038668,
            3967478842,
            3682934266,
            1661551462,
            3294938066,
            4011595847,
            840292616,
            3712170807,
            616741398,
            312560963,
            711312465,
            1351876610,
            322626781,
            1910503582,
            271666773,
            2175563734,
            1594956187,
            70604529,
            3617834859,
            1007753275,
            1495573769,
            4069517037,
            2549218298,
            2663038764,
            504708206,
            2263041392,
            3941167025,
            2249088522,
            1514023603,
            1998579484,
            1312622330,
            694541497,
            2582060303,
            2151582166,
            1382467621,
            776784248,
            2618340202,
            3323268794,
            2497899128,
            2784771155,
            503983604,
            4076293799,
            907881277,
            423175695,
            432175456,
            1378068232,
            4145222326,
            3954048622,
            3938656102,
            3820766613,
            2793130115,
            2977904593,
            26017576,
            3274890735,
            3194772133,
            1700274565,
            1756076034,
            4006520079,
            3677328699,
            720338349,
            1533947780,
            354530856,
            688349552,
            3973924725,
            1637815568,
            332179504,
            3949051286,
            53804574,
            2852348879,
            3044236432,
            1282449977,
            3583942155,
            3416972820,
            4006381244,
            1617046695,
            2628476075,
            3002303598,
            1686838959,
            431878346,
            2686675385,
            1700445008,
            1080580658,
            1009431731,
            832498133,
            3223435511,
            2605976345,
            2271191193,
            2516031870,
            1648197032,
            4164389018,
            2548247927,
            300782431,
            375919233,
            238389289,
            3353747414,
            2531188641,
            2019080857,
            1475708069,
            455242339,
            2609103871,
            448939670,
            3451063019,
            1395535956,
            2413381860,
            1841049896,
            1491858159,
            885456874,
            4264095073,
            4001119347,
            1565136089,
            3898914787,
            1108368660,
            540939232,
            1173283510,
            2745871338,
            3681308437,
            4207628240,
            3343053890,
            4016749493,
            1699691293,
            1103962373,
            3625875870,
            2256883143,
            3830138730,
            1031889488,
            3479347698,
            1535977030,
            4236805024,
            3251091107,
            2132092099,
            1774941330,
            1199868427,
            1452454533,
            157007616,
            2904115357,
            342012276,
            595725824,
            1480756522,
            206960106,
            497939518,
            591360097,
            863170706,
            2375253569,
            3596610801,
            1814182875,
            2094937945,
            3421402208,
            1082520231,
            3463918190,
            2785509508,
            435703966,
            3908032597,
            1641649973,
            2842273706,
            3305899714,
            1510255612,
            2148256476,
            2655287854,
            3276092548,
            4258621189,
            236887753,
            3681803219,
            274041037,
            1734335097,
            3815195456,
            3317970021,
            1899903192,
            1026095262,
            4050517792,
            356393447,
            2410691914,
            3873677099,
            3682840055
          ],
          [
            3913112168,
            2491498743,
            4132185628,
            2489919796,
            1091903735,
            1979897079,
            3170134830,
            3567386728,
            3557303409,
            857797738,
            1136121015,
            1342202287,
            507115054,
            2535736646,
            337727348,
            3213592640,
            1301675037,
            2528481711,
            1895095763,
            1721773893,
            3216771564,
            62756741,
            2142006736,
            835421444,
            2531993523,
            1442658625,
            3659876326,
            2882144922,
            676362277,
            1392781812,
            170690266,
            3921047035,
            1759253602,
            3611846912,
            1745797284,
            664899054,
            1329594018,
            3901205900,
            3045908486,
            2062866102,
            2865634940,
            3543621612,
            3464012697,
            1080764994,
            553557557,
            3656615353,
            3996768171,
            991055499,
            499776247,
            1265440854,
            648242737,
            3940784050,
            980351604,
            3713745714,
            1749149687,
            3396870395,
            4211799374,
            3640570775,
            1161844396,
            3125318951,
            1431517754,
            545492359,
            4268468663,
            3499529547,
            1437099964,
            2702547544,
            3433638243,
            2581715763,
            2787789398,
            1060185593,
            1593081372,
            2418618748,
            4260947970,
            69676912,
            2159744348,
            86519011,
            2512459080,
            3838209314,
            1220612927,
            3339683548,
            133810670,
            1090789135,
            1078426020,
            1569222167,
            845107691,
            3583754449,
            4072456591,
            1091646820,
            628848692,
            1613405280,
            3757631651,
            526609435,
            236106946,
            48312990,
            2942717905,
            3402727701,
            1797494240,
            859738849,
            992217954,
            4005476642,
            2243076622,
            3870952857,
            3732016268,
            765654824,
            3490871365,
            2511836413,
            1685915746,
            3888969200,
            1414112111,
            2273134842,
            3281911079,
            4080962846,
            172450625,
            2569994100,
            980381355,
            4109958455,
            2819808352,
            2716589560,
            2568741196,
            3681446669,
            3329971472,
            1835478071,
            660984891,
            3704678404,
            4045999559,
            3422617507,
            3040415634,
            1762651403,
            1719377915,
            3470491036,
            2693910283,
            3642056355,
            3138596744,
            1364962596,
            2073328063,
            1983633131,
            926494387,
            3423689081,
            2150032023,
            4096667949,
            1749200295,
            3328846651,
            309677260,
            2016342300,
            1779581495,
            3079819751,
            111262694,
            1274766160,
            443224088,
            298511866,
            1025883608,
            3806446537,
            1145181785,
            168956806,
            3641502830,
            3584813610,
            1689216846,
            3666258015,
            3200248200,
            1692713982,
            2646376535,
            4042768518,
            1618508792,
            1610833997,
            3523052358,
            4130873264,
            2001055236,
            3610705100,
            2202168115,
            4028541809,
            2961195399,
            1006657119,
            2006996926,
            3186142756,
            1430667929,
            3210227297,
            1314452623,
            4074634658,
            4101304120,
            2273951170,
            1399257539,
            3367210612,
            3027628629,
            1190975929,
            2062231137,
            2333990788,
            2221543033,
            2438960610,
            1181637006,
            548689776,
            2362791313,
            3372408396,
            3104550113,
            3145860560,
            296247880,
            1970579870,
            3078560182,
            3769228297,
            1714227617,
            3291629107,
            3898220290,
            166772364,
            1251581989,
            493813264,
            448347421,
            195405023,
            2709975567,
            677966185,
            3703036547,
            1463355134,
            2715995803,
            1338867538,
            1343315457,
            2802222074,
            2684532164,
            233230375,
            2599980071,
            2000651841,
            3277868038,
            1638401717,
            4028070440,
            3237316320,
            6314154,
            819756386,
            300326615,
            590932579,
            1405279636,
            3267499572,
            3150704214,
            2428286686,
            3959192993,
            3461946742,
            1862657033,
            1266418056,
            963775037,
            2089974820,
            2263052895,
            1917689273,
            448879540,
            3550394620,
            3981727096,
            150775221,
            3627908307,
            1303187396,
            508620638,
            2975983352,
            2726630617,
            1817252668,
            1876281319,
            1457606340,
            908771278,
            3720792119,
            3617206836,
            2455994898,
            1729034894,
            1080033504
          ],
          [
            976866871,
            3556439503,
            2881648439,
            1522871579,
            1555064734,
            1336096578,
            3548522304,
            2579274686,
            3574697629,
            3205460757,
            3593280638,
            3338716283,
            3079412587,
            564236357,
            2993598910,
            1781952180,
            1464380207,
            3163844217,
            3332601554,
            1699332808,
            1393555694,
            1183702653,
            3581086237,
            1288719814,
            691649499,
            2847557200,
            2895455976,
            3193889540,
            2717570544,
            1781354906,
            1676643554,
            2592534050,
            3230253752,
            1126444790,
            2770207658,
            2633158820,
            2210423226,
            2615765581,
            2414155088,
            3127139286,
            673620729,
            2805611233,
            1269405062,
            4015350505,
            3341807571,
            4149409754,
            1057255273,
            2012875353,
            2162469141,
            2276492801,
            2601117357,
            993977747,
            3918593370,
            2654263191,
            753973209,
            36408145,
            2530585658,
            25011837,
            3520020182,
            2088578344,
            530523599,
            2918365339,
            1524020338,
            1518925132,
            3760827505,
            3759777254,
            1202760957,
            3985898139,
            3906192525,
            674977740,
            4174734889,
            2031300136,
            2019492241,
            3983892565,
            4153806404,
            3822280332,
            352677332,
            2297720250,
            60907813,
            90501309,
            3286998549,
            1016092578,
            2535922412,
            2839152426,
            457141659,
            509813237,
            4120667899,
            652014361,
            1966332200,
            2975202805,
            55981186,
            2327461051,
            676427537,
            3255491064,
            2882294119,
            3433927263,
            1307055953,
            942726286,
            933058658,
            2468411793,
            3933900994,
            4215176142,
            1361170020,
            2001714738,
            2830558078,
            3274259782,
            1222529897,
            1679025792,
            2729314320,
            3714953764,
            1770335741,
            151462246,
            3013232138,
            1682292957,
            1483529935,
            471910574,
            1539241949,
            458788160,
            3436315007,
            1807016891,
            3718408830,
            978976581,
            1043663428,
            3165965781,
            1927990952,
            4200891579,
            2372276910,
            3208408903,
            3533431907,
            1412390302,
            2931980059,
            4132332400,
            1947078029,
            3881505623,
            4168226417,
            2941484381,
            1077988104,
            1320477388,
            886195818,
            18198404,
            3786409e3,
            2509781533,
            112762804,
            3463356488,
            1866414978,
            891333506,
            18488651,
            661792760,
            1628790961,
            3885187036,
            3141171499,
            876946877,
            2693282273,
            1372485963,
            791857591,
            2686433993,
            3759982718,
            3167212022,
            3472953795,
            2716379847,
            445679433,
            3561995674,
            3504004811,
            3574258232,
            54117162,
            3331405415,
            2381918588,
            3769707343,
            4154350007,
            1140177722,
            4074052095,
            668550556,
            3214352940,
            367459370,
            261225585,
            2610173221,
            4209349473,
            3468074219,
            3265815641,
            314222801,
            3066103646,
            3808782860,
            282218597,
            3406013506,
            3773591054,
            379116347,
            1285071038,
            846784868,
            2669647154,
            3771962079,
            3550491691,
            2305946142,
            453669953,
            1268987020,
            3317592352,
            3279303384,
            3744833421,
            2610507566,
            3859509063,
            266596637,
            3847019092,
            517658769,
            3462560207,
            3443424879,
            370717030,
            4247526661,
            2224018117,
            4143653529,
            4112773975,
            2788324899,
            2477274417,
            1456262402,
            2901442914,
            1517677493,
            1846949527,
            2295493580,
            3734397586,
            2176403920,
            1280348187,
            1908823572,
            3871786941,
            846861322,
            1172426758,
            3287448474,
            3383383037,
            1655181056,
            3139813346,
            901632758,
            1897031941,
            2986607138,
            3066810236,
            3447102507,
            1393639104,
            373351379,
            950779232,
            625454576,
            3124240540,
            4148612726,
            2007998917,
            544563296,
            2244738638,
            2330496472,
            2058025392,
            1291430526,
            424198748,
            50039436,
            29584100,
            3605783033,
            2429876329,
            2791104160,
            1057563949,
            3255363231,
            3075367218,
            3463963227,
            1469046755,
            985887462
          ]
        ];
        var l = {
          pbox: [],
          sbox: []
        };
        function p(_, b) {
          let u = b >> 24 & 255, g = b >> 16 & 255, C = b >> 8 & 255, m = b & 255, B = _.sbox[0][u] + _.sbox[1][g];
          return B = B ^ _.sbox[2][C], B = B + _.sbox[3][m], B;
        }
        function h(_, b, u) {
          let g = b, C = u, m;
          for (let B = 0; B < c; ++B)
            g = g ^ _.pbox[B], C = p(_, g) ^ C, m = g, g = C, C = m;
          return m = g, g = C, C = m, C = C ^ _.pbox[c], g = g ^ _.pbox[c + 1], { left: g, right: C };
        }
        function d(_, b, u) {
          let g = b, C = u, m;
          for (let B = c + 1; B > 1; --B)
            g = g ^ _.pbox[B], C = p(_, g) ^ C, m = g, g = C, C = m;
          return m = g, g = C, C = m, C = C ^ _.pbox[1], g = g ^ _.pbox[0], { left: g, right: C };
        }
        function x(_, b, u) {
          for (let A = 0; A < 4; A++) {
            _.sbox[A] = [];
            for (let D = 0; D < 256; D++)
              _.sbox[A][D] = a[A][D];
          }
          let g = 0;
          for (let A = 0; A < c + 2; A++)
            _.pbox[A] = f[A] ^ b[g], g++, g >= u && (g = 0);
          let C = 0, m = 0, B = 0;
          for (let A = 0; A < c + 2; A += 2)
            B = h(_, C, m), C = B.left, m = B.right, _.pbox[A] = C, _.pbox[A + 1] = m;
          for (let A = 0; A < 4; A++)
            for (let D = 0; D < 256; D += 2)
              B = h(_, C, m), C = B.left, m = B.right, _.sbox[A][D] = C, _.sbox[A][D + 1] = m;
          return !0;
        }
        var v = o.Blowfish = n.extend({
          _doReset: function() {
            if (this._keyPriorReset !== this._key) {
              var _ = this._keyPriorReset = this._key, b = _.words, u = _.sigBytes / 4;
              x(l, b, u);
            }
          },
          encryptBlock: function(_, b) {
            var u = h(l, _[b], _[b + 1]);
            _[b] = u.left, _[b + 1] = u.right;
          },
          decryptBlock: function(_, b) {
            var u = d(l, _[b], _[b + 1]);
            _[b] = u.left, _[b + 1] = u.right;
          },
          blockSize: 64 / 32,
          keySize: 128 / 32,
          ivSize: 64 / 32
        });
        r.Blowfish = n._createHelper(v);
      }(), t.Blowfish;
    });
  }(Ht)), Ht.exports;
}
var Ni = Ze.exports, hr;
function qi() {
  return hr || (hr = 1, function(i, e) {
    (function(t, r, s) {
      i.exports = r(K(), Vt(), Ws(), Ls(), be(), js(), me(), Hr(), o0(), Gs(), $r(), Qs(), ei(), ri(), a0(), ni(), ge(), Q(), ci(), fi(), di(), pi(), vi(), Ci(), bi(), yi(), Ei(), Di(), Ri(), ki(), $i(), zi(), Pi(), Wi(), Li());
    })(Ni, function(t) {
      return t;
    });
  }(Ze)), Ze.exports;
}
var ji = qi(), Re;
const qt = class qt {
  constructor() {
    w(this, "pictures", {});
  }
  static use() {
    return We(this, Re) === void 0 && Gt(this, Re, new qt()), We(this, Re);
  }
  // {md5: base64}
  savePicture(e) {
    const t = ji.MD5(e).toString();
    return this.pictures[t] ? console.log("cached") : this.pictures[t] = e, t;
  }
  getPicture(e) {
    return this.pictures[e];
  }
};
Re = new WeakMap(), Kt(qt, Re);
let Ve = qt;
const Vi = (i, e, t, r, s, n) => {
  const o = l0(e, r, n);
  if (o) {
    const c = new Image(t.width, t.height);
    e.valueType === "local" ? c.src = Ve.use().getPicture(o) : c.src = o, c.addEventListener("load", () => {
      i.save().beginPath().prop({});
      const f = t.x + 60, a = t.y + 23;
      i._ctx.drawImage(c, f, a, t.width, t.height), i.restore();
    }), c.addEventListener("error", () => {
      i.save().beginPath().prop({}), i._ctx.fillStyle = "red", i.fillText(
        "X [PIC Load Error]",
        t.x + t.width / 2 + 20,
        t.y + t.height / 2 + 30
      ), i.restore();
    });
  } else
    kr(
      i,
      e,
      t,
      { ...r, color: "red", fontSize: 8 },
      s,
      n,
      "body",
      "X [PIC Not Set]"
    );
}, Yi = (i, e, t, r, s) => {
  if (e instanceof Object && e.type === "image") {
    let n = e.value;
    return e.valueType === "local" && (n = Ve.use().getPicture(n || "")), `> <img src="${n}" md5="${e.valueType === "local" ? e.value : ""}" value-type="${e.valueType}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" /> </td>`;
  } else
    return `${(e == null ? void 0 : e.value) || JSON.stringify(e)} </td>`;
}, Ui = (i, e, t) => {
  const r = e.querySelector("img"), s = { type: "image", valueType: "url", value: "" };
  return r && r.getAttribute("src") && (s.value = r.getAttribute("src")), r && r.getAttribute("value-type") && (s.valueType = r.getAttribute("value-type"), s.value = r.getAttribute("md5") || ""), s;
}, ke = (i) => i instanceof Object && i.type && i.type in ve.use().options ? i.type : "text", Ki = [
  {
    type: "text",
    toHtml: Ds,
    fromHtml: Fs,
    toCanvas: kr,
    editor: () => new Rs()
  },
  {
    type: "image",
    disableAutoFillAction: !0,
    toHtml: Yi,
    toCanvas: Vi,
    fromHtml: Ui
  }
];
var Se;
const jt = class jt {
  constructor() {
    w(this, "options", {});
    this.loadBaseRender();
  }
  static use() {
    return We(this, Se) || Gt(this, Se, new jt()), We(this, Se);
  }
  loadBaseRender() {
    Ki.forEach((e) => {
      this.options[e.type] = e;
    });
  }
  getRender(e) {
    return this.options[e] || (e = "text", console.error("not support this type: " + e)), this.options[e];
  }
  registRender(e) {
    this.options[e.type] = e;
  }
  deleteRender(e) {
    this.options[e] && delete this.options[e];
  }
};
Se = new WeakMap(), Kt(jt, Se);
let ve = jt;
function Ce(i, e, t, r = !1) {
  let s, n, o, c;
  Array.isArray(t) ? s = n = o = c = t : { top: s, right: n, bottom: o, left: c } = t, i.save().beginPath().translate(e.x, e.y);
  const f = (a, l) => [
    [0 - l, 0, e.width + l, 0],
    [e.width, 0, e.width, e.height],
    [0 - l, e.height, e.width + l, e.height],
    [0, 0, 0, e.height]
  ][a];
  [s, n, o, c].forEach((a, l) => {
    if (a) {
      let p = [], h = 1;
      a[0] === "thick" ? h = 3 : a[0] === "medium" ? h = 2 : a[0] === "dotted" ? p = [1, 1] : a[0] === "dashed" && (p = [2, 2]);
      let d = 0;
      r && (d = h / 2), i.prop({ strokeStyle: a[1], lineWidth: h }).setLineDash(p).line(...f(l, d));
    }
  }), i.restore();
}
function l0(i, e, t) {
  let r = "";
  const s = ke(i);
  return i && (s === "text" ? i instanceof Object ? r = t(
    i,
    e,
    `${(i == null ? void 0 : i.value) || ""}`,
    i == null ? void 0 : i.format
  ) : r = t(i, e, `${i || ""}`) : i instanceof Object && (r = i.value ? String(i.value) : "")), r;
}
function fr(i, e, t, r, s, n, o) {
  const c = ke(e);
  if (i.save().beginPath().translate(t.x, t.y), i.rect(0, 0, t.width, t.height).clip(), r.bgcolor && i.prop("fillStyle", r.bgcolor).fill(), r.rotate && r.rotate > 0 && i.rotate(r.rotate * (Math.PI / 180)), s !== void 0) {
    if (i.save(), !s(i, t, e, l0(e, r, n))) {
      i.restore();
      return;
    }
    i.restore();
  }
  const f = ve.use().getRender(c).toCanvas(i, e, t, r, s, n, o);
  return i.restore(), f;
}
function Tr(i, [e, t, ...r], s) {
  const n = [], o = U.with(e), c = s.filter((f) => f.intersects(o));
  if (o.intersects(i.range) || c.length > 0)
    if (c.length <= 0)
      n.push([o, i.rect(o), t]);
    else
      for (const f of c)
        if (o.within(f))
          o.startRow === f.startRow && o.startCol === f.startCol && t !== "inside" && t !== "horizontal" && t !== "vertical" && n.push([f, i.rect(f), t === "all" ? "outside" : t]);
        else if (t === "outside" || t === "left" || t === "top" || t === "right" || t === "bottom") {
          n.push([o, i.rect(o), t]);
          break;
        } else {
          const a = c.filter((l) => !l.equals(f));
          if (o.difference(f).forEach((l) => {
            if (l.intersects(i.range)) {
              const p = i.rect(l);
              n.push(
                ...Tr(
                  i,
                  [l.toString(), t, ...r],
                  a
                )
              ), (t === "inside" || t === "horizontal") && (l.startRow < f.startRow && l.endRow < f.startRow ? n.push([l, p, "bottom"]) : l.startRow > f.startRow && l.endRow > f.startRow && n.push([l, p, "top"])), (t === "inside" || t === "vertical") && (l.startCol < f.startCol && l.endCol < f.startCol && n.push([l, p, "right"]), l.startCol > f.startCol && l.endCol > f.startCol && n.push([l, p, "left"]));
            }
          }), t === "all") {
            const l = i.rect(f);
            o.startRow === f.startRow && n.push([f, l, "top"]), o.endRow === f.endRow && n.push([f, l, "bottom"]), o.startCol === f.startCol && n.push([f, l, "left"]), o.endCol === f.endCol && n.push([f, l, "right"]);
          }
          break;
        }
  return n;
}
function r0(i, { width: e, color: t }, r) {
  e > 0 && (i.save().beginPath().prop({ lineWidth: e - 0.5, strokeStyle: t }), r(), i.restore());
}
function xr(i, e, { x: t, y: r, width: s, height: n }) {
  r0(i, e, () => {
    i.translate(t, r).line(s, 0, s, n).line(0, n, s, n);
  });
}
function Gi(i, e, t, r, s, n, o, c) {
  const f = [n, o];
  s === "outside" || s === "all" ? Ce(i, r, f, !0) : s === "left" ? Ce(i, r, { left: f }, c) : s === "top" ? Ce(i, r, { top: f }, c) : s === "right" ? Ce(i, r, { right: f }, c) : s === "bottom" && Ce(i, r, { bottom: f }, c), (s === "all" || s === "inside" || s === "horizontal" || s === "vertical") && (s !== "horizontal" && t.eachCol((a) => {
    if (a < t.endCol) {
      const l = t.clone();
      l.endCol = l.startCol = a, l.intersects(e.range) && Ce(
        i,
        e.rect(l),
        { right: f },
        c
      );
    }
  }), s !== "vertical" && t.eachRow((a) => {
    if (a < t.endRow) {
      const l = t.clone();
      l.endRow = l.startRow = a, l.intersects(e.range) && Ce(
        i,
        e.rect(l),
        { bottom: f },
        c
      );
    }
  }));
}
function Xi(i, e, t, r) {
  t && t.length > 0 && t.forEach((s) => {
    const [, , n, o] = s;
    Tr(e, s, r).forEach(([c, f, a]) => {
      Gi(i, e, c, f, a, n, o);
    });
  });
}
function _e(i, e, t, r) {
  if (!t) return;
  let s, n, o = (m, B, A) => A, c = r._headerStyle, f = r._headerGridline, a = r._styles, l, p, h, d;
  const { _rowHeader: x, _colHeader: v } = r;
  if (i === "row-header") {
    if (x.width <= 0) return;
    ({ cell: s, merges: l, cellRenderer: n } = x);
  } else if (i === "col-header") {
    if (v.height <= 0) return;
    ({ cell: s, merges: l, cellRenderer: n } = v);
  } else
    s = r._cell, n = r._cellRenderer, o = r._formatter, c = r._style, f = r._gridline, a = r._styles, l = r._merges, p = r._borders, h = r._row, d = r._col;
  e.save().translate(t.x, t.y).prop("fillStyle", r._bgcolor).rect(0, 0, t.width, t.height).fill().clip();
  const _ = (m, B, A) => {
    const D = { ...c };
    if (h) {
      const H = h(m);
      H && H.style !== void 0 && Object.assign(D, a[H.style]);
    }
    if (d) {
      const H = d(B);
      H && H.style !== void 0 && Object.assign(D, a[H.style]);
    }
    return A instanceof Object && A.style !== void 0 && Object.assign(D, a[A.style]), D;
  }, b = [], u = [], g = /* @__PURE__ */ new Set();
  l && ns(l, (m) => {
    if (m.intersects(t.range)) {
      const B = s(m.startRow, m.startCol), A = _(m.startRow, m.startCol, B), D = t.rect(m);
      u.push([B, D, A]), b.push(m), m.each((H, y) => {
        g.add(`${H}_${y}`);
      });
    }
  });
  const C = (m, B, A) => {
    if (i === "body")
      return xr(e, f, B), fr(e, m, B, A, n, o, i);
    fr(e, m, B, A, n, o, i), xr(e, f, B);
  };
  t.each((m, B, A) => {
    var D;
    if (r._activeRowHeight[m] || (r._activeRowHeight[m] = []), !g.has(`${m}_${B}`)) {
      const H = s(m, B), y = _(m, B, H), E = C(H, A, y);
      y.textwrap && E && E.contentInfo && (r._activeRowHeight[m][B] = ((D = E.contentInfo) == null ? void 0 : D.height) || 0), y.textwrap || (r._activeRowHeight[m][B] = 0);
    }
  }), u.forEach((m) => C(...m)), Xi(e, t, p, b), e.restore();
}
function Zi(i) {
  const { _width: e, _height: t, _target: r, _scale: s, _viewport: n, _freeze: o, _rowHeader: c, _colHeader: f } = i;
  if (n) {
    const a = new is(r, s);
    a.size(e, t);
    const [l, p, h, d] = n.areas, [x, v, _, b] = n.headerAreas;
    _e("body", a, d, i), _e("body", a, l, i), _e("col-header", a, x, i), _e("body", a, h, i), _e("row-header", a, b, i), _e("body", a, p, i), _e("col-header", a, v, i), _e("row-header", a, _, i);
    const [u, g] = o;
    (g > 0 || u > 0) && r0(a, i._freezeGridline, () => {
      g > 0 && a.line(0, d.y, e, d.y), u > 0 && a.line(d.x, 0, d.x, t);
    });
    const { x: C, y: m } = p;
    if (C > 0 && m > 0) {
      const { height: B } = f, { width: A } = c, { bgcolor: D } = i._headerStyle;
      D && a.save().prop({ fillStyle: D }).rect(0, 0, A, B).fill().restore(), r0(a, i._headerGridline, () => {
        a.line(0, B, A, B).line(A, 0, A, B);
      });
    }
  }
}
class he {
  constructor(e, t, r, s, n, o, c) {
    // { rowIndex: { y, height }}
    w(this, "rowMap", /* @__PURE__ */ new Map());
    // { colIndex: { x, width }}
    w(this, "colMap", /* @__PURE__ */ new Map());
    w(this, "cellAtCache", null);
    this.range = e, this.x = t, this.y = r, this.width = s, this.height = n, this.rowHeight = o, this.colWidth = c;
    let f = 0;
    e.eachRow((l) => {
      const p = o(l);
      this.rowMap.set(l, { y: f, height: p }), f += p;
    }), this.height <= 0 && (this.height = f);
    let a = 0;
    e.eachCol((l) => {
      const p = c(l);
      this.colMap.set(l, { x: a, width: p }), a += p;
    }), this.width <= 0 && (this.width = a);
  }
  /**
   * check whether or not x contained in area
   * @param {int} x offset on x-axis
   */
  containsx(e) {
    return e >= this.x && e < this.x + this.width;
  }
  /**
   * check whether or not y contained in area
   * @param {int} y offset on y-axis
   */
  containsy(e) {
    return e >= this.y && e < this.y + this.height;
  }
  contains(e, t) {
    return this.containsx(e) && this.containsy(t);
  }
  eachRow(e) {
    this.range.eachRow((t) => {
      const { y: r, height: s } = this.rowMap.get(t) || { y: 0, height: 0 };
      s > 0 && e(t, r, s);
    });
  }
  eachCol(e) {
    this.range.eachCol((t) => {
      const { x: r, width: s } = this.colMap.get(t) || { x: 0, width: 0 };
      s > 0 && e(t, r, s);
    });
  }
  each(e) {
    this.eachRow((t, r, s) => {
      this.eachCol((n, o, c) => {
        e(t, n, { x: o, y: r, width: c, height: s });
      });
    });
  }
  rectRow(e, t) {
    var f;
    const { rowMap: r, range: s } = this;
    let [n, o] = [0, 0];
    e >= s.startRow && (n = ((f = r.get(e)) == null ? void 0 : f.y) || 0);
    for (let a = e; a <= t; a += 1) {
      const l = this.rowHeight(a);
      l > 0 && (a < s.startRow && (n -= l), o += l);
    }
    const { width: c } = this;
    return { x: 0, y: n, width: c, height: o };
  }
  rectCol(e, t) {
    var f;
    const { colMap: r, range: s } = this;
    let [n, o] = [0, 0];
    e >= s.startCol && (n = ((f = r.get(e)) == null ? void 0 : f.x) || 0);
    for (let a = e; a <= t; a += 1) {
      const l = this.colWidth(a);
      l > 0 && (a < s.startCol && (n -= l), o += l);
    }
    const { height: c } = this;
    return { x: n, y: 0, width: o, height: c };
  }
  rect(e) {
    const { y: t, height: r } = this.rectRow(e.startRow, e.endRow), { x: s, width: n } = this.rectCol(e.startCol, e.endCol);
    return { x: s, y: t, width: n, height: r };
  }
  cellAt(e, t) {
    const { cellAtCache: r } = this;
    if (r != null && e > r.x && e <= r.x + r.width && t > r.y && t <= r.y + r.height)
      return r;
    const { startRow: s, startCol: n } = this.range, o = {
      row: s,
      col: n,
      x: this.x,
      y: this.y,
      width: 0,
      height: 0
    };
    for (; o.y < t; ) {
      const c = this.rowHeight(o.row++);
      o.y += c, o.height = c;
    }
    for (o.y -= o.height, o.row--; o.x < e; ) {
      const c = this.colWidth(o.col++);
      o.x += c, o.width = c;
    }
    return o.x -= o.width, o.col--, this.cellAtCache = o, o;
  }
  static create(e, t, r, s, n, o, c, f, a, l) {
    return new he(
      new U(e, t, r, s),
      n,
      o,
      c,
      f,
      a,
      l
    );
  }
}
class Qi {
  constructor(e) {
    /**
     * [area1, area2, area3, area4]
     * -----------------------
     * |  area-2   |   area-1
     * |-----------|----------
     * |  area-3   |   area-4
     * -----------------------
     */
    w(this, "areas");
    /**
     * [area1, area21, area23, area3]
     *             |   area-21   | area-1
     * ------------|-----------------------
     *   area-23   |   body
     * ------------|
     *   area-3    |
     */
    w(this, "headerAreas");
    w(this, "_render");
    this._render = e;
    const [t, r] = [e._rowHeader.width, e._colHeader.height], [s, n] = e._freeze, { _startRow: o, _startCol: c, _rows: f, _cols: a, _width: l, _height: p } = e, h = (k) => e.rowHeightAt(k), d = (k) => e.colWidthAt(k), x = he.create(
      o,
      c,
      s - 1,
      n - 1,
      t,
      r,
      0,
      0,
      h,
      d
    ), [v, _] = [s + e._scrollRows, n + e._scrollCols];
    let b = x.height + r, u = v;
    for (; b < p && u < f; )
      b += h(u), u += 1;
    let g = x.width + t, C = _;
    for (; g < l && C < a; )
      g += d(C), C += 1;
    const m = t + x.width, B = r + x.height;
    let A = l - m, D = p - B;
    C === a && (A -= l - g), u === f && (D -= p - b), C -= 1, u -= 1;
    const H = he.create(
      v,
      _,
      u,
      C,
      m,
      B,
      A,
      D,
      h,
      d
    ), y = he.create(
      o,
      _,
      s - 1,
      C,
      m,
      r,
      A,
      0,
      h,
      d
    ), E = he.create(
      v,
      c,
      u,
      n - 1,
      t,
      B,
      0,
      D,
      h,
      d
    );
    this.areas = [y, x, E, H];
    const { _rowHeader: $, _colHeader: T } = e, F = () => T.height / T.rows, S = () => $.width / $.cols;
    this.headerAreas = [
      he.create(
        0,
        y.range.startCol,
        T.rows - 1,
        y.range.endCol,
        H.x,
        0,
        H.width,
        0,
        F,
        d
      ),
      he.create(
        0,
        x.range.startCol,
        T.rows - 1,
        x.range.endCol,
        x.x,
        0,
        x.width,
        0,
        F,
        d
      ),
      he.create(
        x.range.startRow,
        0,
        x.range.endRow,
        $.cols - 1,
        0,
        x.y,
        0,
        x.height,
        h,
        S
      ),
      he.create(
        E.range.startRow,
        0,
        E.range.endRow,
        $.cols - 1,
        0,
        H.y,
        0,
        H.height,
        h,
        S
      )
    ];
  }
  inAreas(e, t) {
    for (const r of this.areas)
      if (r.range.contains(e, t))
        return !0;
    return !1;
  }
  cellAt(e, t) {
    const r = this.areas[1], [s, n, o, c] = this.headerAreas;
    if (e < r.x && t < r.y)
      return {
        placement: "all",
        row: 0,
        col: 0,
        x: 0,
        y: 0,
        width: r.x,
        height: r.y
      };
    if (e < r.x)
      return {
        placement: "row-header",
        ...(o.containsy(t) ? o : c).cellAt(e, t)
      };
    if (t < r.y)
      return {
        placement: "col-header",
        ...(n.containsx(e) ? n : s).cellAt(e, t)
      };
    for (const f of this.areas)
      if (f.contains(e, t))
        return { placement: "body", ...f.cellAt(e, t) };
    return null;
  }
}
class Yt {
  constructor(e, t, r) {
    w(this, "_target");
    w(this, "_bgcolor", "#ffffff");
    // table width
    w(this, "_width", 0);
    // table height
    w(this, "_height", 0);
    w(this, "_scale", 1);
    // the count of rows
    w(this, "_rows", 100);
    // the count of cols;
    w(this, "_cols", 26);
    // the row height (px)
    w(this, "_rowHeight", 22);
    // the column width (px)
    w(this, "_colWidth", 100);
    // row of the start position in table
    w(this, "_startRow", 0);
    // col of the start position in table
    w(this, "_startCol", 0);
    // count of rows scrolled
    w(this, "_scrollRows", 0);
    // count of cols scrolled
    w(this, "_scrollCols", 0);
    /**
     * get row given rowIndex
     * @param {int} rowIndex
     * @returns Row | undefined
     */
    w(this, "_row", () => {
    });
    /**
     * get col given colIndex
     * @param {int} coIndex
     * @returns Row | undefined
     */
    w(this, "_col", () => {
    });
    /**
     * get cell given rowIndex, colIndex
     * @param {int} rowIndex
     * @param {int} colIndex
     * @returns Cell | string
     */
    w(this, "_cell", () => {
    });
    w(this, "_cellRenderer", () => !0);
    w(this, "_formatter", (e, t, r) => r);
    w(this, "_merges", []);
    w(this, "_borders", []);
    w(this, "_styles", []);
    w(this, "_gridline", {
      width: 1,
      color: "#e6e6e6"
    });
    w(this, "_style", {
      align: "left",
      valign: "middle",
      textwrap: !1,
      underline: !1,
      strikethrough: !1,
      color: "#0a0a0a",
      bold: !1,
      italic: !1,
      rotate: 0,
      fontSize: 10,
      fontFamily: "Source Sans Pro"
    });
    // row header
    w(this, "_rowHeader", {
      width: 60,
      cols: 1,
      cell(e, t) {
        return e + 1;
      }
    });
    // column header
    w(this, "_colHeader", {
      height: 24,
      rows: 1,
      cell(e, t) {
        return br(t);
      }
    });
    w(this, "_headerGridline", {
      width: 1,
      color: "#e6e6e6"
    });
    w(this, "_headerStyle", {
      bgcolor: "#f4f5f8cc",
      align: "center",
      valign: "middle",
      textwrap: !0,
      underline: !1,
      strikethrough: !1,
      color: "#585757",
      bold: !1,
      italic: !1,
      rotate: 0,
      fontSize: 10,
      fontFamily: "Source Sans Pro"
    });
    // freezed [row, col]
    w(this, "_freeze", [0, 0]);
    w(this, "_freezeGridline", {
      width: 2,
      color: "#d8d8d8"
    });
    // it can be used after rendering
    w(this, "_viewport", null);
    w(this, "_activeRowHeight", {});
    const s = typeof e == "string" ? document.querySelector(e) : e;
    if (!s) throw new Error("target error");
    this._target = s, this._width = t, this._height = r;
  }
  render() {
    return this._viewport = new Qi(this), Zi(this), this;
  }
  bgcolor(e) {
    return this._bgcolor = e, this;
  }
  width(e) {
    return this._width = e, this;
  }
  height(e) {
    return this._height = e, this;
  }
  scale(e) {
    return this._scale = e, this;
  }
  rows(e) {
    return this._rows = e, this;
  }
  cols(e) {
    return this._cols = e, this;
  }
  rowHeight(e) {
    return this._rowHeight = e, this;
  }
  colWidth(e) {
    return this._colWidth = e, this;
  }
  startRow(e) {
    return this._startRow = e, this;
  }
  startCol(e) {
    return this._startCol = e, this;
  }
  scrollRows(e) {
    return this._scrollRows = e, this;
  }
  scrollCols(e) {
    return this._scrollCols = e, this;
  }
  row(e) {
    return this._row = e, this;
  }
  col(e) {
    return this._col = e, this;
  }
  cell(e) {
    return this._cell = e, this;
  }
  cellRenderer(e) {
    return this._cellRenderer = e, this;
  }
  formatter(e) {
    return this._formatter = e, this;
  }
  merges(e) {
    return this._merges = e, this;
  }
  styles(e) {
    return this._styles = e, this;
  }
  borders(e) {
    return this._borders = e, this;
  }
  gridline(e) {
    return e && Object.assign(this._gridline, e), this;
  }
  style(e) {
    return e && Object.assign(this._style, e), this;
  }
  rowHeader(e) {
    return e && Object.assign(this._rowHeader, e), this;
  }
  colHeader(e) {
    return e && Object.assign(this._colHeader, e), this;
  }
  headerGridline(e) {
    return e && Object.assign(this._headerGridline, e), this;
  }
  headerStyle(e) {
    return e && Object.assign(this._headerStyle, e), this;
  }
  freeze(e) {
    return e && (this._freeze = fe(e).reverse()), this;
  }
  freezeGridline(e) {
    return e && Object.assign(this._freezeGridline, e), this;
  }
  // get methods ---- start ------
  rowHeightAt(e) {
    const { _row: t } = this;
    if (t) {
      const r = t(e);
      if (r) return r.hide === !0 ? 0 : r.height;
    }
    return this._rowHeight;
  }
  colWidthAt(e) {
    const { _col: t } = this;
    if (t) {
      const r = t(e);
      if (r) return r.hide === !0 ? 0 : r.width;
    }
    return this._colWidth;
  }
  get viewport() {
    return this._viewport;
  }
  // get methods ---- end -------
  static create(e, t, r) {
    return new Yt(e, t, r);
  }
}
try {
  window && (window.wolf || (window.wolf = {}), window.wolf.table_renderer = Yt.create);
} catch {
}
function Ot(i, e, t) {
  i.addEventListener(e, t);
}
function Wt(i, e, t) {
  i.removeEventListener(e, t);
}
function Ji(i, e, t) {
  const r = (s) => {
    t(s), Wt(i, "mousemove", e), Wt(i, "mouseup", r);
  };
  Ot(i, "mousemove", e), Ot(i, "mouseup", r);
}
class en {
  constructor() {
    w(this, "_events", /* @__PURE__ */ new Map());
  }
  on(e, t) {
    const { _events: r } = this;
    return r.has(e) || r.set(e, []), r.get(e).push(t), this;
  }
  off(e, t) {
    const { _events: r } = this;
    if (r.has(e)) {
      const s = r.get(e);
      if (s && t) {
        const n = s == null ? void 0 : s.findIndex((o) => o === t);
        n !== -1 && s.splice(n, 1);
      }
    }
    return this;
  }
  emit(e, ...t) {
    var s;
    const { _events: r } = this;
    return r.has(e) && ((s = r == null ? void 0 : r.get(e)) == null || s.forEach((n) => n(...t))), this;
  }
}
class dr {
  constructor(e, t, r, s, n = () => {
  }) {
    w(this, "_");
    w(this, "_hover");
    w(this, "_line");
    w(this, "_type");
    w(this, "_minValue");
    w(this, "_lineLength");
    w(this, "_cell", null);
    w(this, "_change");
    this._type = e, this._minValue = r, this._lineLength = s, this._change = n, this._ = N("div", `${j}-resizer ${e}`).append(
      this._hover = N("div", "hover").on(
        "mousedown.stop",
        (o) => tn(this, o)
      ),
      this._line = N("div", "line")
    ), t.append(this._);
  }
  show(e) {
    this._cell = e;
    const { _type: t } = this, { x: r, y: s, width: n, height: o } = e;
    this._.css("left", `${t === "row" ? r : r + n - 5}px`).css("top", `${t === "row" ? s + o - 5 : s}px`).show();
    const c = t === "row" ? "width" : "height";
    this._hover.css(c, `${e[c]}px`), this._line.css(c, `${this._lineLength()}px`);
  }
  hide() {
    this._.hide();
  }
}
function tn(i, e) {
  const { _type: t, _cell: r, _minValue: s, _: n, _line: o, _change: c } = i;
  let f = 0;
  o.show();
  const a = (p) => {
    e !== null && p.buttons === 1 && r && (t === "row" ? (f += p.movementY, f + r.height >= s ? n.css("top", `${r.y + r.height + f}px`) : f = s - r.height) : (f += p.movementX, f + r.width >= s ? n.css("left", `${r.x + r.width + f}px`) : f = s - r.width));
  }, l = () => {
    Wt(document.body, "mousemove", (p) => a(p)), Wt(document.body, "mouseup", l), o.hide(), n.hide(), r && f != 0 && c(f, r);
  };
  Ot(document.body, "mousemove", (p) => a(p)), Ot(document.body, "mouseup", l);
}
class we {
  constructor(e, t = !1) {
    w(this, "_");
    w(this, "_rect", null);
    w(this, "_target", null);
    this._ = N("div", `${j}-${e}`), t && this.show();
  }
  append(e) {
    return this._.append(e), this;
  }
  offset() {
    if (this._rect && this._target) {
      const e = this._target.offset(), { x: t, y: r, width: s, height: n } = this._rect;
      return { x: t + e.x, y: r + e.y, width: s, height: n };
    }
    return null;
  }
  rect(e) {
    return this._rect = e, this._.css({
      left: e.x,
      top: e.y,
      width: e.width,
      height: e.height
    }), this;
  }
  target(e, t = !0) {
    return t && e.append(this._), this._target = e, this;
  }
  show() {
    return this._.show(), this;
  }
  clear() {
    const { _target: e, _: t } = this;
    e && (e.remove(t), this._target = null);
  }
}
class rn {
  constructor(e) {
    w(this, "_placement", "body");
    w(this, "_editable", !1);
    w(this, "paintFormatArea", null);
    w(this, "_ranges", []);
    w(this, "_rowHeaderRanges", []);
    w(this, "_colHeaderRanges", []);
    w(this, "_areas", []);
    w(this, "_focus", [0, 0]);
    // _focusBodyRange: Range | null = null;
    w(this, "_focusRange", null);
    w(this, "_focusArea", null);
    // for move
    w(this, "_move", [0, 0]);
    // shadow input
    w(this, "_shadowInput");
    w(this, "_shadowInputLock", !1);
    w(this, "_shadowInputInterval", null);
    w(this, "_copyRange", null);
    w(this, "_copyAreas", []);
    w(this, "_autofillRange", null);
    w(this, "_autofillAreas", []);
    w(this, "_autofillTrigger", (e) => {
    });
    this._editable = e, this._shadowInput = N("input", "sheet-editor-inputshadow"), this._shadowInput._.style.boxSizing = "border-box", this._shadowInput._.style.position = "relative", this._shadowInput._.style.zIndex = "10000", this._shadowInput._.style.width = "0", this._shadowInput._.style.height = "100%", this._shadowInput._.style.border = "none", this._shadowInput._.style.outline = "none", this._shadowInput._.style.padding = "0";
  }
  _shadowInputFocus() {
    this._shadowInputInterval && clearTimeout(this._shadowInputInterval), this._shadowInputInterval = setTimeout(() => {
      this._shadowInput._.focus(), this._shadowInputInterval = null;
    }, 30);
  }
  get currentRange() {
    return this._ranges.at(-1);
  }
  placement(e) {
    return this._placement = e, this;
  }
  focus(e, t, r) {
    return this._focus = [e, t], this._focusRange = r, this._move = [e, t], this;
  }
  move(e, t) {
    return this._move = [e, t], this;
  }
  autofillRange(e) {
    return this._autofillRange = e, this;
  }
  autofillTrigger(e) {
    return this._autofillTrigger = e, this;
  }
  addRange(e, t = !0) {
    return t && (this._ranges.length = 0, this.clear()), this._ranges.push(e), pr(this), this;
  }
  updateLastRange(e) {
    const { _focusRange: t } = this;
    t && (this._ranges.splice(-1, 1, e(t)), pr(this));
  }
  addAreaOutline(e, t) {
    const r = new we("selector", !0).rect(Jt(e, 2)).target(t);
    this._placement === "body" && (r.append(
      N("div", "corner").attr("draggable", "false").on("mousedown", this._autofillTrigger)
    ), r.append(this._shadowInput)), this._areas.push(r);
  }
  addArea(e, t) {
    return this._areas.push(new we("selector-area", !0).rect(e).target(t)), this;
  }
  addRowHeaderArea(e, t) {
    return this._areas.push(new we("selector-area row-header", !0).rect(e).target(t)), this;
  }
  addColHeaderArea(e, t) {
    return this._areas.push(new we("selector-area col-header", !0).rect(e).target(t)), this;
  }
  addCopyArea(e, t) {
    return this._copyAreas.push(
      new we("selector-copy", !0).rect(Jt(e, 2)).target(t)
    ), this;
  }
  addAutofillArea(e, t) {
    return this._autofillAreas.push(
      new we("selector-autofill", !0).rect(Jt(e, 2)).target(t)
    ), this;
  }
  setFocusArea(e, t) {
    return this._focusArea = new we("", !0).rect(e).target(t, !1), this;
  }
  showCopy() {
    this._copyRange = this.currentRange;
  }
  clearCopy() {
    this._copyRange = null, this._copyAreas.forEach((e) => {
      e.clear();
    }), this._copyAreas.length = 0;
  }
  clear() {
    [this._areas, this._autofillAreas, this._copyAreas].forEach((e) => {
      e.forEach((t) => t.clear()), e.length = 0;
    });
  }
}
function ur(i, e, t) {
  i.sort(e);
  let r = i[0];
  const s = [];
  i.length === 1 && s.push(r);
  for (let n = 1; n < i.length; n += 1) {
    const o = i[n];
    t(r, o) ? r = r.union(o) : (s.push(r), r = o);
  }
  return i.length > 1 && s.push(r), s;
}
function pr(i) {
  const e = [], t = [];
  for (const r of i._ranges)
    if (r) {
      const { startRow: s, startCol: n, endRow: o, endCol: c } = r;
      (s >= 0 || o >= 0) && e.push(U.create(s, 0, o, 0)), (n >= 0 || c >= 0) && t.push(U.create(0, n, 0, c));
    }
  i._rowHeaderRanges = ur(
    e,
    (r, s) => r.startRow - s.startRow,
    (r, s) => r.intersectsRow(s.startRow, s.endRow)
  ), i._colHeaderRanges = ur(
    t,
    (r, s) => r.startCol - s.startCol,
    (r, s) => r.intersectsCol(s.startCol, s.endCol)
  );
}
function Jt(i, e) {
  return {
    x: i.x - e / 2,
    y: i.y - e / 2,
    width: i.width - e,
    height: i.height - e
  };
}
const sn = { vertical: "height", horizontal: "width" };
class _r {
  constructor(e, t) {
    w(this, "_");
    w(this, "_content");
    w(this, "_value", 0);
    w(this, "_maxValue", 0);
    w(this, "_lastOffset", 0);
    w(this, "_type");
    w(this, "_change", null);
    this._type = e, this._content = N("div", "content"), this._ = N("div", `${j}-scrollbar ${e}`).append(this._content).on("scroll.stop", (r) => {
      const { scrollTop: s, scrollLeft: n } = r.target;
      if (this._change) {
        const o = e === "vertical" ? s : n, c = o > this._value ? "+" : "-";
        this._change(c, o, r), this._value = o;
      }
    }), t.append(this._);
  }
  get value() {
    return this._value;
  }
  change(e) {
    return this._change = e, this;
  }
  scrollBy(e) {
    return e && this.scroll(this._value + e), this;
  }
  scrollToStart() {
    return this.scroll(0), this;
  }
  scrollToEnd() {
    return this.scroll(this._maxValue), this;
  }
  scroll(e) {
    const { _: t, _type: r, _maxValue: s } = this;
    return e !== void 0 ? (e < 0 ? e = 0 : e > s && (e = s), r === "vertical" ? t.scrolly(e) : t.scrollx(e), this) : r === "vertical" ? t.scrolly() : t.scrollx();
  }
  // update this size
  resize(e, t) {
    if (t > e - 1) {
      const r = sn[this._type];
      this._content.css(r, `${t}px`), this._.css(r, `${e}px`).show(), this._maxValue = t - e;
    } else
      this._.hide();
    return this;
  }
}
function nn(i, e) {
  const t = ke(e), { _editors: r } = i;
  let s = r.get(t);
  if (!s) {
    const n = ve.use();
    if (n.options[t] && n.options[t].editor) {
      const o = n.options[t].editor, c = o();
      c && (r.set(t, c), s = r.get(t));
    }
  }
  return i._emitter.emit("getChanger", t, e), s == null || s.changer((n) => {
    n !== void 0 && (i.addHistory("edit"), typeof n == "number" || n ? V.setCellValue(i, n) : V.clearCellValue(i));
  }), s == null || s.moveChanger((n) => {
    const { _selector: o } = i;
    o && (n !== "none" && V.move(i, !0, n, 1), i._canvas.focus());
  }), s;
}
function on(i) {
  const { _editor: e, _selector: t, _renderer: r } = i;
  if (e && t) {
    const { _focusArea: s, _focus: n } = t;
    if (e.visible && s) {
      const { _rect: o, _target: c } = s, { viewport: f } = r;
      o && c && f && f.inAreas(...n) ? e.rect(o).target(c).show() : e.rect({ x: -100, y: -100, width: 0, height: 0 }).hide();
    }
  }
}
function an(i, e) {
  const { _selector: t } = i;
  if (t) {
    const { _focusRange: r, _focusArea: s } = t;
    if (r && s) {
      const { _rect: n, _target: o } = s, { startRow: c, startCol: f } = r, a = i.cell(c, f), l = nn(i, a);
      i._editor = l, l && n && o && (a && l.value(a), l.cellIndex(c, f).rect(n).target(o).show(e));
    }
  }
}
const Me = {
  move: on,
  reset: an
};
function ln(i) {
  i._vScrollbar = new _r("vertical", i._container).change((e, t) => {
    cs(i._data, e, t) && (i.render(), V.reset(i), Me.move(i));
  }), i._hScrollbar = new _r("horizontal", i._container).change((e, t) => {
    ls(i._data, e, t) && (i.render(), V.reset(i), Me.move(i));
  });
}
function cn(i) {
  const { x: e, y: t, height: r, width: s } = i._contentRect;
  i._vScrollbar && i._vScrollbar.resize(i._height(), r + t), i._hScrollbar && i._hScrollbar.resize(i._width(), s + e);
}
function hn(i, e, t) {
  if (!e) return;
  const { _selector: r, _vScrollbar: s, _hScrollbar: n, _data: o } = i, { viewport: c } = i._renderer;
  if (c && r) {
    const [, f, , a] = c.areas, l = a.range, p = f.range;
    if (s) {
      const h = (d, x, v) => {
        const _ = i.rowsHeight(x, v + 1);
        let b = 0;
        for (let u = d; b < _; u += 1)
          b += i.rowHeight(u);
        return b;
      };
      t ? e.endRow === t.endRow ? e.startRow < t.startRow ? e.startRow > p.endRow && e.startRow < l.startRow && s.scrollBy(-i.rowsHeight(e.startRow, l.startRow)) : e.startRow > t.startRow && // up-
      e.startRow >= l.endRow && s.scrollBy(
        h(l.startRow, l.endRow, e.startRow)
      ) : e.startRow === t.startRow && (e.endRow > t.endRow ? e.endRow >= l.endRow && s.scrollBy(
        h(l.startRow, l.endRow, e.endRow)
      ) : e.endRow < t.endRow && // down-
      e.endRow < l.startRow && s.scrollBy(-i.rowsHeight(e.endRow, l.startRow))) : e.endRow === o.rows.len - 1 ? s.scrollToEnd() : e.startRow === 0 ? s.scrollToStart() : e.endRow >= l.endRow ? s.scrollBy(h(l.startRow, l.endRow, e.endRow)) : e.startRow > p.endRow && e.startRow < l.startRow && s.scrollBy(-i.rowsHeight(e.startRow, l.startRow));
    }
    if (n) {
      const h = (d, x, v) => {
        const _ = i.colsWidth(x, v + 1);
        let b = 0;
        for (let u = d; b < _; u += 1)
          b += i.colWidth(u);
        return b;
      };
      t ? e.endCol === t.endCol ? e.startCol < t.startCol ? e.startCol > p.endCol && e.startCol < l.startCol && n.scrollBy(-i.colsWidth(e.startCol, l.startCol)) : e.startCol > t.startCol && // left-
      e.startCol >= l.endCol && n.scrollBy(
        h(l.startCol, l.endCol, e.startCol)
      ) : e.startCol === t.startCol && (e.endCol > t.endCol ? e.endCol >= l.endCol && n.scrollBy(
        h(l.startCol, l.endCol, e.endCol)
      ) : e.endCol < t.endCol && // right-
      e.endCol < l.startCol && n.scrollBy(-i.colsWidth(e.endCol, l.startCol))) : e.endCol === o.cols.len - 1 ? n.scrollToEnd() : e.startCol === 0 ? n.scrollToStart() : e.endCol >= l.endCol ? n.scrollBy(h(l.startCol, l.endCol, e.endCol)) : e.startCol > p.endCol && e.startCol < l.startCol && n.scrollBy(-i.colsWidth(e.startCol, l.startCol));
    }
  }
}
const He = {
  init: ln,
  resize: cn,
  autoMove: hn
};
function fn(i) {
  i._selector = new rn(!!i._editable).autofillTrigger(
    (e) => {
      const { _selector: t } = i;
      t && Pr(
        i,
        (r, s) => {
          const { currentRange: n } = t;
          if (n) {
            const o = n.clone();
            if (o.contains(r, s))
              t.autofillRange(null);
            else {
              const c = [
                o.startRow - r,
                r - o.endRow,
                o.startCol - s,
                s - o.endCol
              ], f = c.indexOf(Math.max.apply(null, c));
              f === 1 ? (o.startRow = o.endRow + 1, o.endRow = r) : f === 0 ? (o.endRow = o.startRow - 1, o.startRow = r) : f === 3 ? (o.startCol = o.endCol + 1, o.endCol = s) : f === 2 && (o.endCol = o.startCol - 1, o.startCol = s), t.autofillRange(o);
            }
          }
        },
        (r) => r._autofillRange,
        (r) => {
          i.addHistory("auto fill"), i.copy(r._autofillRange, !0).render(), t.autofillRange(null), ye(i);
        }
      );
    }
  );
}
function xn(i, e) {
  const { _selector: t } = i;
  if (t) {
    i.addHistory("set cell value"), t.clearCopy();
    const { _ranges: r } = t;
    r.forEach((s) => {
      s && s.each((n, o) => {
        i.cell(n, o, e);
      });
    }), i.render();
  }
}
function dn(i) {
  if (i._selector) {
    i.addHistory("clear selection value");
    const { _ranges: e } = i._selector;
    e.forEach((t) => {
      t && t.each((r, s) => {
        i._cells.removeValue(r, s);
      });
    }), i.render(), i._canvas.focus();
  }
}
function un(i) {
  if (i._selector) {
    i.addHistory("clear selection cell");
    const { _ranges: e } = i._selector;
    e.forEach((t) => {
      t && t.each((r, s) => {
        i._cells.remove(r, s);
      });
    }), i.render(), i._canvas.focus();
  }
}
function pn(i, e, t) {
  if (i._selector) {
    const { currentRange: r } = i._selector;
    if (r && r.startRow !== void 0 && r.startCol !== void 0 && r.endRow !== void 0 && r.endCol !== void 0 && e >= r.startRow && e <= r.endRow && t >= r.startCol && t <= r.endCol)
      return !0;
  }
  return !1;
}
function zr(i, e, t, r) {
  const { _selector: s, _data: n } = i, o = U.create(e, t), c = Br(n, o);
  s && (s.focus(e, t, c).addRange(s._placement === "body" ? c : o, r), i._emitter.emit("selectorMove", [e, t]));
}
function Ir(i, e, t) {
  const { _selector: r, _data: s } = i;
  r && r.move(e, t).updateLastRange((n) => Br(s, n.union(U.create(e, t))));
}
function ye(i) {
  const { _selector: e, _overlayer: t } = i, { _rowHeader: r, _colHeader: s, viewport: n } = i._renderer;
  if (e && n) {
    const { _placement: o } = e;
    e.clear();
    const c = r.width, f = s.height, a = (h, d) => {
      const x = h.clone();
      return (o === "all" || o === "row-header") && (x.endCol = d.endCol, h.startCol < d.startCol && (x.startCol = d.startCol)), (o === "all" || o === "col-header") && (x.endRow = d.endRow, h.startRow < d.startRow && (x.startRow = d.startRow)), x;
    }, l = ({ range: h }, d) => o === "body" ? h.intersects(d) : o === "col-header" ? h.intersectsCol(d.startCol, d.endCol) : o === "row-header" ? h.intersectsRow(d.startRow, d.endRow) : !0, p = (h, d, x) => {
      let v = h.rect(d);
      return o === "col-header" ? (v = h.rectCol(d.startCol, d.endCol), v.height += 2, (x === 2 || x === 3) && (v.y -= 2)) : o === "row-header" && (v = h.rectRow(d.startRow, d.endRow), v.width += 2, (x === 0 || x === 3) && (v.x -= 2)), v;
    };
    n.areas.forEach((h, d) => {
      const x = t._areas[d], { _ranges: v, _focusRange: _, _copyRange: b, _autofillRange: u } = e;
      v.forEach((g, C) => {
        let m = l(h, g);
        const B = p(h, g, d);
        if (m)
          if (C === v.length - 1) {
            if ((o !== "all" || h.range.intersects(g)) && e.addAreaOutline(B, x), _) {
              h.range.intersects(_) && e.setFocusArea(h.rect(_), x);
              const A = a(g, h.range), D = A.difference(_);
              D.length > 0 ? D.forEach((H) => {
                m = l(h, H), m && e.addArea(h.rect(H), x);
              }) : (o !== "body" || !g.equals(_)) && e.addArea(p(h, A, d), x);
            }
          } else
            e.addArea(B, x);
      }), b && h.range.intersects(b) && e.addCopyArea(h.rect(b), x), u && h.range.intersects(u) && e.addAutofillArea(h.rect(u), x);
    }), n.headerAreas.forEach((h, d) => {
      const x = t._headerAreas[d], { width: v, height: _ } = h;
      d <= 1 ? o === "row-header" || o === "all" ? e.addColHeaderArea({ x: 0, y: 0, width: v, height: f }, x) : e._colHeaderRanges.forEach((b) => {
        h.range.intersectsCol(b.startCol, b.endCol) && e.addColHeaderArea(h.rectCol(b.startCol, b.endCol), x);
      }) : o === "col-header" || o === "all" ? e.addRowHeaderArea({ x: 0, y: 0, width: c, height: _ }, x) : e._rowHeaderRanges.forEach((b) => {
        h.range.intersectsRow(b.startRow, b.endRow) && e.addRowHeaderArea(h.rectRow(b.startRow, b.endRow), x);
      });
    });
  }
}
function _n(i, e) {
  const { _selector: t, _data: r } = i;
  if (t) {
    const s = t._autofillRange;
    if (s)
      return e === "up" ? s.startRow = Pt(r, s.startRow - 1, -1) : e === "down" ? s.endRow = Pt(r, s.endRow + 1, 1) : e === "left" ? s.startCol = zt(r, s.startCol - 1, -1) : e === "right" && (s.endCol = zt(r, s.endCol + 1, 1)), He.autoMove(i, s), ye(i), !0;
  }
  return !1;
}
function s0(i, e, t, r) {
  var c, f;
  if (_n(i, t)) return;
  const { _selector: s, _data: n } = i, { viewport: o } = i._renderer;
  if (s && o) {
    const { _focusRange: a } = s;
    if (a) {
      let { startRow: l, startCol: p, endRow: h, endCol: d } = a;
      const { rows: x, cols: v } = n;
      let [_, b] = s._move;
      e || (l = h = _, p = d = b);
      const u = (c = s.currentRange) == null ? void 0 : c.clone();
      r ? t === "up" ? _ = Pt(n, l - r, -1) : t === "down" ? _ = Pt(n, h + r, 1) : t === "left" ? b = zt(n, p - r, -1) : t === "right" && (b = zt(n, d + r, 1)) : t === "up" ? _ = 0 : t === "down" ? _ = x.len - 1 : t === "left" ? b = 0 : t === "right" && (b = v.len - 1), _ >= 0 && _ <= x.len - 1 && b >= 0 && b <= v.len - 1 && (e ? zr(i, _, b, !0) : (Ir(i, _, b), s._move = [_, b])), s.placement("body"), He.autoMove(i, s.currentRange, e ? void 0 : u), (f = i._selector) == null || f._shadowInputFocus(), ye(i);
    }
  }
}
function Pr(i, e, t, r = (s) => {
}) {
  const { _selector: s, _renderer: n } = i;
  if (!s) return;
  const { _placement: o } = s, c = { row: 0, col: 0 };
  if (o !== "all") {
    const { left: f, top: a } = i._canvas.rect();
    let l = [0, 0], p = null;
    const h = () => {
      p !== null && (clearInterval(p), p = null);
    }, d = (x) => {
      var g, C;
      let [v, _] = [0, 0];
      x.x > 0 && (v = x.x - f), x.y > 0 && (_ = x.y - a), o === "row-header" && (v = 1), o === "col-header" && (_ = 1);
      const b = (g = s.currentRange) == null ? void 0 : g.clone(), { target: u } = x;
      if ((u == null ? void 0 : u.tagName) === "CANVAS") {
        const m = (C = n.viewport) == null ? void 0 : C.cellAt(v, _);
        if (m) {
          const { row: B, col: A } = m;
          (B != c.row || A !== c.col) && (e(B, A), o === "body" && He.autoMove(i, t(s), b), ye(i), c.row = B, c.col = A);
        }
        h();
      } else if (p === null) {
        const m = x.x - l[0], B = x.y - l[1];
        m >= 0 && B >= 0 && (p = setInterval(() => {
          const A = t(s);
          if (A) {
            const { endRow: D, endCol: H } = A;
            m > B ? (s0(i, !1, "right", 1), i.isLastRow(D) && h()) : (s0(i, !1, "down", 1), i.isLastCol(H) && h());
          }
        }, 120));
      }
      l = [x.x, x.y];
    };
    Ji(
      document.body,
      (x) => d(x),
      () => {
        h(), r(s);
      }
    );
  }
}
function Or(i) {
  i._selector && (i._selector.showCopy(), ye(i));
}
function Wr(i) {
  i._selector && (navigator.clipboard.write([
    new ClipboardItem({
      "text/plain": new Blob([""], { type: "text/plain" })
    })
  ]).then(), i._selector.clearCopy(), ye(i));
}
function vn(i, e) {
  const t = U.with(e);
  let r = "";
  return t.eachRow((s) => {
    t.eachCol((n) => {
      let o = i.cellValueString(s, n);
      o.includes(`
`) && (o = `"${o}"`), r += `${o}	`;
    }), r += `
`;
  }), r;
}
function gn(i) {
  const e = [];
  let [t, r] = [0, 0], s = "", n = 0;
  const o = () => {
    e[t] || (e[t] = []), e[t][r] = s, s = "";
  };
  for (const c of i) {
    if (c === "	") {
      o(), r += 1, n = 0;
      continue;
    }
    if (c === `
` && n !== 1) {
      o(), t += 1, r = 0;
      continue;
    }
    c !== '"' ? c !== "\r" && (s += c) : n += 1;
  }
  return r > 0 && o(), e.length <= 0 && e.push([i]), e;
}
function vr(i, e, t = (r) => {
}) {
  return i.types.includes(e) ? (i.getType(e).then((r) => {
    r.text().then((s) => {
      t(s);
    });
  }), !0) : !1;
}
function Cn(i) {
  const { _selector: e } = i;
  if (i._copyable && e) {
    const t = {}, r = e.currentRange;
    r && (Or(i), ["text/plain", "text/html"].forEach((s) => {
      const n = r.toString(), o = s === "text/html" ? i.toHtml(n) : vn(i, n);
      t[s] = new Blob([o], { type: s });
    }), navigator.clipboard.write([new ClipboardItem(t)]).then());
  }
}
function wn(i, e, t) {
  navigator.clipboard.read().then((r) => {
    var s, n, o, c, f;
    if (r.length > 0) {
      i.addHistory("paste value");
      const a = r[0];
      e || (e = !vr(a, "text/html", (l) => {
        i.fill(l).render();
      })), e && vr(a, "text/plain", (l) => {
        i.fill(gn(l)).render();
      }), t && ((s = i._selector) != null && s._copyRange && ((o = (n = i._selector) == null ? void 0 : n._copyRange) == null || o.each((l, p) => {
        i._cells.remove(l, p);
      }), t0(i._data, (f = (c = i._selector) == null ? void 0 : c._copyRange) == null ? void 0 : f.toString())), Wr(i));
    }
  });
}
function bn(i, e) {
  if (i._selector) {
    i.addHistory("set cell format fast");
    const { _ranges: t } = i._selector;
    t.forEach((r) => {
      r && r.each((s, n) => {
        i._cells.setFormat(s, n, e || "normal");
      });
    }), i.render(), i._canvas.focus();
  }
}
function mn(i, e) {
  if (e && i._selector) {
    i.addHistory("set cell fixed fast");
    const { _ranges: t } = i._selector;
    t.forEach((r) => {
      r && r.each((s, n) => {
        i._cells.fixed(s, n, e);
      });
    }), i.render(), i._canvas.focus();
  }
}
function yn(i, e) {
  if (i._selector) {
    i.addHistory("set cell style");
    const { _ranges: t } = i._selector;
    t.forEach((r) => {
      r && r.each((s, n) => i.setStyle(s, n, e));
    }), i.render(), i._canvas.focus();
  }
}
function Bn(i, e) {
  if (i._selector) {
    i.addHistory("set cell style fast");
    const { _ranges: t } = i._selector;
    let r;
    t.forEach((s) => {
      s && s.each((n, o) => {
        const c = i.getStyleIndex(n, o);
        let f = {};
        c !== -1 && (f = i.style(c)), r || (r = {}, r = {
          [e]: !f[e]
        }), i.setStyle(n, o, r);
      });
    }), i.render(), i._canvas.focus();
  }
}
function En(i) {
  if (i._selector) {
    i.addHistory("clear cell style fast");
    const { _ranges: e } = i._selector;
    e.forEach((t) => {
      t && t.each((r, s) => {
        const n = i.cell(r, s);
        n instanceof Object && n.style !== void 0 && delete n.style;
      });
    }), i.render(), i._canvas.focus();
  }
}
function An(i) {
  if (i._selector) {
    i.addHistory("clear cell format fast");
    const { _ranges: e } = i._selector;
    e.forEach((t) => {
      t && t.each((r, s) => {
        const n = i.cell(r, s);
        n instanceof Object && (delete n.format, delete n.fixed, delete n.formula);
      });
    }), i.render(), i._canvas.focus();
  }
}
function Dn(i, e) {
  if (i._selector) {
    i.addHistory(`insert ${e}`), e === "row" ? i._data.rows.len++ : i._data.cols.len++, Nt(i), i.resize();
    const { _ranges: t } = i._selector, { startRow: r, startCol: s } = t[0], n = Sr(i.data()), o = Fr(i.data());
    i._data.merges = i._data.merges.map((c) => {
      const f = c.split(":");
      let [a, l] = fe(f[0]), [p, h] = fe(f[1]);
      return e === "row" ? (l >= r && l++, h >= r && h++) : (a >= s && a++, p >= s && p++), `${ie(a, l)}:${ie(p, h)}`;
    }), e === "row" ? r <= n && i._cells._.forEach((c) => {
      if (c) {
        const [f, a, l] = c;
        f >= r && c[0]++;
      }
    }) : s <= o && i._cells._.forEach((c) => {
      if (c) {
        const [f, a, l] = c;
        a >= s && c[1]++;
      }
    }), i._cells.resetIndexes(), i.render();
  }
}
function Fn(i, e) {
  if (i._selector) {
    i.addHistory(`delete ${e}`);
    const { _ranges: t } = i._selector, { startRow: r, startCol: s, endRow: n, endCol: o } = t[0], c = n - r + 1, f = o - s + 1, a = Sr(i.data()), l = Fr(i.data()), p = {};
    i._data.merges = i._data.merges.map((h) => {
      const d = h.split(":");
      let [x, v] = fe(d[0]), [_, b] = fe(d[1]);
      if (e === "row") {
        if (v >= r && b <= n) return null;
        p[`${v}-${x}`] = !0, v > r && (v -= c), b > r && (b -= c);
      } else {
        if (x >= s && _ <= o) return null;
        p[`${v}-${x}`] = !0, x > r && (x -= f), _ > r && (_ -= f);
      }
      return `${ie(x, v)}:${ie(_, b)}`;
    }).filter((h) => !!h), e === "row" ? r <= a && (i._cells._.forEach((h, d) => {
      if (h) {
        const [x, v, _] = h;
        x >= r && x <= n ? p[`${x}-${v}`] || (i._cells._[d] = null) : x > r && (h[0] -= c);
      }
    }), i._cells._ = i._cells._.filter((h) => !!h)) : s <= l && (i._cells._.forEach((h, d) => {
      if (h) {
        const [x, v, _] = h;
        v >= s && v <= o ? p[`${x}-${v}`] || (i._cells._[d] = null) : x > s && (h[1] -= f);
      }
    }), i._cells._ = i._cells._.filter((h) => !!h)), e === "row" ? i._data.rows.len -= c : i._data.cols.len -= f, Nt(i), i.resize(), i._cells.resetIndexes(), i.render();
  }
}
function Rn(i, e) {
  const t = [];
  if (!i._selector) return;
  i.addHistory("set border");
  const { _ranges: r } = i._selector;
  r && r.forEach((s) => {
    t.push(`${ie(s.startCol, s.startRow)}:${ie(s.endCol, s.endRow)}`);
  }), t.forEach((s) => {
    i.addBorder(s, e.type, e.lineStyle, e.color);
  }), i.render();
}
function Sn(i) {
  const e = [];
  if (!i._selector) return;
  i.addHistory("clear border");
  const { _ranges: t } = i._selector;
  t && t.forEach((r) => {
    e.push(`${ie(r.startCol, r.startRow)}:${ie(r.endCol, r.endRow)}`);
  }), e.forEach((r) => {
    i.clearBorder(r);
  }), i.render();
}
function kn(i) {
  i.isMerged() ? i.unmerge() : i.merge(), i.render();
}
function Hn(i) {
  if (i._data.freeze)
    i.freeze();
  else if (i._selector) {
    const { _ranges: e } = i._selector;
    e.length > 0 && i.freeze(ie(e[0].startCol, e[0].startRow));
  }
  i.render();
}
function $n(i) {
  var e;
  if (i._selector) {
    i.addHistory("set paintFormat");
    const t = i._selector.paintFormatArea;
    if (t) {
      const { startCol: r, startRow: s, endCol: n, endRow: o } = t, c = n - r + 1, f = o - s + 1, a = {}, l = {};
      t.each((p, h) => {
        const d = i.cell(p, h), x = i.getPureStyle(p, h);
        a[`${p - s}-${h - r}`] = { ...x }, typeof d == "object" && (l[`${p - s}-${h - r}`] = d);
      });
      for (const p of i._selector._ranges) {
        const { startCol: h, startRow: d, endCol: x, endRow: v } = p;
        p.each((_, b) => {
          const u = `${(_ - d) % f}-${(b - h) % c}`, g = i.cell(_, b);
          if (l[u]) {
            const C = JSON.parse(JSON.stringify(l[u]));
            C.style = void 0, g instanceof Object ? C.value = (g == null ? void 0 : g.value) || "" : C.value = g, i.cell(_, b, C), i.setStyle(_, b, { ...a[u] }, !0);
          }
        });
      }
    }
    (e = i._selector) == null || e.clearCopy(), i._selector.paintFormatArea = null, i.render();
  }
}
const V = {
  init: fn,
  setCellStyle: yn,
  fastSetCellStyle: Bn,
  fastClearCellStyle: En,
  fastClearCellFormat: An,
  fastSetCellFormat: bn,
  fastSetCellFixed: mn,
  setCellValue: xn,
  clearCellValue: dn,
  clearCell: un,
  addRange: zr,
  unionRange: Ir,
  reset: ye,
  move: s0,
  bindMousemove: Pr,
  showCopy: Or,
  clearCopy: Wr,
  copyValue: Cn,
  pasteValue: wn,
  insertRowOrCol: Dn,
  deleteRowOrCol: Fn,
  isInRange: pn,
  setBorder: Rn,
  clearBorder: Sn,
  mergeGrid: kn,
  freezeGrid: Hn,
  paintFormat: $n
};
function Tn(i) {
  i._rowResizer = new dr(
    "row",
    i._container,
    i._minRowHeight,
    () => i._width(),
    (e, { row: t, height: r }) => {
      i.rowHeight(t, r + e).render(), V.reset(i), i._canvas.focus();
    }
  ), i._colResizer = new dr(
    "col",
    i._container,
    i._minColWidth,
    () => i._height(),
    (e, { col: t, width: r }) => {
      i.colWidth(t, r + e).render(), V.reset(i), i._canvas.focus();
    }
  );
}
const zn = {
  init: Tn
};
function In(i, e) {
  let t = '<table xmlns="http://www.w3.org/1999/xhtml" style="border-spacing: 0; border-collapse: collapse;">';
  const r = U.with(e), s = i._data.merges.map((c) => U.with(c)).filter((c) => c.intersects(r)), n = (c, f) => c === "dashed" || c === "dotted" ? `1px ${c} ${f}` : `${c === "thick" ? 3 : c === "medium" ? 2 : 1}px solid ${f}`, o = /* @__PURE__ */ new Map();
  for (const c of i._data.borders) {
    const [f, a, l, p] = c, h = U.with(f);
    if (h.intersects(r)) {
      const { startRow: d, startCol: x, endRow: v, endCol: _ } = h;
      h.each((b, u) => {
        const g = n(l, p), C = [];
        a === "all" && C.push("border"), (a === "outside" || a === "left") && u === x && C.push("border-left"), (a === "outside" || a === "right") && u === _ && C.push("border-right"), (a === "outside" || a === "top") && b === d && C.push("border-top"), (a === "outside" || a === "bottom") && b === v && C.push("border-bottom"), (a === "inside" || a === "vertical") && u >= x && u < _ && C.push("border-right"), (a === "inside" || a === "horizontal") && b >= d && b < v && C.push("border-bottom"), C.length > 0 && o.set(
          `${b}_${u}`,
          C.map((m) => `${m}:${g};`).join("")
        );
      });
    }
  }
  return t += "<colgroup>", r.eachCol((c) => {
    t += `<col width="${i.colWidth(c)}"/>`;
  }), t += "</colgroup>", t += "<tbody>", r.eachRow((c) => {
    t += `<tr style="height: ${i.rowHeight(c)}px;">`, r.eachCol((f) => {
      const a = i.cell(c, f), l = U.create(c, f);
      let p = !1, [h, d] = [1, 1];
      for (const x of s) {
        if (x.startRow === c && x.startCol === f) {
          h = x.rows + 1, d = x.cols + 1;
          break;
        }
        if (x.intersects(l)) {
          p = !0;
          break;
        }
      }
      if (!p) {
        const x = ke(a);
        t += "<td", h > 1 && (t += ` rowspan="${h}"`), d > 1 && (t += ` colspan="${d}"`), t += ` cellType="${x}"`;
        let v = "";
        const _ = `${c}_${f}`;
        o.has(_) && (v += o.get(_)), a && a instanceof Object && a.style !== void 0 && (v += On(i.style(a.style, !0))), t += `style="${v ? `${v};` : ""} position: relative;"`;
        const b = ke(a);
        t += ve.use().getRender(b).toHtml(i, a, c, f, t);
      }
    }), t += "</tr>";
  }), `${t}</tbody></table>`;
}
function Pn(i, e, [t, r]) {
  const s = [0, 0];
  if (e && e.includes("</table>")) {
    const { _data: n } = i, o = n.style, c = document.createElement("template");
    c.innerHTML = e;
    const f = [], a = c.content.querySelectorAll("tr");
    s[0] = t + a.length - 1;
    const l = [];
    if (a.forEach((p, h) => {
      const d = p.querySelectorAll("td");
      h === 0 && (s[1] = r + d.length - 1);
      let x = null;
      const v = [];
      for (const [b, u] of d.entries()) {
        let [g, C] = [h + t, b + r];
        f.length > 0 && f.forEach((F) => {
          F.containsRow(g) && F.startCol <= C && (C += F.cols, F.startRow !== g && (C += 1));
        });
        const m = ie(C, g);
        let [B, A] = [1, 1];
        if (gr(u, "rowspan", (F) => B = Number.parseInt(F)), gr(u, "colspan", (F) => A = Number.parseInt(F)), B > 1 || A > 1) {
          const F = U.create(g, C, g + B - 1, C + A - 1);
          i.merge(F.toString()), f.push(F);
        }
        h === 0 && (s[1] += A - 1);
        const D = {};
        ae(u, "background-color", "", (F) => D.bgcolor = F), ae(u, "color", o.color, (F) => D.color = F), ae(
          u,
          "text-align",
          o.align,
          (F) => D.align = F
        ), ae(
          u,
          "vertical-align",
          o.valign,
          (F) => D.valign = F
        ), Xe(
          u,
          "white-space",
          "normal",
          (F) => D.textwrap = !0
        ), Xe(
          u,
          "text-decoration",
          "underline",
          (F) => D.underline = !0
        ), Xe(
          u,
          "text-decoration",
          "line-through",
          (F) => D.strikethrough = !0
        ), Xe(u, "font-style", "italic", (F) => D.italic = !0), ae(u, "font-weight", "normal", (F) => {
          (F === "bold" || Number.parseInt(F) >= 700) && (D.bold = !0);
        }), ae(
          u,
          "font-family",
          o.fontFamily,
          (F) => D.fontFamily = F
        ), ae(
          u,
          "font-size",
          o.fontSize,
          (F) => D.fontSize = Number.parseInt(F)
        );
        const H = (F) => {
          const [S, k, ...W] = F.split(" ").map((M) => M.trim());
          let O = "thin";
          if (k === "solid") {
            let M = Number.parseInt(S);
            S.includes("pt") && (M = ps(Number.parseInt(S))), M === 2 ? O = "medium" : M === 3 && (O = "thick");
          } else
            O = k;
          return [O, W.join("")];
        }, y = [];
        let E = null;
        ae(u, "border-width", "", (F) => y.push(F)), ae(u, "border-style", "", (F) => y.push(F)), ae(u, "border-color", "", (F) => y.push(F)), y.length >= 3 ? E = [m, "all", ...H(y.join(" "))] : ae(
          u,
          "border",
          "none",
          (F) => E = [m, "all", ...H(F)]
        ) || ["top", "right", "bottom", "left"].forEach((F) => {
          ae(
            u,
            `border-${F}`,
            "none",
            (S) => E = [m, F, ...H(S)]
          );
        }), x === null ? E !== null && (x = E) : E !== null && E[1] === x[1] && E[2] === x[2] && E[3] === x[3] ? x[0] = `${x[0].split(":")[0]}:${m}` : (v.push(x), x = E);
        const $ = u.getAttribute("cellType") || "text", T = ve.use().getRender($).fromHtml(i, u, D);
        Object.keys(T).length > 0 && i.cell(g, C, T);
      }
      x != null && v.push(x);
      const _ = l.at(-1);
      if (_ && _.length > 0)
        if (_.length === 1 && v.length === 1 && _[0][1] === "all" && _[0][1] === v[0][1] && _[0][2] === v[0][2] && _[0][3] === v[0][3]) {
          const b = U.with(_[0][0]);
          b.endRow += 1, _[0][0] = b.toString();
        } else
          l.push(v);
      else
        l.push(v);
    }), l.length > 0)
      for (const p of l)
        p.forEach((h) => i.addBorder(...h));
  }
  return s;
}
function gr(i, e, t) {
  if (i.hasAttribute(e)) {
    const r = i.getAttribute(e);
    r != null && t(r);
  }
}
function ae(i, e, t, r) {
  const s = i.style.getPropertyValue(e), n = s !== null && s !== "" && s !== t;
  return n && r(s), n;
}
function Xe(i, e, t, r) {
  const s = i.style.getPropertyValue(e);
  s === t && r(s);
}
function On(i) {
  let e = "";
  return i.bgcolor && (e += `background-color: ${i.bgcolor};`), i.color && (e += `color: ${i.color};`), i.align && (e += `text-align: ${i.align};`), i.valign && (e += `vertical-align: ${i.valign};`), i.textwrap === !0 && (e += "white-space: normal;"), i.underline === !0 && (e += "text-decoration: underline;"), i.strikethrough === !0 && (e += "text-decoration: line-through;"), i.bold === !0 && (e += "font-weight: bold;"), i.italic === !0 && (e += "font-style: italic;"), i.fontFamily && (e += `font-family: ${i.fontFamily};`), i.fontSize && (e += `font-size: ${i.fontSize}pt;`), e;
}
class Wn {
  constructor(e) {
    w(this, "table");
    w(this, "setCutted", !1);
    this.table = e, this.table._canvas.on("mousedown", (t) => this.mousedownHandler(t)).on("mousemove", (t) => this.mousemoveHandler(t)).on("mouseup", (t) => this.mouseUpHandler(t)).on("wheel.prevent", (t) => this.wheelHandler(t)).on("keydown", (t) => this.keydownHandler(t)).on(
      "contextmenu.prevent",
      (t) => this.contextmenuHandler(t)
    ).on("dblclick.prevent", () => {
      Me.reset(this.table);
    }), this.initSelectorShadowInput();
  }
  initSelectorShadowInput() {
    const e = this.table._selector, t = e == null ? void 0 : e._shadowInput;
    !e || !t || (t.on("compositionstart", (r) => {
      e._shadowInputLock = !0, t._.value = "", t._.style.width = "auto", r.preventDefault();
    }), t.on("compositionend", (r) => {
      e._shadowInputLock = !1, t._.style.width = "0", t._.value = "", Me.reset(this.table, r.data), r.preventDefault();
    }), t.on("keydown", (r) => {
      setTimeout(() => {
        e._shadowInputLock || this.keydownHandler(r);
      }, 0), r.preventDefault();
    }));
  }
  mousedownHandler(e) {
    if (e.button === 1) return;
    const { _selector: t, _renderer: r, _editor: s, _emitter: n } = this.table, { viewport: o } = r;
    if (s && s.hide(), t && o) {
      const { offsetX: c, offsetY: f, ctrlKey: a, metaKey: l, shiftKey: p } = e, h = o.cellAt(c, f);
      if (h) {
        n.emit("click", h, e);
        const { placement: d, row: x, col: v } = h;
        p ? V.unionRange(this.table, x, v) : (e.button === 2 && V.isInRange(this.table, x, v) || (t.placement(d), V.addRange(this.table, x, v, !(l || a))), d === "body" && He.autoMove(this.table, t.currentRange)), V.reset(this.table), V.bindMousemove(
          this.table,
          (_, b) => {
            V.unionRange(this.table, _, b);
          },
          (_) => _.currentRange
        ), this.table.render();
      }
    }
  }
  mouseUpHandler(e) {
    var t;
    (t = this.table._selector) != null && t.paintFormatArea && this.eventTrigger("paintFormat");
  }
  mousemoveHandler(e) {
    const { _rowResizer: t, _colResizer: r, _renderer: s } = this.table, { viewport: n } = s, { buttons: o, offsetX: c, offsetY: f } = e;
    if (n && o === 0) {
      const { _rowHeader: a, _colHeader: l } = this.table._renderer;
      if (t && a.width > 0)
        if (c < a.width && f > l.height) {
          const p = n.cellAt(c, f);
          p && t.show(p);
        } else
          t.hide();
      if (r && l.height > 0)
        if (f < l.height && c > a.width) {
          const p = n.cellAt(c, f);
          p && r.show(p);
        } else
          r.hide();
    }
  }
  wheelHandler(e) {
    const { deltaX: t, deltaY: r, shiftKey: s } = e, { _hScrollbar: n, _vScrollbar: o } = this.table;
    Math.abs(t) > Math.abs(r) ? n && n.scrollBy(t) : s && n ? n.scrollBy(r) : !s && o && o.scrollBy(r);
  }
  canInput(e) {
    const { ctrlKey: t, shiftKey: r, metaKey: s, altKey: n, code: o, keyCode: c } = e;
    return t || r || s || n ? !1 : !!(o.startsWith("Key") || o.startsWith("Digit") || o.startsWith("Numpad") && c >= 96 || [
      "Minus",
      "Equal",
      "Space",
      "BracketLeft",
      "BracketRight",
      "Backslash",
      "Semicolon",
      "Quote",
      "Comma",
      "Period",
      "Slash"
    ].includes(o));
  }
  eventTrigger(e, ...t) {
    if (e === "move") {
      const r = t[0], s = t[1] || void 0, n = !!t[2];
      V.move(this.table, n, r, s), this.table._canvas.focus(), this.table.render();
    } else if (e === "copy")
      V.copyValue(this.table);
    else if (e === "cut")
      V.copyValue(this.table), this.setCutted = !0;
    else if (e === "paste") {
      if (this.table._editable) {
        const r = !!t[0];
        V.pasteValue(this.table, r, this.setCutted), this.table._canvas.focus(), this.setCutted = !1;
      }
    } else if (e === "undo")
      this.table._history.undo({ type: "undo", data: this.table.data() }, ({ data: r }) => {
        this.table.data(r), this.table.render();
      });
    else if (e === "redo")
      this.table._history.redo({ type: "redo", data: this.table.data() }, ({ data: r }) => {
        this.table.data(r), this.table.render();
      });
    else if (e === "setStyle")
      V.setCellStyle(this.table, t[0] || {});
    else if (e === "fastStyle") {
      const r = t[0];
      V.fastSetCellStyle(this.table, r);
    } else if (e === "fastFormat") {
      const r = t[0];
      V.fastSetCellFormat(this.table, r);
    } else if (e === "fastFixed") {
      const r = t[0];
      V.fastSetCellFixed(this.table, r);
    } else if (e === "clearCopy")
      V.clearCopy(this.table);
    else if (e === "clearCell") {
      const r = t[0];
      r === "cell" ? V.clearCell(this.table) : r === "value" ? V.clearCellValue(this.table) : r === "style" ? V.fastClearCellStyle(this.table) : r === "format" && V.fastClearCellFormat(this.table);
    } else if (e === "insertRow")
      V.insertRowOrCol(this.table, "row");
    else if (e === "insertCol")
      V.insertRowOrCol(this.table, "col");
    else if (e === "deleteRow")
      V.deleteRowOrCol(this.table, "row");
    else if (e === "deleteCol")
      V.deleteRowOrCol(this.table, "col");
    else if (e === "setBorder") {
      const r = t[0], s = t[1], n = t[2];
      r && s && n && V.setBorder(this.table, { type: r, lineStyle: s, color: n });
    } else e === "clearBorder" ? V.clearBorder(this.table) : e === "merge" ? V.mergeGrid(this.table) : e === "freeze" ? V.freezeGrid(this.table) : e === "paintFormat" && V.paintFormat(this.table);
  }
  keydownHandler(e) {
    const { ctrlKey: t, shiftKey: r, metaKey: s, altKey: n, code: o } = e;
    (o === "Enter" || o === "NumpadEnter") && !t && !s && !n ? this.eventTrigger("move", r ? "up" : "down", 1, !0) : o === "Tab" && !t && !s && !n ? this.eventTrigger("move", r ? "left" : "right", 1, !0) : o.startsWith("Arrow") ? this.eventTrigger(
      "move",
      o.slice(5).toLowerCase(),
      1,
      !r
    ) : o === "KeyX" && (t || s) ? this.eventTrigger("cut") : o === "KeyC" && (t || s) ? this.eventTrigger("copy") : o === "KeyV" && (t || s) ? this.eventTrigger("paste", e.shiftKey) : o === "KeyZ" && (t || s) ? this.eventTrigger("undo") : o === "KeyY" && (t || s) ? this.eventTrigger("redo") : o === "KeyB" && (t || s) ? this.eventTrigger("fastStyle", "bold") : o === "KeyU" && (t || s) ? this.eventTrigger("fastStyle", "underline") : o === "KeyI" && (t || s) ? this.eventTrigger("fastStyle", "italic") : o === "Escape" ? this.eventTrigger("clearCopy") : o === "Backspace" ? this.eventTrigger("clearCell", r ? "style" : "value") : o === "Delete" ? this.eventTrigger("clearCell", "cell") : this.canInput(e) && Me.reset(this.table, e.key), e.preventDefault();
  }
  contextmenuHandler(e) {
    this.table._contextMenu.show(e), e.preventDefault();
  }
}
class Mn {
  constructor() {
    w(this, "undoItems");
    w(this, "redoItems");
    w(this, "maxSize", 50);
    this.undoItems = [], this.redoItems = [];
  }
  add(e) {
    this.undoItems.length > this.maxSize && this.undoItems.shift(), this.undoItems.push(JSON.stringify(e)), this.redoItems = [];
  }
  canUndo() {
    return this.undoItems.length > 0;
  }
  canRedo() {
    return this.redoItems.length > 0;
  }
  undo(e, t) {
    const { undoItems: r, redoItems: s } = this;
    this.canUndo() && (s.push(JSON.stringify(e)), t(JSON.parse(r.pop())));
  }
  redo(e, t) {
    const { undoItems: r, redoItems: s } = this;
    this.canRedo() && (r.push(JSON.stringify(e)), t(JSON.parse(s.pop())));
  }
}
const Ln = (i) => new Promise((e, t) => {
  const r = document.createElement("input");
  r.setAttribute("type", "file"), r.setAttribute("accept", i), r.click(), r.onchange = (s) => {
    if (s.target && s.target.files) {
      const n = s.target.files[0];
      n || t("files.length is zero");
      const o = new FileReader();
      o.onload = function(c) {
        var a;
        const f = (a = c.target) == null ? void 0 : a.result;
        e(f);
      }, o.readAsDataURL(n);
    } else
      t("event error");
  };
});
class Nn {
  constructor(e) {
    w(this, "table");
    w(this, "_contextElement");
    w(this, "hiddenOption", []);
    w(this, "_extendOptions", []);
    w(this, "options", () => [
      {
        id: "undo",
        label: this.table._i18n.t("undo"),
        shortcut: "Ctrl + Z",
        disable: () => !this.table._history.canUndo(),
        action: () => {
          this.table._events.eventTrigger("undo");
        }
      },
      {
        id: "redo",
        label: this.table._i18n.t("redo"),
        shortcut: "Ctrl + Y",
        disable: () => !this.table._history.canRedo(),
        action: () => {
          this.table._events.eventTrigger("redo");
        }
      },
      {
        type: "div"
      },
      {
        id: "cut",
        label: this.table._i18n.t("cut"),
        shortcut: "Ctrl + X",
        action: () => {
          this.table._events.eventTrigger("cut");
        }
      },
      {
        id: "copy",
        label: this.table._i18n.t("copy"),
        shortcut: "Ctrl + C",
        action: () => {
          this.table._events.eventTrigger("copy");
        }
      },
      {
        id: "paste",
        label: this.table._i18n.t("paste"),
        shortcut: "Ctrl + V",
        action: () => {
          this.table._events.eventTrigger("paste");
        }
      },
      {
        id: "pasteValue",
        label: this.table._i18n.t("onlyPasteValue"),
        shortcut: "Ctrl + Shift + V",
        action: () => {
          this.table._events.eventTrigger("paste", !0);
        }
      },
      {
        type: "div"
      },
      {
        id: "pasteValue",
        label: this.table._i18n.t("insertRow"),
        action: () => {
          this.table._events.eventTrigger("insertRow");
        }
      },
      {
        id: "insertCol",
        label: this.table._i18n.t("insertCol"),
        action: () => {
          this.table._events.eventTrigger("insertCol");
        }
      },
      {
        type: "tree",
        id: "insertMore",
        label: this.table._i18n.t("insert_others"),
        children: [
          {
            id: "insertPicture",
            label: this.table._i18n.t("insert_pictures"),
            action: async (e, t) => {
              try {
                const r = await Ln("image/*"), s = Ve.use().savePicture(r);
                V.setCellValue(t, {
                  type: "image",
                  valueType: "local",
                  value: s
                }), t.render();
              } catch {
              }
            }
          }
          // {
          //     id: 'insertChart',
          //     label: '插入图表',
          //     action: (evt, table) => {
          //         console.log('insert chart')
          //     },
          // },
        ]
      },
      {
        type: "div"
      },
      {
        id: "deleteRow",
        label: this.table._i18n.t("deleteRow"),
        action: () => {
          this.table._events.eventTrigger("deleteRow");
        }
      },
      {
        id: "deleteCol",
        label: this.table._i18n.t("deleteCol"),
        action: () => {
          this.table._events.eventTrigger("deleteCol");
        }
      },
      {
        id: "deleteValue",
        label: this.table._i18n.t("deleteValue"),
        shortcut: "Backspace",
        action: () => {
          this.table._events.eventTrigger("clearCell", "value");
        }
      },
      {
        id: "deleteStyle",
        label: this.table._i18n.t("deleteStyle"),
        shortcut: "Shift + Backspace",
        action: () => {
          this.table._events.eventTrigger("clearCell", "style");
        }
      },
      {
        id: "deleteCell",
        label: this.table._i18n.t("deleteCell"),
        shortcut: "Delete",
        action: () => {
          this.table._events.eventTrigger("clearCell", "cell");
        }
      }
    ]);
    w(this, "hide", (e) => {
      e.srcElement.className.includes("context-item--disabled") || e.srcElement.className.includes("context-item-tree") || e.srcElement.className.includes("divider") || setTimeout(() => {
        this._contextElement.css("display", "none"), window.removeEventListener("click", this.hide);
      }, 0);
    });
    w(this, "appendOption", (e) => {
      this._extendOptions.push(e);
    });
    w(this, "removeOption", (e) => {
      const t = this._extendOptions.findIndex((r) => !r.type && r.id === e);
      t !== -1 && this._extendOptions.splice(t, 1);
    });
    this.table = e, this._contextElement = N("ul", `${j}-context-menu`), this._contextElement.hide(), this.table._container.append(this._contextElement);
  }
  async show(e) {
    this._contextElement.css("top", `${e.layerY + 5}px`), this._contextElement.css("left", `${e.layerX + 5}px`);
    const t = (l) => {
      if (l === void 0) return new Promise((p) => p(!1));
      if (typeof l == "boolean") return new Promise((p) => p(l));
      if (typeof l == "function") {
        const p = l(this.table);
        return Object.prototype.toString.call(p) === "[object Promise]" ? p : new Promise((h) => h(p));
      }
      return new Promise((p) => p(!1));
    };
    let r;
    typeof this.hiddenOption == "function" ? r = this.hiddenOption(this.table) : r = this.hiddenOption, this._contextElement.html("");
    let s = 0;
    const n = [...this.options(), ...this._extendOptions], o = async (l) => {
      const p = ["context-item"], h = await t(l.disable);
      l.type === "tree" && p.push("context-item-tree"), h && p.push("context-item--disabled");
      const d = N("li", p);
      if (l.type === "tree") {
        const x = N("div", "label-container").html(
          `<span class="label">${l.label}</span> <span class="arrow"><span class="icon arrow-right"></span> </span>`
        ), v = N("div", ["tree-list", `${j}-context-menu`]);
        for (const b of l.children)
          v.append(await o(b));
        let _ = null;
        d.on("mouseenter", () => {
          _ !== null && clearInterval(_), v.css("display", "block");
          const b = d._.getBoundingClientRect();
          document.body.clientWidth - b.right < v._.clientWidth && (v.css("left", "calc(-100%)"), v.css("margin-left", "-5px"));
        }), d.on("mouseleave", () => {
          _ = setTimeout(() => {
            v.css("display", "none");
          }, 100);
        }), d.append(x, v);
      } else {
        const x = `<span class="label">${l.label}</span> <span class="shortcut">${l.shortcut || ""}</span>`;
        d.html(x);
      }
      return !h && l.action && d.on(
        "click",
        (x) => l.action(x, this.table)
      ), d;
    };
    for (const l of n)
      l.type === "div" ? s > 0 && (this._contextElement.append(N("div", "divider")), s = 0) : !await t(l.hidden) && !r.includes(l.id) && (this._contextElement.append(await o(l)), s++);
    this._contextElement.show();
    const c = this.table._width(), f = this.table._height(), a = this._contextElement.offset();
    e.layerY + a.height > f && this._contextElement.css("top", `${f - a.height - 20}px`), e.layerX + a.width > c && this._contextElement.css(
      "left",
      `${c - a.width - (c - e.layerX)}px`
    ), window.addEventListener("click", this.hide);
  }
}
const qn = {
  cut: "Cut",
  copy: "Copy",
  paste: "Paste",
  undo: "Undo",
  redo: "Redo",
  onlyPasteValue: "Paste Text",
  delete: "Delete",
  paintformat: "Format brush",
  clearformat: "Clear format",
  valueformat: "Data format",
  increase_dicimal: "Increase the number of decimal places",
  reduce_dicimal: "Increase the number of decimal places",
  fontFamily: "Font",
  fontSize: "Font size",
  fontBold: "Bold",
  fontItalic: "Italics",
  fontStrike: "Center line",
  fontUnderline: "Underline",
  fontAlign: "Line up the text horizontally",
  fontVerticalAlign: "Align the text vertically",
  fontAutoWrap: "Automatic line wrapping",
  fontColor: "Text color",
  bgColor: "Background color",
  border: "Border",
  mergeCell: "Merge cells",
  freezeCell: "Freeze cells",
  insertRow: "Insert Row",
  insertCol: "Insert Col",
  deleteRow: "Delete Row",
  deleteCol: "Delete Col",
  deleteValue: "Delete Text",
  deleteStyle: "Delete Style",
  deleteCell: "Delete",
  theme_color: "Theme colors",
  insert_others: "Insert other",
  insert_pictures: "Insert picture",
  formats: {
    normal: "Normal",
    text: "Text",
    number: "Number",
    scientific: "Scientific",
    percent: "Percent",
    CNY: "CNY",
    USD: "USD",
    EUR: "EUR",
    shortDate: "Short dates",
    longDate: "Long dates",
    time: "Time"
  }
}, jn = {
  cut: "剪切",
  copy: "复制",
  paste: "粘贴",
  undo: "撤销",
  redo: "恢复",
  onlyPasteValue: "仅粘贴内容",
  delete: "删除",
  paintformat: "格式刷",
  clearformat: "清除格式",
  valueformat: "数据格式",
  increase_dicimal: "增加小数位数",
  reduce_dicimal: "增加小数位数",
  fontFamily: "字体",
  fontSize: "字号",
  fontBold: "加粗",
  fontItalic: "斜体",
  fontStrike: "中划线",
  fontUnderline: "下划线",
  fontAlign: "文本水平对齐",
  fontVerticalAlign: "文本垂直对齐",
  fontAutoWrap: "自动换行",
  fontColor: "文字颜色",
  bgColor: "背景颜色",
  border: "边框",
  mergeCell: "合并单元格",
  freezeCell: "冻结单元格",
  insertRow: "插入行",
  insertCol: "插入列",
  deleteRow: "删除行",
  deleteCol: "删除列",
  deleteValue: "清空内容",
  deleteStyle: "清除样式",
  deleteCell: "完全删除",
  theme_color: "主题颜色",
  insert_others: "插入其他",
  insert_pictures: "插入图片",
  formats: {
    normal: "正常",
    text: "文本",
    number: "数值",
    scientific: "科学计数法",
    percent: "百分比",
    CNY: "人民币",
    USD: "美元",
    EUR: "欧元",
    shortDate: "短日期",
    longDate: "长日期",
    time: "时间"
  }
}, Ne = class Ne {
  constructor() {
    w(this, "_currentLang", "en");
    w(this, "changeCallbacks", []);
    w(this, "t", (e) => {
      let t = this._currentLang;
      return Ne.messages[t] || (console.error(`fail to use lang: ${this._currentLang}, auto use english`), t = "en"), this._deepValue(e, t);
    });
    return this;
  }
  _deepValue(e, t) {
    const r = e.split(".");
    let s = Ne.messages[t];
    for (const n of r)
      if (s[n] !== void 0)
        s = s[n];
      else {
        t !== "en" ? s = this._deepValue(e, "en") : s = e;
        break;
      }
    return s;
  }
  changeLang(e) {
    this._currentLang = e, this.changeCallbacks.forEach((t) => {
      t && t();
    });
  }
  currentLang() {
    return this._currentLang;
  }
  onChange(e) {
    return this.changeCallbacks.push(e), this.changeCallbacks.length - 1;
  }
  clearOnChange(e) {
    this.changeCallbacks[e] && (this.changeCallbacks[e] = null);
  }
};
w(Ne, "messages", {
  en: qn,
  zh: jn
});
let i0 = Ne;
class ee {
  constructor(e) {
    w(this, "table");
    w(this, "_");
    w(this, "_tooltip", null);
    w(this, "hidden", !1);
    w(this, "disabled", !1);
    this.table = e, this._ = N("div", "button-container");
  }
  update() {
  }
  action(e) {
  }
  tooltip(e) {
    return setTimeout(() => {
      let t = "";
      typeof e == "string" ? t = e : t = e.title;
      let r = `<div style="padding: 6px"><span>${t}</span>`;
      e instanceof Object && e.shortkey && (r += `<span style="margin-left: 5px; font-size: 12px">${e.shortkey}</span>`), r += "</div>", this._tooltip = N("div", "tooltips").html(r).css("position", "absolute").css("top", "40px").css("z-index", "999").css("background", "#fff").hide();
      let s = null;
      const n = typeof e == "string" ? void 0 : e.delay;
      this._.on("mouseenter", () => {
        s && clearTimeout(s), s = setTimeout(() => {
          var o;
          (o = this._tooltip) == null || o.show();
        }, n ?? 500);
      }), this._.on("mouseleave", () => {
        var o;
        s && clearTimeout(s), (o = this._tooltip) == null || o.hide();
      }), this._.append(this._tooltip);
    }, 100), this;
  }
}
class Ae extends ee {
  constructor(t) {
    super(t);
    w(this, "table");
    this.table = t, this._.append(N("div", `${j}-hm-divider`).css("margin-left", "3px"));
  }
}
class Vn extends ee {
  constructor(t) {
    super(t);
    w(this, "table");
    w(this, "button");
    this.table = t, this.button = N("div", `${j}-hm-button`).append(
      N("div", `${j}-icon`).html('<div class="icon undo"></div>')
    ), this._.append(this.button), this.button.on("click", (r) => this.action(r));
  }
  update() {
    this.disabled = !this.table._history.canUndo(), this.disabled ? this.button._.classList.add("disabled") : this.button._.classList.remove("disabled");
  }
  action(t) {
    this.disabled || this.table._events.eventTrigger("undo");
  }
}
class Yn extends ee {
  constructor(t) {
    super(t);
    w(this, "table");
    w(this, "button");
    this.table = t, this.button = N("div", `${j}-hm-button`);
    const r = N("div", `${j}-icon`);
    r.html('<div class="icon redo"></div>'), this._.append(this.button.append(r)), this.button.on("click", (s) => this.action(s));
  }
  update() {
    this.disabled = !this.table._history.canRedo(), this.disabled ? this.button._.classList.add("disabled") : this.button._.classList.remove("disabled");
  }
  action(t) {
    this.disabled || this.table._events.eventTrigger("redo");
  }
}
class Un extends ee {
  constructor(t) {
    super(t);
    w(this, "table");
    this.table = t;
    const r = N("div", `${j}-hm-button`), s = N("div", `${j}-icon`);
    s.html('<div class="icon paintformat"></div>'), this._.append(r.append(s)), r.on("click", (n) => this.action(n));
  }
  update() {
  }
  async action(t) {
    var r;
    this.table._selector && ((r = this.table._selector) == null || r.showCopy(), this.table._selector.paintFormatArea = this.table._selector._ranges[0]);
  }
}
class Kn extends ee {
  constructor(t) {
    super(t);
    w(this, "table");
    this.table = t;
    const r = N("div", `${j}-hm-button`), s = N("div", `${j}-icon`);
    s.html('<div class="icon clearformat"></div>'), this._.append(r.append(s)), r.on("click", (n) => this.action(n));
  }
  update() {
  }
  action(t) {
    this.table._events.eventTrigger("clearCell", "style"), this.table._events.eventTrigger("clearCell", "format");
  }
}
const n0 = (i, e) => {
  const t = i.getBoundingClientRect(), r = {
    y: [t.top, t.top + t.height],
    x: [t.left, t.left + t.width]
  };
  return e.clientX >= r.x[0] && e.clientX <= r.x[1] && e.clientY >= r.y[0] && e.clientY <= r.y[1];
};
class Ye {
  constructor(e, t) {
    w(this, "_visible", !1);
    w(this, "disabled", !1);
    w(this, "_");
    w(this, "_labelElement");
    w(this, "_contentElement");
    // content
    w(this, "beforeShow", null);
    w(this, "onShow", null);
    w(this, "beforeHide", null);
    w(this, "onHide", null);
    w(this, "hide", async (e) => {
      var t;
      if (!((t = this._contentElement.firstChild) != null && t._ && e && n0(this._contentElement._, e)))
        try {
          this.beforeHide && await this.beforeHide(e), setTimeout(() => {
            this._labelElement.removeCss("active"), this._contentElement.hide(), window.removeEventListener("click", this.hide), window.removeEventListener("contextmenu", this.hide), this._visible = !1, this.onHide && this.onHide(e);
          }, 0);
        } catch {
        }
    });
    const r = [`${j}-dropdown-container`];
    this._ = N("div", r), this._labelElement = e, this._labelElement.on("click", (s) => {
      this.disabled || this.show();
    }), this._.append(this._labelElement), this._contentElement = t, this._contentElement.addCss("dropdown-list"), this._contentElement.hide(), this._.append(this._contentElement);
  }
  async show(e) {
    if (!this.disabled)
      try {
        this.beforeShow && await this.beforeShow(e), this._contentElement.show(), this._labelElement.addCss("active"), this._visible = !0, setTimeout(() => {
          window.addEventListener("click", this.hide), window.addEventListener("contextmenu", this.hide);
        }, 0), this.onShow && this.onShow(e);
      } catch {
      }
  }
}
const Cr = (i) => {
  if (i === void 0) return new Promise((e) => e(!1));
  if (typeof i == "boolean") return new Promise((e) => e(i));
  if (typeof i == "function") {
    const e = i();
    return Object.prototype.toString.call(e) === "[object Promise]" ? e : new Promise((t) => t(e));
  }
  return new Promise((e) => e(!1));
};
class $e {
  constructor(e) {
    w(this, "disabled", !1);
    w(this, "value", null);
    w(this, "options", []);
    w(this, "_");
    w(this, "_dropDownElement");
    w(this, "customOption", null);
    w(this, "hide", (e) => this._dropDownElement.hide(e));
    this.options = e, this._dropDownElement = new Ye(
      N("span", [`${j}-hm-button`, `${j}-hm-dropdown`]),
      N("ul", "dropdown-list")
    ), this._ = this._dropDownElement._, this._dropDownElement.beforeShow = async () => {
      if (this.disabled)
        throw new Error("dropdown list disabled");
      await this.renderList();
    };
  }
  async renderList() {
    const e = [];
    for (const t of this.options)
      if (typeof t == "string" && t === "divider")
        e.push(N("li", "divider"));
      else if (typeof t == "object") {
        if (await Cr(t.hide)) continue;
        const s = ["dropdown-item"];
        await Cr(t.disabled) && s.push("disabled");
        const o = N("li", s);
        this.customOption ? o.append(this.customOption(t, o) || "") : o.html(t.label), t.action && typeof t.action == "function" && o.on("click", (c) => t.action(c)), e.push(o);
      }
    this._dropDownElement._contentElement.html(""), this._dropDownElement._contentElement.append(...e);
  }
  render() {
    var s;
    let e = "";
    const t = this.options.findIndex(
      (n) => typeof n != "string" && n.value === this.value
    );
    t !== -1 && (e = (s = this.options[t]) == null ? void 0 : s.label);
    const r = `${e}
        <span class="${j}-icon triangle-icon">
          <span class="icon arrow-down"></span>
        </span>
  `;
    this._dropDownElement._labelElement.html(r);
  }
}
var $t = { exports: {} }, Gn = $t.exports, wr;
function Xn() {
  return wr || (wr = 1, function(i, e) {
    (function(t, r) {
      i.exports = r();
    })(Gn, function() {
      var t = 1e3, r = 6e4, s = 36e5, n = "millisecond", o = "second", c = "minute", f = "hour", a = "day", l = "week", p = "month", h = "quarter", d = "year", x = "date", v = "Invalid Date", _ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, b = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, u = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(F) {
        var S = ["th", "st", "nd", "rd"], k = F % 100;
        return "[" + F + (S[(k - 20) % 10] || S[k] || S[0]) + "]";
      } }, g = function(F, S, k) {
        var W = String(F);
        return !W || W.length >= S ? F : "" + Array(S + 1 - W.length).join(k) + F;
      }, C = { s: g, z: function(F) {
        var S = -F.utcOffset(), k = Math.abs(S), W = Math.floor(k / 60), O = k % 60;
        return (S <= 0 ? "+" : "-") + g(W, 2, "0") + ":" + g(O, 2, "0");
      }, m: function F(S, k) {
        if (S.date() < k.date()) return -F(k, S);
        var W = 12 * (k.year() - S.year()) + (k.month() - S.month()), O = S.clone().add(W, p), M = k - O < 0, L = S.clone().add(W + (M ? -1 : 1), p);
        return +(-(W + (k - O) / (M ? O - L : L - O)) || 0);
      }, a: function(F) {
        return F < 0 ? Math.ceil(F) || 0 : Math.floor(F);
      }, p: function(F) {
        return { M: p, y: d, w: l, d: a, D: x, h: f, m: c, s: o, ms: n, Q: h }[F] || String(F || "").toLowerCase().replace(/s$/, "");
      }, u: function(F) {
        return F === void 0;
      } }, m = "en", B = {};
      B[m] = u;
      var A = "$isDayjsObject", D = function(F) {
        return F instanceof $ || !(!F || !F[A]);
      }, H = function F(S, k, W) {
        var O;
        if (!S) return m;
        if (typeof S == "string") {
          var M = S.toLowerCase();
          B[M] && (O = M), k && (B[M] = k, O = M);
          var L = S.split("-");
          if (!O && L.length > 1) return F(L[0]);
        } else {
          var R = S.name;
          B[R] = S, O = R;
        }
        return !W && O && (m = O), O || !W && m;
      }, y = function(F, S) {
        if (D(F)) return F.clone();
        var k = typeof S == "object" ? S : {};
        return k.date = F, k.args = arguments, new $(k);
      }, E = C;
      E.l = H, E.i = D, E.w = function(F, S) {
        return y(F, { locale: S.$L, utc: S.$u, x: S.$x, $offset: S.$offset });
      };
      var $ = function() {
        function F(k) {
          this.$L = H(k.locale, null, !0), this.parse(k), this.$x = this.$x || k.x || {}, this[A] = !0;
        }
        var S = F.prototype;
        return S.parse = function(k) {
          this.$d = function(W) {
            var O = W.date, M = W.utc;
            if (O === null) return /* @__PURE__ */ new Date(NaN);
            if (E.u(O)) return /* @__PURE__ */ new Date();
            if (O instanceof Date) return new Date(O);
            if (typeof O == "string" && !/Z$/i.test(O)) {
              var L = O.match(_);
              if (L) {
                var R = L[2] - 1 || 0, z = (L[7] || "0").substring(0, 3);
                return M ? new Date(Date.UTC(L[1], R, L[3] || 1, L[4] || 0, L[5] || 0, L[6] || 0, z)) : new Date(L[1], R, L[3] || 1, L[4] || 0, L[5] || 0, L[6] || 0, z);
              }
            }
            return new Date(O);
          }(k), this.init();
        }, S.init = function() {
          var k = this.$d;
          this.$y = k.getFullYear(), this.$M = k.getMonth(), this.$D = k.getDate(), this.$W = k.getDay(), this.$H = k.getHours(), this.$m = k.getMinutes(), this.$s = k.getSeconds(), this.$ms = k.getMilliseconds();
        }, S.$utils = function() {
          return E;
        }, S.isValid = function() {
          return this.$d.toString() !== v;
        }, S.isSame = function(k, W) {
          var O = y(k);
          return this.startOf(W) <= O && O <= this.endOf(W);
        }, S.isAfter = function(k, W) {
          return y(k) < this.startOf(W);
        }, S.isBefore = function(k, W) {
          return this.endOf(W) < y(k);
        }, S.$g = function(k, W, O) {
          return E.u(k) ? this[W] : this.set(O, k);
        }, S.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, S.valueOf = function() {
          return this.$d.getTime();
        }, S.startOf = function(k, W) {
          var O = this, M = !!E.u(W) || W, L = E.p(k), R = function(te, Z) {
            var ne = E.w(O.$u ? Date.UTC(O.$y, Z, te) : new Date(O.$y, Z, te), O);
            return M ? ne : ne.endOf(a);
          }, z = function(te, Z) {
            return E.w(O.toDate()[te].apply(O.toDate("s"), (M ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Z)), O);
          }, P = this.$W, I = this.$M, Y = this.$D, G = "set" + (this.$u ? "UTC" : "");
          switch (L) {
            case d:
              return M ? R(1, 0) : R(31, 11);
            case p:
              return M ? R(1, I) : R(0, I + 1);
            case l:
              var X = this.$locale().weekStart || 0, q = (P < X ? P + 7 : P) - X;
              return R(M ? Y - q : Y + (6 - q), I);
            case a:
            case x:
              return z(G + "Hours", 0);
            case f:
              return z(G + "Minutes", 1);
            case c:
              return z(G + "Seconds", 2);
            case o:
              return z(G + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, S.endOf = function(k) {
          return this.startOf(k, !1);
        }, S.$set = function(k, W) {
          var O, M = E.p(k), L = "set" + (this.$u ? "UTC" : ""), R = (O = {}, O[a] = L + "Date", O[x] = L + "Date", O[p] = L + "Month", O[d] = L + "FullYear", O[f] = L + "Hours", O[c] = L + "Minutes", O[o] = L + "Seconds", O[n] = L + "Milliseconds", O)[M], z = M === a ? this.$D + (W - this.$W) : W;
          if (M === p || M === d) {
            var P = this.clone().set(x, 1);
            P.$d[R](z), P.init(), this.$d = P.set(x, Math.min(this.$D, P.daysInMonth())).$d;
          } else R && this.$d[R](z);
          return this.init(), this;
        }, S.set = function(k, W) {
          return this.clone().$set(k, W);
        }, S.get = function(k) {
          return this[E.p(k)]();
        }, S.add = function(k, W) {
          var O, M = this;
          k = Number(k);
          var L = E.p(W), R = function(I) {
            var Y = y(M);
            return E.w(Y.date(Y.date() + Math.round(I * k)), M);
          };
          if (L === p) return this.set(p, this.$M + k);
          if (L === d) return this.set(d, this.$y + k);
          if (L === a) return R(1);
          if (L === l) return R(7);
          var z = (O = {}, O[c] = r, O[f] = s, O[o] = t, O)[L] || 1, P = this.$d.getTime() + k * z;
          return E.w(P, this);
        }, S.subtract = function(k, W) {
          return this.add(-1 * k, W);
        }, S.format = function(k) {
          var W = this, O = this.$locale();
          if (!this.isValid()) return O.invalidDate || v;
          var M = k || "YYYY-MM-DDTHH:mm:ssZ", L = E.z(this), R = this.$H, z = this.$m, P = this.$M, I = O.weekdays, Y = O.months, G = O.meridiem, X = function(Z, ne, le, J) {
            return Z && (Z[ne] || Z(W, M)) || le[ne].slice(0, J);
          }, q = function(Z) {
            return E.s(R % 12 || 12, Z, "0");
          }, te = G || function(Z, ne, le) {
            var J = Z < 12 ? "AM" : "PM";
            return le ? J.toLowerCase() : J;
          };
          return M.replace(b, function(Z, ne) {
            return ne || function(le) {
              switch (le) {
                case "YY":
                  return String(W.$y).slice(-2);
                case "YYYY":
                  return E.s(W.$y, 4, "0");
                case "M":
                  return P + 1;
                case "MM":
                  return E.s(P + 1, 2, "0");
                case "MMM":
                  return X(O.monthsShort, P, Y, 3);
                case "MMMM":
                  return X(Y, P);
                case "D":
                  return W.$D;
                case "DD":
                  return E.s(W.$D, 2, "0");
                case "d":
                  return String(W.$W);
                case "dd":
                  return X(O.weekdaysMin, W.$W, I, 2);
                case "ddd":
                  return X(O.weekdaysShort, W.$W, I, 3);
                case "dddd":
                  return I[W.$W];
                case "H":
                  return String(R);
                case "HH":
                  return E.s(R, 2, "0");
                case "h":
                  return q(1);
                case "hh":
                  return q(2);
                case "a":
                  return te(R, z, !0);
                case "A":
                  return te(R, z, !1);
                case "m":
                  return String(z);
                case "mm":
                  return E.s(z, 2, "0");
                case "s":
                  return String(W.$s);
                case "ss":
                  return E.s(W.$s, 2, "0");
                case "SSS":
                  return E.s(W.$ms, 3, "0");
                case "Z":
                  return L;
              }
              return null;
            }(Z) || L.replace(":", "");
          });
        }, S.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, S.diff = function(k, W, O) {
          var M, L = this, R = E.p(W), z = y(k), P = (z.utcOffset() - this.utcOffset()) * r, I = this - z, Y = function() {
            return E.m(L, z);
          };
          switch (R) {
            case d:
              M = Y() / 12;
              break;
            case p:
              M = Y();
              break;
            case h:
              M = Y() / 3;
              break;
            case l:
              M = (I - P) / 6048e5;
              break;
            case a:
              M = (I - P) / 864e5;
              break;
            case f:
              M = I / s;
              break;
            case c:
              M = I / r;
              break;
            case o:
              M = I / t;
              break;
            default:
              M = I;
          }
          return O ? M : E.a(M);
        }, S.daysInMonth = function() {
          return this.endOf(p).$D;
        }, S.$locale = function() {
          return B[this.$L];
        }, S.locale = function(k, W) {
          if (!k) return this.$L;
          var O = this.clone(), M = H(k, W, !0);
          return M && (O.$L = M), O;
        }, S.clone = function() {
          return E.w(this.$d, this);
        }, S.toDate = function() {
          return new Date(this.valueOf());
        }, S.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, S.toISOString = function() {
          return this.$d.toISOString();
        }, S.toString = function() {
          return this.$d.toUTCString();
        }, F;
      }(), T = $.prototype;
      return y.prototype = T, [["$ms", n], ["$s", o], ["$m", c], ["$H", f], ["$W", a], ["$M", p], ["$y", d], ["$D", x]].forEach(function(F) {
        T[F[1]] = function(S) {
          return this.$g(S, F[0], F[1]);
        };
      }), y.extend = function(F, S) {
        return F.$i || (F(S, $, y), F.$i = !0), y;
      }, y.locale = H, y.isDayjs = D, y.unix = function(F) {
        return y(1e3 * F);
      }, y.en = B[m], y.Ls = B, y.p = {}, y;
    });
  }($t)), $t.exports;
}
var Zn = Xn();
const Le = /* @__PURE__ */ Ss(Zn);
class Qn extends ee {
  constructor(t) {
    super(t);
    w(this, "table");
    w(this, "_dropdown");
    w(this, "_visible", !1);
    this.table = t;
    const { t: r } = this.table._i18n;
    this._dropdown = new $e([
      {
        label: r("formats.normal"),
        value: "normal",
        action: (s) => this.changeFormat(s, "normal"),
        props: {
          example: ""
        }
      },
      // {
      //   label: t('formats.text'),
      //   value: 'text',
      //   action: (evt: MouseEvent) => this.changeFormat(evt, 'text'),
      //   props: {
      //     example: '',
      //   },
      // },
      "divider",
      {
        label: r("formats.number"),
        value: "number",
        action: (s) => this.changeFormat(s, "number"),
        props: {
          example: "98.5"
        }
      },
      {
        label: r("formats.scientific"),
        value: "scientific",
        action: (s) => this.changeFormat(s, "scientific"),
        props: {
          example: "5.01E+00"
        }
      },
      {
        label: r("formats.percent"),
        value: "percent",
        action: (s) => this.changeFormat(s, "percent"),
        props: {
          example: "100%"
        }
      },
      {
        label: r("formats.CNY"),
        value: "CNY",
        action: (s) => this.changeFormat(s, "CNY"),
        props: {
          example: "¥100"
        }
      },
      {
        label: r("formats.USD"),
        value: "USD",
        action: (s) => this.changeFormat(s, "USD"),
        props: {
          example: "$100"
        }
      },
      {
        label: r("formats.EUR"),
        value: "EUR",
        action: (s) => this.changeFormat(s, "EUR"),
        props: {
          example: "€100"
        }
      },
      "divider",
      {
        label: r("formats.shortDate"),
        value: "YYYY-MM-DD",
        action: (s) => this.changeFormat(s, "YYYY-MM-DD"),
        props: {
          example: Le().format("YYYY-MM-DD")
        }
      },
      {
        label: r("formats.longDate"),
        value: "YYYY-MM-DD HH:mm:ss",
        action: (s) => this.changeFormat(s, "YYYY-MM-DD HH:mm:ss"),
        props: {
          example: `${Le().format("YYYY-MM-DD")} 00:00:00`
        }
      },
      {
        label: r("formats.time"),
        value: "HH:mm:ss",
        action: (s) => this.changeFormat(s, "HH:mm:ss"),
        props: {
          example: "00:00:00"
        }
      }
    ]), this._dropdown._dropDownElement._contentElement.css("width", "250px"), this._dropdown.customOption = (s) => {
      var n;
      if (s !== "divider") {
        const o = N("div");
        return o.css("display", "flex"), o.css("align-items", "center"), o.css("justify-content", "space-between"), o.html(
          `<span>${s.label}</span> <span class="secondary-text-color">${(n = s.props) == null ? void 0 : n.example}</span>`
        ), o;
      }
      return null;
    }, this._dropdown.value = "normal", this._.append(this._dropdown._), this.render();
  }
  update() {
    var n;
    if (!((n = this.table._selector) != null && n._focusRange)) return;
    const { startRow: t, startCol: r } = this.table._selector._focusRange, s = this.table.cell(t, r);
    typeof s != "object" && this._dropdown.value !== "normal" ? (this._dropdown.value = "normal", this.render()) : typeof s == "object" && (s != null && s.format ? (this._dropdown.value = s == null ? void 0 : s.format, this.render()) : this._dropdown.value !== "normal" && (this._dropdown.value = "normal", this.render()));
  }
  changeFormat(t, r) {
    this._dropdown.value = r, this._dropdown.render(), this.table._events.eventTrigger("fastFormat", r), this._dropdown.hide();
  }
  render() {
    this._dropdown.render();
  }
}
class Jn extends ee {
  constructor(t) {
    super(t);
    w(this, "table");
    w(this, "_dropdown");
    w(this, "_visible", !1);
    this.table = t;
    const r = [
      "Arial",
      "Helvetica Neue",
      "Microsoft YaHei",
      "Courier New",
      "Verdana",
      "Roboto"
    ].map((s) => ({
      label: s,
      value: s,
      action: (n) => this.changeFonts(n, s)
    }));
    this._dropdown = new $e(r), this._dropdown.value = "Arial", this._.append(this._dropdown._), this.render();
  }
  update() {
    var n;
    if (!((n = this.table._selector) != null && n._focusRange)) return;
    const { startRow: t, startCol: r } = this.table._selector._focusRange, s = this.table.getStyle(t, r);
    this._dropdown.value = s.fontFamily || "Arial", this.render();
  }
  changeFonts(t, r) {
    this._dropdown.value = r, this.table._events.eventTrigger("setStyle", { fontFamily: r }), this.render();
  }
  render() {
    this._dropdown.render();
  }
}
class eo extends ee {
  constructor(t) {
    super(t);
    w(this, "table");
    w(this, "_dropdown");
    w(this, "_visible", !1);
    this.table = t;
    const r = [
      6,
      8,
      10,
      12,
      14,
      16,
      18,
      20,
      22,
      24,
      26,
      28,
      30,
      32,
      34,
      36,
      38,
      40,
      42,
      44,
      46,
      48,
      50
    ].map((s) => ({
      label: `${s}`,
      value: s,
      action: (n) => this.changeFontSize(n, s)
    }));
    this._dropdown = new $e(r), this._dropdown._dropDownElement._contentElement.css("max-height", "250px"), this._dropdown._dropDownElement._contentElement.css("overflow-y", "scroll"), this._dropdown.value = 10, this._.append(this._dropdown._), this.render();
  }
  update() {
    var n;
    if (!((n = this.table._selector) != null && n._focusRange)) return;
    const { startRow: t, startCol: r } = this.table._selector._focusRange, s = this.table.getStyle(t, r);
    this._dropdown.value = s.fontSize || 10, this.render();
  }
  changeFontSize(t, r) {
    this._dropdown.value = r, this.table._events.eventTrigger("setStyle", { fontSize: r }), this._dropdown.hide(), this.render();
  }
  render() {
    this._dropdown.render();
  }
}
class xe extends ee {
  constructor(t, r, s) {
    super(t);
    w(this, "table");
    w(this, "buttonType");
    w(this, "button");
    this.table = t, this.buttonType = r, this.button = N("div", `${j}-hm-button`);
    const n = N("div", `${j}-icon`);
    n.html(`<div class="icon ${this.buttonType}"></div>`), this.button.append(n), s && s(this), this.button.on("click", (o) => this.action(o)), this._.append(this.button);
  }
  update() {
    var c, f;
    if (!((c = this.table._selector) != null && c._focus) || !((f = this.table._selector) != null && f._focusRange)) return;
    const { startRow: t, startCol: r } = this.table._selector._focusRange, s = this.table.cell(t, r), n = this.table.getStyle(t, r, !0);
    let o = !1;
    return this.buttonType === "font-bold" ? o = !!n.bold : this.buttonType === "font-italic" ? o = !!n.italic : this.buttonType === "strike" ? o = !!n.strikethrough : this.buttonType === "underline" ? o = !!n.underline : this.buttonType === "merge" ? o = this.table.isMerged() : this.buttonType === "textwrap" ? o = !!n.textwrap : this.buttonType === "freeze" ? o = !!this.table._data.freeze : (this.buttonType === "increase-dicimal" || this.buttonType === "reduce-dicimal") && (s instanceof Object && (s.format === "number" || s.format === "scientific") ? this._.show() : this._.hide()), o ? this.button.addCss("active") : this.button.removeCss("active"), this;
  }
  action(t) {
    this.buttonType === "font-bold" ? this.table._events.eventTrigger("fastStyle", "bold") : this.buttonType === "font-italic" ? this.table._events.eventTrigger("fastStyle", "italic") : this.buttonType === "strike" ? this.table._events.eventTrigger("fastStyle", "strikethrough") : this.buttonType === "underline" ? this.table._events.eventTrigger("fastStyle", "underline") : this.buttonType === "merge" ? this.table._events.eventTrigger("merge") : this.buttonType === "textwrap" ? this.table._events.eventTrigger("fastStyle", "textwrap") : this.buttonType === "freeze" ? this.table._events.eventTrigger("freeze") : this.buttonType === "increase-dicimal" ? this.table._events.eventTrigger("fastFixed", "increase") : this.buttonType === "reduce-dicimal" && this.table._events.eventTrigger("fastFixed", "reduce");
  }
}
class c0 {
  constructor(e, t) {
    w(this, "table");
    w(this, "_");
    w(this, "_fastColorElement");
    w(this, "_themeColorElement");
    w(this, "fastColor", "#000");
    w(this, "onChange", () => null);
    w(this, "themeColors", [
      ["#ffffff", "#f2f2f2", "#d8d8d8", "#bfbfbf", "#a5a5a5", "#939393"],
      ["#000000", "#7f7f7f", "#595959", "#3f3f3f", "#262626", "#0d0d0d"],
      ["#485368", "#f3f5f7", "#c5cad3", "#808b9e", "#353b45", "#24272e"],
      ["#2972f4", "#e5efff", "#c7dcff", "#99beff", "#1450b8", "#0c306e"],
      ["#00a3f5", "#e5f6ff", "#c7ecff", "#99ddff", "#1274a5", "#0a415c"],
      ["#319b62", "#eafaf1", "#c3ead5", "#98d7b6", "#277c4f", "#184e32"],
      ["#de3c36", "#ffe9e8", "#ffc9c7", "#ff9c99", "#9e1e1a", "#58110e"],
      ["#f88825", "#fff3eb", "#ffdcc4", "#ffba84", "#b86014", "#5c300a"],
      ["#f5c400", "#fff9e3", "#ffeead", "#ffe270", "#a38200", "#665200"],
      ["#9a38d7", "#fdebff", "#f2c7ff", "#d58eff", "#5e2281", "#3b1551"]
    ]);
    this.table = t, this._ = N("div"), this._.addCss(`${j}-color-picker`), this._fastColorElement = N("div"), this._fastColorElement.addCss("fast-color"), this._fastColorElement.on("click", () => {
      this.onChange(this.fastColor);
    }), this._.append(this._fastColorElement), this._themeColorElement = N("div"), this._themeColorElement.addCss("theme-color"), this._.append(this._themeColorElement), this.renderThemeColorElement(), this.updateFastColorElement(), e && e.append(this._);
  }
  renderThemeColorElement() {
    var r;
    this._themeColorElement.html("");
    const e = N("div");
    e.addCss("title"), e.html(`${((r = this.table) == null ? void 0 : r._i18n.t("theme_color")) || "Theme Colors"}`), e.css("font-weight", "bold"), this._themeColorElement.append(e);
    const t = N("table");
    t.addCss("body");
    for (let s = 0; s < this.themeColors[0].length; s++) {
      const n = N("tr");
      for (let o = 0; o < this.themeColors.length; o++) {
        const f = this.themeColors[o][s], a = this.createColorCube(f);
        a.css("padding", "2px");
        const l = N("td");
        l.on("click", () => {
          this.updateFastColorElement(f);
        }), l.append(a), n.append(l);
      }
      t.append(n);
    }
    this._themeColorElement.css("padding-bottom", "5px"), this._themeColorElement.append(t);
  }
  updateFastColorElement(e) {
    e && (this.fastColor = e, this.onChange(e)), this._fastColorElement.html(""), this._fastColorElement.append(this.createColorCube(this.fastColor));
    const t = N("span").html(this.fastColor);
    t.css("padding", "0 0 0 10px"), this._fastColorElement.append(t);
  }
  createColorCube(e) {
    const t = N("div");
    return t.addCss("color-cube"), t.css("width", "16px"), t.css("height", "16px"), t.css("background", e), t;
  }
}
class to extends ee {
  constructor(t) {
    var r;
    super(t);
    w(this, "table");
    w(this, "_dropdown");
    w(this, "_colorPicker");
    w(this, "_visible", !1);
    this.table = t, this._colorPicker = new c0(void 0, t), this._colorPicker.onChange = (s) => {
      this.changeColor(s);
    }, this._dropdown = new Ye(this.generateButton("color"), this._colorPicker._), this._colorPicker.fastColor = this.table._data.style.color, (r = this._dropdown._labelElement.firstChild) == null || r.css(
      "border-bottom",
      `3px solid ${this.table._data.style.color}`
    ), this._dropdown._.css("margin-left", "2px"), this._.append(this._dropdown._), this.render();
  }
  generateButton(t) {
    const r = N("div", `${j}-hm-button`), s = N("div", `${j}-icon`);
    return s.html(`<div class="icon ${t || ""}"></div>`), r.append(s), r;
  }
  changeColor(t) {
    this.table._events.eventTrigger("setStyle", {
      color: t
    }), this._dropdown.hide(), this.update();
  }
  update() {
    this.render();
  }
  render() {
    var r, s;
    let t = this.table._data.style.color;
    if ((r = this.table._selector) != null && r._focusRange) {
      const { startRow: n, startCol: o } = this.table._selector._focusRange, c = this.table.getStyle(n, o, !0);
      c.color && (t = c.color);
    }
    (s = this._dropdown._labelElement.firstChild) == null || s.css("border-bottom-color", t);
  }
}
class ro extends ee {
  constructor(t) {
    var r;
    super(t);
    w(this, "table");
    w(this, "_dropdown");
    w(this, "_colorPicker");
    w(this, "_visible", !1);
    this.table = t, this._colorPicker = new c0(void 0, t), this._colorPicker.onChange = (s) => {
      this.changeColor(s);
    }, this._dropdown = new Ye(this.generateButton("bgcolor"), this._colorPicker._), (r = this._dropdown._labelElement.firstChild) == null || r.css("border-bottom", "3px solid #fff"), this._dropdown._.css("margin-left", "2px"), this._.append(this._dropdown._), this.render();
  }
  generateButton(t) {
    const r = N("div", `${j}-hm-button`), s = N("div", `${j}-icon`);
    return s.html(`<div class="icon ${t || ""}"></div>`), r.append(s), r;
  }
  changeColor(t) {
    this.table._events.eventTrigger("setStyle", {
      bgcolor: t
    }), this._dropdown.hide(), this.update();
  }
  update() {
    this.render();
  }
  render() {
    var r, s;
    let t = "#fff";
    if ((r = this.table._selector) != null && r._focusRange) {
      const { startRow: n, startCol: o } = this.table._selector._focusRange;
      t = this.table.getStyle(n, o, !0).bgcolor || "#fff";
    }
    (s = this._dropdown._labelElement.firstChild) == null || s.css("border-bottom-color", t);
  }
}
function Mt(i) {
  const e = N("div", `${j}-hm-button`), t = N("div", `${j}-icon`);
  return t.html(`<div class="icon ${i || ""}"></div>`), e.append(t), e;
}
class so extends ee {
  constructor(t) {
    super(t);
    w(this, "table");
    w(this, "_dropdown");
    w(this, "_ctx");
    w(this, "_line");
    w(this, "_visible", !1);
    this.table = t, this._ctx = new io(this.table), this._line = new no(this.table), this._dropdown = new Ye(Mt("border-all"), this.generateContent()), this._dropdown._.css("margin-left", "2px"), this._.append(this._dropdown._), this._dropdown.beforeHide = (r) => {
      if (r && (n0(this._ctx._dropdown._contentElement._, r) || n0(
        this._line._dropdown._dropDownElement._contentElement._,
        r
      )))
        throw new Error("Stop hide");
    }, this.render();
  }
  generateContent() {
    const t = N("div"), r = N("div");
    r.css("display", "flex"), r.css("padding", "5px"), r.css("justify-content", "space-between");
    const s = N("table");
    [
      ["all", "inside", "horizontal", "vertical", "outside"],
      ["left", "top", "right", "bottom", "none"]
    ].forEach((c) => {
      const f = N("tr");
      c.forEach((a) => {
        const l = N("td").append(Mt(`border-${a}`));
        l.on("click", () => {
          this.setBorderStyle(a);
        }), f.append(l);
      }), s.append(f);
    }), r.append(s), s.addCss(`${j}-hm-divider-line`);
    const o = N("div");
    return o.css("padding", "2px 0 2px 0px"), o.append(this._ctx._), o.append(this._line._), r.append(o), t.append(r), t;
  }
  setBorderStyle(t) {
    t === "none" ? this.table._events.eventTrigger("clearBorder") : this.table._events.eventTrigger(
      "setBorder",
      t,
      this._line.getValue() || "thin",
      this._ctx.getValue()
    ), this._dropdown.hide();
  }
  update() {
    this.render();
  }
  render() {
  }
}
class io {
  constructor(e) {
    w(this, "table");
    w(this, "_");
    w(this, "_dropdown");
    w(this, "_colorPicker");
    w(this, "_btn", Mt("line-color"));
    this.table = e, this._colorPicker = new c0(void 0, this.table), this._dropdown = new Ye(this._btn, this._colorPicker._), this._dropdown._contentElement.css("left", "103%"), this._dropdown._contentElement.css("top", "-5px"), this._ = this._dropdown._, this.updateButton(), this._colorPicker.onChange = (t) => {
      this._dropdown.hide(), this.updateButton();
    };
  }
  updateButton() {
    var e;
    (e = this._dropdown._labelElement.firstChild) == null || e.css(
      "border-bottom",
      `3px solid ${this._colorPicker.fastColor}`
    );
  }
  getValue() {
    return this._colorPicker.fastColor;
  }
}
class no {
  constructor(e) {
    w(this, "table");
    w(this, "_");
    w(this, "_dropdown");
    w(this, "_btn", Mt("line-type"));
    w(this, "lines", ["thin", "medium", "thick", "dashed", "dotted"]);
    this.table = e, this._dropdown = new $e(
      this.lines.map((t) => ({
        label: t,
        value: t,
        action: (r) => {
          this.updateButton(t);
        }
      }))
    ), this._dropdown._dropDownElement._labelElement.css("padding-left", "0"), this._dropdown.render = () => {
      this._dropdown._dropDownElement._labelElement.html(
        `<div class="${j}-icon">
          <div class="icon line-type"></div>
        </div>`
      );
    }, this._dropdown.customOption = (t) => {
      const r = N("div");
      return r.css("height", "32px"), r.css("display", "flex"), r.css("align-items", "center"), t !== "divider" && r.html(
        `<div class="line-squire ${this._dropdown.value === t.value ? "selected" : ""}"></div> ${this.drawLine(t.value) || ""}`
      ), r;
    }, this._dropdown._.css("position", "relative"), this._dropdown._.css("margin-top", "5px"), this._dropdown._.css("margin-left", "0"), this._dropdown._dropDownElement._contentElement.css("left", "calc(100% + 10px)"), this._dropdown._dropDownElement._contentElement.css("top", "-5px"), this._ = this._dropdown._, this.updateButton(this._dropdown.value || "thin");
  }
  drawLine(e) {
    if (e === "thin")
      return '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" style="user-select: none;"></line></svg>';
    if (e === "medium")
      return '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="2" style="user-select: none;"><line x1="0" y1="1.0" x2="50" y2="1.0" stroke-width="2" stroke="black" style="user-select: none;"></line></svg>';
    if (e === "thick")
      return '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="3" style="user-select: none;"><line x1="0" y1="1.5" x2="50" y2="1.5" stroke-width="3" stroke="black" style="user-select: none;"></line></svg>';
    if (e === "dashed")
      return '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="2" style="user-select: none;"></line></svg>';
    if (e === "dotted")
      return '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="1" style="user-select: none;"></line></svg>';
  }
  updateButton(e) {
    this._dropdown.value = e, this._dropdown.render(), this._dropdown.renderList(), this._dropdown.hide();
  }
  getValue() {
    return this._dropdown.value;
  }
}
class oo extends ee {
  constructor(t) {
    super(t);
    w(this, "table");
    w(this, "_dropdown");
    w(this, "_visible", !1);
    w(this, "render", () => {
      this._dropdown._dropDownElement._labelElement.html(
        `<div class="${j}-icon">
        <div class="icon align-${this._dropdown.value || "left"}"></div>
      </div>
       <span class="${j}-icon triangle-icon" style="margin-left: -4px">
          <span class="icon arrow-down"></span>
        </span>
      `
      );
    });
    w(this, "renderOption", (t, r) => t !== "divider" ? (r.css("padding", "0 7px"), this.generateButton(`align-${t.value}`)) : N("div"));
    w(this, "changeTextAlign", (t) => {
      this.table._events.eventTrigger("setStyle", { align: t });
    });
    this.table = t, this._dropdown = new $e([
      {
        label: "left",
        value: "left",
        action: () => this.changeTextAlign("left")
      },
      {
        label: "center",
        value: "center",
        action: () => this.changeTextAlign("center")
      },
      {
        label: "right",
        value: "right",
        action: () => this.changeTextAlign("right")
      }
    ]), this._dropdown.value = this.table._data.style.align, this._dropdown._.css("margin-left", "2px"), this._dropdown.render = this.render, this._dropdown.customOption = this.renderOption, this._dropdown.render(), this._.append(this._dropdown._);
  }
  generateButton(t) {
    const r = N("div", [`${j}-hm-button`, "transparent_hover_color"]), s = N("div", `${j}-icon`);
    return s.html(`<div class="icon ${t || ""}"></div>`), r.append(s), r;
  }
  update() {
    var n, o;
    if (!((n = this.table._selector) != null && n._focus) || !((o = this.table._selector) != null && o._focusRange)) return;
    const { startRow: t, startCol: r } = this.table._selector._focusRange, s = this.table.getStyle(t, r, !0);
    this._dropdown.value = s.align || "left", this._dropdown.render();
  }
}
class ao extends ee {
  constructor(t) {
    super(t);
    w(this, "table");
    w(this, "_dropdown");
    w(this, "_visible", !1);
    w(this, "render", () => {
      this._dropdown._dropDownElement._labelElement.html(
        `<div class="${j}-icon">
        <div class="icon align-${this._dropdown.value || "left"}"></div>
      </div>
       <span class="${j}-icon triangle-icon" style="margin-left: -4px">
          <span class="icon arrow-down"></span>
        </span>
      `
      );
    });
    w(this, "renderOption", (t, r) => t !== "divider" ? (r.css("padding", "0 7px"), this.generateButton(`align-${t.value}`)) : N("div"));
    w(this, "changeTextAlign", (t) => {
      this.table._events.eventTrigger("setStyle", { valign: t });
    });
    this.table = t, this._dropdown = new $e([
      {
        label: "top",
        value: "top",
        action: () => this.changeTextAlign("top")
      },
      {
        label: "middle",
        value: "middle",
        action: () => this.changeTextAlign("middle")
      },
      {
        label: "bottom",
        value: "bottom",
        action: () => this.changeTextAlign("bottom")
      }
    ]), this._dropdown.value = this.table._data.style.valign, this._dropdown._.css("margin-left", "2px"), this._dropdown.render = this.render, this._dropdown.customOption = this.renderOption, this._dropdown.render(), this._.append(this._dropdown._);
  }
  generateButton(t) {
    const r = N("div", [`${j}-hm-button`, "transparent_hover_color"]), s = N("div", `${j}-icon`);
    return s.html(`<div class="icon ${t || ""}"></div>`), r.append(s), r;
  }
  update() {
    var n, o;
    if (!((n = this.table._selector) != null && n._focus) || !((o = this.table._selector) != null && o._focusRange)) return;
    const { startRow: t, startCol: r } = this.table._selector._focusRange, s = this.table.getStyle(t, r, !0);
    this._dropdown.value = s.valign || this.table._data.style.valign, this._dropdown.render();
  }
}
function lo(i) {
  const { t: e } = i._i18n;
  return [
    new Vn(i).tooltip({ title: e("undo"), shortkey: "(Ctrl + Z)" }),
    new Yn(i).tooltip({ title: e("redo"), shortkey: "(Ctrl + Y)" }),
    new Un(i).tooltip(e("paintformat")),
    new Kn(i).tooltip(e("clearformat")),
    new Ae(i),
    new Qn(i).tooltip(e("valueformat")),
    new xe(i, "increase-dicimal", (t) => {
      var r;
      (r = t._) == null || r.hide();
    }).tooltip(e("increase_dicimal")),
    new xe(i, "reduce-dicimal", (t) => {
      var r;
      (r = t._) == null || r.hide();
    }).tooltip(e("reduce_dicimal")),
    new Ae(i),
    new Jn(i).tooltip(e("fontFamily")),
    new eo(i).tooltip(e("fontSize")),
    new Ae(i),
    new xe(i, "font-bold").tooltip({
      title: e("fontBold"),
      shortkey: "(Ctrl + B)"
    }),
    new xe(i, "font-italic").tooltip({
      title: e("fontItalic"),
      shortkey: "(Ctrl + I)"
    }),
    new xe(i, "strike").tooltip(e("fontStrike")),
    new xe(i, "underline").tooltip({
      title: e("fontUnderline"),
      shortkey: "(Ctrl + U)"
    }),
    new to(i).tooltip(e("fontColor")),
    new Ae(i),
    new ro(i).tooltip(e("bgColor")),
    new so(i).tooltip(e("border")),
    new xe(i, "merge", (t) => {
      var r;
      (r = t._) == null || r.css("margin-left", "2px");
    }).tooltip(e("mergeCell")),
    new Ae(i),
    new oo(i).tooltip(e("fontAlign")),
    new ao(i).tooltip(e("fontVerticalAlign")),
    new xe(i, "textwrap", (t) => {
      var r;
      (r = t._) == null || r.css("margin-left", "3px");
    }).tooltip(e("fontAutoWrap")),
    new Ae(i),
    new xe(i, "freeze", (t) => {
      var r;
      (r = t._) == null || r.css("margin-left", "3px");
    }).tooltip(e("freezeCell"))
  ];
}
class co {
  constructor(e) {
    w(this, "table");
    w(this, "_headMenuElement");
    w(this, "height", 40);
    w(this, "options", []);
    this.table = e, this._headMenuElement = N("div", `${j}-head-menu`), this._headMenuElement.css({
      height: this.height
    }), this.init(), this.table._i18n.onChange(() => {
      this.init();
    });
  }
  async init() {
    this._headMenuElement.html(""), this.options = lo(this.table);
    for (const e of this.options)
      this._headMenuElement.append(e._);
  }
  updateStatus() {
    for (const e of this.options)
      e.update();
  }
  render() {
    this._headMenuElement._.hasChildNodes() ? this.updateStatus() : this.init();
  }
}
function ho(i, e = 10, t) {
  if (i && typeof i == "string") {
    if (i.toString().includes("e")) return i;
    const r = Number(i);
    if (r.toString().includes("e")) return r.toString();
    const s = Math.floor(Math.log(Math.abs(r)) / Math.LN10);
    if (Math.abs(s) < e) return r.toString();
    let n = r * 10 ** -s;
    return t !== void 0 && (n = n.toFixed(t)), `${n}E+${s}`;
  } else return "";
}
const fo = (i, e) => {
  i.formatter((t, r, s, n) => {
    if (n === "normal" || n === "text" || !n || s === void 0) return s;
    if (n === "number" && !Number.isNaN(Number(s))) {
      let o = 2;
      t.fixed !== void 0 && (o = t.fixed), s = Number(s).toFixed(o);
    } else if (n === "scientific" && !Number.isNaN(Number(s))) {
      let o = 2;
      t.fixed !== void 0 && (o = t.fixed), s = ho(s, 10, o);
    } else if (s !== null && s !== "") {
      if (!Number.isNaN(Number(s))) {
        const c = new Intl.NumberFormat();
        n === "percent" ? s = `${s}%` : n === "CNY" ? s = `¥${c.format(Number(s))}` : n === "EUR" ? s = `€${c.format(Number(s))}` : n === "USD" && (s = `$${c.format(Number(s))}`);
      }
      let o = s;
      if (!Number.isNaN(Number(s))) o = Number(s);
      else
        try {
          o = JSON.parse(s);
        } catch {
        }
      (n === "YYYY-MM-DD HH:mm:ss" || n === "YYYY-MM-DD" || n === "HH:mm:ss") && (o = Le(o).format(n)), o !== "Invalid Date" && (s = String(o));
    }
    return s;
  });
};
class Lt {
  constructor(e, t, r, s) {
    // renderer options
    w(this, "_rendererOptions", {});
    w(this, "_copyable", !1);
    w(this, "_editable", !1);
    w(this, "_minRowHeight", 25);
    w(this, "_minColWidth", 60);
    w(this, "_width");
    w(this, "_height");
    // cache for rect of content
    w(this, "_contentRect", { x: 0, y: 0, width: 0, height: 0 });
    w(this, "_headMenu", null);
    w(this, "_container");
    w(this, "_Layer");
    w(this, "_data");
    w(this, "_renderer");
    w(this, "_cells", new as());
    // scrollbar
    w(this, "_vScrollbar", null);
    w(this, "_hScrollbar", null);
    // resizer
    w(this, "_rowResizer", null);
    w(this, "_colResizer", null);
    // editor ? extends Editor
    w(this, "_editor", null);
    w(this, "_editors", /* @__PURE__ */ new Map());
    w(this, "_selector", null);
    w(this, "_overlayer");
    w(this, "_canvas");
    // event emitter
    w(this, "_emitter", new en());
    w(this, "_events");
    w(this, "_history");
    w(this, "_contextMenu");
    w(this, "_i18n");
    const n = typeof e == "string" ? document.querySelector(e) : e;
    if (n === null) throw new Error("first argument error");
    if (this._i18n = new i0(), this._data = ws(), this._Layer = N(n, `${j}-layer`).css({
      height: r(),
      width: t()
    }), s != null && s.hideHeadMenu || (this._headMenu = new co(this), this._Layer.append(this._headMenu._headMenuElement)), this._width = t, this._height = () => {
      var c;
      return r() - (((c = this._headMenu) == null ? void 0 : c.height) || 0);
    }, this._container = N("div", `${j}-container`).css({
      height: this._height(),
      width: t()
    }), this._Layer.append(this._container), s) {
      const { minColWidth: c, minRowHeight: f, renderer: a, data: l } = s;
      if (c && (this._minColWidth = c), f && (this._minRowHeight = f), a && (this._rendererOptions = a), l) {
        const { cols: p, rows: h, rowHeight: d, colWidth: x } = l, { _data: v } = this;
        p && (v.cols.len = p), h && (v.rows.len = h), d && (v.rowHeight = d), x && (v.colWidth = x);
      }
    }
    const o = document.createElement("canvas");
    this._canvas = N(o).attr("tabIndex", "1"), this._container.append(o), this._renderer = new Yt(o, t(), this._height()), this._overlayer = new ts(this._container), Nt(this), s != null && s.selectable && V.init(this), s != null && s.scrollable && He.init(this), s != null && s.resizable && zn.init(this), s != null && s.editable && (this._editable = !0), this._copyable = (s == null ? void 0 : s.copyable) || !1, this._events = new Wn(this), this._history = new Mn(), this._contextMenu = new Nn(this), fo(this._cells);
  }
  contentRect() {
    return this._contentRect;
  }
  container() {
    return this._container;
  }
  resize() {
    this._container.css({ height: this._height(), width: this._width() }), this._renderer.width(this._width()), this._renderer.height(this._height()), this.render();
  }
  freeze(e) {
    return this._data.freeze = e, this;
  }
  isMerged(e) {
    if (e) return E0(this._data, e);
    {
      const { _selector: t } = this;
      if (t)
        return t._ranges.every((r) => E0(this._data, r.toString()));
    }
    return !1;
  }
  merge(e) {
    if (e) A0(this._data, e);
    else {
      const { _selector: t } = this;
      t && t._ranges.forEach((r) => A0(this._data, r.toString()));
    }
    return this;
  }
  unmerge(e) {
    if (e) t0(this._data, e);
    else {
      const { _selector: t } = this;
      t && t._ranges.forEach((r) => t0(this._data, r.toString()));
    }
    return this;
  }
  row(e, t) {
    return t ? (t.height && this.rowHeight(e, t.height), Fe(this._data, e, t), this) : Fe(this._data, e);
  }
  rowHeight(e, t, r) {
    const s = It(this._data, e);
    return t ? (s !== t && (It(this._data, e, t, r), this._contentRect.height += t - s), this) : s;
  }
  rowsHeight(e, t) {
    return Rr(this._data, e, t);
  }
  isLastRow(e) {
    return vs(this._data, e);
  }
  col(e, t) {
    return t ? (t.width && this.colWidth(e, t.width), De(this._data, e, t), this) : De(this._data, e);
  }
  colWidth(e, t) {
    const r = Tt(this._data, e);
    return t ? (r !== t && (Tt(this._data, e, t), this._contentRect.width += t - r), this) : r;
  }
  colsWidth(e, t) {
    return Dr(this._data, e, t);
  }
  isLastCol(e) {
    return _s(this._data, e);
  }
  formulaParser(e) {
    return this._cells.formulaParser(e), this;
  }
  formatter(e) {
    return this._cells.formatter(e), this;
  }
  /**
   * 获取 style 样式 index
   * @param row
   * @param col
   * @returns
   */
  getStyleIndex(e, t) {
    const r = this.cell(e, t);
    return r instanceof Object && r.style !== void 0 && r.style >= 0 ? r.style : -1;
  }
  getPureStyle(e, t) {
    const r = this.getStyleIndex(e, t);
    return r !== -1 ? Zt(this._data, r, !1) : null;
  }
  getStyle(e, t, r) {
    const s = this.getStyleIndex(e, t);
    return s !== -1 ? Zt(this._data, s, !!r) : this._data.style;
  }
  /**
   * 设置 style
   * @param row
   * @param col
   * @param style
   * @param rewrite 为 true 时, 重写要设置的全部样式, 否则只进行合并
   */
  setStyle(e, t, r, s = !1) {
    let n = this.getStyleIndex(e, t);
    if (!s && n !== -1 && (r = Object.assign({}, this.style(n, !1) || {}, r)), n !== -1)
      this.updateStyle(n, r);
    else {
      n = this.addStyle(r);
      const o = this.cell(e, t);
      o instanceof Object ? o.style = n : this.cell(e, t, {
        value: o || "",
        style: n
      });
    }
    return this;
  }
  style(e, t = !0) {
    return Zt(this._data, e, t);
  }
  addStyle(e) {
    return Er(this._data, e, this);
  }
  updateStyle(e, t) {
    return hs(this._data, e, t);
  }
  clearStyles() {
    return fs(this._data), this;
  }
  addBorder(...e) {
    return xs(this._data, e), this;
  }
  clearBorder(e) {
    return ds(this._data, e), this;
  }
  clearBorders() {
    return us(this._data), this;
  }
  cell(e, t, r) {
    const { _cells: s } = this;
    if (r)
      return s.set(e, t, r), this;
    const n = s.get(e, t);
    return n != null ? n[2] : n;
  }
  cellValue(e, t) {
    return mr(this.cell(e, t));
  }
  cellValueString(e, t) {
    return je(this.cell(e, t));
  }
  render() {
    var n;
    const { _data: e, _renderer: t, _overlayer: r } = this;
    for (const o in this._rendererOptions) {
      const c = this._rendererOptions[o];
      c && o in t && typeof t[o] == "function" && t[o](c);
    }
    t.scrollRows(e.scroll[0]).scrollCols(e.scroll[1]).merges(e.merges).freeze(e.freeze || "A1").styles(e.styles).borders(e.borders).rows(e.rows.len).cols(e.cols.len).row((o) => Fe(e, o)).col((o) => De(e, o)).cell((o, c) => this.cell(o, c)).formatter(this._cells._formatter).render();
    const { viewport: s } = t;
    if (s && (s.areas.forEach((o, c) => {
      r.area(c, o);
    }), s.headerAreas.forEach((o, c) => {
      r.headerArea(c, o);
    }), He.resize(this)), this._renderer._activeRowHeight) {
      for (const o in this._data.rows)
        if (o !== "len") {
          const c = this._data.rows[o];
          !c.autoWrapDisabled && c.height && this._renderer._activeRowHeight[o] === void 0 && delete this._data.rows[o];
        }
      for (const o in this._renderer._activeRowHeight)
        this.rowHeight(
          Number(o),
          Math.max(...this._renderer._activeRowHeight[o]),
          !0
        );
      t.render(), V.reset(this), this._canvas.focus();
    }
    return (n = this._headMenu) == null || n.render(), this;
  }
  data(e, t) {
    return e ? (t ? this._data = e : Object.assign(this._data, e), this._cells.load(this._data), Nt(this), this) : {
      ...this._data,
      cells: this._cells._
    };
  }
  /**
   * copy data to ...
   * @param to
   * @param autofill
   */
  copy(e, t = !1) {
    if (!e) return this;
    const r = (n, o) => ({
      range: typeof n == "string" ? U.with(n) : n,
      cells: o._cells,
      data: o._data
    }), s = (n) => {
      const { _selector: o } = n;
      if (!o) return null;
      const c = o.currentRange;
      return c === void 0 ? null : r(c, n);
    };
    return gs(
      s(this),
      e instanceof Lt ? s(e) : r(e, this),
      t
    ), this;
  }
  fill(e, t) {
    const { _selector: r } = this;
    let [s, n] = [0, 0];
    if (t)
      [n, s] = fe(t);
    else {
      if (!r) return this;
      [s, n] = r._focus;
    }
    let [o, c] = [0, 0];
    if (Array.isArray(e)) {
      for (const [f, a] of e.entries()) {
        c = n + a.length - 1, a[a.length - 1] || c--;
        for (const [l, p] of a.entries())
          this.cell(s + f, n + l, p);
      }
      o = s + e.length - 1;
    } else typeof e == "string" && ([o, c] = Pn(this, e, [s, n]));
    return (o > 0 || c > 0) && (V.unionRange(this, o, c), V.reset(this)), this;
  }
  /**
   * @param from A1:H12
   */
  toHtml(e) {
    return In(this, e);
  }
  toArrays(e) {
    const t = U.with(e), r = [];
    return t.eachRow((s) => {
      const n = [];
      t.eachCol((o) => {
        n.push(this.cellValue(s, o));
      }), r.push(n);
    }), r;
  }
  onClick(e) {
    return this._emitter.on("click", e), this;
  }
  onContextmenu(e) {
    return this._emitter.on("contextmenu", e), this;
  }
  addHistory(e) {
    this._history && this._history.add({
      type: e,
      data: this.data()
    });
  }
  /**
   * @param type keyof cell.type
   * @param editor
   * @returns
   */
  addEditor(e, t) {
    return this._editors.set(e, t), this;
  }
  static create(e, t, r, s) {
    return new Lt(e, t, r, s);
  }
  changeLang(e) {
    return this._i18n.changeLang(e), this;
  }
}
function Nt(i) {
  i._contentRect = {
    x: i._renderer._rowHeader.width,
    y: i._renderer._colHeader.height,
    width: Dr(i._data),
    height: Rr(i._data)
  };
}
window && (window.wolfp = Lt);
export {
  qe as HElement,
  ve as Renders,
  Lt as default,
  N as h,
  Nt as resizeContentRect
};
