<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
</head>
<body>
<ul>
    <?php
    if ($this->session->userdata('is_login')) {
    ?>
        <li><a href="/index.php/auth/logout">로그아웃</a></li>
    <?php
    } else {
    ?>
        <li><a href="/index.php/auth/login">로그인</a></li>
        <li><a href="/index.php/auth/register">회원가입</a></li>
    <?php
    }
    ?>
</ul> 
