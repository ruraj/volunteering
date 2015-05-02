<?php

	class Get_posts extends CI_MODEL{
		function __construct(){
			parent:: __construct();
		}

		function get_detail(){
			$this->db->select('*');
			$this->db->from('users');
			$this->db->join('post','post.user_id=user.id');
			$this->db->join('post_locaton','post_location.post_id=post.id');
			$this->db->join('location','location.id=post_location.location_id');
			$this->db->join('post_category','post_category.post_id=post.id');
			$this->db->join('category','category.id=post_category.category_id');
			$q=$this->db->get();
			if($q->num_rows()>0){
				$arr=$q->result();
				$data['post']=json_encode($arr);
			}

		}
	}

?>