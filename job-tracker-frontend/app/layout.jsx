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
            <body className="flex min-w-full max-h-screen bg-fixed bg-gradient-to-br from-indigo-500  via-purple-500  to-pink-500">
                <div className="flex flex-row">
                    <nav className="z-50">
                        <Nav></Nav>
                    </nav>
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}
