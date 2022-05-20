<?php

if (str_contains($_GET["action"],  "login")) {

    $admin = new AdminUser();


    switch ($_GET["action"]) {
        case 'login_admin':
            echo Response::responseSelect($admin->login_admin());
            break;

        default:
            # code...
            break;
    }
}
