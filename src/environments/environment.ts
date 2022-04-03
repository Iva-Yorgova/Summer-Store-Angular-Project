import { domain, clientId } from "../../auth_config.json";

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin
  },
  firebase: {
    apiKey: "AIzaSyDZdUQV2aSlR93mBpDsf5A0N9Gg1qNM46I",
    authDomain: "summer-blog-dfc3e.firebaseapp.com",
    databaseUrl: "https://summer-blog-dfc3e.firebaseio.com",
    projectId: "summer-blog-dfc3e",
    storageBucket: "summer-blog-dfc3e.appspot.com",
    messagingSenderId: "333789929231",
    appId: "1:333789929231:web:683f91ae8c582cbce7687a",
    measurementId: "G-GCC9CP4RQH"
  }
};


