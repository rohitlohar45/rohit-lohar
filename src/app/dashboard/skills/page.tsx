"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { storage } from "@/utils/firebase";
import { ref, uploadBytes, getDownloadURL, UploadResult } from "firebase/storage";
import Header from "../header";
import Sidebar from "../Sidebar";

interface Skill {
	_id: string;
	name: string;
	level: string;
	path: string;
}

export default function Dashboard() {
	const router = useRouter();
	const [data, setData] = useState("nothing");

	const [name, setName] = useState("");
	const [level, setLevel] = useState("");
	const [path, setPath] = useState("");
	const [modalOpen, setModalOpen] = useState(false);

	const [skills, setSkills] = useState<Skill[]>([]);

	const [loading, setLoading] = useState(false);

	const [nameError, setNameError] = useState("");
	const [levelError, setLevelError] = useState("");
	const [PathError, setPathError] = useState("");

	const [selectedSkillId, setSelectedSkillId] = useState("");
	const [editName, setEditName] = useState("");
	const [editTechnologies, setEditTechnologies] = useState<string[]>([]);
	const [editGithubLink, setEditGithubLink] = useState("");
	const [editLandingLink, setEditLandingLink] = useState("");

	const [editModalOpen, setEditModalOpen] = useState(false);

	// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const file = e.target.files?.[0];
	// 	if (file) {
	// 		setPhoto(file);
	// 	}
	// };

	useEffect(() => {
		getUserDetails();
		getSkills();
	}, []);

	const getSkills = async () => {
		try {
			const res = await axios.get("/api/skills");
			console.log(res.data);
			setSkills(res.data);
		} catch (error: any) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setLevel(e.target.value);
	// };
	// const editHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setLevel(e.target.value);
	// };

	// const editHandleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
	// 	if (e.key === "Enter" && technology.trim() !== "") {
	// 		setEditTechnologies((prevTechnologies) => [...prevTechnologies, technology]);
	// 		setLevel("");
	// 	}
	// };

	const createSkills = async () => {
		try {
			setNameError("");
			setLevelError("");
			setPathError("");

			// Validate fields
			let isValid = true;
			if (name.trim() === "") {
				setNameError("Please enter a skill name");
				isValid = false;
			}
			if (level.trim() === "") {
				setLevelError("Please enter at least one technology");
				isValid = false;
			}
			if (path.trim() === "") {
				setPathError("Please enter a GitHub link");
				isValid = false;
			}

			if (!isValid) {
				return;
			}

			setLoading(true);

			console.table({ name, path, level });

			// if (photo) {
			// 	const photoRef = ref(storageRef, photo.name);
			// 	await uploadBytes(photoRef, photo);
			// 	const downloadURL = await getDownloadURL(photoRef);
			// 	setPhotoLink(downloadURL);
			// 	const res = await axios.post("/api/skills", {
			// 		name,
			// 		technologies,
			// 		skillPhoto: downloadURL,
			// 		githubLink,
			// 		landingPage: landingPageLink,
			// 	});

			// 	if (res.data) {
			// 		setSkills((prevSkills) => [...prevSkills, res.data]);
			// 	}
			// }

			const data = {
				name,
				level: parseInt(level),
				path,
			};

			const res = await axios.post("/api/skills", data);

			if (res?.data) {
				toast.success("Successfully submitted");
			}

			toast.success("Skill created");
			setLoading(false);
			setModalOpen(false);
		} catch (error: any) {
			setLoading(false);
			console.log(error.message);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		setName("");
		setLevel("");
		setPath("");
	}, [modalOpen]);

	const getUserDetails = async () => {
		try {
			const res = await axios.get("/api/users/me");
			console.log(res.data);
			setData(res.data.data.name);
		} catch (error) {
			console.log(error);
		}
	};

	// const handleEditSkill = (skillId: string) => {
	// 	setEditModalOpen(true);
	// 	const selectedSkill = skills.find((skill) => skill._id === skillId);
	// 	console.log(skillId);
	// 	if (selectedSkill) {
	// 		setSelectedSkillId(skillId);
	// 		setEditName(selectedSkill.name);
	// 		setEditTechnologies(selectedSkill.technologies);
	// 		setEditPhoto(selectedSkill.skillPhoto);
	// 		setEditGithubLink(selectedSkill.githubLink);
	// 		setEditLandingLink(selectedSkill.landingPage);
	// 		{
	// 			console.log(selectedSkill.skillPhoto);
	// 		}
	// 		// setModalOpen(true);
	// 	}
	// };

	const handleDeleteSkill = (skillId: any) => {};

	// const handleUpdateSkill = async () => {
	// 	if (selectedSkillId) {
	// 		// Find the skill index in the skills array
	// 		const skillIndex = skills.findIndex((skill) => skill._id === selectedSkillId);
	// 		if (skillIndex !== -1) {
	// 			// Create a new skill object with updated details
	// 			const updatedSkill = {
	// 				_id: selectedSkillId,
	// 				name: editName,
	// 				technologies: editTechnologies,
	// 				skillPhoto: editPhoto,
	// 				githubLink: editGithubLink,
	// 				landingPage: editLandingLink,
	// 			};

	// 			try {
	// 				const res = await axios.patch(`/api/skills/`, {
	// 					id: selectedSkillId,
	// 					data: updatedSkill,
	// 				});

	// 				if (res) {
	// 					const updatedSkills = [...skills];
	// 					updatedSkills[skillIndex] = updatedSkill;
	// 					setSkills(updatedSkills);

	// 					setSelectedSkillId("");
	// 					setEditName("");
	// 					setEditTechnologies([]);
	// 					setEditGithubLink("");
	// 					setEditLandingLink("");
	// 					setEditModalOpen(false);
	// 				}
	// 			} catch (error) {}
	// 		}
	// 	}
	// };

	return (
		<>
			<Header />
			<body className="relative bg-yellow-50 overflow-hidden max-h-screen">
				<Sidebar />

				<main className=" pt-10 max-h-screen overflow-auto">
					<div className="px-6 py-8">
						<div className="max-w-4xl mx-auto">
							<div className="bg-white rounded-3xl p-8 mb-5">
								<h1 className="text-3xl font-bold mb-10">Hello Rohit👋</h1>
								<div className="flex items-center justify-between">
									<div className="flex items-stretch">
										<div className="text-gray-400 text-small">
											Total
											<br />
											Skills
										</div>
										<div className="h-100 border-l mx-4"></div>
										<div className="flex flex-nowrap -space-x-3">
											<div className="h-9 w-9">
												<span>{skills.length}</span>
											</div>
										</div>
									</div>
								</div>

								<hr className="my-10" />
								<div className="grid">
									<div>
										<div className="flex items-center mb-4 justify-betwwen">
											<h2 className="text-2xl font-bold mr-2">Skills</h2>
											<button
												type="button"
												className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition"
												onClick={() => setModalOpen(true)}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 mr-1"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M2 9h16a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2zm7-7a1 1 0 0 1 2 0v16a1 1 0 0 1-2 0V2zM6 12a1 1 0 0 1 1 1v5h5a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z"
														clipRule="evenodd"
													/>
												</svg>
												Add Skill
											</button>
										</div>
										{skills.map((skill) => (
											<div
												key={skill._id}
												className="flex flex-col bg-white border border-gray-200 rounded-lg mb-10 md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
											>
												{/* <img
													className="object-cover w-30 h-30 rounded-l-lg md:w-64 md:h-auto md:rounded-none md:rounded-t-lg"
													src={
														skill.skillPhoto instanceof File
															? URL.createObjectURL(skill.skillPhoto)
															: skill.skillPhoto
													}
													alt=""
												/> */}
												<div className="flex flex-col justify-between p-4 leading-normal ">
													<div>
														<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
															{skill.name}
														</h5>
														<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
															{skill.path}
														</h5>
														<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
															{skill.level}
														</h5>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
				{modalOpen && (
					<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
						<div className="bg-white rounded-xl p-8 space-y-6">
							<h2 className="text-2xl font-bold">Add Skill</h2>
							<div>
								<label className="block text-gray-700 text-sm font-bold mb-2">Skill Name</label>
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										nameError ? "border-red-500" : ""
									}`}
								/>
								{nameError && <p className="text-red-500 text-sm">{nameError}</p>}
							</div>
							<div>
								<label className="block text-gray-700 text-sm font-bold mb-2">Level</label>
								<input
									type="text"
									value={level}
									onChange={(e) => setLevel(e.target.value)}
									className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										levelError ? "border-red-500" : ""
									}`}
								/>
								{levelError && <p className="text-red-500 text-sm">{levelError}</p>}
							</div>
							<div>
								<label className="block text-gray-700 text-sm font-bold mb-2">Path</label>
								<input
									type="text"
									value={path}
									onChange={(e) => setPath(e.target.value)}
									className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										PathError ? "border-red-500" : ""
									}`}
								/>
								{PathError && <p className="text-red-500 text-sm">{PathError}</p>}
							</div>
							<div className="flex justify-between">
								<button
									type="button"
									onClick={() => setModalOpen(false)}
									className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
								>
									Cancel
								</button>

								<button
									type="button"
									className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
									onClick={createSkills}
									disabled={loading} // Disable the button while loading
								>
									{loading ? "Creating..." : "Create"}
								</button>
							</div>
						</div>
					</div>
				)}
				{/* {editModalOpen && (
					<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
						<div className="bg-white rounded-xl p-8 space-y-6">
							<h2 className="text-2xl font-bold">Edit Skill</h2>
							<div>
								<label className="block text-gray-700 text-sm font-bold mb-2">Skill Name</label>
								<input
									type="text"
									value={editName}
									onChange={(e) => setEditName(e.target.value)}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div>
								<label className="block text-gray-700 text-sm font-bold mb-2">Photo</label>

								<div className="flex">
									<input
										type="file"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										onChange={handleFileChange}
									/>
									<button
										type="button"
										className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
									>
										Add
									</button>
								</div>

								{editPhoto && (
									<div className="relative m-2">
										<img
											src={`${editPhoto}`}
											alt={`Selected Photo`}
											className="w-20 h-20 object-cover rounded"
										/>
										<button
											type="button"
											className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
											onClick={() => setEditPhoto(undefined)}
										>
											X
										</button>
									</div>
								)}
							</div>

							<div>
								<label className="block text-gray-700 text-sm font-bold mb-2">Technologies</label>

								<div className="flex">
									<input
										type="text"
										value={technology}
										onChange={editHandleInputChange}
										onKeyDown={editHandleInputKeyDown}
										className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
											technologyError ? "border-red-500" : ""
										}`}
									/>
									<button
										type="button"
										className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
										onClick={() => {
											if (technology.trim() !== "") {
												setEditTechnologies((prevTechnologies) => [
													...prevTechnologies,
													technology,
												]);
												setLevel("");
											}
										}}
									>
										Add
									</button>
								</div>
								<div className="flex flex-wrap mt-2">
									{editTechnologies.map((tech, index) => (
										<span
											key={index}
											className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
							<div>
								<label className="block text-gray-700 text-sm font-bold mb-2">Github Link</label>
								<input
									type="text"
									value={editGithubLink}
									onChange={(e) => setEditGithubLink(e.target.value)}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div>
								<label className="block text-gray-700 text-sm font-bold mb-2">Landing Page</label>
								<input
									type="text"
									value={editLandingLink}
									onChange={(e) => setEditLandingLink(e.target.value)}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="flex justify-between">
								<button
									type="button"
									onClick={() => setEditModalOpen(false)}
									className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
								>
									Cancel
								</button>

								<button
									type="button"
									className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
									onClick={handleUpdateSkill}
								>
									Update
								</button>
							</div>
						</div>
					</div>
				)} */}
			</body>
		</>
	);
}
