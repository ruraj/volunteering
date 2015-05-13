<?php

class Register extends MX_Controller
{
    function register_user()
    {
        $this->load->model('Register_model');

        if ($this->Register_model->add_user()) {
            echo 'Added';
            die();
            // Successfully added user.
        } else {
            http_response_code(500);
        }
    }
}

?>