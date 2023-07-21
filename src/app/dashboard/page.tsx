"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { storage } from "@/utils/firebase";
import { ref, uploadBytes, getDownloadURL, UploadResult } from "firebase/storage";

interface Project {
	_id: string;
	name: string;
	technologies: string[];
	projectPhoto: File | undefined;
	githubLink: string;
	landingPage: string;
}

export default function Dashboard() {
	const router = useRouter();
	const [data, setData] = useState("nothing");

	const [name, setName] = useState("");
	const [technologies, setTechnologies] = useState<string[]>([]);
	const [technology, setTechnology] = useState("");
	const [githubLink, setGithubLink] = useState("");
	const [landingPageLink, setLandingPageLink] = useState("");
	const [modalOpen, setModalOpen] = useState(false);

	const [projects, setProjects] = useState<Project[]>([]);

	const [loading, setLoading] = useState(false);

	const [photo, setPhoto] = useState<File | undefined>();
	const [editPhoto, setEditPhoto] = useState<File | undefined>();
	const [photoLink, setPhotoLink] = useState<string | undefined>();

	const [nameError, setNameError] = useState("");
	const [technologyError, setTechnologyError] = useState("");
	const [githubLinkError, setGithubLinkError] = useState("");
	const [landingPageLinkError, setLandingPageLinkError] = useState("");

	const [selectedProjectId, setSelectedProjectId] = useState("");
	const [editName, setEditName] = useState("");
	const [editTechnologies, setEditTechnologies] = useState<string[]>([]);
	const [editGithubLink, setEditGithubLink] = useState("");
	const [editLandingLink, setEditLandingLink] = useState("");

	const [editModalOpen, setEditModalOpen] = useState(false);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPhoto(file);
		}
	};

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

	useEffect(() => {
		getUserDetails();
		getProjects();
	}, []);

	const getProjects = async () => {
		try {
			const res = await axios.get("/api/projects");
			console.log(res.data);
			setProjects(res.data);
		} catch (error: any) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTechnology(e.target.value);
	};
	const editHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTechnology(e.target.value);
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && technology.trim() !== "") {
			setTechnologies((prevTechnologies) => [...prevTechnologies, technology]);
			setTechnology("");
		}
	};
	const editHandleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && technology.trim() !== "") {
			setEditTechnologies((prevTechnologies) => [...prevTechnologies, technology]);
			setTechnology("");
		}
	};

	const createProjects = async () => {
		try {
			setNameError("");
			setTechnologyError("");
			setGithubLinkError("");
			setLandingPageLinkError("");

			// Validate fields
			let isValid = true;
			if (name.trim() === "") {
				setNameError("Please enter a project name");
				isValid = false;
			}
			if (technologies.length === 0) {
				setTechnologyError("Please enter at least one technology");
				isValid = false;
			}
			if (githubLink.trim() === "") {
				setGithubLinkError("Please enter a GitHub link");
				isValid = false;
			}
			if (landingPageLink.trim() === "") {
				setLandingPageLinkError("Please enter a landing page link");
				isValid = false;
			}

			if (!isValid) {
				return;
			}

			setLoading(true);

			const storageRef = ref(storage, `${name}/`);

			if (photo) {
				const photoRef = ref(storageRef, photo.name);
				await uploadBytes(photoRef, photo);
				const downloadURL = await getDownloadURL(photoRef);
				setPhotoLink(downloadURL);
				const res = await axios.post("/api/projects", {
					name,
					technologies,
					projectPhoto: downloadURL,
					githubLink,
					landingPage: landingPageLink,
				});

				if (res.data) {
					setProjects((prevProjects) => [...prevProjects, res.data]);
				}
			}

			toast.success("Project created");
			setLoading(false);
			setModalOpen(false);
		} catch (error: any) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		setName("");
		setTechnologies([]);
		setTechnology("");
		setPhoto(undefined);
		setGithubLink("");
		setLandingPageLink("");
		setPhotoLink(undefined);
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

	const handleEditProject = (projectId: string) => {
		setEditModalOpen(true);
		const selectedProject = projects.find((project) => project._id === projectId);
		console.log(projectId);
		if (selectedProject) {
			setSelectedProjectId(projectId);
			setEditName(selectedProject.name);
			setEditTechnologies(selectedProject.technologies);
			setEditPhoto(selectedProject.projectPhoto);
			setEditGithubLink(selectedProject.githubLink);
			setEditLandingLink(selectedProject.landingPage);
			{
				console.log(selectedProject.projectPhoto);
			}
			// setModalOpen(true);
		}
	};

	const handleDeleteProject = (projectId: any) => {};

	const handleUpdateProject = async () => {
		if (selectedProjectId) {
			// Find the project index in the projects array
			const projectIndex = projects.findIndex((project) => project._id === selectedProjectId);
			if (projectIndex !== -1) {
				// Create a new project object with updated details
				const updatedProject = {
					_id: selectedProjectId,
					name: editName,
					technologies: editTechnologies,
					projectPhoto: editPhoto,
					githubLink: editGithubLink,
					landingPage: editLandingLink,
				};

				try {
					const res = await axios.patch(`/api/projects/`, {
						id: selectedProjectId,
						data: updatedProject,
					});

					if (res) {
						const updatedProjects = [...projects];
						updatedProjects[projectIndex] = updatedProject;
						setProjects(updatedProjects);

						setSelectedProjectId("");
						setEditName("");
						setEditTechnologies([]);
						setEditGithubLink("");
						setEditLandingLink("");
						setEditModalOpen(false);
					}
				} catch (error) {}

				// Update the projects array with the new project
			}
		}

		// Reset the editing state and close the modal
	};

	return (
		<>
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
			<body className="relative bg-yellow-50 overflow-hidden max-h-screen">
				<aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
					<div className="flex flex-col justify-between h-full">
						<div className="flex-grow">
							<div className="px-4 py-6 text-center border-b">
								<h1 className="text-xl font-bold leading-none text-yellow-700">Dashboard</h1>
							</div>
							<div className="p-4">
								<ul className="space-y-1">
									<li>
										<a className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="1em"
												height="1em"
												fill="currentColor"
												className="text-lg mr-4"
												viewBox="0 0 16 16"
											>
												<path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
											</svg>
											Projects
										</a>
									</li>

									{/* <TopicsList /> */}
									<li>
										<a className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												className="text-lg mr-4"
												viewBox="0 0 16 16"
											>
												<path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
											</svg>
											Socials
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</aside>

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
											Projects
										</div>
										<div className="h-100 border-l mx-4"></div>
										<div className="flex flex-nowrap -space-x-3">
											<div className="h-9 w-9">
												<span>{projects.length}</span>
											</div>
										</div>
									</div>
								</div>

								<hr className="my-10" />
								<div className="grid">
									<div>
										<div className="flex items-center mb-4 justify-betwwen">
											<h2 className="text-2xl font-bold mr-2">Projects</h2>
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
												Add Project
											</button>
										</div>
										{projects.map((project) => (
											<div
												key={project._id}
												className="flex flex-col bg-white border border-gray-200 rounded-lg mb-10 md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
											>
												<img
													className="object-cover w-30 h-30 rounded-l-lg md:w-64 md:h-auto md:rounded-none md:rounded-t-lg"
													src={
														project.projectPhoto instanceof File
															? URL.createObjectURL(project.projectPhoto)
															: project.projectPhoto
													}
													alt=""
												/>
												<div className="flex flex-col justify-between p-4 leading-normal ">
													<div>
														<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
															{project.name}
														</h5>
														<div className="mb-3 text-gray-700 dark:text-gray-400">
															<label className="font-bold">Technologies:</label>
															<span>{project.technologies.join(", ")}</span>
														</div>
														<div className="mb-3 text-gray-700 dark:text-gray-400">
															<label className="font-bold">Github Link:</label>
															<a
																href={project.githubLink}
																target="_blank"
																rel="noopener noreferrer"
															>
																{project.githubLink}
															</a>
														</div>
														<div className="mb-3 text-gray-700 dark:text-gray-400">
															<label className="font-bold">Landing Page:</label>
															<a
																href={project.landingPage}
																target="_blank"
																rel="noopener noreferrer"
															>
																{project.landingPage}
															</a>
														</div>
													</div>
													<div className="flex ">
														<button
															type="button"
															onClick={() => handleEditProject(project._id)}
															className="flex items-center px-4 py-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-5 w-5 mr-1"
																viewBox="0 0 20 20"
																fill="currentColor"
															>
																<path
																	fillRule="evenodd"
																	d="M3.293 10.707a1 1 0 0 1 0-1.414L8.586 4.95a1 1 0 0 1 1.414 0l5.293 5.343a1 1 0 1 1-1.414 1.414L10 7.414l-4.293 4.293a1 1 0 0 1-1.414-1.414l5.293-5.343z"
																	clipRule="evenodd"
																/>
															</svg>
															Edit
														</button>
														<button
															type="button"
															onClick={() => handleDeleteProject(project._id)}
															className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-5 w-5 mr-1"
																viewBox="0 0 20 20"
																fill="currentColor"
															>
																<path
																	fillRule="evenodd"
																	d="M16 4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2H2a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h1v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8h1a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-1zM5 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1H5zm8 12H7a1 1 0 0 1-1-1V8h8v7a1 1 0 0 1-1 1z"
																	clipRule="evenodd"
																/>
																<path
																	fillRule="evenodd"
																	d="M9 10a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0v-5zm4 0a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0v-5z"
																	clipRule="evenodd"
																/>
															</svg>
															Delete
														</button>
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
							<h2 className="text-2xl font-bold">Add Project</h2>
							<div>
								<label className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
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
								{photo && (
									<div className="relative m-2">
										<img
											src={URL.createObjectURL(photo)}
											alt={`Selected Photo`}
											className="w-20 h-20 object-cover rounded"
										/>
										<button
											type="button"
											className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
											onClick={() => setPhoto(undefined)}
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
										onChange={handleInputChange}
										onKeyDown={handleInputKeyDown}
										className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
											technologyError ? "border-red-500" : ""
										}`}
									/>
									<button
										type="button"
										className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
										onClick={() => {
											if (technology.trim() !== "") {
												setTechnologies((prevTechnologies) => [...prevTechnologies, technology]);
												setTechnology("");
											}
										}}
									>
										Add
									</button>
								</div>
								<div className="flex flex-wrap mt-2">
									{technologies.map((tech, index) => (
										<span
											key={index}
											className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
										>
											{tech}
										</span>
									))}
								</div>
								{technologyError && <p className="text-red-500 text-sm">{technologyError}</p>}
							</div>
							<div>
								<label className="block text-gray-700 text-sm font-bold mb-2">Github Link</label>
								<input
									type="text"
									value={githubLink}
									onChange={(e) => setGithubLink(e.target.value)}
									className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										githubLinkError ? "border-red-500" : ""
									}`}
								/>
								{githubLinkError && <p className="text-red-500 text-sm">{githubLinkError}</p>}
							</div>
							<div>
								<label className="block text-gray-700 text-sm font-bold mb-2">
									Landing Page link
								</label>
								<input
									type="text"
									value={landingPageLink}
									onChange={(e) => setLandingPageLink(e.target.value)}
									className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										landingPageLinkError ? "border-red-500" : ""
									}`}
								/>
								{landingPageLinkError && (
									<p className="text-red-500 text-sm">{landingPageLinkError}</p>
								)}
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
									onClick={createProjects}
									disabled={loading} // Disable the button while loading
								>
									{loading ? "Creating..." : "Create"}
								</button>
							</div>
						</div>
					</div>
				)}
				{editModalOpen && (
					<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
						<div className="bg-white rounded-xl p-8 space-y-6">
							<h2 className="text-2xl font-bold">Edit Project</h2>
							<div>
								<label className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
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
												setTechnology("");
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
									onClick={handleUpdateProject}
								>
									Update
								</button>
							</div>
						</div>
					</div>
				)}
			</body>
		</>
	);
}
