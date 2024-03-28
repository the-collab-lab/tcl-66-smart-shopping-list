import { SignInButton } from '../api/useAuth';
import Logo from '../assets/Logo.jsx';

export function Login() {
	return (
		<div className="flex my-auto h-screen bg-[url('assets/contrastGraph.png')] bg-cover xsm:p-4">
			<div className="m-auto">
				<div className="flex flex-1 pb-14 sm:justify-center xsm:justify-between items-center">
					<Logo />
					<div className="inline-block h-[26px] min-h-[1em] w-[3px] self-stretch bg-loginLine/50"></div>
					<h1 className="sm:ps-6 xsm:pl-2 xsm:text-[14px] sm:text-lg ">
						Shopping List App
					</h1>
				</div>
				<div className="flex justify-between flex-col w-max-w-xl p-5 gap-5 h-[174px] rounded-lg shadow-lg bg-white">
					<h2 className="leading-6 font-semibold text-lg">Log in or Sign up</h2>
					<div className="inline-block border-t-1 self-stretch border-loginLine/50"></div>
					<SignInButton />
				</div>
			</div>
		</div>
	);
}
