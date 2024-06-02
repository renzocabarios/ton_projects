import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4, fromNano } from "@ton/ton";
import { MNEMONIC } from "./env";
import { getClient } from "./config";

async function main() {
  const key = await mnemonicToWalletKey(MNEMONIC.split(" "));
  const wallet = WalletContractV4.create({
    publicKey: key.publicKey,
    workchain: 0,
  });

  const client = await getClient();

  // query balance from chain
  const balance = await client.getBalance(wallet.address);
  console.log("balance:", fromNano(balance));

  // query seqno from chain
  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();
  console.log("seqno:", seqno);
}

main();
