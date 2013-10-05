<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Item extends CI_Controller {
	function __construct() {
		parent::__construct();
		$this->load->database();
		$this->load->model('user_model');
		$this->load->model('item_model');
	}

    function index() {
		$town_id = $this->input->get('town_id');

		$item_list = $this->comment_model->get_list(array('town_id'=>$town_id));

		$this->load->view("item", array("item_list" => $item_list));
    }

	function get_list() {
		// parameter
		$town_id = $this->input->get('town_id');

		// load data
		$item_list = $this->item_model->get_list($town_id);

		$json = json_encode($item_list);

		if ($this->input->get('callback')) {
			$jsonp = $this->input->get('callback').'('.$json .')';
			echo $jsonp;
		} else {
			echo $json;
		}
	}

	function get() {
		// parameter
		$item_id = $this->input->get('item_id');

		// load data
		$item = $this->item_model->get($item_id);

		$json = json_encode($item);

		if ($this->input->get('callback')) {
			$jsonp = $this->input->get('callback').'('.$json .')';
			echo $jsonp;
		} else {
			echo $json;
		}
	}

	function add() {
		$item_id = $this->item_model->insert(array(
			'user_id'=>$this->input->get('user_id'),
			'town_id'=>$this->input->get('town_id'),
			'detail'=>$this->input->get('detail'),
			'type'=>$this->input->get('type'),
			'coord_x'=>$this->input->get('coord_x'),
			'coord_y'=>$this->input->get('coord_y'),
			'latitude'=>$this->input->get('latitude'),
			'longitude'=>$this->input->get('longitude'),
			'picture'=>$this->input->get('picture')
		));

		$json = json_encode(array('result'=>"success", 'item_id'=>$item_id));

		if ($this->input->get('callback')) {
			$jsonp = $this->input->get('callback').'('.$json .')';
			echo $jsonp;
		} else {
			echo $json;
		}
	}

	function delete() {
		// TODO user check
		$item_id = $this->input->get('item_id');

		$fetched_rows = $this->item_model->delete($item_id);

		if ($fetched_rows == 1) {
			$json = json_encode(array('result'=>"success", 'message'=>""));
		} else {
			$json = json_encode(array('result'=>"fail", 'message'=>"not deleted. fetched rows:".$fetched_rows));
		}

		if ($this->input->get('callback')) {
			$jsonp = $this->input->get('callback').'('.$json .')';
			echo $jsonp;
		} else {
			echo $json;
		}
	}
}
?>
