// 封装cookie的操作

function getCookie(key: string): string | undefined {
  if (document.cookie) {
    let cookieArr = document.cookie.split('; ');
    for (let i = 0; i < cookieArr.length; i++) {
      let keyArr = cookieArr[i].split("=");
      if (keyArr[0] === key) {
        return decodeURI(keyArr[1])
        break
      }
    }
  } else {
    return ''
  }
}

function setCookie(name: string, val: any, hour: number) {
  // 毫秒ms
  let expHour = hour * 60 * 60 * 1000;
  let expireDate = new Date();
  expireDate.setTime(expireDate.getTime() + expHour);
  document.cookie = `${name}=${encodeURI(val)}; expires=${expireDate.toGMTString()}`;
}

function removeCookie(name: string) {
  setCookie(name, "", -24);
}

const cookie = {
  setCookie,
  getCookie,
  removeCookie
};

export default cookie