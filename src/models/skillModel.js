import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SkillSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	level: {
		type: Number,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
});

const Skill = mongoose.models.skills || mongoose.model("skills", SkillSchema);

export default Skill;
