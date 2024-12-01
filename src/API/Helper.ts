import axios from "axios";
import { WishType } from "../types";

const REPO_OWNER = "orlifera"; // Your GitHub username
const REPO_NAME = "Present1"; // Your repository name
const FILE_PATH = "src/data/wish.json"; // Path to wishes.json in the repository
const BRANCH = "master";

const githubApi = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
    },
});

export const fetchWishes = async () => {
    try {
        const response = await githubApi.get(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`);
        const content = JSON.parse(atob(response.data.content)); // Decode Base64
        return { content, sha: response.data.sha };
    } catch (error) {
        console.error("Failed to fetch wishes:", error);
        throw new Error("Could not fetch wishes");
    }
};

export const updateWishes = async (wishes: WishType[], sha: string) => {
    const content = btoa(JSON.stringify(wishes, null, 2)); // Base64-encode the content
    try {
        const response = await githubApi.put(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            message: "Update wishes.json",
            content,
            sha,
            branch: BRANCH,
        });
        return { newSha: response.data.content.sha };
    } catch (error) {
        console.error("Failed to update wishes:", error);
        throw new Error("Could not update wishes");
    }
};
