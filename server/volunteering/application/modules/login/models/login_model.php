<?php

	class Login_model extends CI_MODEL{

		function __construct(){
			parent:: __construct();
		}

		public $this->config=array(
			array('field'=>'email','label'=>'Email address','rules'=>'required|valid_email'),
			array('field'=>'password','label'=>'Password','rules'=>'required')
			);

		function authenticate_user(){
			$email=$this->input->post('email');
			$password=md5($this->input->post('password'));

			$this->db->where('email',$email);
			$this->db->where('password',$password);
			$q=$this->db->get('users');
			if($q->num_rows()==1){
				return $q->result();
			}else{
				// Authenticatin failed.
			}
		}
	}



?>