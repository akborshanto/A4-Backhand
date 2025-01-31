export type TUser = {
    
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customer' | 'user'; // restricting role to specific values
    status: 'in-progress' | 'blocked'; // restricting status to specific values
    isDeleted: boolean;
    comparePassword: (enteredPassword: string) => Promise<boolean>;
  };
  