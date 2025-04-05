const admin = require("../firebase/firebaseAdmin");

// Signup
exports.signup = async (req, res) => {
  const { email, password, role = "voter", district = "global" } = req.body;

  try {
    const user = await admin.auth().createUser({ email, password });

    await admin.auth().setCustomUserClaims(user.uid, {
      role,
      district,
      verifiedVoter: true,
    });

    res
      .status(201)
      .json({ message: "User created", uid: user.uid, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Signup error", error: error.message });
  }
};

// Signin (Verifies token sent from frontend Firebase Auth)
exports.signin = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.status(200).json({ message: "Signin successful", user: decodedToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

// Protected Profile Route
exports.getProfile = async (req, res) => {
  try {
    const user = await admin.auth().getUser(req.user.uid);
    res.status(200).json({ profile: user, claims: req.user });
  } catch (error) {
    res.status(500).json({ message: "Profile error", error: error.message });
  }
};
