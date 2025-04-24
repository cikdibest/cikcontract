import { JsonRpcProvider, Wallet, Contract } from "ethers";
import * as abi from "../../../defi-contract/deployments/v1/abi.json";
import * as dotenv from "dotenv";
dotenv.config();

export function getContractV1() {
  const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC);
  const signer = new Wallet(process.env.PRIVATE_KEY!, provider);

  return new Contract(process.env.CONTRACT_ADDRESS_V1!, abi, signer);
}
