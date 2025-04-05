import { useState } from "react";
import { auth, firebase } from "../firebase";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const sendOTP = async () => {
    try {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha", {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved ✅", response);
        },
      });

      const result = await auth.signInWithPhoneNumber(phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      alert("OTP Sent ✅");
    } catch (err) {
      console.error("OTP send failed:", err.message);
      alert("Error: " + err.message);
    }
  };

  const verifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert("OTP Verified ✅");
    } catch (err) {
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+91XXXXXXXXXX"
        className="border p-2 mb-2 w-full"
      />
      <div id="recaptcha" />
      <button onClick={sendOTP} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Send OTP
      </button>

      {confirmationResult && (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border p-2 my-2 w-full"
          />
          <button
            onClick={verifyOTP}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}
