export interface IUser {
  name: string
  age: number
  email: string
  photo?: string | null
  role: 'customer' | 'admin'
  userStatus: 'active' | 'inactive'
}