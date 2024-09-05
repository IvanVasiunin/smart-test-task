import { ReactNode, useEffect, useState } from "react";

import Table from "./components/Table/Table";

import { useUsersDispatch, useUsersSelector } from "./store/hooks";
import { fetchingData } from "./store/users-slice";

type rawData = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default function App() {
  const [isFetching, setIsFetching] = useState<boolean>();

  const dispatch = useUsersDispatch();

  const users = useUsersSelector((state) => state.users.users);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const rawData = (await response.json()) as rawData[];
      const parsedData: User[] = rawData.map((user) => {
        return {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
        };
      });
      setIsFetching(false);
      dispatch(fetchingData(parsedData));
    }

    fetchData();
  }, [dispatch]);

  let content: ReactNode;

  if (users) {
    content = <Table users={users} />;
  }

  if(isFetching) {
    content = <p id="loading-fallback">Fetching data...</p>
  }

  return (
    <main>
      <h1>User Management Table</h1>
      {content}
    </main>
  );
}
