import ReactDOM, { Container } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./main.css";
import AppRoutes from "./routes/AppRoutes";
import { Theme } from "@radix-ui/themes";
import { AuthorsProvider } from "./contexts/AuthorsContext";
import { BooksProvider } from "./contexts/BooksContext";

const root = document.getElementById("root") as Container;
ReactDOM.createRoot(root).render(
  <BooksProvider>
    <AuthorsProvider>
      <Theme
        accentColor="indigo"
        panelBackground="solid"
        scaling="100%"
        radius="medium"
        appearance="light"
        className="theme"
      >
        <AppRoutes />
      </Theme>
    </AuthorsProvider>
  </BooksProvider>
);
