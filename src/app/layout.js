import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import ReduxProvider from "@/store/reduxProvider";
import { Toaster } from "sonner";
import { DataProvider } from "@/context/DataContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "DoIt App",
	description: "DoIt application",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className} suppressHydrationWarning>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ReduxProvider>
						<DataProvider>
							{children}
							<Toaster richColors />{" "}
						</DataProvider>
					</ReduxProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
