import React from 'react';
import { NavLink } from 'react-router-dom';
import { SignInButton, SignOutButton } from '../api/useAuth.jsx';
import { useAuth } from '../api/useAuth.jsx';
import { SingleList } from './SingleList.jsx';
import Logo from '../assets/Logo.jsx';
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
						{/* <div> */}
						{/* <div> */}
						<NavLink
							to="/list"
							className="w-32 h-3.5 leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280]"
						>
							My Lists
						</NavLink>
						{/* </div> */}
						{/* <div> */}
						<Button
							className="max-w-fit w-[90px] h-[34px] rounded-lg pt-2 pr-3 pb-2 pl-3 border"
							color="light"
						>
							{/* <div className="flex justify-around"> */}
							<div className="max-w-fit flex gap-2 items-center">
								{/* <div className="grid grid-cols-2 items-center"> */}
								<div>
									<svg
										viewBox="0 0 12 13"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="w-[12px] h-[13px]"
									>
										<path
											d="M10.2666 6.44538H6.53328V2.71204C6.53328 2.5706 6.47709 2.43494 6.37707 2.33492C6.27706 2.2349 6.1414 2.17871 5.99995 2.17871C5.8585 2.17871 5.72285 2.2349 5.62283 2.33492C5.52281 2.43494 5.46662 2.5706 5.46662 2.71204V6.44538H1.73328C1.59184 6.44538 1.45618 6.50157 1.35616 6.60159C1.25614 6.70161 1.19995 6.83726 1.19995 6.97871C1.19995 7.12016 1.25614 7.25582 1.35616 7.35583C1.45618 7.45585 1.59184 7.51204 1.73328 7.51204H5.46662V11.2454C5.46662 11.3868 5.52281 11.5225 5.62283 11.6225C5.72285 11.7225 5.8585 11.7787 5.99995 11.7787C6.1414 11.7787 6.27706 11.7225 6.37707 11.6225C6.47709 11.5225 6.53328 11.3868 6.53328 11.2454V7.51204H10.2666C10.4081 7.51204 10.5437 7.45585 10.6437 7.35583C10.7438 7.25582 10.8 7.12016 10.8 6.97871C10.8 6.83726 10.7438 6.70161 10.6437 6.60159C10.5437 6.50157 10.4081 6.44538 10.2666 6.44538Z"
											fill="#1F2A37"
										/>
									</svg>
								</div>
								<p className="w-[46px] h-[18px] font-medium font-family: 'Inter' text-xs leading-[14px] text-[#111928]">
									<span className="whitespace-nowrap">New list</span>
								</p>
							</div>
							{/* </div> */}
						</Button>
						{/* </div> */}
					</div>
					<div className="flex-col w-56 h-[295px] gap-6">
						<ul className="w-56 h-[82px] gap-6">
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
						{/* <div className='gap-6'> */}
						<p className="w-56 h-[14px] font-medium font-family: 'Inter' text-sm leading-[14px] text-[#6B7280] flex pt-16 pl-2 pb-6">
							Shared with me
						</p>
						<ul className="w-56 h-[82px] gap-6">
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
						{/* </div> */}
					</div>
				</div>
			</div>

			<div className="absolute xsm:pb-4 sm:pb-4 md:p-4 bottom-0 w-full">
				{user ? <SignOutButton /> : <SignInButton />}
			</div>
		</nav>
	);
}
