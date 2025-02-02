export interface IUser {
  name: string
  age?: number
  email: string
  password:string
  photo?: string | null
  role: 'customer' | 'admin'
  userStatus: 'active' | 'inactive'
}