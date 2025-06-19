var Es = Object.defineProperty;
var Hr = (s) => {
  throw TypeError(s);
};
var Bs = (s, t, e) => t in s ? Es(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var v = (s, t, e) => Bs(s, typeof t != "symbol" ? t + "" : t, e), Tr = (s, t, e) => t.has(s) || Hr("Cannot " + e);
var Lt = (s, t, e) => (Tr(s, t, "read from private field"), e ? e.call(s) : t.get(s)), tr = (s, t, e) => t.has(s) ? Hr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), er = (s, t, e, r) => (Tr(s, t, "write to private field"), r ? r.call(s, e) : t.set(s, e), e);
const N = "wolf-table";
function rr(...s) {
  const t = document.createDocumentFragment();
  return s.forEach((e) => {
    let r;
    e instanceof qt ? r = e._ : typeof e == "string" ? r = document.createTextNode(e) : r = e, t.append(r);
  }), t;
}
function As(s) {
  return s.replace(/([a-zA-Z])([A-Z])/g, "$1-$2").toLowerCase();
}
class qt {
  constructor(t, e) {
    v(this, "_");
    v(this, "_data", /* @__PURE__ */ new Map());
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
  css(t, e, r) {
    const { style: i } = this._;
    if (typeof t == "string")
      if (e) {
        let n;
        return e.includes(" !important") && (e = e.replaceAll(" !important", ""), n = "important"), i.setProperty(t, e, n), this;
      } else
        return i.getPropertyValue(t);
    return this.setStyles(t);
  }
  setStyles(t) {
    for (const e in t) {
      let r = t[e];
      typeof r == "number" && (r = r + "px"), r !== void 0 && this.css(As(e), String(r));
    }
    return this;
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
  isShow() {
    return this.css("display") !== "none";
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
    return this._.after(rr(...t)), this;
  }
  before(...t) {
    return this._.before(rr(...t)), this;
  }
  append(...t) {
    return this._.append(rr(...t)), this;
  }
  remove(...t) {
    t.forEach((e) => {
      (e instanceof qt ? e._ : e).remove();
    });
  }
  cloneNode() {
    return this._.cloneNode(!0);
  }
  get firstChild() {
    const t = this._.firstChild;
    return t ? new qt(t) : null;
  }
}
function z(s, t) {
  return new qt(s, t);
}
function _t() {
  return z("div", `${N}-overlayer-area`);
}
class Ds {
  constructor(t) {
    v(this, "_areas");
    v(this, "_headerAreas");
    v(this, "_areaRects", []);
    this._areas = [_t(), _t(), _t(), _t()], this._headerAreas = [_t(), _t(), _t(), _t()], t.append(...this._areas, ...this._headerAreas);
  }
  area(t, e) {
    if (e) {
      this._areaRects[t] = e;
      const { x: r, y: i, height: n, width: o } = e;
      return this._areas[t].setStyles({
        left: `${r}px`,
        top: `${i}px`,
        width: `${o}px`,
        height: `${n}px`
      }), this;
    }
    return this._areas[t];
  }
  headerArea(t, e) {
    if (e) {
      const { x: r, y: i, height: n, width: o } = e;
      this._headerAreas[t].setStyles({
        left: `${r}px`,
        top: `${i}px`,
        width: `${o}px`,
        height: `${n}px`
      });
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
const lr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function Fs(s) {
  return lr.charAt(s % lr.length);
}
function zi(s) {
  const t = [];
  for (; s >= 0; )
    t.push(Fs(s)), s = Number.parseInt(`${s / lr.length}`, 10) - 1;
  return t.reverse().join("");
}
function Rs(s) {
  let t = 0;
  for (let e = 0; e < s.length; e++)
    t = 26 * t + s.charCodeAt(e) - 64;
  return t - 1;
}
function it(s) {
  let t = "", e = "";
  for (let r = 0; r < s.length; r += 1)
    s.charAt(r) >= "0" && s.charAt(r) <= "9" ? e += s.charAt(r) : t += s.charAt(r).toUpperCase();
  return [Rs(t), Number.parseInt(e, 10) - 1];
}
function Q(s, t) {
  return `${zi(s)}${t + 1}`;
}
function Pr(s, t, e) {
  const [r, i] = it(s);
  return Q(r + t, i + e);
}
function Ir(s) {
  const t = /^([A-Z]+)(\d+)$/;
  if (!t.test(s)) return !1;
  const e = t.exec(s);
  if (!e) return !1;
  const [, r, i] = e, n = parseInt(i, 10);
  return n < 1 || n > 1048576 ? !1 : /^[A-Z]+$/.test(r) && r.length > 0;
}
class Ss {
  constructor(t, e) {
    v(this, "_target");
    v(this, "_ctx");
    v(this, "_scale");
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
class X {
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
    return new X(
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
    return new X(
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
      new X(r, i, c.startRow - 1, o),
      // top
      new X(c.endRow + 1, i, n, o),
      // bottom
      new X(c.startRow, i, c.endRow, c.startCol - 1),
      // left
      new X(c.startRow, c.endCol + 1, c.endRow, o)
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
    return new X(this.startRow, this.startCol, this.endRow, this.endCol);
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
      return t > r && (n = r, c = t), e > i && (o = i, h = e), new X(n, o, c, h);
    }
    return new X(t, e, t, e);
  }
  static with(t) {
    const e = t.split(":"), [r, i] = it(e[0]);
    if (e.length === 1)
      return this.create(i, r);
    const [n, o] = it(e[1]);
    return this.create(i, r, o, n);
  }
}
function ks(s, t) {
  s && s.length > 0 && s.forEach((e) => {
    t(X.with(e));
  });
}
class Mi {
  constructor(t) {
    v(this, "_");
    v(this, "_target", null);
    v(this, "_rect", null);
    v(this, "_oldValue", "");
    v(this, "_value");
    v(this, "_visible", !1);
    v(this, "_moveChanger", () => {
    });
    v(this, "_changer", () => {
    });
    v(this, "storeHistory", () => 0);
    this._ = z("div", t);
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
      this._.setStyles({
        left: `${e - 2 / 2}px`,
        top: `${r - 2 / 2}px`,
        width: `${i - 2}px`,
        height: `${n - 2}px`
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
class $s {
  constructor() {
    v(this, "_", []);
    v(this, "_indexes", /* @__PURE__ */ new Map());
    v(this, "_formulas", []);
    v(this, "_formulaParser", (t) => t);
    v(this, "_formatter", (t, e, r) => r);
    v(this, "_releasedIndexs", []);
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
function Oi(s) {
  return s instanceof Object ? s.value : s;
}
function jt(s) {
  const t = Oi(s);
  return `${t ?? ""}`;
}
function Wi(s, t, e, r, i) {
  const { scroll: n } = s, o = r === "row" ? 0 : 1, c = r === "row" ? 3 : 2;
  let h = n[c], l = !1;
  const a = n[o];
  let u = 0;
  const { freeze: f } = s;
  if (f && (u = it(f)[r === "row" ? 1 : 0]), e > 0)
    if (t === "+")
      for (let x = a; !(h >= e); x += 1) {
        const d = i(u + x);
        h += d, s.scroll[o] = x + 1, l = !0;
      }
    else
      for (let x = a; !(h <= e); x -= 1) {
        const d = i(u + x - 1);
        if (h -= d, s.scroll[o] = x - 1, l = !0, d > 0) break;
      }
  else
    s.scroll[o] = 0, h = 0, l = !0;
  return n[c] = h, l;
}
function Hs(s, t, e) {
  return t && e !== void 0 ? Wi(s, t, e, "col", (r) => Rt(s, r).width) : s.scroll[2];
}
function Ts(s, t, e) {
  return t && e !== void 0 ? Wi(s, t, e, "row", (r) => St(s, r).height) : s.scroll[3];
}
function zr({ merges: s }, t) {
  if (s) {
    const e = X.with(t);
    for (let r = 0; r < s.length; r += 1)
      if (X.with(s[r]).equals(e))
        return !0;
  }
  return !1;
}
function Mr(s, t) {
  const e = X.with(t);
  if (!e.multiple) return;
  s.merges || (s.merges = []);
  const { merges: r } = s;
  r.length <= 0 || r.forEach((i, n) => {
    X.with(i).within(e) && r.splice(n, 1);
  }), r.push(t);
}
function cr({ merges: s }, t) {
  if (s) {
    for (let e = 0; e < s.length; e += 1)
      if (s[e] === t) {
        s.splice(e, 1);
        return;
      }
  }
}
function Li({ merges: s }, t) {
  if (s)
    for (let e = 0; e < s.length; e += 1) {
      const r = X.with(s[e]);
      r.intersects(t) && (t = r.union(t));
    }
  return t;
}
function Vi(s, t, e) {
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
function Ps(s, t, e, r) {
  s.styles[t] = e;
}
function ir(s, t, e = !0) {
  const r = s.styles[t];
  return e ? Object.assign({}, s.style, s.styles[t] || {}) : r;
}
function Is(s) {
  s.styles.length = 0;
}
function zs(s, t) {
  s.borders || (s.borders = []);
  const e = X.with(t[0]), { borders: r } = s;
  for (let i = 0; i < r.length; i += 1) {
    const [n, ...o] = r[i], c = X.with(n);
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
function Ms(s, t) {
  const { borders: e } = s;
  if (e) {
    const r = [], i = X.with(t);
    for (let n = 0; n < e.length; n += 1) {
      const [o, ...c] = e[n], h = X.with(o);
      h.intersects(i) && (h.within(i) || h.difference(i).forEach((l) => {
        r.push([l.toString(), ...c]);
      }), e.splice(n, 1), n -= 1);
    }
    e.push(...r);
  }
}
function Os(s) {
  s.borders.length = 0;
}
function Ni(s, t, e) {
  let r = 0;
  for (let i = s; i < t; i += 1) r += e(i);
  return r;
}
function Ws(s) {
  return s <= 0.75 ? 1 : s <= 1.5 ? 2 : s <= 2.25 ? 3 : s <= 3 ? 4 : s <= 3.75 ? 5 : s <= 4.5 ? 6 : 96 / 72 * s;
}
function Rt(s, t, e) {
  const r = s.cols[t] || { width: s.colWidth };
  return e ? s.cols[t] = Object.assign(r, e) : r;
}
function Me(s, t, e) {
  if (e) {
    const { cols: r } = s;
    r[t] ? r[t].width = e : r[t] = { width: e };
  } else {
    const r = Rt(s, t);
    return r.hide ? 0 : r.width;
  }
}
function qi(s, t, e) {
  const { cols: r } = s;
  if (arguments.length === 1) {
    let i = r.len * s.colWidth;
    for (const n in r)
      if (n !== "len") {
        const o = Me(s, Number.parseInt(n, 10));
        o > 0 && (i += o, i -= s.colWidth);
      }
    return i;
  }
  return Ni(
    t !== void 0 ? t : 0,
    e !== void 0 ? e : r.len,
    (i) => Me(s, i)
  );
}
function Ls(s, t) {
  return s.cols.len - 1 === t;
}
function Oe(s, t, e) {
  for (; ; )
    if (Rt(s, t).hide) t += e;
    else return t;
}
function ji(s) {
  let t = 0;
  return s.cells.forEach((e) => {
    e && e[1] > t && (t = e[1]);
  }), t;
}
function St(s, t, e) {
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
    const i = St(s, t);
    return i.hide ? 0 : i.height;
  }
}
function Yi(s, t, e) {
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
  return Ni(
    t !== void 0 ? t : 0,
    e !== void 0 ? e : r.len,
    (i) => We(s, i)
  );
}
function Vs(s, t) {
  return s.rows.len - 1 === t;
}
function Le(s, t, e) {
  for (; ; )
    if (St(s, t).hide) t += e;
    else return t;
}
function Ui(s) {
  let t = 0;
  return s.cells.forEach((e) => {
    e && e[0] > t && (t = e[0]);
  }), t;
}
function Ns(s, t, e = !1) {
  if (!s || !t) return;
  const r = s.range.position(t.range);
  if (r === "none") return;
  const { rows: i, cols: n } = s.range;
  t.range.each((o, c) => {
    let h = s.range.startRow, l = s.range.startCol, a, u, f = [o - t.range.startRow, c - t.range.startCol];
    ["up", "left"].includes(r) && (f = [t.range.endRow - o, t.range.endCol - c]), r === "down" || r === "up" ? i <= 0 && e && (a = r, u = f[0] + 1, r === "up" && (u = 0 - u)) : n <= 0 && e && (a = r, u = f[1] + 1, r === "left" && (u = 0 - u));
    const x = f[1] % (n + 1), d = f[0] % (i + 1);
    ["up", "left"].includes(r) ? (h = s.range.endRow - d, l = s.range.endCol - x) : (h += d, l += x), qs(h, l, o, c, s, t, a, u);
  });
}
function qs(s, t, e, r, i, n, o, c) {
  const h = i.cells.get(s, t);
  if (h !== null && h[2] !== void 0 && h[2] !== null) {
    let l = h[2];
    if (l instanceof Object) {
      if (l = Object.assign({}, l), l.style !== void 0 && i.cells !== n.cells) {
        const a = Object.assign({}, i.data.styles[l.style]);
        l.style = Vi(n.data, a);
      }
      o !== void 0 && c !== void 0 && (l.formula ? l.formula = l.formula.replace(
        /[A-Za-z]{1,3}\d+/g,
        (a) => ["left", "top"].includes(o) ? Pr(a, c, 0) : Pr(a, 0, c)
      ) : l.value && (ut.use().getRender(bt(l)).disableAutoFillAction || (l.value = String(Or(l.value, c)))));
    } else
      c !== void 0 && (l = Or(l, c));
    n.cells.set(e, r, l);
  } else
    n.cells.remove(s, t);
}
function Or(s, t) {
  return typeof s == "string" ? s.replace(/(\d+$)|((\d+)\D+$)/g, (e) => e.replace(/\d+/, (r) => `${Number.parseInt(r) + t}`)) : s + t;
}
function js() {
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
class Ys extends Mi {
  constructor() {
    super(`${N}-editor`);
    v(this, "_text", z("textarea", ""));
    v(this, "_textMeasure", z("div", "measure"));
    v(this, "_editing", !1);
    this._.append(this._text, this._textMeasure), this._text.on("keydown", (e) => {
      Us(this, e);
    }).on("input", (e) => {
      const r = e.target, { value: i } = r;
      this._editing = !0, this._value = i, Wr(this);
    });
  }
  value(e) {
    return super.value(e), this._text.value(jt(e) || ""), Wr(this), this;
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
function Wr(s) {
  const { _: t, _value: e, _rect: r, _textMeasure: i, _target: n } = s;
  if (typeof e != "string") return;
  let o = e.replace(`
`, "<br/>");
  if (e.endsWith(`
`) && (o += "T"), i.html(o), r && n) {
    const c = Number.parseInt(i.computedStyle().getPropertyValue("padding")), h = n.offset(), l = h.width - r.x - 2, a = h.height - r.y - 2;
    t.css("max-width", `${l}px`), i.css("max-width", `${l - c * 2}px`);
    const { width: u, height: f } = i.rect(), x = r.width - 2;
    u > x && t.setStyles({ width: `${u}px` }), f > r.height && f <= a ? t.setStyles({ height: `${f}px` }) : f < r.height && t.setStyles({ height: `${r.height - 2}px` });
  }
}
function Us(s, t) {
  const { code: e, shiftKey: r, metaKey: i, altKey: n, ctrlKey: o, target: c } = t, h = (l) => {
    s.hide(), s._moveChanger(l);
  };
  e === "Enter" || e === "NumpadEnter" ? (n ? (c.value += `
`, s.value(c.value)) : h(r ? "up" : "down"), t.preventDefault()) : e === "Tab" && !o && !i && !n ? (h(r ? "left" : "right"), t.preventDefault()) : e === "Escape" && (s.cancel(), h("none"), t.preventDefault());
}
function Xi(s, t, e, r, i) {
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
function Ki(s, t, e, r, i, n, o) {
  let c = 0;
  s === "underline" ? e === "top" ? c = -o : e === "middle" && (c = -o / 2) : s === "strikethrough" && (e === "top" ? c = -o / 2 : e === "bottom" && (c = o / 2));
  let h = 0;
  return t === "center" ? h = n / 2 : t === "right" && (h = n), [r - h, i - c, r - h + n, i - c];
}
function Gi(s, t, e) {
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
function Zi(s, t, e, r) {
  if (s && t) {
    let i = "";
    return e && (i += "italic "), r && (i += "bold "), `${i} ${t}pt ${s}`;
  }
}
const Qi = (s, t, e, r, i, n, o, c) => {
  c || (c = Ge(t, r, n));
  const {
    fontSize: h,
    fontFamily: l,
    bold: a,
    italic: u,
    color: f,
    align: x,
    valign: d,
    underline: p,
    strikethrough: g,
    textwrap: w,
    padding: _
  } = r;
  s.save().beginPath().prop({
    textAlign: x,
    textBaseline: d,
    font: Zi(l, h, u, a),
    fillStyle: f
  });
  const [m, C] = _ || [5, 5], b = Gi(x, e.width, m), y = c.split(`
`), A = e.width - m * 2, D = [];
  y.forEach((S) => {
    const H = s.measureTextWidth(S);
    if (w && H > A) {
      let L = { w: 0, len: 0, start: 0 };
      for (let k = 0; k < S.length; k += 1)
        L.w > A && (D.push(S.slice(L.start, k)), L = { w: 0, len: 0, start: k }), L.len++, L.w += s.measureTextWidth(S[k]) + 1;
      L.len > 0 && D.push(S.slice(L.start));
    } else
      D.push(S);
  });
  const $ = h / 0.75, E = (D.length - 1) * $, B = [];
  p && B.push("underline"), g && B.push("strikethrough");
  let P = Xi(d, e.height, E, $, C), T = 0;
  const F = (D.length > 0 ? D.length : 1) * $;
  return D.forEach((S) => {
    const H = s.measureTextWidth(S);
    T = Math.max(T, H), s.fillText(S, b, P), B.forEach((L) => {
      s._ctx.strokeStyle = f, s.line(...Ki(L, x, d, b, P, H, h));
    }), P += $;
  }), s.restore(), {
    contentInfo: {
      width: T,
      height: F + 10
    }
  };
}, Xs = (s, t, e, r, i) => `>${s.cellValueString(e, r)}</td>`, Ks = (s, t, e) => {
  const r = t.innerHTML.replace(/<br(\/){0,1}>/gi, `
`).replace(/(<([^>]+)>|)/gi, "").replace("&nbsp;", " "), i = {};
  return Object.keys(e).length > 0 && (i.style = s.addStyle(e)), r !== null && !/^\s*$/.test(r) && (i.value = r), i;
}, Gs = Ys;
var sr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ji(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
function Zs(s) {
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
function Qs(s) {
  throw new Error('Could not dynamically require "' + s + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Jt = { exports: {} };
const Js = {}, t0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Js
}, Symbol.toStringTag, { value: "Module" })), e0 = /* @__PURE__ */ Zs(t0);
var r0 = Jt.exports, Lr;
function K() {
  return Lr || (Lr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r();
    })(r0, function() {
      var e = e || function(r, i) {
        var n;
        if (typeof window < "u" && window.crypto && (n = window.crypto), typeof self < "u" && self.crypto && (n = self.crypto), typeof globalThis < "u" && globalThis.crypto && (n = globalThis.crypto), !n && typeof window < "u" && window.msCrypto && (n = window.msCrypto), !n && typeof sr < "u" && sr.crypto && (n = sr.crypto), !n && typeof Qs == "function")
          try {
            n = e0;
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
          function _() {
          }
          return function(m) {
            var C;
            return _.prototype = m, C = new _(), _.prototype = null, C;
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
            extend: function(_) {
              var m = c(this);
              return _ && m.mixIn(_), (!m.hasOwnProperty("init") || this.init === m.init) && (m.init = function() {
                m.$super.init.apply(this, arguments);
              }), m.init.prototype = m, m.$super = this, m;
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
              var _ = this.extend();
              return _.init.apply(_, arguments), _;
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
            mixIn: function(_) {
              for (var m in _)
                _.hasOwnProperty(m) && (this[m] = _[m]);
              _.hasOwnProperty("toString") && (this.toString = _.toString);
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
        }(), u = l.WordArray = a.extend({
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
          init: function(_, m) {
            _ = this.words = _ || [], m != i ? this.sigBytes = m : this.sigBytes = _.length * 4;
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
          toString: function(_) {
            return (_ || x).stringify(this);
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
          concat: function(_) {
            var m = this.words, C = _.words, b = this.sigBytes, y = _.sigBytes;
            if (this.clamp(), b % 4)
              for (var A = 0; A < y; A++) {
                var D = C[A >>> 2] >>> 24 - A % 4 * 8 & 255;
                m[b + A >>> 2] |= D << 24 - (b + A) % 4 * 8;
              }
            else
              for (var $ = 0; $ < y; $ += 4)
                m[b + $ >>> 2] = C[$ >>> 2];
            return this.sigBytes += y, this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var _ = this.words, m = this.sigBytes;
            _[m >>> 2] &= 4294967295 << 32 - m % 4 * 8, _.length = r.ceil(m / 4);
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
            var _ = a.clone.call(this);
            return _.words = this.words.slice(0), _;
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
          random: function(_) {
            for (var m = [], C = 0; C < _; C += 4)
              m.push(o());
            return new u.init(m, _);
          }
        }), f = h.enc = {}, x = f.Hex = {
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
          stringify: function(_) {
            for (var m = _.words, C = _.sigBytes, b = [], y = 0; y < C; y++) {
              var A = m[y >>> 2] >>> 24 - y % 4 * 8 & 255;
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
          parse: function(_) {
            for (var m = _.length, C = [], b = 0; b < m; b += 2)
              C[b >>> 3] |= parseInt(_.substr(b, 2), 16) << 24 - b % 8 * 4;
            return new u.init(C, m / 2);
          }
        }, d = f.Latin1 = {
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
          stringify: function(_) {
            for (var m = _.words, C = _.sigBytes, b = [], y = 0; y < C; y++) {
              var A = m[y >>> 2] >>> 24 - y % 4 * 8 & 255;
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
          parse: function(_) {
            for (var m = _.length, C = [], b = 0; b < m; b++)
              C[b >>> 2] |= (_.charCodeAt(b) & 255) << 24 - b % 4 * 8;
            return new u.init(C, m);
          }
        }, p = f.Utf8 = {
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
          stringify: function(_) {
            try {
              return decodeURIComponent(escape(d.stringify(_)));
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
          parse: function(_) {
            return d.parse(unescape(encodeURIComponent(_)));
          }
        }, g = l.BufferedBlockAlgorithm = a.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new u.init(), this._nDataBytes = 0;
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
          _append: function(_) {
            typeof _ == "string" && (_ = p.parse(_)), this._data.concat(_), this._nDataBytes += _.sigBytes;
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
          _process: function(_) {
            var m, C = this._data, b = C.words, y = C.sigBytes, A = this.blockSize, D = A * 4, $ = y / D;
            _ ? $ = r.ceil($) : $ = r.max(($ | 0) - this._minBufferSize, 0);
            var E = $ * A, B = r.min(E * 4, y);
            if (E) {
              for (var P = 0; P < E; P += A)
                this._doProcessBlock(b, P);
              m = b.splice(0, E), C.sigBytes -= B;
            }
            return new u.init(m, B);
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
            var _ = a.clone.call(this);
            return _._data = this._data.clone(), _;
          },
          _minBufferSize: 0
        });
        l.Hasher = g.extend({
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
          init: function(_) {
            this.cfg = this.cfg.extend(_), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            g.reset.call(this), this._doReset();
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
          update: function(_) {
            return this._append(_), this._process(), this;
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
          finalize: function(_) {
            _ && this._append(_);
            var m = this._doFinalize();
            return m;
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
          _createHelper: function(_) {
            return function(m, C) {
              return new _.init(C).finalize(m);
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
          _createHmacHelper: function(_) {
            return function(m, C) {
              return new w.HMAC.init(_, C).finalize(m);
            };
          }
        });
        var w = h.algo = {};
        return h;
      }(Math);
      return e;
    });
  }(Jt)), Jt.exports;
}
var te = { exports: {} }, i0 = te.exports, Vr;
function Ke() {
  return Vr || (Vr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(i0, function(e) {
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
            for (var l = this.words, a = l.length, u = [], f = 0; f < a; f++) {
              var x = l[f];
              u.push(x.high), u.push(x.low);
            }
            return c.create(u, this.sigBytes);
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
            for (var l = o.clone.call(this), a = l.words = this.words.slice(0), u = a.length, f = 0; f < u; f++)
              a[f] = a[f].clone();
            return l;
          }
        });
      }(), e;
    });
  }(te)), te.exports;
}
var ee = { exports: {} }, s0 = ee.exports, Nr;
function n0() {
  return Nr || (Nr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(s0, function(e) {
      return function() {
        if (typeof ArrayBuffer == "function") {
          var r = e, i = r.lib, n = i.WordArray, o = n.init, c = n.init = function(h) {
            if (h instanceof ArrayBuffer && (h = new Uint8Array(h)), (h instanceof Int8Array || typeof Uint8ClampedArray < "u" && h instanceof Uint8ClampedArray || h instanceof Int16Array || h instanceof Uint16Array || h instanceof Int32Array || h instanceof Uint32Array || h instanceof Float32Array || h instanceof Float64Array) && (h = new Uint8Array(h.buffer, h.byteOffset, h.byteLength)), h instanceof Uint8Array) {
              for (var l = h.byteLength, a = [], u = 0; u < l; u++)
                a[u >>> 2] |= h[u] << 24 - u % 4 * 8;
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
var re = { exports: {} }, o0 = re.exports, qr;
function a0() {
  return qr || (qr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(o0, function(e) {
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
            for (var l = h.words, a = h.sigBytes, u = [], f = 0; f < a; f += 2) {
              var x = l[f >>> 2] >>> 16 - f % 4 * 8 & 65535;
              u.push(String.fromCharCode(x));
            }
            return u.join("");
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
            for (var l = h.length, a = [], u = 0; u < l; u++)
              a[u >>> 1] |= h.charCodeAt(u) << 16 - u % 2 * 16;
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
            for (var l = h.words, a = h.sigBytes, u = [], f = 0; f < a; f += 2) {
              var x = c(l[f >>> 2] >>> 16 - f % 4 * 8 & 65535);
              u.push(String.fromCharCode(x));
            }
            return u.join("");
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
            for (var l = h.length, a = [], u = 0; u < l; u++)
              a[u >>> 1] |= c(h.charCodeAt(u) << 16 - u % 2 * 16);
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
var ie = { exports: {} }, l0 = ie.exports, jr;
function yt() {
  return jr || (jr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(l0, function(e) {
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
            var l = h.words, a = h.sigBytes, u = this._map;
            h.clamp();
            for (var f = [], x = 0; x < a; x += 3)
              for (var d = l[x >>> 2] >>> 24 - x % 4 * 8 & 255, p = l[x + 1 >>> 2] >>> 24 - (x + 1) % 4 * 8 & 255, g = l[x + 2 >>> 2] >>> 24 - (x + 2) % 4 * 8 & 255, w = d << 16 | p << 8 | g, _ = 0; _ < 4 && x + _ * 0.75 < a; _++)
                f.push(u.charAt(w >>> 6 * (3 - _) & 63));
            var m = u.charAt(64);
            if (m)
              for (; f.length % 4; )
                f.push(m);
            return f.join("");
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
            var l = h.length, a = this._map, u = this._reverseMap;
            if (!u) {
              u = this._reverseMap = [];
              for (var f = 0; f < a.length; f++)
                u[a.charCodeAt(f)] = f;
            }
            var x = a.charAt(64);
            if (x) {
              var d = h.indexOf(x);
              d !== -1 && (l = d);
            }
            return c(h, l, u);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function c(h, l, a) {
          for (var u = [], f = 0, x = 0; x < l; x++)
            if (x % 4) {
              var d = a[h.charCodeAt(x - 1)] << x % 4 * 2, p = a[h.charCodeAt(x)] >>> 6 - x % 4 * 2, g = d | p;
              u[f >>> 2] |= g << 24 - f % 4 * 8, f++;
            }
          return n.create(u, f);
        }
      }(), e.enc.Base64;
    });
  }(ie)), ie.exports;
}
var se = { exports: {} }, c0 = se.exports, Yr;
function h0() {
  return Yr || (Yr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(c0, function(e) {
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
            var a = h.words, u = h.sigBytes, f = l ? this._safe_map : this._map;
            h.clamp();
            for (var x = [], d = 0; d < u; d += 3)
              for (var p = a[d >>> 2] >>> 24 - d % 4 * 8 & 255, g = a[d + 1 >>> 2] >>> 24 - (d + 1) % 4 * 8 & 255, w = a[d + 2 >>> 2] >>> 24 - (d + 2) % 4 * 8 & 255, _ = p << 16 | g << 8 | w, m = 0; m < 4 && d + m * 0.75 < u; m++)
                x.push(f.charAt(_ >>> 6 * (3 - m) & 63));
            var C = f.charAt(64);
            if (C)
              for (; x.length % 4; )
                x.push(C);
            return x.join("");
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
            var a = h.length, u = l ? this._safe_map : this._map, f = this._reverseMap;
            if (!f) {
              f = this._reverseMap = [];
              for (var x = 0; x < u.length; x++)
                f[u.charCodeAt(x)] = x;
            }
            var d = u.charAt(64);
            if (d) {
              var p = h.indexOf(d);
              p !== -1 && (a = p);
            }
            return c(h, a, f);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
        };
        function c(h, l, a) {
          for (var u = [], f = 0, x = 0; x < l; x++)
            if (x % 4) {
              var d = a[h.charCodeAt(x - 1)] << x % 4 * 2, p = a[h.charCodeAt(x)] >>> 6 - x % 4 * 2, g = d | p;
              u[f >>> 2] |= g << 24 - f % 4 * 8, f++;
            }
          return n.create(u, f);
        }
      }(), e.enc.Base64url;
    });
  }(se)), se.exports;
}
var ne = { exports: {} }, d0 = ne.exports, Ur;
function Et() {
  return Ur || (Ur = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(d0, function(e) {
      return function(r) {
        var i = e, n = i.lib, o = n.WordArray, c = n.Hasher, h = i.algo, l = [];
        (function() {
          for (var p = 0; p < 64; p++)
            l[p] = r.abs(r.sin(p + 1)) * 4294967296 | 0;
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
          _doProcessBlock: function(p, g) {
            for (var w = 0; w < 16; w++) {
              var _ = g + w, m = p[_];
              p[_] = (m << 8 | m >>> 24) & 16711935 | (m << 24 | m >>> 8) & 4278255360;
            }
            var C = this._hash.words, b = p[g + 0], y = p[g + 1], A = p[g + 2], D = p[g + 3], $ = p[g + 4], E = p[g + 5], B = p[g + 6], P = p[g + 7], T = p[g + 8], F = p[g + 9], S = p[g + 10], H = p[g + 11], L = p[g + 12], k = p[g + 13], V = p[g + 14], W = p[g + 15], R = C[0], I = C[1], O = C[2], M = C[3];
            R = u(R, I, O, M, b, 7, l[0]), M = u(M, R, I, O, y, 12, l[1]), O = u(O, M, R, I, A, 17, l[2]), I = u(I, O, M, R, D, 22, l[3]), R = u(R, I, O, M, $, 7, l[4]), M = u(M, R, I, O, E, 12, l[5]), O = u(O, M, R, I, B, 17, l[6]), I = u(I, O, M, R, P, 22, l[7]), R = u(R, I, O, M, T, 7, l[8]), M = u(M, R, I, O, F, 12, l[9]), O = u(O, M, R, I, S, 17, l[10]), I = u(I, O, M, R, H, 22, l[11]), R = u(R, I, O, M, L, 7, l[12]), M = u(M, R, I, O, k, 12, l[13]), O = u(O, M, R, I, V, 17, l[14]), I = u(I, O, M, R, W, 22, l[15]), R = f(R, I, O, M, y, 5, l[16]), M = f(M, R, I, O, B, 9, l[17]), O = f(O, M, R, I, H, 14, l[18]), I = f(I, O, M, R, b, 20, l[19]), R = f(R, I, O, M, E, 5, l[20]), M = f(M, R, I, O, S, 9, l[21]), O = f(O, M, R, I, W, 14, l[22]), I = f(I, O, M, R, $, 20, l[23]), R = f(R, I, O, M, F, 5, l[24]), M = f(M, R, I, O, V, 9, l[25]), O = f(O, M, R, I, D, 14, l[26]), I = f(I, O, M, R, T, 20, l[27]), R = f(R, I, O, M, k, 5, l[28]), M = f(M, R, I, O, A, 9, l[29]), O = f(O, M, R, I, P, 14, l[30]), I = f(I, O, M, R, L, 20, l[31]), R = x(R, I, O, M, E, 4, l[32]), M = x(M, R, I, O, T, 11, l[33]), O = x(O, M, R, I, H, 16, l[34]), I = x(I, O, M, R, V, 23, l[35]), R = x(R, I, O, M, y, 4, l[36]), M = x(M, R, I, O, $, 11, l[37]), O = x(O, M, R, I, P, 16, l[38]), I = x(I, O, M, R, S, 23, l[39]), R = x(R, I, O, M, k, 4, l[40]), M = x(M, R, I, O, b, 11, l[41]), O = x(O, M, R, I, D, 16, l[42]), I = x(I, O, M, R, B, 23, l[43]), R = x(R, I, O, M, F, 4, l[44]), M = x(M, R, I, O, L, 11, l[45]), O = x(O, M, R, I, W, 16, l[46]), I = x(I, O, M, R, A, 23, l[47]), R = d(R, I, O, M, b, 6, l[48]), M = d(M, R, I, O, P, 10, l[49]), O = d(O, M, R, I, V, 15, l[50]), I = d(I, O, M, R, E, 21, l[51]), R = d(R, I, O, M, L, 6, l[52]), M = d(M, R, I, O, D, 10, l[53]), O = d(O, M, R, I, S, 15, l[54]), I = d(I, O, M, R, y, 21, l[55]), R = d(R, I, O, M, T, 6, l[56]), M = d(M, R, I, O, W, 10, l[57]), O = d(O, M, R, I, B, 15, l[58]), I = d(I, O, M, R, k, 21, l[59]), R = d(R, I, O, M, $, 6, l[60]), M = d(M, R, I, O, H, 10, l[61]), O = d(O, M, R, I, A, 15, l[62]), I = d(I, O, M, R, F, 21, l[63]), C[0] = C[0] + R | 0, C[1] = C[1] + I | 0, C[2] = C[2] + O | 0, C[3] = C[3] + M | 0;
          },
          _doFinalize: function() {
            var p = this._data, g = p.words, w = this._nDataBytes * 8, _ = p.sigBytes * 8;
            g[_ >>> 5] |= 128 << 24 - _ % 32;
            var m = r.floor(w / 4294967296), C = w;
            g[(_ + 64 >>> 9 << 4) + 15] = (m << 8 | m >>> 24) & 16711935 | (m << 24 | m >>> 8) & 4278255360, g[(_ + 64 >>> 9 << 4) + 14] = (C << 8 | C >>> 24) & 16711935 | (C << 24 | C >>> 8) & 4278255360, p.sigBytes = (g.length + 1) * 4, this._process();
            for (var b = this._hash, y = b.words, A = 0; A < 4; A++) {
              var D = y[A];
              y[A] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360;
            }
            return b;
          },
          clone: function() {
            var p = c.clone.call(this);
            return p._hash = this._hash.clone(), p;
          }
        });
        function u(p, g, w, _, m, C, b) {
          var y = p + (g & w | ~g & _) + m + b;
          return (y << C | y >>> 32 - C) + g;
        }
        function f(p, g, w, _, m, C, b) {
          var y = p + (g & _ | w & ~_) + m + b;
          return (y << C | y >>> 32 - C) + g;
        }
        function x(p, g, w, _, m, C, b) {
          var y = p + (g ^ w ^ _) + m + b;
          return (y << C | y >>> 32 - C) + g;
        }
        function d(p, g, w, _, m, C, b) {
          var y = p + (w ^ (g | ~_)) + m + b;
          return (y << C | y >>> 32 - C) + g;
        }
        i.MD5 = c._createHelper(a), i.HmacMD5 = c._createHmacHelper(a);
      }(Math), e.MD5;
    });
  }(ne)), ne.exports;
}
var oe = { exports: {} }, f0 = oe.exports, Xr;
function ts() {
  return Xr || (Xr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(f0, function(e) {
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
          _doProcessBlock: function(a, u) {
            for (var f = this._hash.words, x = f[0], d = f[1], p = f[2], g = f[3], w = f[4], _ = 0; _ < 80; _++) {
              if (_ < 16)
                h[_] = a[u + _] | 0;
              else {
                var m = h[_ - 3] ^ h[_ - 8] ^ h[_ - 14] ^ h[_ - 16];
                h[_] = m << 1 | m >>> 31;
              }
              var C = (x << 5 | x >>> 27) + w + h[_];
              _ < 20 ? C += (d & p | ~d & g) + 1518500249 : _ < 40 ? C += (d ^ p ^ g) + 1859775393 : _ < 60 ? C += (d & p | d & g | p & g) - 1894007588 : C += (d ^ p ^ g) - 899497514, w = g, g = p, p = d << 30 | d >>> 2, d = x, x = C;
            }
            f[0] = f[0] + x | 0, f[1] = f[1] + d | 0, f[2] = f[2] + p | 0, f[3] = f[3] + g | 0, f[4] = f[4] + w | 0;
          },
          _doFinalize: function() {
            var a = this._data, u = a.words, f = this._nDataBytes * 8, x = a.sigBytes * 8;
            return u[x >>> 5] |= 128 << 24 - x % 32, u[(x + 64 >>> 9 << 4) + 14] = Math.floor(f / 4294967296), u[(x + 64 >>> 9 << 4) + 15] = f, a.sigBytes = u.length * 4, this._process(), this._hash;
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
var ae = { exports: {} }, u0 = ae.exports, Kr;
function pr() {
  return Kr || (Kr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(u0, function(e) {
      return function(r) {
        var i = e, n = i.lib, o = n.WordArray, c = n.Hasher, h = i.algo, l = [], a = [];
        (function() {
          function x(w) {
            for (var _ = r.sqrt(w), m = 2; m <= _; m++)
              if (!(w % m))
                return !1;
            return !0;
          }
          function d(w) {
            return (w - (w | 0)) * 4294967296 | 0;
          }
          for (var p = 2, g = 0; g < 64; )
            x(p) && (g < 8 && (l[g] = d(r.pow(p, 1 / 2))), a[g] = d(r.pow(p, 1 / 3)), g++), p++;
        })();
        var u = [], f = h.SHA256 = c.extend({
          _doReset: function() {
            this._hash = new o.init(l.slice(0));
          },
          _doProcessBlock: function(x, d) {
            for (var p = this._hash.words, g = p[0], w = p[1], _ = p[2], m = p[3], C = p[4], b = p[5], y = p[6], A = p[7], D = 0; D < 64; D++) {
              if (D < 16)
                u[D] = x[d + D] | 0;
              else {
                var $ = u[D - 15], E = ($ << 25 | $ >>> 7) ^ ($ << 14 | $ >>> 18) ^ $ >>> 3, B = u[D - 2], P = (B << 15 | B >>> 17) ^ (B << 13 | B >>> 19) ^ B >>> 10;
                u[D] = E + u[D - 7] + P + u[D - 16];
              }
              var T = C & b ^ ~C & y, F = g & w ^ g & _ ^ w & _, S = (g << 30 | g >>> 2) ^ (g << 19 | g >>> 13) ^ (g << 10 | g >>> 22), H = (C << 26 | C >>> 6) ^ (C << 21 | C >>> 11) ^ (C << 7 | C >>> 25), L = A + H + T + a[D] + u[D], k = S + F;
              A = y, y = b, b = C, C = m + L | 0, m = _, _ = w, w = g, g = L + k | 0;
            }
            p[0] = p[0] + g | 0, p[1] = p[1] + w | 0, p[2] = p[2] + _ | 0, p[3] = p[3] + m | 0, p[4] = p[4] + C | 0, p[5] = p[5] + b | 0, p[6] = p[6] + y | 0, p[7] = p[7] + A | 0;
          },
          _doFinalize: function() {
            var x = this._data, d = x.words, p = this._nDataBytes * 8, g = x.sigBytes * 8;
            return d[g >>> 5] |= 128 << 24 - g % 32, d[(g + 64 >>> 9 << 4) + 14] = r.floor(p / 4294967296), d[(g + 64 >>> 9 << 4) + 15] = p, x.sigBytes = d.length * 4, this._process(), this._hash;
          },
          clone: function() {
            var x = c.clone.call(this);
            return x._hash = this._hash.clone(), x;
          }
        });
        i.SHA256 = c._createHelper(f), i.HmacSHA256 = c._createHmacHelper(f);
      }(Math), e.SHA256;
    });
  }(ae)), ae.exports;
}
var le = { exports: {} }, x0 = le.exports, Gr;
function p0() {
  return Gr || (Gr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), pr());
    })(x0, function(e) {
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
var ce = { exports: {} }, _0 = ce.exports, Zr;
function es() {
  return Zr || (Zr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), Ke());
    })(_0, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.Hasher, o = r.x64, c = o.Word, h = o.WordArray, l = r.algo;
        function a() {
          return c.create.apply(c, arguments);
        }
        var u = [
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
        ], f = [];
        (function() {
          for (var d = 0; d < 80; d++)
            f[d] = a();
        })();
        var x = l.SHA512 = n.extend({
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
          _doProcessBlock: function(d, p) {
            for (var g = this._hash.words, w = g[0], _ = g[1], m = g[2], C = g[3], b = g[4], y = g[5], A = g[6], D = g[7], $ = w.high, E = w.low, B = _.high, P = _.low, T = m.high, F = m.low, S = C.high, H = C.low, L = b.high, k = b.low, V = y.high, W = y.low, R = A.high, I = A.low, O = D.high, M = D.low, Y = $, U = E, Z = B, q = P, st = T, G = F, et = S, J = H, rt = L, ot = k, Xt = V, It = W, Kt = R, zt = I, Je = O, Mt = M, ht = 0; ht < 80; ht++) {
              var lt, xt, Gt = f[ht];
              if (ht < 16)
                xt = Gt.high = d[p + ht * 2] | 0, lt = Gt.low = d[p + ht * 2 + 1] | 0;
              else {
                var wr = f[ht - 15], At = wr.high, Ot = wr.low, ds = (At >>> 1 | Ot << 31) ^ (At >>> 8 | Ot << 24) ^ At >>> 7, br = (Ot >>> 1 | At << 31) ^ (Ot >>> 8 | At << 24) ^ (Ot >>> 7 | At << 25), yr = f[ht - 2], Dt = yr.high, Wt = yr.low, fs = (Dt >>> 19 | Wt << 13) ^ (Dt << 3 | Wt >>> 29) ^ Dt >>> 6, Er = (Wt >>> 19 | Dt << 13) ^ (Wt << 3 | Dt >>> 29) ^ (Wt >>> 6 | Dt << 26), Br = f[ht - 7], us = Br.high, xs = Br.low, Ar = f[ht - 16], ps = Ar.high, Dr = Ar.low;
                lt = br + xs, xt = ds + us + (lt >>> 0 < br >>> 0 ? 1 : 0), lt = lt + Er, xt = xt + fs + (lt >>> 0 < Er >>> 0 ? 1 : 0), lt = lt + Dr, xt = xt + ps + (lt >>> 0 < Dr >>> 0 ? 1 : 0), Gt.high = xt, Gt.low = lt;
              }
              var _s = rt & Xt ^ ~rt & Kt, Fr = ot & It ^ ~ot & zt, vs = Y & Z ^ Y & st ^ Z & st, gs = U & q ^ U & G ^ q & G, ms = (Y >>> 28 | U << 4) ^ (Y << 30 | U >>> 2) ^ (Y << 25 | U >>> 7), Rr = (U >>> 28 | Y << 4) ^ (U << 30 | Y >>> 2) ^ (U << 25 | Y >>> 7), Cs = (rt >>> 14 | ot << 18) ^ (rt >>> 18 | ot << 14) ^ (rt << 23 | ot >>> 9), ws = (ot >>> 14 | rt << 18) ^ (ot >>> 18 | rt << 14) ^ (ot << 23 | rt >>> 9), Sr = u[ht], bs = Sr.high, kr = Sr.low, at = Mt + ws, pt = Je + Cs + (at >>> 0 < Mt >>> 0 ? 1 : 0), at = at + Fr, pt = pt + _s + (at >>> 0 < Fr >>> 0 ? 1 : 0), at = at + kr, pt = pt + bs + (at >>> 0 < kr >>> 0 ? 1 : 0), at = at + lt, pt = pt + xt + (at >>> 0 < lt >>> 0 ? 1 : 0), $r = Rr + gs, ys = ms + vs + ($r >>> 0 < Rr >>> 0 ? 1 : 0);
              Je = Kt, Mt = zt, Kt = Xt, zt = It, Xt = rt, It = ot, ot = J + at | 0, rt = et + pt + (ot >>> 0 < J >>> 0 ? 1 : 0) | 0, et = st, J = G, st = Z, G = q, Z = Y, q = U, U = at + $r | 0, Y = pt + ys + (U >>> 0 < at >>> 0 ? 1 : 0) | 0;
            }
            E = w.low = E + U, w.high = $ + Y + (E >>> 0 < U >>> 0 ? 1 : 0), P = _.low = P + q, _.high = B + Z + (P >>> 0 < q >>> 0 ? 1 : 0), F = m.low = F + G, m.high = T + st + (F >>> 0 < G >>> 0 ? 1 : 0), H = C.low = H + J, C.high = S + et + (H >>> 0 < J >>> 0 ? 1 : 0), k = b.low = k + ot, b.high = L + rt + (k >>> 0 < ot >>> 0 ? 1 : 0), W = y.low = W + It, y.high = V + Xt + (W >>> 0 < It >>> 0 ? 1 : 0), I = A.low = I + zt, A.high = R + Kt + (I >>> 0 < zt >>> 0 ? 1 : 0), M = D.low = M + Mt, D.high = O + Je + (M >>> 0 < Mt >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var d = this._data, p = d.words, g = this._nDataBytes * 8, w = d.sigBytes * 8;
            p[w >>> 5] |= 128 << 24 - w % 32, p[(w + 128 >>> 10 << 5) + 30] = Math.floor(g / 4294967296), p[(w + 128 >>> 10 << 5) + 31] = g, d.sigBytes = p.length * 4, this._process();
            var _ = this._hash.toX32();
            return _;
          },
          clone: function() {
            var d = n.clone.call(this);
            return d._hash = this._hash.clone(), d;
          },
          blockSize: 1024 / 32
        });
        r.SHA512 = n._createHelper(x), r.HmacSHA512 = n._createHmacHelper(x);
      }(), e.SHA512;
    });
  }(ce)), ce.exports;
}
var he = { exports: {} }, v0 = he.exports, Qr;
function g0() {
  return Qr || (Qr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), Ke(), es());
    })(v0, function(e) {
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
var de = { exports: {} }, m0 = de.exports, Jr;
function C0() {
  return Jr || (Jr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), Ke());
    })(m0, function(e) {
      return function(r) {
        var i = e, n = i.lib, o = n.WordArray, c = n.Hasher, h = i.x64, l = h.Word, a = i.algo, u = [], f = [], x = [];
        (function() {
          for (var g = 1, w = 0, _ = 0; _ < 24; _++) {
            u[g + 5 * w] = (_ + 1) * (_ + 2) / 2 % 64;
            var m = w % 5, C = (2 * g + 3 * w) % 5;
            g = m, w = C;
          }
          for (var g = 0; g < 5; g++)
            for (var w = 0; w < 5; w++)
              f[g + 5 * w] = w + (2 * g + 3 * w) % 5 * 5;
          for (var b = 1, y = 0; y < 24; y++) {
            for (var A = 0, D = 0, $ = 0; $ < 7; $++) {
              if (b & 1) {
                var E = (1 << $) - 1;
                E < 32 ? D ^= 1 << E : A ^= 1 << E - 32;
              }
              b & 128 ? b = b << 1 ^ 113 : b <<= 1;
            }
            x[y] = l.create(A, D);
          }
        })();
        var d = [];
        (function() {
          for (var g = 0; g < 25; g++)
            d[g] = l.create();
        })();
        var p = a.SHA3 = c.extend({
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
            for (var g = this._state = [], w = 0; w < 25; w++)
              g[w] = new l.init();
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          },
          _doProcessBlock: function(g, w) {
            for (var _ = this._state, m = this.blockSize / 2, C = 0; C < m; C++) {
              var b = g[w + 2 * C], y = g[w + 2 * C + 1];
              b = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360, y = (y << 8 | y >>> 24) & 16711935 | (y << 24 | y >>> 8) & 4278255360;
              var A = _[C];
              A.high ^= y, A.low ^= b;
            }
            for (var D = 0; D < 24; D++) {
              for (var $ = 0; $ < 5; $++) {
                for (var E = 0, B = 0, P = 0; P < 5; P++) {
                  var A = _[$ + 5 * P];
                  E ^= A.high, B ^= A.low;
                }
                var T = d[$];
                T.high = E, T.low = B;
              }
              for (var $ = 0; $ < 5; $++)
                for (var F = d[($ + 4) % 5], S = d[($ + 1) % 5], H = S.high, L = S.low, E = F.high ^ (H << 1 | L >>> 31), B = F.low ^ (L << 1 | H >>> 31), P = 0; P < 5; P++) {
                  var A = _[$ + 5 * P];
                  A.high ^= E, A.low ^= B;
                }
              for (var k = 1; k < 25; k++) {
                var E, B, A = _[k], V = A.high, W = A.low, R = u[k];
                R < 32 ? (E = V << R | W >>> 32 - R, B = W << R | V >>> 32 - R) : (E = W << R - 32 | V >>> 64 - R, B = V << R - 32 | W >>> 64 - R);
                var I = d[f[k]];
                I.high = E, I.low = B;
              }
              var O = d[0], M = _[0];
              O.high = M.high, O.low = M.low;
              for (var $ = 0; $ < 5; $++)
                for (var P = 0; P < 5; P++) {
                  var k = $ + 5 * P, A = _[k], Y = d[k], U = d[($ + 1) % 5 + 5 * P], Z = d[($ + 2) % 5 + 5 * P];
                  A.high = Y.high ^ ~U.high & Z.high, A.low = Y.low ^ ~U.low & Z.low;
                }
              var A = _[0], q = x[D];
              A.high ^= q.high, A.low ^= q.low;
            }
          },
          _doFinalize: function() {
            var g = this._data, w = g.words;
            this._nDataBytes * 8;
            var _ = g.sigBytes * 8, m = this.blockSize * 32;
            w[_ >>> 5] |= 1 << 24 - _ % 32, w[(r.ceil((_ + 1) / m) * m >>> 5) - 1] |= 128, g.sigBytes = w.length * 4, this._process();
            for (var C = this._state, b = this.cfg.outputLength / 8, y = b / 8, A = [], D = 0; D < y; D++) {
              var $ = C[D], E = $.high, B = $.low;
              E = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360, B = (B << 8 | B >>> 24) & 16711935 | (B << 24 | B >>> 8) & 4278255360, A.push(B), A.push(E);
            }
            return new o.init(A, b);
          },
          clone: function() {
            for (var g = c.clone.call(this), w = g._state = this._state.slice(0), _ = 0; _ < 25; _++)
              w[_] = w[_].clone();
            return g;
          }
        });
        i.SHA3 = c._createHelper(p), i.HmacSHA3 = c._createHmacHelper(p);
      }(Math), e.SHA3;
    });
  }(de)), de.exports;
}
var fe = { exports: {} }, w0 = fe.exports, ti;
function b0() {
  return ti || (ti = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(w0, function(e) {
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
        ]), u = o.create([
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
        ]), f = o.create([
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
        ]), x = o.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), d = o.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), p = h.RIPEMD160 = c.extend({
          _doReset: function() {
            this._hash = o.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          },
          _doProcessBlock: function(y, A) {
            for (var D = 0; D < 16; D++) {
              var $ = A + D, E = y[$];
              y[$] = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360;
            }
            var B = this._hash.words, P = x.words, T = d.words, F = l.words, S = a.words, H = u.words, L = f.words, k, V, W, R, I, O, M, Y, U, Z;
            O = k = B[0], M = V = B[1], Y = W = B[2], U = R = B[3], Z = I = B[4];
            for (var q, D = 0; D < 80; D += 1)
              q = k + y[A + F[D]] | 0, D < 16 ? q += g(V, W, R) + P[0] : D < 32 ? q += w(V, W, R) + P[1] : D < 48 ? q += _(V, W, R) + P[2] : D < 64 ? q += m(V, W, R) + P[3] : q += C(V, W, R) + P[4], q = q | 0, q = b(q, H[D]), q = q + I | 0, k = I, I = R, R = b(W, 10), W = V, V = q, q = O + y[A + S[D]] | 0, D < 16 ? q += C(M, Y, U) + T[0] : D < 32 ? q += m(M, Y, U) + T[1] : D < 48 ? q += _(M, Y, U) + T[2] : D < 64 ? q += w(M, Y, U) + T[3] : q += g(M, Y, U) + T[4], q = q | 0, q = b(q, L[D]), q = q + Z | 0, O = Z, Z = U, U = b(Y, 10), Y = M, M = q;
            q = B[1] + W + U | 0, B[1] = B[2] + R + Z | 0, B[2] = B[3] + I + O | 0, B[3] = B[4] + k + M | 0, B[4] = B[0] + V + Y | 0, B[0] = q;
          },
          _doFinalize: function() {
            var y = this._data, A = y.words, D = this._nDataBytes * 8, $ = y.sigBytes * 8;
            A[$ >>> 5] |= 128 << 24 - $ % 32, A[($ + 64 >>> 9 << 4) + 14] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360, y.sigBytes = (A.length + 1) * 4, this._process();
            for (var E = this._hash, B = E.words, P = 0; P < 5; P++) {
              var T = B[P];
              B[P] = (T << 8 | T >>> 24) & 16711935 | (T << 24 | T >>> 8) & 4278255360;
            }
            return E;
          },
          clone: function() {
            var y = c.clone.call(this);
            return y._hash = this._hash.clone(), y;
          }
        });
        function g(y, A, D) {
          return y ^ A ^ D;
        }
        function w(y, A, D) {
          return y & A | ~y & D;
        }
        function _(y, A, D) {
          return (y | ~A) ^ D;
        }
        function m(y, A, D) {
          return y & D | A & ~D;
        }
        function C(y, A, D) {
          return y ^ (A | ~D);
        }
        function b(y, A) {
          return y << A | y >>> 32 - A;
        }
        i.RIPEMD160 = c._createHelper(p), i.HmacRIPEMD160 = c._createHmacHelper(p);
      }(), e.RIPEMD160;
    });
  }(fe)), fe.exports;
}
var ue = { exports: {} }, y0 = ue.exports, ei;
function _r() {
  return ei || (ei = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(y0, function(e) {
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
            var u = l.blockSize, f = u * 4;
            a.sigBytes > f && (a = l.finalize(a)), a.clamp();
            for (var x = this._oKey = a.clone(), d = this._iKey = a.clone(), p = x.words, g = d.words, w = 0; w < u; w++)
              p[w] ^= 1549556828, g[w] ^= 909522486;
            x.sigBytes = d.sigBytes = f, this.reset();
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
            var a = this._hasher, u = a.finalize(l);
            a.reset();
            var f = a.finalize(this._oKey.clone().concat(u));
            return f;
          }
        });
      })();
    });
  }(ue)), ue.exports;
}
var xe = { exports: {} }, E0 = xe.exports, ri;
function B0() {
  return ri || (ri = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), pr(), _r());
    })(E0, function(e) {
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
          init: function(u) {
            this.cfg = this.cfg.extend(u);
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
          compute: function(u, f) {
            for (var x = this.cfg, d = l.create(x.hasher, u), p = o.create(), g = o.create([1]), w = p.words, _ = g.words, m = x.keySize, C = x.iterations; w.length < m; ) {
              var b = d.update(f).finalize(g);
              d.reset();
              for (var y = b.words, A = y.length, D = b, $ = 1; $ < C; $++) {
                D = d.finalize(D), d.reset();
                for (var E = D.words, B = 0; B < A; B++)
                  y[B] ^= E[B];
              }
              p.concat(b), _[0]++;
            }
            return p.sigBytes = m * 4, p;
          }
        });
        r.PBKDF2 = function(u, f, x) {
          return a.create(x).compute(u, f);
        };
      }(), e.PBKDF2;
    });
  }(xe)), xe.exports;
}
var pe = { exports: {} }, A0 = pe.exports, ii;
function gt() {
  return ii || (ii = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), ts(), _r());
    })(A0, function(e) {
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
          compute: function(a, u) {
            for (var f, x = this.cfg, d = x.hasher.create(), p = o.create(), g = p.words, w = x.keySize, _ = x.iterations; g.length < w; ) {
              f && d.update(f), f = d.update(a).finalize(u), d.reset();
              for (var m = 1; m < _; m++)
                f = d.finalize(f), d.reset();
              p.concat(f);
            }
            return p.sigBytes = w * 4, p;
          }
        });
        r.EvpKDF = function(a, u, f) {
          return l.create(f).compute(a, u);
        };
      }(), e.EvpKDF;
    });
  }(pe)), pe.exports;
}
var _e = { exports: {} }, D0 = _e.exports, si;
function tt() {
  return si || (si = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), gt());
    })(D0, function(e) {
      e.lib.Cipher || function(r) {
        var i = e, n = i.lib, o = n.Base, c = n.WordArray, h = n.BufferedBlockAlgorithm, l = i.enc;
        l.Utf8;
        var a = l.Base64, u = i.algo, f = u.EvpKDF, x = n.Cipher = h.extend({
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
          createEncryptor: function(E, B) {
            return this.create(this._ENC_XFORM_MODE, E, B);
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
          createDecryptor: function(E, B) {
            return this.create(this._DEC_XFORM_MODE, E, B);
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
          init: function(E, B, P) {
            this.cfg = this.cfg.extend(P), this._xformMode = E, this._key = B, this.reset();
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
          process: function(E) {
            return this._append(E), this._process();
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
          finalize: function(E) {
            E && this._append(E);
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
            function E(B) {
              return typeof B == "string" ? $ : y;
            }
            return function(B) {
              return {
                encrypt: function(P, T, F) {
                  return E(T).encrypt(B, P, T, F);
                },
                decrypt: function(P, T, F) {
                  return E(T).decrypt(B, P, T, F);
                }
              };
            };
          }()
        });
        n.StreamCipher = x.extend({
          _doFinalize: function() {
            var E = this._process(!0);
            return E;
          },
          blockSize: 1
        });
        var d = i.mode = {}, p = n.BlockCipherMode = o.extend({
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
          createEncryptor: function(E, B) {
            return this.Encryptor.create(E, B);
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
          createDecryptor: function(E, B) {
            return this.Decryptor.create(E, B);
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
          init: function(E, B) {
            this._cipher = E, this._iv = B;
          }
        }), g = d.CBC = function() {
          var E = p.extend();
          E.Encryptor = E.extend({
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
            processBlock: function(P, T) {
              var F = this._cipher, S = F.blockSize;
              B.call(this, P, T, S), F.encryptBlock(P, T), this._prevBlock = P.slice(T, T + S);
            }
          }), E.Decryptor = E.extend({
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
            processBlock: function(P, T) {
              var F = this._cipher, S = F.blockSize, H = P.slice(T, T + S);
              F.decryptBlock(P, T), B.call(this, P, T, S), this._prevBlock = H;
            }
          });
          function B(P, T, F) {
            var S, H = this._iv;
            H ? (S = H, this._iv = r) : S = this._prevBlock;
            for (var L = 0; L < F; L++)
              P[T + L] ^= S[L];
          }
          return E;
        }(), w = i.pad = {}, _ = w.Pkcs7 = {
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
          pad: function(E, B) {
            for (var P = B * 4, T = P - E.sigBytes % P, F = T << 24 | T << 16 | T << 8 | T, S = [], H = 0; H < T; H += 4)
              S.push(F);
            var L = c.create(S, T);
            E.concat(L);
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
          unpad: function(E) {
            var B = E.words[E.sigBytes - 1 >>> 2] & 255;
            E.sigBytes -= B;
          }
        };
        n.BlockCipher = x.extend({
          /**
           * Configuration options.
           *
           * @property {Mode} mode The block mode to use. Default: CBC
           * @property {Padding} padding The padding strategy to use. Default: Pkcs7
           */
          cfg: x.cfg.extend({
            mode: g,
            padding: _
          }),
          reset: function() {
            var E;
            x.reset.call(this);
            var B = this.cfg, P = B.iv, T = B.mode;
            this._xformMode == this._ENC_XFORM_MODE ? E = T.createEncryptor : (E = T.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == E ? this._mode.init(this, P && P.words) : (this._mode = E.call(T, this, P && P.words), this._mode.__creator = E);
          },
          _doProcessBlock: function(E, B) {
            this._mode.processBlock(E, B);
          },
          _doFinalize: function() {
            var E, B = this.cfg.padding;
            return this._xformMode == this._ENC_XFORM_MODE ? (B.pad(this._data, this.blockSize), E = this._process(!0)) : (E = this._process(!0), B.unpad(E)), E;
          },
          blockSize: 128 / 32
        });
        var m = n.CipherParams = o.extend({
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
          init: function(E) {
            this.mixIn(E);
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
          toString: function(E) {
            return (E || this.formatter).stringify(this);
          }
        }), C = i.format = {}, b = C.OpenSSL = {
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
          stringify: function(E) {
            var B, P = E.ciphertext, T = E.salt;
            return T ? B = c.create([1398893684, 1701076831]).concat(T).concat(P) : B = P, B.toString(a);
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
          parse: function(E) {
            var B, P = a.parse(E), T = P.words;
            return T[0] == 1398893684 && T[1] == 1701076831 && (B = c.create(T.slice(2, 4)), T.splice(0, 4), P.sigBytes -= 16), m.create({ ciphertext: P, salt: B });
          }
        }, y = n.SerializableCipher = o.extend({
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
          encrypt: function(E, B, P, T) {
            T = this.cfg.extend(T);
            var F = E.createEncryptor(P, T), S = F.finalize(B), H = F.cfg;
            return m.create({
              ciphertext: S,
              key: P,
              iv: H.iv,
              algorithm: E,
              mode: H.mode,
              padding: H.padding,
              blockSize: E.blockSize,
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
          decrypt: function(E, B, P, T) {
            T = this.cfg.extend(T), B = this._parse(B, T.format);
            var F = E.createDecryptor(P, T).finalize(B.ciphertext);
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
          _parse: function(E, B) {
            return typeof E == "string" ? B.parse(E, this) : E;
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
          execute: function(E, B, P, T, F) {
            if (T || (T = c.random(64 / 8)), F)
              var S = f.create({ keySize: B + P, hasher: F }).compute(E, T);
            else
              var S = f.create({ keySize: B + P }).compute(E, T);
            var H = c.create(S.words.slice(B), P * 4);
            return S.sigBytes = B * 4, m.create({ key: S, iv: H, salt: T });
          }
        }, $ = n.PasswordBasedCipher = y.extend({
          /**
           * Configuration options.
           *
           * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
           */
          cfg: y.cfg.extend({
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
          encrypt: function(E, B, P, T) {
            T = this.cfg.extend(T);
            var F = T.kdf.execute(P, E.keySize, E.ivSize, T.salt, T.hasher);
            T.iv = F.iv;
            var S = y.encrypt.call(this, E, B, F.key, T);
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
          decrypt: function(E, B, P, T) {
            T = this.cfg.extend(T), B = this._parse(B, T.format);
            var F = T.kdf.execute(P, E.keySize, E.ivSize, B.salt, T.hasher);
            T.iv = F.iv;
            var S = y.decrypt.call(this, E, B, F.key, T);
            return S;
          }
        });
      }();
    });
  }(_e)), _e.exports;
}
var ve = { exports: {} }, F0 = ve.exports, ni;
function R0() {
  return ni || (ni = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(F0, function(e) {
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
          for (var u = 0; u < c; u++)
            n[o + u] ^= l[u];
        }
        return r;
      }(), e.mode.CFB;
    });
  }(ve)), ve.exports;
}
var ge = { exports: {} }, S0 = ge.exports, oi;
function k0() {
  return oi || (oi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(S0, function(e) {
      return e.mode.CTR = function() {
        var r = e.lib.BlockCipherMode.extend(), i = r.Encryptor = r.extend({
          processBlock: function(n, o) {
            var c = this._cipher, h = c.blockSize, l = this._iv, a = this._counter;
            l && (a = this._counter = l.slice(0), this._iv = void 0);
            var u = a.slice(0);
            c.encryptBlock(u, 0), a[h - 1] = a[h - 1] + 1 | 0;
            for (var f = 0; f < h; f++)
              n[o + f] ^= u[f];
          }
        });
        return r.Decryptor = i, r;
      }(), e.mode.CTR;
    });
  }(ge)), ge.exports;
}
var me = { exports: {} }, $0 = me.exports, ai;
function H0() {
  return ai || (ai = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })($0, function(e) {
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
            var l = this._cipher, a = l.blockSize, u = this._iv, f = this._counter;
            u && (f = this._counter = u.slice(0), this._iv = void 0), n(f);
            var x = f.slice(0);
            l.encryptBlock(x, 0);
            for (var d = 0; d < a; d++)
              c[h + d] ^= x[d];
          }
        });
        return r.Decryptor = o, r;
      }(), e.mode.CTRGladman;
    });
  }(me)), me.exports;
}
var Ce = { exports: {} }, T0 = Ce.exports, li;
function P0() {
  return li || (li = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(T0, function(e) {
      return e.mode.OFB = function() {
        var r = e.lib.BlockCipherMode.extend(), i = r.Encryptor = r.extend({
          processBlock: function(n, o) {
            var c = this._cipher, h = c.blockSize, l = this._iv, a = this._keystream;
            l && (a = this._keystream = l.slice(0), this._iv = void 0), c.encryptBlock(a, 0);
            for (var u = 0; u < h; u++)
              n[o + u] ^= a[u];
          }
        });
        return r.Decryptor = i, r;
      }(), e.mode.OFB;
    });
  }(Ce)), Ce.exports;
}
var we = { exports: {} }, I0 = we.exports, ci;
function z0() {
  return ci || (ci = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(I0, function(e) {
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
  }(we)), we.exports;
}
var be = { exports: {} }, M0 = be.exports, hi;
function O0() {
  return hi || (hi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(M0, function(e) {
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
var ye = { exports: {} }, W0 = ye.exports, di;
function L0() {
  return di || (di = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(W0, function(e) {
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
var Ee = { exports: {} }, V0 = Ee.exports, fi;
function N0() {
  return fi || (fi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(V0, function(e) {
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
var Be = { exports: {} }, q0 = Be.exports, ui;
function j0() {
  return ui || (ui = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(q0, function(e) {
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
var Ae = { exports: {} }, Y0 = Ae.exports, xi;
function U0() {
  return xi || (xi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(Y0, function(e) {
      return e.pad.NoPadding = {
        pad: function() {
        },
        unpad: function() {
        }
      }, e.pad.NoPadding;
    });
  }(Ae)), Ae.exports;
}
var De = { exports: {} }, X0 = De.exports, pi;
function K0() {
  return pi || (pi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(X0, function(e) {
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
            var u = h.parse(a);
            return o.create({ ciphertext: u });
          }
        };
      }(), e.format.Hex;
    });
  }(De)), De.exports;
}
var Fe = { exports: {} }, G0 = Fe.exports, _i;
function Z0() {
  return _i || (_i = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), yt(), Et(), gt(), tt());
    })(G0, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.BlockCipher, o = r.algo, c = [], h = [], l = [], a = [], u = [], f = [], x = [], d = [], p = [], g = [];
        (function() {
          for (var m = [], C = 0; C < 256; C++)
            C < 128 ? m[C] = C << 1 : m[C] = C << 1 ^ 283;
          for (var b = 0, y = 0, C = 0; C < 256; C++) {
            var A = y ^ y << 1 ^ y << 2 ^ y << 3 ^ y << 4;
            A = A >>> 8 ^ A & 255 ^ 99, c[b] = A, h[A] = b;
            var D = m[b], $ = m[D], E = m[$], B = m[A] * 257 ^ A * 16843008;
            l[b] = B << 24 | B >>> 8, a[b] = B << 16 | B >>> 16, u[b] = B << 8 | B >>> 24, f[b] = B;
            var B = E * 16843009 ^ $ * 65537 ^ D * 257 ^ b * 16843008;
            x[A] = B << 24 | B >>> 8, d[A] = B << 16 | B >>> 16, p[A] = B << 8 | B >>> 24, g[A] = B, b ? (b = D ^ m[m[m[E ^ D]]], y ^= m[m[y]]) : b = y = 1;
          }
        })();
        var w = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], _ = o.AES = n.extend({
          _doReset: function() {
            var m;
            if (!(this._nRounds && this._keyPriorReset === this._key)) {
              for (var C = this._keyPriorReset = this._key, b = C.words, y = C.sigBytes / 4, A = this._nRounds = y + 6, D = (A + 1) * 4, $ = this._keySchedule = [], E = 0; E < D; E++)
                E < y ? $[E] = b[E] : (m = $[E - 1], E % y ? y > 6 && E % y == 4 && (m = c[m >>> 24] << 24 | c[m >>> 16 & 255] << 16 | c[m >>> 8 & 255] << 8 | c[m & 255]) : (m = m << 8 | m >>> 24, m = c[m >>> 24] << 24 | c[m >>> 16 & 255] << 16 | c[m >>> 8 & 255] << 8 | c[m & 255], m ^= w[E / y | 0] << 24), $[E] = $[E - y] ^ m);
              for (var B = this._invKeySchedule = [], P = 0; P < D; P++) {
                var E = D - P;
                if (P % 4)
                  var m = $[E];
                else
                  var m = $[E - 4];
                P < 4 || E <= 4 ? B[P] = m : B[P] = x[c[m >>> 24]] ^ d[c[m >>> 16 & 255]] ^ p[c[m >>> 8 & 255]] ^ g[c[m & 255]];
              }
            }
          },
          encryptBlock: function(m, C) {
            this._doCryptBlock(m, C, this._keySchedule, l, a, u, f, c);
          },
          decryptBlock: function(m, C) {
            var b = m[C + 1];
            m[C + 1] = m[C + 3], m[C + 3] = b, this._doCryptBlock(m, C, this._invKeySchedule, x, d, p, g, h);
            var b = m[C + 1];
            m[C + 1] = m[C + 3], m[C + 3] = b;
          },
          _doCryptBlock: function(m, C, b, y, A, D, $, E) {
            for (var B = this._nRounds, P = m[C] ^ b[0], T = m[C + 1] ^ b[1], F = m[C + 2] ^ b[2], S = m[C + 3] ^ b[3], H = 4, L = 1; L < B; L++) {
              var k = y[P >>> 24] ^ A[T >>> 16 & 255] ^ D[F >>> 8 & 255] ^ $[S & 255] ^ b[H++], V = y[T >>> 24] ^ A[F >>> 16 & 255] ^ D[S >>> 8 & 255] ^ $[P & 255] ^ b[H++], W = y[F >>> 24] ^ A[S >>> 16 & 255] ^ D[P >>> 8 & 255] ^ $[T & 255] ^ b[H++], R = y[S >>> 24] ^ A[P >>> 16 & 255] ^ D[T >>> 8 & 255] ^ $[F & 255] ^ b[H++];
              P = k, T = V, F = W, S = R;
            }
            var k = (E[P >>> 24] << 24 | E[T >>> 16 & 255] << 16 | E[F >>> 8 & 255] << 8 | E[S & 255]) ^ b[H++], V = (E[T >>> 24] << 24 | E[F >>> 16 & 255] << 16 | E[S >>> 8 & 255] << 8 | E[P & 255]) ^ b[H++], W = (E[F >>> 24] << 24 | E[S >>> 16 & 255] << 16 | E[P >>> 8 & 255] << 8 | E[T & 255]) ^ b[H++], R = (E[S >>> 24] << 24 | E[P >>> 16 & 255] << 16 | E[T >>> 8 & 255] << 8 | E[F & 255]) ^ b[H++];
            m[C] = k, m[C + 1] = V, m[C + 2] = W, m[C + 3] = R;
          },
          keySize: 256 / 32
        });
        r.AES = n._createHelper(_);
      }(), e.AES;
    });
  }(Fe)), Fe.exports;
}
var Re = { exports: {} }, Q0 = Re.exports, vi;
function J0() {
  return vi || (vi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), yt(), Et(), gt(), tt());
    })(Q0, function(e) {
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
        ], a = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], u = [
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
        ], f = [
          4160749569,
          528482304,
          33030144,
          2064384,
          129024,
          8064,
          504,
          2147483679
        ], x = c.DES = o.extend({
          _doReset: function() {
            for (var w = this._key, _ = w.words, m = [], C = 0; C < 56; C++) {
              var b = h[C] - 1;
              m[C] = _[b >>> 5] >>> 31 - b % 32 & 1;
            }
            for (var y = this._subKeys = [], A = 0; A < 16; A++) {
              for (var D = y[A] = [], $ = a[A], C = 0; C < 24; C++)
                D[C / 6 | 0] |= m[(l[C] - 1 + $) % 28] << 31 - C % 6, D[4 + (C / 6 | 0)] |= m[28 + (l[C + 24] - 1 + $) % 28] << 31 - C % 6;
              D[0] = D[0] << 1 | D[0] >>> 31;
              for (var C = 1; C < 7; C++)
                D[C] = D[C] >>> (C - 1) * 4 + 3;
              D[7] = D[7] << 5 | D[7] >>> 27;
            }
            for (var E = this._invSubKeys = [], C = 0; C < 16; C++)
              E[C] = y[15 - C];
          },
          encryptBlock: function(w, _) {
            this._doCryptBlock(w, _, this._subKeys);
          },
          decryptBlock: function(w, _) {
            this._doCryptBlock(w, _, this._invSubKeys);
          },
          _doCryptBlock: function(w, _, m) {
            this._lBlock = w[_], this._rBlock = w[_ + 1], d.call(this, 4, 252645135), d.call(this, 16, 65535), p.call(this, 2, 858993459), p.call(this, 8, 16711935), d.call(this, 1, 1431655765);
            for (var C = 0; C < 16; C++) {
              for (var b = m[C], y = this._lBlock, A = this._rBlock, D = 0, $ = 0; $ < 8; $++)
                D |= u[$][((A ^ b[$]) & f[$]) >>> 0];
              this._lBlock = A, this._rBlock = y ^ D;
            }
            var E = this._lBlock;
            this._lBlock = this._rBlock, this._rBlock = E, d.call(this, 1, 1431655765), p.call(this, 8, 16711935), p.call(this, 2, 858993459), d.call(this, 16, 65535), d.call(this, 4, 252645135), w[_] = this._lBlock, w[_ + 1] = this._rBlock;
          },
          keySize: 64 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        function d(w, _) {
          var m = (this._lBlock >>> w ^ this._rBlock) & _;
          this._rBlock ^= m, this._lBlock ^= m << w;
        }
        function p(w, _) {
          var m = (this._rBlock >>> w ^ this._lBlock) & _;
          this._lBlock ^= m, this._rBlock ^= m << w;
        }
        r.DES = o._createHelper(x);
        var g = c.TripleDES = o.extend({
          _doReset: function() {
            var w = this._key, _ = w.words;
            if (_.length !== 2 && _.length !== 4 && _.length < 6)
              throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            var m = _.slice(0, 2), C = _.length < 4 ? _.slice(0, 2) : _.slice(2, 4), b = _.length < 6 ? _.slice(0, 2) : _.slice(4, 6);
            this._des1 = x.createEncryptor(n.create(m)), this._des2 = x.createEncryptor(n.create(C)), this._des3 = x.createEncryptor(n.create(b));
          },
          encryptBlock: function(w, _) {
            this._des1.encryptBlock(w, _), this._des2.decryptBlock(w, _), this._des3.encryptBlock(w, _);
          },
          decryptBlock: function(w, _) {
            this._des3.decryptBlock(w, _), this._des2.encryptBlock(w, _), this._des1.decryptBlock(w, _);
          },
          keySize: 192 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        r.TripleDES = o._createHelper(g);
      }(), e.TripleDES;
    });
  }(Re)), Re.exports;
}
var Se = { exports: {} }, tn = Se.exports, gi;
function en() {
  return gi || (gi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), yt(), Et(), gt(), tt());
    })(tn, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.StreamCipher, o = r.algo, c = o.RC4 = n.extend({
          _doReset: function() {
            for (var a = this._key, u = a.words, f = a.sigBytes, x = this._S = [], d = 0; d < 256; d++)
              x[d] = d;
            for (var d = 0, p = 0; d < 256; d++) {
              var g = d % f, w = u[g >>> 2] >>> 24 - g % 4 * 8 & 255;
              p = (p + x[d] + w) % 256;
              var _ = x[d];
              x[d] = x[p], x[p] = _;
            }
            this._i = this._j = 0;
          },
          _doProcessBlock: function(a, u) {
            a[u] ^= h.call(this);
          },
          keySize: 256 / 32,
          ivSize: 0
        });
        function h() {
          for (var a = this._S, u = this._i, f = this._j, x = 0, d = 0; d < 4; d++) {
            u = (u + 1) % 256, f = (f + a[u]) % 256;
            var p = a[u];
            a[u] = a[f], a[f] = p, x |= a[(a[u] + a[f]) % 256] << 24 - d * 8;
          }
          return this._i = u, this._j = f, x;
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
var ke = { exports: {} }, rn = ke.exports, mi;
function sn() {
  return mi || (mi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), yt(), Et(), gt(), tt());
    })(rn, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.StreamCipher, o = r.algo, c = [], h = [], l = [], a = o.Rabbit = n.extend({
          _doReset: function() {
            for (var f = this._key.words, x = this.cfg.iv, d = 0; d < 4; d++)
              f[d] = (f[d] << 8 | f[d] >>> 24) & 16711935 | (f[d] << 24 | f[d] >>> 8) & 4278255360;
            var p = this._X = [
              f[0],
              f[3] << 16 | f[2] >>> 16,
              f[1],
              f[0] << 16 | f[3] >>> 16,
              f[2],
              f[1] << 16 | f[0] >>> 16,
              f[3],
              f[2] << 16 | f[1] >>> 16
            ], g = this._C = [
              f[2] << 16 | f[2] >>> 16,
              f[0] & 4294901760 | f[1] & 65535,
              f[3] << 16 | f[3] >>> 16,
              f[1] & 4294901760 | f[2] & 65535,
              f[0] << 16 | f[0] >>> 16,
              f[2] & 4294901760 | f[3] & 65535,
              f[1] << 16 | f[1] >>> 16,
              f[3] & 4294901760 | f[0] & 65535
            ];
            this._b = 0;
            for (var d = 0; d < 4; d++)
              u.call(this);
            for (var d = 0; d < 8; d++)
              g[d] ^= p[d + 4 & 7];
            if (x) {
              var w = x.words, _ = w[0], m = w[1], C = (_ << 8 | _ >>> 24) & 16711935 | (_ << 24 | _ >>> 8) & 4278255360, b = (m << 8 | m >>> 24) & 16711935 | (m << 24 | m >>> 8) & 4278255360, y = C >>> 16 | b & 4294901760, A = b << 16 | C & 65535;
              g[0] ^= C, g[1] ^= y, g[2] ^= b, g[3] ^= A, g[4] ^= C, g[5] ^= y, g[6] ^= b, g[7] ^= A;
              for (var d = 0; d < 4; d++)
                u.call(this);
            }
          },
          _doProcessBlock: function(f, x) {
            var d = this._X;
            u.call(this), c[0] = d[0] ^ d[5] >>> 16 ^ d[3] << 16, c[1] = d[2] ^ d[7] >>> 16 ^ d[5] << 16, c[2] = d[4] ^ d[1] >>> 16 ^ d[7] << 16, c[3] = d[6] ^ d[3] >>> 16 ^ d[1] << 16;
            for (var p = 0; p < 4; p++)
              c[p] = (c[p] << 8 | c[p] >>> 24) & 16711935 | (c[p] << 24 | c[p] >>> 8) & 4278255360, f[x + p] ^= c[p];
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function u() {
          for (var f = this._X, x = this._C, d = 0; d < 8; d++)
            h[d] = x[d];
          x[0] = x[0] + 1295307597 + this._b | 0, x[1] = x[1] + 3545052371 + (x[0] >>> 0 < h[0] >>> 0 ? 1 : 0) | 0, x[2] = x[2] + 886263092 + (x[1] >>> 0 < h[1] >>> 0 ? 1 : 0) | 0, x[3] = x[3] + 1295307597 + (x[2] >>> 0 < h[2] >>> 0 ? 1 : 0) | 0, x[4] = x[4] + 3545052371 + (x[3] >>> 0 < h[3] >>> 0 ? 1 : 0) | 0, x[5] = x[5] + 886263092 + (x[4] >>> 0 < h[4] >>> 0 ? 1 : 0) | 0, x[6] = x[6] + 1295307597 + (x[5] >>> 0 < h[5] >>> 0 ? 1 : 0) | 0, x[7] = x[7] + 3545052371 + (x[6] >>> 0 < h[6] >>> 0 ? 1 : 0) | 0, this._b = x[7] >>> 0 < h[7] >>> 0 ? 1 : 0;
          for (var d = 0; d < 8; d++) {
            var p = f[d] + x[d], g = p & 65535, w = p >>> 16, _ = ((g * g >>> 17) + g * w >>> 15) + w * w, m = ((p & 4294901760) * p | 0) + ((p & 65535) * p | 0);
            l[d] = _ ^ m;
          }
          f[0] = l[0] + (l[7] << 16 | l[7] >>> 16) + (l[6] << 16 | l[6] >>> 16) | 0, f[1] = l[1] + (l[0] << 8 | l[0] >>> 24) + l[7] | 0, f[2] = l[2] + (l[1] << 16 | l[1] >>> 16) + (l[0] << 16 | l[0] >>> 16) | 0, f[3] = l[3] + (l[2] << 8 | l[2] >>> 24) + l[1] | 0, f[4] = l[4] + (l[3] << 16 | l[3] >>> 16) + (l[2] << 16 | l[2] >>> 16) | 0, f[5] = l[5] + (l[4] << 8 | l[4] >>> 24) + l[3] | 0, f[6] = l[6] + (l[5] << 16 | l[5] >>> 16) + (l[4] << 16 | l[4] >>> 16) | 0, f[7] = l[7] + (l[6] << 8 | l[6] >>> 24) + l[5] | 0;
        }
        r.Rabbit = n._createHelper(a);
      }(), e.Rabbit;
    });
  }(ke)), ke.exports;
}
var $e = { exports: {} }, nn = $e.exports, Ci;
function on() {
  return Ci || (Ci = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), yt(), Et(), gt(), tt());
    })(nn, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.StreamCipher, o = r.algo, c = [], h = [], l = [], a = o.RabbitLegacy = n.extend({
          _doReset: function() {
            var f = this._key.words, x = this.cfg.iv, d = this._X = [
              f[0],
              f[3] << 16 | f[2] >>> 16,
              f[1],
              f[0] << 16 | f[3] >>> 16,
              f[2],
              f[1] << 16 | f[0] >>> 16,
              f[3],
              f[2] << 16 | f[1] >>> 16
            ], p = this._C = [
              f[2] << 16 | f[2] >>> 16,
              f[0] & 4294901760 | f[1] & 65535,
              f[3] << 16 | f[3] >>> 16,
              f[1] & 4294901760 | f[2] & 65535,
              f[0] << 16 | f[0] >>> 16,
              f[2] & 4294901760 | f[3] & 65535,
              f[1] << 16 | f[1] >>> 16,
              f[3] & 4294901760 | f[0] & 65535
            ];
            this._b = 0;
            for (var g = 0; g < 4; g++)
              u.call(this);
            for (var g = 0; g < 8; g++)
              p[g] ^= d[g + 4 & 7];
            if (x) {
              var w = x.words, _ = w[0], m = w[1], C = (_ << 8 | _ >>> 24) & 16711935 | (_ << 24 | _ >>> 8) & 4278255360, b = (m << 8 | m >>> 24) & 16711935 | (m << 24 | m >>> 8) & 4278255360, y = C >>> 16 | b & 4294901760, A = b << 16 | C & 65535;
              p[0] ^= C, p[1] ^= y, p[2] ^= b, p[3] ^= A, p[4] ^= C, p[5] ^= y, p[6] ^= b, p[7] ^= A;
              for (var g = 0; g < 4; g++)
                u.call(this);
            }
          },
          _doProcessBlock: function(f, x) {
            var d = this._X;
            u.call(this), c[0] = d[0] ^ d[5] >>> 16 ^ d[3] << 16, c[1] = d[2] ^ d[7] >>> 16 ^ d[5] << 16, c[2] = d[4] ^ d[1] >>> 16 ^ d[7] << 16, c[3] = d[6] ^ d[3] >>> 16 ^ d[1] << 16;
            for (var p = 0; p < 4; p++)
              c[p] = (c[p] << 8 | c[p] >>> 24) & 16711935 | (c[p] << 24 | c[p] >>> 8) & 4278255360, f[x + p] ^= c[p];
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function u() {
          for (var f = this._X, x = this._C, d = 0; d < 8; d++)
            h[d] = x[d];
          x[0] = x[0] + 1295307597 + this._b | 0, x[1] = x[1] + 3545052371 + (x[0] >>> 0 < h[0] >>> 0 ? 1 : 0) | 0, x[2] = x[2] + 886263092 + (x[1] >>> 0 < h[1] >>> 0 ? 1 : 0) | 0, x[3] = x[3] + 1295307597 + (x[2] >>> 0 < h[2] >>> 0 ? 1 : 0) | 0, x[4] = x[4] + 3545052371 + (x[3] >>> 0 < h[3] >>> 0 ? 1 : 0) | 0, x[5] = x[5] + 886263092 + (x[4] >>> 0 < h[4] >>> 0 ? 1 : 0) | 0, x[6] = x[6] + 1295307597 + (x[5] >>> 0 < h[5] >>> 0 ? 1 : 0) | 0, x[7] = x[7] + 3545052371 + (x[6] >>> 0 < h[6] >>> 0 ? 1 : 0) | 0, this._b = x[7] >>> 0 < h[7] >>> 0 ? 1 : 0;
          for (var d = 0; d < 8; d++) {
            var p = f[d] + x[d], g = p & 65535, w = p >>> 16, _ = ((g * g >>> 17) + g * w >>> 15) + w * w, m = ((p & 4294901760) * p | 0) + ((p & 65535) * p | 0);
            l[d] = _ ^ m;
          }
          f[0] = l[0] + (l[7] << 16 | l[7] >>> 16) + (l[6] << 16 | l[6] >>> 16) | 0, f[1] = l[1] + (l[0] << 8 | l[0] >>> 24) + l[7] | 0, f[2] = l[2] + (l[1] << 16 | l[1] >>> 16) + (l[0] << 16 | l[0] >>> 16) | 0, f[3] = l[3] + (l[2] << 8 | l[2] >>> 24) + l[1] | 0, f[4] = l[4] + (l[3] << 16 | l[3] >>> 16) + (l[2] << 16 | l[2] >>> 16) | 0, f[5] = l[5] + (l[4] << 8 | l[4] >>> 24) + l[3] | 0, f[6] = l[6] + (l[5] << 16 | l[5] >>> 16) + (l[4] << 16 | l[4] >>> 16) | 0, f[7] = l[7] + (l[6] << 8 | l[6] >>> 24) + l[5] | 0;
        }
        r.RabbitLegacy = n._createHelper(a);
      }(), e.RabbitLegacy;
    });
  }($e)), $e.exports;
}
var He = { exports: {} }, an = He.exports, wi;
function ln() {
  return wi || (wi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), yt(), Et(), gt(), tt());
    })(an, function(e) {
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
        function u(g, w) {
          let _ = w >> 24 & 255, m = w >> 16 & 255, C = w >> 8 & 255, b = w & 255, y = g.sbox[0][_] + g.sbox[1][m];
          return y = y ^ g.sbox[2][C], y = y + g.sbox[3][b], y;
        }
        function f(g, w, _) {
          let m = w, C = _, b;
          for (let y = 0; y < c; ++y)
            m = m ^ g.pbox[y], C = u(g, m) ^ C, b = m, m = C, C = b;
          return b = m, m = C, C = b, C = C ^ g.pbox[c], m = m ^ g.pbox[c + 1], { left: m, right: C };
        }
        function x(g, w, _) {
          let m = w, C = _, b;
          for (let y = c + 1; y > 1; --y)
            m = m ^ g.pbox[y], C = u(g, m) ^ C, b = m, m = C, C = b;
          return b = m, m = C, C = b, C = C ^ g.pbox[1], m = m ^ g.pbox[0], { left: m, right: C };
        }
        function d(g, w, _) {
          for (let A = 0; A < 4; A++) {
            g.sbox[A] = [];
            for (let D = 0; D < 256; D++)
              g.sbox[A][D] = l[A][D];
          }
          let m = 0;
          for (let A = 0; A < c + 2; A++)
            g.pbox[A] = h[A] ^ w[m], m++, m >= _ && (m = 0);
          let C = 0, b = 0, y = 0;
          for (let A = 0; A < c + 2; A += 2)
            y = f(g, C, b), C = y.left, b = y.right, g.pbox[A] = C, g.pbox[A + 1] = b;
          for (let A = 0; A < 4; A++)
            for (let D = 0; D < 256; D += 2)
              y = f(g, C, b), C = y.left, b = y.right, g.sbox[A][D] = C, g.sbox[A][D + 1] = b;
          return !0;
        }
        var p = o.Blowfish = n.extend({
          _doReset: function() {
            if (this._keyPriorReset !== this._key) {
              var g = this._keyPriorReset = this._key, w = g.words, _ = g.sigBytes / 4;
              d(a, w, _);
            }
          },
          encryptBlock: function(g, w) {
            var _ = f(a, g[w], g[w + 1]);
            g[w] = _.left, g[w + 1] = _.right;
          },
          decryptBlock: function(g, w) {
            var _ = x(a, g[w], g[w + 1]);
            g[w] = _.left, g[w + 1] = _.right;
          },
          blockSize: 64 / 32,
          keySize: 128 / 32,
          ivSize: 64 / 32
        });
        r.Blowfish = n._createHelper(p);
      }(), e.Blowfish;
    });
  }(He)), He.exports;
}
var cn = Qt.exports, bi;
function hn() {
  return bi || (bi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), Ke(), n0(), a0(), yt(), h0(), Et(), ts(), pr(), p0(), es(), g0(), C0(), b0(), _r(), B0(), gt(), tt(), R0(), k0(), H0(), P0(), z0(), O0(), L0(), N0(), j0(), U0(), K0(), Z0(), J0(), en(), sn(), on(), ln());
    })(cn, function(e) {
      return e;
    });
  }(Qt)), Qt.exports;
}
var dn = hn(), $t;
const Ue = class Ue {
  constructor() {
    v(this, "pictures", {});
  }
  static use() {
    return Lt(this, $t) === void 0 && er(this, $t, new Ue()), Lt(this, $t);
  }
  // {md5: base64}
  savePicture(t) {
    const e = dn.MD5(t).toString();
    return this.pictures[e] ? console.log("cache targeted") : this.pictures[e] = t, e;
  }
  getPicture(t) {
    return this.pictures[t];
  }
};
$t = new WeakMap(), tr(Ue, $t);
let Yt = Ue;
const fn = (s, t, e, r, i, n) => {
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
    Qi(
      s,
      t,
      e,
      { ...r, color: "red", fontSize: 8 },
      i,
      n,
      "body",
      "X [PIC Not Set]"
    );
}, un = (s, t, e, r, i) => {
  if (t instanceof Object && t.type === "image") {
    let n = t.value;
    return t.valueType === "local" && (n = Yt.use().getPicture(n || "")), `> <img src="${n}" md5="${t.valueType === "local" ? t.value : ""}" value-type="${t.valueType}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: calc(100% - 2px); height: calc(100% - 2px);" /> </td>`;
  } else
    return `${(t == null ? void 0 : t.value) || JSON.stringify(t)} </td>`;
}, xn = (s, t, e) => {
  const r = t.querySelector("img"), i = { type: "image", valueType: "url", value: "" };
  return r && r.getAttribute("src") && (i.value = r.getAttribute("src")), r && r.getAttribute("value-type") && (i.valueType = r.getAttribute("value-type"), i.value = r.getAttribute("md5") || ""), i;
};
class pn extends Mi {
  constructor() {
    super(`${N}-select`);
    v(this, "_searchInput");
    v(this, "_content");
    v(this, "_width", 150);
    v(this, "_height", 320);
    v(this, "_position", "bottom-left");
    v(this, "_options", null);
    this._searchInput = z("input").on("input", (e) => {
      const r = e.target;
      this.query(r.value);
    }), this._content = z("ul", `${N}-select-content`), this._.append(
      z("div", `${N}-select-input`).append(this._searchInput),
      this._content
    );
  }
  async query(e) {
    this._options !== null && (this._content.html(""), await this._options(e).then((r) => {
      r && Array.isArray(r) && this._content.append(
        ...r.map((i) => {
          const n = z("li", "item").on("click", () => {
            this._changer(Array.isArray(i) ? { key: i[0], value: i[1] } : i), this.hide();
          });
          if (typeof i == "string")
            n.append(i);
          else if (Array.isArray(i)) {
            const [o, c, h] = i;
            n.append(c, i.length > 2 ? z("label").append(h) : "");
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
          let u = c, f = h + a;
          return (r === "top-right" || r === "bottom-right") && (u += l - this._width), (r === "top-right" || r === "top-left") && (f -= this._height + (e.height || 25) + 3), { top: f, left: u };
        };
        let { top: n, left: o } = i();
        n < 0 && (r = r.replace("top", "bottom"), n = i().top), o < 0 && (r = r.replace("left", "right"), o = i().left), this._.css({
          left: o + "px",
          top: n + "px"
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
class mt {
  constructor(t, e = !1) {
    v(this, "_");
    v(this, "_rect", null);
    v(this, "_target", null);
    this._ = z("div", `${N}-${t}`), e && this.show();
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
    return this._rect = t, this._.setStyles({
      left: `${t.x}px`,
      top: `${t.y}px`,
      width: `${t.width}px`,
      height: `${t.height}px`
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
class _n {
  constructor(t) {
    v(this, "_placement", "body");
    v(this, "_editable", !1);
    v(this, "paintFormatArea", null);
    v(this, "_ranges", []);
    v(this, "_rowHeaderRanges", []);
    v(this, "_colHeaderRanges", []);
    v(this, "_areas", []);
    v(this, "_focus", [0, 0]);
    // _focusBodyRange: Range | null = null;
    v(this, "_focusRange", null);
    v(this, "_focusArea", null);
    // for move
    v(this, "_move", [0, 0]);
    // shadow input
    v(this, "_shadowInput");
    v(this, "_shadowInputLock", !1);
    v(this, "_shadowInputInterval", null);
    v(this, "_copyRange", null);
    v(this, "_copyAreas", []);
    v(this, "_autofillRange", null);
    v(this, "_autofillAreas", []);
    v(this, "_autofillTrigger", (t) => {
    });
    this._editable = t, this._shadowInput = z("input", "sheet-editor-inputshadow"), this._shadowInput._.style.boxSizing = "border-box", this._shadowInput._.style.position = "relative", this._shadowInput._.style.zIndex = "10000", this._shadowInput._.style.width = "0", this._shadowInput._.style.height = "100%", this._shadowInput._.style.border = "none", this._shadowInput._.style.outline = "none", this._shadowInput._.style.padding = "0";
  }
  _shadowInputFocus() {
    this._shadowInputInterval && clearTimeout(this._shadowInputInterval), this._shadowInputInterval = window.setTimeout(() => {
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
    return e && (this._ranges.length = 0, this.clear()), this._ranges.push(t), Ei(this), this;
  }
  updateLastRange(t) {
    const { _focusRange: e } = this;
    e && (this._ranges.splice(-1, 1, t(e)), Ei(this));
  }
  addAreaOutline(t, e) {
    const r = new mt("selector", !0).rect(nr(t, 2)).target(e);
    this._placement === "body" && (r.append(
      z("div", "corner").attr("draggable", "false").on("mousedown", this._autofillTrigger)
    ), r.append(this._shadowInput)), this._areas.push(r);
  }
  addArea(t, e) {
    return this._areas.push(new mt("selector-area", !0).rect(t).target(e)), this;
  }
  addRowHeaderArea(t, e) {
    return this._areas.push(new mt("selector-area row-header", !0).rect(t).target(e)), this;
  }
  addColHeaderArea(t, e) {
    return this._areas.push(new mt("selector-area col-header", !0).rect(t).target(e)), this;
  }
  addCopyArea(t, e) {
    return this._copyAreas.push(
      new mt("selector-copy", !0).rect(nr(t, 2)).target(e)
    ), this;
  }
  addAutofillArea(t, e) {
    return this._autofillAreas.push(
      new mt("selector-autofill", !0).rect(nr(t, 2)).target(e)
    ), this;
  }
  setFocusArea(t, e) {
    return this._focusArea = new mt("", !0).rect(t).target(e, !1), this;
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
function yi(s, t, e) {
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
function Ei(s) {
  const t = [], e = [];
  for (const r of s._ranges)
    if (r) {
      const { startRow: i, startCol: n, endRow: o, endCol: c } = r;
      (i >= 0 || o >= 0) && t.push(X.create(i, 0, o, 0)), (n >= 0 || c >= 0) && e.push(X.create(0, n, 0, c));
    }
  s._rowHeaderRanges = yi(
    t,
    (r, i) => r.startRow - i.startRow,
    (r, i) => r.intersectsRow(i.startRow, i.endRow)
  ), s._colHeaderRanges = yi(
    e,
    (r, i) => r.startCol - i.startCol,
    (r, i) => r.intersectsCol(i.startCol, i.endCol)
  );
}
function nr(s, t) {
  return {
    x: s.x - t / 2,
    y: s.y - t / 2,
    width: s.width - t,
    height: s.height - t
  };
}
const vn = { vertical: "height", horizontal: "width" };
class Bi {
  constructor(t, e) {
    v(this, "_");
    v(this, "_content");
    v(this, "_value", 0);
    v(this, "_maxValue", 0);
    v(this, "_lastOffset", 0);
    v(this, "_type");
    v(this, "_change", null);
    this._type = t, this._content = z("div", "content"), this._ = z("div", `${N}-scrollbar ${t}`).append(this._content).on("scroll.stop", (r) => {
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
      const r = vn[this._type];
      this._content.css(r, `${e}px`), this._.css(r, `${t}px`).show(), this._maxValue = e - t;
    } else
      this._.hide();
    return this;
  }
}
function gn(s) {
  s._vScrollbar = new Bi("vertical", s._container).change((t, e) => {
    Ts(s._data, t, e) && (s.render(), j.reset(s), kt.move(s));
  }), s._hScrollbar = new Bi("horizontal", s._container).change((t, e) => {
    Hs(s._data, t, e) && (s.render(), j.reset(s), kt.move(s));
  });
}
function mn(s) {
  const { x: t, y: e, height: r, width: i } = s._contentRect;
  s._vScrollbar && s._vScrollbar.resize(s._height(), r + e), s._hScrollbar && s._hScrollbar.resize(s._width(), i + t);
}
function Cn(s, t, e) {
  if (!t) return;
  const { _selector: r, _vScrollbar: i, _hScrollbar: n, _data: o } = s, { viewport: c } = s._renderer;
  if (c && r) {
    const [, h, , l] = c.areas, a = l.range, u = h.range;
    if (i) {
      const f = (x, d, p) => {
        const g = s.rowsHeight(d, p + 1);
        let w = 0;
        for (let _ = x; w < g; _ += 1)
          w += s.rowHeight(_);
        return w;
      };
      e ? t.endRow === e.endRow ? t.startRow < e.startRow ? t.startRow > u.endRow && t.startRow < a.startRow && i.scrollBy(-s.rowsHeight(t.startRow, a.startRow)) : t.startRow > e.startRow && // up-
      t.startRow >= a.endRow && i.scrollBy(
        f(a.startRow, a.endRow, t.startRow)
      ) : t.startRow === e.startRow && (t.endRow > e.endRow ? t.endRow >= a.endRow && i.scrollBy(
        f(a.startRow, a.endRow, t.endRow)
      ) : t.endRow < e.endRow && // down-
      t.endRow < a.startRow && i.scrollBy(-s.rowsHeight(t.endRow, a.startRow))) : t.endRow === o.rows.len - 1 ? i.scrollToEnd() : t.startRow === 0 ? i.scrollToStart() : t.endRow >= a.endRow ? i.scrollBy(f(a.startRow, a.endRow, t.endRow)) : t.startRow > u.endRow && t.startRow < a.startRow && i.scrollBy(-s.rowsHeight(t.startRow, a.startRow));
    }
    if (n) {
      const f = (x, d, p) => {
        const g = s.colsWidth(d, p + 1);
        let w = 0;
        for (let _ = x; w < g; _ += 1)
          w += s.colWidth(_);
        return w;
      };
      e ? t.endCol === e.endCol ? t.startCol < e.startCol ? t.startCol > u.endCol && t.startCol < a.startCol && n.scrollBy(-s.colsWidth(t.startCol, a.startCol)) : t.startCol > e.startCol && // left-
      t.startCol >= a.endCol && n.scrollBy(
        f(a.startCol, a.endCol, t.startCol)
      ) : t.startCol === e.startCol && (t.endCol > e.endCol ? t.endCol >= a.endCol && n.scrollBy(
        f(a.startCol, a.endCol, t.endCol)
      ) : t.endCol < e.endCol && // right-
      t.endCol < a.startCol && n.scrollBy(-s.colsWidth(t.endCol, a.startCol))) : t.endCol === o.cols.len - 1 ? n.scrollToEnd() : t.startCol === 0 ? n.scrollToStart() : t.endCol >= a.endCol ? n.scrollBy(f(a.startCol, a.endCol, t.endCol)) : t.startCol > u.endCol && t.startCol < a.startCol && n.scrollBy(-s.colsWidth(t.startCol, a.startCol));
    }
  }
}
const Tt = {
  init: gn,
  resize: mn,
  autoMove: Cn
};
function Ve(s, t, e) {
  s.addEventListener(t, e);
}
function Ne(s, t, e) {
  s.removeEventListener(t, e);
}
function wn(s, t, e) {
  const r = (i) => {
    e(i), Ne(s, "mousemove", t), Ne(s, "mouseup", r);
  };
  Ve(s, "mousemove", t), Ve(s, "mouseup", r);
}
class bn {
  constructor() {
    v(this, "_events", /* @__PURE__ */ new Map());
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
function yn(s) {
  s._selector = new _n(!!s._editable).autofillTrigger(
    (t) => {
      const { _selector: e } = s;
      e && ss(
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
          s.addHistory("auto fill"), s.copy(r._autofillRange, !0).render(), e.autofillRange(null), Bt(s);
        }
      );
    }
  );
}
function En(s, t) {
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
function Bn(s) {
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
function An(s) {
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
function Dn(s, t, e) {
  if (s._selector) {
    const { currentRange: r } = s._selector;
    if (r && r.startRow !== void 0 && r.startCol !== void 0 && r.endRow !== void 0 && r.endCol !== void 0 && t >= r.startRow && t <= r.endRow && e >= r.startCol && e <= r.endCol)
      return !0;
  }
  return !1;
}
function rs(s, t, e, r) {
  const { _selector: i, _data: n } = s, o = X.create(t, e), c = Li(n, o);
  i && (i.focus(t, e, c).addRange(i._placement === "body" ? c : o, r), s._emitter.emit("selectorMove", [t, e]));
}
function is(s, t, e) {
  const { _selector: r, _data: i } = s;
  r && r.move(t, e).updateLastRange((n) => {
    const o = Li(i, n.union(X.create(t, e)));
    return s._emitter.emit("updateFocusRange", o), o;
  });
}
function Bt(s) {
  const { _selector: t, _overlayer: e } = s, { _rowHeader: r, _colHeader: i, viewport: n } = s._renderer;
  if (t && n) {
    const { _placement: o } = t;
    t.clear();
    const c = r.width, h = i.height, l = (f, x) => {
      const d = f.clone();
      return (o === "all" || o === "row-header") && (d.endCol = x.endCol, f.startCol < x.startCol && (d.startCol = x.startCol)), (o === "all" || o === "col-header") && (d.endRow = x.endRow, f.startRow < x.startRow && (d.startRow = x.startRow)), d;
    }, a = ({ range: f }, x) => o === "body" ? f.intersects(x) : o === "col-header" ? f.intersectsCol(x.startCol, x.endCol) : o === "row-header" ? f.intersectsRow(x.startRow, x.endRow) : !0, u = (f, x, d) => {
      let p = f.rect(x);
      return o === "col-header" ? (p = f.rectCol(x.startCol, x.endCol), p.height += 2, (d === 2 || d === 3) && (p.y -= 2)) : o === "row-header" && (p = f.rectRow(x.startRow, x.endRow), p.width += 2, (d === 0 || d === 3) && (p.x -= 2)), p;
    };
    n.areas.forEach((f, x) => {
      const d = e._areas[x], { _ranges: p, _focusRange: g, _copyRange: w, _autofillRange: _ } = t;
      p.forEach((m, C) => {
        let b = a(f, m);
        const y = u(f, m, x);
        if (b)
          if (C === p.length - 1) {
            if ((o !== "all" || f.range.intersects(m)) && t.addAreaOutline(y, d), g) {
              f.range.intersects(g) && t.setFocusArea(f.rect(g), d);
              const A = l(m, f.range), D = A.difference(g);
              D.length > 0 ? D.forEach(($) => {
                b = a(f, $), b && t.addArea(f.rect($), d);
              }) : (o !== "body" || !m.equals(g)) && t.addArea(u(f, A, x), d);
            }
          } else
            t.addArea(y, d);
      }), w && f.range.intersects(w) && t.addCopyArea(f.rect(w), d), _ && f.range.intersects(_) && t.addAutofillArea(f.rect(_), d);
    }), n.headerAreas.forEach((f, x) => {
      const d = e._headerAreas[x], { width: p, height: g } = f;
      x <= 1 ? o === "row-header" || o === "all" ? t.addColHeaderArea({ x: 0, y: 0, width: p, height: h }, d) : t._colHeaderRanges.forEach((w) => {
        f.range.intersectsCol(w.startCol, w.endCol) && t.addColHeaderArea(f.rectCol(w.startCol, w.endCol), d);
      }) : o === "col-header" || o === "all" ? t.addRowHeaderArea({ x: 0, y: 0, width: c, height: g }, d) : t._rowHeaderRanges.forEach((w) => {
        f.range.intersectsRow(w.startRow, w.endRow) && t.addRowHeaderArea(f.rectRow(w.startRow, w.endRow), d);
      });
    });
  }
}
function Fn(s, t) {
  const { _selector: e, _data: r } = s;
  if (e) {
    const i = e._autofillRange;
    if (i)
      return t === "up" ? i.startRow = Le(r, i.startRow - 1, -1) : t === "down" ? i.endRow = Le(r, i.endRow + 1, 1) : t === "left" ? i.startCol = Oe(r, i.startCol - 1, -1) : t === "right" && (i.endCol = Oe(r, i.endCol + 1, 1)), Tt.autoMove(s, i), Bt(s), !0;
  }
  return !1;
}
function hr(s, t, e, r) {
  var c, h, l;
  if (Fn(s, e)) return;
  (c = s._editor) == null || c.hide();
  const { _selector: i, _data: n } = s, { viewport: o } = s._renderer;
  if (i && o) {
    const { _focusRange: a } = i;
    if (a) {
      let { startRow: u, startCol: f, endRow: x, endCol: d } = a;
      const { rows: p, cols: g } = n;
      let [w, _] = i._move;
      t || (u = x = w, f = d = _);
      const m = (h = i.currentRange) == null ? void 0 : h.clone();
      r ? e === "up" ? w = Le(n, u - r, -1) : e === "down" ? w = Le(n, x + r, 1) : e === "left" ? _ = Oe(n, f - r, -1) : e === "right" && (_ = Oe(n, d + r, 1)) : e === "up" ? w = 0 : e === "down" ? w = p.len - 1 : e === "left" ? _ = 0 : e === "right" && (_ = g.len - 1), w >= 0 && w <= p.len - 1 && _ >= 0 && _ <= g.len - 1 && (t ? rs(s, w, _, !0) : (is(s, w, _), i._move = [w, _])), i.placement("body"), Tt.autoMove(s, i.currentRange, t ? void 0 : m), (l = s._selector) == null || l._shadowInputFocus(), Bt(s);
    }
  }
}
function ss(s, t, e, r = (i) => {
}) {
  const { _selector: i, _renderer: n } = s;
  if (!i) return;
  const { _placement: o } = i, c = { row: 0, col: 0 };
  if (o !== "all") {
    const { left: h, top: l } = s._canvas.rect();
    let a = [0, 0], u = null;
    const f = () => {
      u !== null && (clearInterval(u), u = null);
    }, x = (d) => {
      var m, C;
      let [p, g] = [0, 0];
      d.x > 0 && (p = d.x - h), d.y > 0 && (g = d.y - l), o === "row-header" && (p = 1), o === "col-header" && (g = 1);
      const w = (m = i.currentRange) == null ? void 0 : m.clone(), { target: _ } = d;
      if ((_ == null ? void 0 : _.tagName) === "CANVAS") {
        const b = (C = n.viewport) == null ? void 0 : C.cellAt(p, g);
        if (b) {
          const { row: y, col: A } = b;
          (y != c.row || A !== c.col) && (t(y, A), o === "body" && Tt.autoMove(s, e(i), w), Bt(s), c.row = y, c.col = A);
        }
        f();
      } else if (u === null) {
        const b = d.x - a[0], y = d.y - a[1];
        b >= 0 && y >= 0 && (u = window.setInterval(() => {
          const A = e(i);
          if (A) {
            const { endRow: D, endCol: $ } = A;
            b > y ? (hr(s, !1, "right", 1), s.isLastRow(D) && f()) : (hr(s, !1, "down", 1), s.isLastCol($) && f());
          }
        }, 120));
      }
      a = [d.x, d.y];
    };
    wn(
      document.body,
      (d) => x(d),
      () => {
        f(), r(i);
      }
    );
  }
}
function ns(s) {
  s._selector && (s._selector.showCopy(), Bt(s));
}
function os(s) {
  s._selector && (navigator.clipboard.write([
    new ClipboardItem({
      "text/plain": new Blob([""], { type: "text/plain" })
    })
  ]).then(), s._selector.clearCopy(), Bt(s));
}
function Rn(s, t) {
  const e = X.with(t);
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
function Sn(s) {
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
function Ai(s, t, e = (r) => {
}) {
  return s.types.includes(t) ? (s.getType(t).then((r) => {
    r.text().then((i) => {
      e(i);
    });
  }), !0) : !1;
}
function kn(s) {
  const { _selector: t } = s;
  if (s._copyable && t) {
    const e = {}, r = t.currentRange;
    r && (ns(s), ["text/plain", "text/html"].forEach((i) => {
      const n = r.toString(), o = i === "text/html" ? s.toHtml(n) : Rn(s, n);
      e[i] = new Blob([o], { type: i });
    }), navigator.clipboard.write([new ClipboardItem(e)]).then());
  }
}
function $n(s, t, e) {
  navigator.clipboard.read().then((r) => {
    var i, n, o, c, h;
    if (r.length > 0) {
      s.addHistory("paste value");
      const l = r[0];
      t || (t = !Ai(l, "text/html", (a) => {
        s.fill(a).render();
      })), t && Ai(l, "text/plain", (a) => {
        s.fill(Sn(a)).render();
      }), e && ((i = s._selector) != null && i._copyRange && ((o = (n = s._selector) == null ? void 0 : n._copyRange) == null || o.each((a, u) => {
        s._cells.remove(a, u);
      }), cr(s._data, (h = (c = s._selector) == null ? void 0 : c._copyRange) == null ? void 0 : h.toString())), os(s));
    }
  });
}
function Hn(s, t) {
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
function Tn(s, t) {
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
function Pn(s, t) {
  if (s._selector) {
    s.addHistory("set cell style");
    const { _ranges: e } = s._selector;
    e.forEach((r) => {
      r && r.each((i, n) => s.setStyle(i, n, t));
    }), s.render(), s._canvas.focus();
  }
}
function In(s, t) {
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
function zn(s) {
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
function Mn(s) {
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
function On(s, t) {
  if (s._selector) {
    s.addHistory(`insert ${t}`), t === "row" ? s._data.rows.len++ : s._data.cols.len++, Ye(s), s.resize();
    const { _ranges: e } = s._selector, { startRow: r, startCol: i } = e[0], n = Ui(s.data()), o = ji(s.data());
    s._data.merges = s._data.merges.map((c) => {
      const h = c.split(":");
      let [l, a] = it(h[0]), [u, f] = it(h[1]);
      return t === "row" ? (a >= r && a++, f >= r && f++) : (l >= i && l++, u >= i && u++), `${Q(l, a)}:${Q(u, f)}`;
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
function Wn(s, t) {
  if (s._selector) {
    s.addHistory(`delete ${t}`);
    const { _ranges: e } = s._selector, { startRow: r, startCol: i, endRow: n, endCol: o } = e[0], c = n - r + 1, h = o - i + 1, l = Ui(s.data()), a = ji(s.data()), u = {};
    s._data.merges = s._data.merges.map((f) => {
      const x = f.split(":");
      let [d, p] = it(x[0]), [g, w] = it(x[1]);
      if (t === "row") {
        if (p >= r && w <= n) return null;
        u[`${p}-${d}`] = !0, p > r && (p -= c), w > r && (w -= c);
      } else {
        if (d >= i && g <= o) return null;
        u[`${p}-${d}`] = !0, d > r && (d -= h), g > r && (g -= h);
      }
      return `${Q(d, p)}:${Q(g, w)}`;
    }).filter((f) => !!f), t === "row" ? r <= l && (s._cells._.forEach((f, x) => {
      if (f) {
        const [d, p, g] = f;
        d >= r && d <= n ? u[`${d}-${p}`] || (s._cells._[x] = null) : d > r && (f[0] -= c);
      }
    }), s._cells._ = s._cells._.filter((f) => !!f)) : i <= a && (s._cells._.forEach((f, x) => {
      if (f) {
        const [d, p, g] = f;
        p >= i && p <= o ? u[`${d}-${p}`] || (s._cells._[x] = null) : d > i && (f[1] -= h);
      }
    }), s._cells._ = s._cells._.filter((f) => !!f)), t === "row" ? s._data.rows.len -= c : s._data.cols.len -= h, Ye(s), s.resize(), s._cells.resetIndexes(), s.render();
  }
}
function Ln(s, t) {
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
function Vn(s) {
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
function Nn(s) {
  s.isMerged() ? s.unmerge() : s.merge(), s.render();
}
function qn(s) {
  if (s._data.freeze)
    s.freeze();
  else if (s._selector) {
    const { _ranges: t } = s._selector;
    t.length > 0 && s.freeze(Q(t[0].startCol, t[0].startRow));
  }
  s.render();
}
function jn(s) {
  var t;
  if (s._selector) {
    s.addHistory("set paintFormat");
    const e = s._selector.paintFormatArea;
    if (e) {
      const { startCol: r, startRow: i, endCol: n, endRow: o } = e, c = n - r + 1, h = o - i + 1, l = {}, a = {};
      e.each((u, f) => {
        const x = s.cell(u, f), d = s.getPureStyle(u, f);
        l[`${u - i}-${f - r}`] = { ...d }, typeof x == "object" && (a[`${u - i}-${f - r}`] = x);
      });
      for (const u of s._selector._ranges) {
        const { startCol: f, startRow: x, endCol: d, endRow: p } = u;
        u.each((g, w) => {
          const _ = `${(g - x) % h}-${(w - f) % c}`, m = s.cell(g, w);
          if (a[_]) {
            const C = JSON.parse(JSON.stringify(a[_]));
            C.style = void 0, m instanceof Object ? C.value = (m == null ? void 0 : m.value) || "" : C.value = m, s.cell(g, w, C), s.setStyle(g, w, { ...l[_] }, !0);
          }
        });
      }
    }
    (t = s._selector) == null || t.clearCopy(), s._selector.paintFormatArea = null, s.render();
  }
}
const j = {
  init: yn,
  setCellStyle: Pn,
  fastSetCellStyle: In,
  fastClearCellStyle: zn,
  fastClearCellFormat: Mn,
  fastSetCellFormat: Hn,
  fastSetCellFixed: Tn,
  setCellValue: En,
  clearCellValue: Bn,
  clearCell: An,
  addRange: rs,
  unionRange: is,
  reset: Bt,
  move: hr,
  bindMousemove: ss,
  showCopy: ns,
  clearCopy: os,
  copyValue: kn,
  pasteValue: $n,
  insertRowOrCol: On,
  deleteRowOrCol: Wn,
  isInRange: Dn,
  setBorder: Ln,
  clearBorder: Vn,
  mergeGrid: Nn,
  freezeGrid: qn,
  paintFormat: jn
};
function Yn(s, t) {
  const e = bt(t), { _editors: r } = s;
  let i = r.get(e);
  if (!i) {
    const n = ut.use();
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
function Un(s) {
  const { _editor: t, _selector: e, _renderer: r } = s;
  if (t && e) {
    const { _focusArea: i, _focus: n } = e;
    if (t.visible && i) {
      const { _rect: o, _target: c } = i, { viewport: h } = r;
      o && c && h && h.inAreas(...n) ? t.rect(o).target(c).show() : t.rect({ x: -100, y: -100, width: 0, height: 0 }).hide();
    }
  }
}
function Xn(s, t) {
  const { _selector: e } = s;
  if (e) {
    const { _focusRange: r, _focusArea: i } = e;
    if (r && i) {
      const { _rect: n, _target: o } = i, { startRow: c, startCol: h } = r, l = s.cell(c, h), a = Yn(s, l);
      s._editor = a, a && n && o && (l && a.value(l), a.cellIndex(c, h).rect(n).target(o).show(t));
    }
  }
}
const kt = {
  move: Un,
  reset: Xn
}, Kn = (s, t, e, r, i) => `options=${JSON.stringify(t.options)} >${s.cellValueString(e, r)}</td>`, Gn = (s, t, e) => {
  let r = [];
  const i = t.getAttribute("options");
  if (i)
    try {
      r = JSON.parse(i);
    } catch (n) {
      console.error(n);
    }
  return { type: "select", value: t.innerText, options: r };
}, Zn = (s, t, e, r, i, n, o, c) => {
  const h = t;
  c || (c = Ge(h, r, n));
  const l = () => c ? (h.options || []).findIndex((k) => k === c) !== -1 : !0, {
    fontSize: a,
    fontFamily: u,
    bold: f,
    italic: x,
    color: d,
    align: p,
    valign: g,
    underline: w,
    strikethrough: _,
    textwrap: m,
    padding: C
  } = r;
  s.save().beginPath().prop({
    textAlign: p,
    textBaseline: g,
    font: Zi(u, a, x, f),
    fillStyle: d
  });
  const b = 8, [y, A] = C || [5, 5], D = Gi(p, e.width, y), $ = c.split(`
`), E = e.width - y * 2, B = [];
  $.forEach((k) => {
    const V = s.measureTextWidth(k);
    if (m && V > E) {
      let W = { w: 0, len: 0, start: 0 };
      for (let R = 0; R < k.length; R += 1)
        W.w > E && (B.push(k.slice(W.start, R)), W = { w: 0, len: 0, start: R }), W.len++, W.w += s.measureTextWidth(k[R]) + 1;
      W.len > 0 && B.push(k.slice(W.start));
    } else
      B.push(k);
  });
  const P = a / 0.75, T = (B.length - 1) * P, F = [];
  w && F.push("underline"), _ && F.push("strikethrough");
  let S = Xi(g, e.height, T, P, A), H = 0;
  const L = (B.length > 0 ? B.length : 1) * P;
  return B.forEach((k) => {
    const V = s.measureTextWidth(k);
    H = Math.max(H, V), s.fillText(k, D, S), s.beginPath(), Qn({ x: E, y: S }, b, !0).forEach(
      (W, R) => {
        R === 0 ? s.moveTo(W.x, W.y) : s.lineTo(W.x, W.y);
      }
    ), s.closePath(), l() ? s._ctx.fillStyle = "#939495" : s._ctx.fillStyle = "red", s.fill(), F.forEach((W) => {
      s._ctx.strokeStyle = d, s.line(...Ki(W, p, g, D, S, V, a));
    }), S += P;
  }), s.restore(), {
    contentInfo: {
      width: H,
      height: L + 10
    }
  };
}, Qn = (s, t = 10, e = !1) => {
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
}, Jn = (s, t, e, r) => {
  r.clientX > e.x + (e.width - 15) && setTimeout(() => {
    kt.reset(s);
  }, 0);
}, bt = (s) => s instanceof Object && s.type && s.type in ut.use().options ? s.type : "text", to = [
  {
    type: "text",
    toHtml: Xs,
    fromHtml: Ks,
    toCanvas: Qi,
    editor: () => new Gs()
  },
  {
    type: "select",
    toHtml: Kn,
    fromHtml: Gn,
    toCanvas: Zn,
    editor: () => new pn(),
    clickEvent: Jn
  },
  {
    type: "image",
    disableAutoFillAction: !0,
    toHtml: un,
    toCanvas: fn,
    fromHtml: xn
  }
];
var Ht;
const Xe = class Xe {
  constructor() {
    v(this, "options", {});
    this.loadBaseRender();
  }
  static use() {
    return Lt(this, Ht) || er(this, Ht, new Xe()), Lt(this, Ht);
  }
  loadBaseRender() {
    to.forEach((t) => {
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
Ht = new WeakMap(), tr(Xe, Ht);
let ut = Xe;
function Ct(s, t, e, r = !1) {
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
      let u = [], f = 1;
      l[0] === "thick" ? f = 3 : l[0] === "medium" ? f = 2 : l[0] === "dotted" ? u = [1, 1] : l[0] === "dashed" && (u = [2, 2]);
      let x = 0;
      r && (x = f / 2), s.prop({ strokeStyle: l[1], lineWidth: f }).setLineDash(u).line(...h(a, x));
    }
  }), s.restore();
}
function Ge(s, t, e) {
  let r = "";
  const i = bt(s);
  return s && (i === "text" ? s instanceof Object ? r = e(
    s,
    t,
    `${(s == null ? void 0 : s.value) || ""}`,
    s == null ? void 0 : s.format
  ) : r = e(s, t, `${s || ""}`) : s instanceof Object && (r = s.value ? String(s.value) : "")), r;
}
function Di(s, t, e, r, i, n, o) {
  const c = bt(t);
  if (s.save().beginPath().translate(e.x, e.y), s.rect(0, 0, e.width, e.height).clip(), r.bgcolor && s.prop("fillStyle", r.bgcolor).fill(), r.rotate && r.rotate > 0 && s.rotate(r.rotate * (Math.PI / 180)), i !== void 0) {
    if (s.save(), !i(s, e, t, Ge(t, r, n))) {
      s.restore();
      return;
    }
    s.restore();
  }
  const h = ut.use().getRender(c).toCanvas(s, t, e, r, i, n, o);
  return s.restore(), h;
}
function as(s, [t, e, ...r], i) {
  const n = [], o = X.with(t), c = i.filter((h) => h.intersects(o));
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
              const u = s.rect(a);
              n.push(
                ...as(
                  s,
                  [a.toString(), e, ...r],
                  l
                )
              ), (e === "inside" || e === "horizontal") && (a.startRow < h.startRow && a.endRow < h.startRow ? n.push([a, u, "bottom"]) : a.startRow > h.startRow && a.endRow > h.startRow && n.push([a, u, "top"])), (e === "inside" || e === "vertical") && (a.startCol < h.startCol && a.endCol < h.startCol && n.push([a, u, "right"]), a.startCol > h.startCol && a.endCol > h.startCol && n.push([a, u, "left"]));
            }
          }), e === "all") {
            const a = s.rect(h);
            o.startRow === h.startRow && n.push([h, a, "top"]), o.endRow === h.endRow && n.push([h, a, "bottom"]), o.startCol === h.startCol && n.push([h, a, "left"]), o.endCol === h.endCol && n.push([h, a, "right"]);
          }
          break;
        }
  return n;
}
function dr(s, { width: t, color: e }, r) {
  t > 0 && (s.save().beginPath().prop({ lineWidth: t - 0.5, strokeStyle: e }), r(), s.restore());
}
function Fi(s, t, { x: e, y: r, width: i, height: n }) {
  dr(s, t, () => {
    s.translate(e, r).line(i, 0, i, n).line(0, n, i, n);
  });
}
function eo(s, t, e, r, i, n, o, c) {
  const h = [n, o];
  i === "outside" || i === "all" ? Ct(s, r, h, !0) : i === "left" ? Ct(s, r, { left: h }, c) : i === "top" ? Ct(s, r, { top: h }, c) : i === "right" ? Ct(s, r, { right: h }, c) : i === "bottom" && Ct(s, r, { bottom: h }, c), (i === "all" || i === "inside" || i === "horizontal" || i === "vertical") && (i !== "horizontal" && e.eachCol((l) => {
    if (l < e.endCol) {
      const a = e.clone();
      a.endCol = a.startCol = l, a.intersects(t.range) && Ct(
        s,
        t.rect(a),
        { right: h },
        c
      );
    }
  }), i !== "vertical" && e.eachRow((l) => {
    if (l < e.endRow) {
      const a = e.clone();
      a.endRow = a.startRow = l, a.intersects(t.range) && Ct(
        s,
        t.rect(a),
        { bottom: h },
        c
      );
    }
  }));
}
function ro(s, t, e, r) {
  e && e.length > 0 && e.forEach((i) => {
    const [, , n, o] = i;
    as(t, i, r).forEach(([c, h, l]) => {
      eo(s, t, c, h, l, n, o);
    });
  });
}
function vt(s, t, e, r) {
  if (!e) return;
  let i, n, o = (b, y, A) => A, c = r._headerStyle, h = r._headerGridline, l = r._styles, a, u, f, x;
  const { _rowHeader: d, _colHeader: p } = r;
  if (s === "row-header") {
    if (d.width <= 0) return;
    ({ cell: i, merges: a, cellRenderer: n } = d);
  } else if (s === "col-header") {
    if (p.height <= 0) return;
    ({ cell: i, merges: a, cellRenderer: n } = p);
  } else
    i = r._cell, n = r._cellRenderer, o = r._formatter, c = r._style, h = r._gridline, l = r._styles, a = r._merges, u = r._borders, f = r._row, x = r._col;
  t.save().translate(e.x, e.y).prop("fillStyle", r._bgcolor).rect(0, 0, e.width, e.height).fill().clip();
  const g = (b, y, A) => {
    const D = { ...c };
    if (f) {
      const $ = f(b);
      $ && $.style !== void 0 && Object.assign(D, l[$.style]);
    }
    if (x) {
      const $ = x(y);
      $ && $.style !== void 0 && Object.assign(D, l[$.style]);
    }
    return A instanceof Object && A.style !== void 0 && Object.assign(D, l[A.style]), D;
  }, w = [], _ = [], m = /* @__PURE__ */ new Set();
  a && ks(a, (b) => {
    if (b.intersects(e.range)) {
      const y = i(b.startRow, b.startCol), A = g(b.startRow, b.startCol, y), D = e.rect(b);
      _.push([y, D, A]), w.push(b), b.each(($, E) => {
        m.add(`${$}_${E}`);
      });
    }
  });
  const C = (b, y, A) => {
    if (s === "body")
      return Fi(t, h, y), Di(t, b, y, A, n, o, s);
    Di(t, b, y, A, n, o, s), Fi(t, h, y);
  };
  e.each((b, y, A) => {
    var D;
    if (r._activeRowHeight[b] || (r._activeRowHeight[b] = []), !m.has(`${b}_${y}`)) {
      const $ = i(b, y), E = g(b, y, $), B = C($, A, E);
      E.textwrap && B && B.contentInfo && (r._activeRowHeight[b][y] = ((D = B.contentInfo) == null ? void 0 : D.height) || 0), E.textwrap || (r._activeRowHeight[b][y] = 0);
    }
  }), _.forEach((b) => C(...b)), ro(t, e, u, w), t.restore();
}
function io(s) {
  const { _width: t, _height: e, _target: r, _scale: i, _viewport: n, _freeze: o, _rowHeader: c, _colHeader: h } = s;
  if (n) {
    const l = new Ss(r, i);
    l.size(t, e);
    const [a, u, f, x] = n.areas, [d, p, g, w] = n.headerAreas;
    vt("body", l, x, s), vt("body", l, a, s), vt("col-header", l, d, s), vt("body", l, f, s), vt("row-header", l, w, s), vt("body", l, u, s), vt("col-header", l, p, s), vt("row-header", l, g, s);
    const [_, m] = o;
    (m > 0 || _ > 0) && dr(l, s._freezeGridline, () => {
      m > 0 && l.line(0, x.y, t, x.y), _ > 0 && l.line(x.x, 0, x.x, e);
    });
    const { x: C, y: b } = u;
    if (C > 0 && b > 0) {
      const { height: y } = h, { width: A } = c, { bgcolor: D } = s._headerStyle;
      D && l.save().prop({ fillStyle: D }).rect(0, 0, A, y).fill().restore(), dr(l, s._headerGridline, () => {
        l.line(0, y, A, y).line(A, 0, A, y);
      });
    }
  }
}
class dt {
  constructor(t, e, r, i, n, o, c) {
    // { rowIndex: { y, height }}
    v(this, "rowMap", /* @__PURE__ */ new Map());
    // { colIndex: { x, width }}
    v(this, "colMap", /* @__PURE__ */ new Map());
    v(this, "cellAtCache", null);
    this.range = t, this.x = e, this.y = r, this.width = i, this.height = n, this.rowHeight = o, this.colWidth = c;
    let h = 0;
    t.eachRow((a) => {
      const u = o(a);
      this.rowMap.set(a, { y: h, height: u }), h += u;
    }), this.height <= 0 && (this.height = h);
    let l = 0;
    t.eachCol((a) => {
      const u = c(a);
      this.colMap.set(a, { x: l, width: u }), l += u;
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
    return new dt(
      new X(t, e, r, i),
      n,
      o,
      c,
      h,
      l,
      a
    );
  }
}
class so {
  constructor(t) {
    /**
     * [area1, area2, area3, area4]
     * -----------------------
     * |  area-2   |   area-1
     * |-----------|----------
     * |  area-3   |   area-4
     * -----------------------
     */
    v(this, "areas");
    /**
     * [area1, area21, area23, area3]
     *             |   area-21   | area-1
     * ------------|-----------------------
     *   area-23   |   body
     * ------------|
     *   area-3    |
     */
    v(this, "headerAreas");
    v(this, "_render");
    this._render = t;
    const [e, r] = [t._rowHeader.width, t._colHeader.height], [i, n] = t._freeze, { _startRow: o, _startCol: c, _rows: h, _cols: l, _width: a, _height: u } = t, f = (H) => t.rowHeightAt(H), x = (H) => t.colWidthAt(H), d = dt.create(
      o,
      c,
      i - 1,
      n - 1,
      e,
      r,
      0,
      0,
      f,
      x
    ), [p, g] = [i + t._scrollRows, n + t._scrollCols];
    let w = d.height + r, _ = p;
    for (; w < u && _ < h; )
      w += f(_), _ += 1;
    let m = d.width + e, C = g;
    for (; m < a && C < l; )
      m += x(C), C += 1;
    const b = e + d.width, y = r + d.height;
    let A = a - b, D = u - y;
    C === l && (A -= a - m), _ === h && (D -= u - w), C -= 1, _ -= 1;
    const $ = dt.create(
      p,
      g,
      _,
      C,
      b,
      y,
      A,
      D,
      f,
      x
    ), E = dt.create(
      o,
      g,
      i - 1,
      C,
      b,
      r,
      A,
      0,
      f,
      x
    ), B = dt.create(
      p,
      c,
      _,
      n - 1,
      e,
      y,
      0,
      D,
      f,
      x
    );
    this.areas = [E, d, B, $];
    const { _rowHeader: P, _colHeader: T } = t, F = () => T.height / T.rows, S = () => P.width / P.cols;
    this.headerAreas = [
      dt.create(
        0,
        E.range.startCol,
        T.rows - 1,
        E.range.endCol,
        $.x,
        0,
        $.width,
        0,
        F,
        x
      ),
      dt.create(
        0,
        d.range.startCol,
        T.rows - 1,
        d.range.endCol,
        d.x,
        0,
        d.width,
        0,
        F,
        x
      ),
      dt.create(
        d.range.startRow,
        0,
        d.range.endRow,
        P.cols - 1,
        0,
        d.y,
        0,
        d.height,
        f,
        S
      ),
      dt.create(
        B.range.startRow,
        0,
        B.range.endRow,
        P.cols - 1,
        0,
        $.y,
        0,
        $.height,
        f,
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
    v(this, "_target");
    v(this, "_bgcolor", "#ffffff");
    // table width
    v(this, "_width", 0);
    // table height
    v(this, "_height", 0);
    v(this, "_scale", 1);
    // the count of rows
    v(this, "_rows", 100);
    // the count of cols;
    v(this, "_cols", 26);
    // the row height (px)
    v(this, "_rowHeight", 22);
    // the column width (px)
    v(this, "_colWidth", 100);
    // row of the start position in table
    v(this, "_startRow", 0);
    // col of the start position in table
    v(this, "_startCol", 0);
    // count of rows scrolled
    v(this, "_scrollRows", 0);
    // count of cols scrolled
    v(this, "_scrollCols", 0);
    /**
     * get row given rowIndex
     * @param {int} rowIndex
     * @returns Row | undefined
     */
    v(this, "_row", () => {
    });
    /**
     * get col given colIndex
     * @param {int} coIndex
     * @returns Row | undefined
     */
    v(this, "_col", () => {
    });
    /**
     * get cell given rowIndex, colIndex
     * @param {int} rowIndex
     * @param {int} colIndex
     * @returns Cell | string
     */
    v(this, "_cell", () => {
    });
    v(this, "_cellRenderer", () => !0);
    v(this, "_formatter", (t, e, r) => r);
    v(this, "_merges", []);
    v(this, "_borders", []);
    v(this, "_styles", []);
    v(this, "_gridline", {
      width: 1,
      color: "#e6e6e6"
    });
    v(this, "_style", {
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
    v(this, "_rowHeader", {
      width: 60,
      cols: 1,
      cell(t, e) {
        return t + 1;
      }
    });
    // column header
    v(this, "_colHeader", {
      height: 24,
      rows: 1,
      cell(t, e) {
        return zi(e);
      }
    });
    v(this, "_headerGridline", {
      width: 1,
      color: "#e6e6e6"
    });
    v(this, "_headerStyle", {
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
    v(this, "_freeze", [0, 0]);
    v(this, "_freezeGridline", {
      width: 2,
      color: "#d8d8d8"
    });
    // it can be used after rendering
    v(this, "_viewport", null);
    v(this, "_activeRowHeight", {});
    const i = typeof t == "string" ? document.querySelector(t) : t;
    if (!i) throw new Error("target error");
    this._target = i, this._width = e, this._height = r;
  }
  render() {
    return this._viewport = new so(this), io(this), this;
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
    return t && (this._freeze = it(t).reverse()), this;
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
class Ri {
  constructor(t, e, r, i, n = () => {
  }) {
    v(this, "_");
    v(this, "_hover");
    v(this, "_line");
    v(this, "_type");
    v(this, "_minValue");
    v(this, "_lineLength");
    v(this, "_cell", null);
    v(this, "_change");
    this._type = t, this._minValue = r, this._lineLength = i, this._change = n, this._ = z("div", `${N}-resizer ${t}`).append(
      this._hover = z("div", "hover").on(
        "mousedown.stop",
        (o) => no(this, o)
      ),
      this._line = z("div", "line")
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
function no(s, t) {
  const { _type: e, _cell: r, _minValue: i, _: n, _line: o, _change: c } = s;
  let h = 0;
  o.show();
  const l = (u) => {
    t !== null && u.buttons === 1 && r && (e === "row" ? (h += u.movementY, h + r.height >= i ? n.css("top", `${r.y + r.height + h}px`) : h = i - r.height) : (h += u.movementX, h + r.width >= i ? n.css("left", `${r.x + r.width + h}px`) : h = i - r.width));
  }, a = () => {
    Ne(document.body, "mousemove", (u) => l(u)), Ne(document.body, "mouseup", a), o.hide(), n.hide(), r && h != 0 && c(h, r);
  };
  Ve(document.body, "mousemove", (u) => l(u)), Ve(document.body, "mouseup", a);
}
function oo(s) {
  s._rowResizer = new Ri(
    "row",
    s._container,
    s._minRowHeight,
    () => s._width(),
    (t, { row: e, height: r }) => {
      s.rowHeight(e, r + t).render(), j.reset(s), s._canvas.focus();
    }
  ), s._colResizer = new Ri(
    "col",
    s._container,
    s._minColWidth,
    () => s._height(),
    (t, { col: e, width: r }) => {
      s.colWidth(e, r + t).render(), j.reset(s), s._canvas.focus();
    }
  );
}
const ao = {
  init: oo
};
function lo(s, t) {
  let e = '<table xmlns="http://www.w3.org/1999/xhtml" style="border-spacing: 0; border-collapse: collapse;">';
  const r = X.with(t), i = s._data.merges.map((c) => X.with(c)).filter((c) => c.intersects(r)), n = (c, h) => c === "dashed" || c === "dotted" ? `1px ${c} ${h}` : `${c === "thick" ? 3 : c === "medium" ? 2 : 1}pt solid ${h}`, o = /* @__PURE__ */ new Map();
  for (const c of s._data.borders) {
    const [h, l, a, u] = c, f = X.with(h);
    if (f.intersects(r)) {
      const { startRow: x, startCol: d, endRow: p, endCol: g } = f;
      f.each((w, _) => {
        const m = n(a, u), C = [];
        l === "all" && C.push("border"), (l === "outside" || l === "left") && _ === d && C.push("border-left"), (l === "outside" || l === "right") && _ === g && C.push("border-right"), (l === "outside" || l === "top") && w === x && C.push("border-top"), (l === "outside" || l === "bottom") && w === p && C.push("border-bottom"), (l === "inside" || l === "vertical") && _ >= d && _ < g && C.push("border-right"), (l === "inside" || l === "horizontal") && w >= x && w < p && C.push("border-bottom"), C.length > 0 && o.set(
          `${w}_${_}`,
          C.map((b) => `${b}:${m} !important;`).join("")
        );
      });
    }
  }
  return e += "<colgroup>", r.eachCol((c) => {
    e += `<col width="${s.colWidth(c)}"/>`;
  }), e += "</colgroup>", e += "<tbody>", r.eachRow((c) => {
    e += `<tr style="height: ${s.rowHeight(c)}px;">`, r.eachCol((h) => {
      const l = s.cell(c, h), a = X.create(c, h);
      let u = !1, [f, x] = [1, 1];
      for (const d of i) {
        if (d.startRow === c && d.startCol === h) {
          f = d.rows + 1, x = d.cols + 1;
          break;
        }
        if (d.intersects(a)) {
          u = !0;
          break;
        }
      }
      if (!u) {
        const d = bt(l);
        e += "<td", f > 1 && (e += ` rowspan="${f}"`), x > 1 && (e += ` colspan="${x}"`), e += ` cellType="${d}"`;
        let p = "";
        const g = `${c}_${h}`;
        o.has(g) && (p += o.get(g)), l && l instanceof Object && l.style !== void 0 && (p += ho(s.style(l.style, !0))), e += `style="${p ? `${p};` : ""} position: relative; padding: 0 5px;"`;
        const w = bt(l);
        e += ut.use().getRender(w).toHtml(s, l, c, h, e);
      }
    }), e += "</tr>";
  }), `${e}</tbody></table>`;
}
function co(s, t, [e, r]) {
  const i = [0, 0];
  if (t && t.includes("</table>")) {
    const { _data: n } = s, o = n.style, c = document.createElement("template");
    c.innerHTML = t;
    const h = [], l = c.content.querySelectorAll("tr");
    i[0] = e + l.length - 1;
    const a = [];
    if (l.forEach((u, f) => {
      const x = u.querySelectorAll("td");
      f === 0 && (i[1] = r + x.length - 1);
      let d = null;
      const p = [];
      for (const [w, _] of x.entries()) {
        let [m, C] = [f + e, w + r];
        h.length > 0 && h.forEach((F) => {
          F.containsRow(m) && F.startCol <= C && (C += F.cols, F.startRow !== m && (C += 1));
        });
        const b = Q(C, m);
        let [y, A] = [1, 1];
        if (Si(_, "rowspan", (F) => y = Number.parseInt(F)), Si(_, "colspan", (F) => A = Number.parseInt(F)), y > 1 || A > 1) {
          const F = X.create(m, C, m + y - 1, C + A - 1);
          s.merge(F.toString()), h.push(F);
        }
        f === 0 && (i[1] += A - 1);
        const D = {};
        ct(_, "background-color", "", (F) => D.bgcolor = F), ct(_, "color", o.color, (F) => D.color = F), ct(
          _,
          "text-align",
          o.align,
          (F) => D.align = F
        ), ct(
          _,
          "vertical-align",
          o.valign,
          (F) => D.valign = F
        ), Zt(
          _,
          "white-space",
          "normal",
          (F) => D.textwrap = !0
        ), Zt(
          _,
          "text-decoration",
          "underline",
          (F) => D.underline = !0
        ), Zt(
          _,
          "text-decoration",
          "line-through",
          (F) => D.strikethrough = !0
        ), Zt(_, "font-style", "italic", (F) => D.italic = !0), ct(_, "font-weight", "normal", (F) => {
          (F === "bold" || Number.parseInt(F) >= 700) && (D.bold = !0);
        }), ct(
          _,
          "font-family",
          o.fontFamily,
          (F) => D.fontFamily = F
        ), ct(
          _,
          "font-size",
          o.fontSize,
          (F) => D.fontSize = Number.parseInt(F)
        );
        const $ = (F) => {
          const [S, H, ...L] = F.split(" ").map((V) => V.trim());
          let k = "thin";
          if (H === "solid") {
            let V = Number.parseInt(S);
            S.includes("pt") && (V = Ws(Number.parseInt(S))), V === 2 ? k = "medium" : V === 3 && (k = "thick");
          } else
            k = H;
          return [k, L.join("")];
        }, E = [];
        let B = null;
        ct(_, "border-width", "", (F) => E.push(F)), ct(_, "border-style", "", (F) => E.push(F)), ct(_, "border-color", "", (F) => E.push(F)), E.length >= 3 ? B = [b, "all", ...$(E.join(" "))] : ct(
          _,
          "border",
          "none",
          (F) => B = [b, "all", ...$(F)]
        ) || ["top", "right", "bottom", "left"].forEach((F) => {
          ct(
            _,
            `border-${F}`,
            "none",
            (S) => B = [b, F, ...$(S)]
          );
        }), d === null ? B !== null && (d = B) : B !== null && B[1] === d[1] && B[2] === d[2] && B[3] === d[3] ? d[0] = `${d[0].split(":")[0]}:${b}` : (p.push(d), d = B);
        const P = _.getAttribute("cellType") || "text", T = ut.use().getRender(P).fromHtml(s, _, D);
        Object.keys(T).length > 0 && s.cell(m, C, T);
      }
      d != null && p.push(d);
      const g = a.at(-1);
      if (g && g.length > 0)
        if (g.length === 1 && p.length === 1 && g[0][1] === "all" && g[0][1] === p[0][1] && g[0][2] === p[0][2] && g[0][3] === p[0][3]) {
          const w = X.with(g[0][0]);
          w.endRow += 1, g[0][0] = w.toString();
        } else
          a.push(p);
      else
        a.push(p);
    }), a.length > 0)
      for (const u of a)
        u.forEach((f) => s.addBorder(...f));
  }
  return i;
}
function Si(s, t, e) {
  if (s.hasAttribute(t)) {
    const r = s.getAttribute(t);
    r != null && e(r);
  }
}
function ct(s, t, e, r) {
  const i = s.style.getPropertyValue(t), n = i !== null && i !== "" && i !== e;
  return n && r(i), n;
}
function Zt(s, t, e, r) {
  const i = s.style.getPropertyValue(t);
  i === e && r(i);
}
function ho(s) {
  let t = "";
  return s.bgcolor && (t += `background-color: ${s.bgcolor};`), s.color && (t += `color: ${s.color};`), s.align && (t += `text-align: ${s.align};`), s.valign && (t += `vertical-align: ${s.valign};`), s.textwrap === !0 && (t += "white-space: normal;"), s.underline === !0 && (t += "text-decoration: underline;"), s.strikethrough === !0 && (t += "text-decoration: line-through;"), s.bold === !0 && (t += "font-weight: bold;"), s.italic === !0 && (t += "font-style: italic;"), s.fontFamily && (t += `font-family: ${s.fontFamily};`), s.fontSize && (t += `font-size: ${s.fontSize}pt;`), t;
}
class fo {
  constructor(t) {
    v(this, "table");
    v(this, "setCutted", !1);
    this.table = t, this.table._canvas.on("mousedown", (e) => this.mousedownHandler(e)).on("mousemove", (e) => this.mousemoveHandler(e)).on("mouseup", (e) => this.mouseUpHandler(e)).on("wheel.prevent", (e) => this.wheelHandler(e)).on("keydown", (e) => this.keydownHandler(e)).on(
      "contextmenu.prevent",
      (e) => this.contextmenuHandler(e)
    ).on("dblclick.prevent", () => {
      kt.reset(this.table);
    }), this.initSelectorShadowInput();
  }
  initSelectorShadowInput() {
    const t = this.table._selector, e = t == null ? void 0 : t._shadowInput;
    !t || !e || (e.on("compositionstart", (r) => {
      t._shadowInputLock = !0, e._.value = "", e._.style.width = "auto", r.preventDefault();
    }), e.on("compositionend", (r) => {
      t._shadowInputLock = !1, e._.style.width = "0", e._.value = "", kt.reset(this.table, r.data), r.preventDefault();
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
      const { offsetX: l, offsetY: a, ctrlKey: u, metaKey: f, shiftKey: x } = t, d = o.cellAt(l, a);
      if (d) {
        n.emit("click", d, t);
        const { placement: p, row: g, col: w } = d, _ = this.table.cell(g, w);
        if (_) {
          const m = bt(_);
          (h = (c = ut.use().options[m]).clickEvent) == null || h.call(c, this.table, _, d, t);
        }
        x ? j.unionRange(this.table, g, w) : (t.button === 2 && j.isInRange(this.table, g, w) || (e.placement(p), j.addRange(this.table, g, w, !(f || u))), p === "body" && Tt.autoMove(this.table, e.currentRange)), j.reset(this.table), j.bindMousemove(
          this.table,
          (m, C) => {
            j.unionRange(this.table, m, C);
          },
          (m) => m.currentRange
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
          const u = n.cellAt(c, h);
          u && e.show(u);
        } else
          e.hide();
      if (r && a.height > 0)
        if (h < a.height && c > l.width) {
          const u = n.cellAt(c, h);
          u && r.show(u);
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
    else if (t === "print")
      this.table._printer.print();
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
    ) : o === "KeyX" && (e || i) ? this.eventTrigger("cut") : o === "KeyC" && (e || i) ? this.eventTrigger("copy") : o === "KeyV" && (e || i) ? this.eventTrigger("paste", t.shiftKey) : o === "KeyZ" && (e || i) ? this.eventTrigger("undo") : o === "KeyY" && (e || i) ? this.eventTrigger("redo") : o === "KeyB" && (e || i) ? this.eventTrigger("fastStyle", "bold") : o === "KeyU" && (e || i) ? this.eventTrigger("fastStyle", "underline") : o === "KeyI" && (e || i) ? this.eventTrigger("fastStyle", "italic") : o === "Escape" ? this.eventTrigger("clearCopy") : o === "Backspace" ? this.eventTrigger("clearCell", r ? "style" : "value") : o === "Delete" ? this.eventTrigger("clearCell", "cell") : o === "KeyP" && (e || i) ? this.eventTrigger("print") : this.canInput(t) && kt.reset(this.table, t.key), t.preventDefault();
  }
  contextmenuHandler(t) {
    this.table._contextMenu.show(t), t.preventDefault();
  }
}
class uo {
  constructor() {
    v(this, "undoItems");
    v(this, "redoItems");
    v(this, "maxSize", 50);
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
const xo = (s) => new Promise((t, e) => {
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
var Te = { exports: {} }, or = { exports: {} };
/*!
 * Infinite Scroll v2.0.4
 * measure size of elements
 * MIT license
 */
var ki;
function po() {
  return ki || (ki = 1, function(s) {
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
        r.forEach((m) => {
          let C = h[m], b = parseFloat(C);
          l[m] = isNaN(b) ? 0 : b;
        });
        let u = l.paddingLeft + l.paddingRight, f = l.paddingTop + l.paddingBottom, x = l.marginLeft + l.marginRight, d = l.marginTop + l.marginBottom, p = l.borderLeftWidth + l.borderRightWidth, g = l.borderTopWidth + l.borderBottomWidth, w = e(h.width);
        w !== !1 && (l.width = w + // add padding and border unless it's already including it
        (a ? 0 : u + p));
        let _ = e(h.height);
        return _ !== !1 && (l.height = _ + // add padding and border unless it's already including it
        (a ? 0 : f + g)), l.innerWidth = l.width - (u + p), l.innerHeight = l.height - (f + g), l.outerWidth = l.width + x, l.outerHeight = l.height + d, l;
      }
      return n;
    });
  }(or)), or.exports;
}
var Pe = { exports: {} }, Ie = { exports: {} }, _o = Ie.exports, $i;
function vo() {
  return $i || ($i = 1, function(s) {
    (function(t, e) {
      s.exports ? s.exports = e() : t.EvEmitter = e();
    })(typeof window < "u" ? window : _o, function() {
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
var go = Pe.exports, Hi;
function mo() {
  return Hi || (Hi = 1, function(s) {
    (function(t, e) {
      s.exports ? s.exports = e(
        t,
        vo()
      ) : t.Unidragger = e(
        t,
        t.EvEmitter
      );
    })(typeof window < "u" ? window : go, function(e, r) {
      function i() {
      }
      let n = i.prototype = Object.create(r.prototype);
      n.handleEvent = function(a) {
        let u = "on" + a.type;
        this[u] && this[u](a);
      };
      let o, c;
      "ontouchstart" in e ? (o = "touchstart", c = ["touchmove", "touchend", "touchcancel"]) : e.PointerEvent ? (o = "pointerdown", c = ["pointermove", "pointerup", "pointercancel"]) : (o = "mousedown", c = ["mousemove", "mouseup"]), n.touchActionValue = "none", n.bindHandles = function() {
        this._bindHandles("addEventListener", this.touchActionValue);
      }, n.unbindHandles = function() {
        this._bindHandles("removeEventListener", "");
      }, n._bindHandles = function(a, u) {
        this.handles.forEach((f) => {
          f[a](o, this), f[a]("click", this), e.PointerEvent && (f.style.touchAction = u);
        });
      }, n.bindActivePointerEvents = function() {
        c.forEach((a) => {
          e.addEventListener(a, this);
        });
      }, n.unbindActivePointerEvents = function() {
        c.forEach((a) => {
          e.removeEventListener(a, this);
        });
      }, n.withPointer = function(a, u) {
        u.pointerId === this.pointerIdentifier && this[a](u, u);
      }, n.withTouch = function(a, u) {
        let f;
        for (let x of u.changedTouches)
          x.identifier === this.pointerIdentifier && (f = x);
        f && this[a](u, f);
      }, n.onmousedown = function(a) {
        this.pointerDown(a, a);
      }, n.ontouchstart = function(a) {
        this.pointerDown(a, a.changedTouches[0]);
      }, n.onpointerdown = function(a) {
        this.pointerDown(a, a);
      };
      const h = ["TEXTAREA", "INPUT", "SELECT", "OPTION"], l = ["radio", "checkbox", "button", "submit", "image", "file"];
      return n.pointerDown = function(a, u) {
        let f = h.includes(a.target.nodeName), x = l.includes(a.target.type), d = !f || x;
        !this.isPointerDown && !a.button && d && (this.isPointerDown = !0, this.pointerIdentifier = u.pointerId !== void 0 ? (
          // pointerId for pointer events, touch.indentifier for touch events
          u.pointerId
        ) : u.identifier, this.pointerDownPointer = {
          pageX: u.pageX,
          pageY: u.pageY
        }, this.bindActivePointerEvents(), this.emitEvent("pointerDown", [a, u]));
      }, n.onmousemove = function(a) {
        this.pointerMove(a, a);
      }, n.onpointermove = function(a) {
        this.withPointer("pointerMove", a);
      }, n.ontouchmove = function(a) {
        this.withTouch("pointerMove", a);
      }, n.pointerMove = function(a, u) {
        let f = {
          x: u.pageX - this.pointerDownPointer.pageX,
          y: u.pageY - this.pointerDownPointer.pageY
        };
        this.emitEvent("pointerMove", [a, u, f]), !this.isDragging && this.hasDragStarted(f) && this.dragStart(a, u), this.isDragging && this.dragMove(a, u, f);
      }, n.hasDragStarted = function(a) {
        return Math.abs(a.x) > 3 || Math.abs(a.y) > 3;
      }, n.dragStart = function(a, u) {
        this.isDragging = !0, this.isPreventingClicks = !0, this.emitEvent("dragStart", [a, u]);
      }, n.dragMove = function(a, u, f) {
        this.emitEvent("dragMove", [a, u, f]);
      }, n.onmouseup = function(a) {
        this.pointerUp(a, a);
      }, n.onpointerup = function(a) {
        this.withPointer("pointerUp", a);
      }, n.ontouchend = function(a) {
        this.withTouch("pointerUp", a);
      }, n.pointerUp = function(a, u) {
        this.pointerDone(), this.emitEvent("pointerUp", [a, u]), this.isDragging ? this.dragEnd(a, u) : this.staticClick(a, u);
      }, n.dragEnd = function(a, u) {
        this.isDragging = !1, setTimeout(() => delete this.isPreventingClicks), this.emitEvent("dragEnd", [a, u]);
      }, n.pointerDone = function() {
        this.isPointerDown = !1, delete this.pointerIdentifier, this.unbindActivePointerEvents(), this.emitEvent("pointerDone");
      }, n.onpointercancel = function(a) {
        this.withPointer("pointerCancel", a);
      }, n.ontouchcancel = function(a) {
        this.withTouch("pointerCancel", a);
      }, n.pointerCancel = function(a, u) {
        this.pointerDone(), this.emitEvent("pointerCancel", [a, u]);
      }, n.onclick = function(a) {
        this.isPreventingClicks && a.preventDefault();
      }, n.staticClick = function(a, u) {
        let f = a.type === "mouseup";
        f && this.isIgnoringMouseUp || (this.emitEvent("staticClick", [a, u]), f && (this.isIgnoringMouseUp = !0, setTimeout(() => {
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
var Co = Te.exports, Ti;
function wo() {
  return Ti || (Ti = 1, function(s) {
    (function(t, e) {
      s.exports ? s.exports = e(
        t,
        po(),
        mo()
      ) : t.Draggabilly = e(
        t,
        t.getSize,
        t.Unidragger
      );
    })(
      typeof window < "u" ? window : Co,
      function(e, r, i) {
        function n() {
        }
        let o = e.jQuery;
        function c(d, p) {
          this.element = typeof d == "string" ? document.querySelector(d) : d, o && (this.$element = o(this.element)), this.options = {}, this.option(p), this._create();
        }
        let h = c.prototype = Object.create(i.prototype);
        h.option = function(d) {
          this.options = {
            ...this.options,
            ...d
          };
        };
        const l = ["relative", "absolute", "fixed"];
        h._create = function() {
          this.position = {}, this._getPosition(), this.startPoint = { x: 0, y: 0 }, this.dragPoint = { x: 0, y: 0 }, this.startPosition = { ...this.position };
          let d = getComputedStyle(this.element);
          l.includes(d.position) || (this.element.style.position = "relative"), this.on("pointerDown", this.handlePointerDown), this.on("pointerUp", this.handlePointerUp), this.on("dragStart", this.handleDragStart), this.on("dragMove", this.handleDragMove), this.on("dragEnd", this.handleDragEnd), this.setHandles(), this.enable();
        }, h.setHandles = function() {
          let { handle: d } = this.options;
          typeof d == "string" ? this.handles = this.element.querySelectorAll(d) : typeof d == "object" && d.length ? this.handles = d : d instanceof HTMLElement ? this.handles = [d] : this.handles = [this.element];
        };
        const a = ["dragStart", "dragMove", "dragEnd"];
        let u = h.emitEvent;
        h.emitEvent = function(d, p) {
          if (!this.isEnabled && a.includes(d)) return;
          u.call(this, d, p);
          let w = e.jQuery;
          if (!w || !this.$element) return;
          let _, m = p;
          p && p[0] instanceof Event && ([_, ...m] = p);
          let b = w.Event(_);
          b.type = d, this.$element.trigger(b, m);
        }, h._getPosition = function() {
          let d = getComputedStyle(this.element), p = this._getPositionCoord(d.left, "width"), g = this._getPositionCoord(d.top, "height");
          this.position.x = isNaN(p) ? 0 : p, this.position.y = isNaN(g) ? 0 : g, this._addTransformPosition(d);
        }, h._getPositionCoord = function(d, p) {
          if (d.includes("%")) {
            let g = r(this.element.parentNode);
            return g ? parseFloat(d) / 100 * g[p] : 0;
          }
          return parseInt(d, 10);
        }, h._addTransformPosition = function(d) {
          let p = d.transform;
          if (!p.startsWith("matrix")) return;
          let g = p.split(","), w = p.startsWith("matrix3d") ? 12 : 4, _ = parseInt(g[w], 10), m = parseInt(g[w + 1], 10);
          this.position.x += _, this.position.y += m;
        }, h.handlePointerDown = function(d, p) {
          this.isEnabled && (this.pointerDownPointer = {
            pageX: p.pageX,
            pageY: p.pageY
          }, d.preventDefault(), document.activeElement.blur(), this.bindActivePointerEvents(d), this.element.classList.add("is-pointer-down"));
        }, h.handleDragStart = function() {
          this.isEnabled && (this._getPosition(), this.measureContainment(), this.startPosition.x = this.position.x, this.startPosition.y = this.position.y, this.setLeftTop(), this.dragPoint.x = 0, this.dragPoint.y = 0, this.element.classList.add("is-dragging"), this.animate());
        }, h.measureContainment = function() {
          let d = this.getContainer();
          if (!d) return;
          let p = r(this.element), g = r(d), {
            borderLeftWidth: w,
            borderRightWidth: _,
            borderTopWidth: m,
            borderBottomWidth: C
          } = g, b = this.element.getBoundingClientRect(), y = d.getBoundingClientRect(), A = w + _, D = m + C, $ = this.relativeStartPosition = {
            x: b.left - (y.left + w),
            y: b.top - (y.top + m)
          };
          this.containSize = {
            width: g.width - A - $.x - p.width,
            height: g.height - D - $.y - p.height
          };
        }, h.getContainer = function() {
          let d = this.options.containment;
          return d ? d instanceof HTMLElement ? d : typeof d == "string" ? document.querySelector(d) : this.element.parentNode : void 0;
        }, h.handleDragMove = function(d, p, g) {
          if (!this.isEnabled) return;
          let w = g.x, _ = g.y, m = this.options.grid, C = m && m[0], b = m && m[1];
          w = f(w, C), _ = f(_, b), w = this.containDrag("x", w, C), _ = this.containDrag("y", _, b), w = this.options.axis == "y" ? 0 : w, _ = this.options.axis == "x" ? 0 : _, this.position.x = this.startPosition.x + w, this.position.y = this.startPosition.y + _, this.dragPoint.x = w, this.dragPoint.y = _;
        };
        function f(d, p, g) {
          return p ? (g = g || "round", Math[g](d / p) * p) : d;
        }
        h.containDrag = function(d, p, g) {
          if (!this.options.containment) return p;
          let w = d == "x" ? "width" : "height", _ = this.relativeStartPosition[d], m = f(-_, g, "ceil"), C = this.containSize[w];
          return C = f(C, g, "floor"), Math.max(m, Math.min(C, p));
        }, h.handlePointerUp = function() {
          this.element.classList.remove("is-pointer-down");
        }, h.handleDragEnd = function() {
          this.isEnabled && (this.element.style.transform = "", this.setLeftTop(), this.element.classList.remove("is-dragging"));
        }, h.animate = function() {
          this.isDragging && (this.positionDrag(), requestAnimationFrame(() => this.animate()));
        }, h.setLeftTop = function() {
          let { x: d, y: p } = this.position;
          this.element.style.left = `${d}px`, this.element.style.top = `${p}px`;
        }, h.positionDrag = function() {
          let { x: d, y: p } = this.dragPoint;
          this.element.style.transform = `translate3d(${d}px, ${p}px, 0)`;
        }, h.setPosition = function(d, p) {
          this.position.x = d, this.position.y = p, this.setLeftTop();
        }, h.enable = function() {
          this.isEnabled || (this.isEnabled = !0, this.bindHandles());
        }, h.disable = function() {
          this.isEnabled && (this.isEnabled = !1, this.isDragging && this.dragEnd(), this.unbindHandles());
        };
        const x = ["transform", "left", "top", "position"];
        return h.destroy = function() {
          this.disable(), x.forEach((d) => {
            this.element.style[d] = "";
          }), this.unbindHandles(), this.$element && this.$element.removeData("draggabilly");
        }, h._init = n, o && o.bridget && o.bridget("draggabilly", c), c;
      }
    );
  }(Te)), Te.exports;
}
var bo = wo();
const yo = /* @__PURE__ */ Ji(bo);
class vr {
  constructor(t, e = {}) {
    v(this, "content");
    v(this, "mask", z("div", `${N}-dialog-mask`).hide());
    v(this, "container", z("div", `${N}-dialog`));
    v(this, "closeIcon", z("span", `${N}-dialog__header_close`).append(z("div", "icon")));
    v(this, "containerHeader", z("div", `${N}-dialog__header`).append(
      z("div", `${N}-dialog__header__title`),
      this.closeIcon
    ));
    v(this, "containerBody", z("div", `${N}-dialog__body`).css(
      "box-sizing",
      "border-box"
    ));
    v(this, "containerFooter", z("div", `${N}-dialog__footer`));
    v(this, "hasInserted", !1);
    v(this, "visible", !1);
    v(this, "conf");
    Array.isArray(t) ? this.content = z("div").append(...t) : this.content = t, this.conf = e, this.initContiner(), e != null && e.delayGenerate || this.insertContent();
  }
  initContiner() {
    this.container.append(this.containerHeader, this.containerBody, this.containerFooter), this.mask.append(this.container), this.mask.on("click", () => {
      this.conf.disableMask || (this.conf.closeOnClickMask || this.conf.closeOnClickMask === void 0) && this.close();
    }), this.closeIcon.on("click", () => {
      this.close();
    }), this.container.on("click", (t) => {
      document.dispatchEvent(new Event("click", t)), t.stopPropagation();
    }), this.conf.draggable && (new yo(this.container._, {
      handle: `.${N}-dialog__header`
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
    var t, e, r, i, n, o, c;
    (t = this.conf) != null && t.maskColor && this.mask.css("background", this.conf.maskColor), (e = this.conf) != null && e.disableMask ? (this.mask.css("pointer-events", "none"), this.container.css("pointer-events", "auto"), this.mask.css("background", "transparent")) : this.mask.css("pointer-events", "auto"), (r = this.conf) != null && r.title && ((n = this.containerHeader.firstChild) == null || n.textContent((i = this.conf) == null ? void 0 : i.title)), (o = this.conf) != null && o.width && this.container.css("width", this.conf.width), (c = this.conf) != null && c.height && this.container.css("height", this.conf.height);
  }
  show() {
    this.insertContent(), this.mask.show(), this.container.css("top", "50%"), this.container.css("left", "50%"), this.container.css("transform", "translate(-50%, -50%)"), this.visible = !0;
  }
  close() {
    this.conf.onBeforeClose && this.conf.onBeforeClose() === !1 || (this.mask.hide(), this.visible = !1);
  }
}
class wt {
  constructor(t, e = "default", r) {
    v(this, "_", z("button", `${N}-bse-button`).attr("type", "button"));
    v(this, "configs");
    v(this, "baseName");
    this._.addCss(`${N}-bse-button--${e}`), this._.on("click", (i) => {
      var n, o;
      (n = this.configs) != null && n.onClick && !this.configs.disabled && ((o = this.configs) == null || o.onClick()), i.preventDefault();
    }), this.baseName = t, this.configs = r, this.render();
  }
  render() {
    var t, e, r, i;
    typeof this.baseName == "string" ? this._.textContent(this.baseName) : this._.append(this.baseName), (t = this.configs) != null && t.padding && this._.css("padding", this.configs.padding), (e = this.configs) != null && e.disabled ? this._.addCss("is-disabled") : this._.removeCss("is-disabled"), (r = this.configs) != null && r.noneBorder && this._.addCss("none-border"), (i = this.configs) != null && i.style && this._.setStyles(this.configs.style);
  }
}
class ls {
  constructor(t) {
    v(this, "_");
    this._ = z("div", `${N}-icon`).append(z("div", ["icon", t]));
  }
}
class cs {
  constructor() {
    v(this, "events", {});
  }
  add(t, e) {
    this.events[t] || (this.events[t] = []), this.events[t].push(e);
  }
  remove(t, e) {
    if (this.events[t]) {
      const r = this.events[t].findIndex((i) => e);
      r !== -1 && this.events[t].splice(r, 1);
    }
  }
  emit(t, e = []) {
    this.events[t] && this.events[t].forEach((r) => {
      try {
        r(...e);
      } catch (i) {
        console.error(i);
      }
    });
  }
}
class gr {
  constructor(t, e) {
    v(this, "_");
    v(this, "configs", {
      labelPosition: "top",
      fields: []
    });
    v(this, "form", {});
    v(this, "fieldsDict", {});
    Object.assign(this.configs, t), e && (this.form = e), this.configs.t || (this.configs.t = (r) => r), this._ = z("form", `${N}-form`), this.render();
  }
  render() {
    this._.html(""), this.fieldsDict = {}, this.configs.fields.forEach((t) => {
      var c;
      let e;
      const r = z("div", `${N}-form-item`);
      this.configs.labelPosition === "left" ? r.addCss(`${N}-form-item--left`) : this.configs.labelPosition === "right" ? r.addCss(`${N}-form-item--right`) : this.configs.labelPosition === "top" && r.addCss(`${N}-form-item--top`);
      const i = z("label", `${N}-form-item__label`).html(
        this.configs.t(t.label)
      ), n = z("div", `${N}-form-item__content`), o = z("div", `${N}-form-item__error`);
      (c = t.component) != null && c._ && (t.component.setValue(this.form[t.prop]), t.component.on("change", (h) => {
        this.form[t.prop] = h;
      }), n.append(t.component._), t.component.render(), t.rules && (e = () => new Promise((h, l) => {
        t.rules.validator(t.component.getValue(), (a) => {
          if (a)
            throw console.log(a.message, this.configs.t(a.message)), n.addCss(`${N}-form-item__content--error`), o.html(this.configs.t(a.message)), l({ prop: t.prop, message: a.message }), new Error(a.message);
          n.removeCss(
            `${N}-form-item__content--error`
          ), o.textContent(""), h();
        });
      }), t.rules.required && i.addCss(`${N}-form-item__label--required`), t.component.on("blur", () => {
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
class Qe {
  constructor(t) {
    v(this, "carrier");
    v(this, "_", z("div"));
    v(this, "onRender", (t) => {
    });
    this.onRender = t || this.onRender;
  }
  setValue(t) {
    var e;
    typeof t != "number" && !t && (t = ""), (e = this.carrier) == null || e.value(String(t));
  }
  getValue() {
    var t;
    return (t = this.carrier) == null ? void 0 : t.value();
  }
  on(t, e) {
    var r;
    (r = this.carrier) == null || r.on(t, e);
  }
  render() {
    this.onRender(this);
  }
}
class mr extends Qe {
  constructor(e, r) {
    super();
    v(this, "configs", {});
    v(this, "carrier", z("input", `${N}-form-item--input`));
    v(this, "render", () => {
      this.configs.placeholder && this.carrier.attr("placeholder", this.configs.placeholder), this.configs.onRender && this.configs.onRender(this);
    });
    this.configs = r || {}, this._ = z("div", [`${N}-form-item--input_wrapper`, "form-item--container"]), this._.append(this.carrier), this.configs.suffix && (this._.addCss(`${N}-form-item--input_wrapper--suffix`), this._.append(
      z("div", `${N}-form-item--input_wrapper--suffix-container`).append(
        this.configs.suffix
      )
    )), e && this.setValue(e), this.render();
  }
}
class ar extends Qe {
  constructor(e, r) {
    super();
    v(this, "configs", {
      options: []
    });
    v(this, "carrier", z("div", [
      `${N}-form-item--input`,
      `${N}-form-item--select`
    ]));
    v(this, "optionContainer", z("div", "option-container"));
    v(this, "suffixContainer", z(
      "div",
      `${N}-form-item--input_wrapper--suffix-container`
    ).setStyles({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "20px",
      height: "18px"
    }));
    v(this, "clearIconVisible", !1);
    v(this, "value", "");
    v(this, "events", new cs());
    v(this, "render", () => {
      this.optionContainer._.innerHTML = "", this.optionContainer.append(
        ...this.configs.options.map((e) => {
          const r = z("div", "option-item");
          return r.on("click", () => {
            this.setValue(e.value), this.events.emit("change", [e.value]), this.renderValue();
          }), r._.setAttribute("value", e.value), r.append(e.label), r;
        })
      ), this.optionContainer.hide(), this.renderValue(), this.configs.onRender && this.configs.onRender(this);
    });
    v(this, "changeOptionVisibility", (e) => {
      e ? (this.events.emit("show"), this.optionContainer.show()) : (this.events.emit("hide"), this.optionContainer.hide());
    });
    r && (this.configs = r), this._ = z("div", [
      `${N}-form-item--input_wrapper`,
      `${N}-form-item--select_wrapper`,
      "form-item--container"
    ]), this._.addCss(`${N}-form-item--input_wrapper--suffix`), this._.append(this.carrier, this.suffixContainer, this.optionContainer), this._.on("click", () => {
      const i = () => {
        setTimeout(() => {
          this.changeOptionVisibility(), document.removeEventListener("click", i);
        }, 0);
      };
      this.optionContainer.isShow() ? this.suffixContainer.css("transform", "rotate(0)") : (this.changeOptionVisibility(!0), this.clearIconVisible || this.suffixContainer.css("transform", "rotate(180deg)"), setTimeout(() => {
        document.addEventListener("click", i);
      }, 0));
    }), this.renderSuffixIcon(), this.setValue(e), this.render();
  }
  setValue(e) {
    this.value = e;
  }
  getValue() {
    return this.value;
  }
  renderSuffixIcon(e) {
    this.clearIconVisible = !1, this.suffixContainer._.innerHTML = "";
    const r = new ls(e === "clearbtn" ? "close" : "chevron-down");
    e === "clearbtn" && (this.clearIconVisible = !0, r._.on("click", (i) => {
      this.renderSuffixIcon(), this.setValue(), this.renderValue(), this.events.emit("change"), this.events.emit("clear"), i.stopPropagation(), this.optionContainer.isShow() && this.optionContainer.hide();
    })), this.suffixContainer.append(r._);
  }
  renderValue() {
    if (this.value === void 0 || this.value === "" || this.value === null)
      this.carrier._.innerText = this.configs.placeholder || "", this.carrier.addCss("is-placeholder");
    else {
      const e = this.configs.options.find((r) => r.value === this.value);
      e ? this.carrier._.innerText = e.label : this.carrier._.innerText = String(this.value), this.configs.clearable && this.renderSuffixIcon("clearbtn"), this.carrier.removeCss("is-placeholder");
    }
  }
  on(e, r) {
    this.events.add(e, r);
  }
}
class Eo {
  constructor(t, e) {
    v(this, "formInstance");
    v(this, "formContainer", z("div"));
    v(this, "footer", z("div"));
    v(this, "dialog");
    v(this, "cellAreaDialog");
    v(this, "table");
    v(this, "t");
    v(this, "data", {
      cellRange: "",
      options: []
    });
    v(this, "configs");
    this.table = t, this.t = t._i18n.t, this.configs = e, this.cellAreaDialog = new Bo(this.table, {
      onBeforceCallback: () => (this.dialog.show(), !0),
      onSubmitCallback: (r) => {
        var i, n;
        (i = this.formInstance) == null || i.setValue({ cellRange: r }), (n = this.formInstance) == null || n.validate("cellRange"), this.dialog.close();
      }
    }), this.dialog = new vr([this.formContainer, this.footer], {
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
    this.formContainer.html(""), this.formInstance = new gr(
      {
        labelPosition: "top",
        fields: [
          {
            label: this.t("validators.cellRange"),
            prop: "cellRange",
            component: (() => {
              const t = new wt(new ls("border-all")._, "default", {
                noneBorder: !0,
                padding: "0",
                style: {
                  width: "31px",
                  height: "30px"
                },
                onClick: () => {
                  this.dialog.close(), this.cellAreaDialog.show("");
                }
              }), e = new mr("", {
                placeholder: this.t("validators.pleaseInputCellRange"),
                suffix: t._
              });
              return console.log(e._.css("padding-right", "0")), e;
            })(),
            rules: {
              required: !0,
              validator: this.cellAreaDialog.validator
            }
          },
          {
            label: this.t("validators.validatorType"),
            prop: "options",
            component: new Ao([], {
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
    const t = z("div").css("display", "flex").css("flex-direction", "row-reverse").append(
      (() => {
        const e = new wt(this.t("common.ok"), "primary", {
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
      new wt(this.t("common.cancel"), "default", {
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
class Bo {
  constructor(t, e) {
    v(this, "input");
    v(this, "form", z("div"));
    v(this, "footer", z("div"));
    v(this, "dialog");
    v(this, "table");
    v(this, "onBeforceCallback");
    v(this, "onSubmitCallback");
    v(this, "updateValue", (t) => {
      if (Array.isArray(t)) {
        const [e, r] = t;
        this.input.setValue(Q(r, e));
      } else
        console.log("update value", t), this.input.setValue(
          `${Q(t.startCol, t.startRow)}:${Q(t.endCol, t.endRow)}`
        );
    });
    v(this, "validator", (t, e) => {
      if (!t)
        return e(new Error(this.table._i18n.t("cellRangeDialog.unselectRange")));
      const r = t.split(":");
      if (r.length > 2 || !Ir(r[0]) || r[1] && !Ir(r[1]))
        return e(new Error(this.table._i18n.t("cellRangeDialog.formatError")));
      if (r.length === 2) {
        const i = it(r[0]), n = it(r[1]);
        if (i[0] > n[0] || i[1] > n[1])
          return e(new Error(this.table._i18n.t("cellRangeDialog.formatError")));
      }
      e();
    });
    this.table = t, this.input = new mr("", {
      placeholder: this.table._i18n.t("cellRangeDialog.placeholder")
    }), this.dialog = new vr([this.form, this.footer], {
      title: t._i18n.t("validators.selectCellRange"),
      width: "300px",
      draggable: !0,
      disableMask: !0,
      onBeforeClose: () => (this.table._emitter.off("selectorMove", this.updateValue), this.table._emitter.off("updateFocusRange", this.updateValue), this.onBeforceCallback())
    }), this.onBeforceCallback = e.onBeforceCallback ? e.onBeforceCallback : () => !0, this.onSubmitCallback = e.onSubmitCallback;
  }
  render() {
    this.input.configs.placeholder = this.table._i18n.t("cellRangeDialog.placeholder"), this.input.render(), this.form.html("");
    const t = new gr(
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
      z("div").css("display", "flex").css("flex-direction", "row-reverse").append(
        (() => {
          const e = new wt(this.table._i18n.t("common.ok"), "primary", {
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
        new wt(
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
class Ao extends Qe {
  constructor(e, r = {}) {
    super();
    v(this, "_", z("div", [
      `${N}-form-item--edit-select-container`,
      "form-item--container"
    ]));
    v(this, "listElement", z("div", `${N}-form-item--edit-select-list`));
    v(this, "editElement", z("div", `${N}-form-item--edit-select-input`));
    v(this, "editInputElement", new mr());
    v(this, "options", []);
    v(this, "configs", {});
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
      const i = z("div", "item-option"), n = z("input", "item-option-input");
      n.value(e);
      const o = z("span", "delete-icon");
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
class Do {
  constructor(t) {
    v(this, "table");
    v(this, "_contextElement");
    v(this, "hiddenOption", []);
    v(this, "_extendOptions", []);
    v(this, "validatorSelectDialogEvents");
    v(this, "options", () => [
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
                const r = await xo("image/*"), i = Yt.use().savePicture(r);
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
    v(this, "hide", (t) => {
      t.srcElement.className.includes("context-item--disabled") || t.srcElement.className.includes("context-item-tree") || t.srcElement.className.includes("divider") || setTimeout(() => {
        this._contextElement.css("display", "none"), window.removeEventListener("click", this.hide);
      }, 0);
    });
    v(this, "appendOption", (t) => {
      this._extendOptions.push(t);
    });
    v(this, "removeOption", (t) => {
      const e = this._extendOptions.findIndex((r) => !r.type && r.id === t);
      e !== -1 && this._extendOptions.splice(e, 1);
    });
    this.table = t, this.validatorSelectDialogEvents = {
      instance: new Eo(this.table, {
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
            const [n, o] = it(i[0]);
            r(o, n);
          } else {
            const [n, o] = it(i[0]), [c, h] = it(i[1]);
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
    }, this._contextElement = z("ul", `${N}-context-menu`), this._contextElement.hide(), this.table._container.append(this._contextElement);
  }
  async show(t) {
    this._contextElement.css("top", `${t.layerY + 5}px`), this._contextElement.css("left", `${t.layerX + 5}px`);
    const e = (a) => {
      if (a === void 0) return new Promise((u) => u(!1));
      if (typeof a == "boolean") return new Promise((u) => u(a));
      if (typeof a == "function") {
        const u = a(this.table);
        return Object.prototype.toString.call(u) === "[object Promise]" ? u : new Promise((f) => f(u));
      }
      return new Promise((u) => u(!1));
    };
    let r;
    typeof this.hiddenOption == "function" ? r = this.hiddenOption(this.table) : r = this.hiddenOption, this._contextElement.html("");
    let i = 0;
    const n = [...this.options(), ...this._extendOptions], o = async (a) => {
      const u = ["context-item"], f = await e(a.disable);
      a.type === "tree" && u.push("context-item-tree"), f && u.push("context-item--disabled");
      const x = z("li", u);
      if (a.type === "tree") {
        const d = z("div", "label-container").html(
          `<span class="label">${a.label}</span> <span class="arrow"><span class="icon arrow-right"></span> </span>`
        ), p = z("div", ["tree-list", `${N}-context-menu`]);
        for (const w of a.children)
          p.append(await o(w));
        let g = null;
        x.on("mouseenter", () => {
          g !== null && clearInterval(g), p.css("display", "block");
          const w = x._.getBoundingClientRect();
          document.body.clientWidth - w.right < p._.clientWidth && (p.css("left", "calc(-100%)"), p.css("margin-left", "-5px"));
        }), x.on("mouseleave", () => {
          g = window.setTimeout(() => {
            p.css("display", "none");
          }, 100);
        }), x.append(d, p);
      } else {
        const d = `<span class="label">${a.label}</span> <span class="shortcut">${a.shortcut || ""}</span>`;
        x.html(d);
      }
      return !f && a.action && x.on(
        "click",
        (d) => a.action(d, this.table)
      ), x;
    };
    for (const a of n)
      a.type === "div" ? i > 0 && (this._contextElement.append(z("div", "divider")), i = 0) : !await e(a.hidden) && !r.includes(a.id) && (this._contextElement.append(await o(a)), i++);
    this._contextElement.show();
    const c = this.table._width(), h = this.table._height(), l = this._contextElement.offset();
    t.layerY + l.height > h && this._contextElement.css("top", `${h - l.height - 20}px`), t.layerX + l.width > c && this._contextElement.css(
      "left",
      `${c - l.width - (c - t.layerX)}px`
    ), window.addEventListener("click", this.hide);
  }
}
const Fo = {
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
}, Ro = {
  cut: "剪切",
  copy: "复制",
  paste: "粘贴",
  undo: "撤销",
  redo: "恢复",
  onlyPasteValue: "仅粘贴内容",
  delete: "删除",
  printSheet: "打印",
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
  common: {
    ok: "确定",
    cancel: "取消"
  },
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
  },
  print: {
    letter: "信纸",
    legal: "法律专用纸"
  }
}, Nt = class Nt {
  constructor() {
    v(this, "_currentLang", "en");
    v(this, "changeCallbacks", []);
    v(this, "t", (t) => {
      let e = this._currentLang;
      return Nt.messages[e] || (console.error(`fail to use lang: ${this._currentLang}, auto use english`), e = "en"), this._deepValue(t, e);
    });
    return this;
  }
  _deepValue(t, e) {
    const r = t.split(".");
    let i = Nt.messages[e];
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
v(Nt, "messages", {
  en: Fo,
  zh: Ro
});
let fr = Nt;
class nt {
  constructor(t) {
    v(this, "table");
    v(this, "_");
    v(this, "_tooltip", null);
    v(this, "hidden", !1);
    v(this, "disabled", !1);
    this.table = t, this._ = z("div", "button-container");
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
      t instanceof Object && t.shortkey && (r += `<span style="margin-left: 5px; font-size: 12px">${t.shortkey}</span>`), r += "</div>", this._tooltip = z("div", "tooltips").html(r).css("position", "absolute").css("top", "40px").css("z-index", "999").css("background", "#fff").hide();
      let i = null;
      const n = typeof t == "string" ? void 0 : t.delay;
      this._.on("mouseenter", () => {
        i && clearTimeout(i), i = window.setTimeout(() => {
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
class Ft extends nt {
  constructor(e) {
    super(e);
    v(this, "table");
    this.table = e, this._.append(z("div", `${N}-hm-divider`).css("margin-left", "3px"));
  }
}
class So extends nt {
  constructor(e) {
    super(e);
    v(this, "table");
    v(this, "button");
    this.table = e, this.button = z("div", `${N}-hm-button`).append(
      z("div", `${N}-icon`).html('<div class="icon print"></div>')
    ), this._.append(this.button), this.button.on("click", (r) => this.action(r));
  }
  update() {
  }
  action(e) {
    this.disabled || this.table._events.eventTrigger("print");
  }
}
class ko extends nt {
  constructor(e) {
    super(e);
    v(this, "table");
    v(this, "button");
    this.table = e, this.button = z("div", `${N}-hm-button`).append(
      z("div", `${N}-icon`).html('<div class="icon undo"></div>')
    ), this._.append(this.button), this.button.on("click", (r) => this.action(r));
  }
  update() {
    this.disabled = !this.table._history.canUndo(), this.disabled ? this.button._.classList.add("disabled") : this.button._.classList.remove("disabled");
  }
  action(e) {
    this.disabled || this.table._events.eventTrigger("undo");
  }
}
class $o extends nt {
  constructor(e) {
    super(e);
    v(this, "table");
    v(this, "button");
    this.table = e, this.button = z("div", `${N}-hm-button`);
    const r = z("div", `${N}-icon`);
    r.html('<div class="icon redo"></div>'), this._.append(this.button.append(r)), this.button.on("click", (i) => this.action(i));
  }
  update() {
    this.disabled = !this.table._history.canRedo(), this.disabled ? this.button._.classList.add("disabled") : this.button._.classList.remove("disabled");
  }
  action(e) {
    this.disabled || this.table._events.eventTrigger("redo");
  }
}
class Ho extends nt {
  constructor(e) {
    super(e);
    v(this, "table");
    this.table = e;
    const r = z("div", `${N}-hm-button`), i = z("div", `${N}-icon`);
    i.html('<div class="icon paintformat"></div>'), this._.append(r.append(i)), r.on("click", (n) => this.action(n));
  }
  update() {
  }
  async action(e) {
    var r;
    this.table._selector && ((r = this.table._selector) == null || r.showCopy(), this.table._selector.paintFormatArea = this.table._selector._ranges[0]);
  }
}
class To extends nt {
  constructor(e) {
    super(e);
    v(this, "table");
    this.table = e;
    const r = z("div", `${N}-hm-button`), i = z("div", `${N}-icon`);
    i.html('<div class="icon clearformat"></div>'), this._.append(r.append(i)), r.on("click", (n) => this.action(n));
  }
  update() {
  }
  action(e) {
    this.table._events.eventTrigger("clearCell", "style"), this.table._events.eventTrigger("clearCell", "format");
  }
}
const ur = (s, t) => {
  const e = s.getBoundingClientRect(), r = {
    y: [e.top, e.top + e.height],
    x: [e.left, e.left + e.width]
  };
  return t.clientX >= r.x[0] && t.clientX <= r.x[1] && t.clientY >= r.y[0] && t.clientY <= r.y[1];
};
class Ut {
  constructor(t, e) {
    v(this, "_visible", !1);
    v(this, "disabled", !1);
    v(this, "_");
    v(this, "_labelElement");
    v(this, "_contentElement");
    // content
    v(this, "beforeShow", null);
    v(this, "onShow", null);
    v(this, "beforeHide", null);
    v(this, "onHide", null);
    v(this, "hide", async (t) => {
      var e;
      if (!((e = this._contentElement.firstChild) != null && e._ && t && ur(this._contentElement._, t)))
        try {
          this.beforeHide && await this.beforeHide(t), setTimeout(() => {
            this._labelElement.removeCss("active"), this._contentElement.hide(), window.removeEventListener("click", this.hide), window.removeEventListener("contextmenu", this.hide), this._visible = !1, this.onHide && this.onHide(t);
          }, 0);
        } catch {
        }
    });
    const r = [`${N}-dropdown-container`];
    this._ = z("div", r), this._labelElement = t, this._labelElement.on("click", (i) => {
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
const Pi = (s) => {
  if (s === void 0) return new Promise((t) => t(!1));
  if (typeof s == "boolean") return new Promise((t) => t(s));
  if (typeof s == "function") {
    const t = s();
    return Object.prototype.toString.call(t) === "[object Promise]" ? t : new Promise((e) => e(t));
  }
  return new Promise((t) => t(!1));
};
class Pt {
  constructor(t) {
    v(this, "disabled", !1);
    v(this, "value", null);
    v(this, "options", []);
    v(this, "_");
    v(this, "_dropDownElement");
    v(this, "customOption", null);
    v(this, "hide", (t) => this._dropDownElement.hide(t));
    this.options = t, this._dropDownElement = new Ut(
      z("span", [`${N}-hm-button`, `${N}-hm-dropdown`]),
      z("ul", "dropdown-list")
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
        t.push(z("li", "divider"));
      else if (typeof e == "object") {
        if (await Pi(e.hide)) continue;
        const i = ["dropdown-item"];
        await Pi(e.disabled) && i.push("disabled");
        const o = z("li", i);
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
        <span class="${N}-icon triangle-icon">
          <span class="icon arrow-down"></span>
        </span>
  `;
    this._dropDownElement._labelElement.html(r);
  }
}
var ze = { exports: {} }, Po = ze.exports, Ii;
function Io() {
  return Ii || (Ii = 1, function(s, t) {
    (function(e, r) {
      s.exports = r();
    })(Po, function() {
      var e = 1e3, r = 6e4, i = 36e5, n = "millisecond", o = "second", c = "minute", h = "hour", l = "day", a = "week", u = "month", f = "quarter", x = "year", d = "date", p = "Invalid Date", g = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, w = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, _ = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(F) {
        var S = ["th", "st", "nd", "rd"], H = F % 100;
        return "[" + F + (S[(H - 20) % 10] || S[H] || S[0]) + "]";
      } }, m = function(F, S, H) {
        var L = String(F);
        return !L || L.length >= S ? F : "" + Array(S + 1 - L.length).join(H) + F;
      }, C = { s: m, z: function(F) {
        var S = -F.utcOffset(), H = Math.abs(S), L = Math.floor(H / 60), k = H % 60;
        return (S <= 0 ? "+" : "-") + m(L, 2, "0") + ":" + m(k, 2, "0");
      }, m: function F(S, H) {
        if (S.date() < H.date()) return -F(H, S);
        var L = 12 * (H.year() - S.year()) + (H.month() - S.month()), k = S.clone().add(L, u), V = H - k < 0, W = S.clone().add(L + (V ? -1 : 1), u);
        return +(-(L + (H - k) / (V ? k - W : W - k)) || 0);
      }, a: function(F) {
        return F < 0 ? Math.ceil(F) || 0 : Math.floor(F);
      }, p: function(F) {
        return { M: u, y: x, w: a, d: l, D: d, h, m: c, s: o, ms: n, Q: f }[F] || String(F || "").toLowerCase().replace(/s$/, "");
      }, u: function(F) {
        return F === void 0;
      } }, b = "en", y = {};
      y[b] = _;
      var A = "$isDayjsObject", D = function(F) {
        return F instanceof P || !(!F || !F[A]);
      }, $ = function F(S, H, L) {
        var k;
        if (!S) return b;
        if (typeof S == "string") {
          var V = S.toLowerCase();
          y[V] && (k = V), H && (y[V] = H, k = V);
          var W = S.split("-");
          if (!k && W.length > 1) return F(W[0]);
        } else {
          var R = S.name;
          y[R] = S, k = R;
        }
        return !L && k && (b = k), k || !L && b;
      }, E = function(F, S) {
        if (D(F)) return F.clone();
        var H = typeof S == "object" ? S : {};
        return H.date = F, H.args = arguments, new P(H);
      }, B = C;
      B.l = $, B.i = D, B.w = function(F, S) {
        return E(F, { locale: S.$L, utc: S.$u, x: S.$x, $offset: S.$offset });
      };
      var P = function() {
        function F(H) {
          this.$L = $(H.locale, null, !0), this.parse(H), this.$x = this.$x || H.x || {}, this[A] = !0;
        }
        var S = F.prototype;
        return S.parse = function(H) {
          this.$d = function(L) {
            var k = L.date, V = L.utc;
            if (k === null) return /* @__PURE__ */ new Date(NaN);
            if (B.u(k)) return /* @__PURE__ */ new Date();
            if (k instanceof Date) return new Date(k);
            if (typeof k == "string" && !/Z$/i.test(k)) {
              var W = k.match(g);
              if (W) {
                var R = W[2] - 1 || 0, I = (W[7] || "0").substring(0, 3);
                return V ? new Date(Date.UTC(W[1], R, W[3] || 1, W[4] || 0, W[5] || 0, W[6] || 0, I)) : new Date(W[1], R, W[3] || 1, W[4] || 0, W[5] || 0, W[6] || 0, I);
              }
            }
            return new Date(k);
          }(H), this.init();
        }, S.init = function() {
          var H = this.$d;
          this.$y = H.getFullYear(), this.$M = H.getMonth(), this.$D = H.getDate(), this.$W = H.getDay(), this.$H = H.getHours(), this.$m = H.getMinutes(), this.$s = H.getSeconds(), this.$ms = H.getMilliseconds();
        }, S.$utils = function() {
          return B;
        }, S.isValid = function() {
          return this.$d.toString() !== p;
        }, S.isSame = function(H, L) {
          var k = E(H);
          return this.startOf(L) <= k && k <= this.endOf(L);
        }, S.isAfter = function(H, L) {
          return E(H) < this.startOf(L);
        }, S.isBefore = function(H, L) {
          return this.endOf(L) < E(H);
        }, S.$g = function(H, L, k) {
          return B.u(H) ? this[L] : this.set(k, H);
        }, S.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, S.valueOf = function() {
          return this.$d.getTime();
        }, S.startOf = function(H, L) {
          var k = this, V = !!B.u(L) || L, W = B.p(H), R = function(st, G) {
            var et = B.w(k.$u ? Date.UTC(k.$y, G, st) : new Date(k.$y, G, st), k);
            return V ? et : et.endOf(l);
          }, I = function(st, G) {
            return B.w(k.toDate()[st].apply(k.toDate("s"), (V ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(G)), k);
          }, O = this.$W, M = this.$M, Y = this.$D, U = "set" + (this.$u ? "UTC" : "");
          switch (W) {
            case x:
              return V ? R(1, 0) : R(31, 11);
            case u:
              return V ? R(1, M) : R(0, M + 1);
            case a:
              var Z = this.$locale().weekStart || 0, q = (O < Z ? O + 7 : O) - Z;
              return R(V ? Y - q : Y + (6 - q), M);
            case l:
            case d:
              return I(U + "Hours", 0);
            case h:
              return I(U + "Minutes", 1);
            case c:
              return I(U + "Seconds", 2);
            case o:
              return I(U + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, S.endOf = function(H) {
          return this.startOf(H, !1);
        }, S.$set = function(H, L) {
          var k, V = B.p(H), W = "set" + (this.$u ? "UTC" : ""), R = (k = {}, k[l] = W + "Date", k[d] = W + "Date", k[u] = W + "Month", k[x] = W + "FullYear", k[h] = W + "Hours", k[c] = W + "Minutes", k[o] = W + "Seconds", k[n] = W + "Milliseconds", k)[V], I = V === l ? this.$D + (L - this.$W) : L;
          if (V === u || V === x) {
            var O = this.clone().set(d, 1);
            O.$d[R](I), O.init(), this.$d = O.set(d, Math.min(this.$D, O.daysInMonth())).$d;
          } else R && this.$d[R](I);
          return this.init(), this;
        }, S.set = function(H, L) {
          return this.clone().$set(H, L);
        }, S.get = function(H) {
          return this[B.p(H)]();
        }, S.add = function(H, L) {
          var k, V = this;
          H = Number(H);
          var W = B.p(L), R = function(M) {
            var Y = E(V);
            return B.w(Y.date(Y.date() + Math.round(M * H)), V);
          };
          if (W === u) return this.set(u, this.$M + H);
          if (W === x) return this.set(x, this.$y + H);
          if (W === l) return R(1);
          if (W === a) return R(7);
          var I = (k = {}, k[c] = r, k[h] = i, k[o] = e, k)[W] || 1, O = this.$d.getTime() + H * I;
          return B.w(O, this);
        }, S.subtract = function(H, L) {
          return this.add(-1 * H, L);
        }, S.format = function(H) {
          var L = this, k = this.$locale();
          if (!this.isValid()) return k.invalidDate || p;
          var V = H || "YYYY-MM-DDTHH:mm:ssZ", W = B.z(this), R = this.$H, I = this.$m, O = this.$M, M = k.weekdays, Y = k.months, U = k.meridiem, Z = function(G, et, J, rt) {
            return G && (G[et] || G(L, V)) || J[et].slice(0, rt);
          }, q = function(G) {
            return B.s(R % 12 || 12, G, "0");
          }, st = U || function(G, et, J) {
            var rt = G < 12 ? "AM" : "PM";
            return J ? rt.toLowerCase() : rt;
          };
          return V.replace(w, function(G, et) {
            return et || function(J) {
              switch (J) {
                case "YY":
                  return String(L.$y).slice(-2);
                case "YYYY":
                  return B.s(L.$y, 4, "0");
                case "M":
                  return O + 1;
                case "MM":
                  return B.s(O + 1, 2, "0");
                case "MMM":
                  return Z(k.monthsShort, O, Y, 3);
                case "MMMM":
                  return Z(Y, O);
                case "D":
                  return L.$D;
                case "DD":
                  return B.s(L.$D, 2, "0");
                case "d":
                  return String(L.$W);
                case "dd":
                  return Z(k.weekdaysMin, L.$W, M, 2);
                case "ddd":
                  return Z(k.weekdaysShort, L.$W, M, 3);
                case "dddd":
                  return M[L.$W];
                case "H":
                  return String(R);
                case "HH":
                  return B.s(R, 2, "0");
                case "h":
                  return q(1);
                case "hh":
                  return q(2);
                case "a":
                  return st(R, I, !0);
                case "A":
                  return st(R, I, !1);
                case "m":
                  return String(I);
                case "mm":
                  return B.s(I, 2, "0");
                case "s":
                  return String(L.$s);
                case "ss":
                  return B.s(L.$s, 2, "0");
                case "SSS":
                  return B.s(L.$ms, 3, "0");
                case "Z":
                  return W;
              }
              return null;
            }(G) || W.replace(":", "");
          });
        }, S.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, S.diff = function(H, L, k) {
          var V, W = this, R = B.p(L), I = E(H), O = (I.utcOffset() - this.utcOffset()) * r, M = this - I, Y = function() {
            return B.m(W, I);
          };
          switch (R) {
            case x:
              V = Y() / 12;
              break;
            case u:
              V = Y();
              break;
            case f:
              V = Y() / 3;
              break;
            case a:
              V = (M - O) / 6048e5;
              break;
            case l:
              V = (M - O) / 864e5;
              break;
            case h:
              V = M / i;
              break;
            case c:
              V = M / r;
              break;
            case o:
              V = M / e;
              break;
            default:
              V = M;
          }
          return k ? V : B.a(V);
        }, S.daysInMonth = function() {
          return this.endOf(u).$D;
        }, S.$locale = function() {
          return y[this.$L];
        }, S.locale = function(H, L) {
          if (!H) return this.$L;
          var k = this.clone(), V = $(H, L, !0);
          return V && (k.$L = V), k;
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
      }(), T = P.prototype;
      return E.prototype = T, [["$ms", n], ["$s", o], ["$m", c], ["$H", h], ["$W", l], ["$M", u], ["$y", x], ["$D", d]].forEach(function(F) {
        T[F[1]] = function(S) {
          return this.$g(S, F[0], F[1]);
        };
      }), E.extend = function(F, S) {
        return F.$i || (F(S, P, E), F.$i = !0), E;
      }, E.locale = $, E.isDayjs = D, E.unix = function(F) {
        return E(1e3 * F);
      }, E.en = y[b], E.Ls = y, E.p = {}, E;
    });
  }(ze)), ze.exports;
}
var zo = Io();
const Vt = /* @__PURE__ */ Ji(zo);
class Mo extends nt {
  constructor(e) {
    super(e);
    v(this, "table");
    v(this, "_dropdown");
    v(this, "_visible", !1);
    this.table = e;
    const { t: r } = this.table._i18n;
    this._dropdown = new Pt([
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
        const o = z("div");
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
class Oo extends nt {
  constructor(e) {
    super(e);
    v(this, "table");
    v(this, "_dropdown");
    v(this, "_visible", !1);
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
    this._dropdown = new Pt(r), this._dropdown.value = "Arial", this._.append(this._dropdown._), this.render();
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
class Wo extends nt {
  constructor(e) {
    super(e);
    v(this, "table");
    v(this, "_dropdown");
    v(this, "_visible", !1);
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
    this._dropdown = new Pt(r), this._dropdown._dropDownElement._contentElement.css("max-height", "250px"), this._dropdown._dropDownElement._contentElement.css("overflow-y", "scroll"), this._dropdown.value = 10, this._.append(this._dropdown._), this.render();
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
class ft extends nt {
  constructor(e, r, i) {
    super(e);
    v(this, "table");
    v(this, "buttonType");
    v(this, "button");
    this.table = e, this.buttonType = r, this.button = z("div", `${N}-hm-button`);
    const n = z("div", `${N}-icon`);
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
class Cr {
  constructor(t, e) {
    v(this, "table");
    v(this, "_");
    v(this, "_fastColorElement");
    v(this, "_themeColorElement");
    v(this, "fastColor", "#000");
    v(this, "onChange", () => null);
    v(this, "themeColors", [
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
    this.table = e, this._ = z("div"), this._.addCss(`${N}-color-picker`), this._fastColorElement = z("div"), this._fastColorElement.addCss("fast-color"), this._fastColorElement.on("click", () => {
      this.onChange(this.fastColor);
    }), this._.append(this._fastColorElement), this._themeColorElement = z("div"), this._themeColorElement.addCss("theme-color"), this._.append(this._themeColorElement), this.renderThemeColorElement(), this.updateFastColorElement(), t && t.append(this._);
  }
  renderThemeColorElement() {
    var r;
    this._themeColorElement.html("");
    const t = z("div");
    t.addCss("title"), t.html(`${((r = this.table) == null ? void 0 : r._i18n.t("theme_color")) || "Theme Colors"}`), t.css("font-weight", "bold"), this._themeColorElement.append(t);
    const e = z("table");
    e.addCss("body");
    for (let i = 0; i < this.themeColors[0].length; i++) {
      const n = z("tr");
      for (let o = 0; o < this.themeColors.length; o++) {
        const h = this.themeColors[o][i], l = this.createColorCube(h);
        l.css("padding", "2px");
        const a = z("td");
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
    const e = z("span").html(this.fastColor);
    e.css("padding", "0 0 0 10px"), this._fastColorElement.append(e);
  }
  createColorCube(t) {
    const e = z("div");
    return e.addCss("color-cube"), e.css("width", "16px"), e.css("height", "16px"), e.css("background", t), e;
  }
}
class Lo extends nt {
  constructor(e) {
    var r;
    super(e);
    v(this, "table");
    v(this, "_dropdown");
    v(this, "_colorPicker");
    v(this, "_visible", !1);
    this.table = e, this._colorPicker = new Cr(void 0, e), this._colorPicker.onChange = (i) => {
      this.changeColor(i);
    }, this._dropdown = new Ut(this.generateButton("color"), this._colorPicker._), this._colorPicker.fastColor = this.table._data.style.color, (r = this._dropdown._labelElement.firstChild) == null || r.css(
      "border-bottom",
      `3px solid ${this.table._data.style.color}`
    ), this._dropdown._.css("margin-left", "2px"), this._.append(this._dropdown._), this.render();
  }
  generateButton(e) {
    const r = z("div", `${N}-hm-button`), i = z("div", `${N}-icon`);
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
class Vo extends nt {
  constructor(e) {
    var r;
    super(e);
    v(this, "table");
    v(this, "_dropdown");
    v(this, "_colorPicker");
    v(this, "_visible", !1);
    this.table = e, this._colorPicker = new Cr(void 0, e), this._colorPicker.onChange = (i) => {
      this.changeColor(i);
    }, this._dropdown = new Ut(this.generateButton("bgcolor"), this._colorPicker._), (r = this._dropdown._labelElement.firstChild) == null || r.css("border-bottom", "3px solid #fff"), this._dropdown._.css("margin-left", "2px"), this._.append(this._dropdown._), this.render();
  }
  generateButton(e) {
    const r = z("div", `${N}-hm-button`), i = z("div", `${N}-icon`);
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
function qe(s) {
  const t = z("div", `${N}-hm-button`), e = z("div", `${N}-icon`);
  return e.html(`<div class="icon ${s || ""}"></div>`), t.append(e), t;
}
class No extends nt {
  constructor(e) {
    super(e);
    v(this, "table");
    v(this, "_dropdown");
    v(this, "_ctx");
    v(this, "_line");
    v(this, "_visible", !1);
    this.table = e, this._ctx = new qo(this.table), this._line = new jo(this.table), this._dropdown = new Ut(qe("border-all"), this.generateContent()), this._dropdown._.css("margin-left", "2px"), this._.append(this._dropdown._), this._dropdown.beforeHide = (r) => {
      if (r && (ur(this._ctx._dropdown._contentElement._, r) || ur(
        this._line._dropdown._dropDownElement._contentElement._,
        r
      )))
        throw new Error("Stop hide");
    }, this.render();
  }
  generateContent() {
    const e = z("div"), r = z("div");
    r.css("display", "flex"), r.css("padding", "5px"), r.css("justify-content", "space-between");
    const i = z("table");
    [
      ["all", "inside", "horizontal", "vertical", "outside"],
      ["left", "top", "right", "bottom", "none"]
    ].forEach((c) => {
      const h = z("tr");
      c.forEach((l) => {
        const a = z("td").append(qe(`border-${l}`));
        a.on("click", () => {
          this.setBorderStyle(l);
        }), h.append(a);
      }), i.append(h);
    }), r.append(i), i.addCss(`${N}-hm-divider-line`);
    const o = z("div");
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
class qo {
  constructor(t) {
    v(this, "table");
    v(this, "_");
    v(this, "_dropdown");
    v(this, "_colorPicker");
    v(this, "_btn", qe("line-color"));
    this.table = t, this._colorPicker = new Cr(void 0, this.table), this._dropdown = new Ut(this._btn, this._colorPicker._), this._dropdown._contentElement.css("left", "103%"), this._dropdown._contentElement.css("top", "-5px"), this._ = this._dropdown._, this.updateButton(), this._colorPicker.onChange = (e) => {
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
class jo {
  constructor(t) {
    v(this, "table");
    v(this, "_");
    v(this, "_dropdown");
    v(this, "_btn", qe("line-type"));
    v(this, "lines", ["thin", "medium", "thick", "dashed", "dotted"]);
    this.table = t, this._dropdown = new Pt(
      this.lines.map((e) => ({
        label: e,
        value: e,
        action: (r) => {
          this.updateButton(e);
        }
      }))
    ), this._dropdown._dropDownElement._labelElement.css("padding-left", "0"), this._dropdown.render = () => {
      this._dropdown._dropDownElement._labelElement.html(
        `<div class="${N}-icon">
          <div class="icon line-type"></div>
        </div>`
      );
    }, this._dropdown.customOption = (e) => {
      const r = z("div");
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
class Yo extends nt {
  constructor(e) {
    super(e);
    v(this, "table");
    v(this, "_dropdown");
    v(this, "_visible", !1);
    v(this, "render", () => {
      this._dropdown._dropDownElement._labelElement.html(
        `<div class="${N}-icon">
        <div class="icon align-${this._dropdown.value || "left"}"></div>
      </div>
       <span class="${N}-icon triangle-icon" style="margin-left: -4px">
          <span class="icon arrow-down"></span>
        </span>
      `
      );
    });
    v(this, "renderOption", (e, r) => e !== "divider" ? (r.css("padding", "0 7px"), this.generateButton(`align-${e.value}`)) : z("div"));
    v(this, "changeTextAlign", (e) => {
      this.table._events.eventTrigger("setStyle", { align: e });
    });
    this.table = e, this._dropdown = new Pt([
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
    const r = z("div", [`${N}-hm-button`, "transparent_hover_color"]), i = z("div", `${N}-icon`);
    return i.html(`<div class="icon ${e || ""}"></div>`), r.append(i), r;
  }
  update() {
    var n, o;
    if (!((n = this.table._selector) != null && n._focus) || !((o = this.table._selector) != null && o._focusRange)) return;
    const { startRow: e, startCol: r } = this.table._selector._focusRange, i = this.table.getStyle(e, r, !0);
    this._dropdown.value = i.align || "left", this._dropdown.render();
  }
}
class Uo extends nt {
  constructor(e) {
    super(e);
    v(this, "table");
    v(this, "_dropdown");
    v(this, "_visible", !1);
    v(this, "render", () => {
      this._dropdown._dropDownElement._labelElement.html(
        `<div class="${N}-icon">
        <div class="icon align-${this._dropdown.value || "left"}"></div>
      </div>
       <span class="${N}-icon triangle-icon" style="margin-left: -4px">
          <span class="icon arrow-down"></span>
        </span>
      `
      );
    });
    v(this, "renderOption", (e, r) => e !== "divider" ? (r.css("padding", "0 7px"), this.generateButton(`align-${e.value}`)) : z("div"));
    v(this, "changeTextAlign", (e) => {
      this.table._events.eventTrigger("setStyle", { valign: e });
    });
    this.table = e, this._dropdown = new Pt([
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
    const r = z("div", [`${N}-hm-button`, "transparent_hover_color"]), i = z("div", `${N}-icon`);
    return i.html(`<div class="icon ${e || ""}"></div>`), r.append(i), r;
  }
  update() {
    var n, o;
    if (!((n = this.table._selector) != null && n._focus) || !((o = this.table._selector) != null && o._focusRange)) return;
    const { startRow: e, startCol: r } = this.table._selector._focusRange, i = this.table.getStyle(e, r, !0);
    this._dropdown.value = i.valign || this.table._data.style.valign, this._dropdown.render();
  }
}
function Xo(s) {
  const { t } = s._i18n;
  return [
    new ko(s).tooltip({ title: t("undo"), shortkey: "(Ctrl + Z)" }),
    new $o(s).tooltip({ title: t("redo"), shortkey: "(Ctrl + Y)" }),
    new So(s).tooltip({ title: t("printSheet"), shortkey: "(Ctrl + P)" }),
    new Ho(s).tooltip(t("paintformat")),
    new To(s).tooltip(t("clearformat")),
    new Ft(s),
    new Mo(s).tooltip(t("valueformat")),
    new ft(s, "increase-dicimal", (e) => {
      var r;
      (r = e._) == null || r.hide();
    }).tooltip(t("increase_dicimal")),
    new ft(s, "reduce-dicimal", (e) => {
      var r;
      (r = e._) == null || r.hide();
    }).tooltip(t("reduce_dicimal")),
    new Ft(s),
    new Oo(s).tooltip(t("fontFamily")),
    new Wo(s).tooltip(t("fontSize")),
    new Ft(s),
    new ft(s, "font-bold").tooltip({
      title: t("fontBold"),
      shortkey: "(Ctrl + B)"
    }),
    new ft(s, "font-italic").tooltip({
      title: t("fontItalic"),
      shortkey: "(Ctrl + I)"
    }),
    new ft(s, "strike").tooltip(t("fontStrike")),
    new ft(s, "underline").tooltip({
      title: t("fontUnderline"),
      shortkey: "(Ctrl + U)"
    }),
    new Lo(s).tooltip(t("fontColor")),
    new Ft(s),
    new Vo(s).tooltip(t("bgColor")),
    new No(s).tooltip(t("border")),
    new ft(s, "merge", (e) => {
      var r;
      (r = e._) == null || r.css("margin-left", "2px");
    }).tooltip(t("mergeCell")),
    new Ft(s),
    new Yo(s).tooltip(t("fontAlign")),
    new Uo(s).tooltip(t("fontVerticalAlign")),
    new ft(s, "textwrap", (e) => {
      var r;
      (r = e._) == null || r.css("margin-left", "3px");
    }).tooltip(t("fontAutoWrap")),
    new Ft(s),
    new ft(s, "freeze", (e) => {
      var r;
      (r = e._) == null || r.css("margin-left", "3px");
    }).tooltip(t("freezeCell"))
  ];
}
class Ko {
  constructor(t) {
    v(this, "table");
    v(this, "_headMenuElement");
    v(this, "height", 40);
    v(this, "options", []);
    this.table = t, this._headMenuElement = z("div", `${N}-head-menu`), this._headMenuElement.css({
      height: `${this.height}px`
    }), this.init(), this.table._i18n.onChange(() => {
      this.init();
    });
  }
  async init() {
    this._headMenuElement.html(""), this.options = Xo(this.table);
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
function Go(s, t = 10, e) {
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
const Zo = (s, t) => {
  s.formatter((e, r, i, n) => {
    if (n === "normal" || n === "text" || !n || i === void 0) return i;
    if (n === "number" && !Number.isNaN(Number(i))) {
      let o = 2;
      e.fixed !== void 0 && (o = e.fixed), i = Number(i).toFixed(o);
    } else if (n === "scientific" && !Number.isNaN(Number(i))) {
      let o = 2;
      e.fixed !== void 0 && (o = e.fixed), i = Go(i, 10, o);
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
}, xr = () => /Firefox/.test(window.navigator.userAgent), Qo = [
  { size: [215.9, 279.4], label: "print.letter", code: "letter" },
  { size: [279.4, 431.8], code: "tabloid" },
  { size: [215.9, 355.6], label: "print.legal", code: "legal" },
  { size: [139.7, 215.9], code: "statement" },
  { size: [184.1, 266.7], code: "executive" },
  { size: [297, 420], code: "A3" },
  { size: [210, 297], code: "A4" },
  { size: [148, 210], code: "A5" },
  { size: [257, 364], label: "B4 (JIS)", code: "B4" },
  { size: [182, 257], label: "B5 (JIS)", code: "B5" }
], Jo = (s) => s.charAt(0).toUpperCase() + s.slice(1), hs = () => xr() ? [12, 12, 12, 12] : [10, 10, 10, 10];
class ta extends Qe {
  constructor(e) {
    super();
    v(this, "configs", {});
    v(this, "carrier", z("div", [`${N}-form-item--input`]));
    v(this, "value", hs());
    v(this, "events", new cs());
    v(this, "render", () => {
    });
    this._ = z("div", ["form-item--container", `${N}-custom-input-number`]), this._.setStyles({
      position: "relative",
      padding: "30px 60px"
    });
    const r = z("div", ["paper-card", "border-darker"]);
    r._.innerHTML = '<span class="color-info" style="text-align: center">Page</span>', r.setStyles({
      width: "100px",
      height: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto"
    }), this._.append(r);
    for (let i = 0; i < 4; i++) {
      const n = z("input", [`${N}-form-item--input`]);
      n.setStyles({
        position: "absolute",
        width: "40px",
        textAlign: "center"
      }), n._.setAttribute("type", "number"), n.value(this.value[i].toString()), n.on("blur", () => {
        this.value[i] = Number(n.value()), this.value[i] < 0 && (n.value("0"), this.value[i] = 0), this.events.emit("change", [this.value, i]);
      }), i === 0 ? (n.setStyles({
        top: 0,
        left: "50%",
        transform: "translateX(-50%)"
      }), n.attr("placeholder", "top")) : i === 1 ? (n.setStyles({
        top: "50%",
        right: 0,
        transform: "translateY(-50%)"
      }), n.attr("placeholder", "right")) : i === 2 ? (n.setStyles({
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)"
      }), n.attr("placeholder", "bottom")) : i === 3 && (n.setStyles({
        top: "50%",
        left: 0,
        transform: "translateY(-50%)"
      }), n.attr("placeholder", "left")), this._.append(n);
    }
    this._.addCss(`${N}-form-item--input_wrapper--suffix`), this._.append(this.carrier), e && this.setValue(e), this.render();
  }
  setValue(e) {
    this.value = e;
  }
  getValue() {
    return this.value;
  }
  on(e, r) {
    this.events.add(e, r);
  }
}
class ea {
  constructor(t) {
    v(this, "papers", Qo.map((t) => ({
      ...t,
      label: t.label || Jo(t.code)
    })));
    v(this, "currentPaper");
    // MmPx: number = this.getPXEveryMM() // 每毫米的对应的像素值
    v(this, "dpi", this.getDeviceDPI());
    v(this, "table");
    v(this, "dialog");
    this.table = t, this.dialog = new vr([], {
      width: "fit-content",
      draggable: !0
    }), this.dialog.containerHeader.hide(), this.dialog.containerFooter.hide(), this.dialog.container.css("padding", "0");
  }
  getPaperByCode(t) {
    let e = this.papers.find((r) => r.code === t);
    return e || (e = this.papers.find((r) => r.code === "A4"), console.error(`Paper ${t} not found`)), e;
  }
  getDeviceDPI() {
    const t = document.createElement("div");
    t.style.width = "1in", t.style.visibility = "hidden", document.body.appendChild(t);
    const e = t.offsetWidth;
    return document.body.removeChild(t), e;
  }
  transferMMToPX(t) {
    return Math.ceil(t * this.dpi / 25.4);
  }
  transferPXToMM(t) {
    return t * 25.4 / this.dpi;
  }
  // transform move method
  renderPapaer() {
    var a, u;
    if (!this.currentPaper) return;
    this.dialog.updateConfig({
      title: ((a = this.currentPaper) == null ? void 0 : a.label) || "",
      width: "80vw",
      height: "90vh"
    }), this.dialog.containerBody.css("height", "100%");
    const t = {
      renderMode: "normal",
      paper: (u = this.currentPaper) == null ? void 0 : u.code,
      padding: hs(),
      direction: "portrait"
    }, r = ((f) => {
      const x = new gr(
        {
          fields: [
            {
              label: "渲染模式",
              prop: "renderMode",
              component: (() => {
                const d = new ar("", {
                  placeholder: "请选择渲染模式",
                  clearable: !0,
                  options: [
                    {
                      label: "基础模式",
                      value: "normal"
                    },
                    {
                      label: "兼容模式",
                      value: "compat"
                    }
                  ]
                });
                return d.on("change", (p) => {
                  t.renderMode = p, c();
                }), d;
              })()
            },
            {
              label: "纸张尺寸",
              prop: "paper",
              component: (() => {
                const d = new ar("", {
                  placeholder: "请选择纸张尺寸",
                  clearable: !0,
                  options: this.papers.map((p) => ({
                    label: this.table._i18n.t(p.label) || p.code,
                    value: p.code
                  }))
                });
                return d.on("change", (p) => {
                  t.paper = p, this.currentPaper = this.getPaperByCode(p), c();
                }), d;
              })()
            },
            {
              label: "方向",
              prop: "direction",
              component: (() => {
                const d = new ar("", {
                  placeholder: "请选择方向",
                  clearable: !0,
                  options: [
                    {
                      label: "纵向",
                      value: "portrait"
                    },
                    {
                      label: "横向",
                      value: "landscape"
                    }
                  ]
                });
                return d.on("change", (p) => {
                  t.direction = p, c();
                }), d;
              })()
            },
            {
              label: "边距 (mm)",
              prop: "padding",
              component: (() => {
                const d = new ta();
                return d.on(
                  "change",
                  (p, g) => {
                    t.padding = p, c();
                  }
                ), d;
              })()
            }
          ]
        },
        f
      );
      return x._.setStyles({
        padding: "10px",
        flex: 1
      }), x;
    })(t), i = new wt(this.table._i18n.t("printSheet"), "primary"), n = new wt(this.table._i18n.t("common.cancel"), "default");
    n._.css("margin-right", "10px"), n._.on("click", () => {
      this.dialog.close();
    });
    const o = z("div").css({
      height: "100%",
      flex: 1,
      background: "#dadce0",
      overflow: "auto",
      boxSizing: "border-box"
    }), c = () => {
      var P;
      o._.innerHTML = "";
      let f, x;
      t.direction === "portrait" ? [f, x] = this.currentPaper.size : [x, f] = this.currentPaper.size, console.log(
        `paper is: ${(P = this.currentPaper) == null ? void 0 : P.code}, direction: ${t.direction}, width: ${f}, height: ${x}`
      );
      const [d, p, g, w] = t.padding, _ = new DOMParser(), m = this.table.toHtml(`A1:${Q(...this.table.getMaxArea())}`), b = _.parseFromString(m, "text/html").body.firstChild, y = (T) => {
        const F = z("div", "paper");
        F.setStyles({
          width: `${this.transferMMToPX(f)}px`,
          height: `${this.transferMMToPX(x)}px`,
          paddingTop: `${this.transferMMToPX(d)}px`,
          paddingRight: `${this.transferMMToPX(p)}px`,
          paddingBottom: `${this.transferMMToPX(g)}px`,
          paddingLeft: `${this.transferMMToPX(w)}px`,
          boxSizing: "border-box",
          margin: "20px auto",
          background: "#fff"
        });
        const S = z("div", "paper-content");
        return S.setStyles({
          width: `${this.transferMMToPX(f - w - p)}px`,
          height: `${this.transferMMToPX(x - d - g)}px`,
          // border: '1pt solid red',
          boxSizing: "border-box",
          overflow: "hidden",
          position: "relative"
        }), S.append(T), F.append(S), F;
      }, A = this.transferMMToPX(f - w - p), D = this.transferMMToPX(x - d - g), $ = [], E = () => {
        const T = [];
        b.querySelectorAll("colgroup col").forEach((k) => {
          const V = Number(k.getAttribute("width"));
          T.push(Number.isNaN(V) ? 100 : V);
        });
        const F = b.querySelectorAll("tr");
        let S = 0, H = D, L = 0;
        F.forEach((k, V) => {
          let W = 0;
          const R = Number(k.style.height.replaceAll("px", ""));
          H < R && (L = V, S++, H = D), $[S] || ($[S] = []);
          const I = k.querySelectorAll("td");
          let O = A, M = 0;
          I.forEach((Y, U) => {
            const Z = T[U];
            if (O < Z) {
              const J = $[S][W];
              (J == null ? void 0 : J.dom) && (O = A), M = U, W++;
            }
            let q = $[S][W];
            if (!q) {
              const J = document.createElement("table");
              J.style.borderSpacing = "0", J.style.borderCollapse = "collapse", $[S][W] = {
                colWidths: [],
                dom: J
              }, q = $[S][W];
            }
            const st = q == null ? void 0 : q.dom;
            let G = st.querySelector("tbody");
            G || (G = document.createElement("tbody"), st.appendChild(G));
            let et = G.querySelectorAll("tr")[V - L];
            et || (et = k.cloneNode(), G.appendChild(et)), q.colWidths[U - M] || (q.colWidths[U - M] = Z), et.appendChild(Y.cloneNode(!0)), O -= Z;
          }), H -= R;
        }), $.flat().forEach((k) => {
          const V = document.createElement("colgroup");
          k.colWidths.forEach((R) => {
            const I = document.createElement("col");
            I.setAttribute("width", `${R}`), V.appendChild(I);
          }), k.dom.appendChild(V);
          const W = y(k.dom);
          o.append(W);
        });
      }, B = () => {
        let T = 0;
        const F = [{ x: 0, width: 0 }];
        b.querySelectorAll("colgroup col").forEach((k) => {
          const V = F[F.length - 1], W = Number(k.getAttribute("width")), R = Number.isNaN(W) ? 100 : W;
          T += R, A - V.width >= R ? V.width += R : F.push({ x: V.x + V.width, width: R });
        }), b.style.width = `${T}px`;
        const S = [{ y: 0, height: 0 }];
        b.querySelectorAll("tr").forEach((k, V) => {
          const W = S[S.length - 1], R = Number(k.style.height.replaceAll("px", ""));
          D - W.height >= R ? W.height += R : S.push({ y: W.y + W.height, height: R });
        });
        const L = [];
        S.forEach((k) => {
          F.forEach((V) => {
            L.push({
              ...V,
              ...k
            });
          });
        }), L.forEach((k, V) => {
          const W = b.cloneNode(!0);
          W.style.position = "absolute", W.style.left = `${k.x * -1 + (k.x !== 0 ? 1 : 0)}px`, W.style.top = `${k.y * -1}px`;
          const R = z("div");
          R.setStyles({
            position: "relative",
            width: `${k.width + (k.x !== 0 ? 1 : 0)}px`,
            height: `${k.height + 1}px`,
            boxSizing: "border-box",
            overflow: "hidden"
          }), R.append(W);
          const I = y(R._);
          o.append(I);
        });
      };
      t.renderMode === "compat" ? B() : E();
    }, h = z("div").setStyles({
      width: "250px",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }).append(
      r._,
      z("div").setStyles({ display: "flex", flexDirection: "row-reverse", padding: "10px" }).append(i._, n._)
    ), l = z("div").css("height", "100%").css("display", "flex").append(o, h);
    this.dialog.containerBody._.innerHTML = "", this.dialog.containerBody.append(l), i._.on("click", () => {
      const f = document.createElement("div"), x = o._.children;
      for (let d = 0; d < x.length; d++) {
        const p = x.item(d);
        if (p != null && p.firstChild) {
          const g = p.firstChild.cloneNode(!0);
          f.appendChild(g);
        }
      }
      this.printDOM(f, {
        direction: t.direction,
        paper: t.paper
      });
    }), c(), this.dialog.show();
  }
  printDOM(t, e) {
    const r = document.createElement("IFRAME");
    r.setAttribute("id", "print-iframe"), xr() && (r.src = "about:"), document.body.append(r), r.width = "1600px", r.height = "800px";
    const i = r.contentDocument;
    i.head.innerHTML = `<style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box !important;
        }
        .paper-content+.paper-content {
            margin-top: 1px;
        }
        @page {
            size: ${e.paper} ${e.direction};
            padding: 0;
        }
</style>`, i.body.appendChild(t.cloneNode(!0)), i.close(), r.contentWindow.focus(), xr() ? setTimeout(() => {
      r.contentWindow.print();
    }, 50) : r.contentWindow.print(), setTimeout(() => {
      document.body.removeChild(r);
    }, 200);
  }
  print() {
    this.currentPaper || (this.currentPaper = this.getPaperByCode("A4")), this.renderPapaer();
  }
}
class je {
  constructor(t, e, r, i) {
    // renderer options
    v(this, "_rendererOptions", {});
    v(this, "_copyable", !1);
    v(this, "_editable", !1);
    v(this, "_minRowHeight", 25);
    v(this, "_minColWidth", 60);
    v(this, "_width");
    v(this, "_height");
    // cache for rect of content
    v(this, "_contentRect", { x: 0, y: 0, width: 0, height: 0 });
    v(this, "_headMenu", null);
    v(this, "_container");
    v(this, "_Layer");
    v(this, "_data");
    v(this, "_renderer");
    v(this, "_cells", new $s());
    // scrollbar
    v(this, "_vScrollbar", null);
    v(this, "_hScrollbar", null);
    // resizer
    v(this, "_rowResizer", null);
    v(this, "_colResizer", null);
    // editor ? extends Editor
    v(this, "_editor", null);
    v(this, "_editors", /* @__PURE__ */ new Map());
    v(this, "_selector", null);
    v(this, "_overlayer");
    v(this, "_canvas");
    // event emitter
    v(this, "_emitter", new bn());
    v(this, "_events");
    v(this, "_history");
    v(this, "_contextMenu");
    v(this, "_i18n");
    v(this, "_printer");
    const n = typeof t == "string" ? document.querySelector(t) : t;
    if (n === null) throw new Error("first argument error");
    if (this._i18n = new fr(), this._data = js(), this._Layer = z(n, `${N}-layer`).css({
      height: `${r()}px`,
      width: `${e()}px`
    }), i != null && i.hideHeadMenu || (this._headMenu = new Ko(this), this._Layer.append(this._headMenu._headMenuElement)), this._width = e, this._height = () => {
      var c;
      return r() - (((c = this._headMenu) == null ? void 0 : c.height) || 0);
    }, this._container = z("div", `${N}-container`).css({
      height: `${this._height()}px`,
      width: `${e()}px`
    }), this._Layer.append(this._container), i) {
      const { minColWidth: c, minRowHeight: h, renderer: l, data: a } = i;
      if (c && (this._minColWidth = c), h && (this._minRowHeight = h), l && (this._rendererOptions = l), a) {
        const { cols: u, rows: f, rowHeight: x, colWidth: d } = a, { _data: p } = this;
        u && (p.cols.len = u), f && (p.rows.len = f), x && (p.rowHeight = x), d && (p.colWidth = d);
      }
    }
    const o = document.createElement("canvas");
    this._canvas = z(o).attr("tabIndex", "1"), this._container.append(o), this._renderer = new Ze(o, e(), this._height()), this._overlayer = new Ds(this._container), Ye(this), i != null && i.selectable && j.init(this), i != null && i.scrollable && Tt.init(this), i != null && i.resizable && ao.init(this), i != null && i.editable && (this._editable = !0), this._copyable = (i == null ? void 0 : i.copyable) || !1, this._events = new fo(this), this._history = new uo(), this._contextMenu = new Do(this), this._printer = new ea(this), Zo(this._cells);
  }
  contentRect() {
    return this._contentRect;
  }
  container() {
    return this._container;
  }
  resize() {
    this._container.css({ height: `${this._height()}px`, width: `${this._width()}px` }), this._renderer.width(this._width()), this._renderer.height(this._height()), this.render();
  }
  freeze(t) {
    return this._data.freeze = t, this;
  }
  isMerged(t) {
    if (t) return zr(this._data, t);
    {
      const { _selector: e } = this;
      if (e)
        return e._ranges.every((r) => zr(this._data, r.toString()));
    }
    return !1;
  }
  merge(t) {
    if (t) Mr(this._data, t);
    else {
      const { _selector: e } = this;
      e && e._ranges.forEach((r) => Mr(this._data, r.toString()));
    }
    return this;
  }
  unmerge(t) {
    if (t) cr(this._data, t);
    else {
      const { _selector: e } = this;
      e && e._ranges.forEach((r) => cr(this._data, r.toString()));
    }
    return this;
  }
  row(t, e) {
    return e ? (e.height && this.rowHeight(t, e.height), St(this._data, t, e), this) : St(this._data, t);
  }
  rowHeight(t, e, r) {
    const i = We(this._data, t);
    return e ? (i !== e && (We(this._data, t, e, r), this._contentRect.height += e - i), this) : i;
  }
  rowsHeight(t, e) {
    return Yi(this._data, t, e);
  }
  isLastRow(t) {
    return Vs(this._data, t);
  }
  col(t, e) {
    return e ? (e.width && this.colWidth(t, e.width), Rt(this._data, t, e), this) : Rt(this._data, t);
  }
  colWidth(t, e) {
    const r = Me(this._data, t);
    return e ? (r !== e && (Me(this._data, t, e), this._contentRect.width += e - r), this) : r;
  }
  colsWidth(t, e) {
    return qi(this._data, t, e);
  }
  isLastCol(t) {
    return Ls(this._data, t);
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
    return r !== -1 ? ir(this._data, r, !1) : null;
  }
  getStyle(t, e, r) {
    const i = this.getStyleIndex(t, e);
    return i !== -1 ? ir(this._data, i, !!r) : this._data.style;
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
    return ir(this._data, t, e);
  }
  addStyle(t) {
    return Vi(this._data, t, this);
  }
  updateStyle(t, e) {
    return Ps(this._data, t, e);
  }
  clearStyles() {
    return Is(this._data), this;
  }
  addBorder(...t) {
    return zs(this._data, t), this;
  }
  clearBorder(t) {
    return Ms(this._data, t), this;
  }
  clearBorders() {
    return Os(this._data), this;
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
    return Oi(this.cell(t, e));
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
    e.scrollRows(t.scroll[0]).scrollCols(t.scroll[1]).merges(t.merges).freeze(t.freeze || "A1").styles(t.styles).borders(t.borders).rows(t.rows.len).cols(t.cols.len).row((o) => St(t, o)).col((o) => Rt(t, o)).cell((o, c) => this.cell(o, c)).formatter(this._cells._formatter).render();
    const { viewport: i } = e;
    if (i && (i.areas.forEach((o, c) => {
      r.area(c, o);
    }), i.headerAreas.forEach((o, c) => {
      r.headerArea(c, o);
    }), Tt.resize(this)), this._renderer._activeRowHeight) {
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
      range: typeof n == "string" ? X.with(n) : n,
      cells: o._cells,
      data: o._data
    }), i = (n) => {
      const { _selector: o } = n;
      if (!o) return null;
      const c = o.currentRange;
      return c === void 0 ? null : r(c, n);
    };
    return Ns(
      i(this),
      t instanceof je ? i(t) : r(t, this),
      e
    ), this;
  }
  fill(t, e) {
    const { _selector: r } = this;
    let [i, n] = [0, 0];
    if (e)
      [n, i] = it(e);
    else {
      if (!r) return this;
      [i, n] = r._focus;
    }
    let [o, c] = [0, 0];
    if (Array.isArray(t)) {
      for (const [h, l] of t.entries()) {
        c = n + l.length - 1, l[l.length - 1] || c--;
        for (const [a, u] of l.entries())
          this.cell(i + h, n + a, u);
      }
      o = i + t.length - 1;
    } else typeof t == "string" && ([o, c] = co(this, t, [i, n]));
    return (o > 0 || c > 0) && (j.unionRange(this, o, c), j.reset(this)), this;
  }
  /**
   * @param from A1:H12
   */
  toHtml(t) {
    return lo(this, t);
  }
  /** () => [col, row] */
  getMaxArea() {
    let t = 0, e = 0;
    const r = this.data();
    return r.borders.forEach((i) => {
      const n = i[0].split(":").slice(-1)[0], o = it(n);
      e = Math.max(e, o[0]), t = Math.max(t, o[1]);
    }), r.cells.forEach((i) => {
      if (i) {
        let [n, o] = i;
        const c = Q(o, n), h = r.merges.filter((l) => l.includes(c));
        if (h.length > 0) {
          const l = it(h[0].split(":")[1]);
          o = Math.max(o, l[0]), n = Math.max(n, l[1]);
        }
        t = Math.max(t, n), e = Math.max(e, o);
      }
    }), [e, t];
  }
  toArrays(t) {
    const e = X.with(t), r = [];
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
    width: qi(s._data),
    height: Yi(s._data)
  };
}
window && (window.wolfp = je);
export {
  qt as HElement,
  ut as Renders,
  je as default,
  z as h,
  Ye as resizeContentRect
};
