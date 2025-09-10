type ApiResponse<T> = {
  data: T;
  success: boolean;
  error?: string;
};

type User = { id: string; name: string };

const userResponse: ApiResponse<User> = {
  data: {
    id: "1",
    name: "Putri",
  },
  success: true,
};

const stringResponse: ApiResponse<string> = {
  data: "Hello world!",
  success: true,
};

async function main() {
  try {
    console.log("User response:", userResponse);
    console.log("String response:", stringResponse);
  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);
