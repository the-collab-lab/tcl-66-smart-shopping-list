import React from 'react';
import { FaGithub } from 'react-icons/fa';

const AppInfo = () => {
	return (
		<div className="flex flex-col items-center justify-center max-h-[60vh]">
			<div className="overflow-scroll scroll">
				<h2 className="text-xl font-bold mt-6 mb-4 border-b-1 border-gray-200 pb-[20px] w-full">
					Let's get started!
				</h2>
				<div className="max-w-lg px-4">
					<p className="mb-4">
						Hey there! Welcome to List Genius, your go-to shopping companion.
						Our goal is to help simplify the way you shop by keeping track of
						your lists and reminding you when it's time to buy. Whether you're
						shopping for groceries, gifts, or anything in between, we've got you
						covered!
					</p>
					<div className="mb-4">
						<p className="font-semibold mb-2">How does it work?</p>
						<ol className="list-decimal pl-6 mb-4 border-b-1 border-gray-200 pb-[20px] w-full">
							<li className="mb-4">
								First things first, start by creating a new list. Click on the
								"New list" button and let the fun begin!
							</li>
							<li className="mb-2">
								Add items to your list and let us know how soon you need them.
								Whether it's{' '}
								<span className="inline-block rounded-md px-2 py-1 text-orange-800 bg-orange-100">
									soon
								</span>
								,{' '}
								<span className="inline-block rounded-md px-2 py-1 text-yellow-800 bg-yellow-100">
									kind of soon
								</span>
								, or{' '}
								<span className="inline-block rounded-md px-2 py-1 text-green-800 bg-green-100">
									not so soon
								</span>
								, we've got you covered!
							</li>
							<li className="mb-2">
								If you haven't bought something in a while, we'll give it a
								little rest and mark it as{' '}
								<span className="inline-block rounded-md px-2 py-1 text-gray-800 bg-gray-100">
									inactive
								</span>{' '}
								after 60 days. Don't worry, you can always wake it up by
								purchasing it again!
							</li>
							<li className="mb-2">
								If an item's expected purchase date has passed, we'll kindly
								remind you that it's{' '}
								<span className="inline-block rounded-md px-2 py-1 text-red-800 bg-red-100">
									overdue
								</span>
								. Time to get shopping!
							</li>
							<li className="mb-2">
								And hey, why keep all the fun to yourself? Share your lists with
								friends and family and turn your shopping trips into
								collaborative adventures!
							</li>
						</ol>
						<div className="my-8">
							<h2 className="font-semibold mb-6">
								This app was created as a collaborative project through The
								Collab Lab, and developed by:
							</h2>
							<div className="flex flex-wrap justify-evenly mb-4 border-b-1 border-gray-200 pb-[20px] w-full">
								<p className="mb-2 w-[150px] text-center gap-2">
									<a
										className="flex justify-center"
										href="https://github.com/stefiecaff"
									>
										<FaGithub size={32} />
									</a>
									Stefanie Caffarel
								</p>
								<p className="mb-2 w-[150px] text-center gap-2">
									<a
										className="flex justify-center"
										href="https://github.com/3campos"
									>
										<FaGithub size={32} />
									</a>
									Emilio Campos
								</p>
								<p className="mb-2 w-[150px] text-center gap-2">
									<a
										className="flex justify-center"
										href="https://github.com/eonflower"
									>
										<FaGithub size={32} />
									</a>
									Aloe Nelson
								</p>
								<p className="mb-2 w-[150px] text-center gap-2">
									<a
										className="flex justify-center"
										href="https://github.com/hun-ah"
									>
										<FaGithub size={32} />
									</a>
									Hannah Wohl-Machado
								</p>
							</div>
							<div className="mb-4 text-center">
								<p className="mb-2">
									Special thanks to The Collab Lab and our team of mentors,
									Danielle Heberling, Jeremiah Fallin, and Nick Zanetti.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppInfo;
