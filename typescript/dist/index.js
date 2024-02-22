"use strict";
let age = 5;
let firshName = "Jhonatan";
const isValue = true;
let idk = 5;
const numeros = [1, 3, 36, 4569];
let booleans = [false, true, false];
let nomes = ['Jhonatan', 'Santos'];
// Tupla
const person = [5, 'Jhonatan', false];
// List Tupla
const people = [
    [5, 'Zeca'],
    [10, 'Jhonatan']
];
// Intersections
let productionId = '1';
// Enum
var Direction;
(function (Direction) {
    Direction[Direction["up"] = 1] = "up";
    Direction[Direction["down"] = 2] = "down";
})(Direction || (Direction = {}));
const direction = Direction.up;
console.log(direction);
// Type Assertions
let dados = 'Bone';
let zeca = '10';
// let itemId = dados as boolean;
let itemId = dados;
console.log(itemId);
