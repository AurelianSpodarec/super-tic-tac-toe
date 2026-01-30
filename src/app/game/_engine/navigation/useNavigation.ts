import { useContext } from "react";

import { NavigationContext } from "./NavigationProvider";

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useNavigation must be used inside <NavigationProvider>");
  return ctx;
}
