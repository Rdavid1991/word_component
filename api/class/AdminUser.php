<?php

class AdminUser extends ManagementDB
{
    function __construct()
    {
        parent::__construct();
    }

    function __destruct()
    {
        parent::__destruct();
    }

    public function login_admin()
    {

        $sql = "SELECT * FROM [dbo].[admin_user] WHERE [user]=? AND [password]=?";

        $params = [$_POST["user"],$_POST["pass"]];

        return parent::select_query($sql, $params);
    }
}
