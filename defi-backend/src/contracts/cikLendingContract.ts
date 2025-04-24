import { JsonRpcProvider, Wallet, Contract } from "ethers";
import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

export function getContract(version: "v1" | "v2" | "v3") {
  const abiPath = path.resolve(__dirname, `../../../defi-contract/deployments/${version}/abi.json`);
  const abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"));

  const address = process.env[`CONTRACT_ADDRESS_${version.toUpperCase()}`]!;

  const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC);
  const signer = new Wallet(process.env.PRIVATE_KEY!, provider);

  return new Contract(address, abi, signer);
}
