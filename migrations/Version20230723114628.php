<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230723114628 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE formateur_cycle (cycle_id INT NOT NULL, formateur_id INT NOT NULL, INDEX IDX_6D3C67AB5EC1162 (cycle_id), INDEX IDX_6D3C67AB155D8F51 (formateur_id), PRIMARY KEY(cycle_id, formateur_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE formateur_cycle ADD CONSTRAINT FK_6D3C67AB5EC1162 FOREIGN KEY (cycle_id) REFERENCES cycle (id)');
        $this->addSql('ALTER TABLE formateur_cycle ADD CONSTRAINT FK_6D3C67AB155D8F51 FOREIGN KEY (formateur_id) REFERENCES formateur (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE formateur_cycle DROP FOREIGN KEY FK_6D3C67AB5EC1162');
        $this->addSql('ALTER TABLE formateur_cycle DROP FOREIGN KEY FK_6D3C67AB155D8F51');
        $this->addSql('DROP TABLE formateur_cycle');
    }
}
