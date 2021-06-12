import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Prestador from './Prestador';

@Entity('cidades')
export default class Cidade {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  uf: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(() => Prestador, prestador => prestador.cidade, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({name: 'cidade_id'})
  prestador: Prestador;
}
