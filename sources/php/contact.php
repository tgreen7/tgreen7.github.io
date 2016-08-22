<?php

date_default_timezone_set('Etc/UTC');
require 'PHPMailer-master/PHPMailerAutoload.php';

// show errors
ini_set('display_errors', '1');
ini_set('error_reporting', E_ALL);

/*
* Contact Form Class
*/


header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$admin_email = 'greenmachine777@gmail.com'; // Your Email
$message_min_length = 5; // Min Message Length


// $phpmail->Username = 'blipblopchopslap@gmail.com'
// $phpmail->Password = 'indytaoh';


class Contact_Form{
	function __construct($details, $email_admin, $message_min_length){
		
		$this->name = stripslashes($details['name']);
		$this->email = trim($details['email']);
		$this->subject = 'Contact from Your Website'; // Subject 
		$this->message = stripslashes($details['message']);
	
		$this->email_admin = $email_admin;
		$this->message_min_length = $message_min_length;
		
		$this->response_status = 1;
		$this->response_html = '';

		$this->phpmail = new PHPMailer;
		$this->phpmail->isSMTP();
		$this->phpmail->CharSet = 'UTF-8';

		$this->phpmail->Host = 'smtp.gmail.com';
		$this->phpmail->SMTPDebug = 0;
		$this->phpmail->SMTPAuth = true;
		$this->phpmail->Port = 587;
		$this->phpmail->SMTPSecure = 'tls';
		
		$this->phpmail->setFrom(trim($details['email']), 'Mailer');
		$this->phpmail->Username = 'blipblopchopslap@gmail.com';
		$this->phpmail->Password = 'indytaoh';
		$this->phpmail->Subject = 'Contact from Your Website';
		$this->phpmail->Body = stripslashes($details['message']);
		$this->phpmail->AltBody = stripslashes($details['message']);
		$this->phpmail->addAddress('greenmachine777@gmail.com', 'Taoh Green');
	}


	private function validateEmail(){
		$regex = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i';
	
		if($this->email == '') { 
			return false;
		} else {
			$string = preg_replace($regex, '', $this->email);
		}
	
		return empty($string) ? true : false;
	}


	private function validateFields(){
		// Check name
		if(!$this->name)
		{
			$this->response_html .= '<p>Please enter your name</p>';
			$this->response_status = 0;
		}

		// Check email
		if(!$this->email)
		{
			$this->response_html .= '<p>Please enter an e-mail address</p>';
			$this->response_status = 0;
		}
		
		// Check valid email
		if($this->email && !$this->validateEmail())
		{
			$this->response_html .= '<p>Please enter a valid e-mail address</p>';
			$this->response_status = 0;
		}
		
		// Check message length
		if(!$this->message || strlen($this->message) < $this->message_min_length)
		{
			$this->response_html .= '<p>Please enter your message. It should have at least '.$this->message_min_length.' characters</p>';
			$this->response_status = 0;
		}
	}


	private function sendEmail(){
		if(!$this->phpmail->send()) {
			$this->response_html = '<p>' . $this->phpmail->ErrorInfo . '</p>';
		} else {
		    $this->response_status = 1;
		    $this->response_html = '<p>Thank You!</p>';
		}
	}


	function sendRequest(){
		$this->validateFields();
		if($this->response_status) {
			$this->sendEmail();
		}

		$response = array();
		$response['status'] = $this->response_status;	
		$response['html'] = $this->response_html;
		
		echo json_encode($response);
	}
}


$contact_form = new Contact_Form($_POST, $admin_email, $message_min_length);
$contact_form->sendRequest();

?>