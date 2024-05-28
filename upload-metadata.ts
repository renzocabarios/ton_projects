import { MNEMONIC } from "./env";
import { openWallet, updateMetadataFiles, uploadFolderToIPFS } from "./helpers";

async function init() {
  const metadataFolderPath = "./metadata/";
  const imagesFolderPath = "./images/";

  const wallet = await openWallet(MNEMONIC.split(" "), true);

  console.log("Started uploading images to IPFS...");
  const imagesIpfsHash = await uploadFolderToIPFS(imagesFolderPath);
  console.log(
    `Successfully uploaded the pictures to ipfs: https://gateway.pinata.cloud/ipfs/${imagesIpfsHash}`
  );

  console.log("Started uploading metadata files to IPFS...");
  await updateMetadataFiles(metadataFolderPath, imagesIpfsHash);
  const metadataIpfsHash = await uploadFolderToIPFS(metadataFolderPath);
  console.log(
    `Successfully uploaded the metadata to ipfs: https://gateway.pinata.cloud/ipfs/${metadataIpfsHash}`
  );
}

init();
