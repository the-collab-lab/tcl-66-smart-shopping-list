import { Button } from 'flowbite-react';
import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';
import { NavigationBarSingleList } from '../components/NavigationBarSingleList.jsx';
import Logo from '../assets/Logo.jsx';
import PlusSign from '../assets/PlusSign.jsx';
import NavigationBarModal from '../components/NavigationBarModal.jsx';
import { IoMenu } from 'react-icons/io5';

export default function NavigationBar({ data, setListPath, setLoading }) {
	const { user } = useAuth();

	const sidebarWidth = 'xsm:w-full sm:w-44 md:w-48 lg:w-56';
	const [openFormModal, setOpenFormModal] = useState(false);
	const [navSlide, setNavSlide] = useState(true);
	const [screenSize, setScreenSize] = useState(window.innerWidth); // Track screen width

	useEffect(() => {
		const handleResize = () => {
			setScreenSize(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []); // Cleanup and ensure effect runs only once

	useEffect(() => {
		// Update navSlide based on screen width
		if (screenSize > 480) {
			// Adjust the value according to your breakpoint
			setNavSlide(true);
		} else {
			setNavSlide(false);
		}
	}, [screenSize]); // Re-run effect when screenSize changes

	const toggleNav = () => {
		setNavSlide(!navSlide);
	};

	const openModal = () => {
		setOpenFormModal(true);
	};

	const closeModal = () => {
		setOpenFormModal(false);
	};
	return (
		<>
			{navSlide ? (
				<nav
					className={`fixed ${sidebarWidth} bg-navBg border-b-1 border-r-1 border-navBorder min-h-full z-50`}
				>
					{/* "The Collab Lab" logo */}
					<div>
						<NavLink
							to="/"
							className="flex xsm:justify-end sm:justify-center pt-4 rounded-md"
						>
							<div className="invert-[85%]">
								<Logo />
							</div>
						</NavLink>
						<button
							onClick={toggleNav}
							className="absolute sm:hidden top-2 left-2"
						>
							<IoMenu size={28} className="sm:hidden" />
						</button>
						<div className={`${sidebarWidth} h-[125px] pt-6`}>
							{/* If a user clicks the "New list" button, then the "My Lists" header and the "New List" button disappear and the Create List form appears. */}
							{!openFormModal ? (
								<>
									<NavLink to="/" className="sm:hidden">
										<div
											className={`p-2 text-lg font-medium font-family: 'Inter' text-[#111928] sm:hidden hover:bg-gray-100`}
										>
											Home
										</div>
									</NavLink>
									<hr
										className={`h-px bg-[#D9D9D9] border mb-4 ${sidebarWidth} h-[125px] sm:hidden`}
									></hr>
									<div
										className={`w-full flex justify-between ${sidebarWidth} h-[34px] px-2 items-center`}
									>
										<div className="h-3.5 leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280]">
											My Lists
										</div>
										<Button
											className="max-w-fit w-[90px] h-[34px] rounded-lg pt-2 pr-3 pb-2 pl-3 border"
											color="light"
											onClick={openModal}
										>
											<div className="max-w-fit flex gap-x-2 items-center">
												<PlusSign />
												<p className="w-[46px] h-[18px] font-medium font-family: 'Inter' text-xs leading-[20px] text-[#111928]">
													<span className="whitespace-nowrap">New list</span>
												</p>
											</div>
										</Button>
									</div>
								</>
							) : null}

							{/* The user's lists display when the user's uid matches the uid contained in the listPath of a shopping list.*/}
							{openFormModal ? (
								<NavigationBarModal
									setListPath={setListPath}
									isOpen={openFormModal}
									onClose={closeModal}
									className="max-w-fit w-[90px] h-[34px] rounded-lg pt-2 pr-3 pb-2 pl-3 border"
									color="light"
								/>
							) : (
								<div className={`flex-col ${sidebarWidth} `}>
									<div
										className={`flex min-h-12 h-[40vh] pb-4 ${sidebarWidth}`}
									>
										{data.length > 0 ? (
											data.find(
												(list) =>
													list.path.substring(0, list.path.lastIndexOf('/')) ===
													user?.uid,
											) ? (
												<ul
													className={`${sidebarWidth} mt-3 gap-6 text-sm font-family: Inter font-medium leading-4 text-left overflow-auto`}
												>
													{' '}
													{data.map((list) => (
														<div key={list.name}>
															{list.path.substring(
																0,
																list.path.lastIndexOf('/'),
															) === user?.uid ? (
																<NavigationBarSingleList
																	key={list.name}
																	name={list.name}
																	path={list.path}
																	setListPath={setListPath}
																	setLoading={setLoading}
																/>
															) : null}
														</div>
													))}
												</ul>
											) : (
												<p
													className={`pl-2 text-center place-self-center ${sidebarWidth} h-3.5 leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280]`}
												>
													No Lists
												</p>
											)
										) : (
											<p
												className={`pl-2 text-center place-self-center ${sidebarWidth} h-3.5 leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280]`}
											>
												No Lists
											</p>
										)}
									</div>
									<hr
										className={`h-px bg-[#D9D9D9] border mb-4 ${sidebarWidth} h-[125px]`}
									></hr>

									{/* Lists shared with the user by other users display when the signed-in user's uid does not match the listPath uid of a shopping list.*/}
									<div className="flex flex-col min-h-12 overflow-auto">
										<p
											className={`${sidebarWidth} h-[14px] font-medium font-family: 'Inter' text-sm leading-[14px] text-[#6B7280] flex pl-2 pb-4`}
										>
											Shared With Me
										</p>
										<div
											className={`flex min-h-12 h-[40vh] pb-4 ${sidebarWidth}`}
										>
											{data.length > 0 ? (
												data.find(
													(list) =>
														list.path.substring(
															0,
															list.path.lastIndexOf('/'),
														) !== user?.uid,
												) ? (
													<ul
														className={`${sidebarWidth} gap-6 text-sm font-family: Inter font-medium leading-4 text-left rounded-lg min-h-12 overflow-auto`}
													>
														{' '}
														{data.map((list) => (
															<div key={list.name}>
																{list.path.substring(
																	0,
																	list.path.lastIndexOf('/'),
																) !== user?.uid ? (
																	<NavigationBarSingleList
																		key={list.name}
																		name={list.name}
																		path={list.path}
																		setListPath={setListPath}
																		setLoading={setLoading}
																	/>
																) : null}
															</div>
														))}
													</ul>
												) : (
													<p
														className={`pl-2 text-center place-self-center ${sidebarWidth} h-3.5 leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280]`}
													>
														No Lists
													</p>
												)
											) : (
												<p
													className={`pl-2 text-center place-self-center ${sidebarWidth} h-3.5 leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280]`}
												>
													No Lists
												</p>
											)}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="absolute xsm:pb-4 sm:pb-4 md:p-4 bottom-0 w-full">
						{user ? <SignOutButton /> : <SignInButton />}
					</div>
				</nav>
			) : (
				<button onClick={toggleNav} className="absolute top-2 left-2">
					<IoMenu size={28} />
				</button>
			)}
		</>
	);
}
