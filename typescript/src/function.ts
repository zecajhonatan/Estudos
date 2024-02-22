let sum = (x: number, y: number): string => {
  return (x + y).toString();
};

let teste = sum(10, 10);
console.log(teste);

let log = (message: string): void => {
  console.log(message);
}
log('Teste')
