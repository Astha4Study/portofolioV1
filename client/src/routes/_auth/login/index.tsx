import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { hcWithType } from "server/client";

export const Route = createFileRoute("/_auth/login/")({
  component: LoginPage,
});

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

const client = hcWithType(SERVER_URL);

type ResponseType = Awaited<ReturnType<typeof client.test.$get>>;

function LoginPage() {
  const [data, setData] = useState<
    Awaited<ReturnType<ResponseType["json"]>> | undefined
  >();

  const { mutate: sendRequest } = useMutation({
    mutationFn: async () => {
      try {
        const res = await client.test.$get();
        if (!res.ok) {
          console.log("Error fetching data");
          return;
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return <div><Button onClick={() => sendRequest()}>Call API</Button>{data && (
				<pre className="bg-gray-100 p-4 rounded-md">
					<code>
						Message: {data.message} <br />
						Success: {data.success.toString()}
					</code>
				</pre>
			)}</div>;
}
