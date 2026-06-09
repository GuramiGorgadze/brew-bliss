import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export const cacheMiddleware = (duration) => (req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }

  const key = req.originalUrl;

  const cached = cache.get(key);
  if (cached) {
    return res.status(200).json(cached);
  }

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    cache.set(key, data, duration);
    return originalJson(data);
  };

  next();
};
