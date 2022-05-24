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

        $sql = "INSERT INTO [dbo].[document]([name],[type],[doc],[department_owner_id])
                VALUES (?,?,?,?)";

        $params = [
            $_POST["name"],
            $_POST["type"],
            $_POST["document"],
            $_POST["department_owner"] == "0" ? $_POST["owner"] : $_POST["department_owner"]
        ];

        return parent::insert_query($sql, $params);
    }

    public function edit_template_doc()
    {
        $sql = "UPDATE [dbo].[document]
                SET [name] = ?,
                    [doc] = ?,
                    [type] = ?
                WHERE [id] = ?";

        return parent::insert_query($sql, [$_POST["name"], $_POST["document"], $_POST["type"], $_POST["id"]]);
    }

    public function delete_template_doc()
    {
        $affected = 0;
        $sql = "UPDATE [dbo].[document] SET [active] = 0 WHERE [id] = ?";

        return parent::insert_query($sql, [$_POST["id"]], $affected);
    }

    public function get_template_info()
    {
        $sql = "SELECT [id],[name],[type], [department_owner_id] FROM [dbo].[document]";
        $sql .= $_GET["department_owner"] == "0"
            ? "WHERE [active] = 1"
            : "WHERE ([department_owner_id] = ? OR [department_owner_id] = 0) AND [active] = 1";

        return parent::select_query($sql, [$_GET["department_owner"]]);
    }

    public function get_template_doc()
    {

        if ($_GET["department_owner"] == "0") {
            $sql = "SELECT [id],[doc] FROM [dbo].[document] ";
            $sql .= "WHERE [active] = 1 ";
            $sql .= "AND [id] = ?";
            return parent::select_query($sql, [$_GET["id"]]);
        } else {
            $sql = "SELECT [id],[doc] FROM [dbo].[document] ";
            $sql .= "WHERE ([department_owner_id] = ? OR [department_owner_id] = 0) AND [active] = 1 ";
            $sql .= "AND [id] = ?";
            return parent::select_query($sql, [$_GET["department_owner"], $_GET["id"]]);
        }
    }
}
