const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve({ token, expiresIn: 10 * 60 * 60 });
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
