let age: number = 5;
let firshName: string = "Jhonatan";
const isValue: boolean = true;
let idk: any = 5

const numeros: number[] = [1,3,36,4569]
let booleans: boolean[] = [false, true, false]
let nomes: string[] = ['Jhonatan', 'Santos']

// Tupla
const person: [number, string, boolean] = [5, 'Jhonatan', false]

// List Tupla
const people: [number, string][]= [
  [5, 'Zeca'],
  [10, 'Jhonatan']
]

// Intersections
let productionId: number | string | boolean = '1'

// Enum
enum Direction {
  up = 1,
  down = 2
}
const direction = Direction.up
console.log(direction)

// Type Assertions
let dados: any = 'Bone'
let zeca: any = '10'
// let itemId = dados as boolean;

let itemId = <string>dados


console.log(itemId)



