import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Token } from './entities/token.entity';
import { RegistrationDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
  ) {}

  async findUser(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findUser(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findToken(key: string): Promise<Token | undefined> {
    return this.tokensRepository.findOne({
      where: { key },
      relations: ['user'],
    });
  }

  async makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async login(user: User) {
    const key = await this.makeid(64);
    this.tokensRepository.save({ key, user });
    return { access_token: key };
  }

  async createUser(registrationDto: RegistrationDto) {
    const user = new User();
    user.username = registrationDto.username;
    user.email = registrationDto.email;
    user.password = await bcrypt.hash(registrationDto.password, 10);
    return this.usersRepository.save(user);
  }
}
