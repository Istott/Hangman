// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { httpBatchLink } from "@trpc/client";
// import React, { useState } from "react";
// import { trpc } from "../utils/trpc";
// export function Api() {
//   const [queryClient] = useState(() => new QueryClient());
//   const [trpcClient] = useState(() =>
//     trpc.createClient({
//       links: [
//         httpBatchLink({
//           url: "http://localhost:4000/trpc",
//           // You can pass any HTTP headers you wish here
//           //   async headers() {
//           //     return {
//           //       authorization: getAuthCookie(),
//           //     };
//           //   },
//         }),
//       ],
//     })
//   );
//   console.log(queryClient, trpcClient);

//   return(
//     <div>
//         <p>{trpcClient.}</p>
//     </div>
//   );
// }
