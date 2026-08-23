import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from '../boards/board.entity';
import { User } from '../users/user.entity';

export enum TaskColumn {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

type BoardWithTasks = Board & { tasks?: Task[] };
type UserWithAssignedTasks = User & { assignedTasks?: Task[] };

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'board_id' })
  boardId!: string;

  @ManyToOne(() => Board, (board: BoardWithTasks) => board.tasks ?? [], {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'board_id' })
  board!: Board;

  @Column({
    name: 'column_name',
    type: 'enum',
    enum: TaskColumn,
    default: TaskColumn.TODO,
  })
  columnName!: TaskColumn;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'assignee_id', nullable: true })
  assigneeId!: string | null;

  @ManyToOne(
    () => User,
    (user: UserWithAssignedTasks) => user.assignedTasks ?? [],
    {
      onDelete: 'SET NULL',
      nullable: true,
    },
  )
  @JoinColumn({ name: 'assignee_id' })
  assignee!: User | null;

  @Column({ type: 'enum', enum: TaskPriority, nullable: true })
  priority!: TaskPriority | null;

  @Column({ name: 'due_date', type: 'timestamp', nullable: true })
  dueDate!: Date | null;

  // Determines drag-and-drop position within a column.
  @Column({ type: 'int' })
  order!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
