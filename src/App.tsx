import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import * as router from "./router/router.ts";
import { useSelector } from "react-redux";
import { RootState } from "./store/store.ts";

function App() {
  const { isLogin } = useSelector((state: RootState) => state.sign);

  return (
    <Routes>
      {!isLogin ? (
        <>
          {router.PRIVATE_PAGES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <route.component />
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          {router.PUBLIC_PAGES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <route.component />
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
