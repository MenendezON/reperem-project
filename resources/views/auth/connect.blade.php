@extends('base.app')

@section('custom_style')
<style>
    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
    }
</style>
<link href="https://getbootstrap.com/docs/5.1/examples/sign-in/signin.css" rel="stylesheet">
@endsection

@section('content')
<body class='text-center'>
<main class="form-signin">
  <form>
    <img class="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">


    <div class="form-floating">
      <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <span id="resultLogin" style="color:red; font-size:0.75em; font-style:italic">&nbsp;</span>
    <br>
    <!--button id ="loginBtn" class="w-90 btn btn-sm btn-primary" type="submit" onclick="login()">SignIn</button>
    <button id="addBtn" class="w-90 btn btn-sm btn-primary" type="submit"  onclick="signup()">SignUp</button-->

    <span style="cursor:pointer" id="loginBtn">Se connecter</span> | <span style="cursor:pointer" id="addBtn">S'inscrire</span>
    
  </form>
</main>
@endsection

@section('script')
<script>
  auth.onAuthStateChanged((user) => {
    if(user[0] != null){
      window.location.replace('/');
    }
  });
  console.log('verification du user : '+user[0]);
</script>
@endsection