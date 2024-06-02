import "dotenv/config";

export const MNEMONIC: string = process.env.MNEMONIC ?? "";
export const PINATA_API_KEY: string = process.env.PINATA_API_KEY ?? "";
export const PINATA_API_SECRET: string = process.env.PINATA_API_SECRET ?? "";
export const TON_NETWORK: string = process.env.TON_NETWORK ?? "";
