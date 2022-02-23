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

        $query_result = parent::select_query($sql);

        echo json_encode((object) ["data" => $query_result]);
    }
}
