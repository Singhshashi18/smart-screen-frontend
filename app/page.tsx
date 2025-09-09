

"use client";

import { useAuth, useUser, SignOutButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Home() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [response, setResponse] = useState("");

  const callProtectedApi = async () => {
    
    const token = await getToken();
    const res = await fetch("http://localhost:3000/api/status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setResponse(JSON.stringify(data));
  };

  return (
    <div className="p-4">
      <SignedOut>
        <div className="text-red-600">
          Please sign in to test API. <SignInButton />
        </div>
      </SignedOut>

      <SignedIn>
        <h1 className="text-xl mb-4">Welcome {user?.fullName}!</h1>
        <button
          onClick={callProtectedApi}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test Protected API
        </button>
        <p className="mt-4">Response: {response}</p>
        <SignOutButton />
      </SignedIn>
    </div>
  );
}
