"use client";

import { useContext, useEffect, useRef } from "react";

import { darkModeContext } from "@/context/DarkModeContext";

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useContext(darkModeContext);

  const gisCusTheme = theme === "light" ? "light" : "dark";

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement("script");
    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", "zoonyoung/zoonyoung.github.io");
    scriptElem.setAttribute("data-repo-id", "R_kgDOMOKlfg");
    scriptElem.setAttribute("data-category", "Comments");
    scriptElem.setAttribute("data-category-id", "DIC_kwDOMOKlfs4Cgy6P");
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "bottom");
    scriptElem.setAttribute("data-theme", gisCusTheme);
    scriptElem.setAttribute("data-lang", "en");
    ref.current.appendChild(scriptElem);
  }, [gisCusTheme]);

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme: gisCusTheme } } }, "https://giscus.app");
  }, [gisCusTheme]);

  return <section ref={ref} />;
}
