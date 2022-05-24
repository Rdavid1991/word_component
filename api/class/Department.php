<?php


require_once(dirname(__FILE__) . "/../message/Message.php");

class Department extends ManagementDB
{
    function __construct()
    {
        parent::__construct();
    }

    function __destruct()
    {
        parent::__destruct();
    }

    public function get_department_info()
    {
        $sql = "SELECT * FROM [memos&notas].[dbo].[department_owner]";
        $sql .= "WHERE [id]=?";

        return parent::select_query($sql, [$_GET["id"]]);
    }

    public function save_department_info()
    {
        $sql = "UPDATE [dbo].[department_owner] ";
        $sql .= "SET [name] = ?, ";
        $sql .= "[phone] = ?, ";
        $sql .= "[shift] = ?, ";
        $sql .= "[jobTitle] = ? ";
        $sql .= " WHERE [id] = ?";

        return parent::insert_query($sql, [
            $_GET["name"],
            $_GET["phone"],
            $_GET["shift"],
            $_GET["jobTitle"],
            $_GET["id"]
        ]);
    }
}
