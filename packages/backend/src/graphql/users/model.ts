import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import Room from '../rooms/model';

@Entity({ name: 'users' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({ unique: true })
  email?: string;
  @Column({ unique: true })
  username?: string;
  @Column()
  password_hash?: string;

  @ManyToMany(type => Room, room => room.members)
  rooms?: Room[];
  @RelationId((user: User) => user.rooms)
  room_ids?: string[];

  @ManyToMany(type => Room, room => room.admins)
  admin_rooms?: Room[];

  constructor(id: string) {
    this.id = id;
  }
}
