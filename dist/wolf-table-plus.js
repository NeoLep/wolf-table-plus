var Ci = Object.defineProperty;
var Fr = (s) => {
  throw TypeError(s);
};
var wi = (s, t, e) => t in s ? Ci(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var C = (s, t, e) => wi(s, typeof t != "symbol" ? t + "" : t, e), Rr = (s, t, e) => t.has(s) || Fr("Cannot " + e);
var Wt = (s, t, e) => (Rr(s, t, "read from private field"), e ? e.call(s) : t.get(s)), Je = (s, t, e) => t.has(s) ? Fr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), tr = (s, t, e, r) => (Rr(s, t, "write to private field"), r ? r.call(s, e) : t.set(s, e), e);
const q = "wolf-table";
function er(...s) {
  const t = document.createDocumentFragment();
  return s.forEach((e) => {
    let r;
    e instanceof Nt ? r = e._ : typeof e == "string" ? r = document.createTextNode(e) : r = e, t.append(r);
  }), t;
}
class Nt {
  constructor(t, e) {
    C(this, "_");
    C(this, "_data", /* @__PURE__ */ new Map());
    if (this._ = t instanceof Node ? t : document.createElement(t), e)
      if (typeof e == "string")
        this._.className = e;
      else if (Array.isArray(e))
        this._.className = e.join(" ");
      else
        for (const [r, i] of Object.entries(e))
          i && this._.classList.add(r);
  }
  element() {
    return this._;
  }
  data(t, e) {
    return e ? (this._data.set(t, e), this) : this._data.get(t);
  }
  on(t, e) {
    const [r, ...i] = t.split(".");
    return this._.addEventListener(r, (n) => {
      e(n);
      for (const o of i)
        o === "stop" && n.stopPropagation(), o === "prevent" && n.preventDefault();
    }), this;
  }
  focus() {
    return this._.focus(), this;
  }
  value(t) {
    return t !== void 0 ? (this._.value = t, this) : this._.value;
  }
  textContent(t) {
    return this._.textContent = t, this;
  }
  html(t) {
    return this._.innerHTML = t, this;
  }
  attr(t, e) {
    return e ? (this._.setAttribute(t, e), this) : this._.getAttribute(t);
  }
  addCss(t) {
    this._.classList.add(t);
  }
  removeCss(t) {
    this._.classList.remove(t);
  }
  css(t, e) {
    const { style: r } = this._;
    return e && typeof t == "string" ? (r.setProperty(t, e), this) : typeof t == "string" ? r.getPropertyValue(t) : (Object.keys(t).forEach((i) => {
      let n = t[i];
      typeof n == "number" && (n = `${n}px`), r.setProperty(i, n);
    }), this);
  }
  rect() {
    return this._.getBoundingClientRect();
  }
  offset() {
    const { _: t } = this;
    return {
      x: t.offsetLeft,
      y: t.offsetTop,
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  }
  computedStyle() {
    return window.getComputedStyle(this._);
  }
  show(t = !0) {
    return this.css("display", t ? "block" : "none"), this;
  }
  hide() {
    return this.css("display", "none"), this;
  }
  scrollx(t) {
    const { _: e } = this;
    return t !== void 0 ? (e.scrollLeft = t, this) : e.scrollLeft;
  }
  scrolly(t) {
    const { _: e } = this;
    return t !== void 0 ? (e.scrollTop = t, this) : e.scrollTop;
  }
  after(...t) {
    return this._.after(er(...t)), this;
  }
  before(...t) {
    return this._.before(er(...t)), this;
  }
  append(...t) {
    return this._.append(er(...t)), this;
  }
  remove(...t) {
    t.forEach((e) => {
      (e instanceof Nt ? e._ : e).remove();
    });
  }
  cloneNode() {
    return this._.cloneNode(!0);
  }
  get firstChild() {
    const t = this._.firstChild;
    return t ? new Nt(t) : null;
  }
}
function M(s, t) {
  return new Nt(s, t);
}
function _t() {
  return M("div", `${q}-overlayer-area`);
}
class mi {
  constructor(t) {
    C(this, "_areas");
    C(this, "_headerAreas");
    C(this, "_areaRects", []);
    this._areas = [_t(), _t(), _t(), _t()], this._headerAreas = [_t(), _t(), _t(), _t()], t.append(...this._areas, ...this._headerAreas);
  }
  area(t, e) {
    if (e) {
      this._areaRects[t] = e;
      const { x: r, y: i, height: n, width: o } = e;
      return this._areas[t].css({ left: r, top: i, width: o, height: n }), this;
    }
    return this._areas[t];
  }
  headerArea(t, e) {
    if (e) {
      const { x: r, y: i, height: n, width: o } = e;
      this._headerAreas[t].css({ left: r, top: i, width: o, height: n });
    }
    return this._headerAreas[t];
  }
  inAreas({ x: t, y: e, height: r, width: i }) {
    const n = t + i, o = e + r;
    for (const c of this._areaRects)
      if (t >= 0 && n <= c.width && e >= 0 && o <= c.height)
        return !0;
    return !1;
  }
}
const or = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function bi(s) {
  return or.charAt(s % or.length);
}
function $0(s) {
  const t = [];
  for (; s >= 0; )
    t.push(bi(s)), s = Number.parseInt(`${s / or.length}`, 10) - 1;
  return t.reverse().join("");
}
function yi(s) {
  let t = 0;
  for (let e = 0; e < s.length; e++)
    t = 26 * t + s.charCodeAt(e) - 64;
  return t - 1;
}
function et(s) {
  let t = "", e = "";
  for (let r = 0; r < s.length; r += 1)
    s.charAt(r) >= "0" && s.charAt(r) <= "9" ? e += s.charAt(r) : t += s.charAt(r).toUpperCase();
  return [yi(t), Number.parseInt(e, 10) - 1];
}
function Q(s, t) {
  return `${$0(s)}${t + 1}`;
}
function Sr(s, t, e) {
  const [r, i] = et(s);
  return Q(r + t, i + e);
}
function kr(s) {
  const t = /^([A-Z]+)(\d+)$/;
  if (!t.test(s)) return !1;
  const e = t.exec(s);
  if (!e) return !1;
  const [, r, i] = e, n = parseInt(i, 10);
  return n < 1 || n > 1048576 ? !1 : /^[A-Z]+$/.test(r) && r.length > 0;
}
class Ei {
  constructor(t, e) {
    C(this, "_target");
    C(this, "_ctx");
    C(this, "_scale");
    this.target = t;
    const r = t.getContext("2d");
    if (!r) throw new Error("getContext(2d) is null");
    this._ctx = r, this._scale = e, this._target = t;
  }
  size(t, e) {
    const { _target: r, _scale: i } = this;
    r.style.width = `${t}px`, r.style.height = `${e}px`;
    const n = window.devicePixelRatio;
    return r.width = Math.floor(t * n), r.height = Math.floor(e * n), this._ctx.scale(n * i, n * i), this;
  }
  prop(t, e) {
    return e ? (this._ctx[t] = e, this) : typeof t == "string" ? this._ctx[t] : (Object.entries(t).forEach(([r, i]) => {
      i != null && (this._ctx[r] = i);
    }), this);
  }
  measureTextWidth(t) {
    return this.measureText(t).width;
  }
  // draw line
  line(t, e, r, i) {
    return this.moveTo(t, e).lineTo(r, i).stroke(), this;
  }
  // Drawing rectangles
  clearRect(t, e, r, i) {
    return this._ctx.clearRect(t, e, r, i), this;
  }
  fillRect(t, e, r, i) {
    return this._ctx.fillRect(t, e, r, i), this;
  }
  strokeRect(t, e, r, i) {
    return this._ctx.strokeRect(t, e, r, i), this;
  }
  // Drawing text
  fillText(t, e, r, i) {
    return this._ctx.fillText(t, e, r, i), this;
  }
  strokeText(t, e, r, i) {
    return this._ctx.strokeText(t, e, r, i), this;
  }
  measureText(t) {
    return this._ctx.measureText(t);
  }
  // Line styles
  getLineDash() {
    return this._ctx.getLineDash();
  }
  setLineDash(t) {
    return this._ctx.setLineDash(t), this;
  }
  // Gradients and patterns
  createLinearGradient(t, e, r, i) {
    return this._ctx.createLinearGradient(t, e, r, i);
  }
  createRadialGradient(t, e, r, i, n, o) {
    return this._ctx.createRadialGradient(t, e, r, i, n, o);
  }
  createPattern(t, e) {
    return this._ctx.createPattern(t, e);
  }
  // Paths
  beginPath() {
    return this._ctx.beginPath(), this;
  }
  closePath() {
    return this._ctx.closePath(), this;
  }
  moveTo(t, e) {
    return this._ctx.moveTo(t, e), this;
  }
  lineTo(t, e) {
    return this._ctx.lineTo(t, e), this;
  }
  bezierCurveTo(t, e, r, i, n, o) {
    return this._ctx.bezierCurveTo(t, e, r, i, n, o), this;
  }
  quadraticCurveTo(t, e, r, i) {
    return this._ctx.quadraticCurveTo(t, e, r, i), this;
  }
  arc(t, e, r, i, n, o) {
    return this._ctx.arc(t, e, r, i, n, o), this;
  }
  arcTo(t, e, r, i, n) {
    return this._ctx.arcTo(t, e, r, i, n), this;
  }
  ellipse(t, e, r, i, n, o, c, h) {
    return this._ctx.ellipse(t, e, r, i, n, o, c, h), this;
  }
  rect(t, e, r, i) {
    return this._ctx.rect(t, e, r, i), this;
  }
  roundRect(t, e, r, i, n) {
    return this.beginPath().moveTo(t + n, e).arcTo(t + r, e, t + r, e + i, n).arcTo(t + r, e + i, t, e + i, n).arcTo(t, e + i, t, e, n).arcTo(t, e, t + r, e, n).closePath(), this;
  }
  // Drawing paths
  fill(t) {
    return this._ctx.fill(t), this;
  }
  stroke() {
    return this._ctx.stroke(), this;
  }
  clip(t) {
    return this._ctx.clip(t), this;
  }
  isPointInPath(t, e, r) {
    return this._ctx.isPointInPath(t, e, r);
  }
  isPointInStroke(t, e) {
    return this._ctx.isPointInStroke(t, e);
  }
  // Transformations
  getTransform() {
    return this._ctx.getTransform();
  }
  rotate(t) {
    return this._ctx.rotate(t), this;
  }
  scale(t, e) {
    return this._ctx.scale(t, e), this;
  }
  translate(t, e) {
    return this._ctx.translate(t, e), this;
  }
  setTransform(t, e, r, i, n, o) {
    return this._ctx.setTransform(t, e, r, i, n, o), this;
  }
  // Drawing images
  drawImage(t, e, r) {
    return this._ctx.drawImage(t, e, r), this;
  }
  // Pixel manipulation
  createImageData(t, e) {
    return this._ctx.createImageData(t, e);
  }
  getImageData(t, e, r, i) {
    return this._ctx.getImageData(t, e, r, i);
  }
  putImageData(t, e, r) {
    return this._ctx.putImageData(t, e, r), this;
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
  constructor(t, e, r, i) {
    this.startRow = t, this.startCol = e, this.endRow = r, this.endCol = i;
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
  containsRow(t) {
    return this.startRow <= t && t <= this.endRow;
  }
  /**
   * check whether or not the index contained in the col of range
   * @param {int} index
   * @returns {boolean}
   */
  containsCol(t) {
    return this.startCol <= t && t <= this.endCol;
  }
  /**
   * check whether or not the range contains a cell position(row, col)
   * @param {int} row row-index
   * @param {int} col col-index
   * @returns {boolean}
   */
  contains(t, e) {
    return this.containsRow(t) && this.containsCol(e);
  }
  /**
   * check whether or not the range within the other range
   * @param {Range} other
   * @returns {boolean}
   */
  within(t) {
    return this.startRow >= t.startRow && this.startCol >= t.startCol && this.endRow <= t.endRow && this.endCol <= t.endCol;
  }
  position(t) {
    if (this.startRow <= t.startRow && this.endRow >= t.endRow) {
      if (t.startCol > this.endCol) return "right";
      if (t.endCol < this.startCol) return "left";
    } else if (this.startCol <= t.startCol && this.endCol >= t.endCol) {
      if (t.startRow > this.endRow) return "down";
      if (t.endRow < this.startRow) return "up";
    }
    return "none";
  }
  intersectsRow(t, e) {
    return this.startRow <= e && t <= this.endRow;
  }
  intersectsCol(t, e) {
    return this.startCol <= e && t <= this.endCol;
  }
  /**
   * check whether or not the range intersects the other range
   * @param {Range} other
   * @returns {boolean}
   */
  intersects({ startRow: t, startCol: e, endRow: r, endCol: i }) {
    return this.intersectsCol(e, i) && this.intersectsRow(t, r);
  }
  /**
   * the self intersection the other resulting in the new range
   * @param {Range} other
   * @returns {Range} the new range
   */
  intersection(t) {
    return new U(
      t.startRow < this.startRow ? this.startRow : t.startRow,
      t.startCol < this.startCol ? this.startCol : t.startCol,
      t.endRow > this.endRow ? this.endRow : t.endRow,
      t.endCol > this.endCol ? this.endCol : t.endCol
    );
  }
  /**
   * the self union the other resulting in the new range
   * @param {Range} other
   * @returns {Range} the new range
   */
  union(t) {
    return new U(
      t.startRow < this.startRow ? t.startRow : this.startRow,
      t.startCol < this.startCol ? t.startCol : this.startCol,
      t.endRow > this.endRow ? t.endRow : this.endRow,
      t.endCol > this.endCol ? t.endCol : this.endCol
    );
  }
  // Returns Array<CellRange> that represents that part of this that does not intersect with other
  // difference
  difference(t) {
    const e = [];
    if (!this.intersects(t)) return e;
    const { startRow: r, startCol: i, endRow: n, endCol: o } = this, c = this.intersection(t);
    return [
      new U(r, i, c.startRow - 1, o),
      // top
      new U(c.endRow + 1, i, n, o),
      // bottom
      new U(c.startRow, i, c.endRow, c.startCol - 1),
      // left
      new U(c.startRow, c.endCol + 1, c.endRow, o)
      // right
    ].filter((h) => h.rows >= 0 && h.cols >= 0);
  }
  touches(t) {
    return t.startRow === this.startRow && t.endRow === this.endRow && (t.endCol + 1 === this.startCol || this.endCol + 1 === t.startCol) || t.startCol === this.startCol && t.endCol === this.endCol && (t.endRow + 1 === this.startRow || this.endRow + 1 === this.startCol);
  }
  eachRow(t, e) {
    let { endRow: r } = this;
    e && r > e && (r = e);
    for (let i = this.startRow; i <= r; i += 1)
      t(i);
    return this;
  }
  eachCol(t, e) {
    let { endCol: r } = this;
    e && r > e && (r = e);
    for (let i = this.startCol; i <= r; i += 1)
      t(i);
    return this;
  }
  /**
   * @param {Function} cb (rowIndex, colIndex) => {}
   * @returns this
   */
  each(t) {
    return this.eachRow((e) => {
      this.eachCol((r) => t(e, r));
    }), this;
  }
  clone() {
    return new U(this.startRow, this.startCol, this.endRow, this.endCol);
  }
  toString() {
    let t = Q(this.startCol, this.startRow);
    return this.multiple && (t += `:${Q(this.endCol, this.endRow)}`), t;
  }
  equals(t) {
    return this.startRow === t.startRow && this.startCol === t.startCol && this.endRow === t.endRow && this.endCol === t.endCol;
  }
  static create(t, e, r, i) {
    if (r !== void 0 && i !== void 0) {
      let [n, o, c, h] = [t, e, r, i];
      return t > r && (n = r, c = t), e > i && (o = i, h = e), new U(n, o, c, h);
    }
    return new U(t, e, t, e);
  }
  static with(t) {
    const e = t.split(":"), [r, i] = et(e[0]);
    if (e.length === 1)
      return this.create(i, r);
    const [n, o] = et(e[1]);
    return this.create(i, r, o, n);
  }
}
function Bi(s, t) {
  s && s.length > 0 && s.forEach((e) => {
    t(U.with(e));
  });
}
class H0 {
  constructor(t) {
    C(this, "_");
    C(this, "_target", null);
    C(this, "_rect", null);
    C(this, "_oldValue", "");
    C(this, "_value");
    C(this, "_visible", !1);
    C(this, "_moveChanger", () => {
    });
    C(this, "_changer", () => {
    });
    C(this, "storeHistory", () => 0);
    this._ = M("div", t);
  }
  get visible() {
    return this._visible;
  }
  target(t) {
    return t.append(this._), this._target = t, this;
  }
  cellIndex(t, e) {
    return this;
  }
  value(t) {
    return this._value = t, this;
  }
  changed() {
    this._changer(this._value), this.hide();
  }
  rect(t) {
    if (t) {
      this._visible = !0, this._rect = t;
      const { x: e, y: r, width: i, height: n } = t;
      this._.css({
        left: e - 2 / 2,
        top: r - 2 / 2,
        width: i - 2,
        height: n - 2
      }).show();
    }
    return this;
  }
  show(t) {
    return this._oldValue = JSON.stringify(this._value), t !== void 0 && this.value(t), this._.show(), this;
  }
  hide() {
    return JSON.stringify(this._value || "") !== this._oldValue && this._changer(this._value), this._visible = !1, this._oldValue = "", this.value(), this._.hide(), this;
  }
  moveChanger(t) {
    return this._moveChanger = t, this;
  }
  cancel() {
    this._value = JSON.parse(this._oldValue);
  }
  changer(t) {
    return this._changer = t, this;
  }
}
class Ai {
  constructor() {
    C(this, "_", []);
    C(this, "_indexes", /* @__PURE__ */ new Map());
    C(this, "_formulas", []);
    C(this, "_formulaParser", (t) => t);
    C(this, "_formatter", (t, e, r) => r);
    C(this, "_releasedIndexs", []);
  }
  formulaParser(t) {
    return this._formulaParser = t, this;
  }
  formatter(t) {
    return this._formatter = t, this;
  }
  load({ cells: t }) {
    t && (this._ = t, this.resetIndexes());
  }
  get(t, e) {
    const { _indexes: r } = this;
    if (r.has(t)) {
      const i = r.get(t).get(e);
      return i !== void 0 ? this._[i] : null;
    }
    return null;
  }
  removeValue(t, e) {
    const { _indexes: r } = this;
    if (r.has(t)) {
      const n = r.get(t).get(e);
      n !== void 0 && this._[n] && (typeof this._[n][2] == "object" ? this._[n][2].value = void 0 : this.remove(t, e));
    }
    return this;
  }
  remove(t, e) {
    const { _indexes: r } = this;
    if (r.has(t)) {
      const i = r.get(t), n = i.get(e);
      n !== void 0 && (this._[n] = null, this._releasedIndexs.includes(n) || this._releasedIndexs.push(n), i.delete(e));
    }
    return this;
  }
  set(t, e, r) {
    const i = this.get(t, e);
    if (i == null) {
      if (r != null) {
        const n = this._.push([t, e, r]) - 1;
        this.updateIndex(t, e, n), this.addFormula(r, n);
      }
    } else {
      const n = i[2], o = jt(n), c = jt(r);
      n instanceof Object ? Object.assign(n, r instanceof Object ? r : { value: r }) : i[2] = r, c !== o && this.resetFormulas();
    }
  }
  setFormat(t, e, r) {
    const i = this.get(t, e), n = i ? i[2] : null;
    n === null ? this.set(t, e, { format: r }) : typeof n == "object" ? this.set(t, e, { ...n, format: r }) : this.set(t, e, { value: n || "", format: r });
  }
  fixed(t, e, r) {
    const i = this.get(t, e), n = i ? i[2] : null;
    let o = 2;
    if ((n == null ? void 0 : n.fixed) !== void 0 && (o = n.fixed, o < 0 && (o = 0)), r)
      typeof r == "number" ? r >= 0 ? o = r : console.warn("fixed can't less than zero") : typeof r == "string" && (r === "increase" ? o++ : r === "reduce" && o > 0 && o--), n === null ? this.set(t, e, { fixed: o }) : typeof n == "object" ? this.set(t, e, { ...n, fixed: o }) : this.set(t, e, { value: n || "", fixed: o });
    else
      return o;
  }
  resetIndexes() {
    const { _: t } = this;
    this._indexes = /* @__PURE__ */ new Map();
    for (const [e, r] of t.entries())
      if (r) {
        const [i, n, o] = r;
        this.updateIndex(i, n, e), this.addFormula(o, e);
      }
  }
  updateIndex(t, e, r) {
    const { _indexes: i } = this;
    i.has(t) || i.set(t, /* @__PURE__ */ new Map()), i.get(t).set(e, r);
  }
  addFormula(t, e) {
    t instanceof Object && t.formula && (t.value = String(this._formulaParser(t.formula)), this._formulas.push(e));
  }
  resetFormulas() {
    this._formulas.forEach((t) => {
      if (this._[t]) {
        const e = this._[t][2];
        e instanceof Object && e.formula && (e.value = String(this._formulaParser(e.formula)));
      }
    });
  }
}
function T0(s) {
  return s instanceof Object ? s.value : s;
}
function jt(s) {
  const t = T0(s);
  return `${t ?? ""}`;
}
function P0(s, t, e, r, i) {
  const { scroll: n } = s, o = r === "row" ? 0 : 1, c = r === "row" ? 3 : 2;
  let h = n[c], l = !1;
  const a = n[o];
  let x = 0;
  const { freeze: d } = s;
  if (d && (x = et(d)[r === "row" ? 1 : 0]), e > 0)
    if (t === "+")
      for (let p = a; !(h >= e); p += 1) {
        const f = i(x + p);
        h += f, s.scroll[o] = p + 1, l = !0;
      }
    else
      for (let p = a; !(h <= e); p -= 1) {
        const f = i(x + p - 1);
        if (h -= f, s.scroll[o] = p - 1, l = !0, f > 0) break;
      }
  else
    s.scroll[o] = 0, h = 0, l = !0;
  return n[c] = h, l;
}
function Di(s, t, e) {
  return t && e !== void 0 ? P0(s, t, e, "col", (r) => Ft(s, r).width) : s.scroll[2];
}
function Fi(s, t, e) {
  return t && e !== void 0 ? P0(s, t, e, "row", (r) => Rt(s, r).height) : s.scroll[3];
}
function $r({ merges: s }, t) {
  if (s) {
    const e = U.with(t);
    for (let r = 0; r < s.length; r += 1)
      if (U.with(s[r]).equals(e))
        return !0;
  }
  return !1;
}
function Hr(s, t) {
  const e = U.with(t);
  if (!e.multiple) return;
  s.merges || (s.merges = []);
  const { merges: r } = s;
  r.length <= 0 || r.forEach((i, n) => {
    U.with(i).within(e) && r.splice(n, 1);
  }), r.push(t);
}
function ar({ merges: s }, t) {
  if (s) {
    for (let e = 0; e < s.length; e += 1)
      if (s[e] === t) {
        s.splice(e, 1);
        return;
      }
  }
}
function I0({ merges: s }, t) {
  if (s)
    for (let e = 0; e < s.length; e += 1) {
      const r = U.with(s[e]);
      r.intersects(t) && (t = r.union(t));
    }
  return t;
}
function z0(s, t, e) {
  s.styles || (s.styles = []);
  const r = {};
  e && e._cells._.forEach((i) => {
    if (i) {
      const n = i[2];
      n instanceof Object && n.style !== void 0 && (r[n.style] = !0);
    }
  });
  for (let i = 0; i < s.styles.length; i++)
    if (!r[i])
      return s.styles[i] = t, i;
  return s.styles.push(t) - 1;
}
function Ri(s, t, e, r) {
  s.styles[t] = e;
}
function rr(s, t, e = !0) {
  const r = s.styles[t];
  return e ? Object.assign({}, s.style, s.styles[t] || {}) : r;
}
function Si(s) {
  s.styles.length = 0;
}
function ki(s, t) {
  s.borders || (s.borders = []);
  const e = U.with(t[0]), { borders: r } = s;
  for (let i = 0; i < r.length; i += 1) {
    const [n, ...o] = r[i], c = U.with(n);
    if (c.intersects(e)) {
      c.within(e) ? r.push(t) : (r.push(t), c.difference(e).forEach((h) => {
        r.push([h.toString(), ...o]);
      })), r.splice(i, 1);
      return;
    } else if (o.every((h, l) => h === t[l + 1]) && c.touches(e)) {
      r[i][0] = c.union(e).toString();
      return;
    }
  }
  r.push(t);
}
function $i(s, t) {
  const { borders: e } = s;
  if (e) {
    const r = [], i = U.with(t);
    for (let n = 0; n < e.length; n += 1) {
      const [o, ...c] = e[n], h = U.with(o);
      h.intersects(i) && (h.within(i) || h.difference(i).forEach((l) => {
        r.push([l.toString(), ...c]);
      }), e.splice(n, 1), n -= 1);
    }
    e.push(...r);
  }
}
function Hi(s) {
  s.borders.length = 0;
}
function O0(s, t, e) {
  let r = 0;
  for (let i = s; i < t; i += 1) r += e(i);
  return r;
}
function Ti(s) {
  return s <= 0.75 ? 1 : s <= 1.5 ? 2 : s <= 2.25 ? 3 : s <= 3 ? 4 : s <= 3.75 ? 5 : s <= 4.5 ? 6 : 96 / 72 * s;
}
function Ft(s, t, e) {
  const r = s.cols[t] || { width: s.colWidth };
  return e ? s.cols[t] = Object.assign(r, e) : r;
}
function Oe(s, t, e) {
  if (e) {
    const { cols: r } = s;
    r[t] ? r[t].width = e : r[t] = { width: e };
  } else {
    const r = Ft(s, t);
    return r.hide ? 0 : r.width;
  }
}
function M0(s, t, e) {
  const { cols: r } = s;
  if (arguments.length === 1) {
    let i = r.len * s.colWidth;
    for (const n in r)
      if (n !== "len") {
        const o = Oe(s, Number.parseInt(n, 10));
        o > 0 && (i += o, i -= s.colWidth);
      }
    return i;
  }
  return O0(
    t !== void 0 ? t : 0,
    e !== void 0 ? e : r.len,
    (i) => Oe(s, i)
  );
}
function Pi(s, t) {
  return s.cols.len - 1 === t;
}
function Me(s, t, e) {
  for (; ; )
    if (Ft(s, t).hide) t += e;
    else return t;
}
function W0(s) {
  let t = 0;
  return s.cells.forEach((e) => {
    e && e[1] > t && (t = e[1]);
  }), t;
}
function Rt(s, t, e) {
  const r = s.rows[t] || { height: s.rowHeight };
  return e ? s.rows[t] = Object.assign(r, e) : r;
}
function We(s, t, e, r) {
  if (e) {
    const { rows: i } = s;
    let n = !1;
    if (e !== s.rowHeight && !r && (n = !0), i[t]) {
      if (i[t].autoWrapDisabled && r)
        return;
      i[t].height = e, i[t].autoWrapDisabled = n;
    } else
      i[t] = { height: e, autoWrapDisabled: n };
  } else {
    const i = Rt(s, t);
    return i.hide ? 0 : i.height;
  }
}
function L0(s, t, e) {
  const { rows: r } = s;
  if (arguments.length === 1) {
    let i = r.len * s.rowHeight;
    for (const n in r)
      if (n !== "len") {
        const o = We(s, Number.parseInt(n, 10));
        o > 0 && (i += o, i -= s.rowHeight);
      }
    return i;
  }
  return O0(
    t !== void 0 ? t : 0,
    e !== void 0 ? e : r.len,
    (i) => We(s, i)
  );
}
function Ii(s, t) {
  return s.rows.len - 1 === t;
}
function Le(s, t, e) {
  for (; ; )
    if (Rt(s, t).hide) t += e;
    else return t;
}
function V0(s) {
  let t = 0;
  return s.cells.forEach((e) => {
    e && e[0] > t && (t = e[0]);
  }), t;
}
function zi(s, t, e = !1) {
  if (!s || !t) return;
  const r = s.range.position(t.range);
  if (r === "none") return;
  const { rows: i, cols: n } = s.range;
  t.range.each((o, c) => {
    let h = s.range.startRow, l = s.range.startCol, a, x, d = [o - t.range.startRow, c - t.range.startCol];
    ["up", "left"].includes(r) && (d = [t.range.endRow - o, t.range.endCol - c]), r === "down" || r === "up" ? i <= 0 && e && (a = r, x = d[0] + 1, r === "up" && (x = 0 - x)) : n <= 0 && e && (a = r, x = d[1] + 1, r === "left" && (x = 0 - x));
    const p = d[1] % (n + 1), f = d[0] % (i + 1);
    ["up", "left"].includes(r) ? (h = s.range.endRow - f, l = s.range.endCol - p) : (h += f, l += p), Oi(h, l, o, c, s, t, a, x);
  });
}
function Oi(s, t, e, r, i, n, o, c) {
  const h = i.cells.get(s, t);
  if (h !== null && h[2] !== void 0 && h[2] !== null) {
    let l = h[2];
    if (l instanceof Object) {
      if (l = Object.assign({}, l), l.style !== void 0 && i.cells !== n.cells) {
        const a = Object.assign({}, i.data.styles[l.style]);
        l.style = z0(n.data, a);
      }
      o !== void 0 && c !== void 0 && (l.formula ? l.formula = l.formula.replace(
        /[A-Za-z]{1,3}\d+/g,
        (a) => ["left", "top"].includes(o) ? Sr(a, c, 0) : Sr(a, 0, c)
      ) : l.value && (xt.use().getRender(mt(l)).disableAutoFillAction || (l.value = String(Tr(l.value, c)))));
    } else
      c !== void 0 && (l = Tr(l, c));
    n.cells.set(e, r, l);
  } else
    n.cells.remove(s, t);
}
function Tr(s, t) {
  return typeof s == "string" ? s.replace(/(\d+$)|((\d+)\D+$)/g, (e) => e.replace(/\d+/, (r) => `${Number.parseInt(r) + t}`)) : s + t;
}
function Mi() {
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
class Wi extends H0 {
  constructor() {
    super(`${q}-editor`);
    C(this, "_text", M("textarea", ""));
    C(this, "_textMeasure", M("div", "measure"));
    C(this, "_editing", !1);
    this._.append(this._text, this._textMeasure), this._text.on("keydown", (e) => {
      Li(this, e);
    }).on("input", (e) => {
      const r = e.target, { value: i } = r;
      this._editing = !0, this._value = i, Pr(this);
    });
  }
  value(e) {
    return super.value(e), this._text.value(jt(e) || ""), Pr(this), this;
  }
  rect(e) {
    return super.rect(e), e && setTimeout(() => {
      const { _value: r } = this;
      let i = 0;
      r !== null && (i = jt(r).length);
      const n = this._text.element();
      n.focus(), n.setSelectionRange(i, i);
    }, 0), this;
  }
  hide() {
    return super.hide(), this._editing = !1, this;
  }
}
function Pr(s) {
  const { _: t, _value: e, _rect: r, _textMeasure: i, _target: n } = s;
  if (typeof e != "string") return;
  let o = e.replace(`
`, "<br/>");
  if (e.endsWith(`
`) && (o += "T"), i.html(o), r && n) {
    const c = Number.parseInt(i.computedStyle().getPropertyValue("padding")), h = n.offset(), l = h.width - r.x - 2, a = h.height - r.y - 2;
    t.css("max-width", `${l}px`), i.css("max-width", `${l - c * 2}px`);
    const { width: x, height: d } = i.rect(), p = r.width - 2;
    x > p && t.css({ width: x }), d > r.height && d <= a ? t.css({ height: d }) : d < r.height && t.css({ height: r.height - 2 });
  }
}
function Li(s, t) {
  const { code: e, shiftKey: r, metaKey: i, altKey: n, ctrlKey: o, target: c } = t, h = (l) => {
    s.hide(), s._moveChanger(l);
  };
  e === "Enter" || e === "NumpadEnter" ? (n ? (c.value += `
`, s.value(c.value)) : h(r ? "up" : "down"), t.preventDefault()) : e === "Tab" && !o && !i && !n ? (h(r ? "left" : "right"), t.preventDefault()) : e === "Escape" && (s.cancel(), h("none"), t.preventDefault());
}
function q0(s, t, e, r, i) {
  switch (s) {
    case "top":
      return i;
    case "middle": {
      const n = t / 2 - e / 2, o = r / 2 + i;
      return n < o ? o : n;
    }
    case "bottom":
      return t - i - e;
    default:
      return 0;
  }
}
function N0(s, t, e, r, i, n, o) {
  let c = 0;
  s === "underline" ? e === "top" ? c = -o : e === "middle" && (c = -o / 2) : s === "strikethrough" && (e === "top" ? c = -o / 2 : e === "bottom" && (c = o / 2));
  let h = 0;
  return t === "center" ? h = n / 2 : t === "right" && (h = n), [r - h, i - c, r - h + n, i - c];
}
function j0(s, t, e) {
  switch (s) {
    case "left":
      return e;
    case "center":
      return t / 2;
    case "right":
      return t - e;
    default:
      return 0;
  }
}
function Y0(s, t, e, r) {
  if (s && t) {
    let i = "";
    return e && (i += "italic "), r && (i += "bold "), `${i} ${t}pt ${s}`;
  }
}
const U0 = (s, t, e, r, i, n, o, c) => {
  c || (c = Ge(t, r, n));
  const {
    fontSize: h,
    fontFamily: l,
    bold: a,
    italic: x,
    color: d,
    align: p,
    valign: f,
    underline: _,
    strikethrough: v,
    textwrap: m,
    padding: u
  } = r;
  s.save().beginPath().prop({
    textAlign: p,
    textBaseline: f,
    font: Y0(l, h, x, a),
    fillStyle: d
  });
  const [g, w] = u || [5, 5], b = j0(p, e.width, g), E = c.split(`
`), A = e.width - g * 2, D = [];
  E.forEach((S) => {
    const $ = s.measureTextWidth(S);
    if (m && $ > A) {
      let W = { w: 0, len: 0, start: 0 };
      for (let P = 0; P < S.length; P += 1)
        W.w > A && (D.push(S.slice(W.start, P)), W = { w: 0, len: 0, start: P }), W.len++, W.w += s.measureTextWidth(S[P]) + 1;
      W.len > 0 && D.push(S.slice(W.start));
    } else
      D.push(S);
  });
  const k = h / 0.75, y = (D.length - 1) * k, B = [];
  _ && B.push("underline"), v && B.push("strikethrough");
  let H = q0(f, e.height, y, k, w), T = 0;
  const F = (D.length > 0 ? D.length : 1) * k;
  return D.forEach((S) => {
    const $ = s.measureTextWidth(S);
    T = Math.max(T, $), s.fillText(S, b, H), B.forEach((W) => {
      s._ctx.strokeStyle = d, s.line(...N0(W, p, f, b, H, $, h));
    }), H += k;
  }), s.restore(), {
    contentInfo: {
      width: T,
      height: F + 10
    }
  };
}, Vi = (s, t, e, r, i) => `>${s.cellValueString(e, r)}</td>`, qi = (s, t, e) => {
  const r = t.innerHTML.replace(/<br(\/){0,1}>/gi, `
`).replace(/(<([^>]+)>|)/gi, "").replace("&nbsp;", " "), i = {};
  return Object.keys(e).length > 0 && (i.style = s.addStyle(e)), r !== null && !/^\s*$/.test(r) && (i.value = r), i;
}, Ni = Wi;
var ir = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function K0(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
function ji(s) {
  if (s.__esModule) return s;
  var t = s.default;
  if (typeof t == "function") {
    var e = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(s).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(s, r);
    Object.defineProperty(e, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return s[r];
      }
    });
  }), e;
}
var Qt = { exports: {} };
function Yi(s) {
  throw new Error('Could not dynamically require "' + s + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Jt = { exports: {} };
const Ui = {}, Ki = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ui
}, Symbol.toStringTag, { value: "Module" })), Xi = /* @__PURE__ */ ji(Ki);
var Gi = Jt.exports, Ir;
function K() {
  return Ir || (Ir = 1, function(s, t) {
    (function(e, r) {
      s.exports = r();
    })(Gi, function() {
      var e = e || function(r, i) {
        var n;
        if (typeof window < "u" && window.crypto && (n = window.crypto), typeof self < "u" && self.crypto && (n = self.crypto), typeof globalThis < "u" && globalThis.crypto && (n = globalThis.crypto), !n && typeof window < "u" && window.msCrypto && (n = window.msCrypto), !n && typeof ir < "u" && ir.crypto && (n = ir.crypto), !n && typeof Yi == "function")
          try {
            n = Xi;
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
            var w;
            return u.prototype = g, w = new u(), u.prototype = null, w;
          };
        }(), h = {}, l = h.lib = {}, a = l.Base = /* @__PURE__ */ function() {
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
        }(), x = l.WordArray = a.extend({
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
            u = this.words = u || [], g != i ? this.sigBytes = g : this.sigBytes = u.length * 4;
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
            return (u || p).stringify(this);
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
            var g = this.words, w = u.words, b = this.sigBytes, E = u.sigBytes;
            if (this.clamp(), b % 4)
              for (var A = 0; A < E; A++) {
                var D = w[A >>> 2] >>> 24 - A % 4 * 8 & 255;
                g[b + A >>> 2] |= D << 24 - (b + A) % 4 * 8;
              }
            else
              for (var k = 0; k < E; k += 4)
                g[b + k >>> 2] = w[k >>> 2];
            return this.sigBytes += E, this;
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
            var u = a.clone.call(this);
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
            for (var g = [], w = 0; w < u; w += 4)
              g.push(o());
            return new x.init(g, u);
          }
        }), d = h.enc = {}, p = d.Hex = {
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
            for (var g = u.words, w = u.sigBytes, b = [], E = 0; E < w; E++) {
              var A = g[E >>> 2] >>> 24 - E % 4 * 8 & 255;
              b.push((A >>> 4).toString(16)), b.push((A & 15).toString(16));
            }
            return b.join("");
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
            for (var g = u.length, w = [], b = 0; b < g; b += 2)
              w[b >>> 3] |= parseInt(u.substr(b, 2), 16) << 24 - b % 8 * 4;
            return new x.init(w, g / 2);
          }
        }, f = d.Latin1 = {
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
            for (var g = u.words, w = u.sigBytes, b = [], E = 0; E < w; E++) {
              var A = g[E >>> 2] >>> 24 - E % 4 * 8 & 255;
              b.push(String.fromCharCode(A));
            }
            return b.join("");
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
            for (var g = u.length, w = [], b = 0; b < g; b++)
              w[b >>> 2] |= (u.charCodeAt(b) & 255) << 24 - b % 4 * 8;
            return new x.init(w, g);
          }
        }, _ = d.Utf8 = {
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
              return decodeURIComponent(escape(f.stringify(u)));
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
            return f.parse(unescape(encodeURIComponent(u)));
          }
        }, v = l.BufferedBlockAlgorithm = a.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new x.init(), this._nDataBytes = 0;
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
            typeof u == "string" && (u = _.parse(u)), this._data.concat(u), this._nDataBytes += u.sigBytes;
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
            var g, w = this._data, b = w.words, E = w.sigBytes, A = this.blockSize, D = A * 4, k = E / D;
            u ? k = r.ceil(k) : k = r.max((k | 0) - this._minBufferSize, 0);
            var y = k * A, B = r.min(y * 4, E);
            if (y) {
              for (var H = 0; H < y; H += A)
                this._doProcessBlock(b, H);
              g = b.splice(0, y), w.sigBytes -= B;
            }
            return new x.init(g, B);
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
            var u = a.clone.call(this);
            return u._data = this._data.clone(), u;
          },
          _minBufferSize: 0
        });
        l.Hasher = v.extend({
          /**
           * Configuration options.
           */
          cfg: a.extend(),
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
            v.reset.call(this), this._doReset();
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
            return function(g, w) {
              return new u.init(w).finalize(g);
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
            return function(g, w) {
              return new m.HMAC.init(u, w).finalize(g);
            };
          }
        });
        var m = h.algo = {};
        return h;
      }(Math);
      return e;
    });
  }(Jt)), Jt.exports;
}
var te = { exports: {} }, Zi = te.exports, zr;
function Xe() {
  return zr || (zr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(Zi, function(e) {
      return function(r) {
        var i = e, n = i.lib, o = n.Base, c = n.WordArray, h = i.x64 = {};
        h.Word = o.extend({
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
          init: function(l, a) {
            this.high = l, this.low = a;
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
        }), h.WordArray = o.extend({
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
          init: function(l, a) {
            l = this.words = l || [], a != r ? this.sigBytes = a : this.sigBytes = l.length * 8;
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
            for (var l = this.words, a = l.length, x = [], d = 0; d < a; d++) {
              var p = l[d];
              x.push(p.high), x.push(p.low);
            }
            return c.create(x, this.sigBytes);
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
            for (var l = o.clone.call(this), a = l.words = this.words.slice(0), x = a.length, d = 0; d < x; d++)
              a[d] = a[d].clone();
            return l;
          }
        });
      }(), e;
    });
  }(te)), te.exports;
}
var ee = { exports: {} }, Qi = ee.exports, Or;
function Ji() {
  return Or || (Or = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(Qi, function(e) {
      return function() {
        if (typeof ArrayBuffer == "function") {
          var r = e, i = r.lib, n = i.WordArray, o = n.init, c = n.init = function(h) {
            if (h instanceof ArrayBuffer && (h = new Uint8Array(h)), (h instanceof Int8Array || typeof Uint8ClampedArray < "u" && h instanceof Uint8ClampedArray || h instanceof Int16Array || h instanceof Uint16Array || h instanceof Int32Array || h instanceof Uint32Array || h instanceof Float32Array || h instanceof Float64Array) && (h = new Uint8Array(h.buffer, h.byteOffset, h.byteLength)), h instanceof Uint8Array) {
              for (var l = h.byteLength, a = [], x = 0; x < l; x++)
                a[x >>> 2] |= h[x] << 24 - x % 4 * 8;
              o.call(this, a, l);
            } else
              o.apply(this, arguments);
          };
          c.prototype = n;
        }
      }(), e.lib.WordArray;
    });
  }(ee)), ee.exports;
}
var re = { exports: {} }, ts = re.exports, Mr;
function es() {
  return Mr || (Mr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(ts, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.WordArray, o = r.enc;
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
          stringify: function(h) {
            for (var l = h.words, a = h.sigBytes, x = [], d = 0; d < a; d += 2) {
              var p = l[d >>> 2] >>> 16 - d % 4 * 8 & 65535;
              x.push(String.fromCharCode(p));
            }
            return x.join("");
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
          parse: function(h) {
            for (var l = h.length, a = [], x = 0; x < l; x++)
              a[x >>> 1] |= h.charCodeAt(x) << 16 - x % 2 * 16;
            return n.create(a, l * 2);
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
          stringify: function(h) {
            for (var l = h.words, a = h.sigBytes, x = [], d = 0; d < a; d += 2) {
              var p = c(l[d >>> 2] >>> 16 - d % 4 * 8 & 65535);
              x.push(String.fromCharCode(p));
            }
            return x.join("");
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
          parse: function(h) {
            for (var l = h.length, a = [], x = 0; x < l; x++)
              a[x >>> 1] |= c(h.charCodeAt(x) << 16 - x % 2 * 16);
            return n.create(a, l * 2);
          }
        };
        function c(h) {
          return h << 8 & 4278255360 | h >>> 8 & 16711935;
        }
      }(), e.enc.Utf16;
    });
  }(re)), re.exports;
}
var ie = { exports: {} }, rs = ie.exports, Wr;
function bt() {
  return Wr || (Wr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(rs, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.WordArray, o = r.enc;
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
          stringify: function(h) {
            var l = h.words, a = h.sigBytes, x = this._map;
            h.clamp();
            for (var d = [], p = 0; p < a; p += 3)
              for (var f = l[p >>> 2] >>> 24 - p % 4 * 8 & 255, _ = l[p + 1 >>> 2] >>> 24 - (p + 1) % 4 * 8 & 255, v = l[p + 2 >>> 2] >>> 24 - (p + 2) % 4 * 8 & 255, m = f << 16 | _ << 8 | v, u = 0; u < 4 && p + u * 0.75 < a; u++)
                d.push(x.charAt(m >>> 6 * (3 - u) & 63));
            var g = x.charAt(64);
            if (g)
              for (; d.length % 4; )
                d.push(g);
            return d.join("");
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
          parse: function(h) {
            var l = h.length, a = this._map, x = this._reverseMap;
            if (!x) {
              x = this._reverseMap = [];
              for (var d = 0; d < a.length; d++)
                x[a.charCodeAt(d)] = d;
            }
            var p = a.charAt(64);
            if (p) {
              var f = h.indexOf(p);
              f !== -1 && (l = f);
            }
            return c(h, l, x);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function c(h, l, a) {
          for (var x = [], d = 0, p = 0; p < l; p++)
            if (p % 4) {
              var f = a[h.charCodeAt(p - 1)] << p % 4 * 2, _ = a[h.charCodeAt(p)] >>> 6 - p % 4 * 2, v = f | _;
              x[d >>> 2] |= v << 24 - d % 4 * 8, d++;
            }
          return n.create(x, d);
        }
      }(), e.enc.Base64;
    });
  }(ie)), ie.exports;
}
var se = { exports: {} }, is = se.exports, Lr;
function ss() {
  return Lr || (Lr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(is, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.WordArray, o = r.enc;
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
          stringify: function(h, l) {
            l === void 0 && (l = !0);
            var a = h.words, x = h.sigBytes, d = l ? this._safe_map : this._map;
            h.clamp();
            for (var p = [], f = 0; f < x; f += 3)
              for (var _ = a[f >>> 2] >>> 24 - f % 4 * 8 & 255, v = a[f + 1 >>> 2] >>> 24 - (f + 1) % 4 * 8 & 255, m = a[f + 2 >>> 2] >>> 24 - (f + 2) % 4 * 8 & 255, u = _ << 16 | v << 8 | m, g = 0; g < 4 && f + g * 0.75 < x; g++)
                p.push(d.charAt(u >>> 6 * (3 - g) & 63));
            var w = d.charAt(64);
            if (w)
              for (; p.length % 4; )
                p.push(w);
            return p.join("");
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
          parse: function(h, l) {
            l === void 0 && (l = !0);
            var a = h.length, x = l ? this._safe_map : this._map, d = this._reverseMap;
            if (!d) {
              d = this._reverseMap = [];
              for (var p = 0; p < x.length; p++)
                d[x.charCodeAt(p)] = p;
            }
            var f = x.charAt(64);
            if (f) {
              var _ = h.indexOf(f);
              _ !== -1 && (a = _);
            }
            return c(h, a, d);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
        };
        function c(h, l, a) {
          for (var x = [], d = 0, p = 0; p < l; p++)
            if (p % 4) {
              var f = a[h.charCodeAt(p - 1)] << p % 4 * 2, _ = a[h.charCodeAt(p)] >>> 6 - p % 4 * 2, v = f | _;
              x[d >>> 2] |= v << 24 - d % 4 * 8, d++;
            }
          return n.create(x, d);
        }
      }(), e.enc.Base64url;
    });
  }(se)), se.exports;
}
var ne = { exports: {} }, ns = ne.exports, Vr;
function yt() {
  return Vr || (Vr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(ns, function(e) {
      return function(r) {
        var i = e, n = i.lib, o = n.WordArray, c = n.Hasher, h = i.algo, l = [];
        (function() {
          for (var _ = 0; _ < 64; _++)
            l[_] = r.abs(r.sin(_ + 1)) * 4294967296 | 0;
        })();
        var a = h.MD5 = c.extend({
          _doReset: function() {
            this._hash = new o.init([
              1732584193,
              4023233417,
              2562383102,
              271733878
            ]);
          },
          _doProcessBlock: function(_, v) {
            for (var m = 0; m < 16; m++) {
              var u = v + m, g = _[u];
              _[u] = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360;
            }
            var w = this._hash.words, b = _[v + 0], E = _[v + 1], A = _[v + 2], D = _[v + 3], k = _[v + 4], y = _[v + 5], B = _[v + 6], H = _[v + 7], T = _[v + 8], F = _[v + 9], S = _[v + 10], $ = _[v + 11], W = _[v + 12], P = _[v + 13], V = _[v + 14], L = _[v + 15], R = w[0], I = w[1], O = w[2], z = w[3];
            R = x(R, I, O, z, b, 7, l[0]), z = x(z, R, I, O, E, 12, l[1]), O = x(O, z, R, I, A, 17, l[2]), I = x(I, O, z, R, D, 22, l[3]), R = x(R, I, O, z, k, 7, l[4]), z = x(z, R, I, O, y, 12, l[5]), O = x(O, z, R, I, B, 17, l[6]), I = x(I, O, z, R, H, 22, l[7]), R = x(R, I, O, z, T, 7, l[8]), z = x(z, R, I, O, F, 12, l[9]), O = x(O, z, R, I, S, 17, l[10]), I = x(I, O, z, R, $, 22, l[11]), R = x(R, I, O, z, W, 7, l[12]), z = x(z, R, I, O, P, 12, l[13]), O = x(O, z, R, I, V, 17, l[14]), I = x(I, O, z, R, L, 22, l[15]), R = d(R, I, O, z, E, 5, l[16]), z = d(z, R, I, O, B, 9, l[17]), O = d(O, z, R, I, $, 14, l[18]), I = d(I, O, z, R, b, 20, l[19]), R = d(R, I, O, z, y, 5, l[20]), z = d(z, R, I, O, S, 9, l[21]), O = d(O, z, R, I, L, 14, l[22]), I = d(I, O, z, R, k, 20, l[23]), R = d(R, I, O, z, F, 5, l[24]), z = d(z, R, I, O, V, 9, l[25]), O = d(O, z, R, I, D, 14, l[26]), I = d(I, O, z, R, T, 20, l[27]), R = d(R, I, O, z, P, 5, l[28]), z = d(z, R, I, O, A, 9, l[29]), O = d(O, z, R, I, H, 14, l[30]), I = d(I, O, z, R, W, 20, l[31]), R = p(R, I, O, z, y, 4, l[32]), z = p(z, R, I, O, T, 11, l[33]), O = p(O, z, R, I, $, 16, l[34]), I = p(I, O, z, R, V, 23, l[35]), R = p(R, I, O, z, E, 4, l[36]), z = p(z, R, I, O, k, 11, l[37]), O = p(O, z, R, I, H, 16, l[38]), I = p(I, O, z, R, S, 23, l[39]), R = p(R, I, O, z, P, 4, l[40]), z = p(z, R, I, O, b, 11, l[41]), O = p(O, z, R, I, D, 16, l[42]), I = p(I, O, z, R, B, 23, l[43]), R = p(R, I, O, z, F, 4, l[44]), z = p(z, R, I, O, W, 11, l[45]), O = p(O, z, R, I, L, 16, l[46]), I = p(I, O, z, R, A, 23, l[47]), R = f(R, I, O, z, b, 6, l[48]), z = f(z, R, I, O, H, 10, l[49]), O = f(O, z, R, I, V, 15, l[50]), I = f(I, O, z, R, y, 21, l[51]), R = f(R, I, O, z, W, 6, l[52]), z = f(z, R, I, O, D, 10, l[53]), O = f(O, z, R, I, S, 15, l[54]), I = f(I, O, z, R, E, 21, l[55]), R = f(R, I, O, z, T, 6, l[56]), z = f(z, R, I, O, L, 10, l[57]), O = f(O, z, R, I, B, 15, l[58]), I = f(I, O, z, R, P, 21, l[59]), R = f(R, I, O, z, k, 6, l[60]), z = f(z, R, I, O, $, 10, l[61]), O = f(O, z, R, I, A, 15, l[62]), I = f(I, O, z, R, F, 21, l[63]), w[0] = w[0] + R | 0, w[1] = w[1] + I | 0, w[2] = w[2] + O | 0, w[3] = w[3] + z | 0;
          },
          _doFinalize: function() {
            var _ = this._data, v = _.words, m = this._nDataBytes * 8, u = _.sigBytes * 8;
            v[u >>> 5] |= 128 << 24 - u % 32;
            var g = r.floor(m / 4294967296), w = m;
            v[(u + 64 >>> 9 << 4) + 15] = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360, v[(u + 64 >>> 9 << 4) + 14] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360, _.sigBytes = (v.length + 1) * 4, this._process();
            for (var b = this._hash, E = b.words, A = 0; A < 4; A++) {
              var D = E[A];
              E[A] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360;
            }
            return b;
          },
          clone: function() {
            var _ = c.clone.call(this);
            return _._hash = this._hash.clone(), _;
          }
        });
        function x(_, v, m, u, g, w, b) {
          var E = _ + (v & m | ~v & u) + g + b;
          return (E << w | E >>> 32 - w) + v;
        }
        function d(_, v, m, u, g, w, b) {
          var E = _ + (v & u | m & ~u) + g + b;
          return (E << w | E >>> 32 - w) + v;
        }
        function p(_, v, m, u, g, w, b) {
          var E = _ + (v ^ m ^ u) + g + b;
          return (E << w | E >>> 32 - w) + v;
        }
        function f(_, v, m, u, g, w, b) {
          var E = _ + (m ^ (v | ~u)) + g + b;
          return (E << w | E >>> 32 - w) + v;
        }
        i.MD5 = c._createHelper(a), i.HmacMD5 = c._createHmacHelper(a);
      }(Math), e.MD5;
    });
  }(ne)), ne.exports;
}
var oe = { exports: {} }, os = oe.exports, qr;
function X0() {
  return qr || (qr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(os, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.WordArray, o = i.Hasher, c = r.algo, h = [], l = c.SHA1 = o.extend({
          _doReset: function() {
            this._hash = new n.init([
              1732584193,
              4023233417,
              2562383102,
              271733878,
              3285377520
            ]);
          },
          _doProcessBlock: function(a, x) {
            for (var d = this._hash.words, p = d[0], f = d[1], _ = d[2], v = d[3], m = d[4], u = 0; u < 80; u++) {
              if (u < 16)
                h[u] = a[x + u] | 0;
              else {
                var g = h[u - 3] ^ h[u - 8] ^ h[u - 14] ^ h[u - 16];
                h[u] = g << 1 | g >>> 31;
              }
              var w = (p << 5 | p >>> 27) + m + h[u];
              u < 20 ? w += (f & _ | ~f & v) + 1518500249 : u < 40 ? w += (f ^ _ ^ v) + 1859775393 : u < 60 ? w += (f & _ | f & v | _ & v) - 1894007588 : w += (f ^ _ ^ v) - 899497514, m = v, v = _, _ = f << 30 | f >>> 2, f = p, p = w;
            }
            d[0] = d[0] + p | 0, d[1] = d[1] + f | 0, d[2] = d[2] + _ | 0, d[3] = d[3] + v | 0, d[4] = d[4] + m | 0;
          },
          _doFinalize: function() {
            var a = this._data, x = a.words, d = this._nDataBytes * 8, p = a.sigBytes * 8;
            return x[p >>> 5] |= 128 << 24 - p % 32, x[(p + 64 >>> 9 << 4) + 14] = Math.floor(d / 4294967296), x[(p + 64 >>> 9 << 4) + 15] = d, a.sigBytes = x.length * 4, this._process(), this._hash;
          },
          clone: function() {
            var a = o.clone.call(this);
            return a._hash = this._hash.clone(), a;
          }
        });
        r.SHA1 = o._createHelper(l), r.HmacSHA1 = o._createHmacHelper(l);
      }(), e.SHA1;
    });
  }(oe)), oe.exports;
}
var ae = { exports: {} }, as = ae.exports, Nr;
function dr() {
  return Nr || (Nr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(as, function(e) {
      return function(r) {
        var i = e, n = i.lib, o = n.WordArray, c = n.Hasher, h = i.algo, l = [], a = [];
        (function() {
          function p(m) {
            for (var u = r.sqrt(m), g = 2; g <= u; g++)
              if (!(m % g))
                return !1;
            return !0;
          }
          function f(m) {
            return (m - (m | 0)) * 4294967296 | 0;
          }
          for (var _ = 2, v = 0; v < 64; )
            p(_) && (v < 8 && (l[v] = f(r.pow(_, 1 / 2))), a[v] = f(r.pow(_, 1 / 3)), v++), _++;
        })();
        var x = [], d = h.SHA256 = c.extend({
          _doReset: function() {
            this._hash = new o.init(l.slice(0));
          },
          _doProcessBlock: function(p, f) {
            for (var _ = this._hash.words, v = _[0], m = _[1], u = _[2], g = _[3], w = _[4], b = _[5], E = _[6], A = _[7], D = 0; D < 64; D++) {
              if (D < 16)
                x[D] = p[f + D] | 0;
              else {
                var k = x[D - 15], y = (k << 25 | k >>> 7) ^ (k << 14 | k >>> 18) ^ k >>> 3, B = x[D - 2], H = (B << 15 | B >>> 17) ^ (B << 13 | B >>> 19) ^ B >>> 10;
                x[D] = y + x[D - 7] + H + x[D - 16];
              }
              var T = w & b ^ ~w & E, F = v & m ^ v & u ^ m & u, S = (v << 30 | v >>> 2) ^ (v << 19 | v >>> 13) ^ (v << 10 | v >>> 22), $ = (w << 26 | w >>> 6) ^ (w << 21 | w >>> 11) ^ (w << 7 | w >>> 25), W = A + $ + T + a[D] + x[D], P = S + F;
              A = E, E = b, b = w, w = g + W | 0, g = u, u = m, m = v, v = W + P | 0;
            }
            _[0] = _[0] + v | 0, _[1] = _[1] + m | 0, _[2] = _[2] + u | 0, _[3] = _[3] + g | 0, _[4] = _[4] + w | 0, _[5] = _[5] + b | 0, _[6] = _[6] + E | 0, _[7] = _[7] + A | 0;
          },
          _doFinalize: function() {
            var p = this._data, f = p.words, _ = this._nDataBytes * 8, v = p.sigBytes * 8;
            return f[v >>> 5] |= 128 << 24 - v % 32, f[(v + 64 >>> 9 << 4) + 14] = r.floor(_ / 4294967296), f[(v + 64 >>> 9 << 4) + 15] = _, p.sigBytes = f.length * 4, this._process(), this._hash;
          },
          clone: function() {
            var p = c.clone.call(this);
            return p._hash = this._hash.clone(), p;
          }
        });
        i.SHA256 = c._createHelper(d), i.HmacSHA256 = c._createHmacHelper(d);
      }(Math), e.SHA256;
    });
  }(ae)), ae.exports;
}
var le = { exports: {} }, ls = le.exports, jr;
function cs() {
  return jr || (jr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), dr());
    })(ls, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.WordArray, o = r.algo, c = o.SHA256, h = o.SHA224 = c.extend({
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
            var l = c._doFinalize.call(this);
            return l.sigBytes -= 4, l;
          }
        });
        r.SHA224 = c._createHelper(h), r.HmacSHA224 = c._createHmacHelper(h);
      }(), e.SHA224;
    });
  }(le)), le.exports;
}
var ce = { exports: {} }, hs = ce.exports, Yr;
function G0() {
  return Yr || (Yr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), Xe());
    })(hs, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.Hasher, o = r.x64, c = o.Word, h = o.WordArray, l = r.algo;
        function a() {
          return c.create.apply(c, arguments);
        }
        var x = [
          a(1116352408, 3609767458),
          a(1899447441, 602891725),
          a(3049323471, 3964484399),
          a(3921009573, 2173295548),
          a(961987163, 4081628472),
          a(1508970993, 3053834265),
          a(2453635748, 2937671579),
          a(2870763221, 3664609560),
          a(3624381080, 2734883394),
          a(310598401, 1164996542),
          a(607225278, 1323610764),
          a(1426881987, 3590304994),
          a(1925078388, 4068182383),
          a(2162078206, 991336113),
          a(2614888103, 633803317),
          a(3248222580, 3479774868),
          a(3835390401, 2666613458),
          a(4022224774, 944711139),
          a(264347078, 2341262773),
          a(604807628, 2007800933),
          a(770255983, 1495990901),
          a(1249150122, 1856431235),
          a(1555081692, 3175218132),
          a(1996064986, 2198950837),
          a(2554220882, 3999719339),
          a(2821834349, 766784016),
          a(2952996808, 2566594879),
          a(3210313671, 3203337956),
          a(3336571891, 1034457026),
          a(3584528711, 2466948901),
          a(113926993, 3758326383),
          a(338241895, 168717936),
          a(666307205, 1188179964),
          a(773529912, 1546045734),
          a(1294757372, 1522805485),
          a(1396182291, 2643833823),
          a(1695183700, 2343527390),
          a(1986661051, 1014477480),
          a(2177026350, 1206759142),
          a(2456956037, 344077627),
          a(2730485921, 1290863460),
          a(2820302411, 3158454273),
          a(3259730800, 3505952657),
          a(3345764771, 106217008),
          a(3516065817, 3606008344),
          a(3600352804, 1432725776),
          a(4094571909, 1467031594),
          a(275423344, 851169720),
          a(430227734, 3100823752),
          a(506948616, 1363258195),
          a(659060556, 3750685593),
          a(883997877, 3785050280),
          a(958139571, 3318307427),
          a(1322822218, 3812723403),
          a(1537002063, 2003034995),
          a(1747873779, 3602036899),
          a(1955562222, 1575990012),
          a(2024104815, 1125592928),
          a(2227730452, 2716904306),
          a(2361852424, 442776044),
          a(2428436474, 593698344),
          a(2756734187, 3733110249),
          a(3204031479, 2999351573),
          a(3329325298, 3815920427),
          a(3391569614, 3928383900),
          a(3515267271, 566280711),
          a(3940187606, 3454069534),
          a(4118630271, 4000239992),
          a(116418474, 1914138554),
          a(174292421, 2731055270),
          a(289380356, 3203993006),
          a(460393269, 320620315),
          a(685471733, 587496836),
          a(852142971, 1086792851),
          a(1017036298, 365543100),
          a(1126000580, 2618297676),
          a(1288033470, 3409855158),
          a(1501505948, 4234509866),
          a(1607167915, 987167468),
          a(1816402316, 1246189591)
        ], d = [];
        (function() {
          for (var f = 0; f < 80; f++)
            d[f] = a();
        })();
        var p = l.SHA512 = n.extend({
          _doReset: function() {
            this._hash = new h.init([
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
          _doProcessBlock: function(f, _) {
            for (var v = this._hash.words, m = v[0], u = v[1], g = v[2], w = v[3], b = v[4], E = v[5], A = v[6], D = v[7], k = m.high, y = m.low, B = u.high, H = u.low, T = g.high, F = g.low, S = w.high, $ = w.low, W = b.high, P = b.low, V = E.high, L = E.low, R = A.high, I = A.low, O = D.high, z = D.low, Y = k, X = y, G = B, N = H, it = T, Z = F, ot = S, ct = $, tt = W, st = P, Kt = V, Pt = L, Xt = R, It = I, Qe = O, zt = z, ht = 0; ht < 80; ht++) {
              var at, ut, Gt = d[ht];
              if (ht < 16)
                ut = Gt.high = f[_ + ht * 2] | 0, at = Gt.low = f[_ + ht * 2 + 1] | 0;
              else {
                var _r = d[ht - 15], Bt = _r.high, Ot = _r.low, oi = (Bt >>> 1 | Ot << 31) ^ (Bt >>> 8 | Ot << 24) ^ Bt >>> 7, vr = (Ot >>> 1 | Bt << 31) ^ (Ot >>> 8 | Bt << 24) ^ (Ot >>> 7 | Bt << 25), gr = d[ht - 2], At = gr.high, Mt = gr.low, ai = (At >>> 19 | Mt << 13) ^ (At << 3 | Mt >>> 29) ^ At >>> 6, Cr = (Mt >>> 19 | At << 13) ^ (Mt << 3 | At >>> 29) ^ (Mt >>> 6 | At << 26), wr = d[ht - 7], li = wr.high, ci = wr.low, mr = d[ht - 16], hi = mr.high, br = mr.low;
                at = vr + ci, ut = oi + li + (at >>> 0 < vr >>> 0 ? 1 : 0), at = at + Cr, ut = ut + ai + (at >>> 0 < Cr >>> 0 ? 1 : 0), at = at + br, ut = ut + hi + (at >>> 0 < br >>> 0 ? 1 : 0), Gt.high = ut, Gt.low = at;
              }
              var fi = tt & Kt ^ ~tt & Xt, yr = st & Pt ^ ~st & It, di = Y & G ^ Y & it ^ G & it, xi = X & N ^ X & Z ^ N & Z, ui = (Y >>> 28 | X << 4) ^ (Y << 30 | X >>> 2) ^ (Y << 25 | X >>> 7), Er = (X >>> 28 | Y << 4) ^ (X << 30 | Y >>> 2) ^ (X << 25 | Y >>> 7), pi = (tt >>> 14 | st << 18) ^ (tt >>> 18 | st << 14) ^ (tt << 23 | st >>> 9), _i = (st >>> 14 | tt << 18) ^ (st >>> 18 | tt << 14) ^ (st << 23 | tt >>> 9), Br = x[ht], vi = Br.high, Ar = Br.low, nt = zt + _i, pt = Qe + pi + (nt >>> 0 < zt >>> 0 ? 1 : 0), nt = nt + yr, pt = pt + fi + (nt >>> 0 < yr >>> 0 ? 1 : 0), nt = nt + Ar, pt = pt + vi + (nt >>> 0 < Ar >>> 0 ? 1 : 0), nt = nt + at, pt = pt + ut + (nt >>> 0 < at >>> 0 ? 1 : 0), Dr = Er + xi, gi = ui + di + (Dr >>> 0 < Er >>> 0 ? 1 : 0);
              Qe = Xt, zt = It, Xt = Kt, It = Pt, Kt = tt, Pt = st, st = ct + nt | 0, tt = ot + pt + (st >>> 0 < ct >>> 0 ? 1 : 0) | 0, ot = it, ct = Z, it = G, Z = N, G = Y, N = X, X = nt + Dr | 0, Y = pt + gi + (X >>> 0 < nt >>> 0 ? 1 : 0) | 0;
            }
            y = m.low = y + X, m.high = k + Y + (y >>> 0 < X >>> 0 ? 1 : 0), H = u.low = H + N, u.high = B + G + (H >>> 0 < N >>> 0 ? 1 : 0), F = g.low = F + Z, g.high = T + it + (F >>> 0 < Z >>> 0 ? 1 : 0), $ = w.low = $ + ct, w.high = S + ot + ($ >>> 0 < ct >>> 0 ? 1 : 0), P = b.low = P + st, b.high = W + tt + (P >>> 0 < st >>> 0 ? 1 : 0), L = E.low = L + Pt, E.high = V + Kt + (L >>> 0 < Pt >>> 0 ? 1 : 0), I = A.low = I + It, A.high = R + Xt + (I >>> 0 < It >>> 0 ? 1 : 0), z = D.low = z + zt, D.high = O + Qe + (z >>> 0 < zt >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var f = this._data, _ = f.words, v = this._nDataBytes * 8, m = f.sigBytes * 8;
            _[m >>> 5] |= 128 << 24 - m % 32, _[(m + 128 >>> 10 << 5) + 30] = Math.floor(v / 4294967296), _[(m + 128 >>> 10 << 5) + 31] = v, f.sigBytes = _.length * 4, this._process();
            var u = this._hash.toX32();
            return u;
          },
          clone: function() {
            var f = n.clone.call(this);
            return f._hash = this._hash.clone(), f;
          },
          blockSize: 1024 / 32
        });
        r.SHA512 = n._createHelper(p), r.HmacSHA512 = n._createHmacHelper(p);
      }(), e.SHA512;
    });
  }(ce)), ce.exports;
}
var he = { exports: {} }, fs = he.exports, Ur;
function ds() {
  return Ur || (Ur = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), Xe(), G0());
    })(fs, function(e) {
      return function() {
        var r = e, i = r.x64, n = i.Word, o = i.WordArray, c = r.algo, h = c.SHA512, l = c.SHA384 = h.extend({
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
            var a = h._doFinalize.call(this);
            return a.sigBytes -= 16, a;
          }
        });
        r.SHA384 = h._createHelper(l), r.HmacSHA384 = h._createHmacHelper(l);
      }(), e.SHA384;
    });
  }(he)), he.exports;
}
var fe = { exports: {} }, xs = fe.exports, Kr;
function us() {
  return Kr || (Kr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), Xe());
    })(xs, function(e) {
      return function(r) {
        var i = e, n = i.lib, o = n.WordArray, c = n.Hasher, h = i.x64, l = h.Word, a = i.algo, x = [], d = [], p = [];
        (function() {
          for (var v = 1, m = 0, u = 0; u < 24; u++) {
            x[v + 5 * m] = (u + 1) * (u + 2) / 2 % 64;
            var g = m % 5, w = (2 * v + 3 * m) % 5;
            v = g, m = w;
          }
          for (var v = 0; v < 5; v++)
            for (var m = 0; m < 5; m++)
              d[v + 5 * m] = m + (2 * v + 3 * m) % 5 * 5;
          for (var b = 1, E = 0; E < 24; E++) {
            for (var A = 0, D = 0, k = 0; k < 7; k++) {
              if (b & 1) {
                var y = (1 << k) - 1;
                y < 32 ? D ^= 1 << y : A ^= 1 << y - 32;
              }
              b & 128 ? b = b << 1 ^ 113 : b <<= 1;
            }
            p[E] = l.create(A, D);
          }
        })();
        var f = [];
        (function() {
          for (var v = 0; v < 25; v++)
            f[v] = l.create();
        })();
        var _ = a.SHA3 = c.extend({
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
            for (var v = this._state = [], m = 0; m < 25; m++)
              v[m] = new l.init();
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          },
          _doProcessBlock: function(v, m) {
            for (var u = this._state, g = this.blockSize / 2, w = 0; w < g; w++) {
              var b = v[m + 2 * w], E = v[m + 2 * w + 1];
              b = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360, E = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360;
              var A = u[w];
              A.high ^= E, A.low ^= b;
            }
            for (var D = 0; D < 24; D++) {
              for (var k = 0; k < 5; k++) {
                for (var y = 0, B = 0, H = 0; H < 5; H++) {
                  var A = u[k + 5 * H];
                  y ^= A.high, B ^= A.low;
                }
                var T = f[k];
                T.high = y, T.low = B;
              }
              for (var k = 0; k < 5; k++)
                for (var F = f[(k + 4) % 5], S = f[(k + 1) % 5], $ = S.high, W = S.low, y = F.high ^ ($ << 1 | W >>> 31), B = F.low ^ (W << 1 | $ >>> 31), H = 0; H < 5; H++) {
                  var A = u[k + 5 * H];
                  A.high ^= y, A.low ^= B;
                }
              for (var P = 1; P < 25; P++) {
                var y, B, A = u[P], V = A.high, L = A.low, R = x[P];
                R < 32 ? (y = V << R | L >>> 32 - R, B = L << R | V >>> 32 - R) : (y = L << R - 32 | V >>> 64 - R, B = V << R - 32 | L >>> 64 - R);
                var I = f[d[P]];
                I.high = y, I.low = B;
              }
              var O = f[0], z = u[0];
              O.high = z.high, O.low = z.low;
              for (var k = 0; k < 5; k++)
                for (var H = 0; H < 5; H++) {
                  var P = k + 5 * H, A = u[P], Y = f[P], X = f[(k + 1) % 5 + 5 * H], G = f[(k + 2) % 5 + 5 * H];
                  A.high = Y.high ^ ~X.high & G.high, A.low = Y.low ^ ~X.low & G.low;
                }
              var A = u[0], N = p[D];
              A.high ^= N.high, A.low ^= N.low;
            }
          },
          _doFinalize: function() {
            var v = this._data, m = v.words;
            this._nDataBytes * 8;
            var u = v.sigBytes * 8, g = this.blockSize * 32;
            m[u >>> 5] |= 1 << 24 - u % 32, m[(r.ceil((u + 1) / g) * g >>> 5) - 1] |= 128, v.sigBytes = m.length * 4, this._process();
            for (var w = this._state, b = this.cfg.outputLength / 8, E = b / 8, A = [], D = 0; D < E; D++) {
              var k = w[D], y = k.high, B = k.low;
              y = (y << 8 | y >>> 24) & 16711935 | (y << 24 | y >>> 8) & 4278255360, B = (B << 8 | B >>> 24) & 16711935 | (B << 24 | B >>> 8) & 4278255360, A.push(B), A.push(y);
            }
            return new o.init(A, b);
          },
          clone: function() {
            for (var v = c.clone.call(this), m = v._state = this._state.slice(0), u = 0; u < 25; u++)
              m[u] = m[u].clone();
            return v;
          }
        });
        i.SHA3 = c._createHelper(_), i.HmacSHA3 = c._createHmacHelper(_);
      }(Math), e.SHA3;
    });
  }(fe)), fe.exports;
}
var de = { exports: {} }, ps = de.exports, Xr;
function _s() {
  return Xr || (Xr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(ps, function(e) {
      /** @preserve
      			(c) 2012 by Cédric Mesnil. All rights reserved.
      
      			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
      
      			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
      			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
      
      			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
      			*/
      return function(r) {
        var i = e, n = i.lib, o = n.WordArray, c = n.Hasher, h = i.algo, l = o.create([
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
        ]), a = o.create([
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
        ]), x = o.create([
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
        ]), d = o.create([
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
        ]), p = o.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), f = o.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), _ = h.RIPEMD160 = c.extend({
          _doReset: function() {
            this._hash = o.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          },
          _doProcessBlock: function(E, A) {
            for (var D = 0; D < 16; D++) {
              var k = A + D, y = E[k];
              E[k] = (y << 8 | y >>> 24) & 16711935 | (y << 24 | y >>> 8) & 4278255360;
            }
            var B = this._hash.words, H = p.words, T = f.words, F = l.words, S = a.words, $ = x.words, W = d.words, P, V, L, R, I, O, z, Y, X, G;
            O = P = B[0], z = V = B[1], Y = L = B[2], X = R = B[3], G = I = B[4];
            for (var N, D = 0; D < 80; D += 1)
              N = P + E[A + F[D]] | 0, D < 16 ? N += v(V, L, R) + H[0] : D < 32 ? N += m(V, L, R) + H[1] : D < 48 ? N += u(V, L, R) + H[2] : D < 64 ? N += g(V, L, R) + H[3] : N += w(V, L, R) + H[4], N = N | 0, N = b(N, $[D]), N = N + I | 0, P = I, I = R, R = b(L, 10), L = V, V = N, N = O + E[A + S[D]] | 0, D < 16 ? N += w(z, Y, X) + T[0] : D < 32 ? N += g(z, Y, X) + T[1] : D < 48 ? N += u(z, Y, X) + T[2] : D < 64 ? N += m(z, Y, X) + T[3] : N += v(z, Y, X) + T[4], N = N | 0, N = b(N, W[D]), N = N + G | 0, O = G, G = X, X = b(Y, 10), Y = z, z = N;
            N = B[1] + L + X | 0, B[1] = B[2] + R + G | 0, B[2] = B[3] + I + O | 0, B[3] = B[4] + P + z | 0, B[4] = B[0] + V + Y | 0, B[0] = N;
          },
          _doFinalize: function() {
            var E = this._data, A = E.words, D = this._nDataBytes * 8, k = E.sigBytes * 8;
            A[k >>> 5] |= 128 << 24 - k % 32, A[(k + 64 >>> 9 << 4) + 14] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360, E.sigBytes = (A.length + 1) * 4, this._process();
            for (var y = this._hash, B = y.words, H = 0; H < 5; H++) {
              var T = B[H];
              B[H] = (T << 8 | T >>> 24) & 16711935 | (T << 24 | T >>> 8) & 4278255360;
            }
            return y;
          },
          clone: function() {
            var E = c.clone.call(this);
            return E._hash = this._hash.clone(), E;
          }
        });
        function v(E, A, D) {
          return E ^ A ^ D;
        }
        function m(E, A, D) {
          return E & A | ~E & D;
        }
        function u(E, A, D) {
          return (E | ~A) ^ D;
        }
        function g(E, A, D) {
          return E & D | A & ~D;
        }
        function w(E, A, D) {
          return E ^ (A | ~D);
        }
        function b(E, A) {
          return E << A | E >>> 32 - A;
        }
        i.RIPEMD160 = c._createHelper(_), i.HmacRIPEMD160 = c._createHmacHelper(_);
      }(), e.RIPEMD160;
    });
  }(de)), de.exports;
}
var xe = { exports: {} }, vs = xe.exports, Gr;
function xr() {
  return Gr || (Gr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(vs, function(e) {
      (function() {
        var r = e, i = r.lib, n = i.Base, o = r.enc, c = o.Utf8, h = r.algo;
        h.HMAC = n.extend({
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
          init: function(l, a) {
            l = this._hasher = new l.init(), typeof a == "string" && (a = c.parse(a));
            var x = l.blockSize, d = x * 4;
            a.sigBytes > d && (a = l.finalize(a)), a.clamp();
            for (var p = this._oKey = a.clone(), f = this._iKey = a.clone(), _ = p.words, v = f.words, m = 0; m < x; m++)
              _[m] ^= 1549556828, v[m] ^= 909522486;
            p.sigBytes = f.sigBytes = d, this.reset();
          },
          /**
           * Resets this HMAC to its initial state.
           *
           * @example
           *
           *     hmacHasher.reset();
           */
          reset: function() {
            var l = this._hasher;
            l.reset(), l.update(this._iKey);
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
          update: function(l) {
            return this._hasher.update(l), this;
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
          finalize: function(l) {
            var a = this._hasher, x = a.finalize(l);
            a.reset();
            var d = a.finalize(this._oKey.clone().concat(x));
            return d;
          }
        });
      })();
    });
  }(xe)), xe.exports;
}
var ue = { exports: {} }, gs = ue.exports, Zr;
function Cs() {
  return Zr || (Zr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), dr(), xr());
    })(gs, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.Base, o = i.WordArray, c = r.algo, h = c.SHA256, l = c.HMAC, a = c.PBKDF2 = n.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hasher to use. Default: SHA256
           * @property {number} iterations The number of iterations to perform. Default: 250000
           */
          cfg: n.extend({
            keySize: 128 / 32,
            hasher: h,
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
          init: function(x) {
            this.cfg = this.cfg.extend(x);
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
          compute: function(x, d) {
            for (var p = this.cfg, f = l.create(p.hasher, x), _ = o.create(), v = o.create([1]), m = _.words, u = v.words, g = p.keySize, w = p.iterations; m.length < g; ) {
              var b = f.update(d).finalize(v);
              f.reset();
              for (var E = b.words, A = E.length, D = b, k = 1; k < w; k++) {
                D = f.finalize(D), f.reset();
                for (var y = D.words, B = 0; B < A; B++)
                  E[B] ^= y[B];
              }
              _.concat(b), u[0]++;
            }
            return _.sigBytes = g * 4, _;
          }
        });
        r.PBKDF2 = function(x, d, p) {
          return a.create(p).compute(x, d);
        };
      }(), e.PBKDF2;
    });
  }(ue)), ue.exports;
}
var pe = { exports: {} }, ws = pe.exports, Qr;
function gt() {
  return Qr || (Qr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), X0(), xr());
    })(ws, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.Base, o = i.WordArray, c = r.algo, h = c.MD5, l = c.EvpKDF = n.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hash algorithm to use. Default: MD5
           * @property {number} iterations The number of iterations to perform. Default: 1
           */
          cfg: n.extend({
            keySize: 128 / 32,
            hasher: h,
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
          init: function(a) {
            this.cfg = this.cfg.extend(a);
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
          compute: function(a, x) {
            for (var d, p = this.cfg, f = p.hasher.create(), _ = o.create(), v = _.words, m = p.keySize, u = p.iterations; v.length < m; ) {
              d && f.update(d), d = f.update(a).finalize(x), f.reset();
              for (var g = 1; g < u; g++)
                d = f.finalize(d), f.reset();
              _.concat(d);
            }
            return _.sigBytes = m * 4, _;
          }
        });
        r.EvpKDF = function(a, x, d) {
          return l.create(d).compute(a, x);
        };
      }(), e.EvpKDF;
    });
  }(pe)), pe.exports;
}
var _e = { exports: {} }, ms = _e.exports, Jr;
function J() {
  return Jr || (Jr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), gt());
    })(ms, function(e) {
      e.lib.Cipher || function(r) {
        var i = e, n = i.lib, o = n.Base, c = n.WordArray, h = n.BufferedBlockAlgorithm, l = i.enc;
        l.Utf8;
        var a = l.Base64, x = i.algo, d = x.EvpKDF, p = n.Cipher = h.extend({
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
          createEncryptor: function(y, B) {
            return this.create(this._ENC_XFORM_MODE, y, B);
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
          createDecryptor: function(y, B) {
            return this.create(this._DEC_XFORM_MODE, y, B);
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
          init: function(y, B, H) {
            this.cfg = this.cfg.extend(H), this._xformMode = y, this._key = B, this.reset();
          },
          /**
           * Resets this cipher to its initial state.
           *
           * @example
           *
           *     cipher.reset();
           */
          reset: function() {
            h.reset.call(this), this._doReset();
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
            var B = this._doFinalize();
            return B;
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
            function y(B) {
              return typeof B == "string" ? k : E;
            }
            return function(B) {
              return {
                encrypt: function(H, T, F) {
                  return y(T).encrypt(B, H, T, F);
                },
                decrypt: function(H, T, F) {
                  return y(T).decrypt(B, H, T, F);
                }
              };
            };
          }()
        });
        n.StreamCipher = p.extend({
          _doFinalize: function() {
            var y = this._process(!0);
            return y;
          },
          blockSize: 1
        });
        var f = i.mode = {}, _ = n.BlockCipherMode = o.extend({
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
          createEncryptor: function(y, B) {
            return this.Encryptor.create(y, B);
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
          createDecryptor: function(y, B) {
            return this.Decryptor.create(y, B);
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
          init: function(y, B) {
            this._cipher = y, this._iv = B;
          }
        }), v = f.CBC = function() {
          var y = _.extend();
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
            processBlock: function(H, T) {
              var F = this._cipher, S = F.blockSize;
              B.call(this, H, T, S), F.encryptBlock(H, T), this._prevBlock = H.slice(T, T + S);
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
            processBlock: function(H, T) {
              var F = this._cipher, S = F.blockSize, $ = H.slice(T, T + S);
              F.decryptBlock(H, T), B.call(this, H, T, S), this._prevBlock = $;
            }
          });
          function B(H, T, F) {
            var S, $ = this._iv;
            $ ? (S = $, this._iv = r) : S = this._prevBlock;
            for (var W = 0; W < F; W++)
              H[T + W] ^= S[W];
          }
          return y;
        }(), m = i.pad = {}, u = m.Pkcs7 = {
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
          pad: function(y, B) {
            for (var H = B * 4, T = H - y.sigBytes % H, F = T << 24 | T << 16 | T << 8 | T, S = [], $ = 0; $ < T; $ += 4)
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
            var B = y.words[y.sigBytes - 1 >>> 2] & 255;
            y.sigBytes -= B;
          }
        };
        n.BlockCipher = p.extend({
          /**
           * Configuration options.
           *
           * @property {Mode} mode The block mode to use. Default: CBC
           * @property {Padding} padding The padding strategy to use. Default: Pkcs7
           */
          cfg: p.cfg.extend({
            mode: v,
            padding: u
          }),
          reset: function() {
            var y;
            p.reset.call(this);
            var B = this.cfg, H = B.iv, T = B.mode;
            this._xformMode == this._ENC_XFORM_MODE ? y = T.createEncryptor : (y = T.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == y ? this._mode.init(this, H && H.words) : (this._mode = y.call(T, this, H && H.words), this._mode.__creator = y);
          },
          _doProcessBlock: function(y, B) {
            this._mode.processBlock(y, B);
          },
          _doFinalize: function() {
            var y, B = this.cfg.padding;
            return this._xformMode == this._ENC_XFORM_MODE ? (B.pad(this._data, this.blockSize), y = this._process(!0)) : (y = this._process(!0), B.unpad(y)), y;
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
        }), w = i.format = {}, b = w.OpenSSL = {
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
            var B, H = y.ciphertext, T = y.salt;
            return T ? B = c.create([1398893684, 1701076831]).concat(T).concat(H) : B = H, B.toString(a);
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
            var B, H = a.parse(y), T = H.words;
            return T[0] == 1398893684 && T[1] == 1701076831 && (B = c.create(T.slice(2, 4)), T.splice(0, 4), H.sigBytes -= 16), g.create({ ciphertext: H, salt: B });
          }
        }, E = n.SerializableCipher = o.extend({
          /**
           * Configuration options.
           *
           * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
           */
          cfg: o.extend({
            format: b
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
          encrypt: function(y, B, H, T) {
            T = this.cfg.extend(T);
            var F = y.createEncryptor(H, T), S = F.finalize(B), $ = F.cfg;
            return g.create({
              ciphertext: S,
              key: H,
              iv: $.iv,
              algorithm: y,
              mode: $.mode,
              padding: $.padding,
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
          decrypt: function(y, B, H, T) {
            T = this.cfg.extend(T), B = this._parse(B, T.format);
            var F = y.createDecryptor(H, T).finalize(B.ciphertext);
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
          _parse: function(y, B) {
            return typeof y == "string" ? B.parse(y, this) : y;
          }
        }), A = i.kdf = {}, D = A.OpenSSL = {
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
          execute: function(y, B, H, T, F) {
            if (T || (T = c.random(64 / 8)), F)
              var S = d.create({ keySize: B + H, hasher: F }).compute(y, T);
            else
              var S = d.create({ keySize: B + H }).compute(y, T);
            var $ = c.create(S.words.slice(B), H * 4);
            return S.sigBytes = B * 4, g.create({ key: S, iv: $, salt: T });
          }
        }, k = n.PasswordBasedCipher = E.extend({
          /**
           * Configuration options.
           *
           * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
           */
          cfg: E.cfg.extend({
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
          encrypt: function(y, B, H, T) {
            T = this.cfg.extend(T);
            var F = T.kdf.execute(H, y.keySize, y.ivSize, T.salt, T.hasher);
            T.iv = F.iv;
            var S = E.encrypt.call(this, y, B, F.key, T);
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
          decrypt: function(y, B, H, T) {
            T = this.cfg.extend(T), B = this._parse(B, T.format);
            var F = T.kdf.execute(H, y.keySize, y.ivSize, B.salt, T.hasher);
            T.iv = F.iv;
            var S = E.decrypt.call(this, y, B, F.key, T);
            return S;
          }
        });
      }();
    });
  }(_e)), _e.exports;
}
var ve = { exports: {} }, bs = ve.exports, t0;
function ys() {
  return t0 || (t0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), J());
    })(bs, function(e) {
      return e.mode.CFB = function() {
        var r = e.lib.BlockCipherMode.extend();
        r.Encryptor = r.extend({
          processBlock: function(n, o) {
            var c = this._cipher, h = c.blockSize;
            i.call(this, n, o, h, c), this._prevBlock = n.slice(o, o + h);
          }
        }), r.Decryptor = r.extend({
          processBlock: function(n, o) {
            var c = this._cipher, h = c.blockSize, l = n.slice(o, o + h);
            i.call(this, n, o, h, c), this._prevBlock = l;
          }
        });
        function i(n, o, c, h) {
          var l, a = this._iv;
          a ? (l = a.slice(0), this._iv = void 0) : l = this._prevBlock, h.encryptBlock(l, 0);
          for (var x = 0; x < c; x++)
            n[o + x] ^= l[x];
        }
        return r;
      }(), e.mode.CFB;
    });
  }(ve)), ve.exports;
}
var ge = { exports: {} }, Es = ge.exports, e0;
function Bs() {
  return e0 || (e0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), J());
    })(Es, function(e) {
      return e.mode.CTR = function() {
        var r = e.lib.BlockCipherMode.extend(), i = r.Encryptor = r.extend({
          processBlock: function(n, o) {
            var c = this._cipher, h = c.blockSize, l = this._iv, a = this._counter;
            l && (a = this._counter = l.slice(0), this._iv = void 0);
            var x = a.slice(0);
            c.encryptBlock(x, 0), a[h - 1] = a[h - 1] + 1 | 0;
            for (var d = 0; d < h; d++)
              n[o + d] ^= x[d];
          }
        });
        return r.Decryptor = i, r;
      }(), e.mode.CTR;
    });
  }(ge)), ge.exports;
}
var Ce = { exports: {} }, As = Ce.exports, r0;
function Ds() {
  return r0 || (r0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), J());
    })(As, function(e) {
      /** @preserve
       * Counter block mode compatible with  Dr Brian Gladman fileenc.c
       * derived from CryptoJS.mode.CTR
       * Jan Hruby jhruby.web@gmail.com
       */
      return e.mode.CTRGladman = function() {
        var r = e.lib.BlockCipherMode.extend();
        function i(c) {
          if ((c >> 24 & 255) === 255) {
            var h = c >> 16 & 255, l = c >> 8 & 255, a = c & 255;
            h === 255 ? (h = 0, l === 255 ? (l = 0, a === 255 ? a = 0 : ++a) : ++l) : ++h, c = 0, c += h << 16, c += l << 8, c += a;
          } else
            c += 1 << 24;
          return c;
        }
        function n(c) {
          return (c[0] = i(c[0])) === 0 && (c[1] = i(c[1])), c;
        }
        var o = r.Encryptor = r.extend({
          processBlock: function(c, h) {
            var l = this._cipher, a = l.blockSize, x = this._iv, d = this._counter;
            x && (d = this._counter = x.slice(0), this._iv = void 0), n(d);
            var p = d.slice(0);
            l.encryptBlock(p, 0);
            for (var f = 0; f < a; f++)
              c[h + f] ^= p[f];
          }
        });
        return r.Decryptor = o, r;
      }(), e.mode.CTRGladman;
    });
  }(Ce)), Ce.exports;
}
var we = { exports: {} }, Fs = we.exports, i0;
function Rs() {
  return i0 || (i0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), J());
    })(Fs, function(e) {
      return e.mode.OFB = function() {
        var r = e.lib.BlockCipherMode.extend(), i = r.Encryptor = r.extend({
          processBlock: function(n, o) {
            var c = this._cipher, h = c.blockSize, l = this._iv, a = this._keystream;
            l && (a = this._keystream = l.slice(0), this._iv = void 0), c.encryptBlock(a, 0);
            for (var x = 0; x < h; x++)
              n[o + x] ^= a[x];
          }
        });
        return r.Decryptor = i, r;
      }(), e.mode.OFB;
    });
  }(we)), we.exports;
}
var me = { exports: {} }, Ss = me.exports, s0;
function ks() {
  return s0 || (s0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), J());
    })(Ss, function(e) {
      return e.mode.ECB = function() {
        var r = e.lib.BlockCipherMode.extend();
        return r.Encryptor = r.extend({
          processBlock: function(i, n) {
            this._cipher.encryptBlock(i, n);
          }
        }), r.Decryptor = r.extend({
          processBlock: function(i, n) {
            this._cipher.decryptBlock(i, n);
          }
        }), r;
      }(), e.mode.ECB;
    });
  }(me)), me.exports;
}
var be = { exports: {} }, $s = be.exports, n0;
function Hs() {
  return n0 || (n0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), J());
    })($s, function(e) {
      return e.pad.AnsiX923 = {
        pad: function(r, i) {
          var n = r.sigBytes, o = i * 4, c = o - n % o, h = n + c - 1;
          r.clamp(), r.words[h >>> 2] |= c << 24 - h % 4 * 8, r.sigBytes += c;
        },
        unpad: function(r) {
          var i = r.words[r.sigBytes - 1 >>> 2] & 255;
          r.sigBytes -= i;
        }
      }, e.pad.Ansix923;
    });
  }(be)), be.exports;
}
var ye = { exports: {} }, Ts = ye.exports, o0;
function Ps() {
  return o0 || (o0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), J());
    })(Ts, function(e) {
      return e.pad.Iso10126 = {
        pad: function(r, i) {
          var n = i * 4, o = n - r.sigBytes % n;
          r.concat(e.lib.WordArray.random(o - 1)).concat(e.lib.WordArray.create([o << 24], 1));
        },
        unpad: function(r) {
          var i = r.words[r.sigBytes - 1 >>> 2] & 255;
          r.sigBytes -= i;
        }
      }, e.pad.Iso10126;
    });
  }(ye)), ye.exports;
}
var Ee = { exports: {} }, Is = Ee.exports, a0;
function zs() {
  return a0 || (a0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), J());
    })(Is, function(e) {
      return e.pad.Iso97971 = {
        pad: function(r, i) {
          r.concat(e.lib.WordArray.create([2147483648], 1)), e.pad.ZeroPadding.pad(r, i);
        },
        unpad: function(r) {
          e.pad.ZeroPadding.unpad(r), r.sigBytes--;
        }
      }, e.pad.Iso97971;
    });
  }(Ee)), Ee.exports;
}
var Be = { exports: {} }, Os = Be.exports, l0;
function Ms() {
  return l0 || (l0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), J());
    })(Os, function(e) {
      return e.pad.ZeroPadding = {
        pad: function(r, i) {
          var n = i * 4;
          r.clamp(), r.sigBytes += n - (r.sigBytes % n || n);
        },
        unpad: function(r) {
          for (var i = r.words, n = r.sigBytes - 1, n = r.sigBytes - 1; n >= 0; n--)
            if (i[n >>> 2] >>> 24 - n % 4 * 8 & 255) {
              r.sigBytes = n + 1;
              break;
            }
        }
      }, e.pad.ZeroPadding;
    });
  }(Be)), Be.exports;
}
var Ae = { exports: {} }, Ws = Ae.exports, c0;
function Ls() {
  return c0 || (c0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), J());
    })(Ws, function(e) {
      return e.pad.NoPadding = {
        pad: function() {
        },
        unpad: function() {
        }
      }, e.pad.NoPadding;
    });
  }(Ae)), Ae.exports;
}
var De = { exports: {} }, Vs = De.exports, h0;
function qs() {
  return h0 || (h0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), J());
    })(Vs, function(e) {
      return function(r) {
        var i = e, n = i.lib, o = n.CipherParams, c = i.enc, h = c.Hex, l = i.format;
        l.Hex = {
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
          stringify: function(a) {
            return a.ciphertext.toString(h);
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
          parse: function(a) {
            var x = h.parse(a);
            return o.create({ ciphertext: x });
          }
        };
      }(), e.format.Hex;
    });
  }(De)), De.exports;
}
var Fe = { exports: {} }, Ns = Fe.exports, f0;
function js() {
  return f0 || (f0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), bt(), yt(), gt(), J());
    })(Ns, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.BlockCipher, o = r.algo, c = [], h = [], l = [], a = [], x = [], d = [], p = [], f = [], _ = [], v = [];
        (function() {
          for (var g = [], w = 0; w < 256; w++)
            w < 128 ? g[w] = w << 1 : g[w] = w << 1 ^ 283;
          for (var b = 0, E = 0, w = 0; w < 256; w++) {
            var A = E ^ E << 1 ^ E << 2 ^ E << 3 ^ E << 4;
            A = A >>> 8 ^ A & 255 ^ 99, c[b] = A, h[A] = b;
            var D = g[b], k = g[D], y = g[k], B = g[A] * 257 ^ A * 16843008;
            l[b] = B << 24 | B >>> 8, a[b] = B << 16 | B >>> 16, x[b] = B << 8 | B >>> 24, d[b] = B;
            var B = y * 16843009 ^ k * 65537 ^ D * 257 ^ b * 16843008;
            p[A] = B << 24 | B >>> 8, f[A] = B << 16 | B >>> 16, _[A] = B << 8 | B >>> 24, v[A] = B, b ? (b = D ^ g[g[g[y ^ D]]], E ^= g[g[E]]) : b = E = 1;
          }
        })();
        var m = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], u = o.AES = n.extend({
          _doReset: function() {
            var g;
            if (!(this._nRounds && this._keyPriorReset === this._key)) {
              for (var w = this._keyPriorReset = this._key, b = w.words, E = w.sigBytes / 4, A = this._nRounds = E + 6, D = (A + 1) * 4, k = this._keySchedule = [], y = 0; y < D; y++)
                y < E ? k[y] = b[y] : (g = k[y - 1], y % E ? E > 6 && y % E == 4 && (g = c[g >>> 24] << 24 | c[g >>> 16 & 255] << 16 | c[g >>> 8 & 255] << 8 | c[g & 255]) : (g = g << 8 | g >>> 24, g = c[g >>> 24] << 24 | c[g >>> 16 & 255] << 16 | c[g >>> 8 & 255] << 8 | c[g & 255], g ^= m[y / E | 0] << 24), k[y] = k[y - E] ^ g);
              for (var B = this._invKeySchedule = [], H = 0; H < D; H++) {
                var y = D - H;
                if (H % 4)
                  var g = k[y];
                else
                  var g = k[y - 4];
                H < 4 || y <= 4 ? B[H] = g : B[H] = p[c[g >>> 24]] ^ f[c[g >>> 16 & 255]] ^ _[c[g >>> 8 & 255]] ^ v[c[g & 255]];
              }
            }
          },
          encryptBlock: function(g, w) {
            this._doCryptBlock(g, w, this._keySchedule, l, a, x, d, c);
          },
          decryptBlock: function(g, w) {
            var b = g[w + 1];
            g[w + 1] = g[w + 3], g[w + 3] = b, this._doCryptBlock(g, w, this._invKeySchedule, p, f, _, v, h);
            var b = g[w + 1];
            g[w + 1] = g[w + 3], g[w + 3] = b;
          },
          _doCryptBlock: function(g, w, b, E, A, D, k, y) {
            for (var B = this._nRounds, H = g[w] ^ b[0], T = g[w + 1] ^ b[1], F = g[w + 2] ^ b[2], S = g[w + 3] ^ b[3], $ = 4, W = 1; W < B; W++) {
              var P = E[H >>> 24] ^ A[T >>> 16 & 255] ^ D[F >>> 8 & 255] ^ k[S & 255] ^ b[$++], V = E[T >>> 24] ^ A[F >>> 16 & 255] ^ D[S >>> 8 & 255] ^ k[H & 255] ^ b[$++], L = E[F >>> 24] ^ A[S >>> 16 & 255] ^ D[H >>> 8 & 255] ^ k[T & 255] ^ b[$++], R = E[S >>> 24] ^ A[H >>> 16 & 255] ^ D[T >>> 8 & 255] ^ k[F & 255] ^ b[$++];
              H = P, T = V, F = L, S = R;
            }
            var P = (y[H >>> 24] << 24 | y[T >>> 16 & 255] << 16 | y[F >>> 8 & 255] << 8 | y[S & 255]) ^ b[$++], V = (y[T >>> 24] << 24 | y[F >>> 16 & 255] << 16 | y[S >>> 8 & 255] << 8 | y[H & 255]) ^ b[$++], L = (y[F >>> 24] << 24 | y[S >>> 16 & 255] << 16 | y[H >>> 8 & 255] << 8 | y[T & 255]) ^ b[$++], R = (y[S >>> 24] << 24 | y[H >>> 16 & 255] << 16 | y[T >>> 8 & 255] << 8 | y[F & 255]) ^ b[$++];
            g[w] = P, g[w + 1] = V, g[w + 2] = L, g[w + 3] = R;
          },
          keySize: 256 / 32
        });
        r.AES = n._createHelper(u);
      }(), e.AES;
    });
  }(Fe)), Fe.exports;
}
var Re = { exports: {} }, Ys = Re.exports, d0;
function Us() {
  return d0 || (d0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), bt(), yt(), gt(), J());
    })(Ys, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.WordArray, o = i.BlockCipher, c = r.algo, h = [
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
        ], l = [
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
        ], a = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], x = [
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
        ], d = [
          4160749569,
          528482304,
          33030144,
          2064384,
          129024,
          8064,
          504,
          2147483679
        ], p = c.DES = o.extend({
          _doReset: function() {
            for (var m = this._key, u = m.words, g = [], w = 0; w < 56; w++) {
              var b = h[w] - 1;
              g[w] = u[b >>> 5] >>> 31 - b % 32 & 1;
            }
            for (var E = this._subKeys = [], A = 0; A < 16; A++) {
              for (var D = E[A] = [], k = a[A], w = 0; w < 24; w++)
                D[w / 6 | 0] |= g[(l[w] - 1 + k) % 28] << 31 - w % 6, D[4 + (w / 6 | 0)] |= g[28 + (l[w + 24] - 1 + k) % 28] << 31 - w % 6;
              D[0] = D[0] << 1 | D[0] >>> 31;
              for (var w = 1; w < 7; w++)
                D[w] = D[w] >>> (w - 1) * 4 + 3;
              D[7] = D[7] << 5 | D[7] >>> 27;
            }
            for (var y = this._invSubKeys = [], w = 0; w < 16; w++)
              y[w] = E[15 - w];
          },
          encryptBlock: function(m, u) {
            this._doCryptBlock(m, u, this._subKeys);
          },
          decryptBlock: function(m, u) {
            this._doCryptBlock(m, u, this._invSubKeys);
          },
          _doCryptBlock: function(m, u, g) {
            this._lBlock = m[u], this._rBlock = m[u + 1], f.call(this, 4, 252645135), f.call(this, 16, 65535), _.call(this, 2, 858993459), _.call(this, 8, 16711935), f.call(this, 1, 1431655765);
            for (var w = 0; w < 16; w++) {
              for (var b = g[w], E = this._lBlock, A = this._rBlock, D = 0, k = 0; k < 8; k++)
                D |= x[k][((A ^ b[k]) & d[k]) >>> 0];
              this._lBlock = A, this._rBlock = E ^ D;
            }
            var y = this._lBlock;
            this._lBlock = this._rBlock, this._rBlock = y, f.call(this, 1, 1431655765), _.call(this, 8, 16711935), _.call(this, 2, 858993459), f.call(this, 16, 65535), f.call(this, 4, 252645135), m[u] = this._lBlock, m[u + 1] = this._rBlock;
          },
          keySize: 64 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        function f(m, u) {
          var g = (this._lBlock >>> m ^ this._rBlock) & u;
          this._rBlock ^= g, this._lBlock ^= g << m;
        }
        function _(m, u) {
          var g = (this._rBlock >>> m ^ this._lBlock) & u;
          this._lBlock ^= g, this._rBlock ^= g << m;
        }
        r.DES = o._createHelper(p);
        var v = c.TripleDES = o.extend({
          _doReset: function() {
            var m = this._key, u = m.words;
            if (u.length !== 2 && u.length !== 4 && u.length < 6)
              throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            var g = u.slice(0, 2), w = u.length < 4 ? u.slice(0, 2) : u.slice(2, 4), b = u.length < 6 ? u.slice(0, 2) : u.slice(4, 6);
            this._des1 = p.createEncryptor(n.create(g)), this._des2 = p.createEncryptor(n.create(w)), this._des3 = p.createEncryptor(n.create(b));
          },
          encryptBlock: function(m, u) {
            this._des1.encryptBlock(m, u), this._des2.decryptBlock(m, u), this._des3.encryptBlock(m, u);
          },
          decryptBlock: function(m, u) {
            this._des3.decryptBlock(m, u), this._des2.encryptBlock(m, u), this._des1.decryptBlock(m, u);
          },
          keySize: 192 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        r.TripleDES = o._createHelper(v);
      }(), e.TripleDES;
    });
  }(Re)), Re.exports;
}
var Se = { exports: {} }, Ks = Se.exports, x0;
function Xs() {
  return x0 || (x0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), bt(), yt(), gt(), J());
    })(Ks, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.StreamCipher, o = r.algo, c = o.RC4 = n.extend({
          _doReset: function() {
            for (var a = this._key, x = a.words, d = a.sigBytes, p = this._S = [], f = 0; f < 256; f++)
              p[f] = f;
            for (var f = 0, _ = 0; f < 256; f++) {
              var v = f % d, m = x[v >>> 2] >>> 24 - v % 4 * 8 & 255;
              _ = (_ + p[f] + m) % 256;
              var u = p[f];
              p[f] = p[_], p[_] = u;
            }
            this._i = this._j = 0;
          },
          _doProcessBlock: function(a, x) {
            a[x] ^= h.call(this);
          },
          keySize: 256 / 32,
          ivSize: 0
        });
        function h() {
          for (var a = this._S, x = this._i, d = this._j, p = 0, f = 0; f < 4; f++) {
            x = (x + 1) % 256, d = (d + a[x]) % 256;
            var _ = a[x];
            a[x] = a[d], a[d] = _, p |= a[(a[x] + a[d]) % 256] << 24 - f * 8;
          }
          return this._i = x, this._j = d, p;
        }
        r.RC4 = n._createHelper(c);
        var l = o.RC4Drop = c.extend({
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
            for (var a = this.cfg.drop; a > 0; a--)
              h.call(this);
          }
        });
        r.RC4Drop = n._createHelper(l);
      }(), e.RC4;
    });
  }(Se)), Se.exports;
}
var ke = { exports: {} }, Gs = ke.exports, u0;
function Zs() {
  return u0 || (u0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), bt(), yt(), gt(), J());
    })(Gs, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.StreamCipher, o = r.algo, c = [], h = [], l = [], a = o.Rabbit = n.extend({
          _doReset: function() {
            for (var d = this._key.words, p = this.cfg.iv, f = 0; f < 4; f++)
              d[f] = (d[f] << 8 | d[f] >>> 24) & 16711935 | (d[f] << 24 | d[f] >>> 8) & 4278255360;
            var _ = this._X = [
              d[0],
              d[3] << 16 | d[2] >>> 16,
              d[1],
              d[0] << 16 | d[3] >>> 16,
              d[2],
              d[1] << 16 | d[0] >>> 16,
              d[3],
              d[2] << 16 | d[1] >>> 16
            ], v = this._C = [
              d[2] << 16 | d[2] >>> 16,
              d[0] & 4294901760 | d[1] & 65535,
              d[3] << 16 | d[3] >>> 16,
              d[1] & 4294901760 | d[2] & 65535,
              d[0] << 16 | d[0] >>> 16,
              d[2] & 4294901760 | d[3] & 65535,
              d[1] << 16 | d[1] >>> 16,
              d[3] & 4294901760 | d[0] & 65535
            ];
            this._b = 0;
            for (var f = 0; f < 4; f++)
              x.call(this);
            for (var f = 0; f < 8; f++)
              v[f] ^= _[f + 4 & 7];
            if (p) {
              var m = p.words, u = m[0], g = m[1], w = (u << 8 | u >>> 24) & 16711935 | (u << 24 | u >>> 8) & 4278255360, b = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360, E = w >>> 16 | b & 4294901760, A = b << 16 | w & 65535;
              v[0] ^= w, v[1] ^= E, v[2] ^= b, v[3] ^= A, v[4] ^= w, v[5] ^= E, v[6] ^= b, v[7] ^= A;
              for (var f = 0; f < 4; f++)
                x.call(this);
            }
          },
          _doProcessBlock: function(d, p) {
            var f = this._X;
            x.call(this), c[0] = f[0] ^ f[5] >>> 16 ^ f[3] << 16, c[1] = f[2] ^ f[7] >>> 16 ^ f[5] << 16, c[2] = f[4] ^ f[1] >>> 16 ^ f[7] << 16, c[3] = f[6] ^ f[3] >>> 16 ^ f[1] << 16;
            for (var _ = 0; _ < 4; _++)
              c[_] = (c[_] << 8 | c[_] >>> 24) & 16711935 | (c[_] << 24 | c[_] >>> 8) & 4278255360, d[p + _] ^= c[_];
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function x() {
          for (var d = this._X, p = this._C, f = 0; f < 8; f++)
            h[f] = p[f];
          p[0] = p[0] + 1295307597 + this._b | 0, p[1] = p[1] + 3545052371 + (p[0] >>> 0 < h[0] >>> 0 ? 1 : 0) | 0, p[2] = p[2] + 886263092 + (p[1] >>> 0 < h[1] >>> 0 ? 1 : 0) | 0, p[3] = p[3] + 1295307597 + (p[2] >>> 0 < h[2] >>> 0 ? 1 : 0) | 0, p[4] = p[4] + 3545052371 + (p[3] >>> 0 < h[3] >>> 0 ? 1 : 0) | 0, p[5] = p[5] + 886263092 + (p[4] >>> 0 < h[4] >>> 0 ? 1 : 0) | 0, p[6] = p[6] + 1295307597 + (p[5] >>> 0 < h[5] >>> 0 ? 1 : 0) | 0, p[7] = p[7] + 3545052371 + (p[6] >>> 0 < h[6] >>> 0 ? 1 : 0) | 0, this._b = p[7] >>> 0 < h[7] >>> 0 ? 1 : 0;
          for (var f = 0; f < 8; f++) {
            var _ = d[f] + p[f], v = _ & 65535, m = _ >>> 16, u = ((v * v >>> 17) + v * m >>> 15) + m * m, g = ((_ & 4294901760) * _ | 0) + ((_ & 65535) * _ | 0);
            l[f] = u ^ g;
          }
          d[0] = l[0] + (l[7] << 16 | l[7] >>> 16) + (l[6] << 16 | l[6] >>> 16) | 0, d[1] = l[1] + (l[0] << 8 | l[0] >>> 24) + l[7] | 0, d[2] = l[2] + (l[1] << 16 | l[1] >>> 16) + (l[0] << 16 | l[0] >>> 16) | 0, d[3] = l[3] + (l[2] << 8 | l[2] >>> 24) + l[1] | 0, d[4] = l[4] + (l[3] << 16 | l[3] >>> 16) + (l[2] << 16 | l[2] >>> 16) | 0, d[5] = l[5] + (l[4] << 8 | l[4] >>> 24) + l[3] | 0, d[6] = l[6] + (l[5] << 16 | l[5] >>> 16) + (l[4] << 16 | l[4] >>> 16) | 0, d[7] = l[7] + (l[6] << 8 | l[6] >>> 24) + l[5] | 0;
        }
        r.Rabbit = n._createHelper(a);
      }(), e.Rabbit;
    });
  }(ke)), ke.exports;
}
var $e = { exports: {} }, Qs = $e.exports, p0;
function Js() {
  return p0 || (p0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), bt(), yt(), gt(), J());
    })(Qs, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.StreamCipher, o = r.algo, c = [], h = [], l = [], a = o.RabbitLegacy = n.extend({
          _doReset: function() {
            var d = this._key.words, p = this.cfg.iv, f = this._X = [
              d[0],
              d[3] << 16 | d[2] >>> 16,
              d[1],
              d[0] << 16 | d[3] >>> 16,
              d[2],
              d[1] << 16 | d[0] >>> 16,
              d[3],
              d[2] << 16 | d[1] >>> 16
            ], _ = this._C = [
              d[2] << 16 | d[2] >>> 16,
              d[0] & 4294901760 | d[1] & 65535,
              d[3] << 16 | d[3] >>> 16,
              d[1] & 4294901760 | d[2] & 65535,
              d[0] << 16 | d[0] >>> 16,
              d[2] & 4294901760 | d[3] & 65535,
              d[1] << 16 | d[1] >>> 16,
              d[3] & 4294901760 | d[0] & 65535
            ];
            this._b = 0;
            for (var v = 0; v < 4; v++)
              x.call(this);
            for (var v = 0; v < 8; v++)
              _[v] ^= f[v + 4 & 7];
            if (p) {
              var m = p.words, u = m[0], g = m[1], w = (u << 8 | u >>> 24) & 16711935 | (u << 24 | u >>> 8) & 4278255360, b = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360, E = w >>> 16 | b & 4294901760, A = b << 16 | w & 65535;
              _[0] ^= w, _[1] ^= E, _[2] ^= b, _[3] ^= A, _[4] ^= w, _[5] ^= E, _[6] ^= b, _[7] ^= A;
              for (var v = 0; v < 4; v++)
                x.call(this);
            }
          },
          _doProcessBlock: function(d, p) {
            var f = this._X;
            x.call(this), c[0] = f[0] ^ f[5] >>> 16 ^ f[3] << 16, c[1] = f[2] ^ f[7] >>> 16 ^ f[5] << 16, c[2] = f[4] ^ f[1] >>> 16 ^ f[7] << 16, c[3] = f[6] ^ f[3] >>> 16 ^ f[1] << 16;
            for (var _ = 0; _ < 4; _++)
              c[_] = (c[_] << 8 | c[_] >>> 24) & 16711935 | (c[_] << 24 | c[_] >>> 8) & 4278255360, d[p + _] ^= c[_];
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function x() {
          for (var d = this._X, p = this._C, f = 0; f < 8; f++)
            h[f] = p[f];
          p[0] = p[0] + 1295307597 + this._b | 0, p[1] = p[1] + 3545052371 + (p[0] >>> 0 < h[0] >>> 0 ? 1 : 0) | 0, p[2] = p[2] + 886263092 + (p[1] >>> 0 < h[1] >>> 0 ? 1 : 0) | 0, p[3] = p[3] + 1295307597 + (p[2] >>> 0 < h[2] >>> 0 ? 1 : 0) | 0, p[4] = p[4] + 3545052371 + (p[3] >>> 0 < h[3] >>> 0 ? 1 : 0) | 0, p[5] = p[5] + 886263092 + (p[4] >>> 0 < h[4] >>> 0 ? 1 : 0) | 0, p[6] = p[6] + 1295307597 + (p[5] >>> 0 < h[5] >>> 0 ? 1 : 0) | 0, p[7] = p[7] + 3545052371 + (p[6] >>> 0 < h[6] >>> 0 ? 1 : 0) | 0, this._b = p[7] >>> 0 < h[7] >>> 0 ? 1 : 0;
          for (var f = 0; f < 8; f++) {
            var _ = d[f] + p[f], v = _ & 65535, m = _ >>> 16, u = ((v * v >>> 17) + v * m >>> 15) + m * m, g = ((_ & 4294901760) * _ | 0) + ((_ & 65535) * _ | 0);
            l[f] = u ^ g;
          }
          d[0] = l[0] + (l[7] << 16 | l[7] >>> 16) + (l[6] << 16 | l[6] >>> 16) | 0, d[1] = l[1] + (l[0] << 8 | l[0] >>> 24) + l[7] | 0, d[2] = l[2] + (l[1] << 16 | l[1] >>> 16) + (l[0] << 16 | l[0] >>> 16) | 0, d[3] = l[3] + (l[2] << 8 | l[2] >>> 24) + l[1] | 0, d[4] = l[4] + (l[3] << 16 | l[3] >>> 16) + (l[2] << 16 | l[2] >>> 16) | 0, d[5] = l[5] + (l[4] << 8 | l[4] >>> 24) + l[3] | 0, d[6] = l[6] + (l[5] << 16 | l[5] >>> 16) + (l[4] << 16 | l[4] >>> 16) | 0, d[7] = l[7] + (l[6] << 8 | l[6] >>> 24) + l[5] | 0;
        }
        r.RabbitLegacy = n._createHelper(a);
      }(), e.RabbitLegacy;
    });
  }($e)), $e.exports;
}
var He = { exports: {} }, tn = He.exports, _0;
function en() {
  return _0 || (_0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), bt(), yt(), gt(), J());
    })(tn, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.BlockCipher, o = r.algo;
        const c = 16, h = [
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
        ], l = [
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
        var a = {
          pbox: [],
          sbox: []
        };
        function x(v, m) {
          let u = m >> 24 & 255, g = m >> 16 & 255, w = m >> 8 & 255, b = m & 255, E = v.sbox[0][u] + v.sbox[1][g];
          return E = E ^ v.sbox[2][w], E = E + v.sbox[3][b], E;
        }
        function d(v, m, u) {
          let g = m, w = u, b;
          for (let E = 0; E < c; ++E)
            g = g ^ v.pbox[E], w = x(v, g) ^ w, b = g, g = w, w = b;
          return b = g, g = w, w = b, w = w ^ v.pbox[c], g = g ^ v.pbox[c + 1], { left: g, right: w };
        }
        function p(v, m, u) {
          let g = m, w = u, b;
          for (let E = c + 1; E > 1; --E)
            g = g ^ v.pbox[E], w = x(v, g) ^ w, b = g, g = w, w = b;
          return b = g, g = w, w = b, w = w ^ v.pbox[1], g = g ^ v.pbox[0], { left: g, right: w };
        }
        function f(v, m, u) {
          for (let A = 0; A < 4; A++) {
            v.sbox[A] = [];
            for (let D = 0; D < 256; D++)
              v.sbox[A][D] = l[A][D];
          }
          let g = 0;
          for (let A = 0; A < c + 2; A++)
            v.pbox[A] = h[A] ^ m[g], g++, g >= u && (g = 0);
          let w = 0, b = 0, E = 0;
          for (let A = 0; A < c + 2; A += 2)
            E = d(v, w, b), w = E.left, b = E.right, v.pbox[A] = w, v.pbox[A + 1] = b;
          for (let A = 0; A < 4; A++)
            for (let D = 0; D < 256; D += 2)
              E = d(v, w, b), w = E.left, b = E.right, v.sbox[A][D] = w, v.sbox[A][D + 1] = b;
          return !0;
        }
        var _ = o.Blowfish = n.extend({
          _doReset: function() {
            if (this._keyPriorReset !== this._key) {
              var v = this._keyPriorReset = this._key, m = v.words, u = v.sigBytes / 4;
              f(a, m, u);
            }
          },
          encryptBlock: function(v, m) {
            var u = d(a, v[m], v[m + 1]);
            v[m] = u.left, v[m + 1] = u.right;
          },
          decryptBlock: function(v, m) {
            var u = p(a, v[m], v[m + 1]);
            v[m] = u.left, v[m + 1] = u.right;
          },
          blockSize: 64 / 32,
          keySize: 128 / 32,
          ivSize: 64 / 32
        });
        r.Blowfish = n._createHelper(_);
      }(), e.Blowfish;
    });
  }(He)), He.exports;
}
var rn = Qt.exports, v0;
function sn() {
  return v0 || (v0 = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), Xe(), Ji(), es(), bt(), ss(), yt(), X0(), dr(), cs(), G0(), ds(), us(), _s(), xr(), Cs(), gt(), J(), ys(), Bs(), Ds(), Rs(), ks(), Hs(), Ps(), zs(), Ms(), Ls(), qs(), js(), Us(), Xs(), Zs(), Js(), en());
    })(rn, function(e) {
      return e;
    });
  }(Qt)), Qt.exports;
}
var nn = sn(), kt;
const Ue = class Ue {
  constructor() {
    C(this, "pictures", {});
  }
  static use() {
    return Wt(this, kt) === void 0 && tr(this, kt, new Ue()), Wt(this, kt);
  }
  // {md5: base64}
  savePicture(t) {
    const e = nn.MD5(t).toString();
    return this.pictures[e] ? console.log("cache targeted") : this.pictures[e] = t, e;
  }
  getPicture(t) {
    return this.pictures[t];
  }
};
kt = new WeakMap(), Je(Ue, kt);
let Yt = Ue;
const on = (s, t, e, r, i, n) => {
  const o = Ge(t, r, n);
  if (o) {
    const c = new Image(e.width, e.height);
    t.valueType === "local" ? c.src = Yt.use().getPicture(o) : c.src = o, c.addEventListener("load", () => {
      s.save().beginPath().prop({});
      const h = e.x + 60, l = e.y + 23;
      s._ctx.drawImage(c, h, l, e.width, e.height), s.restore();
    }), c.addEventListener("error", () => {
      s.save().beginPath().prop({}), s._ctx.fillStyle = "red", s.fillText(
        "X [PIC Load Error]",
        e.x + e.width / 2 + 20,
        e.y + e.height / 2 + 30
      ), s.restore();
    });
  } else
    U0(
      s,
      t,
      e,
      { ...r, color: "red", fontSize: 8 },
      i,
      n,
      "body",
      "X [PIC Not Set]"
    );
}, an = (s, t, e, r, i) => {
  if (t instanceof Object && t.type === "image") {
    let n = t.value;
    return t.valueType === "local" && (n = Yt.use().getPicture(n || "")), `> <img src="${n}" md5="${t.valueType === "local" ? t.value : ""}" value-type="${t.valueType}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" /> </td>`;
  } else
    return `${(t == null ? void 0 : t.value) || JSON.stringify(t)} </td>`;
}, ln = (s, t, e) => {
  const r = t.querySelector("img"), i = { type: "image", valueType: "url", value: "" };
  return r && r.getAttribute("src") && (i.value = r.getAttribute("src")), r && r.getAttribute("value-type") && (i.valueType = r.getAttribute("value-type"), i.value = r.getAttribute("md5") || ""), i;
};
class cn extends H0 {
  constructor() {
    super(`${q}-select`);
    C(this, "_searchInput");
    C(this, "_content");
    C(this, "_width", 150);
    C(this, "_height", 320);
    C(this, "_position", "bottom-left");
    C(this, "_options", null);
    this._searchInput = M("input").on("input", (e) => {
      const r = e.target;
      this.query(r.value);
    }), this._content = M("ul", `${q}-select-content`), this._.append(
      M("div", `${q}-select-input`).append(this._searchInput),
      this._content
    );
  }
  async query(e) {
    this._options !== null && (this._content.html(""), await this._options(e).then((r) => {
      r && Array.isArray(r) && this._content.append(
        ...r.map((i) => {
          const n = M("li", "item").on("click", () => {
            this._changer(Array.isArray(i) ? { key: i[0], value: i[1] } : i), this.hide();
          });
          if (typeof i == "string")
            n.append(i);
          else if (Array.isArray(i)) {
            const [o, c, h] = i;
            n.append(c, i.length > 2 ? M("label").append(h) : "");
          }
          return n;
        })
      );
    }));
  }
  options(e) {
    return this._options = e, this;
  }
  position(e) {
    return this._position = e, this;
  }
  rect(e) {
    if (e) {
      let { _position: r } = this;
      this._rect = e, this._visible = !0, setTimeout(() => {
        this._height = 0, this._._.childNodes.forEach((c, h) => {
          this._height += c.clientHeight, h === 1 && (this._width = c.clientWidth);
        });
        const i = () => {
          const { x: c, y: h, width: l, height: a } = e;
          let x = c, d = h + a;
          return (r === "top-right" || r === "bottom-right") && (x += l - this._width), (r === "top-right" || r === "top-left") && (d -= this._height + (e.height || 25) + 3), { top: d, left: x };
        };
        let { top: n, left: o } = i();
        n < 0 && (r = r.replace("top", "bottom"), n = i().top), o < 0 && (r = r.replace("left", "right"), o = i().left), this._.css({
          left: o,
          top: n
        });
      }, 0);
    }
    return this;
  }
  show() {
    return this._searchInput.value(""), this._value.type !== "select" ? this : (this.options(
      (r) => new Promise((i, n) => {
        const o = this._value;
        o.type !== "select" && i([]), i(
          o.options.filter((c) => c.toLowerCase().includes(r.toLowerCase()))
        );
      })
    ), this.query(""), super.show(), this);
  }
}
class Ct {
  constructor(t, e = !1) {
    C(this, "_");
    C(this, "_rect", null);
    C(this, "_target", null);
    this._ = M("div", `${q}-${t}`), e && this.show();
  }
  append(t) {
    return this._.append(t), this;
  }
  offset() {
    if (this._rect && this._target) {
      const t = this._target.offset(), { x: e, y: r, width: i, height: n } = this._rect;
      return { x: e + t.x, y: r + t.y, width: i, height: n };
    }
    return null;
  }
  rect(t) {
    return this._rect = t, this._.css({
      left: t.x,
      top: t.y,
      width: t.width,
      height: t.height
    }), this;
  }
  target(t, e = !0) {
    return e && t.append(this._), this._target = t, this;
  }
  show() {
    return this._.show(), this;
  }
  clear() {
    const { _target: t, _: e } = this;
    t && (t.remove(e), this._target = null);
  }
}
class hn {
  constructor(t) {
    C(this, "_placement", "body");
    C(this, "_editable", !1);
    C(this, "paintFormatArea", null);
    C(this, "_ranges", []);
    C(this, "_rowHeaderRanges", []);
    C(this, "_colHeaderRanges", []);
    C(this, "_areas", []);
    C(this, "_focus", [0, 0]);
    // _focusBodyRange: Range | null = null;
    C(this, "_focusRange", null);
    C(this, "_focusArea", null);
    // for move
    C(this, "_move", [0, 0]);
    // shadow input
    C(this, "_shadowInput");
    C(this, "_shadowInputLock", !1);
    C(this, "_shadowInputInterval", null);
    C(this, "_copyRange", null);
    C(this, "_copyAreas", []);
    C(this, "_autofillRange", null);
    C(this, "_autofillAreas", []);
    C(this, "_autofillTrigger", (t) => {
    });
    this._editable = t, this._shadowInput = M("input", "sheet-editor-inputshadow"), this._shadowInput._.style.boxSizing = "border-box", this._shadowInput._.style.position = "relative", this._shadowInput._.style.zIndex = "10000", this._shadowInput._.style.width = "0", this._shadowInput._.style.height = "100%", this._shadowInput._.style.border = "none", this._shadowInput._.style.outline = "none", this._shadowInput._.style.padding = "0";
  }
  _shadowInputFocus() {
    this._shadowInputInterval && clearTimeout(this._shadowInputInterval), this._shadowInputInterval = setTimeout(() => {
      this._shadowInput._.focus(), this._shadowInputInterval = null;
    }, 30);
  }
  get currentRange() {
    return this._ranges.at(-1);
  }
  placement(t) {
    return this._placement = t, this;
  }
  focus(t, e, r) {
    return this._focus = [t, e], this._focusRange = r, this._move = [t, e], this;
  }
  move(t, e) {
    return this._move = [t, e], this;
  }
  autofillRange(t) {
    return this._autofillRange = t, this;
  }
  autofillTrigger(t) {
    return this._autofillTrigger = t, this;
  }
  addRange(t, e = !0) {
    return e && (this._ranges.length = 0, this.clear()), this._ranges.push(t), C0(this), this;
  }
  updateLastRange(t) {
    const { _focusRange: e } = this;
    e && (this._ranges.splice(-1, 1, t(e)), C0(this));
  }
  addAreaOutline(t, e) {
    const r = new Ct("selector", !0).rect(sr(t, 2)).target(e);
    this._placement === "body" && (r.append(
      M("div", "corner").attr("draggable", "false").on("mousedown", this._autofillTrigger)
    ), r.append(this._shadowInput)), this._areas.push(r);
  }
  addArea(t, e) {
    return this._areas.push(new Ct("selector-area", !0).rect(t).target(e)), this;
  }
  addRowHeaderArea(t, e) {
    return this._areas.push(new Ct("selector-area row-header", !0).rect(t).target(e)), this;
  }
  addColHeaderArea(t, e) {
    return this._areas.push(new Ct("selector-area col-header", !0).rect(t).target(e)), this;
  }
  addCopyArea(t, e) {
    return this._copyAreas.push(
      new Ct("selector-copy", !0).rect(sr(t, 2)).target(e)
    ), this;
  }
  addAutofillArea(t, e) {
    return this._autofillAreas.push(
      new Ct("selector-autofill", !0).rect(sr(t, 2)).target(e)
    ), this;
  }
  setFocusArea(t, e) {
    return this._focusArea = new Ct("", !0).rect(t).target(e, !1), this;
  }
  showCopy() {
    this._copyRange = this.currentRange;
  }
  clearCopy() {
    this._copyRange = null, this._copyAreas.forEach((t) => {
      t.clear();
    }), this._copyAreas.length = 0;
  }
  clear() {
    [this._areas, this._autofillAreas, this._copyAreas].forEach((t) => {
      t.forEach((e) => e.clear()), t.length = 0;
    });
  }
  getFocusExpr() {
    if (!this.currentRange) return [];
    const { startRow: t, startCol: e, endRow: r, endCol: i } = this.currentRange;
    return t === r && e === i ? [Q(e, t)] : [Q(e, t), Q(i, r)];
  }
}
function g0(s, t, e) {
  s.sort(t);
  let r = s[0];
  const i = [];
  s.length === 1 && i.push(r);
  for (let n = 1; n < s.length; n += 1) {
    const o = s[n];
    e(r, o) ? r = r.union(o) : (i.push(r), r = o);
  }
  return s.length > 1 && i.push(r), i;
}
function C0(s) {
  const t = [], e = [];
  for (const r of s._ranges)
    if (r) {
      const { startRow: i, startCol: n, endRow: o, endCol: c } = r;
      (i >= 0 || o >= 0) && t.push(U.create(i, 0, o, 0)), (n >= 0 || c >= 0) && e.push(U.create(0, n, 0, c));
    }
  s._rowHeaderRanges = g0(
    t,
    (r, i) => r.startRow - i.startRow,
    (r, i) => r.intersectsRow(i.startRow, i.endRow)
  ), s._colHeaderRanges = g0(
    e,
    (r, i) => r.startCol - i.startCol,
    (r, i) => r.intersectsCol(i.startCol, i.endCol)
  );
}
function sr(s, t) {
  return {
    x: s.x - t / 2,
    y: s.y - t / 2,
    width: s.width - t,
    height: s.height - t
  };
}
const fn = { vertical: "height", horizontal: "width" };
class w0 {
  constructor(t, e) {
    C(this, "_");
    C(this, "_content");
    C(this, "_value", 0);
    C(this, "_maxValue", 0);
    C(this, "_lastOffset", 0);
    C(this, "_type");
    C(this, "_change", null);
    this._type = t, this._content = M("div", "content"), this._ = M("div", `${q}-scrollbar ${t}`).append(this._content).on("scroll.stop", (r) => {
      const { scrollTop: i, scrollLeft: n } = r.target;
      if (this._change) {
        const o = t === "vertical" ? i : n, c = o > this._value ? "+" : "-";
        this._change(c, o, r), this._value = o;
      }
    }), e.append(this._);
  }
  get value() {
    return this._value;
  }
  change(t) {
    return this._change = t, this;
  }
  scrollBy(t) {
    return t && this.scroll(this._value + t), this;
  }
  scrollToStart() {
    return this.scroll(0), this;
  }
  scrollToEnd() {
    return this.scroll(this._maxValue), this;
  }
  scroll(t) {
    const { _: e, _type: r, _maxValue: i } = this;
    return t !== void 0 ? (t < 0 ? t = 0 : t > i && (t = i), r === "vertical" ? e.scrolly(t) : e.scrollx(t), this) : r === "vertical" ? e.scrolly() : e.scrollx();
  }
  // update this size
  resize(t, e) {
    if (e > t - 1) {
      const r = fn[this._type];
      this._content.css(r, `${e}px`), this._.css(r, `${t}px`).show(), this._maxValue = e - t;
    } else
      this._.hide();
    return this;
  }
}
function dn(s) {
  s._vScrollbar = new w0("vertical", s._container).change((t, e) => {
    Fi(s._data, t, e) && (s.render(), j.reset(s), St.move(s));
  }), s._hScrollbar = new w0("horizontal", s._container).change((t, e) => {
    Di(s._data, t, e) && (s.render(), j.reset(s), St.move(s));
  });
}
function xn(s) {
  const { x: t, y: e, height: r, width: i } = s._contentRect;
  s._vScrollbar && s._vScrollbar.resize(s._height(), r + e), s._hScrollbar && s._hScrollbar.resize(s._width(), i + t);
}
function un(s, t, e) {
  if (!t) return;
  const { _selector: r, _vScrollbar: i, _hScrollbar: n, _data: o } = s, { viewport: c } = s._renderer;
  if (c && r) {
    const [, h, , l] = c.areas, a = l.range, x = h.range;
    if (i) {
      const d = (p, f, _) => {
        const v = s.rowsHeight(f, _ + 1);
        let m = 0;
        for (let u = p; m < v; u += 1)
          m += s.rowHeight(u);
        return m;
      };
      e ? t.endRow === e.endRow ? t.startRow < e.startRow ? t.startRow > x.endRow && t.startRow < a.startRow && i.scrollBy(-s.rowsHeight(t.startRow, a.startRow)) : t.startRow > e.startRow && // up-
      t.startRow >= a.endRow && i.scrollBy(
        d(a.startRow, a.endRow, t.startRow)
      ) : t.startRow === e.startRow && (t.endRow > e.endRow ? t.endRow >= a.endRow && i.scrollBy(
        d(a.startRow, a.endRow, t.endRow)
      ) : t.endRow < e.endRow && // down-
      t.endRow < a.startRow && i.scrollBy(-s.rowsHeight(t.endRow, a.startRow))) : t.endRow === o.rows.len - 1 ? i.scrollToEnd() : t.startRow === 0 ? i.scrollToStart() : t.endRow >= a.endRow ? i.scrollBy(d(a.startRow, a.endRow, t.endRow)) : t.startRow > x.endRow && t.startRow < a.startRow && i.scrollBy(-s.rowsHeight(t.startRow, a.startRow));
    }
    if (n) {
      const d = (p, f, _) => {
        const v = s.colsWidth(f, _ + 1);
        let m = 0;
        for (let u = p; m < v; u += 1)
          m += s.colWidth(u);
        return m;
      };
      e ? t.endCol === e.endCol ? t.startCol < e.startCol ? t.startCol > x.endCol && t.startCol < a.startCol && n.scrollBy(-s.colsWidth(t.startCol, a.startCol)) : t.startCol > e.startCol && // left-
      t.startCol >= a.endCol && n.scrollBy(
        d(a.startCol, a.endCol, t.startCol)
      ) : t.startCol === e.startCol && (t.endCol > e.endCol ? t.endCol >= a.endCol && n.scrollBy(
        d(a.startCol, a.endCol, t.endCol)
      ) : t.endCol < e.endCol && // right-
      t.endCol < a.startCol && n.scrollBy(-s.colsWidth(t.endCol, a.startCol))) : t.endCol === o.cols.len - 1 ? n.scrollToEnd() : t.startCol === 0 ? n.scrollToStart() : t.endCol >= a.endCol ? n.scrollBy(d(a.startCol, a.endCol, t.endCol)) : t.startCol > x.endCol && t.startCol < a.startCol && n.scrollBy(-s.colsWidth(t.startCol, a.startCol));
    }
  }
}
const Ht = {
  init: dn,
  resize: xn,
  autoMove: un
};
function Ve(s, t, e) {
  s.addEventListener(t, e);
}
function qe(s, t, e) {
  s.removeEventListener(t, e);
}
function pn(s, t, e) {
  const r = (i) => {
    e(i), qe(s, "mousemove", t), qe(s, "mouseup", r);
  };
  Ve(s, "mousemove", t), Ve(s, "mouseup", r);
}
class _n {
  constructor() {
    C(this, "_events", /* @__PURE__ */ new Map());
  }
  on(t, e) {
    const { _events: r } = this;
    return r.has(t) || r.set(t, []), r.get(t).push(e), this;
  }
  off(t, e) {
    const { _events: r } = this;
    if (r.has(t)) {
      const i = r.get(t);
      if (i && e) {
        const n = i == null ? void 0 : i.findIndex((o) => o === e);
        n !== -1 && i.splice(n, 1);
      }
    }
    return this;
  }
  emit(t, ...e) {
    var i;
    const { _events: r } = this;
    return r.has(t) && ((i = r == null ? void 0 : r.get(t)) == null || i.forEach((n) => n(...e))), this;
  }
}
function vn(s) {
  s._selector = new hn(!!s._editable).autofillTrigger(
    (t) => {
      const { _selector: e } = s;
      e && J0(
        s,
        (r, i) => {
          const { currentRange: n } = e;
          if (n) {
            const o = n.clone();
            if (o.contains(r, i))
              e.autofillRange(null);
            else {
              const c = [
                o.startRow - r,
                r - o.endRow,
                o.startCol - i,
                i - o.endCol
              ], h = c.indexOf(Math.max.apply(null, c));
              h === 1 ? (o.startRow = o.endRow + 1, o.endRow = r) : h === 0 ? (o.endRow = o.startRow - 1, o.startRow = r) : h === 3 ? (o.startCol = o.endCol + 1, o.endCol = i) : h === 2 && (o.endCol = o.startCol - 1, o.startCol = i), e.autofillRange(o);
            }
          }
        },
        (r) => r._autofillRange,
        (r) => {
          s.addHistory("auto fill"), s.copy(r._autofillRange, !0).render(), e.autofillRange(null), Et(s);
        }
      );
    }
  );
}
function gn(s, t) {
  const { _selector: e } = s;
  if (e) {
    s.addHistory("set cell value"), e.clearCopy();
    const { _ranges: r } = e;
    r.forEach((i) => {
      i && i.each((n, o) => {
        s.cell(n, o, t);
      });
    }), s.render();
  }
}
function Cn(s) {
  if (s._selector) {
    s.addHistory("clear selection value");
    const { _ranges: t } = s._selector;
    t.forEach((e) => {
      e && e.each((r, i) => {
        s._cells.removeValue(r, i);
      });
    }), s.render(), s._canvas.focus();
  }
}
function wn(s) {
  if (s._selector) {
    s.addHistory("clear selection cell");
    const { _ranges: t } = s._selector;
    t.forEach((e) => {
      e && e.each((r, i) => {
        s._cells.remove(r, i);
      });
    }), s.render(), s._canvas.focus();
  }
}
function mn(s, t, e) {
  if (s._selector) {
    const { currentRange: r } = s._selector;
    if (r && r.startRow !== void 0 && r.startCol !== void 0 && r.endRow !== void 0 && r.endCol !== void 0 && t >= r.startRow && t <= r.endRow && e >= r.startCol && e <= r.endCol)
      return !0;
  }
  return !1;
}
function Z0(s, t, e, r) {
  const { _selector: i, _data: n } = s, o = U.create(t, e), c = I0(n, o);
  i && (i.focus(t, e, c).addRange(i._placement === "body" ? c : o, r), s._emitter.emit("selectorMove", [t, e]));
}
function Q0(s, t, e) {
  const { _selector: r, _data: i } = s;
  r && r.move(t, e).updateLastRange((n) => {
    const o = I0(i, n.union(U.create(t, e)));
    return s._emitter.emit("updateFocusRange", o), o;
  });
}
function Et(s) {
  const { _selector: t, _overlayer: e } = s, { _rowHeader: r, _colHeader: i, viewport: n } = s._renderer;
  if (t && n) {
    const { _placement: o } = t;
    t.clear();
    const c = r.width, h = i.height, l = (d, p) => {
      const f = d.clone();
      return (o === "all" || o === "row-header") && (f.endCol = p.endCol, d.startCol < p.startCol && (f.startCol = p.startCol)), (o === "all" || o === "col-header") && (f.endRow = p.endRow, d.startRow < p.startRow && (f.startRow = p.startRow)), f;
    }, a = ({ range: d }, p) => o === "body" ? d.intersects(p) : o === "col-header" ? d.intersectsCol(p.startCol, p.endCol) : o === "row-header" ? d.intersectsRow(p.startRow, p.endRow) : !0, x = (d, p, f) => {
      let _ = d.rect(p);
      return o === "col-header" ? (_ = d.rectCol(p.startCol, p.endCol), _.height += 2, (f === 2 || f === 3) && (_.y -= 2)) : o === "row-header" && (_ = d.rectRow(p.startRow, p.endRow), _.width += 2, (f === 0 || f === 3) && (_.x -= 2)), _;
    };
    n.areas.forEach((d, p) => {
      const f = e._areas[p], { _ranges: _, _focusRange: v, _copyRange: m, _autofillRange: u } = t;
      _.forEach((g, w) => {
        let b = a(d, g);
        const E = x(d, g, p);
        if (b)
          if (w === _.length - 1) {
            if ((o !== "all" || d.range.intersects(g)) && t.addAreaOutline(E, f), v) {
              d.range.intersects(v) && t.setFocusArea(d.rect(v), f);
              const A = l(g, d.range), D = A.difference(v);
              D.length > 0 ? D.forEach((k) => {
                b = a(d, k), b && t.addArea(d.rect(k), f);
              }) : (o !== "body" || !g.equals(v)) && t.addArea(x(d, A, p), f);
            }
          } else
            t.addArea(E, f);
      }), m && d.range.intersects(m) && t.addCopyArea(d.rect(m), f), u && d.range.intersects(u) && t.addAutofillArea(d.rect(u), f);
    }), n.headerAreas.forEach((d, p) => {
      const f = e._headerAreas[p], { width: _, height: v } = d;
      p <= 1 ? o === "row-header" || o === "all" ? t.addColHeaderArea({ x: 0, y: 0, width: _, height: h }, f) : t._colHeaderRanges.forEach((m) => {
        d.range.intersectsCol(m.startCol, m.endCol) && t.addColHeaderArea(d.rectCol(m.startCol, m.endCol), f);
      }) : o === "col-header" || o === "all" ? t.addRowHeaderArea({ x: 0, y: 0, width: c, height: v }, f) : t._rowHeaderRanges.forEach((m) => {
        d.range.intersectsRow(m.startRow, m.endRow) && t.addRowHeaderArea(d.rectRow(m.startRow, m.endRow), f);
      });
    });
  }
}
function bn(s, t) {
  const { _selector: e, _data: r } = s;
  if (e) {
    const i = e._autofillRange;
    if (i)
      return t === "up" ? i.startRow = Le(r, i.startRow - 1, -1) : t === "down" ? i.endRow = Le(r, i.endRow + 1, 1) : t === "left" ? i.startCol = Me(r, i.startCol - 1, -1) : t === "right" && (i.endCol = Me(r, i.endCol + 1, 1)), Ht.autoMove(s, i), Et(s), !0;
  }
  return !1;
}
function lr(s, t, e, r) {
  var c, h, l;
  if (bn(s, e)) return;
  (c = s._editor) == null || c.hide();
  const { _selector: i, _data: n } = s, { viewport: o } = s._renderer;
  if (i && o) {
    const { _focusRange: a } = i;
    if (a) {
      let { startRow: x, startCol: d, endRow: p, endCol: f } = a;
      const { rows: _, cols: v } = n;
      let [m, u] = i._move;
      t || (x = p = m, d = f = u);
      const g = (h = i.currentRange) == null ? void 0 : h.clone();
      r ? e === "up" ? m = Le(n, x - r, -1) : e === "down" ? m = Le(n, p + r, 1) : e === "left" ? u = Me(n, d - r, -1) : e === "right" && (u = Me(n, f + r, 1)) : e === "up" ? m = 0 : e === "down" ? m = _.len - 1 : e === "left" ? u = 0 : e === "right" && (u = v.len - 1), m >= 0 && m <= _.len - 1 && u >= 0 && u <= v.len - 1 && (t ? Z0(s, m, u, !0) : (Q0(s, m, u), i._move = [m, u])), i.placement("body"), Ht.autoMove(s, i.currentRange, t ? void 0 : g), (l = s._selector) == null || l._shadowInputFocus(), Et(s);
    }
  }
}
function J0(s, t, e, r = (i) => {
}) {
  const { _selector: i, _renderer: n } = s;
  if (!i) return;
  const { _placement: o } = i, c = { row: 0, col: 0 };
  if (o !== "all") {
    const { left: h, top: l } = s._canvas.rect();
    let a = [0, 0], x = null;
    const d = () => {
      x !== null && (clearInterval(x), x = null);
    }, p = (f) => {
      var g, w;
      let [_, v] = [0, 0];
      f.x > 0 && (_ = f.x - h), f.y > 0 && (v = f.y - l), o === "row-header" && (_ = 1), o === "col-header" && (v = 1);
      const m = (g = i.currentRange) == null ? void 0 : g.clone(), { target: u } = f;
      if ((u == null ? void 0 : u.tagName) === "CANVAS") {
        const b = (w = n.viewport) == null ? void 0 : w.cellAt(_, v);
        if (b) {
          const { row: E, col: A } = b;
          (E != c.row || A !== c.col) && (t(E, A), o === "body" && Ht.autoMove(s, e(i), m), Et(s), c.row = E, c.col = A);
        }
        d();
      } else if (x === null) {
        const b = f.x - a[0], E = f.y - a[1];
        b >= 0 && E >= 0 && (x = setInterval(() => {
          const A = e(i);
          if (A) {
            const { endRow: D, endCol: k } = A;
            b > E ? (lr(s, !1, "right", 1), s.isLastRow(D) && d()) : (lr(s, !1, "down", 1), s.isLastCol(k) && d());
          }
        }, 120));
      }
      a = [f.x, f.y];
    };
    pn(
      document.body,
      (f) => p(f),
      () => {
        d(), r(i);
      }
    );
  }
}
function ti(s) {
  s._selector && (s._selector.showCopy(), Et(s));
}
function ei(s) {
  s._selector && (navigator.clipboard.write([
    new ClipboardItem({
      "text/plain": new Blob([""], { type: "text/plain" })
    })
  ]).then(), s._selector.clearCopy(), Et(s));
}
function yn(s, t) {
  const e = U.with(t);
  let r = "";
  return e.eachRow((i) => {
    e.eachCol((n) => {
      let o = s.cellValueString(i, n);
      o.includes(`
`) && (o = `"${o}"`), r += `${o}	`;
    }), r += `
`;
  }), r;
}
function En(s) {
  const t = [];
  let [e, r] = [0, 0], i = "", n = 0;
  const o = () => {
    t[e] || (t[e] = []), t[e][r] = i, i = "";
  };
  for (const c of s) {
    if (c === "	") {
      o(), r += 1, n = 0;
      continue;
    }
    if (c === `
` && n !== 1) {
      o(), e += 1, r = 0;
      continue;
    }
    c !== '"' ? c !== "\r" && (i += c) : n += 1;
  }
  return r > 0 && o(), t.length <= 0 && t.push([s]), t;
}
function m0(s, t, e = (r) => {
}) {
  return s.types.includes(t) ? (s.getType(t).then((r) => {
    r.text().then((i) => {
      e(i);
    });
  }), !0) : !1;
}
function Bn(s) {
  const { _selector: t } = s;
  if (s._copyable && t) {
    const e = {}, r = t.currentRange;
    r && (ti(s), ["text/plain", "text/html"].forEach((i) => {
      const n = r.toString(), o = i === "text/html" ? s.toHtml(n) : yn(s, n);
      e[i] = new Blob([o], { type: i });
    }), navigator.clipboard.write([new ClipboardItem(e)]).then());
  }
}
function An(s, t, e) {
  navigator.clipboard.read().then((r) => {
    var i, n, o, c, h;
    if (r.length > 0) {
      s.addHistory("paste value");
      const l = r[0];
      t || (t = !m0(l, "text/html", (a) => {
        s.fill(a).render();
      })), t && m0(l, "text/plain", (a) => {
        s.fill(En(a)).render();
      }), e && ((i = s._selector) != null && i._copyRange && ((o = (n = s._selector) == null ? void 0 : n._copyRange) == null || o.each((a, x) => {
        s._cells.remove(a, x);
      }), ar(s._data, (h = (c = s._selector) == null ? void 0 : c._copyRange) == null ? void 0 : h.toString())), ei(s));
    }
  });
}
function Dn(s, t) {
  if (s._selector) {
    s.addHistory("set cell format fast");
    const { _ranges: e } = s._selector;
    e.forEach((r) => {
      r && r.each((i, n) => {
        s._cells.setFormat(i, n, t || "normal");
      });
    }), s.render(), s._canvas.focus();
  }
}
function Fn(s, t) {
  if (t && s._selector) {
    s.addHistory("set cell fixed fast");
    const { _ranges: e } = s._selector;
    e.forEach((r) => {
      r && r.each((i, n) => {
        s._cells.fixed(i, n, t);
      });
    }), s.render(), s._canvas.focus();
  }
}
function Rn(s, t) {
  if (s._selector) {
    s.addHistory("set cell style");
    const { _ranges: e } = s._selector;
    e.forEach((r) => {
      r && r.each((i, n) => s.setStyle(i, n, t));
    }), s.render(), s._canvas.focus();
  }
}
function Sn(s, t) {
  if (s._selector) {
    s.addHistory("set cell style fast");
    const { _ranges: e } = s._selector;
    let r;
    e.forEach((i) => {
      i && i.each((n, o) => {
        const c = s.getStyleIndex(n, o);
        let h = {};
        c !== -1 && (h = s.style(c)), r || (r = {}, r = {
          [t]: !h[t]
        }), s.setStyle(n, o, r);
      });
    }), s.render(), s._canvas.focus();
  }
}
function kn(s) {
  if (s._selector) {
    s.addHistory("clear cell style fast");
    const { _ranges: t } = s._selector;
    t.forEach((e) => {
      e && e.each((r, i) => {
        const n = s.cell(r, i);
        n instanceof Object && n.style !== void 0 && delete n.style;
      });
    }), s.render(), s._canvas.focus();
  }
}
function $n(s) {
  if (s._selector) {
    s.addHistory("clear cell format fast");
    const { _ranges: t } = s._selector;
    t.forEach((e) => {
      e && e.each((r, i) => {
        const n = s.cell(r, i);
        n instanceof Object && (delete n.format, delete n.fixed, delete n.formula);
      });
    }), s.render(), s._canvas.focus();
  }
}
function Hn(s, t) {
  if (s._selector) {
    s.addHistory(`insert ${t}`), t === "row" ? s._data.rows.len++ : s._data.cols.len++, Ye(s), s.resize();
    const { _ranges: e } = s._selector, { startRow: r, startCol: i } = e[0], n = V0(s.data()), o = W0(s.data());
    s._data.merges = s._data.merges.map((c) => {
      const h = c.split(":");
      let [l, a] = et(h[0]), [x, d] = et(h[1]);
      return t === "row" ? (a >= r && a++, d >= r && d++) : (l >= i && l++, x >= i && x++), `${Q(l, a)}:${Q(x, d)}`;
    }), t === "row" ? r <= n && s._cells._.forEach((c) => {
      if (c) {
        const [h, l, a] = c;
        h >= r && c[0]++;
      }
    }) : i <= o && s._cells._.forEach((c) => {
      if (c) {
        const [h, l, a] = c;
        l >= i && c[1]++;
      }
    }), s._cells.resetIndexes(), s.render();
  }
}
function Tn(s, t) {
  if (s._selector) {
    s.addHistory(`delete ${t}`);
    const { _ranges: e } = s._selector, { startRow: r, startCol: i, endRow: n, endCol: o } = e[0], c = n - r + 1, h = o - i + 1, l = V0(s.data()), a = W0(s.data()), x = {};
    s._data.merges = s._data.merges.map((d) => {
      const p = d.split(":");
      let [f, _] = et(p[0]), [v, m] = et(p[1]);
      if (t === "row") {
        if (_ >= r && m <= n) return null;
        x[`${_}-${f}`] = !0, _ > r && (_ -= c), m > r && (m -= c);
      } else {
        if (f >= i && v <= o) return null;
        x[`${_}-${f}`] = !0, f > r && (f -= h), v > r && (v -= h);
      }
      return `${Q(f, _)}:${Q(v, m)}`;
    }).filter((d) => !!d), t === "row" ? r <= l && (s._cells._.forEach((d, p) => {
      if (d) {
        const [f, _, v] = d;
        f >= r && f <= n ? x[`${f}-${_}`] || (s._cells._[p] = null) : f > r && (d[0] -= c);
      }
    }), s._cells._ = s._cells._.filter((d) => !!d)) : i <= a && (s._cells._.forEach((d, p) => {
      if (d) {
        const [f, _, v] = d;
        _ >= i && _ <= o ? x[`${f}-${_}`] || (s._cells._[p] = null) : f > i && (d[1] -= h);
      }
    }), s._cells._ = s._cells._.filter((d) => !!d)), t === "row" ? s._data.rows.len -= c : s._data.cols.len -= h, Ye(s), s.resize(), s._cells.resetIndexes(), s.render();
  }
}
function Pn(s, t) {
  const e = [];
  if (!s._selector) return;
  s.addHistory("set border");
  const { _ranges: r } = s._selector;
  r && r.forEach((i) => {
    e.push(`${Q(i.startCol, i.startRow)}:${Q(i.endCol, i.endRow)}`);
  }), e.forEach((i) => {
    s.addBorder(i, t.type, t.lineStyle, t.color);
  }), s.render();
}
function In(s) {
  const t = [];
  if (!s._selector) return;
  s.addHistory("clear border");
  const { _ranges: e } = s._selector;
  e && e.forEach((r) => {
    t.push(`${Q(r.startCol, r.startRow)}:${Q(r.endCol, r.endRow)}`);
  }), t.forEach((r) => {
    s.clearBorder(r);
  }), s.render();
}
function zn(s) {
  s.isMerged() ? s.unmerge() : s.merge(), s.render();
}
function On(s) {
  if (s._data.freeze)
    s.freeze();
  else if (s._selector) {
    const { _ranges: t } = s._selector;
    t.length > 0 && s.freeze(Q(t[0].startCol, t[0].startRow));
  }
  s.render();
}
function Mn(s) {
  var t;
  if (s._selector) {
    s.addHistory("set paintFormat");
    const e = s._selector.paintFormatArea;
    if (e) {
      const { startCol: r, startRow: i, endCol: n, endRow: o } = e, c = n - r + 1, h = o - i + 1, l = {}, a = {};
      e.each((x, d) => {
        const p = s.cell(x, d), f = s.getPureStyle(x, d);
        l[`${x - i}-${d - r}`] = { ...f }, typeof p == "object" && (a[`${x - i}-${d - r}`] = p);
      });
      for (const x of s._selector._ranges) {
        const { startCol: d, startRow: p, endCol: f, endRow: _ } = x;
        x.each((v, m) => {
          const u = `${(v - p) % h}-${(m - d) % c}`, g = s.cell(v, m);
          if (a[u]) {
            const w = JSON.parse(JSON.stringify(a[u]));
            w.style = void 0, g instanceof Object ? w.value = (g == null ? void 0 : g.value) || "" : w.value = g, s.cell(v, m, w), s.setStyle(v, m, { ...l[u] }, !0);
          }
        });
      }
    }
    (t = s._selector) == null || t.clearCopy(), s._selector.paintFormatArea = null, s.render();
  }
}
const j = {
  init: vn,
  setCellStyle: Rn,
  fastSetCellStyle: Sn,
  fastClearCellStyle: kn,
  fastClearCellFormat: $n,
  fastSetCellFormat: Dn,
  fastSetCellFixed: Fn,
  setCellValue: gn,
  clearCellValue: Cn,
  clearCell: wn,
  addRange: Z0,
  unionRange: Q0,
  reset: Et,
  move: lr,
  bindMousemove: J0,
  showCopy: ti,
  clearCopy: ei,
  copyValue: Bn,
  pasteValue: An,
  insertRowOrCol: Hn,
  deleteRowOrCol: Tn,
  isInRange: mn,
  setBorder: Pn,
  clearBorder: In,
  mergeGrid: zn,
  freezeGrid: On,
  paintFormat: Mn
};
function Wn(s, t) {
  const e = mt(t), { _editors: r } = s;
  let i = r.get(e);
  if (!i) {
    const n = xt.use();
    if (n.options[e] && n.options[e].editor) {
      const o = n.options[e].editor, c = o();
      c && (r.set(e, c), i = r.get(e));
    }
  }
  return s._emitter.emit("getChanger", e, t), i == null || i.changer((n) => {
    n !== void 0 && (s.addHistory("edit"), typeof n == "number" || n ? j.setCellValue(s, n) : j.clearCellValue(s));
  }), i == null || i.moveChanger((n) => {
    const { _selector: o } = s;
    o && (n !== "none" && j.move(s, !0, n, 1), s._canvas.focus());
  }), i;
}
function Ln(s) {
  const { _editor: t, _selector: e, _renderer: r } = s;
  if (t && e) {
    const { _focusArea: i, _focus: n } = e;
    if (t.visible && i) {
      const { _rect: o, _target: c } = i, { viewport: h } = r;
      o && c && h && h.inAreas(...n) ? t.rect(o).target(c).show() : t.rect({ x: -100, y: -100, width: 0, height: 0 }).hide();
    }
  }
}
function Vn(s, t) {
  const { _selector: e } = s;
  if (e) {
    const { _focusRange: r, _focusArea: i } = e;
    if (r && i) {
      const { _rect: n, _target: o } = i, { startRow: c, startCol: h } = r, l = s.cell(c, h), a = Wn(s, l);
      s._editor = a, a && n && o && (l && a.value(l), a.cellIndex(c, h).rect(n).target(o).show(t));
    }
  }
}
const St = {
  move: Ln,
  reset: Vn
}, qn = (s, t, e, r, i) => `options=${JSON.stringify(t.options)} >${s.cellValueString(e, r)}</td>`, Nn = (s, t, e) => {
  let r = [];
  const i = t.getAttribute("options");
  if (i)
    try {
      r = JSON.parse(i);
    } catch (n) {
      console.error(n);
    }
  return { type: "select", value: t.innerText, options: r };
}, jn = (s, t, e, r, i, n, o, c) => {
  const h = t;
  c || (c = Ge(h, r, n));
  const l = () => c ? (h.options || []).findIndex((P) => P === c) !== -1 : !0, {
    fontSize: a,
    fontFamily: x,
    bold: d,
    italic: p,
    color: f,
    align: _,
    valign: v,
    underline: m,
    strikethrough: u,
    textwrap: g,
    padding: w
  } = r;
  s.save().beginPath().prop({
    textAlign: _,
    textBaseline: v,
    font: Y0(x, a, p, d),
    fillStyle: f
  });
  const b = 8, [E, A] = w || [5, 5], D = j0(_, e.width, E), k = c.split(`
`), y = e.width - E * 2, B = [];
  k.forEach((P) => {
    const V = s.measureTextWidth(P);
    if (g && V > y) {
      let L = { w: 0, len: 0, start: 0 };
      for (let R = 0; R < P.length; R += 1)
        L.w > y && (B.push(P.slice(L.start, R)), L = { w: 0, len: 0, start: R }), L.len++, L.w += s.measureTextWidth(P[R]) + 1;
      L.len > 0 && B.push(P.slice(L.start));
    } else
      B.push(P);
  });
  const H = a / 0.75, T = (B.length - 1) * H, F = [];
  m && F.push("underline"), u && F.push("strikethrough");
  let S = q0(v, e.height, T, H, A), $ = 0;
  const W = (B.length > 0 ? B.length : 1) * H;
  return B.forEach((P) => {
    const V = s.measureTextWidth(P);
    $ = Math.max($, V), s.fillText(P, D, S), s.beginPath(), Yn({ x: y, y: S }, b, !0).forEach(
      (L, R) => {
        R === 0 ? s.moveTo(L.x, L.y) : s.lineTo(L.x, L.y);
      }
    ), s.closePath(), l() ? s._ctx.fillStyle = "#939495" : s._ctx.fillStyle = "red", s.fill(), F.forEach((L) => {
      s._ctx.strokeStyle = f, s.line(...N0(L, _, v, D, S, V, a));
    }), S += H;
  }), s.restore(), {
    contentInfo: {
      width: $,
      height: W + 10
    }
  };
}, Yn = (s, t = 10, e = !1) => {
  const r = 2 * Math.PI / 6, i = {
    x: s.x,
    y: e ? s.y + t / 2 : s.y - t / 2
  }, n = {
    x: s.x - t * Math.sin(r) / 2,
    y: e ? s.y - t * Math.cos(r) / 2 : s.y + t * Math.cos(r) / 2
  }, o = {
    x: s.x + t * Math.sin(r) / 2,
    y: e ? s.y - t * Math.cos(r) / 2 : s.y + t * Math.cos(r) / 2
  };
  return [i, n, o];
}, Un = (s, t, e, r) => {
  r.clientX > e.x + (e.width - 15) && setTimeout(() => {
    St.reset(s);
  }, 0);
}, mt = (s) => s instanceof Object && s.type && s.type in xt.use().options ? s.type : "text", Kn = [
  {
    type: "text",
    toHtml: Vi,
    fromHtml: qi,
    toCanvas: U0,
    editor: () => new Ni()
  },
  {
    type: "select",
    toHtml: qn,
    fromHtml: Nn,
    toCanvas: jn,
    editor: () => new cn(),
    clickEvent: Un
  },
  {
    type: "image",
    disableAutoFillAction: !0,
    toHtml: an,
    toCanvas: on,
    fromHtml: ln
  }
];
var $t;
const Ke = class Ke {
  constructor() {
    C(this, "options", {});
    this.loadBaseRender();
  }
  static use() {
    return Wt(this, $t) || tr(this, $t, new Ke()), Wt(this, $t);
  }
  loadBaseRender() {
    Kn.forEach((t) => {
      this.options[t.type] = t;
    });
  }
  getRender(t) {
    return this.options[t] || (t = "text", console.error("not support this type: " + t)), this.options[t];
  }
  registRender(t) {
    this.options[t.type] = t;
  }
  deleteRender(t) {
    this.options[t] && delete this.options[t];
  }
};
$t = new WeakMap(), Je(Ke, $t);
let xt = Ke;
function wt(s, t, e, r = !1) {
  let i, n, o, c;
  Array.isArray(e) ? i = n = o = c = e : { top: i, right: n, bottom: o, left: c } = e, s.save().beginPath().translate(t.x, t.y);
  const h = (l, a) => [
    [0 - a, 0, t.width + a, 0],
    [t.width, 0, t.width, t.height],
    [0 - a, t.height, t.width + a, t.height],
    [0, 0, 0, t.height]
  ][l];
  [i, n, o, c].forEach((l, a) => {
    if (l) {
      let x = [], d = 1;
      l[0] === "thick" ? d = 3 : l[0] === "medium" ? d = 2 : l[0] === "dotted" ? x = [1, 1] : l[0] === "dashed" && (x = [2, 2]);
      let p = 0;
      r && (p = d / 2), s.prop({ strokeStyle: l[1], lineWidth: d }).setLineDash(x).line(...h(a, p));
    }
  }), s.restore();
}
function Ge(s, t, e) {
  let r = "";
  const i = mt(s);
  return s && (i === "text" ? s instanceof Object ? r = e(
    s,
    t,
    `${(s == null ? void 0 : s.value) || ""}`,
    s == null ? void 0 : s.format
  ) : r = e(s, t, `${s || ""}`) : s instanceof Object && (r = s.value ? String(s.value) : "")), r;
}
function b0(s, t, e, r, i, n, o) {
  const c = mt(t);
  if (s.save().beginPath().translate(e.x, e.y), s.rect(0, 0, e.width, e.height).clip(), r.bgcolor && s.prop("fillStyle", r.bgcolor).fill(), r.rotate && r.rotate > 0 && s.rotate(r.rotate * (Math.PI / 180)), i !== void 0) {
    if (s.save(), !i(s, e, t, Ge(t, r, n))) {
      s.restore();
      return;
    }
    s.restore();
  }
  const h = xt.use().getRender(c).toCanvas(s, t, e, r, i, n, o);
  return s.restore(), h;
}
function ri(s, [t, e, ...r], i) {
  const n = [], o = U.with(t), c = i.filter((h) => h.intersects(o));
  if (o.intersects(s.range) || c.length > 0)
    if (c.length <= 0)
      n.push([o, s.rect(o), e]);
    else
      for (const h of c)
        if (o.within(h))
          o.startRow === h.startRow && o.startCol === h.startCol && e !== "inside" && e !== "horizontal" && e !== "vertical" && n.push([h, s.rect(h), e === "all" ? "outside" : e]);
        else if (e === "outside" || e === "left" || e === "top" || e === "right" || e === "bottom") {
          n.push([o, s.rect(o), e]);
          break;
        } else {
          const l = c.filter((a) => !a.equals(h));
          if (o.difference(h).forEach((a) => {
            if (a.intersects(s.range)) {
              const x = s.rect(a);
              n.push(
                ...ri(
                  s,
                  [a.toString(), e, ...r],
                  l
                )
              ), (e === "inside" || e === "horizontal") && (a.startRow < h.startRow && a.endRow < h.startRow ? n.push([a, x, "bottom"]) : a.startRow > h.startRow && a.endRow > h.startRow && n.push([a, x, "top"])), (e === "inside" || e === "vertical") && (a.startCol < h.startCol && a.endCol < h.startCol && n.push([a, x, "right"]), a.startCol > h.startCol && a.endCol > h.startCol && n.push([a, x, "left"]));
            }
          }), e === "all") {
            const a = s.rect(h);
            o.startRow === h.startRow && n.push([h, a, "top"]), o.endRow === h.endRow && n.push([h, a, "bottom"]), o.startCol === h.startCol && n.push([h, a, "left"]), o.endCol === h.endCol && n.push([h, a, "right"]);
          }
          break;
        }
  return n;
}
function cr(s, { width: t, color: e }, r) {
  t > 0 && (s.save().beginPath().prop({ lineWidth: t - 0.5, strokeStyle: e }), r(), s.restore());
}
function y0(s, t, { x: e, y: r, width: i, height: n }) {
  cr(s, t, () => {
    s.translate(e, r).line(i, 0, i, n).line(0, n, i, n);
  });
}
function Xn(s, t, e, r, i, n, o, c) {
  const h = [n, o];
  i === "outside" || i === "all" ? wt(s, r, h, !0) : i === "left" ? wt(s, r, { left: h }, c) : i === "top" ? wt(s, r, { top: h }, c) : i === "right" ? wt(s, r, { right: h }, c) : i === "bottom" && wt(s, r, { bottom: h }, c), (i === "all" || i === "inside" || i === "horizontal" || i === "vertical") && (i !== "horizontal" && e.eachCol((l) => {
    if (l < e.endCol) {
      const a = e.clone();
      a.endCol = a.startCol = l, a.intersects(t.range) && wt(
        s,
        t.rect(a),
        { right: h },
        c
      );
    }
  }), i !== "vertical" && e.eachRow((l) => {
    if (l < e.endRow) {
      const a = e.clone();
      a.endRow = a.startRow = l, a.intersects(t.range) && wt(
        s,
        t.rect(a),
        { bottom: h },
        c
      );
    }
  }));
}
function Gn(s, t, e, r) {
  e && e.length > 0 && e.forEach((i) => {
    const [, , n, o] = i;
    ri(t, i, r).forEach(([c, h, l]) => {
      Xn(s, t, c, h, l, n, o);
    });
  });
}
function vt(s, t, e, r) {
  if (!e) return;
  let i, n, o = (b, E, A) => A, c = r._headerStyle, h = r._headerGridline, l = r._styles, a, x, d, p;
  const { _rowHeader: f, _colHeader: _ } = r;
  if (s === "row-header") {
    if (f.width <= 0) return;
    ({ cell: i, merges: a, cellRenderer: n } = f);
  } else if (s === "col-header") {
    if (_.height <= 0) return;
    ({ cell: i, merges: a, cellRenderer: n } = _);
  } else
    i = r._cell, n = r._cellRenderer, o = r._formatter, c = r._style, h = r._gridline, l = r._styles, a = r._merges, x = r._borders, d = r._row, p = r._col;
  t.save().translate(e.x, e.y).prop("fillStyle", r._bgcolor).rect(0, 0, e.width, e.height).fill().clip();
  const v = (b, E, A) => {
    const D = { ...c };
    if (d) {
      const k = d(b);
      k && k.style !== void 0 && Object.assign(D, l[k.style]);
    }
    if (p) {
      const k = p(E);
      k && k.style !== void 0 && Object.assign(D, l[k.style]);
    }
    return A instanceof Object && A.style !== void 0 && Object.assign(D, l[A.style]), D;
  }, m = [], u = [], g = /* @__PURE__ */ new Set();
  a && Bi(a, (b) => {
    if (b.intersects(e.range)) {
      const E = i(b.startRow, b.startCol), A = v(b.startRow, b.startCol, E), D = e.rect(b);
      u.push([E, D, A]), m.push(b), b.each((k, y) => {
        g.add(`${k}_${y}`);
      });
    }
  });
  const w = (b, E, A) => {
    if (s === "body")
      return y0(t, h, E), b0(t, b, E, A, n, o, s);
    b0(t, b, E, A, n, o, s), y0(t, h, E);
  };
  e.each((b, E, A) => {
    var D;
    if (r._activeRowHeight[b] || (r._activeRowHeight[b] = []), !g.has(`${b}_${E}`)) {
      const k = i(b, E), y = v(b, E, k), B = w(k, A, y);
      y.textwrap && B && B.contentInfo && (r._activeRowHeight[b][E] = ((D = B.contentInfo) == null ? void 0 : D.height) || 0), y.textwrap || (r._activeRowHeight[b][E] = 0);
    }
  }), u.forEach((b) => w(...b)), Gn(t, e, x, m), t.restore();
}
function Zn(s) {
  const { _width: t, _height: e, _target: r, _scale: i, _viewport: n, _freeze: o, _rowHeader: c, _colHeader: h } = s;
  if (n) {
    const l = new Ei(r, i);
    l.size(t, e);
    const [a, x, d, p] = n.areas, [f, _, v, m] = n.headerAreas;
    vt("body", l, p, s), vt("body", l, a, s), vt("col-header", l, f, s), vt("body", l, d, s), vt("row-header", l, m, s), vt("body", l, x, s), vt("col-header", l, _, s), vt("row-header", l, v, s);
    const [u, g] = o;
    (g > 0 || u > 0) && cr(l, s._freezeGridline, () => {
      g > 0 && l.line(0, p.y, t, p.y), u > 0 && l.line(p.x, 0, p.x, e);
    });
    const { x: w, y: b } = x;
    if (w > 0 && b > 0) {
      const { height: E } = h, { width: A } = c, { bgcolor: D } = s._headerStyle;
      D && l.save().prop({ fillStyle: D }).rect(0, 0, A, E).fill().restore(), cr(l, s._headerGridline, () => {
        l.line(0, E, A, E).line(A, 0, A, E);
      });
    }
  }
}
class ft {
  constructor(t, e, r, i, n, o, c) {
    // { rowIndex: { y, height }}
    C(this, "rowMap", /* @__PURE__ */ new Map());
    // { colIndex: { x, width }}
    C(this, "colMap", /* @__PURE__ */ new Map());
    C(this, "cellAtCache", null);
    this.range = t, this.x = e, this.y = r, this.width = i, this.height = n, this.rowHeight = o, this.colWidth = c;
    let h = 0;
    t.eachRow((a) => {
      const x = o(a);
      this.rowMap.set(a, { y: h, height: x }), h += x;
    }), this.height <= 0 && (this.height = h);
    let l = 0;
    t.eachCol((a) => {
      const x = c(a);
      this.colMap.set(a, { x: l, width: x }), l += x;
    }), this.width <= 0 && (this.width = l);
  }
  /**
   * check whether or not x contained in area
   * @param {int} x offset on x-axis
   */
  containsx(t) {
    return t >= this.x && t < this.x + this.width;
  }
  /**
   * check whether or not y contained in area
   * @param {int} y offset on y-axis
   */
  containsy(t) {
    return t >= this.y && t < this.y + this.height;
  }
  contains(t, e) {
    return this.containsx(t) && this.containsy(e);
  }
  eachRow(t) {
    this.range.eachRow((e) => {
      const { y: r, height: i } = this.rowMap.get(e) || { y: 0, height: 0 };
      i > 0 && t(e, r, i);
    });
  }
  eachCol(t) {
    this.range.eachCol((e) => {
      const { x: r, width: i } = this.colMap.get(e) || { x: 0, width: 0 };
      i > 0 && t(e, r, i);
    });
  }
  each(t) {
    this.eachRow((e, r, i) => {
      this.eachCol((n, o, c) => {
        t(e, n, { x: o, y: r, width: c, height: i });
      });
    });
  }
  rectRow(t, e) {
    var h;
    const { rowMap: r, range: i } = this;
    let [n, o] = [0, 0];
    t >= i.startRow && (n = ((h = r.get(t)) == null ? void 0 : h.y) || 0);
    for (let l = t; l <= e; l += 1) {
      const a = this.rowHeight(l);
      a > 0 && (l < i.startRow && (n -= a), o += a);
    }
    const { width: c } = this;
    return { x: 0, y: n, width: c, height: o };
  }
  rectCol(t, e) {
    var h;
    const { colMap: r, range: i } = this;
    let [n, o] = [0, 0];
    t >= i.startCol && (n = ((h = r.get(t)) == null ? void 0 : h.x) || 0);
    for (let l = t; l <= e; l += 1) {
      const a = this.colWidth(l);
      a > 0 && (l < i.startCol && (n -= a), o += a);
    }
    const { height: c } = this;
    return { x: n, y: 0, width: o, height: c };
  }
  rect(t) {
    const { y: e, height: r } = this.rectRow(t.startRow, t.endRow), { x: i, width: n } = this.rectCol(t.startCol, t.endCol);
    return { x: i, y: e, width: n, height: r };
  }
  cellAt(t, e) {
    const { cellAtCache: r } = this;
    if (r != null && t > r.x && t <= r.x + r.width && e > r.y && e <= r.y + r.height)
      return r;
    const { startRow: i, startCol: n } = this.range, o = {
      row: i,
      col: n,
      x: this.x,
      y: this.y,
      width: 0,
      height: 0
    };
    for (; o.y < e; ) {
      const c = this.rowHeight(o.row++);
      o.y += c, o.height = c;
    }
    for (o.y -= o.height, o.row--; o.x < t; ) {
      const c = this.colWidth(o.col++);
      o.x += c, o.width = c;
    }
    return o.x -= o.width, o.col--, this.cellAtCache = o, o;
  }
  static create(t, e, r, i, n, o, c, h, l, a) {
    return new ft(
      new U(t, e, r, i),
      n,
      o,
      c,
      h,
      l,
      a
    );
  }
}
class Qn {
  constructor(t) {
    /**
     * [area1, area2, area3, area4]
     * -----------------------
     * |  area-2   |   area-1
     * |-----------|----------
     * |  area-3   |   area-4
     * -----------------------
     */
    C(this, "areas");
    /**
     * [area1, area21, area23, area3]
     *             |   area-21   | area-1
     * ------------|-----------------------
     *   area-23   |   body
     * ------------|
     *   area-3    |
     */
    C(this, "headerAreas");
    C(this, "_render");
    this._render = t;
    const [e, r] = [t._rowHeader.width, t._colHeader.height], [i, n] = t._freeze, { _startRow: o, _startCol: c, _rows: h, _cols: l, _width: a, _height: x } = t, d = ($) => t.rowHeightAt($), p = ($) => t.colWidthAt($), f = ft.create(
      o,
      c,
      i - 1,
      n - 1,
      e,
      r,
      0,
      0,
      d,
      p
    ), [_, v] = [i + t._scrollRows, n + t._scrollCols];
    let m = f.height + r, u = _;
    for (; m < x && u < h; )
      m += d(u), u += 1;
    let g = f.width + e, w = v;
    for (; g < a && w < l; )
      g += p(w), w += 1;
    const b = e + f.width, E = r + f.height;
    let A = a - b, D = x - E;
    w === l && (A -= a - g), u === h && (D -= x - m), w -= 1, u -= 1;
    const k = ft.create(
      _,
      v,
      u,
      w,
      b,
      E,
      A,
      D,
      d,
      p
    ), y = ft.create(
      o,
      v,
      i - 1,
      w,
      b,
      r,
      A,
      0,
      d,
      p
    ), B = ft.create(
      _,
      c,
      u,
      n - 1,
      e,
      E,
      0,
      D,
      d,
      p
    );
    this.areas = [y, f, B, k];
    const { _rowHeader: H, _colHeader: T } = t, F = () => T.height / T.rows, S = () => H.width / H.cols;
    this.headerAreas = [
      ft.create(
        0,
        y.range.startCol,
        T.rows - 1,
        y.range.endCol,
        k.x,
        0,
        k.width,
        0,
        F,
        p
      ),
      ft.create(
        0,
        f.range.startCol,
        T.rows - 1,
        f.range.endCol,
        f.x,
        0,
        f.width,
        0,
        F,
        p
      ),
      ft.create(
        f.range.startRow,
        0,
        f.range.endRow,
        H.cols - 1,
        0,
        f.y,
        0,
        f.height,
        d,
        S
      ),
      ft.create(
        B.range.startRow,
        0,
        B.range.endRow,
        H.cols - 1,
        0,
        k.y,
        0,
        k.height,
        d,
        S
      )
    ];
  }
  inAreas(t, e) {
    for (const r of this.areas)
      if (r.range.contains(t, e))
        return !0;
    return !1;
  }
  cellAt(t, e) {
    const r = this.areas[1], [i, n, o, c] = this.headerAreas;
    if (t < r.x && e < r.y)
      return {
        placement: "all",
        row: 0,
        col: 0,
        x: 0,
        y: 0,
        width: r.x,
        height: r.y
      };
    if (t < r.x)
      return {
        placement: "row-header",
        ...(o.containsy(e) ? o : c).cellAt(t, e)
      };
    if (e < r.y)
      return {
        placement: "col-header",
        ...(n.containsx(t) ? n : i).cellAt(t, e)
      };
    for (const h of this.areas)
      if (h.contains(t, e))
        return { placement: "body", ...h.cellAt(t, e) };
    return null;
  }
}
class Ze {
  constructor(t, e, r) {
    C(this, "_target");
    C(this, "_bgcolor", "#ffffff");
    // table width
    C(this, "_width", 0);
    // table height
    C(this, "_height", 0);
    C(this, "_scale", 1);
    // the count of rows
    C(this, "_rows", 100);
    // the count of cols;
    C(this, "_cols", 26);
    // the row height (px)
    C(this, "_rowHeight", 22);
    // the column width (px)
    C(this, "_colWidth", 100);
    // row of the start position in table
    C(this, "_startRow", 0);
    // col of the start position in table
    C(this, "_startCol", 0);
    // count of rows scrolled
    C(this, "_scrollRows", 0);
    // count of cols scrolled
    C(this, "_scrollCols", 0);
    /**
     * get row given rowIndex
     * @param {int} rowIndex
     * @returns Row | undefined
     */
    C(this, "_row", () => {
    });
    /**
     * get col given colIndex
     * @param {int} coIndex
     * @returns Row | undefined
     */
    C(this, "_col", () => {
    });
    /**
     * get cell given rowIndex, colIndex
     * @param {int} rowIndex
     * @param {int} colIndex
     * @returns Cell | string
     */
    C(this, "_cell", () => {
    });
    C(this, "_cellRenderer", () => !0);
    C(this, "_formatter", (t, e, r) => r);
    C(this, "_merges", []);
    C(this, "_borders", []);
    C(this, "_styles", []);
    C(this, "_gridline", {
      width: 1,
      color: "#e6e6e6"
    });
    C(this, "_style", {
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
    C(this, "_rowHeader", {
      width: 60,
      cols: 1,
      cell(t, e) {
        return t + 1;
      }
    });
    // column header
    C(this, "_colHeader", {
      height: 24,
      rows: 1,
      cell(t, e) {
        return $0(e);
      }
    });
    C(this, "_headerGridline", {
      width: 1,
      color: "#e6e6e6"
    });
    C(this, "_headerStyle", {
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
    C(this, "_freeze", [0, 0]);
    C(this, "_freezeGridline", {
      width: 2,
      color: "#d8d8d8"
    });
    // it can be used after rendering
    C(this, "_viewport", null);
    C(this, "_activeRowHeight", {});
    const i = typeof t == "string" ? document.querySelector(t) : t;
    if (!i) throw new Error("target error");
    this._target = i, this._width = e, this._height = r;
  }
  render() {
    return this._viewport = new Qn(this), Zn(this), this;
  }
  bgcolor(t) {
    return this._bgcolor = t, this;
  }
  width(t) {
    return this._width = t, this;
  }
  height(t) {
    return this._height = t, this;
  }
  scale(t) {
    return this._scale = t, this;
  }
  rows(t) {
    return this._rows = t, this;
  }
  cols(t) {
    return this._cols = t, this;
  }
  rowHeight(t) {
    return this._rowHeight = t, this;
  }
  colWidth(t) {
    return this._colWidth = t, this;
  }
  startRow(t) {
    return this._startRow = t, this;
  }
  startCol(t) {
    return this._startCol = t, this;
  }
  scrollRows(t) {
    return this._scrollRows = t, this;
  }
  scrollCols(t) {
    return this._scrollCols = t, this;
  }
  row(t) {
    return this._row = t, this;
  }
  col(t) {
    return this._col = t, this;
  }
  cell(t) {
    return this._cell = t, this;
  }
  cellRenderer(t) {
    return this._cellRenderer = t, this;
  }
  formatter(t) {
    return this._formatter = t, this;
  }
  merges(t) {
    return this._merges = t, this;
  }
  styles(t) {
    return this._styles = t, this;
  }
  borders(t) {
    return this._borders = t, this;
  }
  gridline(t) {
    return t && Object.assign(this._gridline, t), this;
  }
  style(t) {
    return t && Object.assign(this._style, t), this;
  }
  rowHeader(t) {
    return t && Object.assign(this._rowHeader, t), this;
  }
  colHeader(t) {
    return t && Object.assign(this._colHeader, t), this;
  }
  headerGridline(t) {
    return t && Object.assign(this._headerGridline, t), this;
  }
  headerStyle(t) {
    return t && Object.assign(this._headerStyle, t), this;
  }
  freeze(t) {
    return t && (this._freeze = et(t).reverse()), this;
  }
  freezeGridline(t) {
    return t && Object.assign(this._freezeGridline, t), this;
  }
  // get methods ---- start ------
  rowHeightAt(t) {
    const { _row: e } = this;
    if (e) {
      const r = e(t);
      if (r) return r.hide === !0 ? 0 : r.height;
    }
    return this._rowHeight;
  }
  colWidthAt(t) {
    const { _col: e } = this;
    if (e) {
      const r = e(t);
      if (r) return r.hide === !0 ? 0 : r.width;
    }
    return this._colWidth;
  }
  get viewport() {
    return this._viewport;
  }
  // get methods ---- end -------
  static create(t, e, r) {
    return new Ze(t, e, r);
  }
}
try {
  window && (window.wolf || (window.wolf = {}), window.wolf.table_renderer = Ze.create);
} catch {
}
class E0 {
  constructor(t, e, r, i, n = () => {
  }) {
    C(this, "_");
    C(this, "_hover");
    C(this, "_line");
    C(this, "_type");
    C(this, "_minValue");
    C(this, "_lineLength");
    C(this, "_cell", null);
    C(this, "_change");
    this._type = t, this._minValue = r, this._lineLength = i, this._change = n, this._ = M("div", `${q}-resizer ${t}`).append(
      this._hover = M("div", "hover").on(
        "mousedown.stop",
        (o) => Jn(this, o)
      ),
      this._line = M("div", "line")
    ), e.append(this._);
  }
  show(t) {
    this._cell = t;
    const { _type: e } = this, { x: r, y: i, width: n, height: o } = t;
    this._.css("left", `${e === "row" ? r : r + n - 5}px`).css("top", `${e === "row" ? i + o - 5 : i}px`).show();
    const c = e === "row" ? "width" : "height";
    this._hover.css(c, `${t[c]}px`), this._line.css(c, `${this._lineLength()}px`);
  }
  hide() {
    this._.hide();
  }
}
function Jn(s, t) {
  const { _type: e, _cell: r, _minValue: i, _: n, _line: o, _change: c } = s;
  let h = 0;
  o.show();
  const l = (x) => {
    t !== null && x.buttons === 1 && r && (e === "row" ? (h += x.movementY, h + r.height >= i ? n.css("top", `${r.y + r.height + h}px`) : h = i - r.height) : (h += x.movementX, h + r.width >= i ? n.css("left", `${r.x + r.width + h}px`) : h = i - r.width));
  }, a = () => {
    qe(document.body, "mousemove", (x) => l(x)), qe(document.body, "mouseup", a), o.hide(), n.hide(), r && h != 0 && c(h, r);
  };
  Ve(document.body, "mousemove", (x) => l(x)), Ve(document.body, "mouseup", a);
}
function to(s) {
  s._rowResizer = new E0(
    "row",
    s._container,
    s._minRowHeight,
    () => s._width(),
    (t, { row: e, height: r }) => {
      s.rowHeight(e, r + t).render(), j.reset(s), s._canvas.focus();
    }
  ), s._colResizer = new E0(
    "col",
    s._container,
    s._minColWidth,
    () => s._height(),
    (t, { col: e, width: r }) => {
      s.colWidth(e, r + t).render(), j.reset(s), s._canvas.focus();
    }
  );
}
const eo = {
  init: to
};
function ro(s, t) {
  let e = '<table xmlns="http://www.w3.org/1999/xhtml" style="border-spacing: 0; border-collapse: collapse;">';
  const r = U.with(t), i = s._data.merges.map((c) => U.with(c)).filter((c) => c.intersects(r)), n = (c, h) => c === "dashed" || c === "dotted" ? `1px ${c} ${h}` : `${c === "thick" ? 3 : c === "medium" ? 2 : 1}px solid ${h}`, o = /* @__PURE__ */ new Map();
  for (const c of s._data.borders) {
    const [h, l, a, x] = c, d = U.with(h);
    if (d.intersects(r)) {
      const { startRow: p, startCol: f, endRow: _, endCol: v } = d;
      d.each((m, u) => {
        const g = n(a, x), w = [];
        l === "all" && w.push("border"), (l === "outside" || l === "left") && u === f && w.push("border-left"), (l === "outside" || l === "right") && u === v && w.push("border-right"), (l === "outside" || l === "top") && m === p && w.push("border-top"), (l === "outside" || l === "bottom") && m === _ && w.push("border-bottom"), (l === "inside" || l === "vertical") && u >= f && u < v && w.push("border-right"), (l === "inside" || l === "horizontal") && m >= p && m < _ && w.push("border-bottom"), w.length > 0 && o.set(
          `${m}_${u}`,
          w.map((b) => `${b}:${g};`).join("")
        );
      });
    }
  }
  return e += "<colgroup>", r.eachCol((c) => {
    e += `<col width="${s.colWidth(c)}"/>`;
  }), e += "</colgroup>", e += "<tbody>", r.eachRow((c) => {
    e += `<tr style="height: ${s.rowHeight(c)}px;">`, r.eachCol((h) => {
      const l = s.cell(c, h), a = U.create(c, h);
      let x = !1, [d, p] = [1, 1];
      for (const f of i) {
        if (f.startRow === c && f.startCol === h) {
          d = f.rows + 1, p = f.cols + 1;
          break;
        }
        if (f.intersects(a)) {
          x = !0;
          break;
        }
      }
      if (!x) {
        const f = mt(l);
        e += "<td", d > 1 && (e += ` rowspan="${d}"`), p > 1 && (e += ` colspan="${p}"`), e += ` cellType="${f}"`;
        let _ = "";
        const v = `${c}_${h}`;
        o.has(v) && (_ += o.get(v)), l && l instanceof Object && l.style !== void 0 && (_ += so(s.style(l.style, !0))), e += `style="${_ ? `${_};` : ""} position: relative;"`;
        const m = mt(l);
        e += xt.use().getRender(m).toHtml(s, l, c, h, e);
      }
    }), e += "</tr>";
  }), `${e}</tbody></table>`;
}
function io(s, t, [e, r]) {
  const i = [0, 0];
  if (t && t.includes("</table>")) {
    const { _data: n } = s, o = n.style, c = document.createElement("template");
    c.innerHTML = t;
    const h = [], l = c.content.querySelectorAll("tr");
    i[0] = e + l.length - 1;
    const a = [];
    if (l.forEach((x, d) => {
      const p = x.querySelectorAll("td");
      d === 0 && (i[1] = r + p.length - 1);
      let f = null;
      const _ = [];
      for (const [m, u] of p.entries()) {
        let [g, w] = [d + e, m + r];
        h.length > 0 && h.forEach((F) => {
          F.containsRow(g) && F.startCol <= w && (w += F.cols, F.startRow !== g && (w += 1));
        });
        const b = Q(w, g);
        let [E, A] = [1, 1];
        if (B0(u, "rowspan", (F) => E = Number.parseInt(F)), B0(u, "colspan", (F) => A = Number.parseInt(F)), E > 1 || A > 1) {
          const F = U.create(g, w, g + E - 1, w + A - 1);
          s.merge(F.toString()), h.push(F);
        }
        d === 0 && (i[1] += A - 1);
        const D = {};
        lt(u, "background-color", "", (F) => D.bgcolor = F), lt(u, "color", o.color, (F) => D.color = F), lt(
          u,
          "text-align",
          o.align,
          (F) => D.align = F
        ), lt(
          u,
          "vertical-align",
          o.valign,
          (F) => D.valign = F
        ), Zt(
          u,
          "white-space",
          "normal",
          (F) => D.textwrap = !0
        ), Zt(
          u,
          "text-decoration",
          "underline",
          (F) => D.underline = !0
        ), Zt(
          u,
          "text-decoration",
          "line-through",
          (F) => D.strikethrough = !0
        ), Zt(u, "font-style", "italic", (F) => D.italic = !0), lt(u, "font-weight", "normal", (F) => {
          (F === "bold" || Number.parseInt(F) >= 700) && (D.bold = !0);
        }), lt(
          u,
          "font-family",
          o.fontFamily,
          (F) => D.fontFamily = F
        ), lt(
          u,
          "font-size",
          o.fontSize,
          (F) => D.fontSize = Number.parseInt(F)
        );
        const k = (F) => {
          const [S, $, ...W] = F.split(" ").map((V) => V.trim());
          let P = "thin";
          if ($ === "solid") {
            let V = Number.parseInt(S);
            S.includes("pt") && (V = Ti(Number.parseInt(S))), V === 2 ? P = "medium" : V === 3 && (P = "thick");
          } else
            P = $;
          return [P, W.join("")];
        }, y = [];
        let B = null;
        lt(u, "border-width", "", (F) => y.push(F)), lt(u, "border-style", "", (F) => y.push(F)), lt(u, "border-color", "", (F) => y.push(F)), y.length >= 3 ? B = [b, "all", ...k(y.join(" "))] : lt(
          u,
          "border",
          "none",
          (F) => B = [b, "all", ...k(F)]
        ) || ["top", "right", "bottom", "left"].forEach((F) => {
          lt(
            u,
            `border-${F}`,
            "none",
            (S) => B = [b, F, ...k(S)]
          );
        }), f === null ? B !== null && (f = B) : B !== null && B[1] === f[1] && B[2] === f[2] && B[3] === f[3] ? f[0] = `${f[0].split(":")[0]}:${b}` : (_.push(f), f = B);
        const H = u.getAttribute("cellType") || "text", T = xt.use().getRender(H).fromHtml(s, u, D);
        Object.keys(T).length > 0 && s.cell(g, w, T);
      }
      f != null && _.push(f);
      const v = a.at(-1);
      if (v && v.length > 0)
        if (v.length === 1 && _.length === 1 && v[0][1] === "all" && v[0][1] === _[0][1] && v[0][2] === _[0][2] && v[0][3] === _[0][3]) {
          const m = U.with(v[0][0]);
          m.endRow += 1, v[0][0] = m.toString();
        } else
          a.push(_);
      else
        a.push(_);
    }), a.length > 0)
      for (const x of a)
        x.forEach((d) => s.addBorder(...d));
  }
  return i;
}
function B0(s, t, e) {
  if (s.hasAttribute(t)) {
    const r = s.getAttribute(t);
    r != null && e(r);
  }
}
function lt(s, t, e, r) {
  const i = s.style.getPropertyValue(t), n = i !== null && i !== "" && i !== e;
  return n && r(i), n;
}
function Zt(s, t, e, r) {
  const i = s.style.getPropertyValue(t);
  i === e && r(i);
}
function so(s) {
  let t = "";
  return s.bgcolor && (t += `background-color: ${s.bgcolor};`), s.color && (t += `color: ${s.color};`), s.align && (t += `text-align: ${s.align};`), s.valign && (t += `vertical-align: ${s.valign};`), s.textwrap === !0 && (t += "white-space: normal;"), s.underline === !0 && (t += "text-decoration: underline;"), s.strikethrough === !0 && (t += "text-decoration: line-through;"), s.bold === !0 && (t += "font-weight: bold;"), s.italic === !0 && (t += "font-style: italic;"), s.fontFamily && (t += `font-family: ${s.fontFamily};`), s.fontSize && (t += `font-size: ${s.fontSize}pt;`), t;
}
class no {
  constructor(t) {
    C(this, "table");
    C(this, "setCutted", !1);
    this.table = t, this.table._canvas.on("mousedown", (e) => this.mousedownHandler(e)).on("mousemove", (e) => this.mousemoveHandler(e)).on("mouseup", (e) => this.mouseUpHandler(e)).on("wheel.prevent", (e) => this.wheelHandler(e)).on("keydown", (e) => this.keydownHandler(e)).on(
      "contextmenu.prevent",
      (e) => this.contextmenuHandler(e)
    ).on("dblclick.prevent", () => {
      St.reset(this.table);
    }), this.initSelectorShadowInput();
  }
  initSelectorShadowInput() {
    const t = this.table._selector, e = t == null ? void 0 : t._shadowInput;
    !t || !e || (e.on("compositionstart", (r) => {
      t._shadowInputLock = !0, e._.value = "", e._.style.width = "auto", r.preventDefault();
    }), e.on("compositionend", (r) => {
      t._shadowInputLock = !1, e._.style.width = "0", e._.value = "", St.reset(this.table, r.data), r.preventDefault();
    }), e.on("keydown", (r) => {
      setTimeout(() => {
        t._shadowInputLock || this.keydownHandler(r);
      }, 0), r.preventDefault();
    }));
  }
  mousedownHandler(t) {
    var c, h;
    if (t.button === 1) return;
    const { _selector: e, _renderer: r, _editor: i, _emitter: n } = this.table, { viewport: o } = r;
    if (i && i.hide(), e && o) {
      const { offsetX: l, offsetY: a, ctrlKey: x, metaKey: d, shiftKey: p } = t, f = o.cellAt(l, a);
      if (f) {
        n.emit("click", f, t);
        const { placement: _, row: v, col: m } = f, u = this.table.cell(v, m);
        if (u) {
          const g = mt(u);
          (h = (c = xt.use().options[g]).clickEvent) == null || h.call(c, this.table, u, f, t);
        }
        p ? j.unionRange(this.table, v, m) : (t.button === 2 && j.isInRange(this.table, v, m) || (e.placement(_), j.addRange(this.table, v, m, !(d || x))), _ === "body" && Ht.autoMove(this.table, e.currentRange)), j.reset(this.table), j.bindMousemove(
          this.table,
          (g, w) => {
            j.unionRange(this.table, g, w);
          },
          (g) => g.currentRange
        ), this.table.render();
      }
    }
  }
  mouseUpHandler(t) {
    var e;
    (e = this.table._selector) != null && e.paintFormatArea && this.eventTrigger("paintFormat");
  }
  mousemoveHandler(t) {
    const { _rowResizer: e, _colResizer: r, _renderer: i } = this.table, { viewport: n } = i, { buttons: o, offsetX: c, offsetY: h } = t;
    if (n && o === 0) {
      const { _rowHeader: l, _colHeader: a } = this.table._renderer;
      if (e && l.width > 0)
        if (c < l.width && h > a.height) {
          const x = n.cellAt(c, h);
          x && e.show(x);
        } else
          e.hide();
      if (r && a.height > 0)
        if (h < a.height && c > l.width) {
          const x = n.cellAt(c, h);
          x && r.show(x);
        } else
          r.hide();
    }
  }
  wheelHandler(t) {
    const { deltaX: e, deltaY: r, shiftKey: i } = t, { _hScrollbar: n, _vScrollbar: o } = this.table;
    Math.abs(e) > Math.abs(r) ? n && n.scrollBy(e) : i && n ? n.scrollBy(r) : !i && o && o.scrollBy(r);
  }
  canInput(t) {
    const { ctrlKey: e, shiftKey: r, metaKey: i, altKey: n, code: o, keyCode: c } = t;
    return e || r || i || n ? !1 : !!(o.startsWith("Key") || o.startsWith("Digit") || o.startsWith("Numpad") && c >= 96 || [
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
  eventTrigger(t, ...e) {
    if (t === "move") {
      const r = e[0], i = e[1] || void 0, n = !!e[2];
      j.move(this.table, n, r, i), this.table._canvas.focus(), this.table.render();
    } else if (t === "copy")
      j.copyValue(this.table);
    else if (t === "cut")
      j.copyValue(this.table), this.setCutted = !0;
    else if (t === "paste") {
      if (this.table._editable) {
        const r = !!e[0];
        j.pasteValue(this.table, r, this.setCutted), this.table._canvas.focus(), this.setCutted = !1;
      }
    } else if (t === "undo")
      this.table._history.undo({ type: "undo", data: this.table.data() }, ({ data: r }) => {
        this.table.data(r), this.table.render();
      });
    else if (t === "redo")
      this.table._history.redo({ type: "redo", data: this.table.data() }, ({ data: r }) => {
        this.table.data(r), this.table.render();
      });
    else if (t === "setStyle")
      j.setCellStyle(this.table, e[0] || {});
    else if (t === "fastStyle") {
      const r = e[0];
      j.fastSetCellStyle(this.table, r);
    } else if (t === "fastFormat") {
      const r = e[0];
      j.fastSetCellFormat(this.table, r);
    } else if (t === "fastFixed") {
      const r = e[0];
      j.fastSetCellFixed(this.table, r);
    } else if (t === "clearCopy")
      j.clearCopy(this.table);
    else if (t === "clearCell") {
      const r = e[0];
      r === "cell" ? j.clearCell(this.table) : r === "value" ? j.clearCellValue(this.table) : r === "style" ? j.fastClearCellStyle(this.table) : r === "format" && j.fastClearCellFormat(this.table);
    } else if (t === "insertRow")
      j.insertRowOrCol(this.table, "row");
    else if (t === "insertCol")
      j.insertRowOrCol(this.table, "col");
    else if (t === "deleteRow")
      j.deleteRowOrCol(this.table, "row");
    else if (t === "deleteCol")
      j.deleteRowOrCol(this.table, "col");
    else if (t === "setBorder") {
      const r = e[0], i = e[1], n = e[2];
      r && i && n && j.setBorder(this.table, { type: r, lineStyle: i, color: n });
    } else t === "clearBorder" ? j.clearBorder(this.table) : t === "merge" ? j.mergeGrid(this.table) : t === "freeze" ? j.freezeGrid(this.table) : t === "paintFormat" && j.paintFormat(this.table);
  }
  keydownHandler(t) {
    const { ctrlKey: e, shiftKey: r, metaKey: i, altKey: n, code: o } = t;
    (o === "Enter" || o === "NumpadEnter") && !e && !i && !n ? this.eventTrigger("move", r ? "up" : "down", 1, !0) : o === "Tab" && !e && !i && !n ? this.eventTrigger("move", r ? "left" : "right", 1, !0) : o.startsWith("Arrow") ? this.eventTrigger(
      "move",
      o.slice(5).toLowerCase(),
      1,
      !r
    ) : o === "KeyX" && (e || i) ? this.eventTrigger("cut") : o === "KeyC" && (e || i) ? this.eventTrigger("copy") : o === "KeyV" && (e || i) ? this.eventTrigger("paste", t.shiftKey) : o === "KeyZ" && (e || i) ? this.eventTrigger("undo") : o === "KeyY" && (e || i) ? this.eventTrigger("redo") : o === "KeyB" && (e || i) ? this.eventTrigger("fastStyle", "bold") : o === "KeyU" && (e || i) ? this.eventTrigger("fastStyle", "underline") : o === "KeyI" && (e || i) ? this.eventTrigger("fastStyle", "italic") : o === "Escape" ? this.eventTrigger("clearCopy") : o === "Backspace" ? this.eventTrigger("clearCell", r ? "style" : "value") : o === "Delete" ? this.eventTrigger("clearCell", "cell") : this.canInput(t) && St.reset(this.table, t.key), t.preventDefault();
  }
  contextmenuHandler(t) {
    this.table._contextMenu.show(t), t.preventDefault();
  }
}
class oo {
  constructor() {
    C(this, "undoItems");
    C(this, "redoItems");
    C(this, "maxSize", 50);
    this.undoItems = [], this.redoItems = [];
  }
  add(t) {
    this.undoItems.length > this.maxSize && this.undoItems.shift(), this.undoItems.push(JSON.stringify(t)), this.redoItems = [];
  }
  canUndo() {
    return this.undoItems.length > 0;
  }
  canRedo() {
    return this.redoItems.length > 0;
  }
  undo(t, e) {
    const { undoItems: r, redoItems: i } = this;
    this.canUndo() && (i.push(JSON.stringify(t)), e(JSON.parse(r.pop())));
  }
  redo(t, e) {
    const { undoItems: r, redoItems: i } = this;
    this.canRedo() && (r.push(JSON.stringify(t)), e(JSON.parse(i.pop())));
  }
}
const ao = (s) => new Promise((t, e) => {
  const r = document.createElement("input");
  r.setAttribute("type", "file"), r.setAttribute("accept", s), r.click(), r.onchange = (i) => {
    if (i.target && i.target.files) {
      const n = i.target.files[0];
      n || e("files.length is zero");
      const o = new FileReader();
      o.onload = function(c) {
        var l;
        const h = (l = c.target) == null ? void 0 : l.result;
        t(h);
      }, o.readAsDataURL(n);
    } else
      e("event error");
  };
});
var Te = { exports: {} }, nr = { exports: {} };
/*!
 * Infinite Scroll v2.0.4
 * measure size of elements
 * MIT license
 */
var A0;
function lo() {
  return A0 || (A0 = 1, function(s) {
    (function(t, e) {
      s.exports ? s.exports = e() : t.getSize = e();
    })(window, function() {
      function e(o) {
        let c = parseFloat(o);
        return o.indexOf("%") == -1 && !isNaN(c) && c;
      }
      let r = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth"
      ];
      function i() {
        let o = {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
          outerWidth: 0,
          outerHeight: 0
        };
        return r.forEach((c) => {
          o[c] = 0;
        }), o;
      }
      function n(o) {
        if (typeof o == "string" && (o = document.querySelector(o)), !(o && typeof o == "object" && o.nodeType)) return;
        let h = getComputedStyle(o);
        if (h.display == "none") return i();
        let l = {};
        l.width = o.offsetWidth, l.height = o.offsetHeight;
        let a = l.isBorderBox = h.boxSizing == "border-box";
        r.forEach((g) => {
          let w = h[g], b = parseFloat(w);
          l[g] = isNaN(b) ? 0 : b;
        });
        let x = l.paddingLeft + l.paddingRight, d = l.paddingTop + l.paddingBottom, p = l.marginLeft + l.marginRight, f = l.marginTop + l.marginBottom, _ = l.borderLeftWidth + l.borderRightWidth, v = l.borderTopWidth + l.borderBottomWidth, m = e(h.width);
        m !== !1 && (l.width = m + // add padding and border unless it's already including it
        (a ? 0 : x + _));
        let u = e(h.height);
        return u !== !1 && (l.height = u + // add padding and border unless it's already including it
        (a ? 0 : d + v)), l.innerWidth = l.width - (x + _), l.innerHeight = l.height - (d + v), l.outerWidth = l.width + p, l.outerHeight = l.height + f, l;
      }
      return n;
    });
  }(nr)), nr.exports;
}
var Pe = { exports: {} }, Ie = { exports: {} }, co = Ie.exports, D0;
function ho() {
  return D0 || (D0 = 1, function(s) {
    (function(t, e) {
      s.exports ? s.exports = e() : t.EvEmitter = e();
    })(typeof window < "u" ? window : co, function() {
      function t() {
      }
      let e = t.prototype;
      return e.on = function(r, i) {
        if (!r || !i) return this;
        let n = this._events = this._events || {}, o = n[r] = n[r] || [];
        return o.includes(i) || o.push(i), this;
      }, e.once = function(r, i) {
        if (!r || !i) return this;
        this.on(r, i);
        let n = this._onceEvents = this._onceEvents || {}, o = n[r] = n[r] || {};
        return o[i] = !0, this;
      }, e.off = function(r, i) {
        let n = this._events && this._events[r];
        if (!n || !n.length) return this;
        let o = n.indexOf(i);
        return o != -1 && n.splice(o, 1), this;
      }, e.emitEvent = function(r, i) {
        let n = this._events && this._events[r];
        if (!n || !n.length) return this;
        n = n.slice(0), i = i || [];
        let o = this._onceEvents && this._onceEvents[r];
        for (let c of n)
          o && o[c] && (this.off(r, c), delete o[c]), c.apply(this, i);
        return this;
      }, e.allOff = function() {
        return delete this._events, delete this._onceEvents, this;
      }, t;
    });
  }(Ie)), Ie.exports;
}
/*!
 * Unidragger v3.0.1
 * Draggable base class
 * MIT license
 */
var fo = Pe.exports, F0;
function xo() {
  return F0 || (F0 = 1, function(s) {
    (function(t, e) {
      s.exports ? s.exports = e(
        t,
        ho()
      ) : t.Unidragger = e(
        t,
        t.EvEmitter
      );
    })(typeof window < "u" ? window : fo, function(e, r) {
      function i() {
      }
      let n = i.prototype = Object.create(r.prototype);
      n.handleEvent = function(a) {
        let x = "on" + a.type;
        this[x] && this[x](a);
      };
      let o, c;
      "ontouchstart" in e ? (o = "touchstart", c = ["touchmove", "touchend", "touchcancel"]) : e.PointerEvent ? (o = "pointerdown", c = ["pointermove", "pointerup", "pointercancel"]) : (o = "mousedown", c = ["mousemove", "mouseup"]), n.touchActionValue = "none", n.bindHandles = function() {
        this._bindHandles("addEventListener", this.touchActionValue);
      }, n.unbindHandles = function() {
        this._bindHandles("removeEventListener", "");
      }, n._bindHandles = function(a, x) {
        this.handles.forEach((d) => {
          d[a](o, this), d[a]("click", this), e.PointerEvent && (d.style.touchAction = x);
        });
      }, n.bindActivePointerEvents = function() {
        c.forEach((a) => {
          e.addEventListener(a, this);
        });
      }, n.unbindActivePointerEvents = function() {
        c.forEach((a) => {
          e.removeEventListener(a, this);
        });
      }, n.withPointer = function(a, x) {
        x.pointerId === this.pointerIdentifier && this[a](x, x);
      }, n.withTouch = function(a, x) {
        let d;
        for (let p of x.changedTouches)
          p.identifier === this.pointerIdentifier && (d = p);
        d && this[a](x, d);
      }, n.onmousedown = function(a) {
        this.pointerDown(a, a);
      }, n.ontouchstart = function(a) {
        this.pointerDown(a, a.changedTouches[0]);
      }, n.onpointerdown = function(a) {
        this.pointerDown(a, a);
      };
      const h = ["TEXTAREA", "INPUT", "SELECT", "OPTION"], l = ["radio", "checkbox", "button", "submit", "image", "file"];
      return n.pointerDown = function(a, x) {
        let d = h.includes(a.target.nodeName), p = l.includes(a.target.type), f = !d || p;
        !this.isPointerDown && !a.button && f && (this.isPointerDown = !0, this.pointerIdentifier = x.pointerId !== void 0 ? (
          // pointerId for pointer events, touch.indentifier for touch events
          x.pointerId
        ) : x.identifier, this.pointerDownPointer = {
          pageX: x.pageX,
          pageY: x.pageY
        }, this.bindActivePointerEvents(), this.emitEvent("pointerDown", [a, x]));
      }, n.onmousemove = function(a) {
        this.pointerMove(a, a);
      }, n.onpointermove = function(a) {
        this.withPointer("pointerMove", a);
      }, n.ontouchmove = function(a) {
        this.withTouch("pointerMove", a);
      }, n.pointerMove = function(a, x) {
        let d = {
          x: x.pageX - this.pointerDownPointer.pageX,
          y: x.pageY - this.pointerDownPointer.pageY
        };
        this.emitEvent("pointerMove", [a, x, d]), !this.isDragging && this.hasDragStarted(d) && this.dragStart(a, x), this.isDragging && this.dragMove(a, x, d);
      }, n.hasDragStarted = function(a) {
        return Math.abs(a.x) > 3 || Math.abs(a.y) > 3;
      }, n.dragStart = function(a, x) {
        this.isDragging = !0, this.isPreventingClicks = !0, this.emitEvent("dragStart", [a, x]);
      }, n.dragMove = function(a, x, d) {
        this.emitEvent("dragMove", [a, x, d]);
      }, n.onmouseup = function(a) {
        this.pointerUp(a, a);
      }, n.onpointerup = function(a) {
        this.withPointer("pointerUp", a);
      }, n.ontouchend = function(a) {
        this.withTouch("pointerUp", a);
      }, n.pointerUp = function(a, x) {
        this.pointerDone(), this.emitEvent("pointerUp", [a, x]), this.isDragging ? this.dragEnd(a, x) : this.staticClick(a, x);
      }, n.dragEnd = function(a, x) {
        this.isDragging = !1, setTimeout(() => delete this.isPreventingClicks), this.emitEvent("dragEnd", [a, x]);
      }, n.pointerDone = function() {
        this.isPointerDown = !1, delete this.pointerIdentifier, this.unbindActivePointerEvents(), this.emitEvent("pointerDone");
      }, n.onpointercancel = function(a) {
        this.withPointer("pointerCancel", a);
      }, n.ontouchcancel = function(a) {
        this.withTouch("pointerCancel", a);
      }, n.pointerCancel = function(a, x) {
        this.pointerDone(), this.emitEvent("pointerCancel", [a, x]);
      }, n.onclick = function(a) {
        this.isPreventingClicks && a.preventDefault();
      }, n.staticClick = function(a, x) {
        let d = a.type === "mouseup";
        d && this.isIgnoringMouseUp || (this.emitEvent("staticClick", [a, x]), d && (this.isIgnoringMouseUp = !0, setTimeout(() => {
          delete this.isIgnoringMouseUp;
        }, 400)));
      }, i;
    });
  }(Pe)), Pe.exports;
}
/*!
 * Draggabilly v3.0.0
 * Make that shiz draggable
 * https://draggabilly.desandro.com
 * MIT license
 */
var uo = Te.exports, R0;
function po() {
  return R0 || (R0 = 1, function(s) {
    (function(t, e) {
      s.exports ? s.exports = e(
        t,
        lo(),
        xo()
      ) : t.Draggabilly = e(
        t,
        t.getSize,
        t.Unidragger
      );
    })(
      typeof window < "u" ? window : uo,
      function(e, r, i) {
        function n() {
        }
        let o = e.jQuery;
        function c(f, _) {
          this.element = typeof f == "string" ? document.querySelector(f) : f, o && (this.$element = o(this.element)), this.options = {}, this.option(_), this._create();
        }
        let h = c.prototype = Object.create(i.prototype);
        h.option = function(f) {
          this.options = {
            ...this.options,
            ...f
          };
        };
        const l = ["relative", "absolute", "fixed"];
        h._create = function() {
          this.position = {}, this._getPosition(), this.startPoint = { x: 0, y: 0 }, this.dragPoint = { x: 0, y: 0 }, this.startPosition = { ...this.position };
          let f = getComputedStyle(this.element);
          l.includes(f.position) || (this.element.style.position = "relative"), this.on("pointerDown", this.handlePointerDown), this.on("pointerUp", this.handlePointerUp), this.on("dragStart", this.handleDragStart), this.on("dragMove", this.handleDragMove), this.on("dragEnd", this.handleDragEnd), this.setHandles(), this.enable();
        }, h.setHandles = function() {
          let { handle: f } = this.options;
          typeof f == "string" ? this.handles = this.element.querySelectorAll(f) : typeof f == "object" && f.length ? this.handles = f : f instanceof HTMLElement ? this.handles = [f] : this.handles = [this.element];
        };
        const a = ["dragStart", "dragMove", "dragEnd"];
        let x = h.emitEvent;
        h.emitEvent = function(f, _) {
          if (!this.isEnabled && a.includes(f)) return;
          x.call(this, f, _);
          let m = e.jQuery;
          if (!m || !this.$element) return;
          let u, g = _;
          _ && _[0] instanceof Event && ([u, ...g] = _);
          let b = m.Event(u);
          b.type = f, this.$element.trigger(b, g);
        }, h._getPosition = function() {
          let f = getComputedStyle(this.element), _ = this._getPositionCoord(f.left, "width"), v = this._getPositionCoord(f.top, "height");
          this.position.x = isNaN(_) ? 0 : _, this.position.y = isNaN(v) ? 0 : v, this._addTransformPosition(f);
        }, h._getPositionCoord = function(f, _) {
          if (f.includes("%")) {
            let v = r(this.element.parentNode);
            return v ? parseFloat(f) / 100 * v[_] : 0;
          }
          return parseInt(f, 10);
        }, h._addTransformPosition = function(f) {
          let _ = f.transform;
          if (!_.startsWith("matrix")) return;
          let v = _.split(","), m = _.startsWith("matrix3d") ? 12 : 4, u = parseInt(v[m], 10), g = parseInt(v[m + 1], 10);
          this.position.x += u, this.position.y += g;
        }, h.handlePointerDown = function(f, _) {
          this.isEnabled && (this.pointerDownPointer = {
            pageX: _.pageX,
            pageY: _.pageY
          }, f.preventDefault(), document.activeElement.blur(), this.bindActivePointerEvents(f), this.element.classList.add("is-pointer-down"));
        }, h.handleDragStart = function() {
          this.isEnabled && (this._getPosition(), this.measureContainment(), this.startPosition.x = this.position.x, this.startPosition.y = this.position.y, this.setLeftTop(), this.dragPoint.x = 0, this.dragPoint.y = 0, this.element.classList.add("is-dragging"), this.animate());
        }, h.measureContainment = function() {
          let f = this.getContainer();
          if (!f) return;
          let _ = r(this.element), v = r(f), {
            borderLeftWidth: m,
            borderRightWidth: u,
            borderTopWidth: g,
            borderBottomWidth: w
          } = v, b = this.element.getBoundingClientRect(), E = f.getBoundingClientRect(), A = m + u, D = g + w, k = this.relativeStartPosition = {
            x: b.left - (E.left + m),
            y: b.top - (E.top + g)
          };
          this.containSize = {
            width: v.width - A - k.x - _.width,
            height: v.height - D - k.y - _.height
          };
        }, h.getContainer = function() {
          let f = this.options.containment;
          return f ? f instanceof HTMLElement ? f : typeof f == "string" ? document.querySelector(f) : this.element.parentNode : void 0;
        }, h.handleDragMove = function(f, _, v) {
          if (!this.isEnabled) return;
          let m = v.x, u = v.y, g = this.options.grid, w = g && g[0], b = g && g[1];
          m = d(m, w), u = d(u, b), m = this.containDrag("x", m, w), u = this.containDrag("y", u, b), m = this.options.axis == "y" ? 0 : m, u = this.options.axis == "x" ? 0 : u, this.position.x = this.startPosition.x + m, this.position.y = this.startPosition.y + u, this.dragPoint.x = m, this.dragPoint.y = u;
        };
        function d(f, _, v) {
          return _ ? (v = v || "round", Math[v](f / _) * _) : f;
        }
        h.containDrag = function(f, _, v) {
          if (!this.options.containment) return _;
          let m = f == "x" ? "width" : "height", u = this.relativeStartPosition[f], g = d(-u, v, "ceil"), w = this.containSize[m];
          return w = d(w, v, "floor"), Math.max(g, Math.min(w, _));
        }, h.handlePointerUp = function() {
          this.element.classList.remove("is-pointer-down");
        }, h.handleDragEnd = function() {
          this.isEnabled && (this.element.style.transform = "", this.setLeftTop(), this.element.classList.remove("is-dragging"));
        }, h.animate = function() {
          this.isDragging && (this.positionDrag(), requestAnimationFrame(() => this.animate()));
        }, h.setLeftTop = function() {
          let { x: f, y: _ } = this.position;
          this.element.style.left = `${f}px`, this.element.style.top = `${_}px`;
        }, h.positionDrag = function() {
          let { x: f, y: _ } = this.dragPoint;
          this.element.style.transform = `translate3d(${f}px, ${_}px, 0)`;
        }, h.setPosition = function(f, _) {
          this.position.x = f, this.position.y = _, this.setLeftTop();
        }, h.enable = function() {
          this.isEnabled || (this.isEnabled = !0, this.bindHandles());
        }, h.disable = function() {
          this.isEnabled && (this.isEnabled = !1, this.isDragging && this.dragEnd(), this.unbindHandles());
        };
        const p = ["transform", "left", "top", "position"];
        return h.destroy = function() {
          this.disable(), p.forEach((f) => {
            this.element.style[f] = "";
          }), this.unbindHandles(), this.$element && this.$element.removeData("draggabilly");
        }, h._init = n, o && o.bridget && o.bridget("draggabilly", c), c;
      }
    );
  }(Te)), Te.exports;
}
var _o = po();
const vo = /* @__PURE__ */ K0(_o);
class ii {
  constructor(t, e = {}) {
    C(this, "content");
    C(this, "mask", M("div", `${q}-dialog-mask`).hide());
    C(this, "container", M("div", `${q}-dialog`));
    C(this, "closeIcon", M("span", `${q}-dialog__header_close`).append(M("div", "icon")));
    C(this, "containerHeader", M("div", `${q}-dialog__header`).append(
      M("div", `${q}-dialog__header__title`),
      this.closeIcon
    ));
    C(this, "containerBody", M("div", `${q}-dialog__body`));
    C(this, "containerFooter", M("div", `${q}-dialog__footer`));
    C(this, "hasInserted", !1);
    C(this, "visible", !1);
    C(this, "conf");
    Array.isArray(t) ? this.content = M("div").append(...t) : this.content = t, this.conf = e, this.initContiner(), e != null && e.delayGenerate || this.insertContent();
  }
  initContiner() {
    this.container.append(this.containerHeader, this.containerBody, this.containerFooter), this.mask.append(this.container), this.mask.on("click", () => {
      this.conf.disableMask || (this.conf.closeOnClickMask || this.conf.closeOnClickMask === void 0) && this.close();
    }), this.closeIcon.on("click", () => {
      this.close();
    }), this.container.on("click", (t) => {
      t.stopPropagation();
    }), this.conf.draggable && (new vo(this.container._, {
      handle: `.${q}-dialog__header`
    }), this.container.addCss("is-draggable")), this.render();
  }
  insertContent() {
    this.hasInserted || (this.containerBody.append(this.content), this.conf.to ? this.conf.to.append(this.mask._) : document.body.appendChild(this.mask._));
  }
  updateConfig(t) {
    t.to = void 0, this.conf = {
      ...this.conf,
      ...t
    }, this.render();
  }
  render() {
    var t, e, r, i, n, o;
    (t = this.conf) != null && t.maskColor && this.mask.css("background", this.conf.maskColor), (e = this.conf) != null && e.disableMask ? (this.mask.css("pointer-events", "none"), this.container.css("pointer-events", "auto"), this.mask.css("background", "transparent")) : this.mask.css("pointer-events", "auto"), (r = this.conf) != null && r.title && ((n = this.containerHeader.firstChild) == null || n.textContent((i = this.conf) == null ? void 0 : i.title)), (o = this.conf) != null && o.width && this.container.css("width", this.conf.width);
  }
  show() {
    this.insertContent(), this.mask.show(), this.container.css("top", "50%"), this.container.css("left", "50%"), this.container.css("transform", "translate(-50%, -50%)"), this.visible = !0;
  }
  close() {
    this.conf.onBeforeClose && this.conf.onBeforeClose() === !1 || (this.mask.hide(), this.visible = !1);
  }
}
class si {
  constructor(t, e) {
    C(this, "_");
    C(this, "configs");
    C(this, "form", {});
    C(this, "fieldsDict", {});
    this.configs = t, this.form = e, this.configs.t || (this.configs.t = (r) => r), this._ = M("form", `${q}-form`), this.render();
  }
  render() {
    this._.html(""), this.fieldsDict = {}, this.configs.fields.forEach((t) => {
      var c;
      let e;
      const r = M("div", `${q}-form-item`);
      this.configs.labelPosition === "left" ? r.addCss(`${q}-form-item--left`) : this.configs.labelPosition === "right" ? r.addCss(`${q}-form-item--right`) : this.configs.labelPosition === "top" && r.addCss(`${q}-form-item--top`);
      const i = M("label", `${q}-form-item__label`).html(
        this.configs.t(t.label)
      ), n = M("div", `${q}-form-item__content`), o = M("div", `${q}-form-item__error`);
      (c = t.component) != null && c._ && (t.component.setValue(this.form[t.prop]), n.append(t.component._), t.component.render(), t.rules && (e = () => new Promise((h, l) => {
        t.rules.validator(t.component.getValue(), (a) => {
          if (a)
            throw console.log(a.message, this.configs.t(a.message)), n.addCss(`${q}-form-item__content--error`), o.html(this.configs.t(a.message)), l({ prop: t.prop, message: a.message }), new Error(a.message);
          n.removeCss(
            `${q}-form-item__content--error`
          ), o.textContent(""), h();
        });
      }), t.rules.required && i.addCss(`${q}-form-item__label--required`), t.component.on("blur", () => {
        e();
      }))), r.append(i, n, o), this._.append(r), this.fieldsDict[t.prop] = {
        labelElement: i,
        contentElement: t.component,
        validator: e
      };
    });
  }
  getValue(t) {
    for (const e in this.fieldsDict) {
      const r = this.fieldsDict[e];
      r.contentElement && (this.form[e] = r.contentElement.getValue());
    }
    return t ? this.form[t] : this.form;
  }
  setValue(t) {
    for (const e in t)
      if (this.form[e] = t[e], this.fieldsDict[e]) {
        const r = this.fieldsDict[e];
        r.contentElement && r.contentElement.setValue(t[e]);
      }
  }
  validate(t) {
    const e = [];
    let r = [];
    return t ? (typeof t == "string" && (t = [t]), r = this.configs.fields.filter((i) => t == null ? void 0 : t.includes(i.prop))) : r = this.configs.fields, r.forEach((i) => {
      this.fieldsDict[i.prop] && this.fieldsDict[i.prop].validator && e.push(this.fieldsDict[i.prop].validator());
    }), Promise.all(e);
  }
}
class ni {
  constructor(t) {
    C(this, "_", M("div"));
    C(this, "onRender", (t) => {
    });
    this.onRender = t || this.onRender;
  }
  setValue(t) {
    this._.value(String(t));
  }
  getValue() {
    return this._.value();
  }
  on(t, e) {
    this._.on(t, e);
  }
  render() {
    this.onRender(this);
  }
}
class ur extends ni {
  constructor(e, r) {
    super();
    C(this, "configs", {});
    C(this, "input", M("input", `${q}-form-item--input`));
    C(this, "render", () => {
      this.configs.placeholder && this.input.attr("placeholder", this.configs.placeholder), this.configs.onRender && this.configs.onRender(this);
    });
    this.configs = r || {}, this._ = M("div", [`${q}-form-item--input_wrapper`, "form-item--container"]), this._.append(this.input), this.configs.suffix && (this._.addCss(`${q}-form-item--input_wrapper--suffix`), this._.append(
      M("div", `${q}-form-item--input_wrapper--suffix-container`).append(
        this.configs.suffix
      )
    )), e && this.setValue(e), this.render();
  }
  getValue() {
    return this.input.value();
  }
  setValue(e) {
    this.input.value(String(e));
  }
  on(e, r) {
    this.input.on(e, r);
  }
}
class Lt {
  constructor(t, e = "default", r) {
    C(this, "_", M("button", `${q}-bse-button`).attr("type", "button"));
    C(this, "configs");
    C(this, "baseName");
    this._.addCss(`${q}-bse-button--${e}`), this._.on("click", (i) => {
      var n, o;
      (n = this.configs) != null && n.onClick && !this.configs.disabled && ((o = this.configs) == null || o.onClick()), i.preventDefault();
    }), this.baseName = t, this.configs = r, this.render();
  }
  render() {
    var t, e, r;
    typeof this.baseName == "string" ? this._.textContent(this.baseName) : this._.append(this.baseName), (t = this.configs) != null && t.padding && this._.css("padding", this.configs.padding), (e = this.configs) != null && e.disabled ? this._.addCss("is-disabled") : this._.removeCss("is-disabled"), (r = this.configs) != null && r.noneBorder && this._.addCss("none-border");
  }
}
class go {
  constructor(t) {
    C(this, "_");
    this._ = M("div", `${q}-icon`).append(M("div", ["icon", t]));
  }
}
class Co {
  constructor(t, e) {
    C(this, "formInstance");
    C(this, "formContainer", M("div"));
    C(this, "footer", M("div"));
    C(this, "dialog");
    C(this, "cellAreaDialog");
    C(this, "table");
    C(this, "t");
    C(this, "data", {
      cellRange: "",
      options: []
    });
    C(this, "configs");
    this.table = t, this.t = t._i18n.t, this.configs = e, this.cellAreaDialog = new wo(this.table, {
      onBeforceCallback: () => (this.dialog.show(), !0),
      onSubmitCallback: (r) => {
        var i, n;
        (i = this.formInstance) == null || i.setValue({ cellRange: r }), (n = this.formInstance) == null || n.validate("cellRange"), this.dialog.close();
      }
    }), this.dialog = new ii([this.formContainer, this.footer], {
      title: this.t("validators.dataValidator"),
      width: "480px",
      draggable: !0,
      onBeforeClose: () => {
        if (this.configs.onBeforceCloseCallback)
          return this.configs.onBeforceCloseCallback();
      }
    });
  }
  renderForm() {
    this.formContainer.html(""), this.formInstance = new si(
      {
        labelPosition: "top",
        fields: [
          {
            label: this.t("validators.cellRange"),
            prop: "cellRange",
            component: (() => {
              const t = new Lt(new go("border-all")._, "default", {
                noneBorder: !0,
                padding: "0",
                onClick: () => {
                  this.dialog.close(), this.cellAreaDialog.show("");
                }
              });
              return t._.css("height", "100%"), new ur("", {
                placeholder: this.t("validators.pleaseInputCellRange"),
                suffix: t._
              });
            })(),
            rules: {
              required: !0,
              validator: this.cellAreaDialog.validator
            }
          },
          {
            label: this.t("validators.validatorType"),
            prop: "options",
            component: new mo([], {
              onRender: (t) => {
                t.editInputElement.configs.placeholder = this.table._i18n.t(
                  "validators.pressEnterCreate"
                ), t.editInputElement.render();
              }
            }),
            rules: {
              validator: (t, e) => {
                const r = [];
                t.length === 0 && e(new Error(this.t("validators.nullOption"))), t.forEach((i) => {
                  i || e(new Error(this.t("validators.emptyOption"))), r.includes(i) ? e(new Error(this.t("validators.duplicateOption"))) : r.push(i);
                }), e();
              }
            }
          }
        ]
      },
      this.data
    ), this.formContainer.append(this.formInstance._);
  }
  renderFooter() {
    this.footer.html("");
    const t = M("div").css("display", "flex").css("flex-direction", "row-reverse").append(
      (() => {
        const e = new Lt(this.t("common.ok"), "primary", {
          onClick: () => {
            var r;
            (r = this.formInstance) == null || r.validate().then(() => {
              var i;
              this.configs.onSubmitCallback && this.configs.onSubmitCallback((i = this.formInstance) == null ? void 0 : i.getValue()), this.dialog.close();
            }).catch((i) => {
              console.error(i);
            });
          }
        });
        return e._.css("margin-left", "10px"), e._;
      })(),
      new Lt(this.t("common.cancel"), "default", {
        onClick: () => {
          this.dialog.close();
        }
      })._
    );
    this.footer.append(t);
  }
  render() {
    this.dialog.conf.title = this.t("validators.dataValidator"), this.renderForm(), this.renderFooter(), this.dialog.render();
  }
  show(t) {
    this.data = JSON.parse(JSON.stringify(t)), this.render(), this.dialog.show();
  }
  close() {
    this.dialog.close();
  }
}
class wo {
  constructor(t, e) {
    C(this, "input");
    C(this, "form", M("div"));
    C(this, "footer", M("div"));
    C(this, "dialog");
    C(this, "table");
    C(this, "onBeforceCallback");
    C(this, "onSubmitCallback");
    C(this, "updateValue", (t) => {
      if (Array.isArray(t)) {
        const [e, r] = t;
        this.input.setValue(Q(r, e));
      } else
        console.log("update value", t), this.input.setValue(
          `${Q(t.startCol, t.startRow)}:${Q(t.endCol, t.endRow)}`
        );
    });
    C(this, "validator", (t, e) => {
      if (!t)
        return e(new Error(this.table._i18n.t("cellRangeDialog.unselectRange")));
      const r = t.split(":");
      if (r.length > 2 || !kr(r[0]) || r[1] && !kr(r[1]))
        return e(new Error(this.table._i18n.t("cellRangeDialog.formatError")));
      if (r.length === 2) {
        const i = et(r[0]), n = et(r[1]);
        if (i[0] > n[0] || i[1] > n[1])
          return e(new Error(this.table._i18n.t("cellRangeDialog.formatError")));
      }
      e();
    });
    this.table = t, this.input = new ur("", {
      placeholder: this.table._i18n.t("cellRangeDialog.placeholder")
    }), this.dialog = new ii([this.form, this.footer], {
      title: t._i18n.t("validators.selectCellRange"),
      width: "300px",
      draggable: !0,
      disableMask: !0,
      onBeforeClose: () => (this.table._emitter.off("selectorMove", this.updateValue), this.table._emitter.off("updateFocusRange", this.updateValue), this.onBeforceCallback())
    }), this.onBeforceCallback = e.onBeforceCallback ? e.onBeforceCallback : () => !0, this.onSubmitCallback = e.onSubmitCallback;
  }
  render() {
    this.input.configs.placeholder = this.table._i18n.t("cellRangeDialog.placeholder"), this.input.render(), this.form.html("");
    const t = new si(
      {
        labelPosition: "top",
        fields: [
          {
            label: "",
            prop: "cellRange",
            component: this.input,
            rules: {
              validator: this.validator
            }
          }
        ]
      },
      {}
    );
    this.form.append(t._), this.footer.html(""), this.footer.append(
      M("div").css("display", "flex").css("flex-direction", "row-reverse").append(
        (() => {
          const e = new Lt(this.table._i18n.t("common.ok"), "primary", {
            onClick: () => {
              t.validate().then(() => {
                this.onSubmitCallback && this.onSubmitCallback(this.input.getValue()), this.dialog.close();
              }).catch((r) => {
                console.error(r);
              });
            }
          });
          return e._.css("margin-left", "10px"), e._;
        })(),
        new Lt(
          this.table._i18n.t("common.cancel"),
          "default",
          {
            onClick: () => this.dialog.close()
          }
        )._
      )
    ), this.dialog.conf.title = this.table._i18n.t("validators.selectCellRange"), this.dialog.render();
  }
  show(t) {
    this.render(), this.input.setValue(t), this.table._emitter.on("selectorMove", this.updateValue), this.table._emitter.on("updateFocusRange", this.updateValue), this.dialog.show();
  }
}
class mo extends ni {
  constructor(e, r = {}) {
    super();
    C(this, "_", M("div", [
      `${q}-form-item--edit-select-container`,
      "form-item--container"
    ]));
    C(this, "listElement", M("div", `${q}-form-item--edit-select-list`));
    C(this, "editElement", M("div", `${q}-form-item--edit-select-input`));
    C(this, "editInputElement", new ur());
    C(this, "options", []);
    C(this, "configs", {});
    this.configs = r, this.setValue(e || []), this.editInputElement.on("keyup", (i) => {
      const n = i;
      if (n.key === "Enter") {
        const o = this.editInputElement.getValue();
        o && (this.options.includes(o) || (this.options.push(o), this.render()), this.editInputElement.setValue(""));
      }
      n.preventDefault();
    });
  }
  getValue() {
    return this.options;
  }
  setValue(e) {
    if (!Array.isArray(e))
      throw new Error("value must be array");
    this.options = e, this.editElement.append(this.editInputElement._), this._.append(this.listElement, this.editElement), this.render();
  }
  render() {
    this.listElement.html(""), this.options.forEach((e, r) => {
      const i = M("div", "item-option"), n = M("input", "item-option-input");
      n.value(e);
      const o = M("span", "delete-icon");
      o.on("click", (c) => {
        c.preventDefault(), this.options.splice(r, 1), this.render();
      }), n.on("blur", () => {
        this.options[r] = n.value();
        const c = this.options.indexOf(n.value());
        c !== -1 && c !== r ? n.addCss("is-error") : n.removeCss("is-error");
      }), i.append(n, o), this.listElement.append(i);
    }), this.configs.onRender && this.configs.onRender(this);
  }
}
class bo {
  constructor(t) {
    C(this, "table");
    C(this, "_contextElement");
    C(this, "hiddenOption", []);
    C(this, "_extendOptions", []);
    C(this, "validatorSelectDialogEvents");
    C(this, "options", () => [
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
        label: this.table._i18n.t("insert"),
        children: [
          {
            id: "insertPicture",
            label: this.table._i18n.t("insert_pictures"),
            action: async (t, e) => {
              try {
                const r = await ao("image/*"), i = Yt.use().savePicture(r);
                j.setCellValue(e, {
                  type: "image",
                  valueType: "local",
                  value: i
                }), e.render();
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
        type: "tree",
        id: "validators",
        label: this.table._i18n.t("dataValidator"),
        children: [
          {
            id: "validatorSelector",
            label: this.table._i18n.t("selectorOptions"),
            action: () => {
              this.validatorSelectDialogEvents.show();
            }
          }
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
        type: "tree",
        id: "deleteTree",
        label: this.table._i18n.t("delete"),
        children: [
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
        ]
      }
    ]);
    C(this, "hide", (t) => {
      t.srcElement.className.includes("context-item--disabled") || t.srcElement.className.includes("context-item-tree") || t.srcElement.className.includes("divider") || setTimeout(() => {
        this._contextElement.css("display", "none"), window.removeEventListener("click", this.hide);
      }, 0);
    });
    C(this, "appendOption", (t) => {
      this._extendOptions.push(t);
    });
    C(this, "removeOption", (t) => {
      const e = this._extendOptions.findIndex((r) => !r.type && r.id === t);
      e !== -1 && this._extendOptions.splice(e, 1);
    });
    this.table = t, this.validatorSelectDialogEvents = {
      instance: new Co(this.table, {
        onSubmitCallback: (e) => {
          const r = (n, o) => {
            let c = "";
            const h = this.table.cellValueString(n, o);
            h && e.options.includes(h) && (c = h), this.table.cell(n, o, {
              type: "select",
              value: c,
              options: e.options
            });
          }, i = e.cellRange.split(":");
          if (i.length === 1) {
            const [n, o] = et(i[0]);
            r(o, n);
          } else {
            const [n, o] = et(i[0]), [c, h] = et(i[1]);
            this.table.eachRange([o, n], [h, c], (l, a) => {
              r(l, a);
            });
          }
          this.table.render();
        }
      }),
      show() {
        var i;
        let e = "", r = [];
        if (this.instance.table._selector) {
          e = (i = this.instance.table._selector) == null ? void 0 : i.getFocusExpr().join(":");
          const n = this.instance.table.cell(
            ...this.instance.table._selector._focus
          );
          (n == null ? void 0 : n.type) === "select" && (n != null && n.options) && (r = n.options);
        }
        this.instance.show({ cellRange: e, options: r });
      },
      close() {
        this.instance.close();
      }
    }, this._contextElement = M("ul", `${q}-context-menu`), this._contextElement.hide(), this.table._container.append(this._contextElement);
  }
  async show(t) {
    this._contextElement.css("top", `${t.layerY + 5}px`), this._contextElement.css("left", `${t.layerX + 5}px`);
    const e = (a) => {
      if (a === void 0) return new Promise((x) => x(!1));
      if (typeof a == "boolean") return new Promise((x) => x(a));
      if (typeof a == "function") {
        const x = a(this.table);
        return Object.prototype.toString.call(x) === "[object Promise]" ? x : new Promise((d) => d(x));
      }
      return new Promise((x) => x(!1));
    };
    let r;
    typeof this.hiddenOption == "function" ? r = this.hiddenOption(this.table) : r = this.hiddenOption, this._contextElement.html("");
    let i = 0;
    const n = [...this.options(), ...this._extendOptions], o = async (a) => {
      const x = ["context-item"], d = await e(a.disable);
      a.type === "tree" && x.push("context-item-tree"), d && x.push("context-item--disabled");
      const p = M("li", x);
      if (a.type === "tree") {
        const f = M("div", "label-container").html(
          `<span class="label">${a.label}</span> <span class="arrow"><span class="icon arrow-right"></span> </span>`
        ), _ = M("div", ["tree-list", `${q}-context-menu`]);
        for (const m of a.children)
          _.append(await o(m));
        let v = null;
        p.on("mouseenter", () => {
          v !== null && clearInterval(v), _.css("display", "block");
          const m = p._.getBoundingClientRect();
          document.body.clientWidth - m.right < _._.clientWidth && (_.css("left", "calc(-100%)"), _.css("margin-left", "-5px"));
        }), p.on("mouseleave", () => {
          v = setTimeout(() => {
            _.css("display", "none");
          }, 100);
        }), p.append(f, _);
      } else {
        const f = `<span class="label">${a.label}</span> <span class="shortcut">${a.shortcut || ""}</span>`;
        p.html(f);
      }
      return !d && a.action && p.on(
        "click",
        (f) => a.action(f, this.table)
      ), p;
    };
    for (const a of n)
      a.type === "div" ? i > 0 && (this._contextElement.append(M("div", "divider")), i = 0) : !await e(a.hidden) && !r.includes(a.id) && (this._contextElement.append(await o(a)), i++);
    this._contextElement.show();
    const c = this.table._width(), h = this.table._height(), l = this._contextElement.offset();
    t.layerY + l.height > h && this._contextElement.css("top", `${h - l.height - 20}px`), t.layerX + l.width > c && this._contextElement.css(
      "left",
      `${c - l.width - (c - t.layerX)}px`
    ), window.addEventListener("click", this.hide);
  }
}
const yo = {
  common: {
    ok: "OK",
    cancel: "Cancel"
  },
  cut: "Cut",
  copy: "Copy",
  paste: "Paste",
  undo: "Undo",
  redo: "Redo",
  onlyPasteValue: "Paste Values Only",
  delete: "Delete",
  paintformat: "Format Painter",
  clearformat: "Clear Formatting",
  valueformat: "Data Format",
  increase_dicimal: "Increase Decimal",
  reduce_dicimal: "Decrease Decimal",
  // Fixed translation from original Chinese
  fontFamily: "Font",
  fontSize: "Font Size",
  fontBold: "Bold",
  fontItalic: "Italic",
  fontStrike: "Strikethrough",
  fontUnderline: "Underline",
  fontAlign: "Horizontal Alignment",
  fontVerticalAlign: "Vertical Alignment",
  fontAutoWrap: "Wrap Text",
  fontColor: "Font Color",
  bgColor: "Background Color",
  border: "Borders",
  mergeCell: "Merge Cells",
  freezeCell: "Freeze Cells",
  insertRow: "Insert Row",
  insertCol: "Insert Column",
  deleteRow: "Delete Row",
  deleteCol: "Delete Column",
  deleteValue: "Clear Contents",
  deleteStyle: "Clear Styles",
  deleteCell: "Delete Cells",
  theme_color: "Theme Colors",
  insert: "Insert",
  insert_others: "Insert Other",
  insert_pictures: "Insert Picture",
  dataValidator: "Data Validation",
  selectorOptions: "Dropdown Options",
  formats: {
    normal: "General",
    text: "Text",
    number: "Number",
    scientific: "Scientific",
    percent: "Percentage",
    CNY: "CNY",
    USD: "USD",
    EUR: "EUR",
    shortDate: "Short Date",
    longDate: "Long Date",
    time: "Time"
  },
  validators: {
    dataValidator: "Data Validation",
    selectCellRange: "Select Cell Range",
    cellRange: "Cell Range",
    validatorType: "List Options",
    pleaseInputCellRange: "Please enter a cell range",
    pressEnterCreate: "Press Enter to add option",
    pleaseSetOptions: "Please set options",
    duplicateOption: "Duplicate option",
    emptyOption: "Option cannot be empty",
    nullOption: "At least one option required"
  },
  cellRangeDialog: {
    placeholder: "Select cells with mouse or input range directly",
    unselectRange: "No range selected",
    formatError: "Invalid format"
  }
}, Eo = {
  common: {
    ok: "确定",
    cancel: "取消"
  },
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
  insert: "插入",
  insert_others: "插入其他",
  insert_pictures: "插入图片",
  dataValidator: "数据验证",
  selectorOptions: "下拉选项",
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
  },
  validators: {
    dataValidator: "数据验证",
    selectCellRange: "选择单元格范围",
    cellRange: "单元格范围",
    validatorType: "选项列表",
    pleaseInputCellRange: "请输入一个单元格范围",
    pressEnterCreate: "按回车键添加选项",
    pleaseSetOptions: "请设置选项",
    duplicateOption: "选项不能重复",
    emptyOption: "选项不能为空",
    nullOption: "请至少提供一个选项"
  },
  cellRangeDialog: {
    placeholder: "用鼠标框选单元格，或直接输入范围",
    unselectRange: "未设置范围",
    formatError: "格式错误"
  }
}, qt = class qt {
  constructor() {
    C(this, "_currentLang", "en");
    C(this, "changeCallbacks", []);
    C(this, "t", (t) => {
      let e = this._currentLang;
      return qt.messages[e] || (console.error(`fail to use lang: ${this._currentLang}, auto use english`), e = "en"), this._deepValue(t, e);
    });
    return this;
  }
  _deepValue(t, e) {
    const r = t.split(".");
    let i = qt.messages[e];
    for (const n of r)
      if (i[n] !== void 0)
        i = i[n];
      else {
        e !== "en" ? i = this._deepValue(t, "en") : i = t;
        break;
      }
    return i;
  }
  changeLang(t) {
    this._currentLang = t, this.changeCallbacks.forEach((e) => {
      e && e();
    });
  }
  currentLang() {
    return this._currentLang;
  }
  onChange(t) {
    return this.changeCallbacks.push(t), this.changeCallbacks.length - 1;
  }
  clearOnChange(t) {
    this.changeCallbacks[t] && (this.changeCallbacks[t] = null);
  }
};
C(qt, "messages", {
  en: yo,
  zh: Eo
});
let hr = qt;
class rt {
  constructor(t) {
    C(this, "table");
    C(this, "_");
    C(this, "_tooltip", null);
    C(this, "hidden", !1);
    C(this, "disabled", !1);
    this.table = t, this._ = M("div", "button-container");
  }
  update() {
  }
  action(t) {
  }
  tooltip(t) {
    return setTimeout(() => {
      let e = "";
      typeof t == "string" ? e = t : e = t.title;
      let r = `<div style="padding: 6px"><span>${e}</span>`;
      t instanceof Object && t.shortkey && (r += `<span style="margin-left: 5px; font-size: 12px">${t.shortkey}</span>`), r += "</div>", this._tooltip = M("div", "tooltips").html(r).css("position", "absolute").css("top", "40px").css("z-index", "999").css("background", "#fff").hide();
      let i = null;
      const n = typeof t == "string" ? void 0 : t.delay;
      this._.on("mouseenter", () => {
        i && clearTimeout(i), i = setTimeout(() => {
          var o;
          (o = this._tooltip) == null || o.show();
        }, n ?? 500);
      }), this._.on("mouseleave", () => {
        var o;
        i && clearTimeout(i), (o = this._tooltip) == null || o.hide();
      }), this._.append(this._tooltip);
    }, 100), this;
  }
}
class Dt extends rt {
  constructor(e) {
    super(e);
    C(this, "table");
    this.table = e, this._.append(M("div", `${q}-hm-divider`).css("margin-left", "3px"));
  }
}
class Bo extends rt {
  constructor(e) {
    super(e);
    C(this, "table");
    C(this, "button");
    this.table = e, this.button = M("div", `${q}-hm-button`).append(
      M("div", `${q}-icon`).html('<div class="icon undo"></div>')
    ), this._.append(this.button), this.button.on("click", (r) => this.action(r));
  }
  update() {
    this.disabled = !this.table._history.canUndo(), this.disabled ? this.button._.classList.add("disabled") : this.button._.classList.remove("disabled");
  }
  action(e) {
    this.disabled || this.table._events.eventTrigger("undo");
  }
}
class Ao extends rt {
  constructor(e) {
    super(e);
    C(this, "table");
    C(this, "button");
    this.table = e, this.button = M("div", `${q}-hm-button`);
    const r = M("div", `${q}-icon`);
    r.html('<div class="icon redo"></div>'), this._.append(this.button.append(r)), this.button.on("click", (i) => this.action(i));
  }
  update() {
    this.disabled = !this.table._history.canRedo(), this.disabled ? this.button._.classList.add("disabled") : this.button._.classList.remove("disabled");
  }
  action(e) {
    this.disabled || this.table._events.eventTrigger("redo");
  }
}
class Do extends rt {
  constructor(e) {
    super(e);
    C(this, "table");
    this.table = e;
    const r = M("div", `${q}-hm-button`), i = M("div", `${q}-icon`);
    i.html('<div class="icon paintformat"></div>'), this._.append(r.append(i)), r.on("click", (n) => this.action(n));
  }
  update() {
  }
  async action(e) {
    var r;
    this.table._selector && ((r = this.table._selector) == null || r.showCopy(), this.table._selector.paintFormatArea = this.table._selector._ranges[0]);
  }
}
class Fo extends rt {
  constructor(e) {
    super(e);
    C(this, "table");
    this.table = e;
    const r = M("div", `${q}-hm-button`), i = M("div", `${q}-icon`);
    i.html('<div class="icon clearformat"></div>'), this._.append(r.append(i)), r.on("click", (n) => this.action(n));
  }
  update() {
  }
  action(e) {
    this.table._events.eventTrigger("clearCell", "style"), this.table._events.eventTrigger("clearCell", "format");
  }
}
const fr = (s, t) => {
  const e = s.getBoundingClientRect(), r = {
    y: [e.top, e.top + e.height],
    x: [e.left, e.left + e.width]
  };
  return t.clientX >= r.x[0] && t.clientX <= r.x[1] && t.clientY >= r.y[0] && t.clientY <= r.y[1];
};
class Ut {
  constructor(t, e) {
    C(this, "_visible", !1);
    C(this, "disabled", !1);
    C(this, "_");
    C(this, "_labelElement");
    C(this, "_contentElement");
    // content
    C(this, "beforeShow", null);
    C(this, "onShow", null);
    C(this, "beforeHide", null);
    C(this, "onHide", null);
    C(this, "hide", async (t) => {
      var e;
      if (!((e = this._contentElement.firstChild) != null && e._ && t && fr(this._contentElement._, t)))
        try {
          this.beforeHide && await this.beforeHide(t), setTimeout(() => {
            this._labelElement.removeCss("active"), this._contentElement.hide(), window.removeEventListener("click", this.hide), window.removeEventListener("contextmenu", this.hide), this._visible = !1, this.onHide && this.onHide(t);
          }, 0);
        } catch {
        }
    });
    const r = [`${q}-dropdown-container`];
    this._ = M("div", r), this._labelElement = t, this._labelElement.on("click", (i) => {
      this.disabled || this.show();
    }), this._.append(this._labelElement), this._contentElement = e, this._contentElement.addCss("dropdown-list"), this._contentElement.hide(), this._.append(this._contentElement);
  }
  async show(t) {
    if (!this.disabled)
      try {
        this.beforeShow && await this.beforeShow(t), this._contentElement.show(), this._labelElement.addCss("active"), this._visible = !0, setTimeout(() => {
          window.addEventListener("click", this.hide), window.addEventListener("contextmenu", this.hide);
        }, 0), this.onShow && this.onShow(t);
      } catch {
      }
  }
}
const S0 = (s) => {
  if (s === void 0) return new Promise((t) => t(!1));
  if (typeof s == "boolean") return new Promise((t) => t(s));
  if (typeof s == "function") {
    const t = s();
    return Object.prototype.toString.call(t) === "[object Promise]" ? t : new Promise((e) => e(t));
  }
  return new Promise((t) => t(!1));
};
class Tt {
  constructor(t) {
    C(this, "disabled", !1);
    C(this, "value", null);
    C(this, "options", []);
    C(this, "_");
    C(this, "_dropDownElement");
    C(this, "customOption", null);
    C(this, "hide", (t) => this._dropDownElement.hide(t));
    this.options = t, this._dropDownElement = new Ut(
      M("span", [`${q}-hm-button`, `${q}-hm-dropdown`]),
      M("ul", "dropdown-list")
    ), this._ = this._dropDownElement._, this._dropDownElement.beforeShow = async () => {
      if (this.disabled)
        throw new Error("dropdown list disabled");
      await this.renderList();
    };
  }
  async renderList() {
    const t = [];
    for (const e of this.options)
      if (typeof e == "string" && e === "divider")
        t.push(M("li", "divider"));
      else if (typeof e == "object") {
        if (await S0(e.hide)) continue;
        const i = ["dropdown-item"];
        await S0(e.disabled) && i.push("disabled");
        const o = M("li", i);
        this.customOption ? o.append(this.customOption(e, o) || "") : o.html(e.label), e.action && typeof e.action == "function" && o.on("click", (c) => e.action(c)), t.push(o);
      }
    this._dropDownElement._contentElement.html(""), this._dropDownElement._contentElement.append(...t);
  }
  render() {
    var i;
    let t = "";
    const e = this.options.findIndex(
      (n) => typeof n != "string" && n.value === this.value
    );
    e !== -1 && (t = (i = this.options[e]) == null ? void 0 : i.label);
    const r = `${t}
        <span class="${q}-icon triangle-icon">
          <span class="icon arrow-down"></span>
        </span>
  `;
    this._dropDownElement._labelElement.html(r);
  }
}
var ze = { exports: {} }, Ro = ze.exports, k0;
function So() {
  return k0 || (k0 = 1, function(s, t) {
    (function(e, r) {
      s.exports = r();
    })(Ro, function() {
      var e = 1e3, r = 6e4, i = 36e5, n = "millisecond", o = "second", c = "minute", h = "hour", l = "day", a = "week", x = "month", d = "quarter", p = "year", f = "date", _ = "Invalid Date", v = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, m = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, u = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(F) {
        var S = ["th", "st", "nd", "rd"], $ = F % 100;
        return "[" + F + (S[($ - 20) % 10] || S[$] || S[0]) + "]";
      } }, g = function(F, S, $) {
        var W = String(F);
        return !W || W.length >= S ? F : "" + Array(S + 1 - W.length).join($) + F;
      }, w = { s: g, z: function(F) {
        var S = -F.utcOffset(), $ = Math.abs(S), W = Math.floor($ / 60), P = $ % 60;
        return (S <= 0 ? "+" : "-") + g(W, 2, "0") + ":" + g(P, 2, "0");
      }, m: function F(S, $) {
        if (S.date() < $.date()) return -F($, S);
        var W = 12 * ($.year() - S.year()) + ($.month() - S.month()), P = S.clone().add(W, x), V = $ - P < 0, L = S.clone().add(W + (V ? -1 : 1), x);
        return +(-(W + ($ - P) / (V ? P - L : L - P)) || 0);
      }, a: function(F) {
        return F < 0 ? Math.ceil(F) || 0 : Math.floor(F);
      }, p: function(F) {
        return { M: x, y: p, w: a, d: l, D: f, h, m: c, s: o, ms: n, Q: d }[F] || String(F || "").toLowerCase().replace(/s$/, "");
      }, u: function(F) {
        return F === void 0;
      } }, b = "en", E = {};
      E[b] = u;
      var A = "$isDayjsObject", D = function(F) {
        return F instanceof H || !(!F || !F[A]);
      }, k = function F(S, $, W) {
        var P;
        if (!S) return b;
        if (typeof S == "string") {
          var V = S.toLowerCase();
          E[V] && (P = V), $ && (E[V] = $, P = V);
          var L = S.split("-");
          if (!P && L.length > 1) return F(L[0]);
        } else {
          var R = S.name;
          E[R] = S, P = R;
        }
        return !W && P && (b = P), P || !W && b;
      }, y = function(F, S) {
        if (D(F)) return F.clone();
        var $ = typeof S == "object" ? S : {};
        return $.date = F, $.args = arguments, new H($);
      }, B = w;
      B.l = k, B.i = D, B.w = function(F, S) {
        return y(F, { locale: S.$L, utc: S.$u, x: S.$x, $offset: S.$offset });
      };
      var H = function() {
        function F($) {
          this.$L = k($.locale, null, !0), this.parse($), this.$x = this.$x || $.x || {}, this[A] = !0;
        }
        var S = F.prototype;
        return S.parse = function($) {
          this.$d = function(W) {
            var P = W.date, V = W.utc;
            if (P === null) return /* @__PURE__ */ new Date(NaN);
            if (B.u(P)) return /* @__PURE__ */ new Date();
            if (P instanceof Date) return new Date(P);
            if (typeof P == "string" && !/Z$/i.test(P)) {
              var L = P.match(v);
              if (L) {
                var R = L[2] - 1 || 0, I = (L[7] || "0").substring(0, 3);
                return V ? new Date(Date.UTC(L[1], R, L[3] || 1, L[4] || 0, L[5] || 0, L[6] || 0, I)) : new Date(L[1], R, L[3] || 1, L[4] || 0, L[5] || 0, L[6] || 0, I);
              }
            }
            return new Date(P);
          }($), this.init();
        }, S.init = function() {
          var $ = this.$d;
          this.$y = $.getFullYear(), this.$M = $.getMonth(), this.$D = $.getDate(), this.$W = $.getDay(), this.$H = $.getHours(), this.$m = $.getMinutes(), this.$s = $.getSeconds(), this.$ms = $.getMilliseconds();
        }, S.$utils = function() {
          return B;
        }, S.isValid = function() {
          return this.$d.toString() !== _;
        }, S.isSame = function($, W) {
          var P = y($);
          return this.startOf(W) <= P && P <= this.endOf(W);
        }, S.isAfter = function($, W) {
          return y($) < this.startOf(W);
        }, S.isBefore = function($, W) {
          return this.endOf(W) < y($);
        }, S.$g = function($, W, P) {
          return B.u($) ? this[W] : this.set(P, $);
        }, S.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, S.valueOf = function() {
          return this.$d.getTime();
        }, S.startOf = function($, W) {
          var P = this, V = !!B.u(W) || W, L = B.p($), R = function(it, Z) {
            var ot = B.w(P.$u ? Date.UTC(P.$y, Z, it) : new Date(P.$y, Z, it), P);
            return V ? ot : ot.endOf(l);
          }, I = function(it, Z) {
            return B.w(P.toDate()[it].apply(P.toDate("s"), (V ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Z)), P);
          }, O = this.$W, z = this.$M, Y = this.$D, X = "set" + (this.$u ? "UTC" : "");
          switch (L) {
            case p:
              return V ? R(1, 0) : R(31, 11);
            case x:
              return V ? R(1, z) : R(0, z + 1);
            case a:
              var G = this.$locale().weekStart || 0, N = (O < G ? O + 7 : O) - G;
              return R(V ? Y - N : Y + (6 - N), z);
            case l:
            case f:
              return I(X + "Hours", 0);
            case h:
              return I(X + "Minutes", 1);
            case c:
              return I(X + "Seconds", 2);
            case o:
              return I(X + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, S.endOf = function($) {
          return this.startOf($, !1);
        }, S.$set = function($, W) {
          var P, V = B.p($), L = "set" + (this.$u ? "UTC" : ""), R = (P = {}, P[l] = L + "Date", P[f] = L + "Date", P[x] = L + "Month", P[p] = L + "FullYear", P[h] = L + "Hours", P[c] = L + "Minutes", P[o] = L + "Seconds", P[n] = L + "Milliseconds", P)[V], I = V === l ? this.$D + (W - this.$W) : W;
          if (V === x || V === p) {
            var O = this.clone().set(f, 1);
            O.$d[R](I), O.init(), this.$d = O.set(f, Math.min(this.$D, O.daysInMonth())).$d;
          } else R && this.$d[R](I);
          return this.init(), this;
        }, S.set = function($, W) {
          return this.clone().$set($, W);
        }, S.get = function($) {
          return this[B.p($)]();
        }, S.add = function($, W) {
          var P, V = this;
          $ = Number($);
          var L = B.p(W), R = function(z) {
            var Y = y(V);
            return B.w(Y.date(Y.date() + Math.round(z * $)), V);
          };
          if (L === x) return this.set(x, this.$M + $);
          if (L === p) return this.set(p, this.$y + $);
          if (L === l) return R(1);
          if (L === a) return R(7);
          var I = (P = {}, P[c] = r, P[h] = i, P[o] = e, P)[L] || 1, O = this.$d.getTime() + $ * I;
          return B.w(O, this);
        }, S.subtract = function($, W) {
          return this.add(-1 * $, W);
        }, S.format = function($) {
          var W = this, P = this.$locale();
          if (!this.isValid()) return P.invalidDate || _;
          var V = $ || "YYYY-MM-DDTHH:mm:ssZ", L = B.z(this), R = this.$H, I = this.$m, O = this.$M, z = P.weekdays, Y = P.months, X = P.meridiem, G = function(Z, ot, ct, tt) {
            return Z && (Z[ot] || Z(W, V)) || ct[ot].slice(0, tt);
          }, N = function(Z) {
            return B.s(R % 12 || 12, Z, "0");
          }, it = X || function(Z, ot, ct) {
            var tt = Z < 12 ? "AM" : "PM";
            return ct ? tt.toLowerCase() : tt;
          };
          return V.replace(m, function(Z, ot) {
            return ot || function(ct) {
              switch (ct) {
                case "YY":
                  return String(W.$y).slice(-2);
                case "YYYY":
                  return B.s(W.$y, 4, "0");
                case "M":
                  return O + 1;
                case "MM":
                  return B.s(O + 1, 2, "0");
                case "MMM":
                  return G(P.monthsShort, O, Y, 3);
                case "MMMM":
                  return G(Y, O);
                case "D":
                  return W.$D;
                case "DD":
                  return B.s(W.$D, 2, "0");
                case "d":
                  return String(W.$W);
                case "dd":
                  return G(P.weekdaysMin, W.$W, z, 2);
                case "ddd":
                  return G(P.weekdaysShort, W.$W, z, 3);
                case "dddd":
                  return z[W.$W];
                case "H":
                  return String(R);
                case "HH":
                  return B.s(R, 2, "0");
                case "h":
                  return N(1);
                case "hh":
                  return N(2);
                case "a":
                  return it(R, I, !0);
                case "A":
                  return it(R, I, !1);
                case "m":
                  return String(I);
                case "mm":
                  return B.s(I, 2, "0");
                case "s":
                  return String(W.$s);
                case "ss":
                  return B.s(W.$s, 2, "0");
                case "SSS":
                  return B.s(W.$ms, 3, "0");
                case "Z":
                  return L;
              }
              return null;
            }(Z) || L.replace(":", "");
          });
        }, S.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, S.diff = function($, W, P) {
          var V, L = this, R = B.p(W), I = y($), O = (I.utcOffset() - this.utcOffset()) * r, z = this - I, Y = function() {
            return B.m(L, I);
          };
          switch (R) {
            case p:
              V = Y() / 12;
              break;
            case x:
              V = Y();
              break;
            case d:
              V = Y() / 3;
              break;
            case a:
              V = (z - O) / 6048e5;
              break;
            case l:
              V = (z - O) / 864e5;
              break;
            case h:
              V = z / i;
              break;
            case c:
              V = z / r;
              break;
            case o:
              V = z / e;
              break;
            default:
              V = z;
          }
          return P ? V : B.a(V);
        }, S.daysInMonth = function() {
          return this.endOf(x).$D;
        }, S.$locale = function() {
          return E[this.$L];
        }, S.locale = function($, W) {
          if (!$) return this.$L;
          var P = this.clone(), V = k($, W, !0);
          return V && (P.$L = V), P;
        }, S.clone = function() {
          return B.w(this.$d, this);
        }, S.toDate = function() {
          return new Date(this.valueOf());
        }, S.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, S.toISOString = function() {
          return this.$d.toISOString();
        }, S.toString = function() {
          return this.$d.toUTCString();
        }, F;
      }(), T = H.prototype;
      return y.prototype = T, [["$ms", n], ["$s", o], ["$m", c], ["$H", h], ["$W", l], ["$M", x], ["$y", p], ["$D", f]].forEach(function(F) {
        T[F[1]] = function(S) {
          return this.$g(S, F[0], F[1]);
        };
      }), y.extend = function(F, S) {
        return F.$i || (F(S, H, y), F.$i = !0), y;
      }, y.locale = k, y.isDayjs = D, y.unix = function(F) {
        return y(1e3 * F);
      }, y.en = E[b], y.Ls = E, y.p = {}, y;
    });
  }(ze)), ze.exports;
}
var ko = So();
const Vt = /* @__PURE__ */ K0(ko);
class $o extends rt {
  constructor(e) {
    super(e);
    C(this, "table");
    C(this, "_dropdown");
    C(this, "_visible", !1);
    this.table = e;
    const { t: r } = this.table._i18n;
    this._dropdown = new Tt([
      {
        label: r("formats.normal"),
        value: "normal",
        action: (i) => this.changeFormat(i, "normal"),
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
        action: (i) => this.changeFormat(i, "number"),
        props: {
          example: "98.5"
        }
      },
      {
        label: r("formats.scientific"),
        value: "scientific",
        action: (i) => this.changeFormat(i, "scientific"),
        props: {
          example: "5.01E+00"
        }
      },
      {
        label: r("formats.percent"),
        value: "percent",
        action: (i) => this.changeFormat(i, "percent"),
        props: {
          example: "100%"
        }
      },
      {
        label: r("formats.CNY"),
        value: "CNY",
        action: (i) => this.changeFormat(i, "CNY"),
        props: {
          example: "¥100"
        }
      },
      {
        label: r("formats.USD"),
        value: "USD",
        action: (i) => this.changeFormat(i, "USD"),
        props: {
          example: "$100"
        }
      },
      {
        label: r("formats.EUR"),
        value: "EUR",
        action: (i) => this.changeFormat(i, "EUR"),
        props: {
          example: "€100"
        }
      },
      "divider",
      {
        label: r("formats.shortDate"),
        value: "YYYY-MM-DD",
        action: (i) => this.changeFormat(i, "YYYY-MM-DD"),
        props: {
          example: Vt().format("YYYY-MM-DD")
        }
      },
      {
        label: r("formats.longDate"),
        value: "YYYY-MM-DD HH:mm:ss",
        action: (i) => this.changeFormat(i, "YYYY-MM-DD HH:mm:ss"),
        props: {
          example: `${Vt().format("YYYY-MM-DD")} 00:00:00`
        }
      },
      {
        label: r("formats.time"),
        value: "HH:mm:ss",
        action: (i) => this.changeFormat(i, "HH:mm:ss"),
        props: {
          example: "00:00:00"
        }
      }
    ]), this._dropdown._dropDownElement._contentElement.css("width", "250px"), this._dropdown.customOption = (i) => {
      var n;
      if (i !== "divider") {
        const o = M("div");
        return o.css("display", "flex"), o.css("align-items", "center"), o.css("justify-content", "space-between"), o.html(
          `<span>${i.label}</span> <span class="secondary-text-color">${(n = i.props) == null ? void 0 : n.example}</span>`
        ), o;
      }
      return null;
    }, this._dropdown.value = "normal", this._.append(this._dropdown._), this.render();
  }
  update() {
    var n;
    if (!((n = this.table._selector) != null && n._focusRange)) return;
    const { startRow: e, startCol: r } = this.table._selector._focusRange, i = this.table.cell(e, r);
    typeof i != "object" && this._dropdown.value !== "normal" ? (this._dropdown.value = "normal", this.render()) : typeof i == "object" && (i != null && i.format ? (this._dropdown.value = i == null ? void 0 : i.format, this.render()) : this._dropdown.value !== "normal" && (this._dropdown.value = "normal", this.render()));
  }
  changeFormat(e, r) {
    this._dropdown.value = r, this._dropdown.render(), this.table._events.eventTrigger("fastFormat", r), this._dropdown.hide();
  }
  render() {
    this._dropdown.render();
  }
}
class Ho extends rt {
  constructor(e) {
    super(e);
    C(this, "table");
    C(this, "_dropdown");
    C(this, "_visible", !1);
    this.table = e;
    const r = [
      "Arial",
      "Helvetica Neue",
      "Microsoft YaHei",
      "Courier New",
      "Verdana",
      "Roboto"
    ].map((i) => ({
      label: i,
      value: i,
      action: (n) => this.changeFonts(n, i)
    }));
    this._dropdown = new Tt(r), this._dropdown.value = "Arial", this._.append(this._dropdown._), this.render();
  }
  update() {
    var n;
    if (!((n = this.table._selector) != null && n._focusRange)) return;
    const { startRow: e, startCol: r } = this.table._selector._focusRange, i = this.table.getStyle(e, r);
    this._dropdown.value = i.fontFamily || "Arial", this.render();
  }
  changeFonts(e, r) {
    this._dropdown.value = r, this.table._events.eventTrigger("setStyle", { fontFamily: r }), this.render();
  }
  render() {
    this._dropdown.render();
  }
}
class To extends rt {
  constructor(e) {
    super(e);
    C(this, "table");
    C(this, "_dropdown");
    C(this, "_visible", !1);
    this.table = e;
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
    ].map((i) => ({
      label: `${i}`,
      value: i,
      action: (n) => this.changeFontSize(n, i)
    }));
    this._dropdown = new Tt(r), this._dropdown._dropDownElement._contentElement.css("max-height", "250px"), this._dropdown._dropDownElement._contentElement.css("overflow-y", "scroll"), this._dropdown.value = 10, this._.append(this._dropdown._), this.render();
  }
  update() {
    var n;
    if (!((n = this.table._selector) != null && n._focusRange)) return;
    const { startRow: e, startCol: r } = this.table._selector._focusRange, i = this.table.getStyle(e, r);
    this._dropdown.value = i.fontSize || 10, this.render();
  }
  changeFontSize(e, r) {
    this._dropdown.value = r, this.table._events.eventTrigger("setStyle", { fontSize: r }), this._dropdown.hide(), this.render();
  }
  render() {
    this._dropdown.render();
  }
}
class dt extends rt {
  constructor(e, r, i) {
    super(e);
    C(this, "table");
    C(this, "buttonType");
    C(this, "button");
    this.table = e, this.buttonType = r, this.button = M("div", `${q}-hm-button`);
    const n = M("div", `${q}-icon`);
    n.html(`<div class="icon ${this.buttonType}"></div>`), this.button.append(n), i && i(this), this.button.on("click", (o) => this.action(o)), this._.append(this.button);
  }
  update() {
    var c, h;
    if (!((c = this.table._selector) != null && c._focus) || !((h = this.table._selector) != null && h._focusRange)) return;
    const { startRow: e, startCol: r } = this.table._selector._focusRange, i = this.table.cell(e, r), n = this.table.getStyle(e, r, !0);
    let o = !1;
    return this.buttonType === "font-bold" ? o = !!n.bold : this.buttonType === "font-italic" ? o = !!n.italic : this.buttonType === "strike" ? o = !!n.strikethrough : this.buttonType === "underline" ? o = !!n.underline : this.buttonType === "merge" ? o = this.table.isMerged() : this.buttonType === "textwrap" ? o = !!n.textwrap : this.buttonType === "freeze" ? o = !!this.table._data.freeze : (this.buttonType === "increase-dicimal" || this.buttonType === "reduce-dicimal") && (i instanceof Object && (i.format === "number" || i.format === "scientific") ? this._.show() : this._.hide()), o ? this.button.addCss("active") : this.button.removeCss("active"), this;
  }
  action(e) {
    this.buttonType === "font-bold" ? this.table._events.eventTrigger("fastStyle", "bold") : this.buttonType === "font-italic" ? this.table._events.eventTrigger("fastStyle", "italic") : this.buttonType === "strike" ? this.table._events.eventTrigger("fastStyle", "strikethrough") : this.buttonType === "underline" ? this.table._events.eventTrigger("fastStyle", "underline") : this.buttonType === "merge" ? this.table._events.eventTrigger("merge") : this.buttonType === "textwrap" ? this.table._events.eventTrigger("fastStyle", "textwrap") : this.buttonType === "freeze" ? this.table._events.eventTrigger("freeze") : this.buttonType === "increase-dicimal" ? this.table._events.eventTrigger("fastFixed", "increase") : this.buttonType === "reduce-dicimal" && this.table._events.eventTrigger("fastFixed", "reduce");
  }
}
class pr {
  constructor(t, e) {
    C(this, "table");
    C(this, "_");
    C(this, "_fastColorElement");
    C(this, "_themeColorElement");
    C(this, "fastColor", "#000");
    C(this, "onChange", () => null);
    C(this, "themeColors", [
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
    this.table = e, this._ = M("div"), this._.addCss(`${q}-color-picker`), this._fastColorElement = M("div"), this._fastColorElement.addCss("fast-color"), this._fastColorElement.on("click", () => {
      this.onChange(this.fastColor);
    }), this._.append(this._fastColorElement), this._themeColorElement = M("div"), this._themeColorElement.addCss("theme-color"), this._.append(this._themeColorElement), this.renderThemeColorElement(), this.updateFastColorElement(), t && t.append(this._);
  }
  renderThemeColorElement() {
    var r;
    this._themeColorElement.html("");
    const t = M("div");
    t.addCss("title"), t.html(`${((r = this.table) == null ? void 0 : r._i18n.t("theme_color")) || "Theme Colors"}`), t.css("font-weight", "bold"), this._themeColorElement.append(t);
    const e = M("table");
    e.addCss("body");
    for (let i = 0; i < this.themeColors[0].length; i++) {
      const n = M("tr");
      for (let o = 0; o < this.themeColors.length; o++) {
        const h = this.themeColors[o][i], l = this.createColorCube(h);
        l.css("padding", "2px");
        const a = M("td");
        a.on("click", () => {
          this.updateFastColorElement(h);
        }), a.append(l), n.append(a);
      }
      e.append(n);
    }
    this._themeColorElement.css("padding-bottom", "5px"), this._themeColorElement.append(e);
  }
  updateFastColorElement(t) {
    t && (this.fastColor = t, this.onChange(t)), this._fastColorElement.html(""), this._fastColorElement.append(this.createColorCube(this.fastColor));
    const e = M("span").html(this.fastColor);
    e.css("padding", "0 0 0 10px"), this._fastColorElement.append(e);
  }
  createColorCube(t) {
    const e = M("div");
    return e.addCss("color-cube"), e.css("width", "16px"), e.css("height", "16px"), e.css("background", t), e;
  }
}
class Po extends rt {
  constructor(e) {
    var r;
    super(e);
    C(this, "table");
    C(this, "_dropdown");
    C(this, "_colorPicker");
    C(this, "_visible", !1);
    this.table = e, this._colorPicker = new pr(void 0, e), this._colorPicker.onChange = (i) => {
      this.changeColor(i);
    }, this._dropdown = new Ut(this.generateButton("color"), this._colorPicker._), this._colorPicker.fastColor = this.table._data.style.color, (r = this._dropdown._labelElement.firstChild) == null || r.css(
      "border-bottom",
      `3px solid ${this.table._data.style.color}`
    ), this._dropdown._.css("margin-left", "2px"), this._.append(this._dropdown._), this.render();
  }
  generateButton(e) {
    const r = M("div", `${q}-hm-button`), i = M("div", `${q}-icon`);
    return i.html(`<div class="icon ${e || ""}"></div>`), r.append(i), r;
  }
  changeColor(e) {
    this.table._events.eventTrigger("setStyle", {
      color: e
    }), this._dropdown.hide(), this.update();
  }
  update() {
    this.render();
  }
  render() {
    var r, i;
    let e = this.table._data.style.color;
    if ((r = this.table._selector) != null && r._focusRange) {
      const { startRow: n, startCol: o } = this.table._selector._focusRange, c = this.table.getStyle(n, o, !0);
      c.color && (e = c.color);
    }
    (i = this._dropdown._labelElement.firstChild) == null || i.css("border-bottom-color", e);
  }
}
class Io extends rt {
  constructor(e) {
    var r;
    super(e);
    C(this, "table");
    C(this, "_dropdown");
    C(this, "_colorPicker");
    C(this, "_visible", !1);
    this.table = e, this._colorPicker = new pr(void 0, e), this._colorPicker.onChange = (i) => {
      this.changeColor(i);
    }, this._dropdown = new Ut(this.generateButton("bgcolor"), this._colorPicker._), (r = this._dropdown._labelElement.firstChild) == null || r.css("border-bottom", "3px solid #fff"), this._dropdown._.css("margin-left", "2px"), this._.append(this._dropdown._), this.render();
  }
  generateButton(e) {
    const r = M("div", `${q}-hm-button`), i = M("div", `${q}-icon`);
    return i.html(`<div class="icon ${e || ""}"></div>`), r.append(i), r;
  }
  changeColor(e) {
    this.table._events.eventTrigger("setStyle", {
      bgcolor: e
    }), this._dropdown.hide(), this.update();
  }
  update() {
    this.render();
  }
  render() {
    var r, i;
    let e = "#fff";
    if ((r = this.table._selector) != null && r._focusRange) {
      const { startRow: n, startCol: o } = this.table._selector._focusRange;
      e = this.table.getStyle(n, o, !0).bgcolor || "#fff";
    }
    (i = this._dropdown._labelElement.firstChild) == null || i.css("border-bottom-color", e);
  }
}
function Ne(s) {
  const t = M("div", `${q}-hm-button`), e = M("div", `${q}-icon`);
  return e.html(`<div class="icon ${s || ""}"></div>`), t.append(e), t;
}
class zo extends rt {
  constructor(e) {
    super(e);
    C(this, "table");
    C(this, "_dropdown");
    C(this, "_ctx");
    C(this, "_line");
    C(this, "_visible", !1);
    this.table = e, this._ctx = new Oo(this.table), this._line = new Mo(this.table), this._dropdown = new Ut(Ne("border-all"), this.generateContent()), this._dropdown._.css("margin-left", "2px"), this._.append(this._dropdown._), this._dropdown.beforeHide = (r) => {
      if (r && (fr(this._ctx._dropdown._contentElement._, r) || fr(
        this._line._dropdown._dropDownElement._contentElement._,
        r
      )))
        throw new Error("Stop hide");
    }, this.render();
  }
  generateContent() {
    const e = M("div"), r = M("div");
    r.css("display", "flex"), r.css("padding", "5px"), r.css("justify-content", "space-between");
    const i = M("table");
    [
      ["all", "inside", "horizontal", "vertical", "outside"],
      ["left", "top", "right", "bottom", "none"]
    ].forEach((c) => {
      const h = M("tr");
      c.forEach((l) => {
        const a = M("td").append(Ne(`border-${l}`));
        a.on("click", () => {
          this.setBorderStyle(l);
        }), h.append(a);
      }), i.append(h);
    }), r.append(i), i.addCss(`${q}-hm-divider-line`);
    const o = M("div");
    return o.css("padding", "2px 0 2px 0px"), o.append(this._ctx._), o.append(this._line._), r.append(o), e.append(r), e;
  }
  setBorderStyle(e) {
    e === "none" ? this.table._events.eventTrigger("clearBorder") : this.table._events.eventTrigger(
      "setBorder",
      e,
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
class Oo {
  constructor(t) {
    C(this, "table");
    C(this, "_");
    C(this, "_dropdown");
    C(this, "_colorPicker");
    C(this, "_btn", Ne("line-color"));
    this.table = t, this._colorPicker = new pr(void 0, this.table), this._dropdown = new Ut(this._btn, this._colorPicker._), this._dropdown._contentElement.css("left", "103%"), this._dropdown._contentElement.css("top", "-5px"), this._ = this._dropdown._, this.updateButton(), this._colorPicker.onChange = (e) => {
      this._dropdown.hide(), this.updateButton();
    };
  }
  updateButton() {
    var t;
    (t = this._dropdown._labelElement.firstChild) == null || t.css(
      "border-bottom",
      `3px solid ${this._colorPicker.fastColor}`
    );
  }
  getValue() {
    return this._colorPicker.fastColor;
  }
}
class Mo {
  constructor(t) {
    C(this, "table");
    C(this, "_");
    C(this, "_dropdown");
    C(this, "_btn", Ne("line-type"));
    C(this, "lines", ["thin", "medium", "thick", "dashed", "dotted"]);
    this.table = t, this._dropdown = new Tt(
      this.lines.map((e) => ({
        label: e,
        value: e,
        action: (r) => {
          this.updateButton(e);
        }
      }))
    ), this._dropdown._dropDownElement._labelElement.css("padding-left", "0"), this._dropdown.render = () => {
      this._dropdown._dropDownElement._labelElement.html(
        `<div class="${q}-icon">
          <div class="icon line-type"></div>
        </div>`
      );
    }, this._dropdown.customOption = (e) => {
      const r = M("div");
      return r.css("height", "32px"), r.css("display", "flex"), r.css("align-items", "center"), e !== "divider" && r.html(
        `<div class="line-squire ${this._dropdown.value === e.value ? "selected" : ""}"></div> ${this.drawLine(e.value) || ""}`
      ), r;
    }, this._dropdown._.css("position", "relative"), this._dropdown._.css("margin-top", "5px"), this._dropdown._.css("margin-left", "0"), this._dropdown._dropDownElement._contentElement.css("left", "calc(100% + 10px)"), this._dropdown._dropDownElement._contentElement.css("top", "-5px"), this._ = this._dropdown._, this.updateButton(this._dropdown.value || "thin");
  }
  drawLine(t) {
    if (t === "thin")
      return '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" style="user-select: none;"></line></svg>';
    if (t === "medium")
      return '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="2" style="user-select: none;"><line x1="0" y1="1.0" x2="50" y2="1.0" stroke-width="2" stroke="black" style="user-select: none;"></line></svg>';
    if (t === "thick")
      return '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="3" style="user-select: none;"><line x1="0" y1="1.5" x2="50" y2="1.5" stroke-width="3" stroke="black" style="user-select: none;"></line></svg>';
    if (t === "dashed")
      return '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="2" style="user-select: none;"></line></svg>';
    if (t === "dotted")
      return '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="1" style="user-select: none;"><line x1="0" y1="0.5" x2="50" y2="0.5" stroke-width="1" stroke="black" stroke-dasharray="1" style="user-select: none;"></line></svg>';
  }
  updateButton(t) {
    this._dropdown.value = t, this._dropdown.render(), this._dropdown.renderList(), this._dropdown.hide();
  }
  getValue() {
    return this._dropdown.value;
  }
}
class Wo extends rt {
  constructor(e) {
    super(e);
    C(this, "table");
    C(this, "_dropdown");
    C(this, "_visible", !1);
    C(this, "render", () => {
      this._dropdown._dropDownElement._labelElement.html(
        `<div class="${q}-icon">
        <div class="icon align-${this._dropdown.value || "left"}"></div>
      </div>
       <span class="${q}-icon triangle-icon" style="margin-left: -4px">
          <span class="icon arrow-down"></span>
        </span>
      `
      );
    });
    C(this, "renderOption", (e, r) => e !== "divider" ? (r.css("padding", "0 7px"), this.generateButton(`align-${e.value}`)) : M("div"));
    C(this, "changeTextAlign", (e) => {
      this.table._events.eventTrigger("setStyle", { align: e });
    });
    this.table = e, this._dropdown = new Tt([
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
  generateButton(e) {
    const r = M("div", [`${q}-hm-button`, "transparent_hover_color"]), i = M("div", `${q}-icon`);
    return i.html(`<div class="icon ${e || ""}"></div>`), r.append(i), r;
  }
  update() {
    var n, o;
    if (!((n = this.table._selector) != null && n._focus) || !((o = this.table._selector) != null && o._focusRange)) return;
    const { startRow: e, startCol: r } = this.table._selector._focusRange, i = this.table.getStyle(e, r, !0);
    this._dropdown.value = i.align || "left", this._dropdown.render();
  }
}
class Lo extends rt {
  constructor(e) {
    super(e);
    C(this, "table");
    C(this, "_dropdown");
    C(this, "_visible", !1);
    C(this, "render", () => {
      this._dropdown._dropDownElement._labelElement.html(
        `<div class="${q}-icon">
        <div class="icon align-${this._dropdown.value || "left"}"></div>
      </div>
       <span class="${q}-icon triangle-icon" style="margin-left: -4px">
          <span class="icon arrow-down"></span>
        </span>
      `
      );
    });
    C(this, "renderOption", (e, r) => e !== "divider" ? (r.css("padding", "0 7px"), this.generateButton(`align-${e.value}`)) : M("div"));
    C(this, "changeTextAlign", (e) => {
      this.table._events.eventTrigger("setStyle", { valign: e });
    });
    this.table = e, this._dropdown = new Tt([
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
  generateButton(e) {
    const r = M("div", [`${q}-hm-button`, "transparent_hover_color"]), i = M("div", `${q}-icon`);
    return i.html(`<div class="icon ${e || ""}"></div>`), r.append(i), r;
  }
  update() {
    var n, o;
    if (!((n = this.table._selector) != null && n._focus) || !((o = this.table._selector) != null && o._focusRange)) return;
    const { startRow: e, startCol: r } = this.table._selector._focusRange, i = this.table.getStyle(e, r, !0);
    this._dropdown.value = i.valign || this.table._data.style.valign, this._dropdown.render();
  }
}
function Vo(s) {
  const { t } = s._i18n;
  return [
    new Bo(s).tooltip({ title: t("undo"), shortkey: "(Ctrl + Z)" }),
    new Ao(s).tooltip({ title: t("redo"), shortkey: "(Ctrl + Y)" }),
    new Do(s).tooltip(t("paintformat")),
    new Fo(s).tooltip(t("clearformat")),
    new Dt(s),
    new $o(s).tooltip(t("valueformat")),
    new dt(s, "increase-dicimal", (e) => {
      var r;
      (r = e._) == null || r.hide();
    }).tooltip(t("increase_dicimal")),
    new dt(s, "reduce-dicimal", (e) => {
      var r;
      (r = e._) == null || r.hide();
    }).tooltip(t("reduce_dicimal")),
    new Dt(s),
    new Ho(s).tooltip(t("fontFamily")),
    new To(s).tooltip(t("fontSize")),
    new Dt(s),
    new dt(s, "font-bold").tooltip({
      title: t("fontBold"),
      shortkey: "(Ctrl + B)"
    }),
    new dt(s, "font-italic").tooltip({
      title: t("fontItalic"),
      shortkey: "(Ctrl + I)"
    }),
    new dt(s, "strike").tooltip(t("fontStrike")),
    new dt(s, "underline").tooltip({
      title: t("fontUnderline"),
      shortkey: "(Ctrl + U)"
    }),
    new Po(s).tooltip(t("fontColor")),
    new Dt(s),
    new Io(s).tooltip(t("bgColor")),
    new zo(s).tooltip(t("border")),
    new dt(s, "merge", (e) => {
      var r;
      (r = e._) == null || r.css("margin-left", "2px");
    }).tooltip(t("mergeCell")),
    new Dt(s),
    new Wo(s).tooltip(t("fontAlign")),
    new Lo(s).tooltip(t("fontVerticalAlign")),
    new dt(s, "textwrap", (e) => {
      var r;
      (r = e._) == null || r.css("margin-left", "3px");
    }).tooltip(t("fontAutoWrap")),
    new Dt(s),
    new dt(s, "freeze", (e) => {
      var r;
      (r = e._) == null || r.css("margin-left", "3px");
    }).tooltip(t("freezeCell"))
  ];
}
class qo {
  constructor(t) {
    C(this, "table");
    C(this, "_headMenuElement");
    C(this, "height", 40);
    C(this, "options", []);
    this.table = t, this._headMenuElement = M("div", `${q}-head-menu`), this._headMenuElement.css({
      height: this.height
    }), this.init(), this.table._i18n.onChange(() => {
      this.init();
    });
  }
  async init() {
    this._headMenuElement.html(""), this.options = Vo(this.table);
    for (const t of this.options)
      this._headMenuElement.append(t._);
  }
  updateStatus() {
    for (const t of this.options)
      t.update();
  }
  render() {
    this._headMenuElement._.hasChildNodes() ? this.updateStatus() : this.init();
  }
}
function No(s, t = 10, e) {
  if (s && typeof s == "string") {
    if (s.toString().includes("e")) return s;
    const r = Number(s);
    if (r.toString().includes("e")) return r.toString();
    const i = Math.floor(Math.log(Math.abs(r)) / Math.LN10);
    if (Math.abs(i) < t) return r.toString();
    let n = r * 10 ** -i;
    return e !== void 0 && (n = n.toFixed(e)), `${n}E+${i}`;
  } else return "";
}
const jo = (s, t) => {
  s.formatter((e, r, i, n) => {
    if (n === "normal" || n === "text" || !n || i === void 0) return i;
    if (n === "number" && !Number.isNaN(Number(i))) {
      let o = 2;
      e.fixed !== void 0 && (o = e.fixed), i = Number(i).toFixed(o);
    } else if (n === "scientific" && !Number.isNaN(Number(i))) {
      let o = 2;
      e.fixed !== void 0 && (o = e.fixed), i = No(i, 10, o);
    } else if (i !== null && i !== "") {
      if (!Number.isNaN(Number(i))) {
        const c = new Intl.NumberFormat();
        n === "percent" ? i = `${i}%` : n === "CNY" ? i = `¥${c.format(Number(i))}` : n === "EUR" ? i = `€${c.format(Number(i))}` : n === "USD" && (i = `$${c.format(Number(i))}`);
      }
      let o = i;
      if (!Number.isNaN(Number(i))) o = Number(i);
      else
        try {
          o = JSON.parse(i);
        } catch {
        }
      (n === "YYYY-MM-DD HH:mm:ss" || n === "YYYY-MM-DD" || n === "HH:mm:ss") && (o = Vt(o).format(n)), o !== "Invalid Date" && (i = String(o));
    }
    return i;
  });
};
class je {
  constructor(t, e, r, i) {
    // renderer options
    C(this, "_rendererOptions", {});
    C(this, "_copyable", !1);
    C(this, "_editable", !1);
    C(this, "_minRowHeight", 25);
    C(this, "_minColWidth", 60);
    C(this, "_width");
    C(this, "_height");
    // cache for rect of content
    C(this, "_contentRect", { x: 0, y: 0, width: 0, height: 0 });
    C(this, "_headMenu", null);
    C(this, "_container");
    C(this, "_Layer");
    C(this, "_data");
    C(this, "_renderer");
    C(this, "_cells", new Ai());
    // scrollbar
    C(this, "_vScrollbar", null);
    C(this, "_hScrollbar", null);
    // resizer
    C(this, "_rowResizer", null);
    C(this, "_colResizer", null);
    // editor ? extends Editor
    C(this, "_editor", null);
    C(this, "_editors", /* @__PURE__ */ new Map());
    C(this, "_selector", null);
    C(this, "_overlayer");
    C(this, "_canvas");
    // event emitter
    C(this, "_emitter", new _n());
    C(this, "_events");
    C(this, "_history");
    C(this, "_contextMenu");
    C(this, "_i18n");
    const n = typeof t == "string" ? document.querySelector(t) : t;
    if (n === null) throw new Error("first argument error");
    if (this._i18n = new hr(), this._data = Mi(), this._Layer = M(n, `${q}-layer`).css({
      height: r(),
      width: e()
    }), i != null && i.hideHeadMenu || (this._headMenu = new qo(this), this._Layer.append(this._headMenu._headMenuElement)), this._width = e, this._height = () => {
      var c;
      return r() - (((c = this._headMenu) == null ? void 0 : c.height) || 0);
    }, this._container = M("div", `${q}-container`).css({
      height: this._height(),
      width: e()
    }), this._Layer.append(this._container), i) {
      const { minColWidth: c, minRowHeight: h, renderer: l, data: a } = i;
      if (c && (this._minColWidth = c), h && (this._minRowHeight = h), l && (this._rendererOptions = l), a) {
        const { cols: x, rows: d, rowHeight: p, colWidth: f } = a, { _data: _ } = this;
        x && (_.cols.len = x), d && (_.rows.len = d), p && (_.rowHeight = p), f && (_.colWidth = f);
      }
    }
    const o = document.createElement("canvas");
    this._canvas = M(o).attr("tabIndex", "1"), this._container.append(o), this._renderer = new Ze(o, e(), this._height()), this._overlayer = new mi(this._container), Ye(this), i != null && i.selectable && j.init(this), i != null && i.scrollable && Ht.init(this), i != null && i.resizable && eo.init(this), i != null && i.editable && (this._editable = !0), this._copyable = (i == null ? void 0 : i.copyable) || !1, this._events = new no(this), this._history = new oo(), this._contextMenu = new bo(this), jo(this._cells);
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
  freeze(t) {
    return this._data.freeze = t, this;
  }
  isMerged(t) {
    if (t) return $r(this._data, t);
    {
      const { _selector: e } = this;
      if (e)
        return e._ranges.every((r) => $r(this._data, r.toString()));
    }
    return !1;
  }
  merge(t) {
    if (t) Hr(this._data, t);
    else {
      const { _selector: e } = this;
      e && e._ranges.forEach((r) => Hr(this._data, r.toString()));
    }
    return this;
  }
  unmerge(t) {
    if (t) ar(this._data, t);
    else {
      const { _selector: e } = this;
      e && e._ranges.forEach((r) => ar(this._data, r.toString()));
    }
    return this;
  }
  row(t, e) {
    return e ? (e.height && this.rowHeight(t, e.height), Rt(this._data, t, e), this) : Rt(this._data, t);
  }
  rowHeight(t, e, r) {
    const i = We(this._data, t);
    return e ? (i !== e && (We(this._data, t, e, r), this._contentRect.height += e - i), this) : i;
  }
  rowsHeight(t, e) {
    return L0(this._data, t, e);
  }
  isLastRow(t) {
    return Ii(this._data, t);
  }
  col(t, e) {
    return e ? (e.width && this.colWidth(t, e.width), Ft(this._data, t, e), this) : Ft(this._data, t);
  }
  colWidth(t, e) {
    const r = Oe(this._data, t);
    return e ? (r !== e && (Oe(this._data, t, e), this._contentRect.width += e - r), this) : r;
  }
  colsWidth(t, e) {
    return M0(this._data, t, e);
  }
  isLastCol(t) {
    return Pi(this._data, t);
  }
  formulaParser(t) {
    return this._cells.formulaParser(t), this;
  }
  formatter(t) {
    return this._cells.formatter(t), this;
  }
  /**
   * 获取 style 样式 index
   * @param row
   * @param col
   * @returns
   */
  getStyleIndex(t, e) {
    const r = this.cell(t, e);
    return r instanceof Object && r.style !== void 0 && r.style >= 0 ? r.style : -1;
  }
  getPureStyle(t, e) {
    const r = this.getStyleIndex(t, e);
    return r !== -1 ? rr(this._data, r, !1) : null;
  }
  getStyle(t, e, r) {
    const i = this.getStyleIndex(t, e);
    return i !== -1 ? rr(this._data, i, !!r) : this._data.style;
  }
  /**
   * 设置 style
   * @param row
   * @param col
   * @param style
   * @param rewrite 为 true 时, 重写要设置的全部样式, 否则只进行合并
   */
  setStyle(t, e, r, i = !1) {
    let n = this.getStyleIndex(t, e);
    if (!i && n !== -1 && (r = Object.assign({}, this.style(n, !1) || {}, r)), n !== -1)
      this.updateStyle(n, r);
    else {
      n = this.addStyle(r);
      const o = this.cell(t, e);
      o instanceof Object ? o.style = n : this.cell(t, e, {
        value: o || "",
        style: n
      });
    }
    return this;
  }
  style(t, e = !0) {
    return rr(this._data, t, e);
  }
  addStyle(t) {
    return z0(this._data, t, this);
  }
  updateStyle(t, e) {
    return Ri(this._data, t, e);
  }
  clearStyles() {
    return Si(this._data), this;
  }
  addBorder(...t) {
    return ki(this._data, t), this;
  }
  clearBorder(t) {
    return $i(this._data, t), this;
  }
  clearBorders() {
    return Hi(this._data), this;
  }
  eachRange(t, e, r) {
    const [i, n] = t, [o, c] = e;
    for (let h = i; h <= o; h++)
      for (let l = n; l <= c; l++)
        r(h, l);
  }
  cell(t, e, r) {
    const { _cells: i } = this;
    if (r)
      return i.set(t, e, r), this;
    const n = i.get(t, e);
    return n != null ? n[2] : n;
  }
  cellValue(t, e) {
    return T0(this.cell(t, e));
  }
  cellValueString(t, e) {
    return jt(this.cell(t, e));
  }
  render() {
    var n;
    const { _data: t, _renderer: e, _overlayer: r } = this;
    for (const o in this._rendererOptions) {
      const c = this._rendererOptions[o];
      c && o in e && typeof e[o] == "function" && e[o](c);
    }
    e.scrollRows(t.scroll[0]).scrollCols(t.scroll[1]).merges(t.merges).freeze(t.freeze || "A1").styles(t.styles).borders(t.borders).rows(t.rows.len).cols(t.cols.len).row((o) => Rt(t, o)).col((o) => Ft(t, o)).cell((o, c) => this.cell(o, c)).formatter(this._cells._formatter).render();
    const { viewport: i } = e;
    if (i && (i.areas.forEach((o, c) => {
      r.area(c, o);
    }), i.headerAreas.forEach((o, c) => {
      r.headerArea(c, o);
    }), Ht.resize(this)), this._renderer._activeRowHeight) {
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
      e.render(), j.reset(this), this._canvas.focus();
    }
    return (n = this._headMenu) == null || n.render(), this;
  }
  data(t, e) {
    return t ? (e ? this._data = t : Object.assign(this._data, t), this._cells.load(this._data), Ye(this), this) : {
      ...this._data,
      cells: this._cells._
    };
  }
  /**
   * copy data to ...
   * @param to
   * @param autofill
   */
  copy(t, e = !1) {
    if (!t) return this;
    const r = (n, o) => ({
      range: typeof n == "string" ? U.with(n) : n,
      cells: o._cells,
      data: o._data
    }), i = (n) => {
      const { _selector: o } = n;
      if (!o) return null;
      const c = o.currentRange;
      return c === void 0 ? null : r(c, n);
    };
    return zi(
      i(this),
      t instanceof je ? i(t) : r(t, this),
      e
    ), this;
  }
  fill(t, e) {
    const { _selector: r } = this;
    let [i, n] = [0, 0];
    if (e)
      [n, i] = et(e);
    else {
      if (!r) return this;
      [i, n] = r._focus;
    }
    let [o, c] = [0, 0];
    if (Array.isArray(t)) {
      for (const [h, l] of t.entries()) {
        c = n + l.length - 1, l[l.length - 1] || c--;
        for (const [a, x] of l.entries())
          this.cell(i + h, n + a, x);
      }
      o = i + t.length - 1;
    } else typeof t == "string" && ([o, c] = io(this, t, [i, n]));
    return (o > 0 || c > 0) && (j.unionRange(this, o, c), j.reset(this)), this;
  }
  /**
   * @param from A1:H12
   */
  toHtml(t) {
    return ro(this, t);
  }
  toArrays(t) {
    const e = U.with(t), r = [];
    return e.eachRow((i) => {
      const n = [];
      e.eachCol((o) => {
        n.push(this.cellValue(i, o));
      }), r.push(n);
    }), r;
  }
  onClick(t) {
    return this._emitter.on("click", t), this;
  }
  onContextmenu(t) {
    return this._emitter.on("contextmenu", t), this;
  }
  addHistory(t) {
    this._history && this._history.add({
      type: t,
      data: this.data()
    });
  }
  /**
   * @param type keyof cell.type
   * @param editor
   * @returns
   */
  addEditor(t, e) {
    return this._editors.set(t, e), this;
  }
  static create(t, e, r, i) {
    return new je(t, e, r, i);
  }
  changeLang(t) {
    return this._i18n.changeLang(t), this;
  }
}
function Ye(s) {
  s._contentRect = {
    x: s._renderer._rowHeader.width,
    y: s._renderer._colHeader.height,
    width: M0(s._data),
    height: L0(s._data)
  };
}
window && (window.wolfp = je);
export {
  Nt as HElement,
  xt as Renders,
  je as default,
  M as h,
  Ye as resizeContentRect
};
