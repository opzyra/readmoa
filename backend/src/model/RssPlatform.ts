import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique
} from "typeorm";

@Entity("rss_platform")
@Unique(["platform", "rss"])
export default class RssPlatform {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({ length: 50 })
  platform!: string;

  @Column({ length: 128 })
  rss!: string;

  @Column("timestamp")
  @CreateDateColumn()
  careated_at!: Date;
}
