// Type
type Order = {
  productId: string;
  price: number;
};

type User = {
  firstName: string;
  age: number;
  email: string;
  password?: string;
  orders: Order[];
};

let user: User = {
  firstName: "Jhonatan",
  age: 32,
  email: "Jhonatan@gmail.com",
  orders: [{ productId: "Tv", price: 20 }],
};

let printLog = (password: string) => {};
printLog(user.password!);

// Unions
type Author = {
  books: string[]
}

let author: Author & User = {
  age: 20,
  books: ['2'],
  email: 'Zecajhonatan@gmail.com',
  firstName: 'Zecajhonatan',
  orders: [],
}

// interfaces
interface Userinterface {
 readonly fisrtName: string,
  email: string
}

interface AuthorInterface {
  books: string[]
} 

let userTest: Userinterface = {
  fisrtName: 'jhonatanSantos',
  email: 'jhonatanSantos@gmail.com'
}

let newAuthor: AuthorInterface & Userinterface = {
  books: [],
  email: 'jhonatan@gmail.com',
  fisrtName: 'Jhonatan'
}








