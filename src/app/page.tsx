"use client";
import Image from "next/image";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import JobsPage from "./jobs/page";

export default function App() {
  return (
    <Provider store={store}>
      <JobsPage />
    </Provider>
  );
}
