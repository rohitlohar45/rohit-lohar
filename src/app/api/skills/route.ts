import {connect} from "@/dbConfig/dbConfig";
import Project from "@/models/projectModal";
import Skill from "@/models/skillModel"
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        // const {title, description, link, githubLink, image} = reqBody;

        console.log(reqBody);

        const skill = await Skill.create(reqBody)

        return NextResponse.json(skill, {status: 201})
        
        // return NextResponse.json({message: "Project created successfully"}, {status: 201})

        

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
export async function GET(request: NextRequest){
    try {

        const skills = await Skill.find({})

        return NextResponse.json(skills, {status: 200})
        

        

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
export async function PATCH(request: NextRequest){
    try {

        // update project
        const reqBody = await request.json()

        const {id, data} = reqBody;

        const project = await Project.findByIdAndUpdate(id, data, {new: true})

        if(!project){
            return NextResponse.json({message: "Project not found"}, {status: 404})
        }

        return NextResponse.json(project, {status: 200})


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}