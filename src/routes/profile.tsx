import { createFileRoute } from "@tanstack/react-router";
import { auth, db } from "@/firebase";
import { useEffect, useState } from "react";
import {
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));

      if (snap.exists()) {
        const data = snap.data();

        setName(data.name || "");
        setCompany(data.company || "");
        setPhone(data.phone || "");
      }
    };

    loadData();
  }, []);

  const saveChanges = async () => {
  try {
    if (!user) {
      alert("Please login again.");
      return;
    }

    // Update Firestore
    await updateDoc(doc(db, "users", user.uid), {
      name,
      company,
      phone,
    });

    // Update Firebase Auth
    await updateProfile(user, {
      displayName: name,
    });

    // Email to Owner
    await emailjs.send(
      "service_uf0y35i",
      "template_2gvuaao",
      {
        name,
        company,
        phone,
        email: user.email,
      },
      "fZjzGVkdpqjikSY8N"
    );

    // Email to User
    await emailjs.send(
      "service_uf0y35i",
      "template_fwyri24",
      {
        name,
        email: user.email,
      },
      "fZjzGVkdpqjikSY8N"
    );

    alert("Profile updated successfully!");

    window.location.href = "/";
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white rounded-2xl shadow-xl w-[500px] p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <input
          className="border rounded-lg p-3 w-full mb-4"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="Name"
        />

        <input
          className="border rounded-lg p-3 w-full mb-4"
          value={company}
          onChange={(e)=>setCompany(e.target.value)}
          placeholder="Company"
        />

        <input
          className="border rounded-lg p-3 w-full mb-4"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          placeholder="Phone"
        />

        <button
          onClick={saveChanges}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Save Changes
        </button>

        <button
          onClick={logout}
          className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}   