<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Main extends CI_Controller {
    function index() {
	    $this->load->view('header');
	    $this->load->view('main');
	    $this->load->view('footer');
    }

    function get($id) {
		$this->load->view('header');
		$this->load->view('get', array('id'=>$id));
		$this->load->view('footer');
    }
}
?>
