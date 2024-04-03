import { SignInButton } from '../api/useAuth';
import logo from '../assets/logo.png';

export function Login() {
	return (
		<div className="flex justify-center my-auto h-screen bg-[url('assets/lightestContrastGraph.png')] bg-cover pb-24 md:pb-12">
			<div className="m-auto">
				<div className="flex flex-1 pb-16 justify-center gap-2 items-center">
					<img src={logo} alt="logo" className="xsm:h-[120px] sm:h-[200px]" />
					<h1 className="sm:ps-6 xsm:pl-2 xsm:text-[18px] sm:text-[32px] font-medium ">
						Shopping List App
					</h1>
				</div>
				<div className="flex justify-center">
					<div className="flex flex-col xsm:w-[275px] sm:w-[375px] md:w-[550px] lg:w-[600px] p-5 gap-5 h-[174px] rounded-lg shadow-lg bg-white">
						<h2 className="leading-6 font-semibold text-lg">
							Log in or Sign up
						</h2>
						<div className="inline-block border-t-1 self-stretch border-tcl-blue/50"></div>
						<SignInButton />
					</div>
				</div>
			</div>
		</div>
	);
}
