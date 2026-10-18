"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        if (!data.user) router.replace("/login");
        else setEmail(data.user.email ?? "");
      });
  }, [router]);

  async function logOut() {
    await createClient().auth.signOut();
    router.push("/login");
  }

  if (email === null) return <p className="p-8">Loading...</p>;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold">Your dashboard</h1>
      <p className="text-gray-600">Logged in as {email}</p>
      <p>Your sessions will appear here.</p>
      <button onClick={logOut} className="w-fit rounded border px-4 py-2">
        Log out
      </button>
    </main>
  );
}