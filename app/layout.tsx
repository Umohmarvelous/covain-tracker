import "./globals.css";
import { BudgetProvider } from "@/components/budget-provider";

export default function MainRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      style={{
        backgroundColor: 'white'
      }}>
      <body>
        <BudgetProvider>
          <main>{children}</main>
        </BudgetProvider>
      </body>
    </html>
  )
}