import Container from "@/components/Container";
import Header from "@/components/Header";
import SideBar from "./SideBar";
import MobileHeader from "@/components/MobileHeader";

export const metadata = {
	title: "DoIt App",
	description: "DoIt application",
};

export default function RootLayout({ children }) {
	return (
		<>
			<Header /> 
			<MobileHeader />
			<section className="h-screen w-screen fixed ">
				<Container className={"h-full flex pt-16"}>
					<SideBar />
					<div className="hiddenScrollbar flex-1 h-full overflow-y-scroll p-5">
						{children}
					</div>
				</Container>
			</section>
		</>
	);
}
