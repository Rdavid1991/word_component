<?php

require_once(dirname(__FILE__) . "/../ManagementDB/ManagementDB.php");
require_once(dirname(__FILE__) . "/../message/Message.php");

class DocTemplate extends ManagementDB
{
    function __construct()
    {
        parent::__construct();
    }

    function __destruct()
    {
        parent::__destruct();
    }

    public function save_template_field()
    {
        $sql = "INSERT INTO [dbo].[template_field]
        (
            [name]
            ,[variable]
            ,[type]
        )
        VALUES
        (?,?,?)";

        $response = parent::insert_query($sql, [$_POST["name"], $_POST["variable"], $_POST["dataType"]]);

        if ($response) {
            echo Message::success();
        }
    }
}
