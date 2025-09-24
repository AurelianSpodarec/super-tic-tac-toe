import { DashboardRoutes, WebsiteRoutes } from "@/routes";
import Link from "next/link";

// active-item neon2 - active

// function MenuItem({ children, isActive }: { text: string, isActive: boolean }) {
//   return (
//     <Link href={''} className={`font-neontubes text-[#ef476f] hover:active-item hover:neon2`}>{children}</Link>
//   )
// }

function WebHeader() {
  return (
    <div className="w-full p-6 fixed top-0 z-50">
      {/* <div className="flex items-center border border-amber-300/10 shadow shadow-amber-300/30 rounded-full bg-black/15 backdrop-blur-2xl px-10 p-6 justify-between text-white">
        <nav className="flex flex-row space-x-6">
          <MenuItem href={''}>Choose Style</MenuItem>
          <MenuItem href={''}>Game Modes</MenuItem>
          <MenuItem href={''}>Leaderboard</MenuItem>
          <MenuItem href={''}>FAQ</MenuItem>
          <MenuItem href={''}>Community</MenuItem>
        </nav>
        <div className="neon-logo-2 font-neontubes text-3xl">JazzTacToe</div>
        <button>Start the Game!</button>
      </div> */}
    </div>
  );
}

export default WebHeader
