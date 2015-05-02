<?php

class Add_post extends CI_MODEL{

	function __construct(){
		parent:: __construct();
	}

	public $this->config=array(
		array=('field'=>'title','label'=>'Post title','rules'=>'required'),
		array=('field'=>'description','label'=>'Post description','rules'=>'required'),
		array=('field'=>'address','label'=>'Address','rules'=>'required'),
		array=('field'=>'city','label'=>'City','rules'=>'required'),
		array=('field'=>'deadline','label'=>'Deadline','rules'=>'required')
		);

	function add_detail(){
		$date = date('Y-m-d H:i:s'); 
		$data1 =array(
			'user_id'=>$this->session->user_data('user_id'),
			'title'=>$this->input->post('title'),
			'description'=>$this->input->post('description'),
			'created_at'=>$date,
			'deadline'=>$this->input->post('deadline')
			);
		$this->db->insert('post',$data1);

		$post_id=$this->db->insert_id();

		
		$category[]=$this->input->post('category');

		foreach($category as $cat){
			$data3=array();
			$data3=array_push($data3, 'post_id',$post_id);
			if($cat){
				$data3=array_push($data3, 'category_id',$cat);
			}
			$this->db->insert('post_category',$data3);
		}

		
		$data2=array(
			'address'=>$this->input->post('address'),
			'city'=>$this->input->post('city')
			);
		$this->db->insert('location',$data2);

		$location_id=$this->db->insert_id();

		
		$data4=array(
			'post_id'=$post_id,
			'location_id'=$location_id
			);
		$this->db->insert('post_location',$data4);

	}
}




?>