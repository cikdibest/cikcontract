import { ethers, artifacts } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const LendingFactory = await ethers.getContractFactory("CikLendingV1");
  const contract = await LendingFactory.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("✅ CikLendingV1 deployed to:", contractAddress);

  // Write contract address and ABI to file
  const outputDir = path.resolve(__dirname, "../deployments/v1");
  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(
    path.join(outputDir, "contract-address.json"),
    JSON.stringify({ contractAddress }, null, 2)
  );

  const artifact = await artifacts.readArtifact("CikLendingV1");
  fs.writeFileSync(
    path.join(outputDir, "abi.json"),
    JSON.stringify(artifact.abi, null, 2)
  );

  console.log("📦 Contract address and ABI saved to deployments/v1/");
}

main().catch((error) => {
  console.error("🚨 Error deploying contract:", error);
  process.exitCode = 1;
});
