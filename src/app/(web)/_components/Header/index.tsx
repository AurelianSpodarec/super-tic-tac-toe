import { DashboardRoutes, WebsiteRoutes } from "@/routes";
import Link from "next/link";

function WebHeader() {
  return (
    <div className="rounded-full">
      
      <div>JazzTacToe</div>
      <div className="flex flex-col">
        <Link href={''} className="underline text-blue-700">Choose Style</Link>
        <Link href={''} className="underline text-blue-700">Tutorial</Link>
        <Link href={''} className="underline text-blue-700">Game Modes</Link>
        <Link href={''} className="underline text-blue-700">FAQ</Link>
      </div>
      <button>Start the Game!</button>
    </div>
  );
}

export default WebHeader
