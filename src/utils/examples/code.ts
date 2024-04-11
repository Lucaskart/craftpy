
interface Example {
    desciption: string
    code: string
}


const exampleList: Example[] = []


exampleList.push({
    desciption: "Leilão",
    code: `
class Leiloeiro:
    def __init__(self, nome:str):
        self.nome = nome

    @usecase
    def criar_leilao(self):
        pass

    @usecase
    def finalizar_leilao(self):
        pass

class Usuario:
    def __init__(self, nome:str):
        self.nome = nome

    @usecase
    @include[criar_leilao]
    def dar_lances_no_leilao(self):
        pass

    @usecase
    @include[finalizar_leilao]
    @extends[dar_lances_no_leilao]
    @extends[pagar_pelo_produto]
    def ganhar_leilao(self):
        pass

    @usecase
    def pagar_pelo_produto(self):
        pass

    @include[pagar_pelo_produto]
    def pagar_com_cartao_cred(self):
        pass
        
    @include[pagar_pelo_produto]
    def pagar_com_boleto(self):
        pass
`})


exampleList.push({
    desciption: "Usuário e Administrador",
    code: `
class User:
    def __init__(self, nome:str):
        self.nome = nome

    @usecase
    def Log_In(self):
        pass

    @extends[Log_In]
    def Log_In_Password(self):
        pass
    
    @extends[Log_In]
    def Log_In_Certificate(self):
        pass

class Administrator(User):
    def __init__(self, nome:str):
        self.nome = nome

    @usecase
    @extends[Log_In]
    def Manage_User(self):
        pass
    
    @extends[Manage_User]
    def Change_Email(self):
        pass

    @extends[Manage_User]
    def Change_Password(self):
        pass
`
})


exampleList.push({
    desciption: "Conta bancária",
    code: `
class Person:
    __bankacc: list[BankAccount] = list()
    address: Address
    def __init__(self, name: str, age: int, job: Job):
        self.name: str = name
        self.age: int = age
        self.__job: Job = job
        self.var_const_tipo:int = 10
        self.var_const_semtipo = 10
        self.var_string_semtipo = "djafkdsljfdlkdsj"
        self.var_string_tipo:str = "djafkdsljfdlkdsj"

class BankAccount:
    def __init__(self, number:int):
        self.number: int = number
    
    @meu_decorator
    def minha_funcao():
        print("Minha função está sendo chamada")

class Address:
    def __init__(self, street: str, city: str):
        self.street: str = street
        self.city: str = city

class Job:
    def __init__(self, position: str, salary: float):
        self.__position: str = position
        self.salary: float = salary

# Herança: Student é uma subclasse de Person
class Student(Person):
    def __init__(self, name: str, age: int, school: str):
        super().__init__(name, age)
        self.school: str = school

class ComposicaoClass:
    def __init__(self):
        self.__person = Person("Fulano", 18)
        self.jobFulano:Job = Job()
class MyClass:
    @classmethod
    def my_method(cls, x):
        print(x)

    def __init__(self):
        pass

    def my_function(self, y):
        print(y)
    
class AnotherClass(MyClass):
    @staticmethod
    def static_method(z):
        print(z)
  `})



//exampleList.push({desciption:"",code:})
export default exampleList
