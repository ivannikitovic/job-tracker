import Link from "next/link";
import "./globals.css";
import Nav from "./(components)/nav";

export const metadata = {
    title: "Next.js",
    description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="flex flex-row w-screen h-screen">
                    <nav className="z-50">
                        <Nav></Nav>
                    </nav>
                    <main className="m-5">{children}</main>
                </div>
            </body>
        </html>
    );
}
