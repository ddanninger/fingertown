<?php
class Item_model extends CI_Model {

    function __construct() {    	
        parent::__construct();
    }

	function get($id) {
		return $this->db->query("SELECT * FROM item WHERE id='".$id."'")->row();
	}

	function get_list($town_id) {
		return $this->db->query("SELECT * FROM item WHERE town_id='".$town_id."'")->result();
	}

    function insert($option) {
        $this->db->set('user_id', $option['user_id']);
        $this->db->set('town_id', $option['town_id']);
        $this->db->set('detail', $option['detail']);
        $this->db->set('type', $option['type']);
        $this->db->set('coord_x', $option['coord_x']);
        $this->db->set('coord_y', $option['coord_y']);
        $this->db->set('latitude', $option['latitude']);
        $this->db->set('longitude', $option['longitude']);
        $this->db->set('picture', $option['picture']);
        $this->db->set('created', 'NOW()', false);

        $this->db->insert('item');

        $result = $this->db->insert_id();

        return $result;
    }

	function delete($id) {
		$this->db->where('id', $id);

		$this->db->delete('item');

		$result = $this->db->affected_rows();

		return $result;
	}

}
?>
