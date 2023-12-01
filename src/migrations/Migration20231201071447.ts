import { Migration } from '@mikro-orm/migrations';

export class Migration20231201071447 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" bigserial primary key, "email" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "avatar" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null);',
    );
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");',
    );
    this.addSql('create index "users_email_index" on "users" ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }
}
