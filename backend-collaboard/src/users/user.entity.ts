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

  /** Tidak ikut ter-select secara default agar hash tidak bocor lewat query biasa. */
  @Column({ select: false })
  passwordHash!: string;

  /** Terisi setelah pengguna memverifikasi email; login ditolak sebelum itu. */
  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt!: Date | null;

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
