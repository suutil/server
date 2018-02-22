const users = require('./users/users.service.js');
const refreshTokens = require('./refresh-tokens/refresh-tokens.service.js');
const sendMail = require('./send-mail/send-mail.service.js');
const invitationUsers = require('./invitation-users/invitation-users.service.js');
const setPassword = require('./set-password/set-password.service');
const resetPasswordMail = require('./reset-password-mail/reset-password-mail.service.js');
const companyInfo = require('./company-info/company-info.service.js');
const picture = require('./picture/picture.service.js');
const favoriteShops = require('./favorite-shops/favorite-shops.service.js');
const favorites = require('./favorites/favorites.service.js');

const tag = require('./tag/tag.service.js');
const category = require('./category/category.service.js');
const shops = require('./shops/shops.service.js');
const blog = require('./blog/blog.service.js');
const confirmation = require('./confirmation/confirmation.service.js');
const confirmationMail = require('./confirmation-mail/confirmation-mail.service.js');









module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(refreshTokens);
  app.configure(sendMail);
  app.configure(setPassword)
  app.configure(resetPasswordMail);
  app.configure(picture);
  app.configure(favoriteShops);
  app.configure(favorites);
  app.configure(tag);
  app.configure(category);
  app.configure(shops);
  app.configure(blog);
  app.configure(confirmation);
  app.configure(confirmationMail);



};
