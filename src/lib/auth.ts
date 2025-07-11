import bcrypt from "bcryptjs"

// Mock user database - in a real app, this would be a database
export interface User {
  id: string;
  email: string;
  name: string;
  role: "customer" | "tradesperson";
  createdAt: Date;
}

interface MockUser extends User {
  password: string;
}

const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "demo@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    name: "Demo User",
    role: "customer",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "john@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    name: "John Smith",
    role: "customer",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    email: "sarah@electrician.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    name: "Sarah Mitchell",
    role: "tradesperson",
    createdAt: new Date("2024-01-10"),
  },
]

export class AuthService {
  static async login(email: string, password: string): Promise<User | null> {
    const user = mockUsers.find((u) => u.email === email)
    if (!user) {
      return null
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return null
    }

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  static async register(
    email: string,
    password: string,
    name: string
  ): Promise<User | null> {
    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      throw new Error("User already exists")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser: MockUser = {
      id: (mockUsers.length + 1).toString(),
      email,
      password: hashedPassword,
      name,
      role: "customer",
      createdAt: new Date(),
    }

    mockUsers.push(newUser)

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser
    return userWithoutPassword
  }

  static async getUserById(id: string): Promise<User | null> {
    const user = mockUsers.find((u) => u.id === id)
    if (!user) {
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  static async updateUser(
    id: string,
    updates: Partial<Omit<User, "id" | "createdAt">>
  ): Promise<User | null> {
    const userIndex = mockUsers.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      return null
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = mockUsers[userIndex]
    return userWithoutPassword
  }
}
