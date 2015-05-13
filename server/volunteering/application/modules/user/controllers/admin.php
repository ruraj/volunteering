<?php

class Admin extends CI_Controller
{
    function index()
    {
        $this->load->view('login_view');
    }

    function login_user()
    {
        $this->load->model('Login_model');

        $check = $this->Login_model->authenticate_user();
        if ($check[0]) {
            $data = array(
                'is_logged_in' => TRUE,
                'username' => $check[0]->email,
                'user_id' => $check[0]->id
            );
            $this->session->set_userdata($data);

            return json_encode($check[0]);
            // User logged in. Now show the admin view page.

        } else {
            http_response_code(401);
            echo 'Your are not verified';
        }
    }

    function logout_user()
    {
        $this->session->unset_userdata('is_logged_in');
        $this->session->unset_userdata('username');
        $this->session->unset_userdata('user_id');
    }
}

?>