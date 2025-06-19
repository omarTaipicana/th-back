const catchError = require("../utils/catchError");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const EmailCode = require("../models/EmailCode");

const getAll = catchError(async (req, res) => {
  const results = await User.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const {
    cI,
    email,
    password,
    grado,
    firstName,
    lastName,
    cellular,
    dateBirth,
    departamento,
    seccion,
    role,
    isAvailable,
    isVerified,
    frontBaseUrl,
  } = req.body;
  const bcryptPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    cI,
    email,
    password: bcryptPassword,
    grado,
    firstName,
    lastName,
    cellular,
    dateBirth,
    departamento,
    seccion,
    role,
    isAvailable,
    isVerified,
  });

  const code = require("crypto").randomBytes(32).toString("hex");
  const link = `${frontBaseUrl}/${code}`;

  await EmailCode.create({
    code: code,
    userId: result.id,
  });

  await sendEmail({
    to: email,
    subject: "Verificación de correo electrónico – APP TH-DIGIN",
    html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); overflow: hidden;">
      
      <!-- Encabezado con logo y título -->
      <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
        <img src="https://res.cloudinary.com/desgmhmg4/image/upload/v1747778135/digin_ud8gli.png" alt="Logo DIGIN" style="height: 80px; margin-bottom: 10px;" />
        <h1 style="color: #ffffff; font-size: 20px; margin: 0;">TALENTO HUMANO DE LA DIGIN</h1>
      </div>
      
      <!-- Cuerpo del mensaje -->
      <div style="padding: 30px;">
        <h2 style="color: #2c3e50;">¡Bienvenido/a, ${firstName} ${lastName}!</h2>
        <p style="color: #555;">Gracias por registrarte en la App Web de Talento Humano de la DIGIN.</p>
        <p style="color: #555;">Para completar tu registro y activar tu cuenta, por favor haz clic en el siguiente botón:</p>
        
        <!-- Botón de verificación -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${link}" style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">Verificar Cuenta</a>
        </div>
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          Si tú no solicitaste este registro, puedes ignorar este mensaje.
        </p>
      </div>
    </div>
  </div>
  `,
  });

  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await User.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await User.findByPk(id);
  await User.destroy({ where: { id } });
  return res.json(result).sendStatus(204);
});

const update = catchError(async (req, res) => {
  const {
    cI,
    email,
    password,
    grado,
    firstName,
    lastName,
    cellular,
    departamento,
    seccion,
    role,
    isAvailable,
    isVerified,
  } = req.body;
  const { id } = req.params;
  const result = await User.update(
    {
      cI,
      grado,
      firstName,
      lastName,
      cellular,
      departamento,
      seccion,
      role,
      isAvailable,
      isVerified,
    },
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) return res.status(401).json({ message: "Usuario Incorrecto" });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return res.status(401).json({ message: "Contraseña Incorrecta" });
  if (!user.isVerified)
    return res
      .status(401)
      .json({ message: "El usuario no ha verificado su correo electrónico" });

  const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return res.json({ token });
});

const verifyCode = catchError(async (req, res) => {
  const { code } = req.params;
  const emailCode = await EmailCode.findOne({ where: { code: code } });
  if (!emailCode) return res.status(404).json({ message: "Código Incorrecto" });

  const user = await User.findByPk(emailCode.userId);
  user.isVerified = true;
  await user.save();

  //   const user = await User.update(
  //     { isVerified: true },
  //     { where: emailCode.userId, returning: true }
  //   );

  await emailCode.destroy();

  return res.json({ message: "Usuario verificado correctamente", user });
});

const getLoggedUser = catchError(async (req, res) => {
  const loggedUser = req.user;
  const id = loggedUser.id;

  const result = await User.findByPk(id);
  if (!result) return res.sendStatus(404);

  return res.json(result);
});

const sendEmailResetPassword = catchError(async (req, res) => {
  const { email, frontBaseUrl } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) return res.status(401).json({ message: "Usuario Incorrecto" });
  const code = require("crypto").randomBytes(32).toString("hex");
  const link = `${frontBaseUrl}/${code}`;
  await EmailCode.create({
    code: code,
    userId: user.id,
  });
  await sendEmail({
    to: email,
    subject: "Restablecer su contraseña – APP TH-DIGIN",
    html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); overflow: hidden;">
      
      <!-- Encabezado con logo y título -->
      <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
        <img src="https://res.cloudinary.com/desgmhmg4/image/upload/v1747778135/digin_ud8gli.png" alt="Logo DIGIN" style="height: 80px; margin-bottom: 10px;" />
        <h1 style="color: #ffffff; font-size: 20px; margin: 0;">TALENTO HUMANO DE LA DIGIN</h1>
      </div>
      
      <!-- Cuerpo del mensaje -->
      <div style="padding: 30px;">
        <h2 style="color: #2c3e50;">Hola, usuario:  ${user.firstName} ${user.lastName}</h2>
        <p style="color: #555;">Hemos recibido una solicitud para restablecer tu contraseña en la App Web de Talento Humano de la DIGIN.</p>
        <p style="color: #555;">Para continuar con el proceso, por favor haz clic en el siguiente botón:</p>
        
        <!-- Botón de restablecimiento -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${link}" style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">Restablecer Contraseña</a>
        </div>
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          Si tú no solicitaste este cambio de contraseña, puedes ignorar este mensaje.
        </p>
      </div>
    </div>
  </div>
  `,
  });

  return res.json(user);
});

const resetPassword = catchError(async (req, res) => {
  const { password } = req.body;
  const { code } = req.params;
  const emailCode = await EmailCode.findOne({ where: { code: code } });
  if (!emailCode) return res.status(401).json({ message: "Codigo Incorrecto" });
  const bcryptPassword = await bcrypt.hash(password, 10);
  const id = emailCode.userId;

  const result = await User.update(
    {
      password: bcryptPassword,
    },
    { where: { id }, returning: true }
  );

  await emailCode.destroy();
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  login,
  verifyCode,
  getLoggedUser,
  sendEmailResetPassword,
  resetPassword,
};
