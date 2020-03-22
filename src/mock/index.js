export function fakeGetCodeInfo() {
  return {
    code: 1,
    data: {
      id: "requestCodeId",
      x: 150
    }
  };
}

export function fakeLogin(username, password, codeId, x) {
  return {
    code: 1,
    message: "登陆成功",
    data: {
      username,
      password,
      codeId,
      x
    }
  };
}
