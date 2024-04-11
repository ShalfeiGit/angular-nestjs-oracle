import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1712710533851 implements MigrationInterface {
    name = 'Init1712710533851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('male', 'female', 'others')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(200) NOT NULL, "email" character varying(200) NOT NULL, "bio" character varying(1000), "age" integer, "gender" "public"."user_gender_enum" NOT NULL DEFAULT 'others', "pass" character varying, "createdAt" bigint, "updatedAt" bigint, "refresh_token" character varying, "avatarUrl" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."article_tag_enum" AS ENUM('frontend', 'backend', 'marketing', 'graphic', 'devops', 'video', 'tools', 'mobile', 'gamedev', 'cms', 'blockchain', 'Quality assurance', 'security')`);
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "title" character varying(200) NOT NULL, "content" character varying(16000) NOT NULL, "tag" "public"."article_tag_enum" NOT NULL, "createdAt" bigint, "updatedAt" bigint, "likes" integer NOT NULL DEFAULT '0', "userId" integer, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_liked_article_article" ("userId" integer NOT NULL, "articleId" integer NOT NULL, CONSTRAINT "PK_242e9374d64d592b0503087e484" PRIMARY KEY ("userId", "articleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d2c2a527fccee23f76097350ad" ON "user_liked_article_article" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_82a4a9215b29956ed7a1aa5c6e" ON "user_liked_article_article" ("articleId") `);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_636f17dadfea1ffb4a412296a28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_liked_article_article" ADD CONSTRAINT "FK_d2c2a527fccee23f76097350ad2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_liked_article_article" ADD CONSTRAINT "FK_82a4a9215b29956ed7a1aa5c6e5" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_liked_article_article" DROP CONSTRAINT "FK_82a4a9215b29956ed7a1aa5c6e5"`);
        await queryRunner.query(`ALTER TABLE "user_liked_article_article" DROP CONSTRAINT "FK_d2c2a527fccee23f76097350ad2"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_636f17dadfea1ffb4a412296a28"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_82a4a9215b29956ed7a1aa5c6e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2c2a527fccee23f76097350ad"`);
        await queryRunner.query(`DROP TABLE "user_liked_article_article"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TYPE "public"."article_tag_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
    }

}
