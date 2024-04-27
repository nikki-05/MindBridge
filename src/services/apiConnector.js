import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  console.log(method);
  console.log(url);
  console.log(bodyData)
  try {
    const d = axiosInstance({
      method: `${method}`,
      url: `${url}`,
      data: bodyData ? bodyData : null,
      headers: headers ? headers : null,
      params: params ? params : null,
    });
    console.log("show it-->", d)
    return d
  } catch (e) {
    console.log(e.message)
  }

};
