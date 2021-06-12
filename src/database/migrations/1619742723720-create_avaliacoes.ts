import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class createAvaliacoes1619742723720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'avaliacoes',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'titulo',
            type: 'varchar',
          },
          {
            name: 'star_rating',
            type: 'varchar',
          },
          {
            name: 'comentario',
            type: 'varchar',
          },
          {
            name: 'prestador_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'AvaliacaoPrestador',
            columnNames: ['prestador_id'],
            referencedTableName: 'prestadores',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('avaliacoes');
  }
}
