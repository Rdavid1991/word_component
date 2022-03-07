<?php

require_once(dirname(__FILE__) . "/../ManagementDB/ManagementDB.php");
require_once(dirname(__FILE__) . "/../message/Message.php");

class Functionary extends ManagementDB
{
    function __construct()
    {
        parent::__construct();
    }

    function __destruct()
    {
        parent::__destruct();
    }

    function save_functionary()
    {

        $sql = "INSERT INTO [dbo].[functionary]([name],[id_card],[job_title],[position_number],[department_owner_id])
             VALUES (?,?,?,?,?)";

        return parent::insert_query($sql, [
            $_POST["name"],
            $_POST["idCard"],
            $_POST["jobTitle"],
            $_POST["position"],
            $_POST["department_owner"] == 0 ? $_POST["owner"] : $_POST["department_owner"]
        ]);
    }

    function get_functionary()
    {
        $sql = "SELECT * FROM [dbo].[functionary]";
        $sql .= $_GET["department_owner"] == "0" ? "" : "WHERE [department_owner_id] = ?";
        return parent::select_query($sql, [$_GET["department_owner"]]);
    }
}