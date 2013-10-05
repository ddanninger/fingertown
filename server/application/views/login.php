<div>
  <div>
    <h3>로그인</h3>
  </div>
  <form action="/index.php/auth/authentication" method="post">
    <div>
        <div>
          <label for="inputEmail">아이디</label>
          <div>
            <input type="text" id="email" name="email" placeholder="이메일" />
          </div>
        </div>
        <div>
          <label for="inputPassword">비밀번호</label>
          <div>
            <input type="password" id="password" name="password" placeholder="비밀번호" />
          </div>
        </div>      
    </div>
    <div>    
      <input type="submit" value="로그인" />
    </div>
  </form>
</div>
