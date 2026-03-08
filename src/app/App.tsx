import { RouterProvider } from "react-router";
import { router } from "./routes";
import { SectionProvider } from "./context/SectionContext";

export default function App() {
  return (
    <SectionProvider>
      <RouterProvider router={router} />
    </SectionProvider>
  );
}