'use client';

import type { ReactNode } from "react";

import { KeyLabel, NavigateHintIcon } from "./consoleHintIcons";

export type ConsoleHint = {
  icon: ReactNode;
  label: string;
};

export const CONSOLE_HINTS_SELECT_BACK: ConsoleHint[] = [
  { icon: <KeyLabel label="Enter" />, label: "Select" },
  { icon: <KeyLabel label="Esc" />, label: "Back" },
];

export const CONSOLE_HINTS_SELECT_NAVIGATE_BACK: ConsoleHint[] = [
  { icon: <KeyLabel label="Enter" />, label: "Select" },
  { icon: <NavigateHintIcon />, label: "Navigate" },
  { icon: <KeyLabel label="Esc" />, label: "Back" },
];
