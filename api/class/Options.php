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

        $result = parent::select_query($sql);

        if ($result["isSuccess"]) {
            echo json_encode((object) ["data" => $result["data"]]);
        } else if (!$result["isSuccess"]) {
            http_response_code(500);
            echo json_encode(["message" => Message::errorDatabase($result["error"])]);
        }
    }
}
