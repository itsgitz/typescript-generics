interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

// Entities
type User = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
};

class InMemoryRepository<T extends { id: string }> implements Repository<T> {
  private store: Map<string, T> = new Map();

  async findById(id: string): Promise<T | null> {
    return this.store.get(id) || null;
  }

  async findAll(): Promise<T[]> {
    return [...this.store.values()];
  }

  async create(item: T): Promise<T> {
    this.store.set(item.id, item);
    return item;
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    const existing = this.store.get(id);
    if (!existing) throw new Error("Not found.");

    const updated = { ...existing, ...item };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string) {
    return this.store.delete(id);
  }
}

async function main() {
  try {
    const userRepository = new InMemoryRepository<User>();
    const productRepository = new InMemoryRepository<Product>();

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
