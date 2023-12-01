import { Migration } from '@mikro-orm/migrations';

export class Migration20231201053441 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" bigserial primary key, "email" varchar(255) not null, "phone_number" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");',
    );
    this.addSql(
      'alter table "users" add constraint "users_phone_number_unique" unique ("phone_number");',
    );
    this.addSql(
      'create index "users_phone_number_index" on "users" ("phone_number");',
    );
    this.addSql('create index "users_email_index" on "users" ("email");');
  }
}
