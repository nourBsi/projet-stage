<?php

namespace App\Entity;

use App\Repository\FormateurRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Cycle;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\PersistentCollection;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
 * @ORM\Entity(repositoryClass=FormateurRepository::class)
 */
class Participant
{
   /**
 * @ORM\Id()
 * @ORM\GeneratedValue(strategy="AUTO")
 * @ORM\Column(type="integer")
 * @Groups({"participant"})
 */
private $id;
/**
* @ORM\Column(type="string", length=255)
* @Groups({"participant"})
*/
private $nomprenom;
/**
* @ORM\Column(type="string", length=255)
* @Groups({"participant"})
*/
private $entreprise;
/**
* @ORM\Column(type="integer")
* @Groups({"participant"})
*/
private $telfix;
/**
* @ORM\Column(type="integer")
* @Groups({"participant"})
*/
private $fax;
/**
* @ORM\Column(type="integer")
* @Groups({"participant"})
*/
private $telport;
/**
* @ORM\Column(type="string", length=255)
* @Groups({"participant"})
*/
private $mail;
/**
 * @ORM\ManyToMany(targetEntity="Cycle", mappedBy="lesparticipants")
 * @ORM\JoinTable(name="participant_cycle")]
 * @Groups({"mesCycles"})
 * @MaxDepth(1)
 */
private $mescycles;
public function __construct()
{
    $this->mescycles = new ArrayCollection();

}
public function getId(): ?int
{
return $this->id;
}

public function getNomprenom(): ?string
{
return $this->nomprenom;
}
public function setNomprenom(string $nom): self
{
$this->nomprenom = $nom;
return $this;
}
public function getEntreprise(): ?string
{
return $this->entreprise;
}
public function setEntreprise(string $entreprise): self
{
$this->entreprise = $entreprise;
return $this;
}
public function getTelfix(): ?int
{
return $this->telfix;
}
public function setTelfix(int $telfix): ?self
{
$this->telfix = $telfix;
return $this;
}
public function getFax(): ?int
{
return $this->fax;
}
public function setFax(int $fax): ?self
{
$this->fax = $fax;
return $this;
}
public function getTelport(): ?int
{
return $this->telport;
}
public function setTelport(int $telport): ?self
{
$this->telport = $telport;
return $this;
}
public function getMail(): ?string
{
return $this->mail;
}
public function setMail(string $mail): ?self
{
$this->mail = $mail;
return $this;
}
public function joinCycle(Cycle $cycle): void
{
   $cycle->addParticipant($this);
   $this->mescycles[]=$cycle;
    
} 
public function getMescycles():Collection
{
    return $this->mescycles;
    

}
public function addCycle(Cycle $cycle): void
{
    $this->mescycles[] = $cycle;
}
}
