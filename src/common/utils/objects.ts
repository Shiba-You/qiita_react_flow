export const randomId = (n: number = 16): string => {
  var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(Array(n))
    .map(() => S[Math.floor(Math.random() * S.length)])
    .join("");
};
