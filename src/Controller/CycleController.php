<?php
namespace App\Controller;

use App\Entity\Cycle;
use App\Service\CycleService as ServiceCycleService;
use App\Service\FormateurService;
use App\Service\ParticipantService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

class CycleController extends AbstractController {
   private $cycleService;
   private $serializer;
   private $formateurService;
   private $participantService;

   public function __construct(ServiceCycleService $cycleService,SerializerInterface $serializer,ParticipantService $participantService,FormateurService $formateurService)
    {
        $this->cycleService = $cycleService;
        $this->serializer=$serializer;
        $this->formateurService=$formateurService;
        $this->participantService=$participantService;

    }
 
    /**
     * @Route("/cycles", methods={"GET"})
     */
    public function getAll() : JsonResponse
    {
        $cycles = $this->cycleService->getAll();
        return $this->json($cycles);
    }

     /**
     * @Route("/cycle/{id}", methods={"GET"})
     */
    public function getCycleById($id) : JsonResponse
    {
        $cycle = $this->cycleService->getCycle($id);
        $groups = ['formateurs', 'formateur','participant','participants','cecycle']; 
        $serializedCycle = $this->serializer->serialize($cycle, 'json', ['groups' => $groups]);
        return new JsonResponse($serializedCycle, 200, [],true);
    }

     /**
     * @Route("/addcycle", methods={"POST"})
     */
    public function addCycle(Request $request) : JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $cycle = new Cycle();
        $cycle->setnumact($data['numact']);
        $cycle->settheme($data['theme']);
        $dateDebConverted = \DateTime::createFromFormat('Y-m-d',$data['datedeb']); 
        $dateFinConverted = \DateTime::createFromFormat('Y-m-d',$data['datefin']); 
        $cycle->setdatedeb($dateDebConverted);
        $cycle->setdatefin($dateFinConverted);
        $cycle->setnumsalle($data['numsalle']);

       
        $this->cycleService->addCycle($cycle);
        $groups = ['formateurs', 'formateur','participant','participants','cecycle']; 
        $serializedCycle = $this->serializer->serialize($cycle, 'json', ['groups' => $groups]);
        return new JsonResponse($serializedCycle, 200, [],true);

    }

     /**
     * @Route("/deletecycle/{id}", methods={"DELETE"})
     */
    public function deleteCycle($id) : JsonResponse
    {
        $cycle = $this->cycleService->getCycle($id);

        if (!$cycle) {
            return $this->json(['error' => 'Cycle not found'], 404);
        }

        $this->cycleService->deleteCycle($cycle);

        return new JsonResponse(null, 204);
    }

     /**
     * @Route("/updatecycle", methods={"PUT"})
     */
    public function updateCycle(Request $request) : JsonResponse
    {
        $data=json_decode($request->getContent(),true);
        $cycle = $this->cycleService->getCycle($data['id']);

        if (!$cycle) {
            return $this->json(['error' => 'Cycle not found'], 404);
        }
        $cycle->setnumact($data['numact']);
        $cycle->settheme($data['theme']);
        $dateDebConverted = \DateTime::createFromFormat('Y-m-d',$data['datedeb']); 
        $dateFinConverted = \DateTime::createFromFormat('Y-m-d',$data['datefin']); 
        $cycle->setdatedeb($dateDebConverted);
        $cycle->setdatefin($dateFinConverted);
        $cycle->setnumsalle($data['numsalle']);

        $this->cycleService->updateCycle($cycle);

        $groups = ['formateurs', 'formateur','participant','participants','cecycle']; 
        $serializedCycle = $this->serializer->serialize($cycle, 'json', ['groups' => $groups]);
        return new JsonResponse($serializedCycle, 200, [],true);
    }

     /**
     * @Route("/addFormateurToCycle", methods={"PUT"})
     */

public function addFormateurToCycle(Request $request):JsonResponse
{
    $data=json_decode($request->getContent(),true);
    $cycle = $this->cycleService->getCycle($data['id']);
    $formateur=$this->formateurService->getFormateur($data['formateur']);
    $this->cycleService->addFormateurToCycle($formateur,$cycle);
    $groups = ['formateurs', 'formateur','participant','participants','cecycle']; 
    $serializedCycle = $this->serializer->serialize($cycle, 'json', ['groups' => $groups]);
    return new JsonResponse($serializedCycle, 200, [],true);
}
   /**
     * @Route("/addParticipantToCycle", methods={"PUT"})
     */


public function addParticipantToCycle(Request $request):JsonResponse
{
    $data=json_decode($request->getContent(),true);
    $cycle = $this->cycleService->getCycle($data['id']);
    $participant=$this->participantService->getParticipant($data['participant']);
    $this->cycleService->addParticipantToCycle($participant,$cycle);
    $groups = ['formateurs', 'formateur','participant','participants','cecycle']; 
    $serializedCycle = $this->serializer->serialize($cycle, 'json', ['groups' => $groups]);
    return new JsonResponse($serializedCycle, 200, [],true);
}

 /**
     * @Route("/removeParticipantfromCycle", methods={"PUT"})
     */
    public function removeParticipant(Request $request):JsonResponse
    {
        $data=json_decode($request->getContent(),true);
        $cycle = $this->cycleService->getCycle($data['id']);
        $participant=$this->participantService->getParticipant($data['participant']);
        $this->cycleService->removeParticipant($participant,$cycle);
        $groups = ['formateurs', 'formateur','participant','participants','cecycle']; 
        $serializedCycle = $this->serializer->serialize($cycle, 'json', ['groups' => $groups]);
        return new JsonResponse($serializedCycle, 200, [],true);
    }
/**
     * @Route("/removeFormateurfromCycle", methods={"PUT"})
     */
    public function removeFormateur(Request $request):JsonResponse
    {
        $data=json_decode($request->getContent(),true);
        $cycle = $this->cycleService->getCycle($data['id']);
        $formateur=$this->formateurService->getFormateur($data['formateur']);
        $this->cycleService->removeFormateur($formateur,$cycle);
        $groups = ['formateurs', 'formateur','participant','participants','cecycle']; 
        $serializedCycle = $this->serializer->serialize($cycle, 'json', ['groups' => $groups]);
        return new JsonResponse($serializedCycle, 200, [],true);
    }
}
?>