import React from "react";
import { DemoComponent, Footer } from "../Components";

const Demo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DemoComponent />
      <Footer className="mt-auto" />
    </div>
  );
};

export default Demo;
