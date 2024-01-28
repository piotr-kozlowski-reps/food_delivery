import * as React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "@/src/graphql/gql.setup";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={graphqlClient}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </ApolloProvider>
  );
}
