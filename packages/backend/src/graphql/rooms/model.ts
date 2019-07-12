import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  RelationId,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import User from '../users/model';

@Entity({ name: 'rooms' })
export default class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true, nullable: false })
  name?: string;
  @Column({ nullable: true })
  topic?: string;

  @OneToOne(_ => User, { nullable: false })
  @JoinColumn({ name: 'owner_id' })
  owner?: User;
  @RelationId((room: Room) => room.owner, 'owner_id')
  owner_id?: string;

  @ManyToMany(_ => User, user => user.admin_rooms)
  @JoinTable({
    name: 'room_admins',
    joinColumn: { name: 'room_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  admins?: User[];
  @RelationId((room: Room) => room.admins)
  admin_ids?: string[];

  @ManyToMany(_ => User, user => user.rooms)
  @JoinTable({
    name: 'room_members',
    joinColumn: { name: 'room_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  members?: User[];
  @RelationId((room: Room) => room.members)
  member_ids?: string[];

  constructor(id: string) {
    this.id = id;
  }
}
