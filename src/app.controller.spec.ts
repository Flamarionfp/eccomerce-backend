import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppError } from './App.error';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

describe('AppController', () => {
  let appController: AppController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [PrismaService, AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    prisma = app.get<PrismaService>(PrismaService);

    await appController.register({
      email: 'usertest@test.com',
      name: 'User Test',
      password: 'Teste123456',
    });
  });

  afterEach(async () => {
    await appController.deleteUser({ email: 'usertest@test.com' });
  });

  describe('root', () => {
    it('should be able to register a new user', async () => {
      const user = await appController.register({
        email: 'usertest@test.com',
        name: 'User Test',
        password: 'Teste123456',
      });

      expect(user).toHaveProperty('id');
    });

    it('should not be able to register an user with an existing email', async () => {
      expect(
        await appController.register({
          email: 'usertest@test.com',
          name: 'Test',
          password: 'Teste123456',
        }),
      ).toEqual(new AppError('Email ja cadastrado.'));
    });

    it('should not be able to register an user with an invalid password', async () => {
      const payload = {
        name: 'teste',
        email: 'teste123@test.com',
        password: '123',
      };

      const response = await appController.register(payload);

      expect(response).toEqual(new AppError('Senha muito curta'));
    });

    it('should be able to authenticate with a registered user', async () => {
      const auth = await appController.authenticate({
        email: 'usertest@test.com',
        password: '12345678 ',
      });

      expect(auth).toHaveProperty('token');
    });

    /* it('should not be able to authenticate with an inexistent user', () => {});

    it('should not be able to authenticate with an incorrect password', () => {}); */
  });
});
