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

    public function save_template_doc()
    {
        $sql = "INSERT INTO [dbo].[document]([name],[doc])
                VALUES (?,?)";

        $response = parent::insert_query($sql, [$_POST["name"], $_POST["document"]]);

        if ($response) {
            echo Message::success();
        }
    }

    public function get_template_doc()
    {
        $sql = "SELECT * FROM [dbo].[document]";

        $response = parent::select_query($sql, []);
        echo json_encode((object)["data" => $response]);
    }
}
