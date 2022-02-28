<?php

class Addressee extends ManagementDB {
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
        if (isset($_POST["name"]) && isset($_POST["jobTitle"]) && isset($_POST["archetype"]) && isset($_POST["department"])) {

            $sql = "INSERT INTO [dbo].[addressee] ([name],[jobTitle],[archetype],[department], [department_owner_id])
            VALUES  (?,?,?,?,?)";

            $result = parent::insert_query($sql, [
                $_POST["name"],
                $_POST["jobTitle"],
                $_POST["archetype"],
                $_POST["department"],
                $_POST["department_owner"] == 0 ? $_POST["owner"] : $_POST["department_owner"]
            ]);

            if ($result) {
                $msj = (object) array(
                    "title" => "Hecho",
                    "text" => "Los datos se han guardado correctamente",
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
        } else {
            $msj = (object) array(
                "title" => "Algo salio mal",
                "text" => "no se puede guardar los datos, hacen falta parámetros",
                "icon" => 'warning'
            );
            echo  json_encode($msj);
        }
    }
    public function edit_addressee()
    {
        if (isset($_POST["name"]) && isset($_POST["jobTitle"]) && isset($_POST["archetype"]) && isset($_POST["department"])) {

            $sql = "UPDATE [dbo].[addressee]
            SET [name] = ?
               ,[jobTitle] = ?
               ,[archetype] = ?
               ,[department] = ?
            WHERE [id]=?";

            $result = parent::insert_query($sql, [
                $_POST["name"],
                $_POST["jobTitle"],
                $_POST["archetype"],
                $_POST["department"],
                $_POST["id"]
            ]);

            if ($result) {
                $msj = (object) array(
                    "title" => "Hecho",
                    "text" => "Los datos se han guardado correctamente",
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
        } else {
            $msj = (object) array(
                "title" => "Algo salio mal",
                "text" => "no se puede guardar los datos, hacen falta parámetros",
                "icon" => 'warning'
            );
            echo  json_encode($msj);
        }
    }

    public function get_addressee()
    {

        $sql = "SELECT * FROM [dbo].[addressee] WHERE [department_owner_id] = ?";

        $result = parent::select_query($sql,[$_GET["department_owner"]]);


        echo json_encode($result);
    }

    public function delete_addressee()
    {
        $sql = "DELETE FROM [dbo].[addressee] WHERE [id]=?";

        $result = parent::insert_query($sql, [$_POST["id"]]);

        if ($result) {
            $msj = (object) array(
                "title" => "Hecho",
                "text" => "Los datos se han borrado correctamente",
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
