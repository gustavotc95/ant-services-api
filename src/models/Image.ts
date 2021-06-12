import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Prestador from './Prestador';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Prestador, prestador => prestador.images)
  @JoinColumn({name: 'prestador_id'})
  prestador: Prestador;
}
