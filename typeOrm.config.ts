import { DataSource } from 'typeorm';
import { User } from './src/auth/entities/user.entity';
import { Token } from './src/auth/entities/token.entity';
import { InitialTables1665330273417 } from './migrations/1665330273417-InitialTables';

export default new DataSource({
  type: 'postgres',
  host: '172.17.0.1',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [User, Token],
  migrations: [InitialTables1665330273417],
});
