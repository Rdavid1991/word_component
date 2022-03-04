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

        $result = parent::insert_query($sql, [
            $_POST["name"],
            $_POST["idCard"],
            $_POST["jobTitle"],
            $_POST["position"],
            $_POST["department_owner"] == 0 ? $_POST["owner"] : $_POST["department_owner"]
        ]);

        if ($result["isInsert"]) {
            echo json_encode(Message::success());
        } else if (!$result["isInsert"]) {
            http_response_code(500);
            echo json_encode(Message::errorDatabase($result["error"]));
        }
    }
}
