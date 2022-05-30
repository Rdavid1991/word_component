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
        $sql = "SELECT * FROM [dbo].[department_owner]";
        $sql .= "WHERE [id]=?";

        return parent::select_query($sql, [$_GET["id"]]);
    }

    public function save_department_info()
    {

        if (isset($_GET["id"])) {
            $sql = "UPDATE [dbo].[department_owner] ";
            $sql .= "SET [name] = ?, ";
            $sql .= "[phone] = ?, ";
            $sql .= "[shift] = ?, ";
            $sql .= "[jobTitle] = ? ";
            $sql .= " WHERE [id] = ?";

            return parent::insert_query($sql, [
                $_POST["name"],
                $_POST["phone"],
                $_POST["shift"],
                $_POST["jobTitle"],
                $_POST["id"]
            ]);
        } else {

            $sql = "INSERT INTO [dbo].[department_owner] ([name],[phone],[shift],[jobTitle]) ";
            $sql .= "VALUES (?,?,?,?)";

            return parent::insert_query($sql, [
                $_POST["name"],
                $_POST["phone"],
                $_POST["shift"],
                $_POST["jobTitle"],
            ]);
        }
    }

    public function delete_department_info()
    {
        $sql = "DELETE FROM [dbo].[department_owner] WHERE [id]=?";

        return parent::insert_query($sql, [$_POST["id"]]);
    }
}
