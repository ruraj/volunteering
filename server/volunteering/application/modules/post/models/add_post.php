<?php

class Add_post extends CI_MODEL
{

    function __construct()
    {
        parent:: __construct();
    }

    function add_post()
    {
        $date = date('Y-m-d H:i:s');
        $str = file_get_contents("php://input");
        $json = json_decode($str);

        $data1 = array(
            'user_id' => $this->session->userdata('user_id'),
            'title' => $json->{'title'},
            'description' => $json->{'description'},
            'created_at' => $date,
            'deadline' => $json->{'deadline'}
        );
        $postInserted = $this->db->insert('post', $data1);
        if (!$postInserted) {
            return false;
        };

        $post_id = $this->db->insert_id();

        $category = $json->{'category'};
        // print_r($category);
        foreach ($category as $cat) {
            $data3 = array('post_id' => $post_id);
            // print_r($data3);die();
            if ($cat) {
                $new_array = array('category_id' => $cat);
                $data3 = array_merge($data3, $new_array);
            }
            print_r($data3);
            $catInserted = $this->db->insert('post_category', $data3);
            if (!$catInserted) {
                return false;
            }
        }


        $data2 = array(
            'address' => $json->{'address'},
            'city' => $json->{'city'}
        );
        $addrInserted = $this->db->insert('location', $data2);
        if (!$addrInserted) {
            return false;
        }

        $location_id = $this->db->insert_id();

        $data4 = array(
            'post_id' => $post_id,
            'location_id' => $location_id
        );
        $locationInserted = $this->db->insert('post_location', $data4);

        if (!$locationInserted) {
            return false;
        }

        return true;
    }
}


?>