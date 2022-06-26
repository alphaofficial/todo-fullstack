import { Migration } from '@mikro-orm/migrations';

export class Migration20220626172207 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');

    this.addSql('create table "status" ("id" varchar(255) not null, "title" varchar(255) not null, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null);');
    this.addSql('alter table "status" add constraint "status_pkey" primary key ("id");');

    this.addSql('create table "item" ("id" varchar(255) not null, "title" varchar(255) not null, "status_id" varchar(255) not null, "user_id" varchar(255) null, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null);');
    this.addSql('alter table "item" add constraint "item_pkey" primary key ("id");');

    this.addSql('alter table "item" add constraint "item_status_id_foreign" foreign key ("status_id") references "status" ("id") on update cascade;');
    this.addSql('alter table "item" add constraint "item_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "item" drop constraint "item_user_id_foreign";');

    this.addSql('alter table "item" drop constraint "item_status_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "status" cascade;');

    this.addSql('drop table if exists "item" cascade;');
  }

}
