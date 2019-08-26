import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("post_brunch")
export default class PostOkky {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({ length: 255 })
  name!: string;

  @Column({ length: 255 })
  title!: string;

  @Column({ length: 400 })
  description!: string;

  @Column({ length: 500 })
  url!: string;

  @Column("timestamp")
  writed_at!: Date;
}
