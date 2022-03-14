
let apiUrl = "http://__URL__/api/";

if (process.env.REACT_APP_ENV.toString() == "DEV") {
  apiUrl = apiUrl.replace("__URL__", "localhost");
} else if (process.env.REACT_APP_ENV.toString() == "PROD") {
  apiUrl = apiUrl.replace("__URL__", "localhost");
}


export const globals = {
  apiUrl ,
  memoUrl: "https://midespa.sharepoint.com/:l:/s/MIDES-ITSOFT/FEME6ZgKMspCpHhdfD8pBKIBq3QfQIQZJin382i9WT7BWQ?e=QWpJv3",
  notaUrl: "https://midespa.sharepoint.com/:l:/s/MIDES-ITSOFT/FMrdsA3wCBhGlT02gK5iZcYBsED96kPZTa_p03eerCnXvA?e=bCVIH7"
};
