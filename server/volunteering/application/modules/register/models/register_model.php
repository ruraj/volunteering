<?php

	class Register_model extends CI_MODEL{

		function __construct(){
			parent:: __construct();
		}

		public $config=array(
			array('field'=>'first_name', 'label'=>'First name', 'rules'=>'required'),
			array('field'=>'last_name', 'label'=>'Last name', 'rules'=>'required'),
			array('field'=>'contact', 'label'=>'Contact number', 'rules'=>'required'),
			array('field'=>'email', 'label'=>'Email address', 'rules'=>'required|valid_email|is_unique[users.email]'),
			array('field'=>'password', 'label'=>'Password', 'rules'=>'required|matches[conf_password]'),
			array('field'=>'conf_password', 'label'=>'Confirmation password', 'rules'=>'required')
			);


		function add_user(){
			$str = file_get_contents("php://input");
			$json = json_decode($str);

			$data=array(
				'first_name' => $json->{'first_name'},
				'last_name' => $json->{'last_name'},
				'contact' => $json->{'contact'},
				'email' => $json->{'email'},
				'password' => md5($json->{'password'})
				);
			if($this->db->insert('users',$data)){
				return  ;
			}else{
				return false;
			}
		}
	}

?>