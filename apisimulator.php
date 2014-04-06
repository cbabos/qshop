<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Csaba
 * Date: 2013.05.16.
 * Time: 22:01
 * This is a simulator for API calls
 */

$users = array(
	1 => array(
		"username" => "cbabos",
		"password" => sha1("x")
	),
	2 => array(
		"username" => "gege",
		"password" => sha1("a")
	)
);

$return = array();
switch ($_POST['controller']) {
	case 'user':
		switch ($_POST['action']) {
			case 'authenticate':
				foreach ($users as $key => $user) {
					if ($user['username'] == $_POST['username'] &&
							$user['password'] == sha1($_POST['password'])) {
						$return = array("token" => $key);
					}
				}

				if (empty($return)) {
					$return = array("token" => false);
				}
		}
	break;
}

sleep(1);
header("Content-type: text/json; charset=utf-8");
echo json_encode($return);