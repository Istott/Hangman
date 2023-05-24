// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
// } from "@tanstack/react-query";
// import { httpBatchLink } from "@trpc/client";
// import { useEffect, useState } from "react";
// import { trpc } from "./utils/trpc";
// import Hangman from "./components/hangman";

// export default function App() {
//   const [queryClient] = useState(() => new QueryClient());
//   const [trpcClient] = useState(() =>
//     trpc.createClient({
//       links: [
//         httpBatchLink({
//           url: "http://localhost:3000/trpc",
//           // You can pass any HTTP headers you wish here
//           // async headers() {
//           //   return {
//           //     authorization: getAuthCookie(),
//           //   };
//           // },
//         }),
//       ],
//     })
//   );
//   // const result = trpc.sayHi.useQuery("sup");
//   const [bob, setBob] = useState<string | undefined>("sup dude");
//   useEffect(() => {
//     const rval = trpc.sayHi.useQuery("sup");
//     setBob(rval.data?.text);
//   }, []);

//   console.log(bob);

//   // console.log(trpc.sayHi.useQuery());
//   return (
//     <trpc.Provider client={trpcClient} queryClient={queryClient}>
//       <QueryClientProvider client={queryClient}>
//         <button>hi</button>
//         <Hangman />
//       </QueryClientProvider>
//     </trpc.Provider>
//   );
// }

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/src/server";

import Hangman from "./components/hangman";

import "./App.css";
import { useState } from "react";

// const client = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: "http://localhost:4000/trpc",
//     }),
//   ],
// });

// async function main() {
//   const [rValue, setValue] = useState<Object>({ text: "" });
//   const result = await client.sayHi.query("silly");
//   console.log(result);
//   setValue(result);
// }
// main();

export default function App() {
  return (
    <div className="App">
      {/* <div>{rValue}</div> */}
      <Hangman />
    </div>
  );
}
