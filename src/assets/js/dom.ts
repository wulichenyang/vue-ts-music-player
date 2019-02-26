/* 对dom的基本操作 */

export const hasClass = (el: any, className: string): boolean => {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export const addClass = (el: any, className: string): void => {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 获取或者设置data-name属性值
export const getData = (el: any, name: string, val?: string): string | undefined => {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    // 如果有 val 就添加这个 val 到 dom 中
    // name="val"
    return el.setAttribute(name, val)
  } else {
    // 没有 val ，就获取 dom 中的 name
    return el.getAttribute(name)
  }
}

// 能力检测
let elementStyle:any = document.createElement('div').style

let vendor: string | boolean = (() => {
  // 定义浏览器前缀
  let transformNames: any = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  // 遍历前缀，如果浏览器支持的话，就返回对应 key
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  // 如果都不支持，那肯定是有问题的，返回 false
  return false
})()

export function prefixStyle (style:string) {
  if (vendor === false) {
    return false
  }
  // 如果 vendor 为标准，就不改变 style
  if (vendor === 'standard') {
    return style
  }

  // 否则返回 vender(也就是 webkit Moz O ms 中的一个) + 样式首字母大写
  // 例如：webkit + transform ---> webkitTransform
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
