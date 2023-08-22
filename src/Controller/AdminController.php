<?php
namespace App\Controller;

use App\Entity\Admin;
use App\Service\AdminService as ServiceAdminService;
use App\Service\EmailService;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mailer\MailerInterface;

class AdminController extends AbstractController {
   private $adminService;
   private $entityManager;
   private $emailService;


   public function __construct(ServiceAdminService $adminService,EntityManagerInterface $entityManager,EmailService $emailService)
    {
        $this->adminService = $adminService;
        $this->entityManager=$entityManager;
        $this->emailService=$emailService;

    }
 
    /**
     * @Route("/api/admins", methods={"GET"})
     */
    public function getAll() : JsonResponse
    {
        $admins = $this->adminService->getAll();
        return $this->json($admins);
    }

     /**
     * @Route("/api/admin/{id}", methods={"GET"})
     */
    public function getAdminById($id) : JsonResponse
    {
        $admin = $this->adminService->getAdmin($id);
        return new JsonResponse($admin, 200, [],true);
    }

     /**
     * @Route("/api/addadmin", methods={"POST"})
     */
    public function addAdmin(Request $request) : JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $admin = new Admin();
        $admin->setLogin($data['login']);
        $admin->setPassword($data['password']);
       
        $this->adminService->addAdmin($admin);
               return new JsonResponse($admin, 200, [],true);

    }

    /**
 * @Route("/api/login", methods={"POST"})
 */
public function checkAdmin(Request $request): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    // Check if both 'password' and 'mail' fields are present in the request data
    if (!isset($data['password']) || !isset($data['login'])) {
        return new JsonResponse(['error' => 'Invalid request data'], 400);
    }

    $admins = $this->adminService->getAll();
    foreach ($admins as $admin) {
        if ($admin->getPassword() === $data['password'] && $admin->getLogin() === $data['login']) {
            // Do not return the entire $admin object in the response for security reasons
            // Instead, return only the necessary information
            $responseData = [
                'id' => $admin->getId(),
                'login' => $admin->getLogin(),
                // Add other necessary fields here
            ];

            return new JsonResponse($responseData, 200);
        }
    }

    return new JsonResponse(['error' => 'Invalid credentials'], 401);
}

     /**
     * @Route("/api/deleteadmin/{id}", methods={"DELETE"})
     */
    public function deleteAdmin($id) : JsonResponse
    {
        $admin = $this->adminService->getAdmin($id);

        if (!$admin) {
            return $this->json(['error' => 'Admin not found'], 404);
        }

        $this->adminService->deleteAdmin($admin);

        return new JsonResponse(null, 204);
    }

     /**
     * @Route("/api/updateadmin", methods={"PUT"})
     */
    public function updateAdmin(Request $request) : JsonResponse
    {
        $data=json_decode($request->getContent(),true);
        $admin = $this->adminService->getAdmin($data['id']);

        if (!$admin) {
            return $this->json(['error' => 'Admin not found'], 404);
        }
        $admin->setLogin($data['login']);
        $admin->setPassword($data['password']);
      

        $this->adminService->updateAdmin($admin);
        $adminData=[
            "id"=>$admin->getId(),
            "login"=>$admin->getLogin(),
            "resetPasswordUniqid"=>$admin->getResetPasswordUniqid(),
            "resetPasswordUntil"=>$admin->getResetPasswordUntil()

        ];
        return new JsonResponse($adminData,200);
    }

      /**
     * @Route("/api/resetRequest", methods={"PUT"})
     */

     public function resetPasswordRequest(Request $request):JsonResponse{

        $inputs=json_decode($request->getContent(),true);
        if(!isset($inputs['email'])){
            return new JsonResponse(null,400);
        }
        $user=$this->entityManager->getRepository(Admin::class)->findOneBy(['login'=>$inputs['email']]);
        if(!$user){
            return new JsonResponse(null,200) ;
        }
        $confirmationToken=$this->adminService->generateConfirmationToken();
        $user->setResetPasswordUniqid($confirmationToken);
        $tomorrowDate = new DateTime(date('Y-m-d H:i:s', time() + 86400));
        $user->setResetPasswordUntil($tomorrowDate);
        $this->entityManager->flush();
        $adminData=[
            "id"=>$user->getId(),
            "login"=>$user->getLogin(),
            "resetPasswordUniqid"=>$user->getResetPasswordUniqid(),
            "resetPasswordUntil"=>$user->getResetPasswordUntil()

        ];
        $to = $adminData['login'];
        $subject = 'Changement de mot de passe';
        $message = 'Pour changer votre mot de passe ustiliser ce lien :';
        $link = "http://localhost:4200/resetPassword;token=" . $adminData['resetPasswordUniqid'] . ";dateexp=" . $adminData['resetPasswordUntil']->format('Y-m-d H:i:s');

        $this->emailService->sendEmail($to, $subject, $message,$link);
      //  $user=$this->entityManager->getRepository(Admin::class)->findOneBy(['login'=>$inputs['email']]);
        return new JsonResponse($adminData, 200) ;

    }
      /**
     * @Route("/api/checkReset", methods={"PUT"})
     */
    public function checkReset(Request $request) : JsonResponse {
        $inputs=json_decode($request->getContent(),true);
        if(!isset($inputs['token'])){
            return new JsonResponse(null,400);
        }
        if(!isset($inputs['dateexp'])){
            return new JsonResponse(null,400);
        }
//$datearr=getdate($inputs['dateexp']);
//$date=strtotime($inputs['dateexp']);

$dateTime = \DateTime::createFromFormat('Y-m-d H:i:s', $inputs['dateexp']);
$date = new \DateTime();
$date=$date->format('Y-m-d H:i:s');
    if($date > $dateTime){
        $responseData = [
            'state' => false
            
        ];
        return new JsonResponse($responseData,200);

        };
        $user = $this->entityManager->getRepository(Admin::class)->findOneBy([
            'resetPasswordUniqid' => $inputs['token'],
            'resetPasswordUntil' => $dateTime
        ]);
        if(!isset($user)){
            $responseData = [
                'state' => false
            ];
            
            return new JsonResponse($responseData,200);

        }
        $responseData = [
            'id'=>$user->getId(),
            'email'=>$user->getLogin(),
            'state' => true
        ];
        
        return new JsonResponse($responseData,200);

    }
}
?>