<?php

	class Admin_login extends CI_CONTROLLER{
		function index(){
			$this->load->view('Login_view');
		}
		function login_user(){
			$this->load->model('Login_model');

			$this->load->library('form_validation');
			$this->form_validation->set_rules($this->Login_model->config);

			if($this->form_validation->run()==TRUE){
				$check=$this->Login_model->authenticate_user();
				if($check[0]){
					$data=array(
						'is_logged_in'=>TRUE,
						'username'=>$this->input->post('email'),
						'user_id'=>$check[0]->id
						);
					$this->session->set_userdata($data);
			
					echo 'logged in.';
					// User logged in. Now show the admin view page.

				}else{
					http_response_code(401);
					echo 'Your are not verified';
				}
			}else{
				$this->index();
			}

			
		}
		function logout_user(){
			$this->session->unset_userdata('is_logged_in');
			$this->session->unset_userdata('username');
			$this->session->unset_userdata('user_id');

			$this->index();
		}
	}

?>