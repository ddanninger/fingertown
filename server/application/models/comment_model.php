<?php
class Comment_model extends CI_Model {

    function __construct() {    	
        parent::__construct();
    }

    function insert($option) {
        $this->db->set('item_id', $option['item_id']);
        $this->db->set('user_id', $option['user_id']);
        $this->db->set('comment', $option['comment']);
        $this->db->set('created', 'NOW()', false);

        $this->db->insert('comment');

        $result = $this->db->insert_id();

        return $result;
    }

	function delete($id) {
		$this->db->where('id', $id);

		$this->db->delete('comment');

		$result = $this->db->affected_rows();

		return $result;
	}

	function get_list($item_id) {
		//return $this->db->get_where('comment', array('item_id'=>$item_id))->row();
		//return $this->db->get_where('comment', array('item_id'=>$item_id))->row();
		return $this->db->query("SELECT * FROM comment WHERE item_id='1'")->result();
	}

	/*
    function getByEmail($option) {
        $result = $this->db->get_where('user', array('email'=>md5($option['email'])))->row();
        return $result;
    }

	*/

}
?>
