'use client'

import React from "react";
import SceneManager from "./_engine/SceneManager";

function Page() {
  return (
    <div className="relative h-full w-full text-gray-50 bg-[#1a1a1b]">
      <SceneManager />
    </div>
  );
}

export default Page;
