import React, { FC, useEffect, useState } from "react";

const HomePage: FC = () => {

  const [ number, setNumber ] = useState(0);

  useEffect(() => {
    console.log("Hello from the client-side hydrated JS!");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      { number }

      <button onClick={() => setNumber((x) => x + 1)}>
        Increment!
      </button>
    </div>
  );
};

export default HomePage;
