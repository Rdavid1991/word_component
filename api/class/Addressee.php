<?php

class Addressee extends ManagementDB
{
    function __construct()
    {
        parent::__construct();
    }

    function __destruct()
    {
        parent::__destruct();
    }

    public function save_addressee()
    {

        $sql = "INSERT INTO [dbo].[addressee] ([name],[jobTitle],[archetype],[department], [department_owner_id])
            VALUES  (?,?,?,?,?)";

        return parent::insert_query($sql, [
            $_POST["name"],
            $_POST["jobTitle"],
            $_POST["archetype"],
            $_POST["department"],
            $_POST["department_owner"] == 0 ? $_POST["owner"] : $_POST["department_owner"]
        ]);
    }

    public function edit_addressee()
    {

        $sql = "UPDATE [dbo].[addressee]
            SET [name] = ?
               ,[jobTitle] = ?
               ,[archetype] = ?
               ,[department] = ?
            WHERE [id]=?";

        return parent::insert_query($sql, [
            $_POST["name"],
            $_POST["jobTitle"],
            $_POST["archetype"],
            $_POST["department"],
            $_POST["id"]
        ]);
    }

    public function get_addressee()
    {

        $sql = "SELECT * FROM [dbo].[addressee]";
        $sql .= $_GET["department_owner"] == "0" ? "" : "WHERE [department_owner_id] = ?";

        return parent::select_query($sql, [$_GET["department_owner"]]);
    }

    public function delete_addressee()
    {
        $sql = "DELETE FROM [dbo].[addressee] WHERE [id]=?";

        return parent::insert_query($sql, [$_POST["id"]]);
    }
}
