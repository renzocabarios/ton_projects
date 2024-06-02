import ConnectWallet from "@/components/connect-wallet";
import IncrementButton from "@/components/increment-button";
import CounterDetails from "./(components)/counter-details";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConnectWallet />
      <CounterDetails />
      <IncrementButton />
    </main>
  );
}
