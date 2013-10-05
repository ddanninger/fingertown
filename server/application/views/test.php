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
});

function test() {
	//alert("test");
	var value1 = jQuery("#value1").val();
	var value2 = jQuery("#value2").val();
	var value3 = jQuery("#value3").val();

	var url = "http://oht.junho85.pe.kr/index.php/test/test2?value1="+value1+"&value2="+value2+"&value3="+value3+"&callback=?";
	//console.log(url);

	$.getJSON(url, function(data) {
		//alert(data);
		console.log(data);
		console.log(data.value1);
		console.log(data.value2);
		console.log(data.value3);
		var sum = data.value1 + data.value2 + data.value3;
		jQuery("#test").html(data.value1 + ":" + data.value2 + ":" + data.value3 + ":" + sum);
	}).done(function() {
		console.log("done");
	}).fail(function() {
		console.log("fail");
	}).always(function() {
		console.log("always");
	});
}

</script>

<input type="button" value="test" onclick="test()" />
<input id="value1" type="text" value="test" />
<input id="value2" type="text" value="50" />
<input id="value3" type="text" value="100" />
<div id="test">
test
</div>

</body>
</html>

