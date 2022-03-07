<?php
class Consecutive extends ManagementDB
{
    function __construct()
    {
        parent::__construct();
    }

    function __destruct()
    {
        parent::__destruct();
    }

    public function get_count_numbers()
    {
        $sql = "SELECT * FROM [dbo].[number_memo_notes] WHERE department_owner_id = ?";
        return parent::select_query($sql, [$_GET["department_owner"] ?? $_POST["department_owner"]]);
    }

    public function save_count_numbers($memo, $note)
    {
        $result = $this->get_count_numbers();
        if ($result) {
            $update = "UPDATE [dbo].[number_memo_notes]
                        SET [memorandum] = ? ,[notes] = ?
                        WHERE [id] = ?";
            return parent::insert_query($update, [$memo, $note, $result["data"][0]->id]);
            
        } else {
            $sql = "INSERT INTO [dbo].[number_memo_notes]([memorandum],[notes],[department_owner_id])
                        VALUES(?,?,?)";
            return parent::insert_query($sql, [$_POST["memo"], $_POST["note"], $_POST["department_owner"]]);
           
        }
    }
}
