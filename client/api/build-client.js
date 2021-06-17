import axios from "axios";

export default ({ req }) => {
  console.clear();
  console.log("HEADER", req.headers.host);
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: { "Host": req.headers.host },
    });
  }
  return axios.create({
    baseURL: "/",
  });
};
