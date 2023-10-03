import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
  return new Contract(
    "0x9F5c520A41A9ee580A3aDf7bb147dE0Ce18AA817",
    abi,
    signer
  );
}
