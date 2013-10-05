<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Test extends CI_Controller {
	function __construct() {
		parent::__construct();
		$this->load->database();
		$this->load->model('user_model');
	}
    function index() {
		echo "hello<br />";
		echo md5("hello")."<br />";
		echo '
			<a href="test1" />test1</a><br />
			<a href="test2" />test2</a><br />
			<a href="test3" />test3</a><br />
			<a href="test4" />test4</a><br />
			';
		phpinfo();
    }

	function test1() {
		$test = $this->user_model->test("junho85@gmail.com");
		var_dump($test);
		echo $test->email;
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
	function test3() {
		$this->load->view("test");
	}

	function test4() {
		$this->load->model('comment_model');

		$item_id = $this->input->get('item_id');

		$comment_list = $this->comment_model->get_list(array('item_id'=>$item_id));

		$this->load->view("comment", array("comment_list" => $comment_list));
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
