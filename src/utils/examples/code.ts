
interface Example {
    desciption: string
    code: string
}

const exampleList: Example[] = []

exampleList.push({
    desciption: "Exemplos",
    code: ``
})

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

exampleList.push({
    desciption: "Sistema para vendas de ingressos de cinema", code: `class Filme:
    def __init__(self, titulo: str, duracao: int, genero: str):
        self.titulo = titulo  # Título do filme
        self.duracao = duracao  # Duração em minutos
        self.genero = genero  # Gênero do filme

class Sessao:
    def __init__(self, filme: Filme, horario: str, sala: str, preco: float, disponivel: int):
        self.filme = filme  # Filme sendo exibido
        self.horario = horario  # Horário de início da sessão
        self.sala = sala  # Sala onde a sessão ocorrerá
        self.preco = preco  # Preço do ingresso
        self.disponivel = disponivel  # Quantidade de ingressos disponíveis

class Cliente:
    def __init__(self, nome: str, cpf: str, idade: int):
        self.nome = nome  # Nome do cliente
        self.cpf = cpf  # CPF do cliente
        self.idade = idade  # Idade do cliente
    
    @usecase
    def comprar_ingresso(self, sessao: Sessao, quantidade: int):
        pass

class Ingresso:
    def __init__(self, sessao: Sessao, cliente: Cliente, quantidade: int):
        self.sessao = sessao  # Sessão para a qual o ingresso foi adquirido
        self.cliente = cliente  # Cliente que adquiriu o ingresso
        self.quantidade = quantidade  # Quantidade de ingressos adquiridos

class SistemaVendasIngressosCinema:
    sessoes:list[Sessao] = []  # Lista de sessões disponíveis
    def __init__(self):
        pass

    @usecase
    def adicionar_sessao(self, sessao: Sessao):
        self.sessoes.append(sessao)

    @usecase
    def remover_sessao(self, sessao: Sessao):
        self.sessoes.remove(sessao)

    @usecase
    def buscar_sessoes_por_filme(self, filme: Filme):
        pass

    @usecase
    def buscar_sessoes_por_horario(self, horario: str):
        pass

class Cinema:
    def __init__(self):
        self.sistema_vendas = SistemaVendasIngressosCinema()
`})

exampleList.push({desciption:"Sistema de livraria",code:`class Livro:
    def __init__(self, titulo: str, autor: str, genero: str, preco: float, estoque: int):
        self.titulo = titulo  # Título do livro
        self.autor = autor  # Autor do livro
        self.genero = genero  # Gênero do livro
        self.preco = preco  # Preço do livro
        self.estoque = estoque  # Quantidade disponível em estoque

class Cliente:
    def __init__(self, nome: str, cpf: str, email: str):
        self.nome = nome  # Nome do cliente
        self.cpf = cpf  # CPF do cliente
        self.email = email  # E-mail do cliente

class Venda:
    def __init__(self, livro: Livro, cliente: Cliente, quantidade: int, total: float):
        self.livro = livro  # Livro vendido
        self.cliente = cliente  # Cliente que realizou a compra
        self.quantidade = quantidade  # Quantidade de livros vendidos
        self.total = total  # Total da compra

class SistemaVendasLivraria:
    def __init__(self):
        self.livros:list[Livro] = []  # Lista de livros disponíveis

    @usecase
    def adicionar_livro(self, livro: Livro):
        self.livros.append(livro)

    @usecase
    def remover_livro(self, livro: Livro):
        self.livros.remove(livro)

    @usecase[Cliente] #Define que também é um UseCase de 'Cliente'
    def buscar_livros_por_autor(self, autor: str):
        return [livro for livro in self.livros if livro.autor == autor]

    @usecase[Cliente] #Define que também é um UseCase de 'Cliente'
    def buscar_livros_por_genero(self, genero: str):
        return [livro for livro in self.livros if livro.genero == genero]

    @usecase[Cliente] #Define que também é um UseCase de 'Cliente'
    def comprar_livro(self, livro: Livro, cliente: Cliente, quantidade: int):
        pass
`})

//exampleList.push({desciption:"",code:})
export default exampleList
