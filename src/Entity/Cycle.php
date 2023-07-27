<?php

namespace App\Entity;

use App\Entity\Formateur;
use App\Entity\Participant;
use App\Repository\CycleRepository;
use Doctrine\Common\Collections\Collection;

use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
 * @ORM\Entity(repositoryClass=CycleRepository::class)
 */
class Cycle
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     * @Groups({"cecycle"})
     */
    private $id;
    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"cecycle"})
     */
    private $numact;
/**
     * @ORM\Column(type="string", length=255)
     * @Groups({"cecycle"})
     */
    private $theme;
    /**
     * @ORM\Column(type="date")
     * @Groups({"cecycle"})
     */
    private $datedeb;
    /**
     * @ORM\Column(type="date")
     * @Groups({"cecycle"})
     */
    private $datefin;
    /**
     * @ORM\Column(type="integer")
     * @Groups({"cecycle"})
     */
    private $numsalle;
  /**
 * @ORM\ManyToMany(targetEntity="Formateur", inversedBy="cycles")
 * @ORM\JoinTable(name="formateur_cycle",
 *      joinColumns={@ORM\JoinColumn(name="cycle_id", referencedColumnName="id")},
 *      inverseJoinColumns={@ORM\JoinColumn(name="formateur_id", referencedColumnName="id")}
 * )
 * @Groups({"formateurs"})
 * @MaxDepth(1)
 */

    private $formateurs;
/**
 * @ORM\ManyToMany(targetEntity="Participant", inversedBy="mescycles")
 * @ORM\JoinTable(name="participant_cycle",
 *      joinColumns={@ORM\JoinColumn(name="cycle_id", referencedColumnName="id")},
 *      inverseJoinColumns={@ORM\JoinColumn(name="participant_id", referencedColumnName="id")}
 * )
 * @Groups({"participants"})
 *  @MaxDepth(1)
 */
private $lesparticipants;


public function __construct()
{
    $this->formateurs=new ArrayCollection();
    $this->lesparticipants=new ArrayCollection();
}

public function getnumact(): ?string
{
return $this->numact;
}
public function setnumact(string $numact): self
{
    $this->numact = $numact;
    return $this;
}


public function gettheme(): ?string
{
return $this->theme;
}
public function settheme(string $theme): self
{
    $this->theme = $theme;
    return $this;
}
public function getdatedeb(): ?DateTime
{
return $this->datedeb;
}
public function setdatedeb(DateTime $datedeb): self
{
    $this->datedeb = $datedeb;
    return $this;
}
public function getdatefin(): ?DateTime
{
return $this->datefin;
}
public function setdatefin(DateTime $datefin): self
{
    $this->datefin = $datefin;
    return $this;
}

public function getnumsalle(): ?int
{
return $this->numsalle;
}
public function setnumsalle(int $numsalle): self
{
    $this->numsalle = $numsalle;
    return $this;
}
    /**
 * @return Collection|Formateur[]
 */
 public function getFormateurs(): Collection
 {
 return $this->formateurs;
 }
 public function addFormateur(Formateur $formateur)
 {
    if($this->formateurs->count()<3){
        $this->formateurs[]=$formateur;
    }

 }
    public function getId(): ?int
    {
        return $this->id;
    }
      /**
 * @return Collection|Participant[]
 */
 public function getlesparticipants():Collection
 {
 return $this->lesparticipants;
 }
 public function addParticipant(Participant $participant)
 {
   
        $this->lesparticipants[]=$participant;

 }
public function removeFormateur(Formateur $formateur ): void
{
    $this->formateurs->removeElement($formateur);
}

public function removeParticipant(Participant $participant ): void
{
    $this->lesparticipants->removeElement($participant);
}

}
