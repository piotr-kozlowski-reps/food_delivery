import ResetPassword from "../../shared/Auth/ResetPassword";

function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const activationToken = searchParams["verify"] ?? "";
  console.log({ activationToken });

  return (
    <div>
      <ResetPassword activationToken={activationToken} />
    </div>
  );
}

export default page;
