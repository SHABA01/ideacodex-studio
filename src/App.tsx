import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import PageNotFound from "./pages/PageNotFound";

/**
 * Root Application Router
 * IdeaCodex Studio runs as a single-route app.
 * Modes are handled internally via state, not routing.
 */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
