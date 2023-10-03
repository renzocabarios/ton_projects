import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Q2a_79zcESOl9yed4O1bhya4uUWXgxTN",
      accounts: [
        "c4ed76f5009dca4d72854bfff674f9e1890a5d86307e3ef2d1a0a23f4561cb40",
      ],
    },
  },
  etherscan: {
    apiKey: "HG9HI9G492TQGDIAKCDEPQBNH7MQE8UAHD",
  },
};

export default config;
