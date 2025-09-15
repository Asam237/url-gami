export const generateShortCode = async () => {
  const { customAlphabet } = await import("nanoid");
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, 7);
  return nanoid();
};

