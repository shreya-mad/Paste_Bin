let BASE_URL = "";
if (window.location.hostname === "localhost") {
  BASE_URL = "http://localhost:5002";
} else {
  BASE_URL = "https://pastebin-backend-vc0r.onrender.com";

  
             
}

export  {BASE_URL};

