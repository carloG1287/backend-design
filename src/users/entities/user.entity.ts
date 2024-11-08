import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity() // Agrega este decorador para que TypeORM la reconozca como entidad
export class User {
  @PrimaryGeneratedColumn() // Usa @PrimaryGeneratedColumn para la clave primaria generada automáticamente
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
