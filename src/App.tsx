import { ChangeEvent, FormEvent, useEffect, useState } from "react";

function Greeting({ initialName = "" }: { initialName?: string }) {
  const [name, setName] = useState<string>(
    () => window.localStorage.getItem("name") || initialName
  );

  useEffect(() => {
    window.localStorage.setItem("name", name);
  }, [name]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div>
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}
      >
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting initialName="rahman" />;
}

export default App;
