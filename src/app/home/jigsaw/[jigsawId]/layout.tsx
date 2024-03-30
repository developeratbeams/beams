// layout for jigsaw
import { getAuther } from "@/libs/getAuther";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/components/Loader";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const self = await getAuther();
  if (!self?.onBoarding) redirect("/get-started");
  return (
    <>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  );
}
