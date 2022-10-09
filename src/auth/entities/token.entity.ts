import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Token {
  @PrimaryColumn()
  key: string;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}
