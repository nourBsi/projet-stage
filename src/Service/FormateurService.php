<?php

namespace App\Service;

use App\Entity\Formateur;
use App\Repository\FormateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;


class FormateurService
{
    private $formateurRepository;
    private $entityManager;
    private $serializer;

    public function __construct(SerializerInterface $serializer,FormateurRepository $formateurRepository,EntityManagerInterface $entityManager)
    {
        $this->formateurRepository = $formateurRepository;
        $this->entityManager=$entityManager;
        $this->serializer = $serializer;
    }

    public function getAll(): array
    {
        $formateur = $this->formateurRepository->findAll();
        $groups = ['formateur', 'cycles','cecycle']; 
        $serializedFormateur = $this->serializer->serialize($formateur, 'json', ['groups' => $groups]);

        return json_decode($serializedFormateur, true);
    }
    public function getFormateur($id): ?Formateur
    {
        return $this->formateurRepository->find($id);
    }

    public function addFormateur(Formateur $formateur): Formateur
    {
        $this->entityManager->persist($formateur);
        $this->entityManager->flush();
        return $formateur;
    }

    public function deleteFormateur(Formateur $formateur): void
    {
        $this->entityManager->remove($formateur);
        $this->entityManager->flush();
    }

    public function updateFormateur(Formateur $formateur): Formateur
    {
        $this->entityManager->persist($formateur);
        $this->entityManager->flush();
        return $formateur;
    }
}
