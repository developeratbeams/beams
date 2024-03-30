// Common layout for home router
import { getAuther } from "@/libs/getAuther";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const self = await getAuther();
  //  if not completed onboarding redirect to get-started
  if (!self?.onBoarding) redirect("/get-started");
  return <>{children}</>;
}
