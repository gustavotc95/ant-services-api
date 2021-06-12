import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Prestador from './Prestador';

@Entity('avaliacoes')
export default class Avaliacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  titulo: string;

  @Column()
  star_rating: string;

  @Column()
  comentario: string;

  @ManyToOne(() => Prestador, prestador => prestador.avaliacoes)
  @JoinColumn({name: 'prestador_id'})
  prestador: Prestador;
}
