import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "Holidaze - About";
  }, []);

  return (
    <main>
      <h1>About Holidaze</h1>
    </main>
  );
}

export { About };
