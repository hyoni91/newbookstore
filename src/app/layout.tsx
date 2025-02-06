import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <header className="fixed top-0 w-full bg-white shadow-sm z-50 px-6">
          <nav className="max-w-7xl mx-auto w-full h-16 px-4 flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-800">Book Shop</span>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input 
                  placeholder="책 검색하기..." 
                  className="w-64 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="text-gray-600 hover:text-gray-900 font-medium">로그인</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">회원가입</button>
            </div>
          </nav>
          <div className="relative w-full ">
            <img 
              className="w-full h-[280px] object-cover object-center" 
              src="/images/book_banner.jpg" 
              alt="book_banner"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-white font-bold text-5xl mb-4">Enjoy a book</h1>
              <p className="text-white text-xl">당신의 다음 이야기를 찾아보세요</p>
            </div>
          </div>
        </header>

        <main className="flex-grow w-full max-w-7xl mx-auto px-6 pt-[380px] pb-16">
          {children}
        </main>

        <footer className=" bg-gray-50 mt-auto py-8 w-full">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
            <p>© 2025 Book Shop. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
