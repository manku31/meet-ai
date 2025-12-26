"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

/**
 * Render the application's home view with authentication UI and session-aware controls.
 *
 * When a session exists, displays the signed-in user's email and a sign-out button.
 * When no session exists, displays a signup form (name, email, password) and a login form (email, password).
 *
 * @returns A React element showing either the signed-in view or the signup/login forms
 */
export default function Home() {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = authClient.useSession();

  // Function to handle form submission
  const onSubmit = async () => {
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      console.error("Error creating user:", error);
      window.alert(`Something went wrong`);
      return;
    }

    if (data) {
      console.log("User created successfully:", data);
      window.alert(`User created successfully: ${data.user.email}`);
      return;
    }
  };

  const onLogin = async () => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error);
      window.alert(`Something went wrong`);
      return;
    }

    if (data) {
      console.log("User logged in successfully:", data);
      window.alert(`User logged in successfully`);
      return;
    }
  };

  return (
    <div>
      {session ? (
        <div>
          <h1>Logged in as {session.user.email}</h1>
          <Button onClick={() => authClient.signOut()}>Sign out</Button>
        </div>
      ) : (
        <div className="grid grid-row-3 gap-4">
          <div className="p-4 flex flex-col gap-y-4">
            <Input
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={onSubmit}>Create User</Button>
          </div>
          <div className="p-4 flex flex-col gap-y-4">
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={onLogin}>Login</Button>
          </div>
        </div>
      )}
    </div>
  );
}