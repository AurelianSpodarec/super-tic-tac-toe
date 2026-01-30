
// import useScene from "../_engine/SceneManager/useScene";
// import { MenuItem } from "../_engine/FocusNavigator/useFocusNavigator";
// import useButtonController from "../_engine/useButtonController";

// function ActionBar() {

//   const { pop } = useScene();

//   // TODO: This should be optional, should also be able to do this without padding an array
//   const buttons: MenuItem[] = [
//     { id: "back", text: "Back", action: pop },
//     { id: "settings", text: "Settings", action: () => console.log("Open settings") }
//   ];

//   const { handleClick } = useButtonController(buttons);

//   return (
//     <header className="text-white fill-white z-10 fixed top-0 w-full flex justify-between px-3 py-2">
//       <button onClick={() => handleClick("back")} aria-label="Go back">
//         <span className="sr-only">Go Back</span>
//         <svg className="size-8 fill-gray-300" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
//           <path
//             d='M20 13.5a4.505 4.505 0 0 1-4.5 4.5H12a1 1 0 0 1 0-2h3.5a2.5 2.5 0 0 0 0-5H7.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.416l3-3a1 1 0 0 1 1.414 1.416L7.414 9H15.5a4.505 4.505 0 0 1 4.5 4.5'
//           ></path>
//         </svg>
//       </button>
//       <button onClick={() => handleClick("settings")} aria-label="Settings">
//         <span className="sr-only">Settings</span>
//         <svg className="size-8 fill-gray-300" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
//           <g data-name='setting android app aplication phone'>
//             <path d='M30.56 8.47a8 8 0 0 0-7-7 64.3 64.3 0 0 0-15.06 0 8 8 0 0 0-7 7 64.3 64.3 0 0 0 0 15.06 8 8 0 0 0 7 7 64.3 64.3 0 0 0 15.06 0 8 8 0 0 0 7-7 64.3 64.3 0 0 0 0-15.06m-2 14.83a6 6 0 0 1-5.28 5.28 63.7 63.7 0 0 1-14.6 0 6 6 0 0 1-5.26-5.28 63.7 63.7 0 0 1 0-14.6A6 6 0 0 1 8.7 3.42a63.7 63.7 0 0 1 14.6 0 6 6 0 0 1 5.28 5.28 63.7 63.7 0 0 1 0 14.6z'></path>
//             <path d='m25.43 15.12-1.56-.3a7 7 0 0 0-.25-1l1.22-1a2 2 0 0 0 .27-2.82l-1.28-1.57A2 2 0 0 0 21 8.17l-1.2 1a7 7 0 0 0-.95-.44V7.14a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2l.06 1.57a9 9 0 0 0-1 .48l-1.26-1a2 2 0 0 0-2.8.37l-1.19 1.78a2 2 0 0 0 .34 2.8l1.27.94a8 8 0 0 0-.21 1l-1.54.38a2 2 0 0 0-1.46 2.43l.48 1.94A2 2 0 0 0 8 21.32l1.52-.41a6.7 6.7 0 0 0 .68.8l-.67 1.46a2 2 0 0 0 1 2.65l1.82.83a2 2 0 0 0 2.65-1l.66-1.44h1.03l.71 1.41a2 2 0 0 0 2.69.88l1.79-.9a2 2 0 0 0 .88-2.69L22 21.5a6 6 0 0 0 .63-.83l1.56.32a2 2 0 0 0 2.36-1.55l.41-2a2 2 0 0 0-1.53-2.32M24.61 19l-1.56-.33a2 2 0 0 0-2.05.83 6 6 0 0 1-.49.64 2 2 0 0 0-.27 2.2l.76 1.47-1.78.9-1-2.05a1 1 0 0 0-1.07-.54 6 6 0 0 1-.95.11 7 7 0 0 1-1-.07 1 1 0 0 0-1 .58l-1 2.09-1.85-.83.65-1.45a2 2 0 0 0-.36-2.19 6 6 0 0 1-.52-.63A2 2 0 0 0 9.06 19l-1.55.39L7 17.43l1.55-.38a2 2 0 0 0 1.49-1.65 5 5 0 0 1 .16-.79 2 2 0 0 0-.72-2.09l-1.26-1L9.47 10l1.26 1a2 2 0 0 0 2.21.14 5 5 0 0 1 .72-.36 2 2 0 0 0 1.2-1.87V7.32h2v1.59a2 2 0 0 0 1.26 1.82 6 6 0 0 1 .74.33 2 2 0 0 0 2.21-.23l1.22-1 1.28 1.54-1.23 1a2 2 0 0 0-.63 2.12 5.4 5.4 0 0 1 .19.79 2 2 0 0 0 1.56 1.58l1.56.33z'></path>
//             <path d='M15.92 12a4 4 0 0 0 .08 8h.08a4 4 0 0 0-.16-8M18 16a2 2 0 1 1-2-2 2 2 0 0 1 2 2'></path>
//           </g>
//         </svg>
//       </button>
//       <div>

//       </div>
//     </header>
//   )
// }

// export default ActionBar

import useScene from "../_engine/SceneManager/useScene";
import { MenuItem } from "../_engine/FocusNavigator/useFocusNavigator";
import useButtonController from "../_engine/useButtonController";

function ActionBar() {
  const { pop, push } = useScene();

  // Fullscreen toggle
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  // FocusNavigator buttons
  const buttons: MenuItem[] = [
    { id: "back", text: "Back", action: pop },
    { id: "settings", text: "Settings", action: () => push("Settings") },
    { id: "fullscreen", text: "Fullscreen", action: toggleFullScreen },
  ];
  const { handleClick } = useButtonController(buttons);

  return (
    <header className="fixed top-0 w-full flex justify-between items-center px-4 py-2 text-white z-50">
      <div className="flex gap-2">
        <button onClick={() => handleClick("back")} aria-label="Go back">
          <span className="sr-only">Go Back</span>
          <svg className="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20 13.5a4.505 4.505 0 0 1-4.5 4.5H12a1 1 0 0 1 0-2h3.5a2.5 2.5 0 0 0 0-5H7.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.416l3-3a1 1 0 0 1 1.414 1.416L7.414 9H15.5a4.505 4.505 0 0 1 4.5 4.5"></path>
          </svg>
        </button>
      </div>

      <div className="flex gap-4">

        <button onClick={() => handleClick("fullscreen")} aria-label="Fullscreen">
          <span className="sr-only">Fullscreen</span>
          <svg className="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M4 4h6v2H6v4H4V4zm14 0h6v6h-2V6h-4V4zM4 14h2v4h4v2H4v-6zm16 0h2v6h-6v-2h4v-4z" />
          </svg>
        </button>
        <button onClick={() => handleClick("settings")} aria-label="Settings">
          <span className="sr-only">Settings</span>
          <svg className="w-6 h-6 fill-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <g data-name='setting android app aplication phone'>
              <path d='M30.56 8.47a8 8 0 0 0-7-7 64.3 64.3 0 0 0-15.06 0 8 8 0 0 0-7 7 64.3 64.3 0 0 0 0 15.06 8 8 0 0 0 7 7 64.3 64.3 0 0 0 15.06 0 8 8 0 0 0 7-7 64.3 64.3 0 0 0 0-15.06m-2 14.83a6 6 0 0 1-5.28 5.28 63.7 63.7 0 0 1-14.6 0 6 6 0 0 1-5.26-5.28 63.7 63.7 0 0 1 0-14.6A6 6 0 0 1 8.7 3.42a63.7 63.7 0 0 1 14.6 0 6 6 0 0 1 5.28 5.28 63.7 63.7 0 0 1 0 14.6z'></path>
              <path d='m25.43 15.12-1.56-.3a7 7 0 0 0-.25-1l1.22-1a2 2 0 0 0 .27-2.82l-1.28-1.57A2 2 0 0 0 21 8.17l-1.2 1a7 7 0 0 0-.95-.44V7.14a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2l.06 1.57a9 9 0 0 0-1 .48l-1.26-1a2 2 0 0 0-2.8.37l-1.19 1.78a2 2 0 0 0 .34 2.8l1.27.94a8 8 0 0 0-.21 1l-1.54.38a2 2 0 0 0-1.46 2.43l.48 1.94A2 2 0 0 0 8 21.32l1.52-.41a6.7 6.7 0 0 0 .68.8l-.67 1.46a2 2 0 0 0 1 2.65l1.82.83a2 2 0 0 0 2.65-1l.66-1.44h1.03l.71 1.41a2 2 0 0 0 2.69.88l1.79-.9a2 2 0 0 0 .88-2.69L22 21.5a6 6 0 0 0 .63-.83l1.56.32a2 2 0 0 0 2.36-1.55l.41-2a2 2 0 0 0-1.53-2.32M24.61 19l-1.56-.33a2 2 0 0 0-2.05.83 6 6 0 0 1-.49.64 2 2 0 0 0-.27 2.2l.76 1.47-1.78.9-1-2.05a1 1 0 0 0-1.07-.54 6 6 0 0 1-.95.11 7 7 0 0 1-1-.07 1 1 0 0 0-1 .58l-1 2.09-1.85-.83.65-1.45a2 2 0 0 0-.36-2.19 6 6 0 0 1-.52-.63A2 2 0 0 0 9.06 19l-1.55.39L7 17.43l1.55-.38a2 2 0 0 0 1.49-1.65 5 5 0 0 1 .16-.79 2 2 0 0 0-.72-2.09l-1.26-1L9.47 10l1.26 1a2 2 0 0 0 2.21.14 5 5 0 0 1 .72-.36 2 2 0 0 0 1.2-1.87V7.32h2v1.59a2 2 0 0 0 1.26 1.82 6 6 0 0 1 .74.33 2 2 0 0 0 2.21-.23l1.22-1 1.28 1.54-1.23 1a2 2 0 0 0-.63 2.12 5.4 5.4 0 0 1 .19.79 2 2 0 0 0 1.56 1.58l1.56.33z'></path>
              <path d='M15.92 12a4 4 0 0 0 .08 8h.08a4 4 0 0 0-.16-8M18 16a2 2 0 1 1-2-2 2 2 0 0 1 2 2'></path>
            </g>
          </svg>
        </button>
        {/* <div className="flex gap-4 font-sans text-white text-lg tracking-wider"> */}
          {/* <div title="Military Time">{militaryTime}</div> */}
          {/* <div title="UK Time">{ukTime}</div> */}
        {/* </div> */}
      </div>
    </header>
  );
}

export default ActionBar;
