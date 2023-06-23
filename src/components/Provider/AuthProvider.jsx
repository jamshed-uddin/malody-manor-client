import React, { useState } from "react";
import app from "../../firebase/firebase.config";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);
const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return <div></div>;
};

export default AuthProvider;
