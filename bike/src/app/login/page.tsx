import LoginPage from "./form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Log() {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log("session exists, redirecting to profile");
    redirect("/profile");
  }
  return <LoginPage />;
}