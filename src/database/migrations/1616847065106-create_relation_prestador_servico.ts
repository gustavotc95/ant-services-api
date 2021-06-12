import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class createRelationPrestadorServico1616847065106
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'prestadores_has_tipos_servicos',
        columns: [
          {
            name: 'prestadoresId',
            type: 'integer',
          },
          {
            name: 'tiposServicosId',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'Prestador',
            columnNames: ['prestadoresId'],
            referencedTableName: 'prestadores',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'TipoServico',
            columnNames: ['tiposServicosId'],
            referencedTableName: 'tipos_servicos',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('prestadores_has_tipos_servicos');
  }
}
