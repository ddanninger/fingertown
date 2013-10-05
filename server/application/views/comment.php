<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>

</head>
<body>

<script type="text/javascript">
$(document).ready(function() {
	//alert("test");
	get_list();
});

function get_list() {
	var item_id = "1";

	var url = "http://oht.junho85.pe.kr/index.php/test/test4_list?item_id="+item_id+"&callback=?";
	console.log(url);

	$.getJSON(url, function(data) {
		//alert(data);
		console.log(data);
		/*
		var sum = data.value1 + data.value2 + data.value3;
		jQuery("#test").html(data.value1 + ":" + data.value2 + ":" + data.value3 + ":" + sum);
		*/
	}).done(function() {
		console.log("done");
	}).fail(function() {
		console.log("fail");
	}).always(function() {
		console.log("always");
	});
}

function comment() {
	var item_id = jQuery("#item_id").val();
	var user_id = jQuery("#user_id").val();
	var comment = jQuery("#comment").val();

	var url = "http://oht.junho85.pe.kr/comment/write?item_id="+item_id+"&user_id="+user_id+"&comment="+comment+"&callback=?";
	//console.log(url);

	$.getJSON(url, function(data) {
		//alert(data);
		console.log(data);
		//jQuery("#test").html(data.value1 + ":" + data.value2 + ":" + data.value3 + ":" + sum);
	}).done(function() {
		console.log("done");
	}).fail(function() {
		console.log("fail");
	}).always(function() {
		console.log("always");
	});
}

</script>

<table>
<?php
foreach ($comment_list as $row) {
	?>
	<tr>
		<td>
		<?php
		//var_dump($row);
		echo $row->comment;
		?>
		</td>
		<td>
		<?php echo $row->created; ?> <a href="">x</a>
		</td>
	</tr>
	<?php
}
?>
</table>

item_id<input id="item_id" type="text" value="1" disabled="disabled" readonly="readonly" style="width:30px" /><br />
user_id<input id="user_id" type="text" value="1" disabled="disabled" readonly="readonly" style="width:30px" /><br />
<input id="comment" type="text" value="comment" />
<input type="button" value="comment" onclick="comment()" />

<div id="test">
test
</div>

</body>
</html>

