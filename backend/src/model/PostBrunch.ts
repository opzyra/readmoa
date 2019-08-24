import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("post_brunch")
export default class PostOkky {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({ length: 255 })
  name!: String;

  @Column({ length: 255 })
  title!: String;

  @Column({ length: 400 })
  description!: String;

  @Column({ length: 255 })
  url!: String;

  @Column("datetime")
  writed_at!: Date;
}
