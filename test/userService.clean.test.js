const { UserService } = require('../src/userService');

const dadosUsuarioPadrao = {
  nome: 'Fulano de Tal',
  email: 'fulano@teste.com',
  idade: 25,
  isAdmin: false,
};

describe('UserService - Testes Limpos (AAA)', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService._clearDB(); 
  });


// Separar em 2 testes para tirar smell

  test('Criar novo usuário com um ID definido e status ativo pelo padrão', () => {
    // Act
    const usuarioCriado = userService.createUser(
      dadosUsuarioPadrao.nome,
      dadosUsuarioPadrao.email,
      dadosUsuarioPadrao.idade
    );

    // Assert
    expect(usuarioCriado.id).toBeDefined();
    expect(usuarioCriado.nome).toBe(dadosUsuarioPadrao.nome);
    expect(usuarioCriado.status).toBe('ativo');
  });

  test('Buscar usuário pelo seu ID depois da criação', () => {
    // Arrange
    const usuarioCriado = userService.createUser(
      dadosUsuarioPadrao.nome,
      dadosUsuarioPadrao.email,
      dadosUsuarioPadrao.idade
    );

    // Act
    const usuarioBuscado = userService.getUserById(usuarioCriado.id);

    // Assert
    expect(usuarioBuscado.id).toBe(usuarioCriado.id);
    expect(usuarioBuscado.email).toBe(dadosUsuarioPadrao.email);
  });

// tirar loops
  test('Desativar um usuário comum', () => {
    // Arrange
    const usuarioComum = userService.createUser('Comum', 'usercomum@testt.com', 30);

    // Act
    const sucesso = userService.deactivateUser(usuarioComum.id);
    const usuarioAtualizado = userService.getUserById(usuarioComum.id);

    // Assert
    expect(sucesso).toBe(true);
    expect(usuarioAtualizado.status).toBe('inativo');
  });

  test('Não desativar um usuário administrador (retornando false)', () => {
    // Arrange
    const usuarioAdmin = userService.createUser('Admin', 'admin@testt.com', 45, true);

    // Act
    const sucesso = userService.deactivateUser(usuarioAdmin.id);
    const usuarioAtualizado = userService.getUserById(usuarioAdmin.id);

    // Assert
    expect(sucesso).toBe(false);
    expect(usuarioAtualizado.status).toBe('ativo');
  });


  test('Gerar relatório com os nomes e os IDs dos usuários', () => {
    // Arrange
    const usuario1 = userService.createUser('Lorrayne', 'lorrayne@gmail.com', 20);
    const usuario2 = userService.createUser('Marayze', 'maara@gmail.com', 21);

    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain(usuario1.id.toString());
    expect(relatorio).toContain(usuario2.id.toString());
    expect(relatorio).toContain('Lorrayne');
    expect(relatorio).toContain('Marayze');
    expect(relatorio.startsWith('--- Relatório dos Usuários ---')).toBe(true);
  });


  test('Lançar erro ao tentar cadastrar um usuário menor de 18 anos', () => {
    const criarMenor = () => {
      userService.createUser('Menor de Idade', 'menor@gmail.com', 14);
    };
    expect(criarMenor).toThrow('O usuário deve ser maior de idade.');
  });


  test('Indicar que não há usuários cadastrados (return: lista vazia)', () => {
    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain('Nenhum usuário cadastrado no banco de dados');
  });
});
