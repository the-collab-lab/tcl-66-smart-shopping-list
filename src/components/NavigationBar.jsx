import { Button } from 'flowbite-react';
import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SignInButton, SignOutButton, useAuth } from '../api/useAuth.jsx';
import { NavigationBarSingleList } from '../components/NavigationBarSingleList.jsx';
import Logo from '../assets/Logo.jsx';
import PlusSign from '../assets/PlusSign.jsx';
import NavigationBarModal from '../components/NavigationBarModal.jsx';

export default function NavigationBar({ data, setListPath, setLoading }) {
	const { user } = useAuth();

	const sidebarWidth = 'xsm:min-w-24 sm:min-w-36 md:w-48 lg:w-64';
	const [openFormModal, setOpenFormModal] = useState(false);

	const openModal = () => {
		setOpenFormModal(true);
	};

	const closeModal = () => {
		setOpenFormModal(false);
	};
	return (
		<nav
			className={`fixed ${sidebarWidth} gap-6 bg-navBg border-b-1 border-r-1 border-navBorder min-h-screen`}
		>
			{/* "The Collab Lab" logo */}
			<div className="xsm:pt-4 sm:pt-4 md:p-4 lg:px-4">
				<NavLink to="/" className="block pr-4 pt-1 rounded-md">
					<div className="invert-[85%] w-36 h-4">
						<Logo />
					</div>
				</NavLink>
				<div className="xsm:min-w-24 sm:min-w-36 md:w-36 lg:w-56 h-[125px] gap-6 pt-6">
					{/* If a user clicks the "New list" button, then the "My Lists" header and the "New List" button disappear and the Create List form appears. */}
					{!openFormModal ? (
						<div className="max-w-fit w-56 h-[34px] pl-2 grid grid-cols-2 gap-y-6 gap-x flex items-center">
							<div className="w-32 h-3.5 leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280] flex flex-initial">
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
						<div className="flex-col w-56 ">
							<div className="flex min-h-12 h-[40vh] pb-4 xsm:min-w-24 sm:min-w-32 md:w-36 lg:w-56">
								{data.length > 0 ? (
									data.find(
										(list) =>
											list.path.substring(0, list.path.lastIndexOf('/')) ===
											user?.uid,
									) ? (
										<ul className="w-56 mt-3 gap-6 text-sm font-family: Inter font-medium leading-4 text-left overflow-auto">
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
										<p className="pl-2 text-center place-self-center w-56 h-3.5 leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280]">
											No Lists
										</p>
									)
								) : (
									<p className="pl-2 text-center place-self-center w-56 h-3.5 leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280]">
										No Lists
									</p>
								)}
							</div>
							<hr className="h-px bg-[#D9D9D9] border mb-4 xsm:min-w-24 sm:min-w-36 md:w-36 lg:w-56 h-[125px]"></hr>

							{/* Lists shared with the user by other users display when the signed-in user's uid does not match the listPath uid of a shopping list.*/}
							<div className="flex flex-col min-h-12 overflow-auto">
								<p className="w-56 h-[14px] font-medium font-family: 'Inter' text-sm leading-[14px] text-[#6B7280] flex pl-2 pb-4">
									Shared With Me
								</p>
								<div className="flex min-h-12 h-[40vh] pb-4 xsm:min-w-24 sm:min-w-32 md:w-36 lg:w-56">
									{data.length > 0 ? (
										data.find(
											(list) =>
												list.path.substring(0, list.path.lastIndexOf('/')) !==
												user?.uid,
										) ? (
											<ul className="w-56 gap-6 text-sm font-family: Inter font-medium leading-4 text-left rounded-lg min-h-12 overflow-auto">
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
											<p className="pl-2 text-center place-self-center w-56 h-3.5 leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280]">
												No Lists
											</p>
										)
									) : (
										<p className="pl-2 text-center place-self-center w-56 h-3.5 leading-[14px] text-sm font-medium font-family: 'Inter' text-[#6B7280]">
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
	);
}
