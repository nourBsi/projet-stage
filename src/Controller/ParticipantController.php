<?php
namespace App\Controller;

use App\Entity\Participant;
use App\Service\ParticipantService as ServiceParticipantService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

class ParticipantController extends AbstractController {
   private $participantService;
   private $serializer;

   public function __construct(ServiceParticipantService $participantService,SerializerInterface $serializer)
    {
        $this->participantService = $participantService;
        $this->serializer=$serializer;
    }
 
    /**
     * @Route("/api/participants", methods={"GET"})
     */
    public function getAll() : JsonResponse
    {
        $participants = $this->participantService->getAll();
        return $this->json($participants);
    }

     /**
     * @Route("/api/participant/{id}", methods={"GET"})
     */
    public function getParticipantById($id) : JsonResponse
    {
        $participant = $this->participantService->getParticipant($id);
        $groups = ['participant', 'mesCycles', 'cecycle'];
        $serializedParticipant = $this->serializer->serialize($participant, 'json', ['groups' => $groups]);
        return new JsonResponse($serializedParticipant, 200, [],true);//$this->json($participant);
    }

     /**
     * @Route("/api/addparticipant", methods={"POST"})
     */
    public function addParticipant(Request $request) : JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $participant = new Participant();
        $participant->setNomprenom($data['nomprenom']);
        $participant->setEntreprise($data['entreprise']);
        $participant->setTelfix($data['telfix']);
        $participant->setFax($data['fax']);
        $participant->setTelport($data['telport']);
        $participant->setMail($data['mail']);
        $this->participantService->addParticipant($participant);
        $groups = ['participant', 'mesCycles', 'cecycle'];
        $serializedParticipant = $this->serializer->serialize($participant, 'json', ['groups' => $groups]);
        return new JsonResponse($serializedParticipant, 200, [],true);

    }

     /**
     * @Route("/api/deleteparticipant/{id}", methods={"DELETE"})
     */
    public function deleteParticipant($id) : JsonResponse
    {
       $participant=$this->participantService->getParticipant($id);
        if (!$participant) {
            return $this->json(['error' => 'Participant not found'], 404);
        }
    //    $part=new Participant();
    
        $this->participantService->deleteParticipant($participant);

        return new JsonResponse(null, 204);
    }

     /**
     * @Route("/api/updateparticipant", methods={"PUT"})
     */
    public function updateParticipant(Request $request) : JsonResponse
    {
        $data=json_decode($request->getContent(),true);
        $participant = $this->participantService->getParticipant($data['id']);

        if (!$participant) {
            return $this->json(['error' => 'Participant not found'], 404);
        }
     
        $participant->setNomprenom($data['nomprenom']);
        $participant->setEntreprise($data['entreprise']);
        $participant->setTelfix($data['telfix']);
        $participant->setFax($data['fax']);
        $participant->setTelport($data['telport']);
        $participant->setMail($data['mail']);
        $this->participantService->updateParticipant($participant);

        $groups = ['participant', 'mesCycles', 'cecycle'];
        $serializedParticipant = $this->serializer->serialize($participant, 'json', ['groups' => $groups]);
        return new JsonResponse($serializedParticipant, 200, [],true);
    }
}
?>