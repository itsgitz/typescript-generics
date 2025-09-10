type Repository<T> = {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  remove(id: string): Promise<boolean>;
};

function createInMemoryRepository<T extends { id: string }>(): Repository<T> {
  const store: Map<string, T> = new Map();

  async function findById(id: string): Promise<T | null> {
    return store.get(id) || null;
  }

  async function findAll(): Promise<T[]> {
    return [...store.values()];
  }

  async function create(item: T): Promise<T> {
    store.set(item.id, item);
    return item;
  }

  async function update(id: string, item: Partial<T>): Promise<T> {
    const existing = store.get(id);
    if (!existing) throw new Error("Not found.");

    const updated = { ...existing, ...item };
    store.set(id, updated);
    return updated;
  }

  async function remove(id: string) {
    return store.delete(id);
  }

  return {
    findById,
    findAll,
    create,
    update,
    remove,
  };
}

type User = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
};

async function main() {
  try {
    const userRepository = createInMemoryRepository<User>();
    const productRepository = createInMemoryRepository<Product>();

    await userRepository.create({ id: "1", name: "Putri" });
    await userRepository.create({ id: "2", name: "Anggit" });
    const users = await userRepository.findAll();
    const product = await productRepository.create({
      id: "1",
      name: "Soto",
      price: 1000,
    });

    console.log("Users:", users);
    console.log("Product:", product);
  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);
