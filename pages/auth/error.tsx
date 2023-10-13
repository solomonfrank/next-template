import { useSearchParams } from "next/navigation";
import { z } from "zod";

type queryProps = {
  error: string;
};

const queryScheme = z.object({
  error: z.string().optional(),
});

const Error = () => {
  const searchParams = useSearchParams();
  const { error } = queryScheme.parse(searchParams);

  return <div>{error}</div>;
};

export default Error;
