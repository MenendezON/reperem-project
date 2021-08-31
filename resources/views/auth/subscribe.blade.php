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
    <h1 class="h3 mb-3 fw-normal">Please fill the form</h1>
    <input type="hidden" id="userId" value="<?php print(time()); ?>">
    <div class="form-floating">
      <input type="text" name="floatingFullname" class="form-control" id="floatingFullname" placeholder="Jean Eric">
      <label for="floatingFullname">Fullname</label>
    </div>
    <div class="form-floating">
      <input type="email" name="floatingEmail" class="form-control" id="floatingEmail" placeholder="name@example.com">
      <label for="floatingEmail">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" name="floatingPassword" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>

       
    <button id="addBtn" class="w-90 btn btn-lg btn-primary" type="submit"  onclick="signup()">Submit</button>

    <p class="mt-5 mb-3 text-muted"><a href="/login">Do you already have an account ?</a> </p>
  </form>
</main>
@endsection