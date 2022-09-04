import React from "react";

export default function SignUp() {
  return (
    <div id="SignUp">
      <div className="card">
        Sign Up
        <span>
          Already have an account?{" "}
          <a href="/login">
            <strong>Log In</strong>
          </a>
        </span>
      </div>
    </div>
  );
}
