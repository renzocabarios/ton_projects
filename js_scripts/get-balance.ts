import { Network, getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4, TonClient, fromNano } from "@ton/ton";
import { MNEMONIC, TON_NETWORK } from "./env";

async function main() {
  const key = await mnemonicToWalletKey(MNEMONIC.split(" "));
  const wallet = WalletContractV4.create({
    publicKey: key.publicKey,
    workchain: 0,
  });
  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: TON_NETWORK as Network });
  const client = new TonClient({ endpoint });

  // query balance from chain
  const balance = await client.getBalance(wallet.address);
  console.log("balance:", fromNano(balance));

  // query seqno from chain
  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();
  console.log("seqno:", seqno);
}

main();
