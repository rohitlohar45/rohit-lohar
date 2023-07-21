import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	projectPhoto: {
		type: String,
	},
	landingPage: {
		type: String,
	},
	githubLink: {
		type: String,
	},
	technologies: [
		{
			type: String,
		},
	],
});

const Project = mongoose.models.projects || mongoose.model("projects", projectSchema);

export default Project;
