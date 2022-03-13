<?php

require_once(dirname(__FILE__) . "/../ManagementDB/ManagementDB.php");
require_once(dirname(__FILE__) . "/../message/Message.php");

class Options extends ManagementDB
{
    function __construct()
    {
        parent::__construct();
    }

    function __destruct()
    {
        parent::__destruct();
    }

    public function get_department_owner()
    {
        $sql = "SELECT * FROM [dbo].[department_owner]";
        $sql .=  isset($_GET["id"]) && $_GET["id"] !== "0" ? "WHERE [id] = ?" : "";

        return parent::select_query($sql,[$_GET["id"] ?? ""]);
    }
}
