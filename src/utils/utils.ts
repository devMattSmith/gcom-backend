import moment from "moment";

export const QUERY_PARAMS = (params: object) => {
  const LIMIT = params["limit"] || 20;
  const SORT = params["sort"] || "-createdAt";
  const paramkeys = Object.keys(params);
  const filter = {};
  for (let i = 0; i < paramkeys.length; i++) {
    if (paramkeys[i] != "page") {
      filter[paramkeys[i]] = params[paramkeys[i]];
    }
  }
  filter["limit"] = LIMIT;
  filter["skip"] = (params["page"] - 1) * LIMIT;
  filter["sort"] = SORT;
  return filter;
};

export const generatePassword = () => {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

