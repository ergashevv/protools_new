import i18next from "i18next";
import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import { DataProvider } from "./contexts/DataContext";
import { MenuProvider, TitleProvider } from "./contexts/contexts";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <DataProvider>
        <MenuProvider>
          <TitleProvider>
            <App />
          </TitleProvider>
        </MenuProvider>
      </DataProvider>
    </I18nextProvider>
  </React.StrictMode>
);
