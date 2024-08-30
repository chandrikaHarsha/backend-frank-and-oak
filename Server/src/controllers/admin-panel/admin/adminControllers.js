require("dotenv").config();
const Admin = require("./../../../models/admin/admin");

const adminRegister = async () => {
  const AdminFromDB = await Admin.find();
  if (AdminFromDB.length !== 0) return console.log(AdminFromDB);

  const adminCredentials = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };

  const SaveAdminCredentials = new Admin(adminCredentials);
  const response = await SaveAdminCredentials.save();
  console.log(response);
};

const loginAdmin = async (req, res) => {
  try {
    const ifValidEmail = await Admin.find({ email: req.body.email });

    if (ifValidEmail.length === 0)
      return res.status(400).json({ message: "Invalid email" });
    if (ifValidEmail[0].password !== req.body.password)
      return res.status(401).json({ message: "Invalid Password." });
    res.status(200).json({ message: "Admin Logged In", data: ifValidEmail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { adminRegister, loginAdmin };
