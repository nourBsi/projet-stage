<?php

namespace App\Entity;

use App\Entity\Cycle;
use App\Repository\FormateurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\PersistentCollection;
use phpDocumentor\Reflection\Types\Integer;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
 * @ORM\Entity(repositoryClass=FormateurRepository::class)
 */
class Formateur
{
   /**
 * @ORM\Id()
 * @ORM\GeneratedValue(strategy="AUTO")
 * @ORM\Column(type="integer")
 * @Groups({"formateur"})
 */
private $id;
/**
* @ORM\Column(type="string", length=255)
* @Groups({"formateur"})
*/
private $nomprenom;
/**
* @ORM\Column(type="string", length=255)
* @Groups({"formateur"})
*/
private $specialite;
/**
* @ORM\Column(type="string", length=255)
* @Groups({"formateur"})
*/
private $direction;
/**
* @ORM\Column(type="string", length=255)
* @Groups({"formateur"})
*/
private $entreprise;
/**
 * @ORM\ManyToMany(targetEntity="Cycle", mappedBy="formateurs")
 * @ORM\JoinTable(name="formateur_cycle")]
 * * @Groups({"cycles"})
 *  @MaxDepth(1)
 */
private $cycles;
public function __construct()
{
    $this->cycles = new ArrayCollection();

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
public function getSpecialite(): ?string
{
return $this->specialite;
}
public function setSpecialite(string $specialite): self
{
$this->specialite = $specialite;
return $this;
}
public function getDirection(): ?string
{
return $this->direction;
}
public function setDirection(string $direction): self
{
$this->direction = $direction;
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
public function joinCycle(Cycle $cycle): void
{
   $cycle->addFormateur($this);
   $this->cycles[]=$cycle;
    
} 
   /**
     * @return Collection|Cycle[]
     */
public function getCycles():Collection
{
    return $this->cycles;
    

}
}
