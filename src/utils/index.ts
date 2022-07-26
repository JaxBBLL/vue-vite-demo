export function uuid() {
  var uuidChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  )
  var r
  var uuid = []
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
  uuid[14] = '4'

  for (var i = 0; i < 36; i++) {
    if (!uuid[i]) {
      r = 0 | (Math.random() * 16)
      uuid[i] = uuidChars[i == 19 ? (r & 0x3) | 0x8 : r]
    }
  }
  return uuid.join('')
}

export function typeOf(obj: any) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

export function deepCopy(data: any): any {
  const t = typeOf(data)
  let o
  if (t === 'array') {
    o = []
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    o = {} as { [key: string]: any }
    for (const i in data) {
      o[i] = deepCopy(data[i])
    }
  } else {
    return data
  }
  return o
}

export function objReduce(data: any) {
  var o = deepCopy(data)
  if (typeOf(o) === 'string') {
    return o
  }
  for (var k in o) {
    if (typeOf(o[k]) === 'string') {
      o[k] = o[k].trim()
      if (o[k] === '') {
        delete o[k]
      }
    }
  }
  return o
}

export function adornUrl(url: string, customUrl: boolean | string = false) {
  const baseUrl =
    customUrl === false ? import.meta.env.VITE_API_BASE : customUrl
  return baseUrl + url
}
