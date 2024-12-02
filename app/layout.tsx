import { Nunito } from "next/font/google"
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import { EdgeStoreProvider } from "@/lib/edgestore";
import SearchModal from "./components/modals/SearchModal";



export const metadata = {
  title: "BuraKripto",
  description: "Tez",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  
  return (
    <html lang="en">
      <body className={font.className}>
      <EdgeStoreProvider>
        <ClientOnly>
          <ToasterProvider/>
          <LoginModal/>
          <SearchModal/>
          <RentModal/>
          <RegisterModal/>
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-28">
        {children}
        </div>
      </EdgeStoreProvider>
      </body>
    </html>
  );
}
