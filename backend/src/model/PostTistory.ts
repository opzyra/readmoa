import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("post_tistory")
export default class PostTistory {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ length: 255 })
  title!: string;

  @Column({ type: 'mediumtext' })
  description!: string;

  @Column({ length: 500 })
  url!: string;

  @Column("timestamp")
  writed_at!: Date;
}
