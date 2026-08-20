export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? 'nr13pro_dev_secret_change_me',
  expiresInSeconds: 30 * 24 * 60 * 60, // 30 dias
};
