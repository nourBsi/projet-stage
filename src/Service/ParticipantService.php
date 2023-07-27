<?php

namespace App\Service;

use App\Entity\Participant;
use App\Repository\ParticipantRepository;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\Types\Null_;
use Symfony\Component\Serializer\SerializerInterface;
use Psr\Log\LoggerInterface;

class ParticipantService
{
    private $participantRepository;
    private $entityManager;
    private $serializer;
    private $logger;

    public function __construct(LoggerInterface $logger,SerializerInterface $serializer,ParticipantRepository $participantRepository,EntityManagerInterface $entityManager)
    {
        $this->participantRepository = $participantRepository;
        $this->entityManager=$entityManager;
        $this->serializer=$serializer;
        $this->logger=$logger;
    }

    public function getAll(): array
    {
        $participant=$this->participantRepository->findAll();
        $groups=['participant','mesCycles','cecycle'];
        $serializedParticipant=$this->serializer->serialize($participant,'json',['groups'=>$groups]);
        return json_decode($serializedParticipant,true);
    }

    public function getParticipant($id): Participant|null //Participant|null
    {
        $participant = $this->participantRepository->find($id);
       /*     $groups = ['participant', 'mesCycles', 'cecycle'];
       $serializedParticipant = $this->serializer->serialize($participant, 'json', ['groups' => $groups]);
     //  $deserializedParticipant = $this->serializer->deserialize($serializedParticipant, Participant::class, 'json');
    
      //   Set the related cycles for the participant
      /*  foreach ($participant->getMescycles() as $cycle) {
         $deserializedParticipant->addCycle($cycle);
        }
    */
   
  //$this->logger->info( json_encode($participant));
   // json_encode($participant);
//);
        return $participant;
    }
    

    public function addParticipant(Participant $participant): Participant
    {
        $this->entityManager->persist($participant);
        $this->entityManager->flush();
        return $participant;
    }

    public function deleteParticipant($participant): void
    {
        $this->entityManager->remove($participant);
        $this->entityManager->flush();
    }

    public function updateParticipant(Participant $participant): Participant
    {
        $this->entityManager->persist($participant);
        $this->entityManager->flush();
        return $participant;
    }
}
