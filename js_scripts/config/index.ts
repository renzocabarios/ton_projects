import { Network, getHttpEndpoint } from "@orbs-network/ton-access";
import { TON_NETWORK } from "../env";
import { TonClient } from "@ton/ton";

export async function getEndpoint() {
  return await getHttpEndpoint({ network: TON_NETWORK as Network });
}

export async function getClient() {
  return new TonClient({ endpoint: await getEndpoint() });
}
