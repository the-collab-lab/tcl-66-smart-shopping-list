import { Button } from 'flowbite-react';
import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';
import { NavigationBarSingleList } from '../components/NavigationBarSingleList.jsx';
import PlusSign from '../assets/PlusSign.jsx';
import Modal from './Modal.jsx';
import { IoMenu } from 'react-icons/io5';
import appTitle from '../assets/titleLogo.png';
import logo from '../assets/logo.png';
import AddList from './AddList.jsx';

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
							className="flex xsm:justify-center sm:justify-center pt-4 rounded-md"
						>
							<div>
								{screenSize > 480 ? (
									<img
										src={appTitle}
										alt="List Genius wide logo"
										className="xsm:hidden sm:flex sm:h-[18px]"
									/>
								) : (
									<img
										src={logo}
										alt="List Genius logo of shopping bag"
										className="xsm:w-[70px] sm:hidden pb-2"
									/>
								)}
							</div>
						</NavLink>
						<button
							onClick={toggleNav}
							className="absolute sm:hidden top-2 left-2"
						>
							<IoMenu size={28} className="sm:hidden" />
						</button>
						<div className={`${sidebarWidth} h-[125px] xsm:pt-0 sm:pt-2`}>
							{/* If a user clicks the "New list" button, then the "My Lists" header and the "New List" button disappear and the Create List form appears. */}
							{!openFormModal ? (
								<>
									<hr
										className={`h-px bg-[#D9D9D9] border mb-4 ${sidebarWidth} h-[125px]`}
									></hr>
									<div
										className={`w-full flex justify-between ${sidebarWidth} h-[34px] px-2 items-center`}
									>
										<NavLink to="/">
											<div className="text-sm font-medium text-[#6B7280]">
												My Lists
											</div>
										</NavLink>
										<Button
											className="max-w-fit w-[90px] h-[34px] rounded-lg pt-2 pr-3 pb-2 pl-3 border"
											color="light"
											onClick={openModal}
										>
											<div className="max-w-fit flex gap-x-2 items-center">
												<PlusSign />
												<p className="w-[46px] h-[18px] font-medium text-xs leading-[20px] text-[#111928]">
													<span className="whitespace-nowrap">New list</span>
												</p>
											</div>
										</Button>
									</div>
								</>
							) : null}

							{/* The user's lists display when the user's uid matches the uid contained in the listPath of a shopping list.*/}
							{openFormModal ? (
								<Modal isOpen={openFormModal} onClose={closeModal}>
									<div className="flex flex-col gap-4 p-4">
										<AddList setListPath={setListPath} />
									</div>
								</Modal>
							) : (
								<div className={`flex-col ${sidebarWidth} `}>
									<div
										className={`flex min-h-12 xsm:h-[30vh] sm:h-[35vh] pt-2 pb-4 ${sidebarWidth}`}
									>
										{data.length > 0 ? (
											data.find(
												(list) =>
													list.path.substring(0, list.path.lastIndexOf('/')) ===
													user?.uid,
											) ? (
												<ul
													className={`${sidebarWidth} gap-6 text-sm text-left overflow-auto`}
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
													className={`pl-2 text-center place-self-center ${sidebarWidth} text-sm font-medium text-[#6B7280]`}
												>
													No Lists
												</p>
											)
										) : (
											<p
												className={`pl-2 text-center place-self-center ${sidebarWidth} text-sm font-medium text-[#6B7280]`}
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
											className={`${sidebarWidth} h-[14px] font-medium text-sm text-[#6B7280] flex pl-2 pb-2`}
										>
											Shared With Me
										</p>
										<div
											className={`flex min-h-12 xsm:h-[30vh] sm:h-[35vh] pt-2 pb-8 ${sidebarWidth}`}
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
														className={`${sidebarWidth} gap-6 text-sm font-medium text-left rounded-lg min-h-12 overflow-auto`}
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
														className={`pl-2 text-center place-self-center ${sidebarWidth} text-sm font-medium text-[#6B7280]`}
													>
														No Lists
													</p>
												)
											) : (
												<p
													className={`pl-2 text-center place-self-center ${sidebarWidth} text-sm font-medium text-[#6B7280]`}
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

					<div className="absolute xsm:pb-4 md:p-4 bottom-0 w-full flex justify-between items-center">
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
