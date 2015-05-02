<?php

	class Admin_login extends MX_CONTROLLER{
		function index(){
			$this->load->view('login_view');
		}
		function login_user(){
			$this->load->model('login_model');

			$this->load->library('form_validation');
			$this->form_validation->set_rules($this->login_model->config);

			if($this->form_validation->run()==TRUE){
				$check=$this->login_model->authenticate_user();
				if($check){
					$data=array(
						'is_logged_in'=>TRUE,
						'username'=>$this->input->post('email'),
						'user_id'=>$check->id
						);
					$this->session->set_userdata($data);

					// User logged in. Now show the admin view page.

				}
			}

			
		}
	}

?>