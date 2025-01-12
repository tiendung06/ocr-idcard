import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const NewCitizenPage = lazy(() => import("./pages/NewCitizenPage"));
const OldCitizenPage = lazy(() => import("./pages/OldCitizenPage"));
const PassportPage = lazy(() => import("./pages/PassportPage"));

const App: React.FC = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<NewCitizenPage />} />
        <Route path="/old-citizen" element={<OldCitizenPage />} />
        <Route path="/passport" element={<PassportPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
