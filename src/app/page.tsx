import { redirect } from "next/navigation";

export default function Home() {
  redirect("/success"); // Automatically redirects to /success
  return null; // This ensures no content is rendered before redirect
}
