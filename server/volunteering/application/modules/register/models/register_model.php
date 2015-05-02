<?php

	class Register_model extends CI_MODEL{

		function __construct(){
			parent:: __construct();
		}

		public $this->config=array(
			array('field'=>'first_name', 'label'=>'First name', 'rules'=>'required'),
			array('field'=>'last_name', 'label'=>'Last name', 'rules'=>'required'),
			array('field'=>'contact', 'label'=>'Contact number', 'rules'=>'required'),
			array('field'=>'email', 'label'=>'Email address', 'rules'=>'required|valid_email|is_unique[users.email]'),
			array('field'=>'password', 'label'=>'Password', 'rules'=>'required|matches[conf_password]'),
			array('field'=>'conf_password', 'label'=>'Confirmation password', 'rules'=>'required')
			);


		function add_user(){
			$data=array(
				'first_name' => $this->input->post('first_name'),
				'last_name' => $this->input->post('last_name'),
				'contact' => $this->input->post('contact'),
				'email' => $this->input->post('email'),
				'password' => md5($this->input->post('password'))
				);
			if($this->db->insert('users',$data)){
				return true;
			}else{
				return false;
			}
		}
	}

?>