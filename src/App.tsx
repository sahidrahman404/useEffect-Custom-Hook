import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface SerializeAndDeserialize {
  serialize: <T>(a: T) => string;
  deserialize: <T>(a: T) => string;
}

const useLocalStorageWithState = function <T>(
  key: string,
  initialProps?: unknown,
  options?: SerializeAndDeserialize
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const defaultOptions = {
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  };

  const [state, setState] = useState<T>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return options
        ? options.deserialize(valueInLocalStorage)
        : defaultOptions.deserialize(valueInLocalStorage);
    }

    return typeof initialProps === "function" ? initialProps() : "";
  });

  useEffect(() => {
    window.localStorage.setItem(
      key,
      options
        ? options.serialize(state as T)
        : defaultOptions.serialize(state as T)
    );
  }, [options, defaultOptions, key, state]);

  return [state, setState];
};

function Greeting({ initialName = "" }: { initialName?: string }) {
  const [name, setName] = useLocalStorageWithState<string>("name", initialName);

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
