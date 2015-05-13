<?php

	class Login_model extends CI_MODEL{

		function __construct(){
			parent:: __construct();
		}

		public $config=array(
			array('field'=>'email','label'=>'Email address','rules'=>'required|valid_email'),
			array('field'=>'password','label'=>'Password','rules'=>'required')
			);

		function authenticate_user(){
			$str = file_get_contents("php://input");
			$json = json_decode($str);

			$email=$json->{'email'};
			$password=md5($json->{'password'});

			$this->db->where('email',$email);
			$this->db->where('password',$password);
			$q=$this->db->get('users');
			if($q->num_rows()==1){
				return $q->result();
			}else{
				// Authenticatin failed.
				return false;
			}
		}
	}



?>