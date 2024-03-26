import { SignInButton } from '../api/useAuth';
import Logo from '../assets/logo';

export function Login() {
	return (
		<div className="flex my-auto h-screen bg-[url('assets/graph.png')] bg-cover">
			<div className="m-auto">
				<div className="flex flex-1 pb-14 justify-center items-center">
					<Logo />
					<div className="inline-block h-[26px] min-h-[1em] w-[1px] self-stretch bg-loginLine/50"></div>
					<h1 className="ps-6">Smart Shopping List</h1>
				</div>
				<div className="flex justify-between flex-col w-max-w-xl p-5 gap-5 h-[174px] rounded-lg shadow-sm md:shadow-lg bg-white">
					<h2 className="text-base font-light leading-6 font-semibold text-lg">
						Log in or Sign
					</h2>
					<div className="inline-block border-t-1 self-stretch border-loginLine/50"></div>
					<SignInButton />
				</div>
			</div>
		</div>
	);
}
