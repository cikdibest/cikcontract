import { JsonRpcProvider, Wallet, Contract } from "ethers";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

export function getContract(version: "v1" | "v2" | "v3") {
  const abiPath = path.resolve(__dirname, `../../../defi-contract/deployments/${version}/abi.json`);
  const abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"));

  const address = process.env[`CONTRACT_ADDRESS_${version.toUpperCase()}`];
  if (!address) {
    throw new Error(`Missing contract address for version: ${version}`);
  }

  const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC);
  const signer = new Wallet(process.env.PRIVATE_KEY!, provider);
  const contract = new Contract(address, abi, signer);

  return {
    contract,
    signer,
  };
}
