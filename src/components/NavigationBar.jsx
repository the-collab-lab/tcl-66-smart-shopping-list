import React from 'react';
import { NavLink } from 'react-router-dom';
import { SignInButton, SignOutButton } from '../api/useAuth.jsx';
import { useAuth } from '../api/useAuth.jsx';
import { SingleList } from './SingleList.jsx';
import Logo from '../assets/Logo.jsx';
import PlusSign from '../assets/PlusSign.jsx';
import { Button } from 'flowbite-react';

export default function NavigationBar({ data, setListPath, setLoading }) {
	const { user } = useAuth();

	const sidebarWidth = 'xsm:min-w-24 sm:min-w-36 md:w-48 lg:w-64';

	return (
		<nav
			className={`fixed ${sidebarWidth} gap-6 bg-navBg border-b-1 border-r-1 border-navBorder min-h-screen`}
		>
			<div className="xsm:pt-4 sm:pt-4 md:p-4 lg:px-4">
				<NavLink
					to="/"
					className="block pr-4 pt-1 pb-6 rounded-md hover:bg-hover"
				>
					<div className="invert-[85%] w-36 h-4">
						<Logo />
					</div>
				</NavLink>
				<div className="w-56 h-[132px] gap-6">
					<div className="max-w-fit w-56 h-[34px] pl-2 grid grid-cols-2 gap-6 flex items-center">
						<NavLink
							to="/list"
							className="w-32 h-3.5 leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280]"
						>
							My Lists
						</NavLink>
						<Button
							className="max-w-fit w-[90px] h-[34px] rounded-lg pt-2 pr-3 pb-2 pl-3 border"
							color="light"
						>
							<div className="max-w-fit flex gap-x-2 items-center">
								{/* <div className="grid grid-cols-2 items-center"> */}
								<PlusSign />
								<p className="w-[46px] h-[18px] font-medium font-family: 'Inter' text-xs leading-[18px] text-[#111928]">
									<span className="whitespace-nowrap">New list</span>
								</p>
							</div>
						</Button>
					</div>
					<div className="flex-col w-56 h-[295px]">
						<div className="flex grow min-h-12">
							<ul className="w-56 gap-6 text-sm font-family: Inter font-medium leading-4 text-left">
								{' '}
								{data.map((list) => (
									<SingleList
										key={list.name}
										name={list.name}
										path={list.path}
										setListPath={setListPath}
										setLoading={setLoading}
									/>
								))}
							</ul>
						</div>
						<hr className="h-px bg-[#D9D9D9] border mt-12 mb-4"></hr>
						<div className="flex flex-col grow min-h-12">
							<p className="w-56 h-[14px] font-medium font-family: 'Inter' text-sm leading-[14px] text-[#6B7280] flex pl-2 pb-4">
								Shared with me
							</p>
							<ul className="w-56 gap-6 text-sm font-family: Inter font-medium leading-4 text-left rounded-lg min-h-12">
								{' '}
								{data.map((list) => (
									<SingleList
										key={list.name}
										name={list.name}
										path={list.path}
										setListPath={setListPath}
										setLoading={setLoading}
									/>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute xsm:pb-4 sm:pb-4 md:p-4 bottom-0 w-full">
				{user ? <SignOutButton /> : <SignInButton />}
			</div>
		</nav>
	);
}
