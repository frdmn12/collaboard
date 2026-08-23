import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Session } from '../auth/session.entity';
import { Board } from '../boards/board.entity';
import { BoardMember } from '../boards/board-member.entity';
import { Task } from '../tasks/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  @OneToMany(() => Board, (board) => board.owner)
  ownedBoards!: Board[];
  @OneToMany(() => BoardMember, (member) => member.user)
  boardMemberships!: BoardMember[];
  @OneToMany(() => Task, (task) => task.assignee)
  assignedTasks!: Task[];
}
