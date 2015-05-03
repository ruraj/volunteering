<!DOCTYPE <!DOCTYPE html>
<html>
<head>
	<title>Login</title>
</head>
<body>
	<fieldset style="width: 500px; margin:auto;">
			<legend>Form</legend>
			<form method="post" action="<?php echo site_url('admin_login/login_user');?>">
				<label>Email</label>
				<input type="text" name="email"> <?php echo form_error('email');?><br/>
				<label>Password</label>
				<input type="password" name="password"> <?php echo form_error('password');?><br/>
				
				<input type="submit" name="submit" value="Submit">
				

			</form>
		</fieldset>
</body>
</html>