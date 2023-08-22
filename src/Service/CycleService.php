<?php

namespace App\Service;

use App\Entity\Cycle;
use App\Entity\Formateur;
use App\Entity\Participant;
use App\Repository\CycleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;


class CycleService
{
    private $cycleRepository;
    private $entityManager;
    private $serializer;

    public function __construct(SerializerInterface $serializer,CycleRepository $cycleRepository,EntityManagerInterface $entityManager)
    {
        $this->cycleRepository = $cycleRepository;
        $this->entityManager=$entityManager;
        $this->serializer = $serializer;
    }

    public function getAll(): array
    {
        $cycle = $this->cycleRepository->findAll();
        $groups = ['formateurs', 'formateur','participant','participants','cecycle']; 
        $serializedCycle = $this->serializer->serialize($cycle, 'json', ['groups' => $groups]);

        return json_decode($serializedCycle, true);
    }
    public function getCycle($id): ?Cycle
    {
        return $this->cycleRepository->find($id);
    }

    public function addCycle(Cycle $cycle): Cycle
    {
        $this->entityManager->persist($cycle);
        $this->entityManager->flush();
        return $cycle;
    }

    public function deleteCycle(Cycle $cycle): void
    {
        $this->entityManager->remove($cycle);
        $this->entityManager->flush();
    }

    public function updateCycle(Cycle $cycle): Cycle
    {
        $this->entityManager->persist($cycle);
        $this->entityManager->flush();
        return $cycle;
    }
    public function addFormateurToCycle(Formateur $formateur,Cycle $cycle):Cycle
    {
        $cycle->addFormateur($formateur);
        $this->entityManager->persist($cycle);
        $this->entityManager->flush();
        return $cycle;
    }
    public function addParticipantToCycle(Participant $participant,Cycle $cycle):Cycle
    {
        $cycle->addParticipant($participant);
        $this->entityManager->persist($cycle);
        $this->entityManager->flush();
        return $cycle;
    }

    public function removeFormateur(Formateur $formateur,Cycle $cycle):Cycle
    {
        $cycle->removeFormateur($formateur);
        $this->entityManager->persist($cycle);
        $this->entityManager->flush();
        return $cycle;
    }

    public function removeParticipant(Participant $participant,Cycle $cycle):Cycle
    {
        $cycle->removeParticipant($participant);
        $this->entityManager->persist($cycle);
        $this->entityManager->flush();
        return $cycle;
    }
}
