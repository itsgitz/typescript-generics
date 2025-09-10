import axios from "axios";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await axios.get(url);
  if (!res.status.toString().startsWith("2")) {
    throw new Error(res.statusText);
  }
  return res.data;
}

async function main() {
  try {
    const todos = await fetchJSON<Todo>(
      "https://jsonplaceholder.typicode.com/todos"
    );
    console.log(todos);
  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);
