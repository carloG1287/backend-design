import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password_digest: string;

  @Column({ length: 500 })
  security_question: string;

  @Column({ length: 500 })
  security_answer: string;

  @CreateDateColumn({ generated: true })
  created_at: Date;

  @UpdateDateColumn({ generated: true })
  updated_at: Date;
}
