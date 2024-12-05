import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";


export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");
        if (!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
};

export const PATCH = async (request, { params }) => {
    try {
        const { prompt, tag } = await request.json();
        
        if (!prompt || !tag) {
            return new Response("Prompt and tag are required fields", { status: 400 });
        }

        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response("Prompt updated successfully", { status: 200 });
    } catch (error) {
        return new Response("Error updating prompt", { status: 500 });
    }
};


export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Validate the ID
        if (!params.id) {
            return new Response("Invalid ID provided", { status: 400 });
        }

       
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

        if (!deletedPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
