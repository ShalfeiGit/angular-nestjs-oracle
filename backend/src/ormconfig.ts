import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'dbUser',
  password: 'dbPassword',
  database: 'dbAngular',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.ts'],
};

export const dataSource = new DataSource(dataSourceOptions);
