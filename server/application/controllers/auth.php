<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Auth extends CI_Controller {
	function __construct() {
		parent::__construct();
	}

    function index() {
	    $this->load->view('header');
	    $this->load->view('main');
	    $this->load->view('footer');
    }

	function login() {
	    $this->load->view('header');
		$this->load->view('login');     
	    $this->load->view('footer');
	}

	function logout() {
		$this->session->sess_destroy();
		$this->load->helper('url');
		redirect('/');
	}

	function register() {
	    $this->load->view('header');

        $this->load->library('form_validation');

        $this->form_validation->set_rules('email', 'email address', 'required|valid_email|is_unique[user.email]');
        $this->form_validation->set_rules('nickname', 'nickname', 'required|min_length[5]|max_length[20]');
        $this->form_validation->set_rules('password', 'password', 'required|min_length[6]|max_length[30]|matches[re_password]');
        $this->form_validation->set_rules('re_password', 're-password', 'required');

        if ($this->form_validation->run() === false) {
            $this->load->view('register');    
        } else {
            $hash = md5($this->input->post('password'));

            $this->load->model('user_model');
            $this->user_model->add(array(
                'email'=>$this->input->post('email'),
                'password'=>$hash,
                'nickname'=>$this->input->post('nickname')
            ));

            $this->session->set_flashdata('message', 'register success');
            $this->load->helper('url');
            redirect('/');
        }
        
	    $this->load->view('footer');
    }

    function authentication() {
    	$this->load->model('user_model');
        $user = $this->user_model->getByEmail(array('email'=>$this->input->post('email')));
        if (!function_exists('password_hash')){
            $this->load->helper('password');
        }
    	if (
    		$this->input->post('email') == $user->email && 
            password_verify($this->input->post('password'), $user->password)
    	) {
    		$this->session->set_userdata('is_login', true);
    		$this->load->helper('url');
    		redirect("/");
    	} else {
    		echo "불일치";
    		$this->session->set_flashdata('message', '로그인에 실패 했습니다.');
    		$this->load->helper('url');
    		redirect('/auth/login');
    	}
    }
}
?>
