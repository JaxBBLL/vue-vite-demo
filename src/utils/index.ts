import { cloneDeep } from 'lodash-es';

export function uuid() {
  const uuidChars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let r;
  const uuid = [];
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
  uuid[14] = '4';

  for (let i = 0; i < 36; i++) {
    if (!uuid[i]) {
      r = 0 | (Math.random() * 16);
      uuid[i] = uuidChars[i == 19 ? (r & 0x3) | 0x8 : r];
    }
  }
  return uuid.join('');
}

export const awaitWrap = (promise: Promise<any>) => {
  return promise.then((data) => [data, null]).catch((err) => [null, err]);
};

export function removeNullParameter(data: any) {
  const o = cloneDeep(data);
  if (typeof o === 'string') {
    return o;
  }
  for (const k in o) {
    if (typeof o[k] === 'string') {
      o[k] = o[k].trim();
      if (o[k] === '') {
        delete o[k];
      }
    }
  }
  return o;
}

export function traversalTree(node, children, callback) {
  const list = [];
  if (node === null) {
    return;
  }
  const queue = [];
  if (Array.isArray(node)) {
    [].push.apply(queue, node);
  } else {
    queue.push(node);
  }
  let target;
  while (queue.length) {
    target = queue.shift();
    if (callback) {
      list.push(callback(target));
    } else {
      list.push(target);
    }
    if (target[children] && target[children].length) {
      [].push.apply(queue, target[children]);
    }
  }
  return list;
}
