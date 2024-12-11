import { ProfilePage } from "./profile-page";
import { USERNAMES } from "@/lib/constants";

export function generateStaticParams() {
  return USERNAMES.map((username) => ({
    username,
  }));
}

export const dynamicParams = false;

export default function Page({ 
  params 
}: { 
  params: { username: string } 
}) {
  return <ProfilePage params={params} />;
}