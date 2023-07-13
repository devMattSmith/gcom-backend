let path = require("path");
const fs = require("fs-extra");
const Handlebars = require("handlebars");

path = path.join(__dirname, "../templates");

const forgotPasswordTemplateSource = fs.readFileSync(
  `${path}/forgotPassword.html`,
  { encoding: "utf8" }
);
const getForgotTemplate = Handlebars.compile(forgotPasswordTemplateSource);
const emailVerifyTemplateSource = fs.readFileSync(`${path}/emailVerify.html`, {
  encoding: "utf8",
});
const emailVerifyTemplate = Handlebars.compile(emailVerifyTemplateSource);

const welcomTemplateSource = fs.readFileSync(`${path}/welcome.html`, {
  encoding: "utf8",
});
const welcomTemplate = Handlebars.compile(welcomTemplateSource);

module.exports = {
  getForgotTemplate,
  welcomTemplate,
  emailVerifyTemplate,
};
