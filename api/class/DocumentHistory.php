<?php
require_once(dirname(__FILE__) . "/../ManagementDB/ManagementDB.php");
require_once(dirname(__FILE__) . "/../message/Message.php");

class DocumentHistory extends ManagementDB
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
            $result = parent::insert_query($update, [$memo, $note, $result[0]->id]);
            if ($result) {
                return (object) array(
                    "title" => "Hecho",
                    "text" => "Se ha guardado la información correctamente",
                    "icon" => "success"
                );
            } else {
                return (object) array(
                    "title" => "Oops!!!",
                    "text" => "A ocurrido un error.",
                    "icon" => "error"
                );
            }
        } else {
            $update = "INSERT INTO [dbo].[number_memo_notes]([memorandum],[notes],[department_owner_id])
                        VALUES(?,?,?)";
            $result = parent::insert_query($update, [$_POST["memo"], $_POST["note"], $_POST["department_owner"]]);
            if ($result) {
                return (object) array(
                    "title" => "Hecho",
                    "text" => "Se ha guardado la información correctamente",
                    "icon" => "success"
                );
            } else {
                return (object) array(
                    "title" => "Oops!!!",
                    "text" => "A ocurrido un error.",
                    "icon" => "error"
                );
            }
        }
    }

    public function find()
    {

        $count_number = $this->get_count_numbers();

        if (intval($_GET["type"]) === 1) {

            $sql = "UPDATE [dbo].[memo]
            SET [state] = 0
            WHERE [state] = 1";

            parent::insert_query($sql, []);

            $dirigido = $_POST["dirigido"];
            $asunto = $_POST["asunto"];
            $solicitado = $_POST["solicitado"];
            $date = $_POST["date"];

            $sql = "INSERT INTO [dbo].[memo]
           ([asunto]
           ,[solicitado_por]
           ,[dirigido_a]
           ,[number]
           ,[date]
           ,[state])
            VALUES
           (
               ?,
               ?,
               ?,
               ?,
               ?,
               ?
               )";

            $result = parent::insert_query($sql, [$asunto, $solicitado, $dirigido,   $count_number[0]->memorandum, $date, 1]);

            if ($result) {
                $this->save_count_numbers(($count_number[0]->memorandum + 1), $count_number[0]->notes);
            }

            $data = ["data" => [(object) ["id" => $count_number[0]->memorandum]]];

            echo json_encode($data);
        } else if (intval($_GET["type"]) === 2) {
            $sql = "UPDATE [dbo].[note]
            SET [state] = 0
            WHERE [state] = 1";

            parent::insert_query($sql, []);

            $dirigido = $_POST["dirigido"];
            $asunto = $_POST["asunto"];
            $solicitado = $_POST["solicitado"];
            $date = $_POST["date"];

            $sql = "INSERT INTO [dbo].[note]
           ([asunto]
           ,[solicitado_por]
           ,[dirigido_a]
           ,[number]
           ,[date]
           ,[state])
            VALUES
           (
               ?,
               ?,
               ?,
               ?,
               ?,
               ?
               )";

            $result = parent::insert_query($sql, [$asunto, $solicitado, $dirigido,   $count_number[0]->notes, $date, 1]);

            if ($result) {
                $this->save_count_numbers(($count_number[0]->memorandum), $count_number[0]->notes + 1);
            }

            $data = ["data" => [(object) ["id" => $count_number[0]->notes]]];

            echo json_encode($data);
        }
    }

    public function reject_info()
    {

        if (intval($_GET["type"]) === 1) {

            $update = "UPDATE [dbo].[memo]
            SET [state] = 3
            WHERE [number] = ?";

            $result = parent::insert_query($update, [$_GET["info"]]);

            if ($result) {
                $count_number = $this->get_count_numbers();
                $this->save_count_numbers((intval($_GET["info"])), $count_number->notes);

                $msj = (object) array(
                    "title" => "Hecho",
                    "text" => "Se a rechazado el memo numero" . $_GET["info"],
                    "icon" => "success"
                );
                echo  json_encode($msj);
            } else {
                $msj = (object) array(
                    "title" => "Oops!!!",
                    "text" => "A ocurrido un error.",
                    "icon" => "error"
                );
                echo  json_encode($msj);
            }
        } else if (intval($_GET["type"]) === 2) {
            $update = "UPDATE [dbo].[note]
            SET [state] = 3
            WHERE [number] = ?";

            $result = parent::insert_query($update, [$_GET["info"]]);

            if ($result) {
                $count_number = $this->get_count_numbers();
                $this->save_count_numbers($count_number->notes, intval($_GET["info"]));

                $msj = (object) array(
                    "title" => "Hecho",
                    "text" => "Se a rechazado la nota numero " . $_GET["info"],
                    "icon" => "success"
                );
                echo  json_encode($msj);
            } else {
                $msj = (object) array(
                    "title" => "Oops!!!",
                    "text" => "A ocurrido un error.",
                    "icon" => "error"
                );
                echo  json_encode($msj);
            }
        }
    }
}
