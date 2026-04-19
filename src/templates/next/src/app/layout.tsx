/// <reference types="react" />
/// <reference types="@types/react" />

export const metadata = {
  title: 'Next.js App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}