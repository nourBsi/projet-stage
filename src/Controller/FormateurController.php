<?php
namespace App\Controller;

use App\Entity\Formateur;
use App\Service\FormateurService as ServiceFormateurService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

class FormateurController extends AbstractController {
   private $formateurService;
   private $serializer;

   public function __construct(ServiceFormateurService $formateurService,SerializerInterface $serializer)
    {
        $this->formateurService = $formateurService;
        $this->serializer=$serializer;
    }
 
    /**
     * @Route("/api/formateurs", methods={"GET"})
     */
    public function getAll() : JsonResponse
    {
        $formateurs = $this->formateurService->getAll();
        return $this->json($formateurs);
    }

     /**
     * @Route("/api/formateur/{id}", methods={"GET"})
     */
    public function getFormateurById($id) : JsonResponse
    {
        $formateur = $this->formateurService->getFormateur($id);
        $groups = ['formateur', 'cycles','cecycle']; 
        $serializedFormateur = $this->serializer->serialize($formateur, 'json', ['groups' => $groups]);
        return new JsonResponse($serializedFormateur, 200, [],true);
    }

     /**
     * @Route("/api/addformateur", methods={"POST"})
     */
    public function addFormateur(Request $request) : JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $formateur = new Formateur();
        $formateur->setNomprenom($data['nomprenom']);
        $formateur->setSpecialite($data['specialite']);
        $formateur->setDirection($data['direction']);
        $formateur->setEntreprise($data['entreprise']);
       
        $this->formateurService->addFormateur($formateur);
        $groups = ['formateur', 'cycles','cecycle']; 
        $serializedFormateur = $this->serializer->serialize($formateur, 'json', ['groups' => $groups]);
        return new JsonResponse($serializedFormateur, 200, [],true);

    }

     /**
     * @Route("/api/deleteformateur/{id}", methods={"DELETE"})
     */
    public function deleteFormateur($id) : JsonResponse
    {
        $formateur = $this->formateurService->getFormateur($id);

        if (!$formateur) {
            return $this->json(['error' => 'Formateur not found'], 404);
        }

        $this->formateurService->deleteFormateur($formateur);

        return new JsonResponse(null, 204);
    }

     /**
     * @Route("/api/updateformateur", methods={"PUT"})
     */
    public function updateFormateur(Request $request) : JsonResponse
    {
        $data=json_decode($request->getContent(),true);
        $formateur = $this->formateurService->getFormateur($data['id']);

        if (!$formateur) {
            return $this->json(['error' => 'Formateur not found'], 404);
        }
     
        $formateur->setNomprenom($data['nomprenom']);
        $formateur->setSpecialite($data['specialite']);
        $formateur->setDirection($data['direction']);
        $formateur->setEntreprise($data['entreprise']);

        $this->formateurService->updateFormateur($formateur);

        $groups = ['formateur', 'cycles','cecycle']; 
        $serializedFormateur = $this->serializer->serialize($formateur, 'json', ['groups' => $groups]);
        return new JsonResponse($serializedFormateur, 200, [],true);
    }
}
?>