import fs from "fs/promises";
import path from "path";

export async function getChallenges() {
  const challengesDir = path.join(process.cwd(), "data", "challenges");
  const files = await fs.readdir(challengesDir);
  const challenges = files.map(file => path.parse(file).name).sort((a, b) => Number(a) - Number(b));

  return challenges;
}

export const CHALLENGE_NAMES: Record<string, string> = {
  "1": "The Greeting",
  "2": "Just Call Me Maybe",
  "3": "Empty Contract?",
  "4": "Who Can Sign This?",
  "5": "Give Me My Points!",
  "6": "Meet All The Conditions",
  "7": "Delegate",
  "8": "The Unverified",
  "9": "Password Protected",
  "10": "Give 1 Get 1",
  "11": "Who Can Call Me?",
  "12": "Give Me The Block!",
};
