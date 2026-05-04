const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tvojemail@gmail.com",
    pass: "APP_PASSWORD_OVDE"
  }
});