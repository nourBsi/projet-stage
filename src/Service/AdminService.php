<?php
namespace App\Service;

use App\Entity\Admin;
use App\Repository\AdminRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\BrowserKit\Request;

class AdminService{
    private $adminRepository;
    private $entityManager;
    
    public function __construct(AdminRepository $adminRepository,EntityManagerInterface $entityManager)
    {
        $this->adminRepository = $adminRepository;
        $this->entityManager=$entityManager;
    }

    public function getAll():array
    {
        $admins = $this->adminRepository->findAll();
        return $admins;
    }
    public function getAdmin($id): ?Admin
    {
        return $this->adminRepository->find($id);
    }

    public function addAdmin(Admin $admin): Admin
    {
        $this->entityManager->persist($admin);
        $this->entityManager->flush();
        return $admin;
    }

    public function deleteAdmin(Admin $admin): void
    {
        $this->entityManager->remove($admin);
        $this->entityManager->flush();
    }

    public function updateAdmin(Admin $admin): Admin
    {
        $this->entityManager->persist($admin);
        $this->entityManager->flush();
        return $admin;
    }

    public function generateConfirmationToken():string{
        return bin2hex(random_bytes(32));
    }
   
   /* private function sendResetPasswordEmail(Admin $admin, string $confirmationToken): void
    {
        $email = (new TemplatedEmail())
            ->from('noreply@example.com')
            ->to($admin->getLogin())
            ->subject('Password Reset')
            ->htmlTemplate('emails/reset_password.html.twig')
            ->context([
                'user' => $admin,
                'confirmationToken' => $confirmationToken,
            ]);
    
        $this->mailer->send($email);
    }*/


}
?>