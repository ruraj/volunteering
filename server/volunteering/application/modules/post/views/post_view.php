<!DOCTYPE html>
<html>

	<head>
		<title>Volunteering</title>
		<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>css/stylesheet.css">
	</head>

	<body>
		<fieldset style="width: 500px; margin:auto;">
			<legend>Form</legend>
			<form method="post" action="<?php echo site_url('post/admin_post/add_detail');?>">
				<label>Post Title</label>
				<input type="text" name="title" value="<?php echo set_value('title');?>">
				<?php echo form_error('title');?><br/>
				<label>Description</label>
				<input type="text" name="description" value="<?php echo set_value('description');?>">
				<?php echo form_error('description');?><br/>
				<label>Address</label>
				<input type="text" name="address" value="<?php echo set_value('address');?>">
				<?php echo form_error('address');?><br/>
				<label>City</label>
				<input type="text" name="city" value="<?php echo set_value('city');?>">
				<?php echo form_error('city');?><br/>
				<label>Deadline</label>
				<input type="date" name="deadline" value="<?php echo set_value('deadline');?>">
				<?php echo form_error('deadline');?> <br/>
				<label>Category</label><br/>
				<input type="checkbox" name="category[]" value=0>Rescue
				<input type="checkbox" name="category[]" value=1>Distribution
				<input type="checkbox" name="category[]" value=2>Awareness
				<input type="checkbox" name="category[]" value=3>Health<br/>

				<input type="submit" name="submit" value="Submit">
				

			</form>
		</fieldset>
	</body>

</html>