<?php

	class Admin_post extends MX_CONTROLLER{
		function index(){
			$this->load->view('detail_view');
		}

		function add_detail(){

			$this->load->model('add_post');

			$this->load->library('form_validation');
			$this->form_validation->set_rules($this->add_post->config);

			if($this->form_validation->run()==TRUE){
				$this->add_post->add_detail();
			}
		}

		function get_detail(){

			$this->load->model('get_posts');
			$this->get_posts->get_detail();
		}

		
	}

?>