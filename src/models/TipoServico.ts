import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('tipos_servicos')
export default class TipoServico {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;
}
