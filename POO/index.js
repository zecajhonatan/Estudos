// CLASSIFICAÇÃO
// ABSTRAÇÃO

// class Filme {
//   constructor() {
//     this.titulo = ""
//     this.ano = 0
//     this.genero = ""
//     this.diretor = ""
//     this.atores = []
//     this.duracao = 0
//   }
//   Reproduzir() {
//     console.log("Reproduzir")
//   }
//   Pausar() {
//     console.log("Pausar")
//   }
//   Fechar() {
//     console.log("Fechar")
//   }
// }

// let res = new Filme()

// ----------------------------------------------------------------


// class Caminhao {
//   constructor() {
//     this.tipo = "Toco"
//     this.cor = "Vermelho"
//     this.eixos = 1
//     this.peso = 5000
//     this.motorista = "João"
//     this.velocidade = 125
//     this.combustivel = 300
//   }
//   Ligar() {
//     console.log("Ligar")
//   }
//   Desligar() {
//   console.log("Desligar")
//   }
//   Abastecer() {
//     if (this.combustivel <= 100) {
//       console.log("Precisa abastecer")
//     }
//   }
// }
// let toco = new Caminhao()

// class Calculadora {

//   static Soma(a, b) {
//     console.log(a + b)
//   }

//   static Sub(a, b) {
//     console.log(a - b)
//   }
// }

// console.log(Calculadora.Soma)


// ----------------------------------------------------------------


// class Dado {
//   constructor(faces) {
//     this.face = faces
//   }
//   Rolar() {
//     console.log(`Resultado do Dado ${this.GetRandomIntInclusive(1, this.face)} `)
//   }
//   GetRandomIntInclusive(min, max) {
//     min = Math.ceil(min)
//     max = Math.floor(max)
//     return Math.floor(Math.random() * (max - min + 1)) + min
//   }
// }

// let d6 = new Dado(6)
// let d10 = new Dado(10)
// let d100 = new Dado(100)

// d6.Rolar()
// d10.Rolar()
// d100.Rolar()

// ----------------------------------------------------------------

// COMPOSIÇÃO EM CLASSES NO JAVASCRIPT

// class Leitor {
//   ler(arquivo, caminho) {
//     return "Conteúdo Arquivo!"
//   }
// }

// class Escritor {
//   Escrever(conteúdo) {
//     console.log("Conteúdo Escrito!")
//   }
// }

// class Criador {
//   Criar(nome) {
//     console.log("Arquivo Criado!")
//   }
// }

// class Destruidor {
//   Deletar(nome) {
//     console.log("Deletando Arquivo!")
//   }
// }

// class ManipulacaoDeArquivo {
//   constructor(nome) {
//     this.arquivo = nome
//     this.leitor = new Leitor()
//     this.escritor = new Escritor()
//     this.criador = new Criador()
//     this.destruidor = new Destruidor()
//   }
// }

// class GerenciadorUsuarios {
//   constructor() {
//     this.criador = new Criador()
//     this.escritor = new Escritor()
//   }

//   SalvarListaUsuarios() {
//     this.criador.Criar("usuario.txt")
//     this.escritor.Escrever("usuario.txt, lista")
//   }
// }

// let manipulador = new ManipulacaoDeArquivo("meuArquivo.txt")
// manipulador.leitor.ler()

// let usuarios = new GerenciadorUsuarios()
// usuarios.SalvarListaUsuarios(["Jhonatan", "Santos"])


// ----------------------------------------------------------------

// HERANÇA PROGRAMAÇÃO ORIENTADA OBJETOS

class Animal {
  constructor(nome, idade, preco) {
    this.nome = nome
    this.idade = idade
    this.preco = preco
  }
  ChecarEstoque() {
    return 10
  }
}

class Cachorro extends Animal {
  constructor(cor) {
    super(nome, idade, preco)
    this.cor = cor
  }
  MetodoQualquer() {
    super.ChecarEstoque()
  }
}

let cachorro = new Cachorro()






