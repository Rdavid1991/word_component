
let apiUrl = "http://__URL__/api/";

if (process.env.REACT_APP_ENV.toString() === "DEV") {
  apiUrl = apiUrl.replace("__URL__", "172.20.70.87");
} else if (process.env.REACT_APP_ENV.toString() === "PROD") {
  apiUrl = apiUrl.replace("__URL__", "172.17.100.76/template_manager");
}

export const globals = {
  apiUrl
}