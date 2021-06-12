import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import Avaliacao from './Avaliacao';
import Cidade from './Cidade';
import Image from './Image';
import TipoServico from './TipoServico';

@Entity('prestadores')
export default class Prestador {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  resumo: string;

  @Column()
  logradouro: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cep: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  avaliacao_score: number;

  @Column()
  ativo: boolean;

  @OneToMany(() => Image, image => image.prestador, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({name: 'prestador_id'})
  images: Image[];

  @OneToMany(() => Avaliacao, avaliacao => avaliacao.prestador, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({name: 'prestador_id'})
  avaliacoes: Avaliacao[];

  @ManyToOne(() => Cidade, cidade => cidade.prestador)
  @JoinColumn({name: 'cidade_id'})
  cidade: Cidade;

  @ManyToMany(() => TipoServico, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinTable()
  has: TipoServico[];
}
