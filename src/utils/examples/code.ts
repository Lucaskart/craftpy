
interface Example {
    desciption: string
    code: string
}

const exampleList: Example[] = []

exampleList.push({
    desciption: "Exemplos",
    code: ``})

exampleList.push({
    desciption: "Exemplo 1: Classe",
    code: `
class Carro:
  def __init__(self, marca:str, chassi:str):
    self.marca = marca #Atributo público
    self.__chassi = marca #Atributo privado

    def aumentarKM(self):
        pass
`})

exampleList.push({
    desciption: "Exemplo 2: Associação",
    code: `
class Aluno:
    def __init__(self, nome:str, idade:int):
        self.nome = nome
        self.idade = idade

    def info(self):
        return f"Aluno: {self.nome}, Idade: {self.idade}"


class Turma:
    alunos:list[Aluno] = list() #Associação Simples
    def __init__(self, nome_turma:str):
        self.nome_turma = nome_turma

    def adicionar_aluno(self, aluno):
        self.alunos.append(aluno)

    @usecase #Define o método como um Use Case para o Diagrama de Casos de Uso
    def listar_alunos(self):
        print(f"Alunos da turma {self.nome_turma}:")
        for aluno in self.alunos:
            print(aluno.info())
`})

exampleList.push({
    desciption: "Exemplo 3: Herança",
    code: `
class Aluno:
    def __init__(self, nome:str, idade:int):
        self.nome = nome
        self.idade = idade

    def info(self):
        return f"Aluno: {self.nome}, Idade: {self.idade}"


class AlunoGraduacao(Aluno):
    def __init__(self, nome:str, idade:str, curso:str):
        super().__init__(nome, idade)
        self.curso = curso

    def info(self):
        return f"Aluno de Graduação: {self.nome}, Idade: {self.idade}, Curso: {self.curso}"

class AlunoMedioTecnico(Aluno):
    def __init__(self, nome:str, idade:str, curso:str):
        super().__init__(nome, idade)
        self.curso = curso

    def info(self):
        return f"Aluno do Médio Técnico: {self.nome}, Idade: {self.idade}, Curso: {self.curso}"

class Turma:
    alunos:list[Aluno] = list() #Associação Simples
    def __init__(self, nome_turma:str):
        self.nome_turma = nome_turma
    
    @usecase
    def adicionar_aluno(self, aluno):
        self.alunos.append(aluno)
    
    @usecase
    def listar_alunos(self):
        print(f"Alunos da turma {self.nome_turma}:")
        for aluno in self.alunos:
            print(aluno.info())
`})

exampleList.push({
    desciption: "Exemplo 4: Agregação",
    code: `
class Endereco:
    def __init__(self, rua:str, numero:str, cidade:str, estado:str, cep:str):
        self.rua = rua
        self.numero = numero
        self.cidade = cidade
        self.estado = estado
        self.cep = cep

    def info(self):
        return f"Endereço: {self.numero} {self.rua}, {self.cidade}, {self.estado}, CEP: {self.cep}"

class Aluno:
    #O(s) objeto(s) são passados por parâmetros pelo construtor
    def __init__(self, nome:str, idade:intl, endereco:Endereco):
        self.nome = nome
        self.idade = idade
        self.endereco = endereco 

    def info(self):
        return f"Aluno: {self.nome}, Idade: {self.idade}"


class Turma:
    def __init__(self, nome_turma:str, alunos:list[Aluno]):
        self.nome_turma = nome_turma
        self.alunos = alunos #O(s) objeto(s) são passados por parâmetros pelo construtor

    def adicionar_aluno(self, aluno):
        self.alunos.append(aluno)

    @usecase #Define o método como um Use Case para o Diagrama de Casos de Uso
    def listar_alunos(self):
        print(f"Alunos da turma {self.nome_turma}:")
        for aluno in self.alunos:
            print(aluno.info())
`})


//exampleList.push({desciption:"",code:})
export default exampleList
