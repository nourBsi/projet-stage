<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230723123158 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE participant_cycle (cycle_id INT NOT NULL, participant_id INT NOT NULL, INDEX IDX_7133782A5EC1162 (cycle_id), INDEX IDX_7133782A9D1C3019 (participant_id), PRIMARY KEY(cycle_id, participant_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE participant_cycle ADD CONSTRAINT FK_7133782A5EC1162 FOREIGN KEY (cycle_id) REFERENCES cycle (id)');
        $this->addSql('ALTER TABLE participant_cycle ADD CONSTRAINT FK_7133782A9D1C3019 FOREIGN KEY (participant_id) REFERENCES participant (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE participant_cycle DROP FOREIGN KEY FK_7133782A5EC1162');
        $this->addSql('ALTER TABLE participant_cycle DROP FOREIGN KEY FK_7133782A9D1C3019');
        $this->addSql('DROP TABLE participant_cycle');
    }
}
