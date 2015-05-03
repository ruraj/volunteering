<?php

	class Register extends MX_Controller{

		function index(){
			// echo base_url();die();
			$this->load->view('Register_view');
		}
		function register_user(){
			$this->load->model('Register_model');
			$this->load->library('form_validation');
			$this->form_validation->set_error_delimiters('<div class="error">', '</div>');
			$this->form_validation->set_rules($this->Register_model->config);
			
			if($this->form_validation->run()==TRUE){

				if($this->Register_model->add_user()){
					echo 'Added';die();
					// Successfully added user.
				}
			}else{
				$this->index();
			}
		}
	}

?>