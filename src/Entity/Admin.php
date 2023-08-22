<?php

namespace App\Entity;

use App\Repository\AdminRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AdminRepository::class)
 */
class Admin
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $login;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;
 /**
     * @ORM\Column(type="string", length=255)
     */
    private $resetPasswordUniqid;
    /**
     * @ORM\Column(type="date")
     */
    private $resetPasswordUntil ;
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLogin(): ?string
    {
        return $this->login;
    }

    public function setLogin(string $login): self
    {
        $this->login = $login;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }
    public function setResetPasswordUniqid(string $confirmationToken): void
    {
        $this->resetPasswordUniqid = $confirmationToken;
    }
    public function setResetPasswordUntil(\DateTimeInterface $expirationDate): void
{
    $this->resetPasswordUntil = $expirationDate;
}
public function getResetPasswordUniqid(){
    return $this->resetPasswordUniqid;
}
public function getResetPasswordUntil(){
    return $this->resetPasswordUntil;
}
}
