/*

############## API ##############

codepen.api.signup(user_object)
	description: to sign up a new user
	parameters: user object, which contains properties: name, email, username, password
	returns: response object

codepen.api.login(user_object)
	description: to login an existing user
	parameters: user object, which contains properties: username, password
	returns: response object


Reponse Objects:

{
	success: true/false,
	error: (string)
}


##users already signed up (can log in)
	('suzy', 'I@msoawesome')
	('conan', 'gingertastic')
	('jerry', '@#!$%@')

*/


$('document').ready(function() {

	codepen.objects.User = {
		name: '',
		email: '',
		username: '',
		password: '',
		is_logged_in: ''
	};
	codepen.objects.NewUser = Object.create(codepen.objects.User, {
		firstname: {
			writable: true,
			enumerable: true,
			value: ''
		},
		lastname: {
			writable: true,
			enumerable: true,
			value: ''
		}
	});

	$(".login-form-btn").click(function(){
		$(this).addClass("active");
		$(".signup-form-btn").removeClass("active");
		$(".login-form").show();
		$(".signup-form").hide();
	});
	$(".signup-form-btn").click(function(){
		$(this).addClass("active");
		$(".login-form-btn").removeClass("active");
		$(".login-form").hide();
		$(".signup-form").show();
	});

	$(".btn-login").click(function(){
		var user = Object.create(codepen.objects.NewUser);
		user.username = $("#login-username-field").val();
		user.password = $("#login-password-field").val();
		user.is_logged_in = true;
		var response = codepen.api.login(user);
		if (response.error){
			$(".login-form").prepend(response.error).css("color","red");
		};
	});
	var user = Object.create(codepen.objects.NewUser);
	$("#login-username-field").blur(function(){
		user.username = $("#login-username-field").val();
		console.log(user.username);
		var response = {
			success: false,
			error: ''
		};
		if (!user.username) {
			console.log("error");
			response.error = 'Please provide a username';
			console.log(response.error);
			$(".error").text(response.error).css("color", "red");
			return response;
		}
	});
	$("#login-username-field").focus(function(){
		$(".login-form p").text('');
	});
	$("#login-password-field").blur(function(){
		user.password = $("#login-password-field").val();
		console.log(user.password);
		var response = {
			success: false,
			error: ''
		};
		if (!user.password) {
			response.error = 'Please provide a password';
			$(".error").text(response.error).css("color", "red");
			return response;
		}
	});
	$("#login-password-field").focus(function(){
		$(".login-form p").text('');
	});
	$(".btn-signup").click(function(){
		var user = Object.create(codepen.objects.NewUser);
		user.name = $("#signup-name-field").val();
		user.email = $("#signup-email-field").val();
		user.username = $("#signup-username-field").val();
		user.password = $("#signup-password-field").val();
		var first = user.name.split(' ')[0];
		var last = user.name.split(' ')[1];
		user.firstname = first;
		user.lastname = last;
		user.is_logged_in = true;
		var response = codepen.api.signup(user);
		if (response.error){
			$(".signup-form").prepend(response.error).css("color", "red");
		}
	});
});
