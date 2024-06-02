import { Network, getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { TonClient, WalletContractV4, internal } from "@ton/ton";
import { MNEMONIC, TON_NETWORK } from "./env";

async function main() {
  const key = await mnemonicToWalletKey(MNEMONIC.split(" "));
  const wallet = WalletContractV4.create({
    publicKey: key.publicKey,
    workchain: 0,
  });

  const endpoint = await getHttpEndpoint({ network: TON_NETWORK as Network });
  const client = new TonClient({ endpoint });

  if (!(await client.isContractDeployed(wallet.address))) {
    return console.log("wallet is not deployed");
  }

  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();
  await walletContract.sendTransfer({
    secretKey: key.secretKey,
    seqno: seqno,
    messages: [
      internal({
        to: "EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e",
        value: "0.05",
        body: "Hello",
        bounce: false,
      }),
    ],
  });

  let currentSeqno = seqno;
  while (currentSeqno == seqno) {
    console.log("waiting for transaction to confirm...");
    await sleep(1500);
    currentSeqno = await walletContract.getSeqno();
  }
  console.log("transaction confirmed!");
}

main();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
