
interface Example {
    desciption: string
    code: string
}

const exampleList: Example[] = []

exampleList.push({
    desciption: "Exemplos",
    code: `# Bem-vindo ao PyUML.
# Escreva seu código em Python 3 ou veja os exemplos disponíveis.
`
})

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

exampleList.push({
    desciption: "Sistema de livraria", code: `class Livro:
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

    @usecase
    def buscar_livros_por_autor(self, autor: str):
        return [livro for livro in self.livros if livro.autor == autor]

    @usecase
    def buscar_livros_por_genero(self, genero: str):
        return [livro for livro in self.livros if livro.genero == genero]

    @usecase
    @include[buscar_livros_por_autor]
    @include[buscar_livros_por_genero]
    def comprar_livro(self, livro: Livro, quantidade: int):
        pass

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

    @usecase
    def buscar_livros_por_autor(self, autor: str):
        return [livro for livro in self.livros if livro.autor == autor]

    @usecase
    def buscar_livros_por_genero(self, genero: str):
        return [livro for livro in self.livros if livro.genero == genero]

    @usecase
    def comprar_livro(self, livro: Livro, cliente: Cliente, quantidade: int):
        pass
`})

exampleList.push({
    desciption: "Uso de Atributos no Py2UML", code: `""" 
Exemplos de criação e atribuição de variáveis no Py2UML 
"""

class A:
    def __init__(self, a:int, b , c):
        self.a = a #int 
        self.b:str = b #str
        self.c = c #null
        self.d #null
        self.e:int #int
        self.f:str = var_nao_declarada #str
        self.g = var_nao_declarada #null

class B:
    def __init__(self, a:int, b:str):
        self.a:bool = a #int
        self.b:dict = b #str 
        self.c:int = "novo valor" #int
        self.d:bool = b #str

class C:
    def __init__(self):
        self.a = 10 #int
        self.b = "exemplo" #str
        self.c = False #bool

class D:
    def __init__(self):
        self.a = [1,2,3] #list
        self.b = [] #list
        self.c = list() #list
        self.d = (4,5,6) #tuple
        self.e = () #tuple
        self.f = {'Yan': '1234-5678', 'Pedro': '9999-9999'} #dict
        self.g = {} #dict
`})

exampleList.push({
    desciption: "Associação simples no Py2UML", code: `""" 
Exemplo de Associação simples entre classes no Py2UML 
"""

class A:
    def __init__(self):
        pass

class B:
    def __init__(self):
        pass

class C:
    def __init__(self):
        pass

class D:
    a:A #Associação simples
    b:B = none #Associação simples
    c:list[C] = list() # Associação simples com multiplicidade
    def __init__(self):
        pass
`})

exampleList.push({
    desciption: "Herança no Py2UML", code: `""" 
Exemplo de Herança entre classes no Py2UML 
"""

class A:
    def __init__(self):
        pass

class B:
    def __init__(self):
        pass

class C(A): #Herança única
    def __init__(self):
        pass

class D(A,B): #Herança múltipla
    def __init__(self):
        pass
`})

exampleList.push({
    desciption: "Agregação no Py2UML", code: `""" 
Exemplo de Agregação entre classes no Py2UML 
"""

class A:
    def __init__(self):
        pass

class B:
    def __init__(self):
        pass

class C:
    def __init__(self, a:A):
        self.a = a #Agregação

class D:
    def __init__(self, a:list[A], b):
        self.a = a #Agregação com multiplicidade
        self.b:list[B] = b #Agregação com multiplicidade
`})

exampleList.push({
    desciption: "Composição no Py2UML", code: `""" 
Exemplo de Composição entre classes no Py2UML 
"""

class A:
    def __init__(self):
        pass

class B:
    def __init__(self):
        self.a = A() #Composição
`})

exampleList.push({
    desciption: "Dependência no Py2UML", code: `""" 
Exemplo de Dependência entre classes no Py2UML 
"""

class A:
    def __init__(self):
        pass

class B:
    def __init__(self):
        pass
    
    def dependency_method(self):
        self.a = A() #Dependência (create)
`})

exampleList.push({desciption:"Casos de uso no Py2UML",code:`"""
Exemplo de diagrama de casos de uso no Py2UML 
"""

class Vendedor:
    def __init__(self):
        pass
    
    @usecase
    @extends[consulta_no_SPC] #Pode-se inserir métodos não existêntes
    @include[verificar_pagamentos_atrasados]
    def tirar_pedido(self):
        pass

class Entregador:
    def __init__(self):
        pass
    
    @usecase
    @include[verificar_pagamentos_atrasados]
    def entrega_pedido(self):
        pass
    
`})
    
exampleList.push({
    desciption: "Diagrama Entidade-Relacionamento no Py2UML",
    code: `"""
Exemplo de diagrama entidade-relacionamento no Py2UML 
"""
    
class Departamento:

    id: int

    def __init__(self, nome: str, numero: int, localizacao: str, projeto: Projeto):
        self.nome = nome
        self.numero = numero
        self.localizacao = localizacao
        self.controla = projeto

class Projeto:
    def __init__(self, nome: str, numero: int, localizacao: str, departamento: Departamento):
        self.nome = nome
        self.numero = numero
        self.localizacao = localizacao
        self.controla = departamento
        
`})

//exampleList.push({desciption:"",code:})
export default exampleList
