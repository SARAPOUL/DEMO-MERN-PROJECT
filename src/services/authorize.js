export const authenticate = (res, next) => {
  if (typeof window !== "undefined") {
    console.log(res);
    sessionStorage.setItem("Token", JSON.stringify(res.data.token));
    sessionStorage.setItem("user", JSON.stringify(res.data.username));
  }
  next();
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    if (sessionStorage.getItem("Token")) {
      return JSON.parse(sessionStorage.getItem("Token"));
    } else {
      return false;
    }
  }
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

export const logout = (next) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("user");
  }
  next();
};
