var Es = Object.defineProperty;
var Hr = (s) => {
  throw TypeError(s);
};
var Bs = (s, t, e) => t in s ? Es(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var g = (s, t, e) => Bs(s, typeof t != "symbol" ? t + "" : t, e), Tr = (s, t, e) => t.has(s) || Hr("Cannot " + e);
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
    g(this, "_");
    g(this, "_data", /* @__PURE__ */ new Map());
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
function I(s, t) {
  return new qt(s, t);
}
function gt() {
  return I("div", `${N}-overlayer-area`);
}
class Ds {
  constructor(t) {
    g(this, "_areas");
    g(this, "_headerAreas");
    g(this, "_areaRects", []);
    this._areas = [gt(), gt(), gt(), gt()], this._headerAreas = [gt(), gt(), gt(), gt()], t.append(...this._areas, ...this._headerAreas);
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
function et(s) {
  let t = "", e = "";
  for (let r = 0; r < s.length; r += 1)
    s.charAt(r) >= "0" && s.charAt(r) <= "9" ? e += s.charAt(r) : t += s.charAt(r).toUpperCase();
  return [Rs(t), Number.parseInt(e, 10) - 1];
}
function Q(s, t) {
  return `${zi(s)}${t + 1}`;
}
function Pr(s, t, e) {
  const [r, i] = et(s);
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
    g(this, "_target");
    g(this, "_ctx");
    g(this, "_scale");
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
    const e = t.split(":"), [r, i] = et(e[0]);
    if (e.length === 1)
      return this.create(i, r);
    const [n, o] = et(e[1]);
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
    g(this, "_");
    g(this, "_target", null);
    g(this, "_rect", null);
    g(this, "_oldValue", "");
    g(this, "_value");
    g(this, "_visible", !1);
    g(this, "_moveChanger", () => {
    });
    g(this, "_changer", () => {
    });
    g(this, "storeHistory", () => 0);
    this._ = I("div", t);
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
    g(this, "_", []);
    g(this, "_indexes", /* @__PURE__ */ new Map());
    g(this, "_formulas", []);
    g(this, "_formulaParser", (t) => t);
    g(this, "_formatter", (t, e, r) => r);
    g(this, "_releasedIndexs", []);
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
  const { freeze: d } = s;
  if (d && (u = et(d)[r === "row" ? 1 : 0]), e > 0)
    if (t === "+")
      for (let x = a; !(h >= e); x += 1) {
        const f = i(u + x);
        h += f, s.scroll[o] = x + 1, l = !0;
      }
    else
      for (let x = a; !(h <= e); x -= 1) {
        const f = i(u + x - 1);
        if (h -= f, s.scroll[o] = x - 1, l = !0, f > 0) break;
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
    let h = s.range.startRow, l = s.range.startCol, a, u, d = [o - t.range.startRow, c - t.range.startCol];
    ["up", "left"].includes(r) && (d = [t.range.endRow - o, t.range.endCol - c]), r === "down" || r === "up" ? i <= 0 && e && (a = r, u = d[0] + 1, r === "up" && (u = 0 - u)) : n <= 0 && e && (a = r, u = d[1] + 1, r === "left" && (u = 0 - u));
    const x = d[1] % (n + 1), f = d[0] % (i + 1);
    ["up", "left"].includes(r) ? (h = s.range.endRow - f, l = s.range.endCol - x) : (h += f, l += x), qs(h, l, o, c, s, t, a, u);
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
      ) : l.value && (xt.use().getRender(bt(l)).disableAutoFillAction || (l.value = String(Or(l.value, c)))));
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
    g(this, "_text", I("textarea", ""));
    g(this, "_textMeasure", I("div", "measure"));
    g(this, "_editing", !1);
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
    const { width: u, height: d } = i.rect(), x = r.width - 2;
    u > x && t.setStyles({ width: `${u}px` }), d > r.height && d <= a ? t.setStyles({ height: `${d}px` }) : d < r.height && t.setStyles({ height: `${r.height - 2}px` });
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
    color: d,
    align: x,
    valign: f,
    underline: _,
    strikethrough: v,
    textwrap: w,
    padding: p
  } = r;
  s.save().beginPath().prop({
    textAlign: x,
    textBaseline: f,
    font: Zi(l, h, u, a),
    fillStyle: d
  });
  const [m, C] = p || [5, 5], b = Gi(x, e.width, m), B = c.split(`
`), A = e.width - m * 2, D = [];
  B.forEach((R) => {
    const k = s.measureTextWidth(R);
    if (w && k > A) {
      let O = { w: 0, len: 0, start: 0 };
      for (let $ = 0; $ < R.length; $ += 1)
        O.w > A && (D.push(R.slice(O.start, $)), O = { w: 0, len: 0, start: $ }), O.len++, O.w += s.measureTextWidth(R[$]) + 1;
      O.len > 0 && D.push(R.slice(O.start));
    } else
      D.push(R);
  });
  const T = h / 0.75, y = (D.length - 1) * T, E = [];
  _ && E.push("underline"), v && E.push("strikethrough");
  let H = Xi(f, e.height, y, T, C), P = 0;
  const F = (D.length > 0 ? D.length : 1) * T;
  return D.forEach((R) => {
    const k = s.measureTextWidth(R);
    P = Math.max(P, k), s.fillText(R, b, H), E.forEach((O) => {
      s._ctx.strokeStyle = d, s.line(...Ki(O, x, f, b, H, k, h));
    }), H += T;
  }), s.restore(), {
    contentInfo: {
      width: P,
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
const Js = {}, tn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Js
}, Symbol.toStringTag, { value: "Module" })), en = /* @__PURE__ */ Zs(tn);
var rn = Jt.exports, Lr;
function K() {
  return Lr || (Lr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r();
    })(rn, function() {
      var e = e || function(r, i) {
        var n;
        if (typeof window < "u" && window.crypto && (n = window.crypto), typeof self < "u" && self.crypto && (n = self.crypto), typeof globalThis < "u" && globalThis.crypto && (n = globalThis.crypto), !n && typeof window < "u" && window.msCrypto && (n = window.msCrypto), !n && typeof sr < "u" && sr.crypto && (n = sr.crypto), !n && typeof Qs == "function")
          try {
            n = en;
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
          function p() {
          }
          return function(m) {
            var C;
            return p.prototype = m, C = new p(), p.prototype = null, C;
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
            extend: function(p) {
              var m = c(this);
              return p && m.mixIn(p), (!m.hasOwnProperty("init") || this.init === m.init) && (m.init = function() {
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
              var p = this.extend();
              return p.init.apply(p, arguments), p;
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
            mixIn: function(p) {
              for (var m in p)
                p.hasOwnProperty(m) && (this[m] = p[m]);
              p.hasOwnProperty("toString") && (this.toString = p.toString);
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
          init: function(p, m) {
            p = this.words = p || [], m != i ? this.sigBytes = m : this.sigBytes = p.length * 4;
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
          toString: function(p) {
            return (p || x).stringify(this);
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
          concat: function(p) {
            var m = this.words, C = p.words, b = this.sigBytes, B = p.sigBytes;
            if (this.clamp(), b % 4)
              for (var A = 0; A < B; A++) {
                var D = C[A >>> 2] >>> 24 - A % 4 * 8 & 255;
                m[b + A >>> 2] |= D << 24 - (b + A) % 4 * 8;
              }
            else
              for (var T = 0; T < B; T += 4)
                m[b + T >>> 2] = C[T >>> 2];
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
            var p = this.words, m = this.sigBytes;
            p[m >>> 2] &= 4294967295 << 32 - m % 4 * 8, p.length = r.ceil(m / 4);
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
            var p = a.clone.call(this);
            return p.words = this.words.slice(0), p;
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
          random: function(p) {
            for (var m = [], C = 0; C < p; C += 4)
              m.push(o());
            return new u.init(m, p);
          }
        }), d = h.enc = {}, x = d.Hex = {
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
          stringify: function(p) {
            for (var m = p.words, C = p.sigBytes, b = [], B = 0; B < C; B++) {
              var A = m[B >>> 2] >>> 24 - B % 4 * 8 & 255;
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
          parse: function(p) {
            for (var m = p.length, C = [], b = 0; b < m; b += 2)
              C[b >>> 3] |= parseInt(p.substr(b, 2), 16) << 24 - b % 8 * 4;
            return new u.init(C, m / 2);
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
          stringify: function(p) {
            for (var m = p.words, C = p.sigBytes, b = [], B = 0; B < C; B++) {
              var A = m[B >>> 2] >>> 24 - B % 4 * 8 & 255;
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
          parse: function(p) {
            for (var m = p.length, C = [], b = 0; b < m; b++)
              C[b >>> 2] |= (p.charCodeAt(b) & 255) << 24 - b % 4 * 8;
            return new u.init(C, m);
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
          stringify: function(p) {
            try {
              return decodeURIComponent(escape(f.stringify(p)));
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
          parse: function(p) {
            return f.parse(unescape(encodeURIComponent(p)));
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
          _append: function(p) {
            typeof p == "string" && (p = _.parse(p)), this._data.concat(p), this._nDataBytes += p.sigBytes;
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
          _process: function(p) {
            var m, C = this._data, b = C.words, B = C.sigBytes, A = this.blockSize, D = A * 4, T = B / D;
            p ? T = r.ceil(T) : T = r.max((T | 0) - this._minBufferSize, 0);
            var y = T * A, E = r.min(y * 4, B);
            if (y) {
              for (var H = 0; H < y; H += A)
                this._doProcessBlock(b, H);
              m = b.splice(0, y), C.sigBytes -= E;
            }
            return new u.init(m, E);
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
            var p = a.clone.call(this);
            return p._data = this._data.clone(), p;
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
          init: function(p) {
            this.cfg = this.cfg.extend(p), this.reset();
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
          update: function(p) {
            return this._append(p), this._process(), this;
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
          finalize: function(p) {
            p && this._append(p);
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
          _createHelper: function(p) {
            return function(m, C) {
              return new p.init(C).finalize(m);
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
          _createHmacHelper: function(p) {
            return function(m, C) {
              return new w.HMAC.init(p, C).finalize(m);
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
var te = { exports: {} }, sn = te.exports, Vr;
function Ke() {
  return Vr || (Vr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(sn, function(e) {
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
            for (var l = this.words, a = l.length, u = [], d = 0; d < a; d++) {
              var x = l[d];
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
            for (var l = o.clone.call(this), a = l.words = this.words.slice(0), u = a.length, d = 0; d < u; d++)
              a[d] = a[d].clone();
            return l;
          }
        });
      }(), e;
    });
  }(te)), te.exports;
}
var ee = { exports: {} }, nn = ee.exports, Nr;
function on() {
  return Nr || (Nr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(nn, function(e) {
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
var re = { exports: {} }, an = re.exports, qr;
function ln() {
  return qr || (qr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(an, function(e) {
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
            for (var l = h.words, a = h.sigBytes, u = [], d = 0; d < a; d += 2) {
              var x = l[d >>> 2] >>> 16 - d % 4 * 8 & 65535;
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
            for (var l = h.words, a = h.sigBytes, u = [], d = 0; d < a; d += 2) {
              var x = c(l[d >>> 2] >>> 16 - d % 4 * 8 & 65535);
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
var ie = { exports: {} }, cn = ie.exports, jr;
function yt() {
  return jr || (jr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(cn, function(e) {
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
            for (var d = [], x = 0; x < a; x += 3)
              for (var f = l[x >>> 2] >>> 24 - x % 4 * 8 & 255, _ = l[x + 1 >>> 2] >>> 24 - (x + 1) % 4 * 8 & 255, v = l[x + 2 >>> 2] >>> 24 - (x + 2) % 4 * 8 & 255, w = f << 16 | _ << 8 | v, p = 0; p < 4 && x + p * 0.75 < a; p++)
                d.push(u.charAt(w >>> 6 * (3 - p) & 63));
            var m = u.charAt(64);
            if (m)
              for (; d.length % 4; )
                d.push(m);
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
            var l = h.length, a = this._map, u = this._reverseMap;
            if (!u) {
              u = this._reverseMap = [];
              for (var d = 0; d < a.length; d++)
                u[a.charCodeAt(d)] = d;
            }
            var x = a.charAt(64);
            if (x) {
              var f = h.indexOf(x);
              f !== -1 && (l = f);
            }
            return c(h, l, u);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function c(h, l, a) {
          for (var u = [], d = 0, x = 0; x < l; x++)
            if (x % 4) {
              var f = a[h.charCodeAt(x - 1)] << x % 4 * 2, _ = a[h.charCodeAt(x)] >>> 6 - x % 4 * 2, v = f | _;
              u[d >>> 2] |= v << 24 - d % 4 * 8, d++;
            }
          return n.create(u, d);
        }
      }(), e.enc.Base64;
    });
  }(ie)), ie.exports;
}
var se = { exports: {} }, hn = se.exports, Yr;
function dn() {
  return Yr || (Yr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(hn, function(e) {
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
            var a = h.words, u = h.sigBytes, d = l ? this._safe_map : this._map;
            h.clamp();
            for (var x = [], f = 0; f < u; f += 3)
              for (var _ = a[f >>> 2] >>> 24 - f % 4 * 8 & 255, v = a[f + 1 >>> 2] >>> 24 - (f + 1) % 4 * 8 & 255, w = a[f + 2 >>> 2] >>> 24 - (f + 2) % 4 * 8 & 255, p = _ << 16 | v << 8 | w, m = 0; m < 4 && f + m * 0.75 < u; m++)
                x.push(d.charAt(p >>> 6 * (3 - m) & 63));
            var C = d.charAt(64);
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
            var a = h.length, u = l ? this._safe_map : this._map, d = this._reverseMap;
            if (!d) {
              d = this._reverseMap = [];
              for (var x = 0; x < u.length; x++)
                d[u.charCodeAt(x)] = x;
            }
            var f = u.charAt(64);
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
          for (var u = [], d = 0, x = 0; x < l; x++)
            if (x % 4) {
              var f = a[h.charCodeAt(x - 1)] << x % 4 * 2, _ = a[h.charCodeAt(x)] >>> 6 - x % 4 * 2, v = f | _;
              u[d >>> 2] |= v << 24 - d % 4 * 8, d++;
            }
          return n.create(u, d);
        }
      }(), e.enc.Base64url;
    });
  }(se)), se.exports;
}
var ne = { exports: {} }, fn = ne.exports, Ur;
function Et() {
  return Ur || (Ur = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(fn, function(e) {
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
            for (var w = 0; w < 16; w++) {
              var p = v + w, m = _[p];
              _[p] = (m << 8 | m >>> 24) & 16711935 | (m << 24 | m >>> 8) & 4278255360;
            }
            var C = this._hash.words, b = _[v + 0], B = _[v + 1], A = _[v + 2], D = _[v + 3], T = _[v + 4], y = _[v + 5], E = _[v + 6], H = _[v + 7], P = _[v + 8], F = _[v + 9], R = _[v + 10], k = _[v + 11], O = _[v + 12], $ = _[v + 13], V = _[v + 14], L = _[v + 15], S = C[0], z = C[1], W = C[2], M = C[3];
            S = u(S, z, W, M, b, 7, l[0]), M = u(M, S, z, W, B, 12, l[1]), W = u(W, M, S, z, A, 17, l[2]), z = u(z, W, M, S, D, 22, l[3]), S = u(S, z, W, M, T, 7, l[4]), M = u(M, S, z, W, y, 12, l[5]), W = u(W, M, S, z, E, 17, l[6]), z = u(z, W, M, S, H, 22, l[7]), S = u(S, z, W, M, P, 7, l[8]), M = u(M, S, z, W, F, 12, l[9]), W = u(W, M, S, z, R, 17, l[10]), z = u(z, W, M, S, k, 22, l[11]), S = u(S, z, W, M, O, 7, l[12]), M = u(M, S, z, W, $, 12, l[13]), W = u(W, M, S, z, V, 17, l[14]), z = u(z, W, M, S, L, 22, l[15]), S = d(S, z, W, M, B, 5, l[16]), M = d(M, S, z, W, E, 9, l[17]), W = d(W, M, S, z, k, 14, l[18]), z = d(z, W, M, S, b, 20, l[19]), S = d(S, z, W, M, y, 5, l[20]), M = d(M, S, z, W, R, 9, l[21]), W = d(W, M, S, z, L, 14, l[22]), z = d(z, W, M, S, T, 20, l[23]), S = d(S, z, W, M, F, 5, l[24]), M = d(M, S, z, W, V, 9, l[25]), W = d(W, M, S, z, D, 14, l[26]), z = d(z, W, M, S, P, 20, l[27]), S = d(S, z, W, M, $, 5, l[28]), M = d(M, S, z, W, A, 9, l[29]), W = d(W, M, S, z, H, 14, l[30]), z = d(z, W, M, S, O, 20, l[31]), S = x(S, z, W, M, y, 4, l[32]), M = x(M, S, z, W, P, 11, l[33]), W = x(W, M, S, z, k, 16, l[34]), z = x(z, W, M, S, V, 23, l[35]), S = x(S, z, W, M, B, 4, l[36]), M = x(M, S, z, W, T, 11, l[37]), W = x(W, M, S, z, H, 16, l[38]), z = x(z, W, M, S, R, 23, l[39]), S = x(S, z, W, M, $, 4, l[40]), M = x(M, S, z, W, b, 11, l[41]), W = x(W, M, S, z, D, 16, l[42]), z = x(z, W, M, S, E, 23, l[43]), S = x(S, z, W, M, F, 4, l[44]), M = x(M, S, z, W, O, 11, l[45]), W = x(W, M, S, z, L, 16, l[46]), z = x(z, W, M, S, A, 23, l[47]), S = f(S, z, W, M, b, 6, l[48]), M = f(M, S, z, W, H, 10, l[49]), W = f(W, M, S, z, V, 15, l[50]), z = f(z, W, M, S, y, 21, l[51]), S = f(S, z, W, M, O, 6, l[52]), M = f(M, S, z, W, D, 10, l[53]), W = f(W, M, S, z, R, 15, l[54]), z = f(z, W, M, S, B, 21, l[55]), S = f(S, z, W, M, P, 6, l[56]), M = f(M, S, z, W, L, 10, l[57]), W = f(W, M, S, z, E, 15, l[58]), z = f(z, W, M, S, $, 21, l[59]), S = f(S, z, W, M, T, 6, l[60]), M = f(M, S, z, W, k, 10, l[61]), W = f(W, M, S, z, A, 15, l[62]), z = f(z, W, M, S, F, 21, l[63]), C[0] = C[0] + S | 0, C[1] = C[1] + z | 0, C[2] = C[2] + W | 0, C[3] = C[3] + M | 0;
          },
          _doFinalize: function() {
            var _ = this._data, v = _.words, w = this._nDataBytes * 8, p = _.sigBytes * 8;
            v[p >>> 5] |= 128 << 24 - p % 32;
            var m = r.floor(w / 4294967296), C = w;
            v[(p + 64 >>> 9 << 4) + 15] = (m << 8 | m >>> 24) & 16711935 | (m << 24 | m >>> 8) & 4278255360, v[(p + 64 >>> 9 << 4) + 14] = (C << 8 | C >>> 24) & 16711935 | (C << 24 | C >>> 8) & 4278255360, _.sigBytes = (v.length + 1) * 4, this._process();
            for (var b = this._hash, B = b.words, A = 0; A < 4; A++) {
              var D = B[A];
              B[A] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360;
            }
            return b;
          },
          clone: function() {
            var _ = c.clone.call(this);
            return _._hash = this._hash.clone(), _;
          }
        });
        function u(_, v, w, p, m, C, b) {
          var B = _ + (v & w | ~v & p) + m + b;
          return (B << C | B >>> 32 - C) + v;
        }
        function d(_, v, w, p, m, C, b) {
          var B = _ + (v & p | w & ~p) + m + b;
          return (B << C | B >>> 32 - C) + v;
        }
        function x(_, v, w, p, m, C, b) {
          var B = _ + (v ^ w ^ p) + m + b;
          return (B << C | B >>> 32 - C) + v;
        }
        function f(_, v, w, p, m, C, b) {
          var B = _ + (w ^ (v | ~p)) + m + b;
          return (B << C | B >>> 32 - C) + v;
        }
        i.MD5 = c._createHelper(a), i.HmacMD5 = c._createHmacHelper(a);
      }(Math), e.MD5;
    });
  }(ne)), ne.exports;
}
var oe = { exports: {} }, un = oe.exports, Xr;
function ts() {
  return Xr || (Xr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(un, function(e) {
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
            for (var d = this._hash.words, x = d[0], f = d[1], _ = d[2], v = d[3], w = d[4], p = 0; p < 80; p++) {
              if (p < 16)
                h[p] = a[u + p] | 0;
              else {
                var m = h[p - 3] ^ h[p - 8] ^ h[p - 14] ^ h[p - 16];
                h[p] = m << 1 | m >>> 31;
              }
              var C = (x << 5 | x >>> 27) + w + h[p];
              p < 20 ? C += (f & _ | ~f & v) + 1518500249 : p < 40 ? C += (f ^ _ ^ v) + 1859775393 : p < 60 ? C += (f & _ | f & v | _ & v) - 1894007588 : C += (f ^ _ ^ v) - 899497514, w = v, v = _, _ = f << 30 | f >>> 2, f = x, x = C;
            }
            d[0] = d[0] + x | 0, d[1] = d[1] + f | 0, d[2] = d[2] + _ | 0, d[3] = d[3] + v | 0, d[4] = d[4] + w | 0;
          },
          _doFinalize: function() {
            var a = this._data, u = a.words, d = this._nDataBytes * 8, x = a.sigBytes * 8;
            return u[x >>> 5] |= 128 << 24 - x % 32, u[(x + 64 >>> 9 << 4) + 14] = Math.floor(d / 4294967296), u[(x + 64 >>> 9 << 4) + 15] = d, a.sigBytes = u.length * 4, this._process(), this._hash;
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
var ae = { exports: {} }, xn = ae.exports, Kr;
function pr() {
  return Kr || (Kr = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(xn, function(e) {
      return function(r) {
        var i = e, n = i.lib, o = n.WordArray, c = n.Hasher, h = i.algo, l = [], a = [];
        (function() {
          function x(w) {
            for (var p = r.sqrt(w), m = 2; m <= p; m++)
              if (!(w % m))
                return !1;
            return !0;
          }
          function f(w) {
            return (w - (w | 0)) * 4294967296 | 0;
          }
          for (var _ = 2, v = 0; v < 64; )
            x(_) && (v < 8 && (l[v] = f(r.pow(_, 1 / 2))), a[v] = f(r.pow(_, 1 / 3)), v++), _++;
        })();
        var u = [], d = h.SHA256 = c.extend({
          _doReset: function() {
            this._hash = new o.init(l.slice(0));
          },
          _doProcessBlock: function(x, f) {
            for (var _ = this._hash.words, v = _[0], w = _[1], p = _[2], m = _[3], C = _[4], b = _[5], B = _[6], A = _[7], D = 0; D < 64; D++) {
              if (D < 16)
                u[D] = x[f + D] | 0;
              else {
                var T = u[D - 15], y = (T << 25 | T >>> 7) ^ (T << 14 | T >>> 18) ^ T >>> 3, E = u[D - 2], H = (E << 15 | E >>> 17) ^ (E << 13 | E >>> 19) ^ E >>> 10;
                u[D] = y + u[D - 7] + H + u[D - 16];
              }
              var P = C & b ^ ~C & B, F = v & w ^ v & p ^ w & p, R = (v << 30 | v >>> 2) ^ (v << 19 | v >>> 13) ^ (v << 10 | v >>> 22), k = (C << 26 | C >>> 6) ^ (C << 21 | C >>> 11) ^ (C << 7 | C >>> 25), O = A + k + P + a[D] + u[D], $ = R + F;
              A = B, B = b, b = C, C = m + O | 0, m = p, p = w, w = v, v = O + $ | 0;
            }
            _[0] = _[0] + v | 0, _[1] = _[1] + w | 0, _[2] = _[2] + p | 0, _[3] = _[3] + m | 0, _[4] = _[4] + C | 0, _[5] = _[5] + b | 0, _[6] = _[6] + B | 0, _[7] = _[7] + A | 0;
          },
          _doFinalize: function() {
            var x = this._data, f = x.words, _ = this._nDataBytes * 8, v = x.sigBytes * 8;
            return f[v >>> 5] |= 128 << 24 - v % 32, f[(v + 64 >>> 9 << 4) + 14] = r.floor(_ / 4294967296), f[(v + 64 >>> 9 << 4) + 15] = _, x.sigBytes = f.length * 4, this._process(), this._hash;
          },
          clone: function() {
            var x = c.clone.call(this);
            return x._hash = this._hash.clone(), x;
          }
        });
        i.SHA256 = c._createHelper(d), i.HmacSHA256 = c._createHmacHelper(d);
      }(Math), e.SHA256;
    });
  }(ae)), ae.exports;
}
var le = { exports: {} }, pn = le.exports, Gr;
function _n() {
  return Gr || (Gr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), pr());
    })(pn, function(e) {
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
var ce = { exports: {} }, gn = ce.exports, Zr;
function es() {
  return Zr || (Zr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), Ke());
    })(gn, function(e) {
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
        ], d = [];
        (function() {
          for (var f = 0; f < 80; f++)
            d[f] = a();
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
          _doProcessBlock: function(f, _) {
            for (var v = this._hash.words, w = v[0], p = v[1], m = v[2], C = v[3], b = v[4], B = v[5], A = v[6], D = v[7], T = w.high, y = w.low, E = p.high, H = p.low, P = m.high, F = m.low, R = C.high, k = C.low, O = b.high, $ = b.low, V = B.high, L = B.low, S = A.high, z = A.low, W = D.high, M = D.low, j = T, Y = y, Z = E, q = H, J = P, G = F, st = R, ct = k, rt = O, nt = $, Xt = V, It = L, Kt = S, zt = z, Je = W, Mt = M, ht = 0; ht < 80; ht++) {
              var at, pt, Gt = d[ht];
              if (ht < 16)
                pt = Gt.high = f[_ + ht * 2] | 0, at = Gt.low = f[_ + ht * 2 + 1] | 0;
              else {
                var wr = d[ht - 15], At = wr.high, Ot = wr.low, ds = (At >>> 1 | Ot << 31) ^ (At >>> 8 | Ot << 24) ^ At >>> 7, br = (Ot >>> 1 | At << 31) ^ (Ot >>> 8 | At << 24) ^ (Ot >>> 7 | At << 25), yr = d[ht - 2], Dt = yr.high, Wt = yr.low, fs = (Dt >>> 19 | Wt << 13) ^ (Dt << 3 | Wt >>> 29) ^ Dt >>> 6, Er = (Wt >>> 19 | Dt << 13) ^ (Wt << 3 | Dt >>> 29) ^ (Wt >>> 6 | Dt << 26), Br = d[ht - 7], us = Br.high, xs = Br.low, Ar = d[ht - 16], ps = Ar.high, Dr = Ar.low;
                at = br + xs, pt = ds + us + (at >>> 0 < br >>> 0 ? 1 : 0), at = at + Er, pt = pt + fs + (at >>> 0 < Er >>> 0 ? 1 : 0), at = at + Dr, pt = pt + ps + (at >>> 0 < Dr >>> 0 ? 1 : 0), Gt.high = pt, Gt.low = at;
              }
              var _s = rt & Xt ^ ~rt & Kt, Fr = nt & It ^ ~nt & zt, gs = j & Z ^ j & J ^ Z & J, vs = Y & q ^ Y & G ^ q & G, ms = (j >>> 28 | Y << 4) ^ (j << 30 | Y >>> 2) ^ (j << 25 | Y >>> 7), Rr = (Y >>> 28 | j << 4) ^ (Y << 30 | j >>> 2) ^ (Y << 25 | j >>> 7), Cs = (rt >>> 14 | nt << 18) ^ (rt >>> 18 | nt << 14) ^ (rt << 23 | nt >>> 9), ws = (nt >>> 14 | rt << 18) ^ (nt >>> 18 | rt << 14) ^ (nt << 23 | rt >>> 9), Sr = u[ht], bs = Sr.high, kr = Sr.low, ot = Mt + ws, _t = Je + Cs + (ot >>> 0 < Mt >>> 0 ? 1 : 0), ot = ot + Fr, _t = _t + _s + (ot >>> 0 < Fr >>> 0 ? 1 : 0), ot = ot + kr, _t = _t + bs + (ot >>> 0 < kr >>> 0 ? 1 : 0), ot = ot + at, _t = _t + pt + (ot >>> 0 < at >>> 0 ? 1 : 0), $r = Rr + vs, ys = ms + gs + ($r >>> 0 < Rr >>> 0 ? 1 : 0);
              Je = Kt, Mt = zt, Kt = Xt, zt = It, Xt = rt, It = nt, nt = ct + ot | 0, rt = st + _t + (nt >>> 0 < ct >>> 0 ? 1 : 0) | 0, st = J, ct = G, J = Z, G = q, Z = j, q = Y, Y = ot + $r | 0, j = _t + ys + (Y >>> 0 < ot >>> 0 ? 1 : 0) | 0;
            }
            y = w.low = y + Y, w.high = T + j + (y >>> 0 < Y >>> 0 ? 1 : 0), H = p.low = H + q, p.high = E + Z + (H >>> 0 < q >>> 0 ? 1 : 0), F = m.low = F + G, m.high = P + J + (F >>> 0 < G >>> 0 ? 1 : 0), k = C.low = k + ct, C.high = R + st + (k >>> 0 < ct >>> 0 ? 1 : 0), $ = b.low = $ + nt, b.high = O + rt + ($ >>> 0 < nt >>> 0 ? 1 : 0), L = B.low = L + It, B.high = V + Xt + (L >>> 0 < It >>> 0 ? 1 : 0), z = A.low = z + zt, A.high = S + Kt + (z >>> 0 < zt >>> 0 ? 1 : 0), M = D.low = M + Mt, D.high = W + Je + (M >>> 0 < Mt >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var f = this._data, _ = f.words, v = this._nDataBytes * 8, w = f.sigBytes * 8;
            _[w >>> 5] |= 128 << 24 - w % 32, _[(w + 128 >>> 10 << 5) + 30] = Math.floor(v / 4294967296), _[(w + 128 >>> 10 << 5) + 31] = v, f.sigBytes = _.length * 4, this._process();
            var p = this._hash.toX32();
            return p;
          },
          clone: function() {
            var f = n.clone.call(this);
            return f._hash = this._hash.clone(), f;
          },
          blockSize: 1024 / 32
        });
        r.SHA512 = n._createHelper(x), r.HmacSHA512 = n._createHmacHelper(x);
      }(), e.SHA512;
    });
  }(ce)), ce.exports;
}
var he = { exports: {} }, vn = he.exports, Qr;
function mn() {
  return Qr || (Qr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), Ke(), es());
    })(vn, function(e) {
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
var de = { exports: {} }, Cn = de.exports, Jr;
function wn() {
  return Jr || (Jr = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), Ke());
    })(Cn, function(e) {
      return function(r) {
        var i = e, n = i.lib, o = n.WordArray, c = n.Hasher, h = i.x64, l = h.Word, a = i.algo, u = [], d = [], x = [];
        (function() {
          for (var v = 1, w = 0, p = 0; p < 24; p++) {
            u[v + 5 * w] = (p + 1) * (p + 2) / 2 % 64;
            var m = w % 5, C = (2 * v + 3 * w) % 5;
            v = m, w = C;
          }
          for (var v = 0; v < 5; v++)
            for (var w = 0; w < 5; w++)
              d[v + 5 * w] = w + (2 * v + 3 * w) % 5 * 5;
          for (var b = 1, B = 0; B < 24; B++) {
            for (var A = 0, D = 0, T = 0; T < 7; T++) {
              if (b & 1) {
                var y = (1 << T) - 1;
                y < 32 ? D ^= 1 << y : A ^= 1 << y - 32;
              }
              b & 128 ? b = b << 1 ^ 113 : b <<= 1;
            }
            x[B] = l.create(A, D);
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
            for (var v = this._state = [], w = 0; w < 25; w++)
              v[w] = new l.init();
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          },
          _doProcessBlock: function(v, w) {
            for (var p = this._state, m = this.blockSize / 2, C = 0; C < m; C++) {
              var b = v[w + 2 * C], B = v[w + 2 * C + 1];
              b = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360, B = (B << 8 | B >>> 24) & 16711935 | (B << 24 | B >>> 8) & 4278255360;
              var A = p[C];
              A.high ^= B, A.low ^= b;
            }
            for (var D = 0; D < 24; D++) {
              for (var T = 0; T < 5; T++) {
                for (var y = 0, E = 0, H = 0; H < 5; H++) {
                  var A = p[T + 5 * H];
                  y ^= A.high, E ^= A.low;
                }
                var P = f[T];
                P.high = y, P.low = E;
              }
              for (var T = 0; T < 5; T++)
                for (var F = f[(T + 4) % 5], R = f[(T + 1) % 5], k = R.high, O = R.low, y = F.high ^ (k << 1 | O >>> 31), E = F.low ^ (O << 1 | k >>> 31), H = 0; H < 5; H++) {
                  var A = p[T + 5 * H];
                  A.high ^= y, A.low ^= E;
                }
              for (var $ = 1; $ < 25; $++) {
                var y, E, A = p[$], V = A.high, L = A.low, S = u[$];
                S < 32 ? (y = V << S | L >>> 32 - S, E = L << S | V >>> 32 - S) : (y = L << S - 32 | V >>> 64 - S, E = V << S - 32 | L >>> 64 - S);
                var z = f[d[$]];
                z.high = y, z.low = E;
              }
              var W = f[0], M = p[0];
              W.high = M.high, W.low = M.low;
              for (var T = 0; T < 5; T++)
                for (var H = 0; H < 5; H++) {
                  var $ = T + 5 * H, A = p[$], j = f[$], Y = f[(T + 1) % 5 + 5 * H], Z = f[(T + 2) % 5 + 5 * H];
                  A.high = j.high ^ ~Y.high & Z.high, A.low = j.low ^ ~Y.low & Z.low;
                }
              var A = p[0], q = x[D];
              A.high ^= q.high, A.low ^= q.low;
            }
          },
          _doFinalize: function() {
            var v = this._data, w = v.words;
            this._nDataBytes * 8;
            var p = v.sigBytes * 8, m = this.blockSize * 32;
            w[p >>> 5] |= 1 << 24 - p % 32, w[(r.ceil((p + 1) / m) * m >>> 5) - 1] |= 128, v.sigBytes = w.length * 4, this._process();
            for (var C = this._state, b = this.cfg.outputLength / 8, B = b / 8, A = [], D = 0; D < B; D++) {
              var T = C[D], y = T.high, E = T.low;
              y = (y << 8 | y >>> 24) & 16711935 | (y << 24 | y >>> 8) & 4278255360, E = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360, A.push(E), A.push(y);
            }
            return new o.init(A, b);
          },
          clone: function() {
            for (var v = c.clone.call(this), w = v._state = this._state.slice(0), p = 0; p < 25; p++)
              w[p] = w[p].clone();
            return v;
          }
        });
        i.SHA3 = c._createHelper(_), i.HmacSHA3 = c._createHmacHelper(_);
      }(Math), e.SHA3;
    });
  }(de)), de.exports;
}
var fe = { exports: {} }, bn = fe.exports, ti;
function yn() {
  return ti || (ti = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(bn, function(e) {
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
        ]), x = o.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), f = o.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), _ = h.RIPEMD160 = c.extend({
          _doReset: function() {
            this._hash = o.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          },
          _doProcessBlock: function(B, A) {
            for (var D = 0; D < 16; D++) {
              var T = A + D, y = B[T];
              B[T] = (y << 8 | y >>> 24) & 16711935 | (y << 24 | y >>> 8) & 4278255360;
            }
            var E = this._hash.words, H = x.words, P = f.words, F = l.words, R = a.words, k = u.words, O = d.words, $, V, L, S, z, W, M, j, Y, Z;
            W = $ = E[0], M = V = E[1], j = L = E[2], Y = S = E[3], Z = z = E[4];
            for (var q, D = 0; D < 80; D += 1)
              q = $ + B[A + F[D]] | 0, D < 16 ? q += v(V, L, S) + H[0] : D < 32 ? q += w(V, L, S) + H[1] : D < 48 ? q += p(V, L, S) + H[2] : D < 64 ? q += m(V, L, S) + H[3] : q += C(V, L, S) + H[4], q = q | 0, q = b(q, k[D]), q = q + z | 0, $ = z, z = S, S = b(L, 10), L = V, V = q, q = W + B[A + R[D]] | 0, D < 16 ? q += C(M, j, Y) + P[0] : D < 32 ? q += m(M, j, Y) + P[1] : D < 48 ? q += p(M, j, Y) + P[2] : D < 64 ? q += w(M, j, Y) + P[3] : q += v(M, j, Y) + P[4], q = q | 0, q = b(q, O[D]), q = q + Z | 0, W = Z, Z = Y, Y = b(j, 10), j = M, M = q;
            q = E[1] + L + Y | 0, E[1] = E[2] + S + Z | 0, E[2] = E[3] + z + W | 0, E[3] = E[4] + $ + M | 0, E[4] = E[0] + V + j | 0, E[0] = q;
          },
          _doFinalize: function() {
            var B = this._data, A = B.words, D = this._nDataBytes * 8, T = B.sigBytes * 8;
            A[T >>> 5] |= 128 << 24 - T % 32, A[(T + 64 >>> 9 << 4) + 14] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360, B.sigBytes = (A.length + 1) * 4, this._process();
            for (var y = this._hash, E = y.words, H = 0; H < 5; H++) {
              var P = E[H];
              E[H] = (P << 8 | P >>> 24) & 16711935 | (P << 24 | P >>> 8) & 4278255360;
            }
            return y;
          },
          clone: function() {
            var B = c.clone.call(this);
            return B._hash = this._hash.clone(), B;
          }
        });
        function v(B, A, D) {
          return B ^ A ^ D;
        }
        function w(B, A, D) {
          return B & A | ~B & D;
        }
        function p(B, A, D) {
          return (B | ~A) ^ D;
        }
        function m(B, A, D) {
          return B & D | A & ~D;
        }
        function C(B, A, D) {
          return B ^ (A | ~D);
        }
        function b(B, A) {
          return B << A | B >>> 32 - A;
        }
        i.RIPEMD160 = c._createHelper(_), i.HmacRIPEMD160 = c._createHmacHelper(_);
      }(), e.RIPEMD160;
    });
  }(fe)), fe.exports;
}
var ue = { exports: {} }, En = ue.exports, ei;
function _r() {
  return ei || (ei = 1, function(s, t) {
    (function(e, r) {
      s.exports = r(K());
    })(En, function(e) {
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
            var u = l.blockSize, d = u * 4;
            a.sigBytes > d && (a = l.finalize(a)), a.clamp();
            for (var x = this._oKey = a.clone(), f = this._iKey = a.clone(), _ = x.words, v = f.words, w = 0; w < u; w++)
              _[w] ^= 1549556828, v[w] ^= 909522486;
            x.sigBytes = f.sigBytes = d, this.reset();
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
            var d = a.finalize(this._oKey.clone().concat(u));
            return d;
          }
        });
      })();
    });
  }(ue)), ue.exports;
}
var xe = { exports: {} }, Bn = xe.exports, ri;
function An() {
  return ri || (ri = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), pr(), _r());
    })(Bn, function(e) {
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
          compute: function(u, d) {
            for (var x = this.cfg, f = l.create(x.hasher, u), _ = o.create(), v = o.create([1]), w = _.words, p = v.words, m = x.keySize, C = x.iterations; w.length < m; ) {
              var b = f.update(d).finalize(v);
              f.reset();
              for (var B = b.words, A = B.length, D = b, T = 1; T < C; T++) {
                D = f.finalize(D), f.reset();
                for (var y = D.words, E = 0; E < A; E++)
                  B[E] ^= y[E];
              }
              _.concat(b), p[0]++;
            }
            return _.sigBytes = m * 4, _;
          }
        });
        r.PBKDF2 = function(u, d, x) {
          return a.create(x).compute(u, d);
        };
      }(), e.PBKDF2;
    });
  }(xe)), xe.exports;
}
var pe = { exports: {} }, Dn = pe.exports, ii;
function mt() {
  return ii || (ii = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), ts(), _r());
    })(Dn, function(e) {
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
            for (var d, x = this.cfg, f = x.hasher.create(), _ = o.create(), v = _.words, w = x.keySize, p = x.iterations; v.length < w; ) {
              d && f.update(d), d = f.update(a).finalize(u), f.reset();
              for (var m = 1; m < p; m++)
                d = f.finalize(d), f.reset();
              _.concat(d);
            }
            return _.sigBytes = w * 4, _;
          }
        });
        r.EvpKDF = function(a, u, d) {
          return l.create(d).compute(a, u);
        };
      }(), e.EvpKDF;
    });
  }(pe)), pe.exports;
}
var _e = { exports: {} }, Fn = _e.exports, si;
function tt() {
  return si || (si = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), mt());
    })(Fn, function(e) {
      e.lib.Cipher || function(r) {
        var i = e, n = i.lib, o = n.Base, c = n.WordArray, h = n.BufferedBlockAlgorithm, l = i.enc;
        l.Utf8;
        var a = l.Base64, u = i.algo, d = u.EvpKDF, x = n.Cipher = h.extend({
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
          init: function(y, E, H) {
            this.cfg = this.cfg.extend(H), this._xformMode = y, this._key = E, this.reset();
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
              return typeof E == "string" ? T : B;
            }
            return function(E) {
              return {
                encrypt: function(H, P, F) {
                  return y(P).encrypt(E, H, P, F);
                },
                decrypt: function(H, P, F) {
                  return y(P).decrypt(E, H, P, F);
                }
              };
            };
          }()
        });
        n.StreamCipher = x.extend({
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
            processBlock: function(H, P) {
              var F = this._cipher, R = F.blockSize;
              E.call(this, H, P, R), F.encryptBlock(H, P), this._prevBlock = H.slice(P, P + R);
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
            processBlock: function(H, P) {
              var F = this._cipher, R = F.blockSize, k = H.slice(P, P + R);
              F.decryptBlock(H, P), E.call(this, H, P, R), this._prevBlock = k;
            }
          });
          function E(H, P, F) {
            var R, k = this._iv;
            k ? (R = k, this._iv = r) : R = this._prevBlock;
            for (var O = 0; O < F; O++)
              H[P + O] ^= R[O];
          }
          return y;
        }(), w = i.pad = {}, p = w.Pkcs7 = {
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
            for (var H = E * 4, P = H - y.sigBytes % H, F = P << 24 | P << 16 | P << 8 | P, R = [], k = 0; k < P; k += 4)
              R.push(F);
            var O = c.create(R, P);
            y.concat(O);
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
        n.BlockCipher = x.extend({
          /**
           * Configuration options.
           *
           * @property {Mode} mode The block mode to use. Default: CBC
           * @property {Padding} padding The padding strategy to use. Default: Pkcs7
           */
          cfg: x.cfg.extend({
            mode: v,
            padding: p
          }),
          reset: function() {
            var y;
            x.reset.call(this);
            var E = this.cfg, H = E.iv, P = E.mode;
            this._xformMode == this._ENC_XFORM_MODE ? y = P.createEncryptor : (y = P.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == y ? this._mode.init(this, H && H.words) : (this._mode = y.call(P, this, H && H.words), this._mode.__creator = y);
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
          stringify: function(y) {
            var E, H = y.ciphertext, P = y.salt;
            return P ? E = c.create([1398893684, 1701076831]).concat(P).concat(H) : E = H, E.toString(a);
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
            var E, H = a.parse(y), P = H.words;
            return P[0] == 1398893684 && P[1] == 1701076831 && (E = c.create(P.slice(2, 4)), P.splice(0, 4), H.sigBytes -= 16), m.create({ ciphertext: H, salt: E });
          }
        }, B = n.SerializableCipher = o.extend({
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
          encrypt: function(y, E, H, P) {
            P = this.cfg.extend(P);
            var F = y.createEncryptor(H, P), R = F.finalize(E), k = F.cfg;
            return m.create({
              ciphertext: R,
              key: H,
              iv: k.iv,
              algorithm: y,
              mode: k.mode,
              padding: k.padding,
              blockSize: y.blockSize,
              formatter: P.format
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
          decrypt: function(y, E, H, P) {
            P = this.cfg.extend(P), E = this._parse(E, P.format);
            var F = y.createDecryptor(H, P).finalize(E.ciphertext);
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
          execute: function(y, E, H, P, F) {
            if (P || (P = c.random(64 / 8)), F)
              var R = d.create({ keySize: E + H, hasher: F }).compute(y, P);
            else
              var R = d.create({ keySize: E + H }).compute(y, P);
            var k = c.create(R.words.slice(E), H * 4);
            return R.sigBytes = E * 4, m.create({ key: R, iv: k, salt: P });
          }
        }, T = n.PasswordBasedCipher = B.extend({
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
          encrypt: function(y, E, H, P) {
            P = this.cfg.extend(P);
            var F = P.kdf.execute(H, y.keySize, y.ivSize, P.salt, P.hasher);
            P.iv = F.iv;
            var R = B.encrypt.call(this, y, E, F.key, P);
            return R.mixIn(F), R;
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
          decrypt: function(y, E, H, P) {
            P = this.cfg.extend(P), E = this._parse(E, P.format);
            var F = P.kdf.execute(H, y.keySize, y.ivSize, E.salt, P.hasher);
            P.iv = F.iv;
            var R = B.decrypt.call(this, y, E, F.key, P);
            return R;
          }
        });
      }();
    });
  }(_e)), _e.exports;
}
var ge = { exports: {} }, Rn = ge.exports, ni;
function Sn() {
  return ni || (ni = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(Rn, function(e) {
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
  }(ge)), ge.exports;
}
var ve = { exports: {} }, kn = ve.exports, oi;
function $n() {
  return oi || (oi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(kn, function(e) {
      return e.mode.CTR = function() {
        var r = e.lib.BlockCipherMode.extend(), i = r.Encryptor = r.extend({
          processBlock: function(n, o) {
            var c = this._cipher, h = c.blockSize, l = this._iv, a = this._counter;
            l && (a = this._counter = l.slice(0), this._iv = void 0);
            var u = a.slice(0);
            c.encryptBlock(u, 0), a[h - 1] = a[h - 1] + 1 | 0;
            for (var d = 0; d < h; d++)
              n[o + d] ^= u[d];
          }
        });
        return r.Decryptor = i, r;
      }(), e.mode.CTR;
    });
  }(ve)), ve.exports;
}
var me = { exports: {} }, Hn = me.exports, ai;
function Tn() {
  return ai || (ai = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(Hn, function(e) {
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
            var l = this._cipher, a = l.blockSize, u = this._iv, d = this._counter;
            u && (d = this._counter = u.slice(0), this._iv = void 0), n(d);
            var x = d.slice(0);
            l.encryptBlock(x, 0);
            for (var f = 0; f < a; f++)
              c[h + f] ^= x[f];
          }
        });
        return r.Decryptor = o, r;
      }(), e.mode.CTRGladman;
    });
  }(me)), me.exports;
}
var Ce = { exports: {} }, Pn = Ce.exports, li;
function In() {
  return li || (li = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(Pn, function(e) {
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
var we = { exports: {} }, zn = we.exports, ci;
function Mn() {
  return ci || (ci = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(zn, function(e) {
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
var be = { exports: {} }, On = be.exports, hi;
function Wn() {
  return hi || (hi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(On, function(e) {
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
var ye = { exports: {} }, Ln = ye.exports, di;
function Vn() {
  return di || (di = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(Ln, function(e) {
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
var Ee = { exports: {} }, Nn = Ee.exports, fi;
function qn() {
  return fi || (fi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(Nn, function(e) {
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
var Be = { exports: {} }, jn = Be.exports, ui;
function Yn() {
  return ui || (ui = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(jn, function(e) {
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
var Ae = { exports: {} }, Un = Ae.exports, xi;
function Xn() {
  return xi || (xi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(Un, function(e) {
      return e.pad.NoPadding = {
        pad: function() {
        },
        unpad: function() {
        }
      }, e.pad.NoPadding;
    });
  }(Ae)), Ae.exports;
}
var De = { exports: {} }, Kn = De.exports, pi;
function Gn() {
  return pi || (pi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), tt());
    })(Kn, function(e) {
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
var Fe = { exports: {} }, Zn = Fe.exports, _i;
function Qn() {
  return _i || (_i = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), yt(), Et(), mt(), tt());
    })(Zn, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.BlockCipher, o = r.algo, c = [], h = [], l = [], a = [], u = [], d = [], x = [], f = [], _ = [], v = [];
        (function() {
          for (var m = [], C = 0; C < 256; C++)
            C < 128 ? m[C] = C << 1 : m[C] = C << 1 ^ 283;
          for (var b = 0, B = 0, C = 0; C < 256; C++) {
            var A = B ^ B << 1 ^ B << 2 ^ B << 3 ^ B << 4;
            A = A >>> 8 ^ A & 255 ^ 99, c[b] = A, h[A] = b;
            var D = m[b], T = m[D], y = m[T], E = m[A] * 257 ^ A * 16843008;
            l[b] = E << 24 | E >>> 8, a[b] = E << 16 | E >>> 16, u[b] = E << 8 | E >>> 24, d[b] = E;
            var E = y * 16843009 ^ T * 65537 ^ D * 257 ^ b * 16843008;
            x[A] = E << 24 | E >>> 8, f[A] = E << 16 | E >>> 16, _[A] = E << 8 | E >>> 24, v[A] = E, b ? (b = D ^ m[m[m[y ^ D]]], B ^= m[m[B]]) : b = B = 1;
          }
        })();
        var w = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], p = o.AES = n.extend({
          _doReset: function() {
            var m;
            if (!(this._nRounds && this._keyPriorReset === this._key)) {
              for (var C = this._keyPriorReset = this._key, b = C.words, B = C.sigBytes / 4, A = this._nRounds = B + 6, D = (A + 1) * 4, T = this._keySchedule = [], y = 0; y < D; y++)
                y < B ? T[y] = b[y] : (m = T[y - 1], y % B ? B > 6 && y % B == 4 && (m = c[m >>> 24] << 24 | c[m >>> 16 & 255] << 16 | c[m >>> 8 & 255] << 8 | c[m & 255]) : (m = m << 8 | m >>> 24, m = c[m >>> 24] << 24 | c[m >>> 16 & 255] << 16 | c[m >>> 8 & 255] << 8 | c[m & 255], m ^= w[y / B | 0] << 24), T[y] = T[y - B] ^ m);
              for (var E = this._invKeySchedule = [], H = 0; H < D; H++) {
                var y = D - H;
                if (H % 4)
                  var m = T[y];
                else
                  var m = T[y - 4];
                H < 4 || y <= 4 ? E[H] = m : E[H] = x[c[m >>> 24]] ^ f[c[m >>> 16 & 255]] ^ _[c[m >>> 8 & 255]] ^ v[c[m & 255]];
              }
            }
          },
          encryptBlock: function(m, C) {
            this._doCryptBlock(m, C, this._keySchedule, l, a, u, d, c);
          },
          decryptBlock: function(m, C) {
            var b = m[C + 1];
            m[C + 1] = m[C + 3], m[C + 3] = b, this._doCryptBlock(m, C, this._invKeySchedule, x, f, _, v, h);
            var b = m[C + 1];
            m[C + 1] = m[C + 3], m[C + 3] = b;
          },
          _doCryptBlock: function(m, C, b, B, A, D, T, y) {
            for (var E = this._nRounds, H = m[C] ^ b[0], P = m[C + 1] ^ b[1], F = m[C + 2] ^ b[2], R = m[C + 3] ^ b[3], k = 4, O = 1; O < E; O++) {
              var $ = B[H >>> 24] ^ A[P >>> 16 & 255] ^ D[F >>> 8 & 255] ^ T[R & 255] ^ b[k++], V = B[P >>> 24] ^ A[F >>> 16 & 255] ^ D[R >>> 8 & 255] ^ T[H & 255] ^ b[k++], L = B[F >>> 24] ^ A[R >>> 16 & 255] ^ D[H >>> 8 & 255] ^ T[P & 255] ^ b[k++], S = B[R >>> 24] ^ A[H >>> 16 & 255] ^ D[P >>> 8 & 255] ^ T[F & 255] ^ b[k++];
              H = $, P = V, F = L, R = S;
            }
            var $ = (y[H >>> 24] << 24 | y[P >>> 16 & 255] << 16 | y[F >>> 8 & 255] << 8 | y[R & 255]) ^ b[k++], V = (y[P >>> 24] << 24 | y[F >>> 16 & 255] << 16 | y[R >>> 8 & 255] << 8 | y[H & 255]) ^ b[k++], L = (y[F >>> 24] << 24 | y[R >>> 16 & 255] << 16 | y[H >>> 8 & 255] << 8 | y[P & 255]) ^ b[k++], S = (y[R >>> 24] << 24 | y[H >>> 16 & 255] << 16 | y[P >>> 8 & 255] << 8 | y[F & 255]) ^ b[k++];
            m[C] = $, m[C + 1] = V, m[C + 2] = L, m[C + 3] = S;
          },
          keySize: 256 / 32
        });
        r.AES = n._createHelper(p);
      }(), e.AES;
    });
  }(Fe)), Fe.exports;
}
var Re = { exports: {} }, Jn = Re.exports, gi;
function t0() {
  return gi || (gi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), yt(), Et(), mt(), tt());
    })(Jn, function(e) {
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
        ], d = [
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
            for (var w = this._key, p = w.words, m = [], C = 0; C < 56; C++) {
              var b = h[C] - 1;
              m[C] = p[b >>> 5] >>> 31 - b % 32 & 1;
            }
            for (var B = this._subKeys = [], A = 0; A < 16; A++) {
              for (var D = B[A] = [], T = a[A], C = 0; C < 24; C++)
                D[C / 6 | 0] |= m[(l[C] - 1 + T) % 28] << 31 - C % 6, D[4 + (C / 6 | 0)] |= m[28 + (l[C + 24] - 1 + T) % 28] << 31 - C % 6;
              D[0] = D[0] << 1 | D[0] >>> 31;
              for (var C = 1; C < 7; C++)
                D[C] = D[C] >>> (C - 1) * 4 + 3;
              D[7] = D[7] << 5 | D[7] >>> 27;
            }
            for (var y = this._invSubKeys = [], C = 0; C < 16; C++)
              y[C] = B[15 - C];
          },
          encryptBlock: function(w, p) {
            this._doCryptBlock(w, p, this._subKeys);
          },
          decryptBlock: function(w, p) {
            this._doCryptBlock(w, p, this._invSubKeys);
          },
          _doCryptBlock: function(w, p, m) {
            this._lBlock = w[p], this._rBlock = w[p + 1], f.call(this, 4, 252645135), f.call(this, 16, 65535), _.call(this, 2, 858993459), _.call(this, 8, 16711935), f.call(this, 1, 1431655765);
            for (var C = 0; C < 16; C++) {
              for (var b = m[C], B = this._lBlock, A = this._rBlock, D = 0, T = 0; T < 8; T++)
                D |= u[T][((A ^ b[T]) & d[T]) >>> 0];
              this._lBlock = A, this._rBlock = B ^ D;
            }
            var y = this._lBlock;
            this._lBlock = this._rBlock, this._rBlock = y, f.call(this, 1, 1431655765), _.call(this, 8, 16711935), _.call(this, 2, 858993459), f.call(this, 16, 65535), f.call(this, 4, 252645135), w[p] = this._lBlock, w[p + 1] = this._rBlock;
          },
          keySize: 64 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        function f(w, p) {
          var m = (this._lBlock >>> w ^ this._rBlock) & p;
          this._rBlock ^= m, this._lBlock ^= m << w;
        }
        function _(w, p) {
          var m = (this._rBlock >>> w ^ this._lBlock) & p;
          this._lBlock ^= m, this._rBlock ^= m << w;
        }
        r.DES = o._createHelper(x);
        var v = c.TripleDES = o.extend({
          _doReset: function() {
            var w = this._key, p = w.words;
            if (p.length !== 2 && p.length !== 4 && p.length < 6)
              throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            var m = p.slice(0, 2), C = p.length < 4 ? p.slice(0, 2) : p.slice(2, 4), b = p.length < 6 ? p.slice(0, 2) : p.slice(4, 6);
            this._des1 = x.createEncryptor(n.create(m)), this._des2 = x.createEncryptor(n.create(C)), this._des3 = x.createEncryptor(n.create(b));
          },
          encryptBlock: function(w, p) {
            this._des1.encryptBlock(w, p), this._des2.decryptBlock(w, p), this._des3.encryptBlock(w, p);
          },
          decryptBlock: function(w, p) {
            this._des3.decryptBlock(w, p), this._des2.encryptBlock(w, p), this._des1.decryptBlock(w, p);
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
var Se = { exports: {} }, e0 = Se.exports, vi;
function r0() {
  return vi || (vi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), yt(), Et(), mt(), tt());
    })(e0, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.StreamCipher, o = r.algo, c = o.RC4 = n.extend({
          _doReset: function() {
            for (var a = this._key, u = a.words, d = a.sigBytes, x = this._S = [], f = 0; f < 256; f++)
              x[f] = f;
            for (var f = 0, _ = 0; f < 256; f++) {
              var v = f % d, w = u[v >>> 2] >>> 24 - v % 4 * 8 & 255;
              _ = (_ + x[f] + w) % 256;
              var p = x[f];
              x[f] = x[_], x[_] = p;
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
          for (var a = this._S, u = this._i, d = this._j, x = 0, f = 0; f < 4; f++) {
            u = (u + 1) % 256, d = (d + a[u]) % 256;
            var _ = a[u];
            a[u] = a[d], a[d] = _, x |= a[(a[u] + a[d]) % 256] << 24 - f * 8;
          }
          return this._i = u, this._j = d, x;
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
var ke = { exports: {} }, i0 = ke.exports, mi;
function s0() {
  return mi || (mi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), yt(), Et(), mt(), tt());
    })(i0, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.StreamCipher, o = r.algo, c = [], h = [], l = [], a = o.Rabbit = n.extend({
          _doReset: function() {
            for (var d = this._key.words, x = this.cfg.iv, f = 0; f < 4; f++)
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
              u.call(this);
            for (var f = 0; f < 8; f++)
              v[f] ^= _[f + 4 & 7];
            if (x) {
              var w = x.words, p = w[0], m = w[1], C = (p << 8 | p >>> 24) & 16711935 | (p << 24 | p >>> 8) & 4278255360, b = (m << 8 | m >>> 24) & 16711935 | (m << 24 | m >>> 8) & 4278255360, B = C >>> 16 | b & 4294901760, A = b << 16 | C & 65535;
              v[0] ^= C, v[1] ^= B, v[2] ^= b, v[3] ^= A, v[4] ^= C, v[5] ^= B, v[6] ^= b, v[7] ^= A;
              for (var f = 0; f < 4; f++)
                u.call(this);
            }
          },
          _doProcessBlock: function(d, x) {
            var f = this._X;
            u.call(this), c[0] = f[0] ^ f[5] >>> 16 ^ f[3] << 16, c[1] = f[2] ^ f[7] >>> 16 ^ f[5] << 16, c[2] = f[4] ^ f[1] >>> 16 ^ f[7] << 16, c[3] = f[6] ^ f[3] >>> 16 ^ f[1] << 16;
            for (var _ = 0; _ < 4; _++)
              c[_] = (c[_] << 8 | c[_] >>> 24) & 16711935 | (c[_] << 24 | c[_] >>> 8) & 4278255360, d[x + _] ^= c[_];
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function u() {
          for (var d = this._X, x = this._C, f = 0; f < 8; f++)
            h[f] = x[f];
          x[0] = x[0] + 1295307597 + this._b | 0, x[1] = x[1] + 3545052371 + (x[0] >>> 0 < h[0] >>> 0 ? 1 : 0) | 0, x[2] = x[2] + 886263092 + (x[1] >>> 0 < h[1] >>> 0 ? 1 : 0) | 0, x[3] = x[3] + 1295307597 + (x[2] >>> 0 < h[2] >>> 0 ? 1 : 0) | 0, x[4] = x[4] + 3545052371 + (x[3] >>> 0 < h[3] >>> 0 ? 1 : 0) | 0, x[5] = x[5] + 886263092 + (x[4] >>> 0 < h[4] >>> 0 ? 1 : 0) | 0, x[6] = x[6] + 1295307597 + (x[5] >>> 0 < h[5] >>> 0 ? 1 : 0) | 0, x[7] = x[7] + 3545052371 + (x[6] >>> 0 < h[6] >>> 0 ? 1 : 0) | 0, this._b = x[7] >>> 0 < h[7] >>> 0 ? 1 : 0;
          for (var f = 0; f < 8; f++) {
            var _ = d[f] + x[f], v = _ & 65535, w = _ >>> 16, p = ((v * v >>> 17) + v * w >>> 15) + w * w, m = ((_ & 4294901760) * _ | 0) + ((_ & 65535) * _ | 0);
            l[f] = p ^ m;
          }
          d[0] = l[0] + (l[7] << 16 | l[7] >>> 16) + (l[6] << 16 | l[6] >>> 16) | 0, d[1] = l[1] + (l[0] << 8 | l[0] >>> 24) + l[7] | 0, d[2] = l[2] + (l[1] << 16 | l[1] >>> 16) + (l[0] << 16 | l[0] >>> 16) | 0, d[3] = l[3] + (l[2] << 8 | l[2] >>> 24) + l[1] | 0, d[4] = l[4] + (l[3] << 16 | l[3] >>> 16) + (l[2] << 16 | l[2] >>> 16) | 0, d[5] = l[5] + (l[4] << 8 | l[4] >>> 24) + l[3] | 0, d[6] = l[6] + (l[5] << 16 | l[5] >>> 16) + (l[4] << 16 | l[4] >>> 16) | 0, d[7] = l[7] + (l[6] << 8 | l[6] >>> 24) + l[5] | 0;
        }
        r.Rabbit = n._createHelper(a);
      }(), e.Rabbit;
    });
  }(ke)), ke.exports;
}
var $e = { exports: {} }, n0 = $e.exports, Ci;
function o0() {
  return Ci || (Ci = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), yt(), Et(), mt(), tt());
    })(n0, function(e) {
      return function() {
        var r = e, i = r.lib, n = i.StreamCipher, o = r.algo, c = [], h = [], l = [], a = o.RabbitLegacy = n.extend({
          _doReset: function() {
            var d = this._key.words, x = this.cfg.iv, f = this._X = [
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
              u.call(this);
            for (var v = 0; v < 8; v++)
              _[v] ^= f[v + 4 & 7];
            if (x) {
              var w = x.words, p = w[0], m = w[1], C = (p << 8 | p >>> 24) & 16711935 | (p << 24 | p >>> 8) & 4278255360, b = (m << 8 | m >>> 24) & 16711935 | (m << 24 | m >>> 8) & 4278255360, B = C >>> 16 | b & 4294901760, A = b << 16 | C & 65535;
              _[0] ^= C, _[1] ^= B, _[2] ^= b, _[3] ^= A, _[4] ^= C, _[5] ^= B, _[6] ^= b, _[7] ^= A;
              for (var v = 0; v < 4; v++)
                u.call(this);
            }
          },
          _doProcessBlock: function(d, x) {
            var f = this._X;
            u.call(this), c[0] = f[0] ^ f[5] >>> 16 ^ f[3] << 16, c[1] = f[2] ^ f[7] >>> 16 ^ f[5] << 16, c[2] = f[4] ^ f[1] >>> 16 ^ f[7] << 16, c[3] = f[6] ^ f[3] >>> 16 ^ f[1] << 16;
            for (var _ = 0; _ < 4; _++)
              c[_] = (c[_] << 8 | c[_] >>> 24) & 16711935 | (c[_] << 24 | c[_] >>> 8) & 4278255360, d[x + _] ^= c[_];
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function u() {
          for (var d = this._X, x = this._C, f = 0; f < 8; f++)
            h[f] = x[f];
          x[0] = x[0] + 1295307597 + this._b | 0, x[1] = x[1] + 3545052371 + (x[0] >>> 0 < h[0] >>> 0 ? 1 : 0) | 0, x[2] = x[2] + 886263092 + (x[1] >>> 0 < h[1] >>> 0 ? 1 : 0) | 0, x[3] = x[3] + 1295307597 + (x[2] >>> 0 < h[2] >>> 0 ? 1 : 0) | 0, x[4] = x[4] + 3545052371 + (x[3] >>> 0 < h[3] >>> 0 ? 1 : 0) | 0, x[5] = x[5] + 886263092 + (x[4] >>> 0 < h[4] >>> 0 ? 1 : 0) | 0, x[6] = x[6] + 1295307597 + (x[5] >>> 0 < h[5] >>> 0 ? 1 : 0) | 0, x[7] = x[7] + 3545052371 + (x[6] >>> 0 < h[6] >>> 0 ? 1 : 0) | 0, this._b = x[7] >>> 0 < h[7] >>> 0 ? 1 : 0;
          for (var f = 0; f < 8; f++) {
            var _ = d[f] + x[f], v = _ & 65535, w = _ >>> 16, p = ((v * v >>> 17) + v * w >>> 15) + w * w, m = ((_ & 4294901760) * _ | 0) + ((_ & 65535) * _ | 0);
            l[f] = p ^ m;
          }
          d[0] = l[0] + (l[7] << 16 | l[7] >>> 16) + (l[6] << 16 | l[6] >>> 16) | 0, d[1] = l[1] + (l[0] << 8 | l[0] >>> 24) + l[7] | 0, d[2] = l[2] + (l[1] << 16 | l[1] >>> 16) + (l[0] << 16 | l[0] >>> 16) | 0, d[3] = l[3] + (l[2] << 8 | l[2] >>> 24) + l[1] | 0, d[4] = l[4] + (l[3] << 16 | l[3] >>> 16) + (l[2] << 16 | l[2] >>> 16) | 0, d[5] = l[5] + (l[4] << 8 | l[4] >>> 24) + l[3] | 0, d[6] = l[6] + (l[5] << 16 | l[5] >>> 16) + (l[4] << 16 | l[4] >>> 16) | 0, d[7] = l[7] + (l[6] << 8 | l[6] >>> 24) + l[5] | 0;
        }
        r.RabbitLegacy = n._createHelper(a);
      }(), e.RabbitLegacy;
    });
  }($e)), $e.exports;
}
var He = { exports: {} }, a0 = He.exports, wi;
function l0() {
  return wi || (wi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), yt(), Et(), mt(), tt());
    })(a0, function(e) {
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
        function u(v, w) {
          let p = w >> 24 & 255, m = w >> 16 & 255, C = w >> 8 & 255, b = w & 255, B = v.sbox[0][p] + v.sbox[1][m];
          return B = B ^ v.sbox[2][C], B = B + v.sbox[3][b], B;
        }
        function d(v, w, p) {
          let m = w, C = p, b;
          for (let B = 0; B < c; ++B)
            m = m ^ v.pbox[B], C = u(v, m) ^ C, b = m, m = C, C = b;
          return b = m, m = C, C = b, C = C ^ v.pbox[c], m = m ^ v.pbox[c + 1], { left: m, right: C };
        }
        function x(v, w, p) {
          let m = w, C = p, b;
          for (let B = c + 1; B > 1; --B)
            m = m ^ v.pbox[B], C = u(v, m) ^ C, b = m, m = C, C = b;
          return b = m, m = C, C = b, C = C ^ v.pbox[1], m = m ^ v.pbox[0], { left: m, right: C };
        }
        function f(v, w, p) {
          for (let A = 0; A < 4; A++) {
            v.sbox[A] = [];
            for (let D = 0; D < 256; D++)
              v.sbox[A][D] = l[A][D];
          }
          let m = 0;
          for (let A = 0; A < c + 2; A++)
            v.pbox[A] = h[A] ^ w[m], m++, m >= p && (m = 0);
          let C = 0, b = 0, B = 0;
          for (let A = 0; A < c + 2; A += 2)
            B = d(v, C, b), C = B.left, b = B.right, v.pbox[A] = C, v.pbox[A + 1] = b;
          for (let A = 0; A < 4; A++)
            for (let D = 0; D < 256; D += 2)
              B = d(v, C, b), C = B.left, b = B.right, v.sbox[A][D] = C, v.sbox[A][D + 1] = b;
          return !0;
        }
        var _ = o.Blowfish = n.extend({
          _doReset: function() {
            if (this._keyPriorReset !== this._key) {
              var v = this._keyPriorReset = this._key, w = v.words, p = v.sigBytes / 4;
              f(a, w, p);
            }
          },
          encryptBlock: function(v, w) {
            var p = d(a, v[w], v[w + 1]);
            v[w] = p.left, v[w + 1] = p.right;
          },
          decryptBlock: function(v, w) {
            var p = x(a, v[w], v[w + 1]);
            v[w] = p.left, v[w + 1] = p.right;
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
var c0 = Qt.exports, bi;
function h0() {
  return bi || (bi = 1, function(s, t) {
    (function(e, r, i) {
      s.exports = r(K(), Ke(), on(), ln(), yt(), dn(), Et(), ts(), pr(), _n(), es(), mn(), wn(), yn(), _r(), An(), mt(), tt(), Sn(), $n(), Tn(), In(), Mn(), Wn(), Vn(), qn(), Yn(), Xn(), Gn(), Qn(), t0(), r0(), s0(), o0(), l0());
    })(c0, function(e) {
      return e;
    });
  }(Qt)), Qt.exports;
}
var d0 = h0(), $t;
const Ue = class Ue {
  constructor() {
    g(this, "pictures", {});
  }
  static use() {
    return Lt(this, $t) === void 0 && er(this, $t, new Ue()), Lt(this, $t);
  }
  // {md5: base64}
  savePicture(t) {
    const e = d0.MD5(t).toString();
    return this.pictures[e] ? console.log("cache targeted") : this.pictures[e] = t, e;
  }
  getPicture(t) {
    return this.pictures[t];
  }
};
$t = new WeakMap(), tr(Ue, $t);
let Yt = Ue;
const f0 = (s, t, e, r, i, n) => {
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
}, u0 = (s, t, e, r, i) => {
  if (t instanceof Object && t.type === "image") {
    let n = t.value;
    return t.valueType === "local" && (n = Yt.use().getPicture(n || "")), `> <img src="${n}" md5="${t.valueType === "local" ? t.value : ""}" value-type="${t.valueType}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: calc(100% - 2px); height: calc(100% - 2px);" /> </td>`;
  } else
    return `${(t == null ? void 0 : t.value) || JSON.stringify(t)} </td>`;
}, x0 = (s, t, e) => {
  const r = t.querySelector("img"), i = { type: "image", valueType: "url", value: "" };
  return r && r.getAttribute("src") && (i.value = r.getAttribute("src")), r && r.getAttribute("value-type") && (i.valueType = r.getAttribute("value-type"), i.value = r.getAttribute("md5") || ""), i;
};
class p0 extends Mi {
  constructor() {
    super(`${N}-select`);
    g(this, "_searchInput");
    g(this, "_content");
    g(this, "_width", 150);
    g(this, "_height", 320);
    g(this, "_position", "bottom-left");
    g(this, "_options", null);
    this._searchInput = I("input").on("input", (e) => {
      const r = e.target;
      this.query(r.value);
    }), this._content = I("ul", `${N}-select-content`), this._.append(
      I("div", `${N}-select-input`).append(this._searchInput),
      this._content
    );
  }
  async query(e) {
    this._options !== null && (this._content.html(""), await this._options(e).then((r) => {
      r && Array.isArray(r) && this._content.append(
        ...r.map((i) => {
          const n = I("li", "item").on("click", () => {
            this._changer(Array.isArray(i) ? { key: i[0], value: i[1] } : i), this.hide();
          });
          if (typeof i == "string")
            n.append(i);
          else if (Array.isArray(i)) {
            const [o, c, h] = i;
            n.append(c, i.length > 2 ? I("label").append(h) : "");
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
          let u = c, d = h + a;
          return (r === "top-right" || r === "bottom-right") && (u += l - this._width), (r === "top-right" || r === "top-left") && (d -= this._height + (e.height || 25) + 3), { top: d, left: u };
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
class Ct {
  constructor(t, e = !1) {
    g(this, "_");
    g(this, "_rect", null);
    g(this, "_target", null);
    this._ = I("div", `${N}-${t}`), e && this.show();
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
class _0 {
  constructor(t) {
    g(this, "_placement", "body");
    g(this, "_editable", !1);
    g(this, "paintFormatArea", null);
    g(this, "_ranges", []);
    g(this, "_rowHeaderRanges", []);
    g(this, "_colHeaderRanges", []);
    g(this, "_areas", []);
    g(this, "_focus", [0, 0]);
    // _focusBodyRange: Range | null = null;
    g(this, "_focusRange", null);
    g(this, "_focusArea", null);
    // for move
    g(this, "_move", [0, 0]);
    // shadow input
    g(this, "_shadowInput");
    g(this, "_shadowInputLock", !1);
    g(this, "_shadowInputInterval", null);
    g(this, "_copyRange", null);
    g(this, "_copyAreas", []);
    g(this, "_autofillRange", null);
    g(this, "_autofillAreas", []);
    g(this, "_autofillTrigger", (t) => {
    });
    this._editable = t, this._shadowInput = I("input", "sheet-editor-inputshadow"), this._shadowInput._.style.boxSizing = "border-box", this._shadowInput._.style.position = "relative", this._shadowInput._.style.zIndex = "10000", this._shadowInput._.style.width = "0", this._shadowInput._.style.height = "100%", this._shadowInput._.style.border = "none", this._shadowInput._.style.outline = "none", this._shadowInput._.style.padding = "0";
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
    const r = new Ct("selector", !0).rect(nr(t, 2)).target(e);
    this._placement === "body" && (r.append(
      I("div", "corner").attr("draggable", "false").on("mousedown", this._autofillTrigger)
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
      new Ct("selector-copy", !0).rect(nr(t, 2)).target(e)
    ), this;
  }
  addAutofillArea(t, e) {
    return this._autofillAreas.push(
      new Ct("selector-autofill", !0).rect(nr(t, 2)).target(e)
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
const g0 = { vertical: "height", horizontal: "width" };
class Bi {
  constructor(t, e) {
    g(this, "_");
    g(this, "_content");
    g(this, "_value", 0);
    g(this, "_maxValue", 0);
    g(this, "_lastOffset", 0);
    g(this, "_type");
    g(this, "_change", null);
    this._type = t, this._content = I("div", "content"), this._ = I("div", `${N}-scrollbar ${t}`).append(this._content).on("scroll.stop", (r) => {
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
      const r = g0[this._type];
      this._content.css(r, `${e}px`), this._.css(r, `${t}px`).show(), this._maxValue = e - t;
    } else
      this._.hide();
    return this;
  }
}
function v0(s) {
  s._vScrollbar = new Bi("vertical", s._container).change((t, e) => {
    Ts(s._data, t, e) && (s.render(), U.reset(s), kt.move(s));
  }), s._hScrollbar = new Bi("horizontal", s._container).change((t, e) => {
    Hs(s._data, t, e) && (s.render(), U.reset(s), kt.move(s));
  });
}
function m0(s) {
  const { x: t, y: e, height: r, width: i } = s._contentRect;
  s._vScrollbar && s._vScrollbar.resize(s._height(), r + e), s._hScrollbar && s._hScrollbar.resize(s._width(), i + t);
}
function C0(s, t, e) {
  if (!t) return;
  const { _selector: r, _vScrollbar: i, _hScrollbar: n, _data: o } = s, { viewport: c } = s._renderer;
  if (c && r) {
    const [, h, , l] = c.areas, a = l.range, u = h.range;
    if (i) {
      const d = (x, f, _) => {
        const v = s.rowsHeight(f, _ + 1);
        let w = 0;
        for (let p = x; w < v; p += 1)
          w += s.rowHeight(p);
        return w;
      };
      e ? t.endRow === e.endRow ? t.startRow < e.startRow ? t.startRow > u.endRow && t.startRow < a.startRow && i.scrollBy(-s.rowsHeight(t.startRow, a.startRow)) : t.startRow > e.startRow && // up-
      t.startRow >= a.endRow && i.scrollBy(
        d(a.startRow, a.endRow, t.startRow)
      ) : t.startRow === e.startRow && (t.endRow > e.endRow ? t.endRow >= a.endRow && i.scrollBy(
        d(a.startRow, a.endRow, t.endRow)
      ) : t.endRow < e.endRow && // down-
      t.endRow < a.startRow && i.scrollBy(-s.rowsHeight(t.endRow, a.startRow))) : t.endRow === o.rows.len - 1 ? i.scrollToEnd() : t.startRow === 0 ? i.scrollToStart() : t.endRow >= a.endRow ? i.scrollBy(d(a.startRow, a.endRow, t.endRow)) : t.startRow > u.endRow && t.startRow < a.startRow && i.scrollBy(-s.rowsHeight(t.startRow, a.startRow));
    }
    if (n) {
      const d = (x, f, _) => {
        const v = s.colsWidth(f, _ + 1);
        let w = 0;
        for (let p = x; w < v; p += 1)
          w += s.colWidth(p);
        return w;
      };
      e ? t.endCol === e.endCol ? t.startCol < e.startCol ? t.startCol > u.endCol && t.startCol < a.startCol && n.scrollBy(-s.colsWidth(t.startCol, a.startCol)) : t.startCol > e.startCol && // left-
      t.startCol >= a.endCol && n.scrollBy(
        d(a.startCol, a.endCol, t.startCol)
      ) : t.startCol === e.startCol && (t.endCol > e.endCol ? t.endCol >= a.endCol && n.scrollBy(
        d(a.startCol, a.endCol, t.endCol)
      ) : t.endCol < e.endCol && // right-
      t.endCol < a.startCol && n.scrollBy(-s.colsWidth(t.endCol, a.startCol))) : t.endCol === o.cols.len - 1 ? n.scrollToEnd() : t.startCol === 0 ? n.scrollToStart() : t.endCol >= a.endCol ? n.scrollBy(d(a.startCol, a.endCol, t.endCol)) : t.startCol > u.endCol && t.startCol < a.startCol && n.scrollBy(-s.colsWidth(t.startCol, a.startCol));
    }
  }
}
const Tt = {
  init: v0,
  resize: m0,
  autoMove: C0
};
function Ve(s, t, e) {
  s.addEventListener(t, e);
}
function Ne(s, t, e) {
  s.removeEventListener(t, e);
}
function w0(s, t, e) {
  const r = (i) => {
    e(i), Ne(s, "mousemove", t), Ne(s, "mouseup", r);
  };
  Ve(s, "mousemove", t), Ve(s, "mouseup", r);
}
class b0 {
  constructor() {
    g(this, "_events", /* @__PURE__ */ new Map());
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
function y0(s) {
  s._selector = new _0(!!s._editable).autofillTrigger(
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
function E0(s, t) {
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
function B0(s) {
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
function A0(s) {
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
function D0(s, t, e) {
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
    const c = r.width, h = i.height, l = (d, x) => {
      const f = d.clone();
      return (o === "all" || o === "row-header") && (f.endCol = x.endCol, d.startCol < x.startCol && (f.startCol = x.startCol)), (o === "all" || o === "col-header") && (f.endRow = x.endRow, d.startRow < x.startRow && (f.startRow = x.startRow)), f;
    }, a = ({ range: d }, x) => o === "body" ? d.intersects(x) : o === "col-header" ? d.intersectsCol(x.startCol, x.endCol) : o === "row-header" ? d.intersectsRow(x.startRow, x.endRow) : !0, u = (d, x, f) => {
      let _ = d.rect(x);
      return o === "col-header" ? (_ = d.rectCol(x.startCol, x.endCol), _.height += 2, (f === 2 || f === 3) && (_.y -= 2)) : o === "row-header" && (_ = d.rectRow(x.startRow, x.endRow), _.width += 2, (f === 0 || f === 3) && (_.x -= 2)), _;
    };
    n.areas.forEach((d, x) => {
      const f = e._areas[x], { _ranges: _, _focusRange: v, _copyRange: w, _autofillRange: p } = t;
      _.forEach((m, C) => {
        let b = a(d, m);
        const B = u(d, m, x);
        if (b)
          if (C === _.length - 1) {
            if ((o !== "all" || d.range.intersects(m)) && t.addAreaOutline(B, f), v) {
              d.range.intersects(v) && t.setFocusArea(d.rect(v), f);
              const A = l(m, d.range), D = A.difference(v);
              D.length > 0 ? D.forEach((T) => {
                b = a(d, T), b && t.addArea(d.rect(T), f);
              }) : (o !== "body" || !m.equals(v)) && t.addArea(u(d, A, x), f);
            }
          } else
            t.addArea(B, f);
      }), w && d.range.intersects(w) && t.addCopyArea(d.rect(w), f), p && d.range.intersects(p) && t.addAutofillArea(d.rect(p), f);
    }), n.headerAreas.forEach((d, x) => {
      const f = e._headerAreas[x], { width: _, height: v } = d;
      x <= 1 ? o === "row-header" || o === "all" ? t.addColHeaderArea({ x: 0, y: 0, width: _, height: h }, f) : t._colHeaderRanges.forEach((w) => {
        d.range.intersectsCol(w.startCol, w.endCol) && t.addColHeaderArea(d.rectCol(w.startCol, w.endCol), f);
      }) : o === "col-header" || o === "all" ? t.addRowHeaderArea({ x: 0, y: 0, width: c, height: v }, f) : t._rowHeaderRanges.forEach((w) => {
        d.range.intersectsRow(w.startRow, w.endRow) && t.addRowHeaderArea(d.rectRow(w.startRow, w.endRow), f);
      });
    });
  }
}
function F0(s, t) {
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
  if (F0(s, e)) return;
  (c = s._editor) == null || c.hide();
  const { _selector: i, _data: n } = s, { viewport: o } = s._renderer;
  if (i && o) {
    const { _focusRange: a } = i;
    if (a) {
      let { startRow: u, startCol: d, endRow: x, endCol: f } = a;
      const { rows: _, cols: v } = n;
      let [w, p] = i._move;
      t || (u = x = w, d = f = p);
      const m = (h = i.currentRange) == null ? void 0 : h.clone();
      r ? e === "up" ? w = Le(n, u - r, -1) : e === "down" ? w = Le(n, x + r, 1) : e === "left" ? p = Oe(n, d - r, -1) : e === "right" && (p = Oe(n, f + r, 1)) : e === "up" ? w = 0 : e === "down" ? w = _.len - 1 : e === "left" ? p = 0 : e === "right" && (p = v.len - 1), w >= 0 && w <= _.len - 1 && p >= 0 && p <= v.len - 1 && (t ? rs(s, w, p, !0) : (is(s, w, p), i._move = [w, p])), i.placement("body"), Tt.autoMove(s, i.currentRange, t ? void 0 : m), (l = s._selector) == null || l._shadowInputFocus(), Bt(s);
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
    const d = () => {
      u !== null && (clearInterval(u), u = null);
    }, x = (f) => {
      var m, C;
      let [_, v] = [0, 0];
      f.x > 0 && (_ = f.x - h), f.y > 0 && (v = f.y - l), o === "row-header" && (_ = 1), o === "col-header" && (v = 1);
      const w = (m = i.currentRange) == null ? void 0 : m.clone(), { target: p } = f;
      if ((p == null ? void 0 : p.tagName) === "CANVAS") {
        const b = (C = n.viewport) == null ? void 0 : C.cellAt(_, v);
        if (b) {
          const { row: B, col: A } = b;
          (B != c.row || A !== c.col) && (t(B, A), o === "body" && Tt.autoMove(s, e(i), w), Bt(s), c.row = B, c.col = A);
        }
        d();
      } else if (u === null) {
        const b = f.x - a[0], B = f.y - a[1];
        b >= 0 && B >= 0 && (u = window.setInterval(() => {
          const A = e(i);
          if (A) {
            const { endRow: D, endCol: T } = A;
            b > B ? (hr(s, !1, "right", 1), s.isLastRow(D) && d()) : (hr(s, !1, "down", 1), s.isLastCol(T) && d());
          }
        }, 120));
      }
      a = [f.x, f.y];
    };
    w0(
      document.body,
      (f) => x(f),
      () => {
        d(), r(i);
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
function R0(s, t) {
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
function S0(s) {
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
function k0(s) {
  const { _selector: t } = s;
  if (s._copyable && t) {
    const e = {}, r = t.currentRange;
    r && (ns(s), ["text/plain", "text/html"].forEach((i) => {
      const n = r.toString(), o = i === "text/html" ? s.toHtml(n) : R0(s, n);
      e[i] = new Blob([o], { type: i });
    }), navigator.clipboard.write([new ClipboardItem(e)]).then());
  }
}
function $0(s, t, e) {
  navigator.clipboard.read().then((r) => {
    var i, n, o, c, h;
    if (r.length > 0) {
      s.addHistory("paste value");
      const l = r[0];
      t || (t = !Ai(l, "text/html", (a) => {
        s.fill(a).render();
      })), t && Ai(l, "text/plain", (a) => {
        s.fill(S0(a)).render();
      }), e && ((i = s._selector) != null && i._copyRange && ((o = (n = s._selector) == null ? void 0 : n._copyRange) == null || o.each((a, u) => {
        s._cells.remove(a, u);
      }), cr(s._data, (h = (c = s._selector) == null ? void 0 : c._copyRange) == null ? void 0 : h.toString())), os(s));
    }
  });
}
function H0(s, t) {
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
function T0(s, t) {
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
function P0(s, t) {
  if (s._selector) {
    s.addHistory("set cell style");
    const { _ranges: e } = s._selector;
    e.forEach((r) => {
      r && r.each((i, n) => s.setStyle(i, n, t));
    }), s.render(), s._canvas.focus();
  }
}
function I0(s, t) {
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
function z0(s) {
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
function M0(s) {
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
function O0(s, t) {
  if (s._selector) {
    s.addHistory(`insert ${t}`), t === "row" ? s._data.rows.len++ : s._data.cols.len++, Ye(s), s.resize();
    const { _ranges: e } = s._selector, { startRow: r, startCol: i } = e[0], n = Ui(s.data()), o = ji(s.data());
    s._data.merges = s._data.merges.map((c) => {
      const h = c.split(":");
      let [l, a] = et(h[0]), [u, d] = et(h[1]);
      return t === "row" ? (a >= r && a++, d >= r && d++) : (l >= i && l++, u >= i && u++), `${Q(l, a)}:${Q(u, d)}`;
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
function W0(s, t) {
  if (s._selector) {
    s.addHistory(`delete ${t}`);
    const { _ranges: e } = s._selector, { startRow: r, startCol: i, endRow: n, endCol: o } = e[0], c = n - r + 1, h = o - i + 1, l = Ui(s.data()), a = ji(s.data()), u = {};
    s._data.merges = s._data.merges.map((d) => {
      const x = d.split(":");
      let [f, _] = et(x[0]), [v, w] = et(x[1]);
      if (t === "row") {
        if (_ >= r && w <= n) return null;
        u[`${_}-${f}`] = !0, _ > r && (_ -= c), w > r && (w -= c);
      } else {
        if (f >= i && v <= o) return null;
        u[`${_}-${f}`] = !0, f > r && (f -= h), v > r && (v -= h);
      }
      return `${Q(f, _)}:${Q(v, w)}`;
    }).filter((d) => !!d), t === "row" ? r <= l && (s._cells._.forEach((d, x) => {
      if (d) {
        const [f, _, v] = d;
        f >= r && f <= n ? u[`${f}-${_}`] || (s._cells._[x] = null) : f > r && (d[0] -= c);
      }
    }), s._cells._ = s._cells._.filter((d) => !!d)) : i <= a && (s._cells._.forEach((d, x) => {
      if (d) {
        const [f, _, v] = d;
        _ >= i && _ <= o ? u[`${f}-${_}`] || (s._cells._[x] = null) : f > i && (d[1] -= h);
      }
    }), s._cells._ = s._cells._.filter((d) => !!d)), t === "row" ? s._data.rows.len -= c : s._data.cols.len -= h, Ye(s), s.resize(), s._cells.resetIndexes(), s.render();
  }
}
function L0(s, t) {
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
function V0(s) {
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
function N0(s) {
  s.isMerged() ? s.unmerge() : s.merge(), s.render();
}
function q0(s) {
  if (s._data.freeze)
    s.freeze();
  else if (s._selector) {
    const { _ranges: t } = s._selector;
    t.length > 0 && s.freeze(Q(t[0].startCol, t[0].startRow));
  }
  s.render();
}
function j0(s) {
  var t;
  if (s._selector) {
    s.addHistory("set paintFormat");
    const e = s._selector.paintFormatArea;
    if (e) {
      const { startCol: r, startRow: i, endCol: n, endRow: o } = e, c = n - r + 1, h = o - i + 1, l = {}, a = {};
      e.each((u, d) => {
        const x = s.cell(u, d), f = s.getPureStyle(u, d);
        l[`${u - i}-${d - r}`] = { ...f }, typeof x == "object" && (a[`${u - i}-${d - r}`] = x);
      });
      for (const u of s._selector._ranges) {
        const { startCol: d, startRow: x, endCol: f, endRow: _ } = u;
        u.each((v, w) => {
          const p = `${(v - x) % h}-${(w - d) % c}`, m = s.cell(v, w);
          if (a[p]) {
            const C = JSON.parse(JSON.stringify(a[p]));
            C.style = void 0, m instanceof Object ? C.value = (m == null ? void 0 : m.value) || "" : C.value = m, s.cell(v, w, C), s.setStyle(v, w, { ...l[p] }, !0);
          }
        });
      }
    }
    (t = s._selector) == null || t.clearCopy(), s._selector.paintFormatArea = null, s.render();
  }
}
const U = {
  init: y0,
  setCellStyle: P0,
  fastSetCellStyle: I0,
  fastClearCellStyle: z0,
  fastClearCellFormat: M0,
  fastSetCellFormat: H0,
  fastSetCellFixed: T0,
  setCellValue: E0,
  clearCellValue: B0,
  clearCell: A0,
  addRange: rs,
  unionRange: is,
  reset: Bt,
  move: hr,
  bindMousemove: ss,
  showCopy: ns,
  clearCopy: os,
  copyValue: k0,
  pasteValue: $0,
  insertRowOrCol: O0,
  deleteRowOrCol: W0,
  isInRange: D0,
  setBorder: L0,
  clearBorder: V0,
  mergeGrid: N0,
  freezeGrid: q0,
  paintFormat: j0
};
function Y0(s, t) {
  const e = bt(t), { _editors: r } = s;
  let i = r.get(e);
  if (!i) {
    const n = xt.use();
    if (n.options[e] && n.options[e].editor) {
      const o = n.options[e].editor, c = o();
      c && (r.set(e, c), i = r.get(e));
    }
  }
  return s._emitter.emit("getChanger", e, t), i == null || i.changer((n) => {
    n !== void 0 && (s.addHistory("edit"), typeof n == "number" || n ? U.setCellValue(s, n) : U.clearCellValue(s));
  }), i == null || i.moveChanger((n) => {
    const { _selector: o } = s;
    o && (n !== "none" && U.move(s, !0, n, 1), s._canvas.focus());
  }), i;
}
function U0(s) {
  const { _editor: t, _selector: e, _renderer: r } = s;
  if (t && e) {
    const { _focusArea: i, _focus: n } = e;
    if (t.visible && i) {
      const { _rect: o, _target: c } = i, { viewport: h } = r;
      o && c && h && h.inAreas(...n) ? t.rect(o).target(c).show() : t.rect({ x: -100, y: -100, width: 0, height: 0 }).hide();
    }
  }
}
function X0(s, t) {
  const { _selector: e } = s;
  if (e) {
    const { _focusRange: r, _focusArea: i } = e;
    if (r && i) {
      const { _rect: n, _target: o } = i, { startRow: c, startCol: h } = r, l = s.cell(c, h), a = Y0(s, l);
      s._editor = a, a && n && o && (l && a.value(l), a.cellIndex(c, h).rect(n).target(o).show(t));
    }
  }
}
const kt = {
  move: U0,
  reset: X0
}, K0 = (s, t, e, r, i) => `options=${JSON.stringify(t.options)} >${s.cellValueString(e, r)}</td>`, G0 = (s, t, e) => {
  let r = [];
  const i = t.getAttribute("options");
  if (i)
    try {
      r = JSON.parse(i);
    } catch (n) {
      console.error(n);
    }
  return { type: "select", value: t.innerText, options: r };
}, Z0 = (s, t, e, r, i, n, o, c) => {
  const h = t;
  c || (c = Ge(h, r, n));
  const l = () => c ? (h.options || []).findIndex(($) => $ === c) !== -1 : !0, {
    fontSize: a,
    fontFamily: u,
    bold: d,
    italic: x,
    color: f,
    align: _,
    valign: v,
    underline: w,
    strikethrough: p,
    textwrap: m,
    padding: C
  } = r;
  s.save().beginPath().prop({
    textAlign: _,
    textBaseline: v,
    font: Zi(u, a, x, d),
    fillStyle: f
  });
  const b = 8, [B, A] = C || [5, 5], D = Gi(_, e.width, B), T = c.split(`
`), y = e.width - B * 2, E = [];
  T.forEach(($) => {
    const V = s.measureTextWidth($);
    if (m && V > y) {
      let L = { w: 0, len: 0, start: 0 };
      for (let S = 0; S < $.length; S += 1)
        L.w > y && (E.push($.slice(L.start, S)), L = { w: 0, len: 0, start: S }), L.len++, L.w += s.measureTextWidth($[S]) + 1;
      L.len > 0 && E.push($.slice(L.start));
    } else
      E.push($);
  });
  const H = a / 0.75, P = (E.length - 1) * H, F = [];
  w && F.push("underline"), p && F.push("strikethrough");
  let R = Xi(v, e.height, P, H, A), k = 0;
  const O = (E.length > 0 ? E.length : 1) * H;
  return E.forEach(($) => {
    const V = s.measureTextWidth($);
    k = Math.max(k, V), s.fillText($, D, R), s.beginPath(), Q0({ x: y, y: R }, b, !0).forEach(
      (L, S) => {
        S === 0 ? s.moveTo(L.x, L.y) : s.lineTo(L.x, L.y);
      }
    ), s.closePath(), l() ? s._ctx.fillStyle = "#939495" : s._ctx.fillStyle = "red", s.fill(), F.forEach((L) => {
      s._ctx.strokeStyle = f, s.line(...Ki(L, _, v, D, R, V, a));
    }), R += H;
  }), s.restore(), {
    contentInfo: {
      width: k,
      height: O + 10
    }
  };
}, Q0 = (s, t = 10, e = !1) => {
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
}, J0 = (s, t, e, r) => {
  r.clientX > e.x + (e.width - 15) && setTimeout(() => {
    kt.reset(s);
  }, 0);
}, bt = (s) => s instanceof Object && s.type && s.type in xt.use().options ? s.type : "text", to = [
  {
    type: "text",
    toHtml: Xs,
    fromHtml: Ks,
    toCanvas: Qi,
    editor: () => new Gs()
  },
  {
    type: "select",
    toHtml: K0,
    fromHtml: G0,
    toCanvas: Z0,
    editor: () => new p0(),
    clickEvent: J0
  },
  {
    type: "image",
    disableAutoFillAction: !0,
    toHtml: u0,
    toCanvas: f0,
    fromHtml: x0
  }
];
var Ht;
const Xe = class Xe {
  constructor() {
    g(this, "options", {});
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
let xt = Xe;
function ut(s, t, e, r = !1) {
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
      let u = [], d = 1;
      l[0] === "thick" ? d = 3 : l[0] === "medium" ? d = 2 : l[0] === "dotted" ? u = [1, 1] : l[0] === "dashed" && (u = [2, 2]);
      let x = 0;
      r && (x = d / 2);
      let f;
      d === 1 ? f = h(a, x).map(
        (_) => _ += 0.5
      ) : f = h(a, x), s.prop({ strokeStyle: l[1], lineWidth: d }).setLineDash(u).line(...f);
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
  const h = xt.use().getRender(c).toCanvas(s, t, e, r, i, n, o);
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
    i += 0.5, n += 0.5, s.translate(e, r).line(i, 0, i, n).line(0, n, i, n);
  });
}
function eo(s, t, e, r, i, n, o, c) {
  const h = [n, o];
  i === "outside" || i === "all" ? ut(s, r, h, !0) : i === "left" ? ut(s, r, { left: h }, c) : i === "top" ? ut(s, r, { top: h }, c) : i === "right" ? ut(s, r, { right: h }, c) : i === "bottom" && ut(s, r, { bottom: h }, c), (i === "all" || i === "inside" || i === "horizontal" || i === "vertical") && (i !== "horizontal" && e.eachCol((l) => {
    if (l < e.endCol) {
      const a = e.clone();
      a.endCol = a.startCol = l, a.intersects(t.range) && ut(
        s,
        t.rect(a),
        { right: h },
        c
      );
    }
  }), i !== "vertical" && e.eachRow((l) => {
    if (l < e.endRow) {
      const a = e.clone();
      a.endRow = a.startRow = l, a.intersects(t.range) && ut(
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
function io(s, t, e) {
  if (!e) return;
  const { scrollX: r, scrollY: i } = e, n = e.width, o = e.height, c = (() => {
    const l = [];
    let a = n;
    return r < n ? a -= r : a -= r % n, t.colMap.forEach((u) => {
      a < u.width ? (l.push(u.x), a = n - u.width) : a -= u.width;
    }), l;
  })(), h = (() => {
    const l = [];
    let a = o;
    return i < o ? a -= i : a -= i % o, t.rowMap.forEach((u) => {
      a < u.height ? (l.push(u.y), a = o - u.height) : a -= u.height;
    }), l;
  })();
  c.forEach((l) => {
    ut(
      s,
      {
        x: t.x + l,
        y: t.y,
        width: 0,
        height: t.height
      },
      {
        right: ["dashed", "#0288d1"]
      }
    );
  }), h.forEach((l) => {
    ut(
      s,
      {
        x: t.x,
        y: t.y + l,
        width: t.width,
        height: 0
      },
      {
        bottom: ["dashed", "#0288d1"]
      }
    );
  });
}
function vt(s, t, e, r) {
  if (!e) return;
  let i, n, o = (b, B, A) => A, c = r._headerStyle, h = r._headerGridline, l = r._styles, a, u, d, x;
  const { _rowHeader: f, _colHeader: _ } = r;
  if (s === "row-header") {
    if (f.width <= 0) return;
    ({ cell: i, merges: a, cellRenderer: n } = f);
  } else if (s === "col-header") {
    if (_.height <= 0) return;
    ({ cell: i, merges: a, cellRenderer: n } = _);
  } else
    i = r._cell, n = r._cellRenderer, o = r._formatter, c = r._style, h = r._gridline, l = r._styles, a = r._merges, u = r._borders, d = r._row, x = r._col;
  t.save().translate(e.x, e.y).prop("fillStyle", r._bgcolor).rect(0, 0, e.width, e.height).fill().clip();
  const v = (b, B, A) => {
    const D = { ...c };
    if (d) {
      const T = d(b);
      T && T.style !== void 0 && Object.assign(D, l[T.style]);
    }
    if (x) {
      const T = x(B);
      T && T.style !== void 0 && Object.assign(D, l[T.style]);
    }
    return A instanceof Object && A.style !== void 0 && Object.assign(D, l[A.style]), D;
  }, w = [], p = [], m = /* @__PURE__ */ new Set();
  a && ks(a, (b) => {
    if (b.intersects(e.range)) {
      const B = i(b.startRow, b.startCol), A = v(b.startRow, b.startCol, B), D = e.rect(b);
      p.push([B, D, A]), w.push(b), b.each((T, y) => {
        m.add(`${T}_${y}`);
      });
    }
  });
  const C = (b, B, A) => {
    if (s === "body")
      return Fi(t, h, B), Di(t, b, B, A, n, o, s);
    Di(t, b, B, A, n, o, s), Fi(t, h, B);
  };
  e.each((b, B, A) => {
    var D;
    if (r._activeRowHeight[b] || (r._activeRowHeight[b] = []), !m.has(`${b}_${B}`)) {
      const T = i(b, B), y = v(b, B, T), E = C(T, A, y);
      y.textwrap && E && E.contentInfo && (r._activeRowHeight[b][B] = ((D = E.contentInfo) == null ? void 0 : D.height) || 0), y.textwrap || (r._activeRowHeight[b][B] = 0);
    }
  }), p.forEach((b) => C(...b)), ro(t, e, u, w), t.restore();
}
function so(s) {
  const {
    _width: t,
    _height: e,
    _target: r,
    _scale: i,
    _viewport: n,
    _freeze: o,
    _rowHeader: c,
    _colHeader: h,
    _printInfo: l
  } = s;
  if (n) {
    const a = new Ss(r, i);
    a.size(t, e);
    const [u, d, x, f] = n.areas, [_, v, w, p] = n.headerAreas;
    vt("body", a, f, s), vt("body", a, u, s), vt("col-header", a, _, s), vt("body", a, x, s), vt("row-header", a, p, s), vt("body", a, d, s), vt("col-header", a, v, s), vt("row-header", a, w, s);
    const [m, C] = o;
    (C > 0 || m > 0) && dr(a, s._freezeGridline, () => {
      C > 0 && a.line(0, f.y, t, f.y), m > 0 && a.line(f.x, 0, f.x, e);
    });
    const { x: b, y: B } = d;
    if (b > 0 && B > 0) {
      const { height: A } = h, { width: D } = c, { bgcolor: T } = s._headerStyle;
      T && a.save().prop({ fillStyle: T }).rect(0, 0, D, A).fill().restore(), dr(a, s._headerGridline, () => {
        a.line(0, A, D, A).line(D, 0, D, A);
      });
    }
    io(a, f, l);
  }
}
class dt {
  constructor(t, e, r, i, n, o, c) {
    // { rowIndex: { y, height }}
    g(this, "rowMap", /* @__PURE__ */ new Map());
    // { colIndex: { x, width }}
    g(this, "colMap", /* @__PURE__ */ new Map());
    g(this, "cellAtCache", null);
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
class no {
  constructor(t) {
    /**
     * [area1, area2, area3, area4]
     * -----------------------
     * |  area-2   |   area-1
     * |-----------|----------
     * |  area-3   |   area-4
     * -----------------------
     */
    g(this, "areas");
    /**
     * [area1, area21, area23, area3]
     *             |   area-21   | area-1
     * ------------|-----------------------
     *   area-23   |   body
     * ------------|
     *   area-3    |
     */
    g(this, "headerAreas");
    g(this, "_render");
    this._render = t;
    const [e, r] = [t._rowHeader.width, t._colHeader.height], [i, n] = t._freeze, { _startRow: o, _startCol: c, _rows: h, _cols: l, _width: a, _height: u } = t, d = (k) => t.rowHeightAt(k), x = (k) => t.colWidthAt(k), f = dt.create(
      o,
      c,
      i - 1,
      n - 1,
      e,
      r,
      0,
      0,
      d,
      x
    ), [_, v] = [i + t._scrollRows, n + t._scrollCols];
    let w = f.height + r, p = _;
    for (; w < u && p < h; )
      w += d(p), p += 1;
    let m = f.width + e, C = v;
    for (; m < a && C < l; )
      m += x(C), C += 1;
    const b = e + f.width, B = r + f.height;
    let A = a - b, D = u - B;
    C === l && (A -= a - m), p === h && (D -= u - w), C -= 1, p -= 1;
    const T = dt.create(
      _,
      v,
      p,
      C,
      b,
      B,
      A,
      D,
      d,
      x
    ), y = dt.create(
      o,
      v,
      i - 1,
      C,
      b,
      r,
      A,
      0,
      d,
      x
    ), E = dt.create(
      _,
      c,
      p,
      n - 1,
      e,
      B,
      0,
      D,
      d,
      x
    );
    this.areas = [y, f, E, T];
    const { _rowHeader: H, _colHeader: P } = t, F = () => P.height / P.rows, R = () => H.width / H.cols;
    this.headerAreas = [
      dt.create(
        0,
        y.range.startCol,
        P.rows - 1,
        y.range.endCol,
        T.x,
        0,
        T.width,
        0,
        F,
        x
      ),
      dt.create(
        0,
        f.range.startCol,
        P.rows - 1,
        f.range.endCol,
        f.x,
        0,
        f.width,
        0,
        F,
        x
      ),
      dt.create(
        f.range.startRow,
        0,
        f.range.endRow,
        H.cols - 1,
        0,
        f.y,
        0,
        f.height,
        d,
        R
      ),
      dt.create(
        E.range.startRow,
        0,
        E.range.endRow,
        H.cols - 1,
        0,
        T.y,
        0,
        T.height,
        d,
        R
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
    g(this, "_target");
    g(this, "_bgcolor", "#ffffff");
    // table width
    g(this, "_width", 0);
    // table height
    g(this, "_height", 0);
    g(this, "_scale", 1);
    // the count of rows
    g(this, "_rows", 100);
    // the count of cols;
    g(this, "_cols", 26);
    // the row height (px)
    g(this, "_rowHeight", 22);
    // the column width (px)
    g(this, "_colWidth", 100);
    // row of the start position in table
    g(this, "_startRow", 0);
    // col of the start position in table
    g(this, "_startCol", 0);
    // count of rows scrolled
    g(this, "_scrollRows", 0);
    // count of cols scrolled
    g(this, "_scrollCols", 0);
    g(this, "_printInfo");
    /**
     * get row given rowIndex
     * @param {int} rowIndex
     * @returns Row | undefined
     */
    g(this, "_row", () => {
    });
    /**
     * get col given colIndex
     * @param {int} coIndex
     * @returns Row | undefined
     */
    g(this, "_col", () => {
    });
    /**
     * get cell given rowIndex, colIndex
     * @param {int} rowIndex
     * @param {int} colIndex
     * @returns Cell | string
     */
    g(this, "_cell", () => {
    });
    g(this, "_cellRenderer", () => !0);
    g(this, "_formatter", (t, e, r) => r);
    g(this, "_merges", []);
    g(this, "_borders", []);
    g(this, "_styles", []);
    g(this, "_gridline", {
      width: 1,
      color: "#e6e6e6"
    });
    g(this, "_style", {
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
    g(this, "_rowHeader", {
      width: 60,
      cols: 1,
      cell(t, e) {
        return t + 1;
      }
    });
    // column header
    g(this, "_colHeader", {
      height: 24,
      rows: 1,
      cell(t, e) {
        return zi(e);
      }
    });
    g(this, "_headerGridline", {
      width: 1,
      color: "#e6e6e6"
    });
    g(this, "_headerStyle", {
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
    g(this, "_freeze", [0, 0]);
    g(this, "_freezeGridline", {
      width: 2,
      color: "#d8d8d8"
    });
    // it can be used after rendering
    g(this, "_viewport", null);
    g(this, "_activeRowHeight", {});
    const i = typeof t == "string" ? document.querySelector(t) : t;
    if (!i) throw new Error("target error");
    this._target = i, this._width = e, this._height = r;
  }
  render() {
    return this._viewport = new no(this), so(this), this;
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
  printInfo(t) {
    return this._printInfo = t, this;
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
    g(this, "_");
    g(this, "_hover");
    g(this, "_line");
    g(this, "_type");
    g(this, "_minValue");
    g(this, "_lineLength");
    g(this, "_cell", null);
    g(this, "_change");
    this._type = t, this._minValue = r, this._lineLength = i, this._change = n, this._ = I("div", `${N}-resizer ${t}`).append(
      this._hover = I("div", "hover").on(
        "mousedown.stop",
        (o) => oo(this, o)
      ),
      this._line = I("div", "line")
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
function oo(s, t) {
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
function ao(s) {
  s._rowResizer = new Ri(
    "row",
    s._container,
    s._minRowHeight,
    () => s._width(),
    (t, { row: e, height: r }) => {
      s.rowHeight(e, r + t).render(), U.reset(s), s._canvas.focus();
    }
  ), s._colResizer = new Ri(
    "col",
    s._container,
    s._minColWidth,
    () => s._height(),
    (t, { col: e, width: r }) => {
      s.colWidth(e, r + t).render(), U.reset(s), s._canvas.focus();
    }
  );
}
const lo = {
  init: ao
};
function co(s, t) {
  let e = '<table xmlns="http://www.w3.org/1999/xhtml" style="border-spacing: 0; border-collapse: collapse;">';
  const r = X.with(t), i = s._data.merges.map((c) => X.with(c)).filter((c) => c.intersects(r)), n = (c, h) => c === "dashed" || c === "dotted" ? `1px ${c} ${h}` : `${c === "thick" ? 3 : c === "medium" ? 2 : 1}pt solid ${h}`, o = /* @__PURE__ */ new Map();
  for (const c of s._data.borders) {
    const [h, l, a, u] = c, d = X.with(h);
    if (d.intersects(r)) {
      const { startRow: x, startCol: f, endRow: _, endCol: v } = d;
      d.each((w, p) => {
        const m = n(a, u), C = [];
        l === "all" && C.push("border"), (l === "outside" || l === "left") && p === f && C.push("border-left"), (l === "outside" || l === "right") && p === v && C.push("border-right"), (l === "outside" || l === "top") && w === x && C.push("border-top"), (l === "outside" || l === "bottom") && w === _ && C.push("border-bottom"), (l === "inside" || l === "vertical") && p >= f && p < v && C.push("border-right"), (l === "inside" || l === "horizontal") && w >= x && w < _ && C.push("border-bottom"), C.length > 0 && o.set(
          `${w}_${p}`,
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
      let u = !1, [d, x] = [1, 1];
      for (const f of i) {
        if (f.startRow === c && f.startCol === h) {
          d = f.rows + 1, x = f.cols + 1;
          break;
        }
        if (f.intersects(a)) {
          u = !0;
          break;
        }
      }
      if (!u) {
        const f = bt(l);
        e += "<td", d > 1 && (e += ` rowspan="${d}"`), x > 1 && (e += ` colspan="${x}"`), e += ` cellType="${f}"`;
        let _ = "";
        const v = `${c}_${h}`;
        o.has(v) && (_ += o.get(v)), l && l instanceof Object && l.style !== void 0 && (_ += fo(s.style(l.style, !0))), e += `style="${_ ? `${_};` : ""} position: relative; padding: 0 5px;"`;
        const w = bt(l);
        e += xt.use().getRender(w).toHtml(s, l, c, h, e);
      }
    }), e += "</tr>";
  }), `${e}</tbody></table>`;
}
function ho(s, t, [e, r]) {
  const i = [0, 0];
  if (t && t.includes("</table>")) {
    const { _data: n } = s, o = n.style, c = document.createElement("template");
    c.innerHTML = t;
    const h = [], l = c.content.querySelectorAll("tr");
    i[0] = e + l.length - 1;
    const a = [];
    if (l.forEach((u, d) => {
      const x = u.querySelectorAll("td");
      d === 0 && (i[1] = r + x.length - 1);
      let f = null;
      const _ = [];
      for (const [w, p] of x.entries()) {
        let [m, C] = [d + e, w + r];
        h.length > 0 && h.forEach((F) => {
          F.containsRow(m) && F.startCol <= C && (C += F.cols, F.startRow !== m && (C += 1));
        });
        const b = Q(C, m);
        let [B, A] = [1, 1];
        if (Si(p, "rowspan", (F) => B = Number.parseInt(F)), Si(p, "colspan", (F) => A = Number.parseInt(F)), B > 1 || A > 1) {
          const F = X.create(m, C, m + B - 1, C + A - 1);
          s.merge(F.toString()), h.push(F);
        }
        d === 0 && (i[1] += A - 1);
        const D = {};
        lt(p, "background-color", "", (F) => D.bgcolor = F), lt(p, "color", o.color, (F) => D.color = F), lt(
          p,
          "text-align",
          o.align,
          (F) => D.align = F
        ), lt(
          p,
          "vertical-align",
          o.valign,
          (F) => D.valign = F
        ), Zt(
          p,
          "white-space",
          "normal",
          (F) => D.textwrap = !0
        ), Zt(
          p,
          "text-decoration",
          "underline",
          (F) => D.underline = !0
        ), Zt(
          p,
          "text-decoration",
          "line-through",
          (F) => D.strikethrough = !0
        ), Zt(p, "font-style", "italic", (F) => D.italic = !0), lt(p, "font-weight", "normal", (F) => {
          (F === "bold" || Number.parseInt(F) >= 700) && (D.bold = !0);
        }), lt(
          p,
          "font-family",
          o.fontFamily,
          (F) => D.fontFamily = F
        ), lt(
          p,
          "font-size",
          o.fontSize,
          (F) => D.fontSize = Number.parseInt(F)
        );
        const T = (F) => {
          const [R, k, ...O] = F.split(" ").map((V) => V.trim());
          let $ = "thin";
          if (k === "solid") {
            let V = Number.parseInt(R);
            R.includes("pt") && (V = Ws(Number.parseInt(R))), V === 2 ? $ = "medium" : V === 3 && ($ = "thick");
          } else
            $ = k;
          return [$, O.join("")];
        }, y = [];
        let E = null;
        lt(p, "border-width", "", (F) => y.push(F)), lt(p, "border-style", "", (F) => y.push(F)), lt(p, "border-color", "", (F) => y.push(F)), y.length >= 3 ? E = [b, "all", ...T(y.join(" "))] : lt(
          p,
          "border",
          "none",
          (F) => E = [b, "all", ...T(F)]
        ) || ["top", "right", "bottom", "left"].forEach((F) => {
          lt(
            p,
            `border-${F}`,
            "none",
            (R) => E = [b, F, ...T(R)]
          );
        }), f === null ? E !== null && (f = E) : E !== null && E[1] === f[1] && E[2] === f[2] && E[3] === f[3] ? f[0] = `${f[0].split(":")[0]}:${b}` : (_.push(f), f = E);
        const H = p.getAttribute("cellType") || "text", P = xt.use().getRender(H).fromHtml(s, p, D);
        Object.keys(P).length > 0 && s.cell(m, C, P);
      }
      f != null && _.push(f);
      const v = a.at(-1);
      if (v && v.length > 0)
        if (v.length === 1 && _.length === 1 && v[0][1] === "all" && v[0][1] === _[0][1] && v[0][2] === _[0][2] && v[0][3] === _[0][3]) {
          const w = X.with(v[0][0]);
          w.endRow += 1, v[0][0] = w.toString();
        } else
          a.push(_);
      else
        a.push(_);
    }), a.length > 0)
      for (const u of a)
        u.forEach((d) => s.addBorder(...d));
  }
  return i;
}
function Si(s, t, e) {
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
function fo(s) {
  let t = "";
  return s.bgcolor && (t += `background-color: ${s.bgcolor};`), s.color && (t += `color: ${s.color};`), s.align && (t += `text-align: ${s.align};`), s.valign && (t += `vertical-align: ${s.valign};`), s.textwrap === !0 && (t += "white-space: normal;"), s.underline === !0 && (t += "text-decoration: underline;"), s.strikethrough === !0 && (t += "text-decoration: line-through;"), s.bold === !0 && (t += "font-weight: bold;"), s.italic === !0 && (t += "font-style: italic;"), s.fontFamily && (t += `font-family: ${s.fontFamily};`), s.fontSize && (t += `font-size: ${s.fontSize}pt;`), t;
}
class uo {
  constructor(t) {
    g(this, "table");
    g(this, "setCutted", !1);
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
      const { offsetX: l, offsetY: a, ctrlKey: u, metaKey: d, shiftKey: x } = t, f = o.cellAt(l, a);
      if (f) {
        n.emit("click", f, t);
        const { placement: _, row: v, col: w } = f, p = this.table.cell(v, w);
        if (p) {
          const m = bt(p);
          (h = (c = xt.use().options[m]).clickEvent) == null || h.call(c, this.table, p, f, t);
        }
        x ? U.unionRange(this.table, v, w) : (t.button === 2 && U.isInRange(this.table, v, w) || (e.placement(_), U.addRange(this.table, v, w, !(d || u))), _ === "body" && Tt.autoMove(this.table, e.currentRange)), U.reset(this.table), U.bindMousemove(
          this.table,
          (m, C) => {
            U.unionRange(this.table, m, C);
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
      U.move(this.table, n, r, i), this.table._canvas.focus(), this.table.render();
    } else if (t === "copy")
      U.copyValue(this.table);
    else if (t === "cut")
      U.copyValue(this.table), this.setCutted = !0;
    else if (t === "paste") {
      if (this.table._editable) {
        const r = !!e[0];
        U.pasteValue(this.table, r, this.setCutted), this.table._canvas.focus(), this.setCutted = !1;
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
      U.setCellStyle(this.table, e[0] || {});
    else if (t === "fastStyle") {
      const r = e[0];
      U.fastSetCellStyle(this.table, r);
    } else if (t === "fastFormat") {
      const r = e[0];
      U.fastSetCellFormat(this.table, r);
    } else if (t === "fastFixed") {
      const r = e[0];
      U.fastSetCellFixed(this.table, r);
    } else if (t === "clearCopy")
      U.clearCopy(this.table);
    else if (t === "clearCell") {
      const r = e[0];
      r === "cell" ? U.clearCell(this.table) : r === "value" ? U.clearCellValue(this.table) : r === "style" ? U.fastClearCellStyle(this.table) : r === "format" && U.fastClearCellFormat(this.table);
    } else if (t === "insertRow")
      U.insertRowOrCol(this.table, "row");
    else if (t === "insertCol")
      U.insertRowOrCol(this.table, "col");
    else if (t === "deleteRow")
      U.deleteRowOrCol(this.table, "row");
    else if (t === "deleteCol")
      U.deleteRowOrCol(this.table, "col");
    else if (t === "setBorder") {
      const r = e[0], i = e[1], n = e[2];
      r && i && n && U.setBorder(this.table, { type: r, lineStyle: i, color: n });
    } else t === "clearBorder" ? U.clearBorder(this.table) : t === "merge" ? U.mergeGrid(this.table) : t === "freeze" ? U.freezeGrid(this.table) : t === "paintFormat" && U.paintFormat(this.table);
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
class xo {
  constructor() {
    g(this, "undoItems");
    g(this, "redoItems");
    g(this, "maxSize", 50);
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
const po = (s) => new Promise((t, e) => {
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
function _o() {
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
        let u = l.paddingLeft + l.paddingRight, d = l.paddingTop + l.paddingBottom, x = l.marginLeft + l.marginRight, f = l.marginTop + l.marginBottom, _ = l.borderLeftWidth + l.borderRightWidth, v = l.borderTopWidth + l.borderBottomWidth, w = e(h.width);
        w !== !1 && (l.width = w + // add padding and border unless it's already including it
        (a ? 0 : u + _));
        let p = e(h.height);
        return p !== !1 && (l.height = p + // add padding and border unless it's already including it
        (a ? 0 : d + v)), l.innerWidth = l.width - (u + _), l.innerHeight = l.height - (d + v), l.outerWidth = l.width + x, l.outerHeight = l.height + f, l;
      }
      return n;
    });
  }(or)), or.exports;
}
var Pe = { exports: {} }, Ie = { exports: {} }, go = Ie.exports, $i;
function vo() {
  return $i || ($i = 1, function(s) {
    (function(t, e) {
      s.exports ? s.exports = e() : t.EvEmitter = e();
    })(typeof window < "u" ? window : go, function() {
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
var mo = Pe.exports, Hi;
function Co() {
  return Hi || (Hi = 1, function(s) {
    (function(t, e) {
      s.exports ? s.exports = e(
        t,
        vo()
      ) : t.Unidragger = e(
        t,
        t.EvEmitter
      );
    })(typeof window < "u" ? window : mo, function(e, r) {
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
        this.handles.forEach((d) => {
          d[a](o, this), d[a]("click", this), e.PointerEvent && (d.style.touchAction = u);
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
        let d;
        for (let x of u.changedTouches)
          x.identifier === this.pointerIdentifier && (d = x);
        d && this[a](u, d);
      }, n.onmousedown = function(a) {
        this.pointerDown(a, a);
      }, n.ontouchstart = function(a) {
        this.pointerDown(a, a.changedTouches[0]);
      }, n.onpointerdown = function(a) {
        this.pointerDown(a, a);
      };
      const h = ["TEXTAREA", "INPUT", "SELECT", "OPTION"], l = ["radio", "checkbox", "button", "submit", "image", "file"];
      return n.pointerDown = function(a, u) {
        let d = h.includes(a.target.nodeName), x = l.includes(a.target.type), f = !d || x;
        !this.isPointerDown && !a.button && f && (this.isPointerDown = !0, this.pointerIdentifier = u.pointerId !== void 0 ? (
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
        let d = {
          x: u.pageX - this.pointerDownPointer.pageX,
          y: u.pageY - this.pointerDownPointer.pageY
        };
        this.emitEvent("pointerMove", [a, u, d]), !this.isDragging && this.hasDragStarted(d) && this.dragStart(a, u), this.isDragging && this.dragMove(a, u, d);
      }, n.hasDragStarted = function(a) {
        return Math.abs(a.x) > 3 || Math.abs(a.y) > 3;
      }, n.dragStart = function(a, u) {
        this.isDragging = !0, this.isPreventingClicks = !0, this.emitEvent("dragStart", [a, u]);
      }, n.dragMove = function(a, u, d) {
        this.emitEvent("dragMove", [a, u, d]);
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
        let d = a.type === "mouseup";
        d && this.isIgnoringMouseUp || (this.emitEvent("staticClick", [a, u]), d && (this.isIgnoringMouseUp = !0, setTimeout(() => {
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
var wo = Te.exports, Ti;
function bo() {
  return Ti || (Ti = 1, function(s) {
    (function(t, e) {
      s.exports ? s.exports = e(
        t,
        _o(),
        Co()
      ) : t.Draggabilly = e(
        t,
        t.getSize,
        t.Unidragger
      );
    })(
      typeof window < "u" ? window : wo,
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
        let u = h.emitEvent;
        h.emitEvent = function(f, _) {
          if (!this.isEnabled && a.includes(f)) return;
          u.call(this, f, _);
          let w = e.jQuery;
          if (!w || !this.$element) return;
          let p, m = _;
          _ && _[0] instanceof Event && ([p, ...m] = _);
          let b = w.Event(p);
          b.type = f, this.$element.trigger(b, m);
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
          let v = _.split(","), w = _.startsWith("matrix3d") ? 12 : 4, p = parseInt(v[w], 10), m = parseInt(v[w + 1], 10);
          this.position.x += p, this.position.y += m;
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
            borderLeftWidth: w,
            borderRightWidth: p,
            borderTopWidth: m,
            borderBottomWidth: C
          } = v, b = this.element.getBoundingClientRect(), B = f.getBoundingClientRect(), A = w + p, D = m + C, T = this.relativeStartPosition = {
            x: b.left - (B.left + w),
            y: b.top - (B.top + m)
          };
          this.containSize = {
            width: v.width - A - T.x - _.width,
            height: v.height - D - T.y - _.height
          };
        }, h.getContainer = function() {
          let f = this.options.containment;
          return f ? f instanceof HTMLElement ? f : typeof f == "string" ? document.querySelector(f) : this.element.parentNode : void 0;
        }, h.handleDragMove = function(f, _, v) {
          if (!this.isEnabled) return;
          let w = v.x, p = v.y, m = this.options.grid, C = m && m[0], b = m && m[1];
          w = d(w, C), p = d(p, b), w = this.containDrag("x", w, C), p = this.containDrag("y", p, b), w = this.options.axis == "y" ? 0 : w, p = this.options.axis == "x" ? 0 : p, this.position.x = this.startPosition.x + w, this.position.y = this.startPosition.y + p, this.dragPoint.x = w, this.dragPoint.y = p;
        };
        function d(f, _, v) {
          return _ ? (v = v || "round", Math[v](f / _) * _) : f;
        }
        h.containDrag = function(f, _, v) {
          if (!this.options.containment) return _;
          let w = f == "x" ? "width" : "height", p = this.relativeStartPosition[f], m = d(-p, v, "ceil"), C = this.containSize[w];
          return C = d(C, v, "floor"), Math.max(m, Math.min(C, _));
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
        const x = ["transform", "left", "top", "position"];
        return h.destroy = function() {
          this.disable(), x.forEach((f) => {
            this.element.style[f] = "";
          }), this.unbindHandles(), this.$element && this.$element.removeData("draggabilly");
        }, h._init = n, o && o.bridget && o.bridget("draggabilly", c), c;
      }
    );
  }(Te)), Te.exports;
}
var yo = bo();
const Eo = /* @__PURE__ */ Ji(yo);
class gr {
  constructor(t, e = {}) {
    g(this, "content");
    g(this, "mask", I("div", `${N}-dialog-mask`).hide());
    g(this, "container", I("div", `${N}-dialog`));
    g(this, "closeIcon", I("span", `${N}-dialog__header_close`).append(I("div", "icon")));
    g(this, "containerHeader", I("div", `${N}-dialog__header`).append(
      I("div", `${N}-dialog__header__title`),
      this.closeIcon
    ));
    g(this, "containerBody", I("div", `${N}-dialog__body`).css(
      "box-sizing",
      "border-box"
    ));
    g(this, "containerFooter", I("div", `${N}-dialog__footer`));
    g(this, "hasInserted", !1);
    g(this, "visible", !1);
    g(this, "conf");
    Array.isArray(t) ? this.content = I("div").append(...t) : this.content = t, this.conf = e, this.initContiner(), e != null && e.delayGenerate || this.insertContent();
  }
  initContiner() {
    this.container.append(this.containerHeader, this.containerBody, this.containerFooter), this.mask.append(this.container), this.mask.on("click", () => {
      this.conf.disableMask || (this.conf.closeOnClickMask || this.conf.closeOnClickMask === void 0) && this.close();
    }), this.closeIcon.on("click", () => {
      this.close();
    }), this.container.on("click", (t) => {
      document.dispatchEvent(new Event("click", t)), t.stopPropagation();
    }), this.conf.draggable && (new Eo(this.container._, {
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
    g(this, "_", I("button", `${N}-bse-button`).attr("type", "button"));
    g(this, "configs");
    g(this, "baseName");
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
    g(this, "_");
    this._ = I("div", `${N}-icon`).append(I("div", ["icon", t]));
  }
}
class cs {
  constructor() {
    g(this, "events", {});
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
class vr {
  constructor(t, e) {
    g(this, "_");
    g(this, "configs", {
      labelPosition: "top",
      fields: []
    });
    g(this, "form", {});
    g(this, "fieldsDict", {});
    Object.assign(this.configs, t), e && (this.form = e), this.configs.t || (this.configs.t = (r) => r), this._ = I("form", `${N}-form`), this.render();
  }
  render() {
    this._.html(""), this.fieldsDict = {}, this.configs.fields.forEach((t) => {
      var c;
      let e;
      const r = I("div", `${N}-form-item`);
      this.configs.labelPosition === "left" ? r.addCss(`${N}-form-item--left`) : this.configs.labelPosition === "right" ? r.addCss(`${N}-form-item--right`) : this.configs.labelPosition === "top" && r.addCss(`${N}-form-item--top`);
      const i = I("label", `${N}-form-item__label`).html(
        this.configs.t(t.label)
      ), n = I("div", `${N}-form-item__content`), o = I("div", `${N}-form-item__error`);
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
    g(this, "carrier");
    g(this, "_", I("div"));
    g(this, "onRender", (t) => {
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
    g(this, "configs", {});
    g(this, "carrier", I("input", `${N}-form-item--input`));
    g(this, "render", () => {
      this.configs.placeholder && this.carrier.attr("placeholder", this.configs.placeholder), this.configs.onRender && this.configs.onRender(this);
    });
    this.configs = r || {}, this._ = I("div", [`${N}-form-item--input_wrapper`, "form-item--container"]), this._.append(this.carrier), this.configs.suffix && (this._.addCss(`${N}-form-item--input_wrapper--suffix`), this._.append(
      I("div", `${N}-form-item--input_wrapper--suffix-container`).append(
        this.configs.suffix
      )
    )), e && this.setValue(e), this.render();
  }
}
class ar extends Qe {
  constructor(e, r) {
    super();
    g(this, "configs", {
      options: []
    });
    g(this, "carrier", I("div", [
      `${N}-form-item--input`,
      `${N}-form-item--select`
    ]));
    g(this, "optionContainer", I("div", "option-container"));
    g(this, "suffixContainer", I(
      "div",
      `${N}-form-item--input_wrapper--suffix-container`
    ).setStyles({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "20px",
      height: "18px"
    }));
    g(this, "clearIconVisible", !1);
    g(this, "value", "");
    g(this, "events", new cs());
    g(this, "render", () => {
      this.optionContainer._.innerHTML = "", this.optionContainer.append(
        ...this.configs.options.map((e) => {
          const r = I("div", "option-item");
          return r.on("click", () => {
            this.setValue(e.value), this.events.emit("change", [e.value]), this.renderValue();
          }), r._.setAttribute("value", e.value), r.append(e.label), r;
        })
      ), this.optionContainer.hide(), this.renderValue(), this.configs.onRender && this.configs.onRender(this);
    });
    g(this, "changeOptionVisibility", (e) => {
      e ? (this.events.emit("show"), this.optionContainer.show()) : (this.events.emit("hide"), this.optionContainer.hide());
    });
    r && (this.configs = r), this._ = I("div", [
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
class Bo {
  constructor(t, e) {
    g(this, "formInstance");
    g(this, "formContainer", I("div"));
    g(this, "footer", I("div"));
    g(this, "dialog");
    g(this, "cellAreaDialog");
    g(this, "table");
    g(this, "t");
    g(this, "data", {
      cellRange: "",
      options: []
    });
    g(this, "configs");
    this.table = t, this.t = t._i18n.t, this.configs = e, this.cellAreaDialog = new Ao(this.table, {
      onBeforceCallback: () => (this.dialog.show(), !0),
      onSubmitCallback: (r) => {
        var i, n;
        (i = this.formInstance) == null || i.setValue({ cellRange: r }), (n = this.formInstance) == null || n.validate("cellRange"), this.dialog.close();
      }
    }), this.dialog = new gr([this.formContainer, this.footer], {
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
    this.formContainer.html(""), this.formInstance = new vr(
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
            component: new Do([], {
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
    const t = I("div").css("display", "flex").css("flex-direction", "row-reverse").append(
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
class Ao {
  constructor(t, e) {
    g(this, "input");
    g(this, "form", I("div"));
    g(this, "footer", I("div"));
    g(this, "dialog");
    g(this, "table");
    g(this, "onBeforceCallback");
    g(this, "onSubmitCallback");
    g(this, "updateValue", (t) => {
      if (Array.isArray(t)) {
        const [e, r] = t;
        this.input.setValue(Q(r, e));
      } else
        console.log("update value", t), this.input.setValue(
          `${Q(t.startCol, t.startRow)}:${Q(t.endCol, t.endRow)}`
        );
    });
    g(this, "validator", (t, e) => {
      if (!t)
        return e(new Error(this.table._i18n.t("cellRangeDialog.unselectRange")));
      const r = t.split(":");
      if (r.length > 2 || !Ir(r[0]) || r[1] && !Ir(r[1]))
        return e(new Error(this.table._i18n.t("cellRangeDialog.formatError")));
      if (r.length === 2) {
        const i = et(r[0]), n = et(r[1]);
        if (i[0] > n[0] || i[1] > n[1])
          return e(new Error(this.table._i18n.t("cellRangeDialog.formatError")));
      }
      e();
    });
    this.table = t, this.input = new mr("", {
      placeholder: this.table._i18n.t("cellRangeDialog.placeholder")
    }), this.dialog = new gr([this.form, this.footer], {
      title: t._i18n.t("validators.selectCellRange"),
      width: "300px",
      draggable: !0,
      disableMask: !0,
      onBeforeClose: () => (this.table._emitter.off("selectorMove", this.updateValue), this.table._emitter.off("updateFocusRange", this.updateValue), this.onBeforceCallback())
    }), this.onBeforceCallback = e.onBeforceCallback ? e.onBeforceCallback : () => !0, this.onSubmitCallback = e.onSubmitCallback;
  }
  render() {
    this.input.configs.placeholder = this.table._i18n.t("cellRangeDialog.placeholder"), this.input.render(), this.form.html("");
    const t = new vr(
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
      I("div").css("display", "flex").css("flex-direction", "row-reverse").append(
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
class Do extends Qe {
  constructor(e, r = {}) {
    super();
    g(this, "_", I("div", [
      `${N}-form-item--edit-select-container`,
      "form-item--container"
    ]));
    g(this, "listElement", I("div", `${N}-form-item--edit-select-list`));
    g(this, "editElement", I("div", `${N}-form-item--edit-select-input`));
    g(this, "editInputElement", new mr());
    g(this, "options", []);
    g(this, "configs", {});
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
      const i = I("div", "item-option"), n = I("input", "item-option-input");
      n.value(e);
      const o = I("span", "delete-icon");
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
class Fo {
  constructor(t) {
    g(this, "table");
    g(this, "_contextElement");
    g(this, "hiddenOption", []);
    g(this, "_extendOptions", []);
    g(this, "validatorSelectDialogEvents");
    g(this, "options", () => [
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
                const r = await po("image/*"), i = Yt.use().savePicture(r);
                U.setCellValue(e, {
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
    g(this, "hide", (t) => {
      t.srcElement.className.includes("context-item--disabled") || t.srcElement.className.includes("context-item-tree") || t.srcElement.className.includes("divider") || setTimeout(() => {
        this._contextElement.css("display", "none"), window.removeEventListener("click", this.hide);
      }, 0);
    });
    g(this, "appendOption", (t) => {
      this._extendOptions.push(t);
    });
    g(this, "removeOption", (t) => {
      const e = this._extendOptions.findIndex((r) => !r.type && r.id === t);
      e !== -1 && this._extendOptions.splice(e, 1);
    });
    this.table = t, this.validatorSelectDialogEvents = {
      instance: new Bo(this.table, {
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
    }, this._contextElement = I("ul", `${N}-context-menu`), this._contextElement.hide(), this.table._container.append(this._contextElement);
  }
  async show(t) {
    this._contextElement.css("top", `${t.layerY + 5}px`), this._contextElement.css("left", `${t.layerX + 5}px`);
    const e = (a) => {
      if (a === void 0) return new Promise((u) => u(!1));
      if (typeof a == "boolean") return new Promise((u) => u(a));
      if (typeof a == "function") {
        const u = a(this.table);
        return Object.prototype.toString.call(u) === "[object Promise]" ? u : new Promise((d) => d(u));
      }
      return new Promise((u) => u(!1));
    };
    let r;
    typeof this.hiddenOption == "function" ? r = this.hiddenOption(this.table) : r = this.hiddenOption, this._contextElement.html("");
    let i = 0;
    const n = [...this.options(), ...this._extendOptions], o = async (a) => {
      const u = ["context-item"], d = await e(a.disable);
      a.type === "tree" && u.push("context-item-tree"), d && u.push("context-item--disabled");
      const x = I("li", u);
      if (a.type === "tree") {
        const f = I("div", "label-container").html(
          `<span class="label">${a.label}</span> <span class="arrow"><span class="icon arrow-right"></span> </span>`
        ), _ = I("div", ["tree-list", `${N}-context-menu`]);
        for (const w of a.children)
          _.append(await o(w));
        let v = null;
        x.on("mouseenter", () => {
          v !== null && clearInterval(v), _.css("display", "block");
          const w = x._.getBoundingClientRect();
          document.body.clientWidth - w.right < _._.clientWidth && (_.css("left", "calc(-100%)"), _.css("margin-left", "-5px"));
        }), x.on("mouseleave", () => {
          v = window.setTimeout(() => {
            _.css("display", "none");
          }, 100);
        }), x.append(f, _);
      } else {
        const f = `<span class="label">${a.label}</span> <span class="shortcut">${a.shortcut || ""}</span>`;
        x.html(f);
      }
      return !d && a.action && x.on(
        "click",
        (f) => a.action(f, this.table)
      ), x;
    };
    for (const a of n)
      a.type === "div" ? i > 0 && (this._contextElement.append(I("div", "divider")), i = 0) : !await e(a.hidden) && !r.includes(a.id) && (this._contextElement.append(await o(a)), i++);
    this._contextElement.show();
    const c = this.table._width(), h = this.table._height(), l = this._contextElement.offset();
    t.layerY + l.height > h && this._contextElement.css("top", `${h - l.height - 20}px`), t.layerX + l.width > c && this._contextElement.css(
      "left",
      `${c - l.width - (c - t.layerX)}px`
    ), window.addEventListener("click", this.hide);
  }
}
const Ro = {
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
}, So = {
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
    g(this, "_currentLang", "en");
    g(this, "changeCallbacks", []);
    g(this, "t", (t) => {
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
g(Nt, "messages", {
  en: Ro,
  zh: So
});
let fr = Nt;
class it {
  constructor(t) {
    g(this, "table");
    g(this, "_");
    g(this, "_tooltip", null);
    g(this, "hidden", !1);
    g(this, "disabled", !1);
    this.table = t, this._ = I("div", "button-container");
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
      t instanceof Object && t.shortkey && (r += `<span style="margin-left: 5px; font-size: 12px">${t.shortkey}</span>`), r += "</div>", this._tooltip = I("div", "tooltips").html(r).css("position", "absolute").css("top", "40px").css("z-index", "999").css("background", "#fff").hide();
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
class Ft extends it {
  constructor(e) {
    super(e);
    g(this, "table");
    this.table = e, this._.append(I("div", `${N}-hm-divider`).css("margin-left", "3px"));
  }
}
class ko extends it {
  constructor(e) {
    super(e);
    g(this, "table");
    g(this, "button");
    this.table = e, this.button = I("div", `${N}-hm-button`).append(
      I("div", `${N}-icon`).html('<div class="icon print"></div>')
    ), this._.append(this.button), this.button.on("click", (r) => this.action(r));
  }
  update() {
  }
  action(e) {
    this.disabled || this.table._events.eventTrigger("print");
  }
}
class $o extends it {
  constructor(e) {
    super(e);
    g(this, "table");
    g(this, "button");
    this.table = e, this.button = I("div", `${N}-hm-button`).append(
      I("div", `${N}-icon`).html('<div class="icon undo"></div>')
    ), this._.append(this.button), this.button.on("click", (r) => this.action(r));
  }
  update() {
    this.disabled = !this.table._history.canUndo(), this.disabled ? this.button._.classList.add("disabled") : this.button._.classList.remove("disabled");
  }
  action(e) {
    this.disabled || this.table._events.eventTrigger("undo");
  }
}
class Ho extends it {
  constructor(e) {
    super(e);
    g(this, "table");
    g(this, "button");
    this.table = e, this.button = I("div", `${N}-hm-button`);
    const r = I("div", `${N}-icon`);
    r.html('<div class="icon redo"></div>'), this._.append(this.button.append(r)), this.button.on("click", (i) => this.action(i));
  }
  update() {
    this.disabled = !this.table._history.canRedo(), this.disabled ? this.button._.classList.add("disabled") : this.button._.classList.remove("disabled");
  }
  action(e) {
    this.disabled || this.table._events.eventTrigger("redo");
  }
}
class To extends it {
  constructor(e) {
    super(e);
    g(this, "table");
    this.table = e;
    const r = I("div", `${N}-hm-button`), i = I("div", `${N}-icon`);
    i.html('<div class="icon paintformat"></div>'), this._.append(r.append(i)), r.on("click", (n) => this.action(n));
  }
  update() {
  }
  async action(e) {
    var r;
    this.table._selector && ((r = this.table._selector) == null || r.showCopy(), this.table._selector.paintFormatArea = this.table._selector._ranges[0]);
  }
}
class Po extends it {
  constructor(e) {
    super(e);
    g(this, "table");
    this.table = e;
    const r = I("div", `${N}-hm-button`), i = I("div", `${N}-icon`);
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
    g(this, "_visible", !1);
    g(this, "disabled", !1);
    g(this, "_");
    g(this, "_labelElement");
    g(this, "_contentElement");
    // content
    g(this, "beforeShow", null);
    g(this, "onShow", null);
    g(this, "beforeHide", null);
    g(this, "onHide", null);
    g(this, "hide", async (t) => {
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
    this._ = I("div", r), this._labelElement = t, this._labelElement.on("click", (i) => {
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
    g(this, "disabled", !1);
    g(this, "value", null);
    g(this, "options", []);
    g(this, "_");
    g(this, "_dropDownElement");
    g(this, "customOption", null);
    g(this, "hide", (t) => this._dropDownElement.hide(t));
    this.options = t, this._dropDownElement = new Ut(
      I("span", [`${N}-hm-button`, `${N}-hm-dropdown`]),
      I("ul", "dropdown-list")
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
        t.push(I("li", "divider"));
      else if (typeof e == "object") {
        if (await Pi(e.hide)) continue;
        const i = ["dropdown-item"];
        await Pi(e.disabled) && i.push("disabled");
        const o = I("li", i);
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
var ze = { exports: {} }, Io = ze.exports, Ii;
function zo() {
  return Ii || (Ii = 1, function(s, t) {
    (function(e, r) {
      s.exports = r();
    })(Io, function() {
      var e = 1e3, r = 6e4, i = 36e5, n = "millisecond", o = "second", c = "minute", h = "hour", l = "day", a = "week", u = "month", d = "quarter", x = "year", f = "date", _ = "Invalid Date", v = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, w = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, p = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(F) {
        var R = ["th", "st", "nd", "rd"], k = F % 100;
        return "[" + F + (R[(k - 20) % 10] || R[k] || R[0]) + "]";
      } }, m = function(F, R, k) {
        var O = String(F);
        return !O || O.length >= R ? F : "" + Array(R + 1 - O.length).join(k) + F;
      }, C = { s: m, z: function(F) {
        var R = -F.utcOffset(), k = Math.abs(R), O = Math.floor(k / 60), $ = k % 60;
        return (R <= 0 ? "+" : "-") + m(O, 2, "0") + ":" + m($, 2, "0");
      }, m: function F(R, k) {
        if (R.date() < k.date()) return -F(k, R);
        var O = 12 * (k.year() - R.year()) + (k.month() - R.month()), $ = R.clone().add(O, u), V = k - $ < 0, L = R.clone().add(O + (V ? -1 : 1), u);
        return +(-(O + (k - $) / (V ? $ - L : L - $)) || 0);
      }, a: function(F) {
        return F < 0 ? Math.ceil(F) || 0 : Math.floor(F);
      }, p: function(F) {
        return { M: u, y: x, w: a, d: l, D: f, h, m: c, s: o, ms: n, Q: d }[F] || String(F || "").toLowerCase().replace(/s$/, "");
      }, u: function(F) {
        return F === void 0;
      } }, b = "en", B = {};
      B[b] = p;
      var A = "$isDayjsObject", D = function(F) {
        return F instanceof H || !(!F || !F[A]);
      }, T = function F(R, k, O) {
        var $;
        if (!R) return b;
        if (typeof R == "string") {
          var V = R.toLowerCase();
          B[V] && ($ = V), k && (B[V] = k, $ = V);
          var L = R.split("-");
          if (!$ && L.length > 1) return F(L[0]);
        } else {
          var S = R.name;
          B[S] = R, $ = S;
        }
        return !O && $ && (b = $), $ || !O && b;
      }, y = function(F, R) {
        if (D(F)) return F.clone();
        var k = typeof R == "object" ? R : {};
        return k.date = F, k.args = arguments, new H(k);
      }, E = C;
      E.l = T, E.i = D, E.w = function(F, R) {
        return y(F, { locale: R.$L, utc: R.$u, x: R.$x, $offset: R.$offset });
      };
      var H = function() {
        function F(k) {
          this.$L = T(k.locale, null, !0), this.parse(k), this.$x = this.$x || k.x || {}, this[A] = !0;
        }
        var R = F.prototype;
        return R.parse = function(k) {
          this.$d = function(O) {
            var $ = O.date, V = O.utc;
            if ($ === null) return /* @__PURE__ */ new Date(NaN);
            if (E.u($)) return /* @__PURE__ */ new Date();
            if ($ instanceof Date) return new Date($);
            if (typeof $ == "string" && !/Z$/i.test($)) {
              var L = $.match(v);
              if (L) {
                var S = L[2] - 1 || 0, z = (L[7] || "0").substring(0, 3);
                return V ? new Date(Date.UTC(L[1], S, L[3] || 1, L[4] || 0, L[5] || 0, L[6] || 0, z)) : new Date(L[1], S, L[3] || 1, L[4] || 0, L[5] || 0, L[6] || 0, z);
              }
            }
            return new Date($);
          }(k), this.init();
        }, R.init = function() {
          var k = this.$d;
          this.$y = k.getFullYear(), this.$M = k.getMonth(), this.$D = k.getDate(), this.$W = k.getDay(), this.$H = k.getHours(), this.$m = k.getMinutes(), this.$s = k.getSeconds(), this.$ms = k.getMilliseconds();
        }, R.$utils = function() {
          return E;
        }, R.isValid = function() {
          return this.$d.toString() !== _;
        }, R.isSame = function(k, O) {
          var $ = y(k);
          return this.startOf(O) <= $ && $ <= this.endOf(O);
        }, R.isAfter = function(k, O) {
          return y(k) < this.startOf(O);
        }, R.isBefore = function(k, O) {
          return this.endOf(O) < y(k);
        }, R.$g = function(k, O, $) {
          return E.u(k) ? this[O] : this.set($, k);
        }, R.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, R.valueOf = function() {
          return this.$d.getTime();
        }, R.startOf = function(k, O) {
          var $ = this, V = !!E.u(O) || O, L = E.p(k), S = function(J, G) {
            var st = E.w($.$u ? Date.UTC($.$y, G, J) : new Date($.$y, G, J), $);
            return V ? st : st.endOf(l);
          }, z = function(J, G) {
            return E.w($.toDate()[J].apply($.toDate("s"), (V ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(G)), $);
          }, W = this.$W, M = this.$M, j = this.$D, Y = "set" + (this.$u ? "UTC" : "");
          switch (L) {
            case x:
              return V ? S(1, 0) : S(31, 11);
            case u:
              return V ? S(1, M) : S(0, M + 1);
            case a:
              var Z = this.$locale().weekStart || 0, q = (W < Z ? W + 7 : W) - Z;
              return S(V ? j - q : j + (6 - q), M);
            case l:
            case f:
              return z(Y + "Hours", 0);
            case h:
              return z(Y + "Minutes", 1);
            case c:
              return z(Y + "Seconds", 2);
            case o:
              return z(Y + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, R.endOf = function(k) {
          return this.startOf(k, !1);
        }, R.$set = function(k, O) {
          var $, V = E.p(k), L = "set" + (this.$u ? "UTC" : ""), S = ($ = {}, $[l] = L + "Date", $[f] = L + "Date", $[u] = L + "Month", $[x] = L + "FullYear", $[h] = L + "Hours", $[c] = L + "Minutes", $[o] = L + "Seconds", $[n] = L + "Milliseconds", $)[V], z = V === l ? this.$D + (O - this.$W) : O;
          if (V === u || V === x) {
            var W = this.clone().set(f, 1);
            W.$d[S](z), W.init(), this.$d = W.set(f, Math.min(this.$D, W.daysInMonth())).$d;
          } else S && this.$d[S](z);
          return this.init(), this;
        }, R.set = function(k, O) {
          return this.clone().$set(k, O);
        }, R.get = function(k) {
          return this[E.p(k)]();
        }, R.add = function(k, O) {
          var $, V = this;
          k = Number(k);
          var L = E.p(O), S = function(M) {
            var j = y(V);
            return E.w(j.date(j.date() + Math.round(M * k)), V);
          };
          if (L === u) return this.set(u, this.$M + k);
          if (L === x) return this.set(x, this.$y + k);
          if (L === l) return S(1);
          if (L === a) return S(7);
          var z = ($ = {}, $[c] = r, $[h] = i, $[o] = e, $)[L] || 1, W = this.$d.getTime() + k * z;
          return E.w(W, this);
        }, R.subtract = function(k, O) {
          return this.add(-1 * k, O);
        }, R.format = function(k) {
          var O = this, $ = this.$locale();
          if (!this.isValid()) return $.invalidDate || _;
          var V = k || "YYYY-MM-DDTHH:mm:ssZ", L = E.z(this), S = this.$H, z = this.$m, W = this.$M, M = $.weekdays, j = $.months, Y = $.meridiem, Z = function(G, st, ct, rt) {
            return G && (G[st] || G(O, V)) || ct[st].slice(0, rt);
          }, q = function(G) {
            return E.s(S % 12 || 12, G, "0");
          }, J = Y || function(G, st, ct) {
            var rt = G < 12 ? "AM" : "PM";
            return ct ? rt.toLowerCase() : rt;
          };
          return V.replace(w, function(G, st) {
            return st || function(ct) {
              switch (ct) {
                case "YY":
                  return String(O.$y).slice(-2);
                case "YYYY":
                  return E.s(O.$y, 4, "0");
                case "M":
                  return W + 1;
                case "MM":
                  return E.s(W + 1, 2, "0");
                case "MMM":
                  return Z($.monthsShort, W, j, 3);
                case "MMMM":
                  return Z(j, W);
                case "D":
                  return O.$D;
                case "DD":
                  return E.s(O.$D, 2, "0");
                case "d":
                  return String(O.$W);
                case "dd":
                  return Z($.weekdaysMin, O.$W, M, 2);
                case "ddd":
                  return Z($.weekdaysShort, O.$W, M, 3);
                case "dddd":
                  return M[O.$W];
                case "H":
                  return String(S);
                case "HH":
                  return E.s(S, 2, "0");
                case "h":
                  return q(1);
                case "hh":
                  return q(2);
                case "a":
                  return J(S, z, !0);
                case "A":
                  return J(S, z, !1);
                case "m":
                  return String(z);
                case "mm":
                  return E.s(z, 2, "0");
                case "s":
                  return String(O.$s);
                case "ss":
                  return E.s(O.$s, 2, "0");
                case "SSS":
                  return E.s(O.$ms, 3, "0");
                case "Z":
                  return L;
              }
              return null;
            }(G) || L.replace(":", "");
          });
        }, R.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, R.diff = function(k, O, $) {
          var V, L = this, S = E.p(O), z = y(k), W = (z.utcOffset() - this.utcOffset()) * r, M = this - z, j = function() {
            return E.m(L, z);
          };
          switch (S) {
            case x:
              V = j() / 12;
              break;
            case u:
              V = j();
              break;
            case d:
              V = j() / 3;
              break;
            case a:
              V = (M - W) / 6048e5;
              break;
            case l:
              V = (M - W) / 864e5;
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
          return $ ? V : E.a(V);
        }, R.daysInMonth = function() {
          return this.endOf(u).$D;
        }, R.$locale = function() {
          return B[this.$L];
        }, R.locale = function(k, O) {
          if (!k) return this.$L;
          var $ = this.clone(), V = T(k, O, !0);
          return V && ($.$L = V), $;
        }, R.clone = function() {
          return E.w(this.$d, this);
        }, R.toDate = function() {
          return new Date(this.valueOf());
        }, R.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, R.toISOString = function() {
          return this.$d.toISOString();
        }, R.toString = function() {
          return this.$d.toUTCString();
        }, F;
      }(), P = H.prototype;
      return y.prototype = P, [["$ms", n], ["$s", o], ["$m", c], ["$H", h], ["$W", l], ["$M", u], ["$y", x], ["$D", f]].forEach(function(F) {
        P[F[1]] = function(R) {
          return this.$g(R, F[0], F[1]);
        };
      }), y.extend = function(F, R) {
        return F.$i || (F(R, H, y), F.$i = !0), y;
      }, y.locale = T, y.isDayjs = D, y.unix = function(F) {
        return y(1e3 * F);
      }, y.en = B[b], y.Ls = B, y.p = {}, y;
    });
  }(ze)), ze.exports;
}
var Mo = zo();
const Vt = /* @__PURE__ */ Ji(Mo);
class Oo extends it {
  constructor(e) {
    super(e);
    g(this, "table");
    g(this, "_dropdown");
    g(this, "_visible", !1);
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
        const o = I("div");
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
class Wo extends it {
  constructor(e) {
    super(e);
    g(this, "table");
    g(this, "_dropdown");
    g(this, "_visible", !1);
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
class Lo extends it {
  constructor(e) {
    super(e);
    g(this, "table");
    g(this, "_dropdown");
    g(this, "_visible", !1);
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
class ft extends it {
  constructor(e, r, i) {
    super(e);
    g(this, "table");
    g(this, "buttonType");
    g(this, "button");
    this.table = e, this.buttonType = r, this.button = I("div", `${N}-hm-button`);
    const n = I("div", `${N}-icon`);
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
    g(this, "table");
    g(this, "_");
    g(this, "_fastColorElement");
    g(this, "_themeColorElement");
    g(this, "fastColor", "#000");
    g(this, "onChange", () => null);
    g(this, "themeColors", [
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
    this.table = e, this._ = I("div"), this._.addCss(`${N}-color-picker`), this._fastColorElement = I("div"), this._fastColorElement.addCss("fast-color"), this._fastColorElement.on("click", () => {
      this.onChange(this.fastColor);
    }), this._.append(this._fastColorElement), this._themeColorElement = I("div"), this._themeColorElement.addCss("theme-color"), this._.append(this._themeColorElement), this.renderThemeColorElement(), this.updateFastColorElement(), t && t.append(this._);
  }
  renderThemeColorElement() {
    var r;
    this._themeColorElement.html("");
    const t = I("div");
    t.addCss("title"), t.html(`${((r = this.table) == null ? void 0 : r._i18n.t("theme_color")) || "Theme Colors"}`), t.css("font-weight", "bold"), this._themeColorElement.append(t);
    const e = I("table");
    e.addCss("body");
    for (let i = 0; i < this.themeColors[0].length; i++) {
      const n = I("tr");
      for (let o = 0; o < this.themeColors.length; o++) {
        const h = this.themeColors[o][i], l = this.createColorCube(h);
        l.css("padding", "2px");
        const a = I("td");
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
    const e = I("span").html(this.fastColor);
    e.css("padding", "0 0 0 10px"), this._fastColorElement.append(e);
  }
  createColorCube(t) {
    const e = I("div");
    return e.addCss("color-cube"), e.css("width", "16px"), e.css("height", "16px"), e.css("background", t), e;
  }
}
class Vo extends it {
  constructor(e) {
    var r;
    super(e);
    g(this, "table");
    g(this, "_dropdown");
    g(this, "_colorPicker");
    g(this, "_visible", !1);
    this.table = e, this._colorPicker = new Cr(void 0, e), this._colorPicker.onChange = (i) => {
      this.changeColor(i);
    }, this._dropdown = new Ut(this.generateButton("color"), this._colorPicker._), this._colorPicker.fastColor = this.table._data.style.color, (r = this._dropdown._labelElement.firstChild) == null || r.css(
      "border-bottom",
      `3px solid ${this.table._data.style.color}`
    ), this._dropdown._.css("margin-left", "2px"), this._.append(this._dropdown._), this.render();
  }
  generateButton(e) {
    const r = I("div", `${N}-hm-button`), i = I("div", `${N}-icon`);
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
class No extends it {
  constructor(e) {
    var r;
    super(e);
    g(this, "table");
    g(this, "_dropdown");
    g(this, "_colorPicker");
    g(this, "_visible", !1);
    this.table = e, this._colorPicker = new Cr(void 0, e), this._colorPicker.onChange = (i) => {
      this.changeColor(i);
    }, this._dropdown = new Ut(this.generateButton("bgcolor"), this._colorPicker._), (r = this._dropdown._labelElement.firstChild) == null || r.css("border-bottom", "3px solid #fff"), this._dropdown._.css("margin-left", "2px"), this._.append(this._dropdown._), this.render();
  }
  generateButton(e) {
    const r = I("div", `${N}-hm-button`), i = I("div", `${N}-icon`);
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
  const t = I("div", `${N}-hm-button`), e = I("div", `${N}-icon`);
  return e.html(`<div class="icon ${s || ""}"></div>`), t.append(e), t;
}
class qo extends it {
  constructor(e) {
    super(e);
    g(this, "table");
    g(this, "_dropdown");
    g(this, "_ctx");
    g(this, "_line");
    g(this, "_visible", !1);
    this.table = e, this._ctx = new jo(this.table), this._line = new Yo(this.table), this._dropdown = new Ut(qe("border-all"), this.generateContent()), this._dropdown._.css("margin-left", "2px"), this._.append(this._dropdown._), this._dropdown.beforeHide = (r) => {
      if (r && (ur(this._ctx._dropdown._contentElement._, r) || ur(
        this._line._dropdown._dropDownElement._contentElement._,
        r
      )))
        throw new Error("Stop hide");
    }, this.render();
  }
  generateContent() {
    const e = I("div"), r = I("div");
    r.css("display", "flex"), r.css("padding", "5px"), r.css("justify-content", "space-between");
    const i = I("table");
    [
      ["all", "inside", "horizontal", "vertical", "outside"],
      ["left", "top", "right", "bottom", "none"]
    ].forEach((c) => {
      const h = I("tr");
      c.forEach((l) => {
        const a = I("td").append(qe(`border-${l}`));
        a.on("click", () => {
          this.setBorderStyle(l);
        }), h.append(a);
      }), i.append(h);
    }), r.append(i), i.addCss(`${N}-hm-divider-line`);
    const o = I("div");
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
class jo {
  constructor(t) {
    g(this, "table");
    g(this, "_");
    g(this, "_dropdown");
    g(this, "_colorPicker");
    g(this, "_btn", qe("line-color"));
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
class Yo {
  constructor(t) {
    g(this, "table");
    g(this, "_");
    g(this, "_dropdown");
    g(this, "_btn", qe("line-type"));
    g(this, "lines", ["thin", "medium", "thick", "dashed", "dotted"]);
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
      const r = I("div");
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
class Uo extends it {
  constructor(e) {
    super(e);
    g(this, "table");
    g(this, "_dropdown");
    g(this, "_visible", !1);
    g(this, "render", () => {
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
    g(this, "renderOption", (e, r) => e !== "divider" ? (r.css("padding", "0 7px"), this.generateButton(`align-${e.value}`)) : I("div"));
    g(this, "changeTextAlign", (e) => {
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
    const r = I("div", [`${N}-hm-button`, "transparent_hover_color"]), i = I("div", `${N}-icon`);
    return i.html(`<div class="icon ${e || ""}"></div>`), r.append(i), r;
  }
  update() {
    var n, o;
    if (!((n = this.table._selector) != null && n._focus) || !((o = this.table._selector) != null && o._focusRange)) return;
    const { startRow: e, startCol: r } = this.table._selector._focusRange, i = this.table.getStyle(e, r, !0);
    this._dropdown.value = i.align || "left", this._dropdown.render();
  }
}
class Xo extends it {
  constructor(e) {
    super(e);
    g(this, "table");
    g(this, "_dropdown");
    g(this, "_visible", !1);
    g(this, "render", () => {
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
    g(this, "renderOption", (e, r) => e !== "divider" ? (r.css("padding", "0 7px"), this.generateButton(`align-${e.value}`)) : I("div"));
    g(this, "changeTextAlign", (e) => {
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
    const r = I("div", [`${N}-hm-button`, "transparent_hover_color"]), i = I("div", `${N}-icon`);
    return i.html(`<div class="icon ${e || ""}"></div>`), r.append(i), r;
  }
  update() {
    var n, o;
    if (!((n = this.table._selector) != null && n._focus) || !((o = this.table._selector) != null && o._focusRange)) return;
    const { startRow: e, startCol: r } = this.table._selector._focusRange, i = this.table.getStyle(e, r, !0);
    this._dropdown.value = i.valign || this.table._data.style.valign, this._dropdown.render();
  }
}
function Ko(s) {
  const { t } = s._i18n;
  return [
    new $o(s).tooltip({ title: t("undo"), shortkey: "(Ctrl + Z)" }),
    new Ho(s).tooltip({ title: t("redo"), shortkey: "(Ctrl + Y)" }),
    new ko(s).tooltip({ title: t("printSheet"), shortkey: "(Ctrl + P)" }),
    new To(s).tooltip(t("paintformat")),
    new Po(s).tooltip(t("clearformat")),
    new Ft(s),
    new Oo(s).tooltip(t("valueformat")),
    new ft(s, "increase-dicimal", (e) => {
      var r;
      (r = e._) == null || r.hide();
    }).tooltip(t("increase_dicimal")),
    new ft(s, "reduce-dicimal", (e) => {
      var r;
      (r = e._) == null || r.hide();
    }).tooltip(t("reduce_dicimal")),
    new Ft(s),
    new Wo(s).tooltip(t("fontFamily")),
    new Lo(s).tooltip(t("fontSize")),
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
    new Vo(s).tooltip(t("fontColor")),
    new Ft(s),
    new No(s).tooltip(t("bgColor")),
    new qo(s).tooltip(t("border")),
    new ft(s, "merge", (e) => {
      var r;
      (r = e._) == null || r.css("margin-left", "2px");
    }).tooltip(t("mergeCell")),
    new Ft(s),
    new Uo(s).tooltip(t("fontAlign")),
    new Xo(s).tooltip(t("fontVerticalAlign")),
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
class Go {
  constructor(t) {
    g(this, "table");
    g(this, "_headMenuElement");
    g(this, "height", 40);
    g(this, "options", []);
    this.table = t, this._headMenuElement = I("div", `${N}-head-menu`), this._headMenuElement.css({
      height: `${this.height}px`
    }), this.init(), this.table._i18n.onChange(() => {
      this.init();
    });
  }
  async init() {
    this._headMenuElement.html(""), this.options = Ko(this.table);
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
function Zo(s, t = 10, e) {
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
const Qo = (s, t) => {
  s.formatter((e, r, i, n) => {
    if (n === "normal" || n === "text" || !n || i === void 0) return i;
    if (n === "number" && !Number.isNaN(Number(i))) {
      let o = 2;
      e.fixed !== void 0 && (o = e.fixed), i = Number(i).toFixed(o);
    } else if (n === "scientific" && !Number.isNaN(Number(i))) {
      let o = 2;
      e.fixed !== void 0 && (o = e.fixed), i = Zo(i, 10, o);
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
}, xr = () => /Firefox/.test(window.navigator.userAgent), Jo = [
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
], ta = (s) => s.charAt(0).toUpperCase() + s.slice(1), hs = () => xr() ? [12, 12, 12, 12] : [10, 10, 10, 10];
class ea extends Qe {
  constructor(e) {
    super();
    g(this, "configs", {});
    g(this, "carrier", I("div", [`${N}-form-item--input`]));
    g(this, "value", hs());
    g(this, "events", new cs());
    g(this, "render", () => {
    });
    this._ = I("div", ["form-item--container", `${N}-custom-input-number`]), this._.setStyles({
      position: "relative",
      padding: "30px 60px"
    });
    const r = I("div", ["paper-card", "border-darker"]);
    r._.innerHTML = '<span class="color-info" style="text-align: center">Page</span>', r.setStyles({
      width: "100px",
      height: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto"
    }), this._.append(r);
    for (let i = 0; i < 4; i++) {
      const n = I("input", [`${N}-form-item--input`]);
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
class ra {
  constructor(t) {
    g(this, "papers", Jo.map((t) => ({
      ...t,
      label: t.label || ta(t.code)
    })));
    g(this, "currentPaper");
    // MmPx: number = this.getPXEveryMM() // 每毫米的对应的像素值
    g(this, "dpi", this.getDeviceDPI());
    g(this, "table");
    g(this, "dialog");
    g(this, "formValue", {
      renderMode: "normal",
      paper: "A4",
      padding: hs(),
      direction: "portrait"
    });
    this.table = t, this.dialog = new gr([], {
      width: "fit-content",
      draggable: !0,
      onBeforeClose: () => {
        this.table.render();
      }
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
  getCurrentPaperInfo() {
    if (this.currentPaper) {
      let t, e;
      this.formValue.direction === "portrait" ? [t, e] = this.currentPaper.size : [e, t] = this.currentPaper.size;
      const [r, i, n, o] = this.formValue.padding, c = this.transferMMToPX(t - o - i), h = this.transferMMToPX(e - r - n);
      return {
        direction: this.formValue.direction,
        width: c,
        height: h
      };
    } else
      return;
  }
  // transform move method
  renderPapaer() {
    var l;
    if (!this.currentPaper) return;
    this.dialog.updateConfig({
      title: ((l = this.currentPaper) == null ? void 0 : l.label) || "",
      width: "80vw",
      height: "90vh"
    }), this.dialog.containerBody.css("height", "100%"), this.formValue.paper = this.currentPaper.code;
    const e = ((a) => {
      const u = new vr(
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
                return d.on(
                  "change",
                  (x) => {
                    this.formValue.renderMode = x, o();
                  }
                ), d;
              })()
            },
            {
              label: "纸张尺寸",
              prop: "paper",
              component: (() => {
                const d = new ar("", {
                  placeholder: "请选择纸张尺寸",
                  clearable: !0,
                  options: this.papers.map((x) => ({
                    label: this.table._i18n.t(x.label) || x.code,
                    value: x.code
                  }))
                });
                return d.on("change", (x) => {
                  this.formValue.paper = x, this.currentPaper = this.getPaperByCode(x), o();
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
                return d.on("change", (x) => {
                  this.formValue.direction = x, o();
                }), d;
              })()
            },
            {
              label: "边距 (mm)",
              prop: "padding",
              component: (() => {
                const d = new ea();
                return d.on(
                  "change",
                  (x, f) => {
                    this.formValue.padding = x, o();
                  }
                ), d;
              })()
            }
          ]
        },
        a
      );
      return u._.setStyles({
        padding: "10px",
        flex: 1
      }), u;
    })(this.formValue), r = new wt(this.table._i18n.t("printSheet"), "primary"), i = new wt(this.table._i18n.t("common.cancel"), "default");
    i._.css("margin-right", "10px"), i._.on("click", () => {
      this.dialog.close();
    });
    const n = I("div").css({
      height: "100%",
      flex: 1,
      background: "#dadce0",
      overflow: "auto",
      boxSizing: "border-box"
    }), o = () => {
      var y;
      n._.innerHTML = "";
      let a, u;
      this.formValue.direction === "portrait" ? [a, u] = this.currentPaper.size : [u, a] = this.currentPaper.size, console.log(
        `paper is: ${(y = this.currentPaper) == null ? void 0 : y.code}, direction: ${this.formValue.direction}, width: ${a}, height: ${u}`
      );
      const [d, x, f, _] = this.formValue.padding, v = new DOMParser(), w = this.table.toHtml(`A1:${Q(...this.table.getMaxArea())}`), m = v.parseFromString(w, "text/html").body.firstChild, C = (E) => {
        const H = I("div", "paper");
        H.setStyles({
          width: `${this.transferMMToPX(a)}px`,
          height: `${this.transferMMToPX(u)}px`,
          paddingTop: `${this.transferMMToPX(d)}px`,
          paddingRight: `${this.transferMMToPX(x)}px`,
          paddingBottom: `${this.transferMMToPX(f)}px`,
          paddingLeft: `${this.transferMMToPX(_)}px`,
          boxSizing: "border-box",
          margin: "20px auto",
          background: "#fff"
        });
        const P = I("div", "paper-content");
        return P.setStyles({
          width: `${this.transferMMToPX(a - _ - x)}px`,
          height: `${this.transferMMToPX(u - d - f)}px`,
          // border: '1pt solid red',
          boxSizing: "border-box",
          overflow: "hidden",
          position: "relative"
        }), P.append(E), H.append(P), H;
      }, b = this.transferMMToPX(a - _ - x), B = this.transferMMToPX(u - d - f), A = [], D = () => {
        const E = [];
        m.querySelectorAll("colgroup col").forEach((k) => {
          const O = Number(k.getAttribute("width"));
          E.push(Number.isNaN(O) ? 100 : O);
        });
        const H = m.querySelectorAll("tr");
        let P = 0, F = B, R = 0;
        H.forEach((k, O) => {
          let $ = 0;
          const V = Number(k.style.height.replaceAll("px", ""));
          F < V && (R = O, P++, F = B), A[P] || (A[P] = []);
          const L = k.querySelectorAll("td");
          let S = b, z = 0;
          L.forEach((W, M) => {
            const j = E[M];
            if (S < j) {
              const G = A[P][$];
              (G == null ? void 0 : G.dom) && (S = b), z = M, $++;
            }
            let Y = A[P][$];
            if (!Y) {
              const G = document.createElement("table");
              G.style.borderSpacing = "0", G.style.borderCollapse = "collapse", A[P][$] = {
                colWidths: [],
                dom: G
              }, Y = A[P][$];
            }
            const Z = Y == null ? void 0 : Y.dom;
            let q = Z.querySelector("tbody");
            q || (q = document.createElement("tbody"), Z.appendChild(q));
            let J = q.querySelectorAll("tr")[O - R];
            J || (J = k.cloneNode(), q.appendChild(J)), Y.colWidths[M - z] || (Y.colWidths[M - z] = j), J.appendChild(W.cloneNode(!0)), S -= j;
          }), F -= V;
        }), A.flat().forEach((k) => {
          const O = document.createElement("colgroup");
          k.colWidths.forEach((V) => {
            const L = document.createElement("col");
            L.setAttribute("width", `${V}`), O.appendChild(L);
          }), k.dom.appendChild(O);
          const $ = C(k.dom);
          n.append($);
        });
      }, T = () => {
        const E = [{ x: 0, width: 0 }];
        m.querySelectorAll("colgroup col").forEach((R) => {
          const k = E[E.length - 1], O = Number(R.getAttribute("width")), $ = Number.isNaN(O) ? 100 : O;
          b - k.width >= $ ? k.width += $ : E.push({ x: k.x + k.width, width: $ });
        }), m.style.width = "max-content";
        const H = [{ y: 0, height: 0 }];
        m.querySelectorAll("tr").forEach((R, k) => {
          const O = H[H.length - 1], $ = Number(R.style.height.replaceAll("px", ""));
          B - O.height >= $ ? O.height += $ : H.push({ y: O.y + O.height, height: $ });
        });
        const F = [];
        H.forEach((R) => {
          E.forEach((k) => {
            F.push({
              ...k,
              ...R
            });
          });
        }), F.forEach((R, k) => {
          const O = m.cloneNode(!0);
          O.style.position = "absolute", O.style.left = `${R.x * -1}px`, O.style.top = `${R.y * -1}px`;
          const $ = I("div");
          $.setStyles({
            position: "relative",
            width: `${R.width + 1}px`,
            height: `${R.height + 1}px`,
            boxSizing: "border-box",
            overflow: "hidden"
          }), $.append(O);
          const V = C($._);
          n.append(V);
        });
      };
      this.formValue.renderMode === "compat" ? T() : D();
    }, c = I("div").setStyles({
      width: "250px",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }).append(
      e._,
      I("div").setStyles({ display: "flex", flexDirection: "row-reverse", padding: "10px" }).append(r._, i._)
    ), h = I("div").css("height", "100%").css("display", "flex").append(n, c);
    this.dialog.containerBody._.innerHTML = "", this.dialog.containerBody.append(h), r._.on("click", () => {
      const a = document.createElement("div"), u = n._.children;
      for (let d = 0; d < u.length; d++) {
        const x = u.item(d);
        if (x != null && x.firstChild) {
          const f = x.firstChild.cloneNode(!0);
          a.appendChild(f);
        }
      }
      this.printDOM(a, {
        direction: this.formValue.direction,
        paper: this.formValue.paper
      });
    }), o(), this.dialog.show();
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
    g(this, "_rendererOptions", {});
    g(this, "_copyable", !1);
    g(this, "_editable", !1);
    g(this, "_minRowHeight", 25);
    g(this, "_minColWidth", 60);
    g(this, "_width");
    g(this, "_height");
    // cache for rect of content
    g(this, "_contentRect", { x: 0, y: 0, width: 0, height: 0 });
    g(this, "_headMenu", null);
    g(this, "_container");
    g(this, "_Layer");
    g(this, "_data");
    g(this, "_renderer");
    g(this, "_cells", new $s());
    // scrollbar
    g(this, "_vScrollbar", null);
    g(this, "_hScrollbar", null);
    // resizer
    g(this, "_rowResizer", null);
    g(this, "_colResizer", null);
    // editor ? extends Editor
    g(this, "_editor", null);
    g(this, "_editors", /* @__PURE__ */ new Map());
    g(this, "_selector", null);
    g(this, "_overlayer");
    g(this, "_canvas");
    // event emitter
    g(this, "_emitter", new b0());
    g(this, "_events");
    g(this, "_history");
    g(this, "_contextMenu");
    g(this, "_i18n");
    g(this, "_printer");
    const n = typeof t == "string" ? document.querySelector(t) : t;
    if (n === null) throw new Error("first argument error");
    if (this._i18n = new fr(), this._data = js(), this._Layer = I(n, `${N}-layer`).css({
      height: `${r()}px`,
      width: `${e()}px`
    }), i != null && i.hideHeadMenu || (this._headMenu = new Go(this), this._Layer.append(this._headMenu._headMenuElement)), this._width = e, this._height = () => {
      var c;
      return r() - (((c = this._headMenu) == null ? void 0 : c.height) || 0);
    }, this._container = I("div", `${N}-container`).css({
      height: `${this._height()}px`,
      width: `${e()}px`
    }), this._Layer.append(this._container), i) {
      const { minColWidth: c, minRowHeight: h, renderer: l, data: a } = i;
      if (c && (this._minColWidth = c), h && (this._minRowHeight = h), l && (this._rendererOptions = l), a) {
        const { cols: u, rows: d, rowHeight: x, colWidth: f } = a, { _data: _ } = this;
        u && (_.cols.len = u), d && (_.rows.len = d), x && (_.rowHeight = x), f && (_.colWidth = f);
      }
    }
    const o = document.createElement("canvas");
    this._canvas = I(o).attr("tabIndex", "1"), this._container.append(o), this._renderer = new Ze(o, e(), this._height()), this._overlayer = new Ds(this._container), Ye(this), i != null && i.selectable && U.init(this), i != null && i.scrollable && Tt.init(this), i != null && i.resizable && lo.init(this), i != null && i.editable && (this._editable = !0), this._copyable = (i == null ? void 0 : i.copyable) || !1, this._events = new uo(this), this._history = new xo(), this._contextMenu = new Fo(this), this._printer = new ra(this), Qo(this._cells);
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
    e.scrollRows(t.scroll[0]).scrollCols(t.scroll[1]).printInfo(
      (() => {
        const o = this._printer.getCurrentPaperInfo();
        if (o)
          return {
            scrollX: t.scroll[2],
            scrollY: t.scroll[3],
            width: o.width,
            height: o.height,
            direction: o.direction
          };
      })()
    ).merges(t.merges).freeze(t.freeze || "A1").styles(t.styles).borders(t.borders).rows(t.rows.len).cols(t.cols.len).row((o) => St(t, o)).col((o) => Rt(t, o)).cell((o, c) => this.cell(o, c)).formatter(this._cells._formatter).render();
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
      e.render(), U.reset(this), this._canvas.focus();
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
      [n, i] = et(e);
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
    } else typeof t == "string" && ([o, c] = ho(this, t, [i, n]));
    return (o > 0 || c > 0) && (U.unionRange(this, o, c), U.reset(this)), this;
  }
  /**
   * @param from A1:H12
   */
  toHtml(t) {
    return co(this, t);
  }
  /** () => [col, row] */
  getMaxArea() {
    let t = 0, e = 0;
    const r = this.data();
    return r.borders.forEach((i) => {
      const n = i[0].split(":").slice(-1)[0], o = et(n);
      e = Math.max(e, o[0]), t = Math.max(t, o[1]);
    }), r.cells.forEach((i) => {
      if (i) {
        let [n, o] = i;
        const c = Q(o, n), h = r.merges.filter((l) => l.includes(c));
        if (h.length > 0) {
          const l = et(h[0].split(":")[1]);
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
  xt as Renders,
  je as default,
  I as h,
  Ye as resizeContentRect
};
