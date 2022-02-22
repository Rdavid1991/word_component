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

    public function get_department()
    {
        $sql = "SELECT * FROM [dbo].[department]";

        $query_result = parent::select_query($sql);

        echo json_encode((object) ["data" => $query_result]);
    }
}
