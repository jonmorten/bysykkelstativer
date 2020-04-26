import React from "react";

import "../css/styles.css";
import "../css/tailwind.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
