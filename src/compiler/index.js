/**
 * 将html模板 转换为 render 函数
 * 直接是不能转化的
 * 将html用ast来描述，再将这样的结构转变成js语法，生成出对应的代码字符串
 * 1. 需要将 html 代码转化为 ast 语法树 可以用ast来描述语言本身，根据语法生成的特定逻辑(可以描述dom，也可以描述js语法)
 *
 * 比如 <div id='app'>123</div>
 * {
 *   attrs: [{id:'a'}]
 *   tags: 'div',
 *   children:[]
 * }
 * const a = 123
 * {
 *   identifier: const,
 *   name: a,
 *   value: 1
 * }
 * 虚拟 dom 是用来描述对象节点的 和 ast 是有区别的 一个是对语法，一个是对结构，层面不同
 *
 * 2. 通过这棵树，生成新的代码
 */

/**
 *  <div id='root'>hello {{name}} <span>world</span></div>
 *
 * {
 *  tag:'div', 标签名
 *  parent: null,  是否有父元素
 *  type: 1， 元素类型
 *  attrs:[{id:'root'}], 是否有属性，
 *  children:[
 *  { tag: null, parent:'父div',attrs:[],text:'hello {{name}}' }
 *  { tag: span, parent:'父div',attrs:[],text:'world' }
 *  ]
 * }
 *
 * 一点点分析 到底是字符串 内容 属性
 * @param {*} html
 */

import { unicodeLetters } from '../util';

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeLetters}]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const doctype = /^<!DOCTYPE [^>]+>/i;
const comment = /^<!\--/;
const conditionalComment = /^<!\[/;

function parseHtml(html) {}

export function complieToFunctions(template) {
  let ast = parseHtml(template);
}
