<?php namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class EmailService
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendEmail($to, $subject, $message,$link)
    {
        $email = (new Email())
            ->from('from@example.com')
            ->to($to)
            ->subject($subject)
            ->html(sprintf(
                '<p>%s</p><p><a href="%s">%s</a></p>',
                $message,
                $link,
                'Lien de changement du mot de passe'
            ));

        $this->mailer->send($email);
    }
}
?>