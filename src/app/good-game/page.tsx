"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";

import ActionBar from "./_components/ActionBar"
import AnimatedX from "./_components/Shapes/AnimatedX";
import AnimatedO from "./_components/Shapes/AnimatedO";
import SceneRenderer from "./_engine/Background";
import { SceneManagerProvider } from "./_engine/SceneManager";
import scenes from "./_scenes";


function SceneModeSuperTicTacToe() {
  return (
    <div className="flex items-center justify-center h-full w-full text-white text-2xl pt-24">
      Super Tic Tac Toe Scene
    </div>
  );
}

// ------------------------
// App
// ------------------------
export default function App() {
  return (
    <SceneManagerProvider initialScene="menu" scenes={scenes}>
      <div className="relative h-full w-screen overflow-hidden">
        <ActionBar />
        <SceneRenderer />
      </div>
    </SceneManagerProvider>
  );
}
