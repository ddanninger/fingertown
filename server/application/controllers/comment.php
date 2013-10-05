<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Comment extends CI_Controller {
	function __construct() {
		parent::__construct();
		$this->load->database();
		$this->load->model('user_model');
		$this->load->model('comment_model');
	}

    function index() {
		$item_id = $this->input->get('item_id');

		$comment_list = $this->comment_model->get_list(array('item_id'=>$item_id));

		$this->load->view("comment", array("comment_list" => $comment_list));
    }

	function write() {
		//$item_id = $this->input->get('item_id');

		$comment_id = $this->comment_model->insert(array(
			//'item_id'=>$this->input->post('item_id'),
			'item_id'=>$this->input->get('item_id'),
			'user_id'=>$this->input->get('user_id'),
			'comment'=>$this->input->get('comment')
		));

		echo $comment_id;
		//$this->load->view("comment", array("comment_list" => $comment_list));
	}

	// TODO 
	function delete() {
		// TODO user check
		$comment_id = $this->input->get('comment_id');

		$result = $this->comment_model->delete($comment_id);

		echo $result;
		//$this->load->view("comment", array("comment_list" => $comment_list));
	}

	function test2() {
		$value1 = $this->input->get('value1');
		$value2 = $this->input->get('value2');
		$value3 = $this->input->get('value3');

		$json = '
		{
			"value1": "'.$value1.'",
			"value2": "'.$value2.'",
			"value3": "'.$value3.'",
		}
		';

		if ($this->input->get('callback')) {
			$jsonp = $this->input->get('callback').'('.$json .')';
			echo $jsonp;
		} else {
			echo $json;
		}
	}

	function test4_list() {
		$this->load->model('comment_model');
		$item_id = $this->input->get('item_id');
		$comment_list = $this->comment_model->get_list(array('item_id'=>$item_id));

		$json = json_encode($comment_list);

		if ($this->input->get('callback')) {
			$jsonp = $this->input->get('callback').'('.$json .')';
			echo $jsonp;
		} else {
			echo $json;
		}
	}
}
?>
