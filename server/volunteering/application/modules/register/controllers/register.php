<?php

	class Register extends MX_Controller{

		function index(){
			$this->load->view('register_view');
		}
		function register_user(){
			$this->load->model('register_model');

			$this->load->library('form_validation');
			$this->form_validation->set_rules($this->register_model->config);
			
			if($this->form_validation->run()==TRUE){

				if($this->register_model->add_user()){
					// Successfully added user.
				}
			}
		}
	}

?>