<?php
class User_model extends CI_Model {

    function __construct() {    	
        parent::__construct();
    }

    function add($option) {
        $this->db->set('email', $option['email']);
        $this->db->set('password', md5($option['password']));
        $this->db->set('created', 'NOW()', false);
        $this->db->insert('user');
        $result = $this->db->insert_id();
        return $result;
    }

    function getByEmail($option) {
        $result = $this->db->get_where('user', array('email'=>md5($option['email'])))->row();
        return $result;
    }

	public function test($email) {
		return $this->db->get_where('user', array('email'=>$email))->row();
	}

}
?>
