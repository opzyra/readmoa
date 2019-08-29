import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";

@Entity("report_parsing")
export default class ReportParsing {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({ length: 255 })
  platform!: string;

  @Column("int")
  row!: number;

  @Column({ length: 8 })
  standard_date!: string;

  @Column("timestamp")
  @CreateDateColumn()
  completed_at!: Date;
}
