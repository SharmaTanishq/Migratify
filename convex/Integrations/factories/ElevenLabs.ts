"use node"
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export const createElevenLabsClient = (apiKey: string) =>
  new ElevenLabsClient({ apiKey });