// import { Profiler, ProfilerOnRenderCallback } from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App.tsx";
import "./index.css";

// function onRenderCallback(
//    id: any, // the "id" prop of the Profiler tree that has just committed
//    phase: any, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
//    actualDuration: any, // time spent rendering the committed update
//    baseDuration: any, // estimated time to render the entire subtree without memoization
//    startTime: any, // when React began rendering this update
//    commitTime: any, // when React committed this update
//    interactions: any, // the Set of interactions belonging to this update
// ) {
//    // Aggregate or log render timings...
//    console.log("id: ", id);
//    console.log("phase: ", phase);
//    console.log("actualDuration: ", actualDuration);
//    console.log("baseDuration: ", baseDuration);
//    console.log("startTime", startTime);
//    console.log("commitTime: ", commitTime);
//    console.log("interactions: ", interactions);

//    console.log(startTime - new Date().getTime() === 0);
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <SnackbarProvider maxSnack={3}>
            {/* <Profiler id="App" onRender={onRenderCallback}> */}
            <App />
            {/* </Profiler> */}
         </SnackbarProvider>
      </PersistGate>
   </Provider>,
);
