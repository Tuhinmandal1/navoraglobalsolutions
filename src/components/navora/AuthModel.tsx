import { useState } from "react";
import { auth, db } from "@/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

type Props = {
  onClose: () => void;
};

export default function AuthModel({ onClose }: Props) {
  const [login, setLogin] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
  try {
    // Create Firebase account
    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Save user to Firestore
    await setDoc(doc(db, "users", user.user.uid), {
      name,
      phone,
      company,
      email,
      createdAt: new Date(),
    });

    console.log("User saved to Firestore");

    // Send email notification
    const result = await emailjs.send(
      "service_uf0y35i",
      "template_2gvuaao",
      {
        name,
        company,
        phone,
        email,
      },
      "fZjzGVkdpqjikSY8N"
    );

    console.log("Email sent:", result);

    alert("Account Created Successfully!");
onClose();

  } catch (err: any) {
    console.log(err);
    console.log(err.text);
    console.log(err.status);
    alert(err.message);
  }
};

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful!");
onClose();
    } catch (err: any) {
      console.error("Signup Error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">

      <div className="relative bg-white rounded-2xl w-[420px] p-8">
        <button
  onClick={onClose}
  className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
>
  ✕
</button>

        <h2 className="text-2xl font-bold text-center mb-6">
          {login ? "Login" : "Create Account"}
        </h2>

        {!login && (
          <>
            <input
              placeholder="Full Name"
              className="border p-3 rounded-lg w-full mb-3"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Phone Number"
              className="border p-3 rounded-lg w-full mb-3"
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              placeholder="Company Name"
              className="border p-3 rounded-lg w-full mb-3"
              onChange={(e) => setCompany(e.target.value)}
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg w-full mb-5"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login ? handleLogin : handleSignup}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          {login ? "Login" : "Create Account"}
        </button>

        <p className="text-center mt-5">

          {login ? "Don't have an account?" : "Already have an account?"}

          <button
            className="text-blue-600 ml-2"
            onClick={() => setLogin(!login)}
          >
            {login ? "Create Account" : "Login"}
          </button>

        </p>
        <button
  onClick={onClose}
  className="mt-5 w-full border border-gray-300 rounded-lg py-3 hover:bg-gray-100"
>
  Continue as Guest
</button>

      </div>

    </div>
  );
}