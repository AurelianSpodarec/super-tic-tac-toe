{}
// 'use client'

// import { menuExtras, playStyles } from "./data";
// // ==========================
// // 3. HELPERS

// import { Direction } from "./types";

// import { motion, AnimatePresence } from "motion/react";
// // ==========================
// const getAnimation = (direction: Direction, index: number) => {
//   if (direction === "leftToCenter") return { initial: { opacity: 0, x: -120 - index * 10 }, animate: { opacity: 1, x: 0 } };
//   if (direction === "bottomToTop") return { initial: { opacity: 0, y: 120 + index * 10 }, animate: { opacity: 1, y: 0 } };
//   return { initial: {}, animate: {} };
// };

// // ==========================
// // 4. MENU ITEM WRAPPER
// // ==========================
// interface MenuItemWrapperProps {
//   index: number;
//   direction?: Direction;
//   children: React.ReactNode;
// }

// function MenuItemWrapper({ index, direction = "leftToCenter", children }: MenuItemWrapperProps) {
//   const anim = getAnimation(direction, index);
//   return (
//     <motion.div
//       initial={anim.initial}
//       animate={anim.animate}
//       transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 25 }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// // ==========================
// // 5. MENU ITEM COMPONENTS
// // ==========================
// function ActionItem({ item, onClick }: { item: any; onClick: (item: any) => void }) {
//   return (
//     <button
//       onClick={() => onClick(item)}
//       style={{
//         display: "block",
//         width: "100%",
//         padding: 12,
//         marginBottom: 8,
//         cursor: "pointer",
//         fontWeight: "bold",
//         textAlign: "left"
//       }}
//     >
//       {item.label || item}
//     </button>
//   );
// }

// function SettingsItem({ item }: { item: string }) {
//   return (
//     <div style={{ marginBottom: 12 }}>
//       <label style={{ display: "block", fontWeight: "bold", marginBottom: 4 }}>{item}</label>
//       <input
//         type="range"
//         min={0}
//         max={100}
//         defaultValue={50}
//         style={{ width: "100%" }}
//         onChange={(e) => console.log(`${item} set to ${e.target.value}`)}
//       />
//     </div>
//   );
// }

// // ==========================
// // 6. MENU ITEMS (REFACTORED)
// // ==========================
// interface MenuItemsProps {
//   items: any[];
//   onClick: (item: any) => void;
//   direction?: Direction;
//   type?: "default" | "settings" | "language";
// }

// function MenuItems({ items, onClick, direction = "leftToCenter", type = "default" }: MenuItemsProps) {
//   return (
//     <>
//       {items.map((item, i) => (
//         <MenuItemWrapper key={item.id || item} index={i} direction={direction}>
//           {type === "settings" ? <SettingsItem item={item} /> : <ActionItem item={item} onClick={onClick} />}
//         </MenuItemWrapper>
//       ))}
//     </>
//   );
// }

// // ==========================
// // 7. SCREENS COMPONENTS
// // ==========================
// function MainMenu({ onSelect }: { onSelect: (item: any) => void }) {
//   const items = [...playStyles, ...menuExtras];
//   return <MenuItems items={items} onClick={onSelect} direction="leftToCenter" />;
// }

// function SubMenuScreen({
//   submenuId,
//   options,
//   onBack,
//   onSelect
// }: {
//   submenuId: string;
//   options?: string[];
//   onBack: () => void;
//   onSelect: (item: any) => void;
// }) {
//   let items: any[] = [];
//   let type: "default" | "settings" | "language" = "default";

//   const submenu = playStyles.find(p => p.id === submenuId);
//   if (submenu) items = submenu.modeIds.map(id => modes.find(m => m.id === id)).filter(Boolean);
//   else if (options) {
//     items = options;
//     type = submenuId === "settings" ? "settings" : "language";
//   }

//   return (
//     <div className="p-4">
//       <motion.button
//         onClick={onBack}
//         style={{ marginBottom: 12, cursor: "pointer", fontWeight: "bold" }}
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         ← Back
//       </motion.button>
//       <MenuItems items={items} onClick={onSelect} direction="bottomToTop" type={type} />
//     </div>
//   );
// }

// export default MainMenu
