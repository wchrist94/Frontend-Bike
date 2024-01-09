import "../../style/globals.css"
import { AuthProvider } from "./provider.js"
import Nav from "./components/Nav"
import {NextUIProvider} from "@nextui-org/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="light">
          <AuthProvider>
            <Nav/>
            {children}
          </AuthProvider>
        </body>
    </html>
  )
}
