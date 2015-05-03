<!DOCTYPE html>
<html>

	<head>
		<title>Volunteering</title>
		<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>css/stylesheet.css">
	</head>

	<body>
		<fieldset style="width: 500px; margin:auto;">
			<legend>Form</legend>
			<form method="post" action="<?php echo site_url('register/register_user');?>">
				<label>First Name</label>
				<input type="text" name="first_name" value="<?php echo set_value('first_name');?>">
				<?php echo form_error('first_name');?><br/>
				<label>Last Name</label>
				<input type="text" name="last_name" value="<?php echo set_value('last_name');?>">
				<?php echo form_error('last_name');?><br/>
				<label>Contact</label>
				<input type="number" name="contact" value="<?php echo set_value('contact');?>">
				<?php echo form_error('contact');?><br/>
				<label>Email</label>
				<input type="text" name="email" value="<?php echo set_value('email');?>">
				<?php echo form_error('email');?><br/>
				<label>Password</label>
				<input type="password" name="password" value="<?php echo set_value('password');?>">
				<?php echo form_error('password');?> <br/>
				<label>Confirm Password</label>
				<input type="password" name="conf_password" value="<?php echo set_value('conf_password');?>">
				<?php echo form_error('conf_password');?> <br/>

				<input type="submit" name="submit" value="Submit">
				

			</form>
		</fieldset>
	</body>

</html>