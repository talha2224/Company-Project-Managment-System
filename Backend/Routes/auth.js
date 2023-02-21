const express = require("express");
const Admin = require("../Model/Admin");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRETE = "SomeRandomString@l";

router.post("/createadmin",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid  email").isEmail(),
    body("password").isLength({ min: 5 }).withMessage("Enter atleast 5 charater long password"),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    /* Check whether the admin with same email exsits already.*/
    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        //show error in case matching email with already exists admin's email.
        return res
          .status(400)
          .json({ success, error: "Admin with this Email already exists" });
      }

      /*..........++ NEW ADMIN..........*/
      const salt = await bcrypt.genSalt(10);
      const securePasssword = await bcrypt.hash(req.body.password, salt);
      admin = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: securePasssword,
      });

      /*For returning auth token to admin.*/
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authToken = jwt.sign(data,JWT_SECRETE);
      success = true;
      const username=admin.name
      res.json({ success, authToken,username});
      //res.json(admin);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


// LOGIN
router.post("/adminlogin",
  [
    body(
      "email",
      "Enter a valid  email"
    ).isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; 
    //taking email and password from admin.
    /* Now comparing admin entered email and password with already eneterd or stored email. */
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        success = false;
        return res.status(500).json({ error: "Email Not Registered" });
      }
      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Enter correct credentials" });
      }
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRETE);
      success = true;
      const username=admin.name
      res.json({ success, authToken,username});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


module.exports = router;