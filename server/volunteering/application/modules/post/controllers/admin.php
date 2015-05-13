<?php

	class Admin extends CI_CONTROLLER{
		function index(){
			$this->load->view('post_view');
		}

		function add_post(){

			if (!$this->session->userdata('is_logged_in')) {
				http_response_code(401);
				return;
			}

			$this->load->model('add_post');

			if ($this->add_post->add_detail()) {
				http_response_code(500);
			}
		}

		function get_posts(){

			$this->load->model('get_posts');
			echo $this->get_posts->get_posts();
		}

		
	}

?>