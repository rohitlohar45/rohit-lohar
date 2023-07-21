"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Header = () => {
	const router = useRouter();

	const [data, setData] = useState("nothing");

	const getUserDetails = async () => {
		try {
			const res = await axios.get("/api/users/me");
			console.log(res.data);
			setData(res.data.data.name);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUserDetails();
	}, []);

	const logout = async () => {
		try {
			await axios.get("/api/users/logout");
			toast.success("Logout successful");
			router.push("/");
		} catch (error: any) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	return (
		<div>
			<header className="fixed right-0 top-0 left-60 bg-yellow-50 py-3 px-4 h-16">
				<div className="max-w-4xl mx-auto">
					<div className="flex items-center justify-between">
						<div className="text-lg font-bold">{data}</div>
						<div>
							<button
								type="button"
								onClick={logout}
								className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition"
							>
								<span className="text-sm"> Logout</span>
								<span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition ml-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1em"
										height="1em"
										fill="currentColor"
										className=""
										viewBox="0 0 16 16"
									>
										<path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
									</svg>
								</span>
							</button>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Header;
