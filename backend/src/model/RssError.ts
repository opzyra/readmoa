import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";

@Entity("rss_error")
export default class RssError {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({ length: 128, unique: true })
  rss!: string;

  @Column("timestamp")
  @CreateDateColumn()
  careated_at!: Date;
}
