import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import Room from '../rooms/model';
import User from '../users/model';

@Entity({ name: 'messages' })
export default class Message {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({ nullable: false })
  content?: string;

  @Column({ nullable: false })
  sent_at?: Date;

  @ManyToOne(type => User, user => user.id, { nullable: false, eager: false })
  @JoinColumn({ name: 'author_id' })
  author?: User;

  @RelationId((user: Message) => user.author)
  author_id?: string;

  @ManyToOne(type => Room, room => room.id, { nullable: false, eager: false })
  @JoinColumn({ name: 'room_id' })
  room?: Room;
  @RelationId((message: Message) => message.room)
  room_id?: string;

  constructor(id: string) {
    this.id = id;
  }
}
